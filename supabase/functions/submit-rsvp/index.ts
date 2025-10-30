import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received RSVP submission request');
    
    const { fullName, attendance, guestCount, notes } = await req.json();

    // Validate required fields
    if (!fullName || !attendance) {
      console.error('Missing required fields:', { fullName, attendance });
      return new Response(
        JSON.stringify({ error: 'Full name and attendance are required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate attendance value
    if (!['Geleceğim', 'Gelemeyeceğim'].includes(attendance)) {
      console.error('Invalid attendance value:', attendance);
      return new Response(
        JSON.stringify({ error: 'Invalid attendance value' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert RSVP into database
    const { data, error } = await supabase
      .from('wedding_rsvps')
      .insert({
        full_name: fullName,
        attendance: attendance,
        guest_count: attendance === 'Geleceğim' ? (guestCount || 1) : null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save RSVP' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('RSVP saved successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'RSVP submitted successfully',
        data 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in submit-rsvp function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});