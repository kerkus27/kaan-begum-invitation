import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { User, Session } from '@supabase/supabase-js';
import { Clock, LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const WaitingApproval = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      } else {
        checkApprovalStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkApprovalStatus = async (userId: string) => {
    setChecking(true);
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      console.error('Error checking approval status:', error);
    } else if (data) {
      toast.success('Admin erişimi onaylandı!');
      navigate('/admin');
    }
    
    setChecking(false);
  };

  const handleCheckStatus = () => {
    if (user) {
      checkApprovalStatus(user.id);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Çıkış yapılamadı: ' + error.message);
    } else {
      toast.success('Çıkış yapıldı');
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-border/50 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          
          <h1 className="text-3xl font-serif text-foreground mb-4">
            Onay Bekleniyor
          </h1>
          
          <p className="text-muted-foreground mb-2">
            Hesabınız oluşturuldu, ancak admin erişimi için onay bekleniyor.
          </p>
          
          <p className="text-sm text-muted-foreground mb-6">
            <span className="font-medium">erkuskaan@gmail.com</span> tarafından onaylandıktan sonra admin paneline erişebileceksiniz.
          </p>

          <div className="bg-secondary/30 rounded-lg p-4 mb-6 border border-border/30">
            <p className="text-sm text-muted-foreground">
              <strong>Email:</strong> {user?.email}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleCheckStatus}
              disabled={checking}
              className="w-full"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${checking ? 'animate-spin' : ''}`} />
              {checking ? 'Kontrol ediliyor...' : 'Durumu Kontrol Et'}
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingApproval;
