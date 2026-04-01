import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received RSVP submission request');
    
    const { fullName, attendance, guestCount, notes } = await req.json();

    if (!fullName || !attendance) {
      return new Response(
        JSON.stringify({ error: 'Full name and attendance are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Input length validation
    const trimmedName = String(fullName).trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name must be 2-100 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (notes && String(notes).length > 500) {
      return new Response(
        JSON.stringify({ error: 'Notes too long (max 500 characters)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!['Geleceğim', 'Gelemeyeceğim'].includes(attendance)) {
      return new Response(
        JSON.stringify({ error: 'Invalid attendance value' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and clamp guest count
    const validGuestCount = attendance === 'Geleceğim'
      ? Math.min(Math.max(parseInt(guestCount) || 1, 1), 20)
      : null;

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('wedding_rsvps')
      .insert({
        full_name: trimmedName,
        attendance: attendance,
        guest_count: validGuestCount,
        notes: notes ? String(notes).slice(0, 500) : null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save RSVP' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('RSVP saved successfully');

    return new Response(
      JSON.stringify({ success: true, message: 'RSVP submitted successfully' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in submit-rsvp function:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
