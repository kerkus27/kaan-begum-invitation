-- Add DELETE policy for admins on wedding_rsvps table
CREATE POLICY "Admins can delete RSVPs" ON public.wedding_rsvps
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));