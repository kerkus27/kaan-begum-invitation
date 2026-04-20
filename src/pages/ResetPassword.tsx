import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecoverySession, setIsRecoverySession] = useState(false);

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from the magic link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoverySession(true);
      }
    });

    // Also check existing session in case the event already fired
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setIsRecoverySession(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      toast.error('Şifre güncellenemedi: ' + error.message);
    } else {
      toast.success('Şifreniz güncellendi!');
      await supabase.auth.signOut();
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-8 border border-border/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-foreground mb-2">Yeni Şifre</h1>
            <p className="text-muted-foreground">Yeni şifrenizi belirleyin</p>
          </div>

          {!isRecoverySession ? (
            <p className="text-center text-muted-foreground text-sm">
              Geçerli bir şifre sıfırlama bağlantısına ihtiyacınız var. Lütfen email'inizdeki bağlantıyı kullanın.
            </p>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <Label htmlFor="password">Yeni Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="confirm">Yeni Şifre (Tekrar)</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••"
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/auth')}
              className="text-sm text-muted-foreground"
            >
              ← Giriş sayfasına dön
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
