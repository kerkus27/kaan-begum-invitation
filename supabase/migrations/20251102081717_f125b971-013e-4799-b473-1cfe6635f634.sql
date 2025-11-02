-- Allow users to request admin access by inserting their own pending_admin role
CREATE POLICY "Users can request admin access" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  AND role = 'pending_admin'
);