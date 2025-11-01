import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Session } from '@supabase/supabase-js';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LogOut, Download, Users } from 'lucide-react';

interface RSVP {
  id: string;
  full_name: string;
  attendance: string;
  guest_count: number | null;
  notes: string | null;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchRsvps();
      fetchPendingCount();
    }
  }, [isAdmin]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    setCheckingRole(true);
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
    } else {
      setIsAdmin(!!data);
    }
    
    setCheckingRole(false);
  };

  const fetchPendingCount = async () => {
    const { count, error } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'pending_admin');

    if (error) {
      console.error('Error fetching pending count:', error);
      return;
    }

    setPendingCount(count || 0);
  };

  const fetchRsvps = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('wedding_rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('RSVP\'ler yüklenemedi: ' + error.message);
    } else {
      setRsvps(data || []);
    }

    setLoading(false);
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

  const attendingCount = rsvps.filter(r => r.attendance === 'Geleceğim').length;
  const notAttendingCount = rsvps.filter(r => r.attendance === 'Gelemeyeceğim').length;
  const totalGuests = rsvps
    .filter(r => r.attendance === 'Geleceğim')
    .reduce((sum, r) => sum + (r.guest_count || 1), 0);

  if (checkingRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center text-muted-foreground">Yetki kontrol ediliyor...</div>
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/waiting-approval');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {pendingCount > 0 && (
          <div className="bg-amber-500/10 backdrop-blur-sm rounded-lg shadow-md p-4 border border-amber-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {pendingCount} kullanıcı onay bekliyor
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Admin erişimi için onay bekleyen kullanıcılar var
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/pending-approvals')}
                variant="outline"
                className="border-amber-500/50 hover:bg-amber-500/10"
              >
                Onayları Görüntüle
              </Button>
            </div>
          </div>
        )}
        
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif text-foreground mb-2">RSVP Yönetimi</h1>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-secondary/50 rounded-lg p-4 border border-border/30">
              <div className="text-sm text-muted-foreground mb-1">Toplam RSVP</div>
              <div className="text-3xl font-bold text-foreground">{rsvps.length}</div>
            </div>
            
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
              <div className="text-sm text-muted-foreground mb-1">Katılacak</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{attendingCount}</div>
            </div>
            
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
              <div className="text-sm text-muted-foreground mb-1">Katılamayacak</div>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400">{notAttendingCount}</div>
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 mb-6 border border-primary/30">
            <div className="text-sm text-muted-foreground mb-1">Toplam Misafir Sayısı (Katılacaklar)</div>
            <div className="text-3xl font-bold text-primary">{totalGuests}</div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Henüz RSVP bulunmuyor</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ad Soyad</TableHead>
                    <TableHead>Katılım</TableHead>
                    <TableHead>Kişi Sayısı</TableHead>
                    <TableHead>Notlar</TableHead>
                    <TableHead>Tarih</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rsvps.map((rsvp) => (
                    <TableRow key={rsvp.id}>
                      <TableCell className="font-medium">{rsvp.full_name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          rsvp.attendance === 'Geleceğim' 
                            ? 'bg-green-500/20 text-green-700 dark:text-green-300' 
                            : 'bg-red-500/20 text-red-700 dark:text-red-300'
                        }`}>
                          {rsvp.attendance}
                        </span>
                      </TableCell>
                      <TableCell>{rsvp.guest_count || 1}</TableCell>
                      <TableCell className="max-w-xs truncate">{rsvp.notes || '-'}</TableCell>
                      <TableCell>{new Date(rsvp.created_at).toLocaleString('tr-TR')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
