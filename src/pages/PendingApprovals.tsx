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
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface PendingAdmin {
  user_id: string;
  email: string;
  created_at: string;
}

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [pendingAdmins, setPendingAdmins] = useState<PendingAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    if (user) {
      checkAdminRole();
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchPendingAdmins();
    }
  }, [isAdmin]);

  const checkAdminRole = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      console.error('Error checking admin role:', error);
      setIsAdmin(false);
      navigate('/waiting-approval');
    } else {
      setIsAdmin(!!data);
      if (!data) {
        navigate('/waiting-approval');
      }
    }
  };

  const fetchPendingAdmins = async () => {
    setLoading(true);
    
    const { data: pendingRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select('user_id, created_at')
      .eq('role', 'pending_admin');

    if (rolesError) {
      console.error('Error fetching pending admins:', rolesError);
      setLoading(false);
      return;
    }

    if (!pendingRoles || pendingRoles.length === 0) {
      setPendingAdmins([]);
      setLoading(false);
      return;
    }

    const pending: PendingAdmin[] = [];
    
    for (const role of pendingRoles) {
      const { data: email } = await supabase.rpc('get_user_email', {
        _user_id: role.user_id
      });
      
      pending.push({
        user_id: role.user_id,
        email: email || 'Unknown',
        created_at: role.created_at
      });
    }

    setPendingAdmins(pending);
    setLoading(false);
  };

  const handleApproveAsAdmin = async (userId: string) => {
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', 'pending_admin');

    if (deleteError) {
      toast.error('Hata: ' + deleteError.message);
      return;
    }

    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'admin',
        approved_by: user?.id
      });

    if (insertError) {
      toast.error('Hata: ' + insertError.message);
      return;
    }

    toast.success('Admin olarak onaylandı');
    fetchPendingAdmins();
  };

  const handleApproveAsUser = async (userId: string) => {
    const { error: deleteError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', 'pending_admin');

    if (deleteError) {
      toast.error('Hata: ' + deleteError.message);
      return;
    }

    const { error: insertError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: 'user',
        approved_by: user?.id
      });

    if (insertError) {
      toast.error('Hata: ' + insertError.message);
      return;
    }

    toast.success('Kullanıcı olarak onaylandı (sadece export)');
    fetchPendingAdmins();
  };

  const handleRejectAdmin = async (userId: string) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', 'pending_admin');

    if (error) {
      toast.error('Hata: ' + error.message);
      return;
    }

    toast.success('Admin talebi reddedildi');
    fetchPendingAdmins();
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border border-border/50">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-serif text-foreground">Bekleyen Onaylar</h1>
              <p className="text-muted-foreground">Admin erişimi bekleyen kullanıcılar</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>
          ) : pendingAdmins.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Bekleyen onay talebi bulunmuyor</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Talep Tarihi</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAdmins.map((pending) => (
                    <TableRow key={pending.user_id}>
                      <TableCell className="font-medium">{pending.email}</TableCell>
                      <TableCell>{new Date(pending.created_at).toLocaleString('tr-TR')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            onClick={() => handleApproveAsAdmin(pending.user_id)}
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Admin
                          </Button>
                          <Button
                            onClick={() => handleApproveAsUser(pending.user_id)}
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Kullanıcı
                          </Button>
                          <Button
                            onClick={() => handleRejectAdmin(pending.user_id)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reddet
                          </Button>
                        </div>
                      </TableCell>
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

export default PendingApprovals;
