import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check role and redirect authenticated users
        if (session?.user) {
          setTimeout(() => {
            checkRoleAndRedirect(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkRoleAndRedirect(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkRoleAndRedirect = async (userId: string) => {
    // First check if user has any role
    const { data: allRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (rolesError) {
      console.error('Error checking role:', rolesError);
      navigate('/waiting-approval');
      return;
    }

    // Check if user is admin
    const isAdmin = allRoles?.some(r => r.role === 'admin');
    if (isAdmin) {
      navigate('/admin');
      return;
    }

    // Check if user has pending_admin role
    const isPending = allRoles?.some(r => r.role === 'pending_admin');
    
    // If user has no role at all, create pending_admin role
    if (!allRoles || allRoles.length === 0) {
      const { data: userData } = await supabase.auth.getUser();
      
      // Don't create pending role for primary admin
      if (userData?.user?.email !== 'erkuskaan@gmail.com') {
        const { error: insertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'pending_admin'
          });
        
        if (insertError) {
          console.error('Error creating pending_admin role:', insertError);
        }
      }
    }

    navigate('/waiting-approval');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Lütfen email ve şifre giriniz');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Giriş başarısız: ' + error.message);
    } else {
      toast.success('Giriş başarılı!');
    }

    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Lütfen email ve şifre giriniz');
      return;
    }

    if (password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);

    const redirectUrl = `${window.location.origin}/`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) {
      toast.error('Kayıt başarısız: ' + error.message);
    } else {
      // If user is not the primary admin, request admin approval
      if (email !== 'erkuskaan@gmail.com' && data.user) {
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: 'pending_admin'
          });
        
        if (roleError) {
          console.error('Error adding pending admin role:', roleError);
        }
        
        toast.success('Kayıt başarılı! Admin onayı bekleniyor.');
      } else {
        toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-foreground mb-2">Düğün Yönetimi</h1>
            <p className="text-muted-foreground">RSVP'leri görüntülemek için giriş yapın</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                disabled={loading}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleSignUp}
                disabled={loading}
              >
                Kayıt Ol
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/')}
              className="text-sm text-muted-foreground"
            >
              ← Ana sayfaya dön
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
