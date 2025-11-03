import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import { LogOut, Download } from 'lucide-react';

const Export = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [exporting, setExporting] = useState(false);

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
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error('Çıkış yapılamadı: ' + error.message);
    } else {
      toast.success('Çıkış yapıldı');
      navigate('/auth');
    }
  };

  const handleExport = async () => {
    setExporting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('export-rsvps');

      if (error) throw error;

      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'wedding-rsvps.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('RSVP\'ler başarıyla indirildi');
    } catch (error: any) {
      toast.error('Export hatası: ' + error.message);
    }
    
    setExporting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif text-foreground mb-2">RSVP Export</h1>
              <p className="text-muted-foreground">Hoş geldiniz, {user?.email}</p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleExport}
                disabled={exporting}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                {exporting ? 'İndiriliyor...' : 'Excel İndir'}
              </Button>
              
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </Button>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-6 border border-border/30">
            <p className="text-muted-foreground text-center">
              Excel dosyasını indirmek için yukarıdaki butona tıklayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Export;
