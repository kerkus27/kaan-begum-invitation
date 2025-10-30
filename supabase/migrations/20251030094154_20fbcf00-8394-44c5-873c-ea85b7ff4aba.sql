-- Create table for wedding RSVPs
CREATE TABLE public.wedding_rsvps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('Geleceğim', 'Gelemeyeceğim')),
  guest_count INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.wedding_rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can submit RSVP" 
ON public.wedding_rsvps 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading (for admin purposes)
CREATE POLICY "Anyone can read RSVPs" 
ON public.wedding_rsvps 
FOR SELECT 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_wedding_rsvps_created_at ON public.wedding_rsvps(created_at DESC);