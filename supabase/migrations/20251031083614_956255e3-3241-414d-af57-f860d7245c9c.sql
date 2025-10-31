-- Drop the existing public SELECT policy
DROP POLICY IF EXISTS "Anyone can read RSVPs" ON public.wedding_rsvps;

-- Create new policy: Only authenticated users can view RSVPs
CREATE POLICY "Only authenticated users can view RSVPs"
ON public.wedding_rsvps
FOR SELECT
TO authenticated
USING (true);

-- Keep the public INSERT policy (guests can still submit RSVPs without logging in)
-- The "Anyone can submit RSVP" policy already exists and should remain unchanged