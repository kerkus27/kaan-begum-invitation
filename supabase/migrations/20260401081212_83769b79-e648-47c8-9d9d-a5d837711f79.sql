
-- 1. Drop the overly permissive insert policy
DROP POLICY IF EXISTS "Users can request admin access" ON public.user_roles;

-- 2. Create a stricter policy that prevents duplicate pending requests
CREATE POLICY "Users can request one pending admin" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (
  user_id = auth.uid()
  AND role = 'pending_admin'
  AND NOT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid()
  )
);

-- 3. Add unique partial index to enforce at DB level
CREATE UNIQUE INDEX IF NOT EXISTS user_roles_one_pending_per_user
  ON public.user_roles (user_id)
  WHERE role = 'pending_admin';
