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
import { ArrowLeft, UserMinus, Shield } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserWithRole {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
}

const UserManagement = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const [removingUserId, setRemovingUserId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserWithRole | null>(null);

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
      fetchUsers();
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
    
    if (!data) {
      navigate('/waiting-approval');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    
    const { data: rolesData, error } = await supabase
      .from('user_roles')
      .select('user_id, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Kullanıcılar yüklenemedi: ' + error.message);
      setLoading(false);
      return;
    }

    // Get emails for all users
    const usersWithEmails = await Promise.all(
      rolesData.map(async (roleData) => {
        const { data: emailData } = await supabase
          .rpc('get_user_email', { _user_id: roleData.user_id });
        
        return {
          user_id: roleData.user_id,
          email: emailData || 'Unknown',
          role: roleData.role,
          created_at: roleData.created_at,
        };
      })
    );

    setUsers(usersWithEmails);
    setLoading(false);
  };

  const handleRemoveAdmin = async (userId: string) => {
    setRemovingUserId(userId);
    
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', 'admin');

    if (error) {
      toast.error('Admin yetkisi kaldırılamadı: ' + error.message);
    } else {
      toast.success('Admin yetkisi başarıyla kaldırıldı');
      fetchUsers();
    }
    
    setRemovingUserId(null);
  };

  const openDeleteDialog = (userToDelete: UserWithRole) => {
    setUserToDelete(userToDelete);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    setRemovingUserId(userToDelete.user_id);
    
    try {
      // Delete user from auth.users (this will cascade to user_roles)
      const { error } = await supabase.auth.admin.deleteUser(userToDelete.user_id);

      if (error) {
        toast.error('Kullanıcı silinemedi: ' + error.message);
      } else {
        toast.success('Kullanıcı başarıyla silindi');
        fetchUsers();
      }
    } catch (error: any) {
      toast.error('Kullanıcı silinemedi: ' + error.message);
    }
    
    setRemovingUserId(null);
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30';
      case 'pending_admin':
        return 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30';
      default:
        return 'bg-secondary/50 text-muted-foreground border-border/30';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin';
      case 'pending_admin':
        return 'Onay Bekliyor';
      default:
        return role;
    }
  };

  if (checkingRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center text-muted-foreground">Yetki kontrol ediliyor...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-card/80 backdrop-blur-sm rounded-lg shadow-xl p-6 md:p-8 border border-border/50">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => navigate('/admin')}
              variant="outline"
              size="icon"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-serif text-foreground">Kullanıcı Yönetimi</h1>
              <p className="text-muted-foreground mt-1">Tüm kullanıcıları ve yetkilerini yönetin</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Yükleniyor...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Henüz kullanıcı bulunmuyor</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>E-posta</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Kayıt Tarihi</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((userData) => (
                    <TableRow key={`${userData.user_id}-${userData.role}`}>
                      <TableCell className="font-medium">{userData.email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(userData.role)}`}>
                          {getRoleLabel(userData.role)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(userData.created_at).toLocaleString('tr-TR')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {userData.role === 'admin' && userData.user_id !== user?.id && (
                            <Button
                              onClick={() => handleRemoveAdmin(userData.user_id)}
                              disabled={removingUserId === userData.user_id}
                              variant="outline"
                              size="sm"
                              className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950"
                            >
                              <UserMinus className="w-4 h-4 mr-1" />
                              Admin Kaldır
                            </Button>
                          )}
                          {userData.user_id !== user?.id && (
                            <Button
                              onClick={() => openDeleteDialog(userData)}
                              disabled={removingUserId === userData.user_id}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            >
                              <UserMinus className="w-4 h-4 mr-1" />
                              Kullanıcıyı Sil
                            </Button>
                          )}
                          {userData.user_id === user?.id && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              Siz
                            </span>
                          )}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Kullanıcıyı Silmek İstediğinizden Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. <strong>{userToDelete?.email}</strong> kullanıcısı ve tüm verileri kalıcı olarak silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
