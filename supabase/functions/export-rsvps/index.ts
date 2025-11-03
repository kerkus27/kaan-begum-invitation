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
    console.log('Exporting RSVPs to CSV');
    
    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify user authentication
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.error('Auth error:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if user has admin role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .maybeSingle();

    if (roleError || !roleData) {
      console.error('Role check error:', roleError);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Admin user ${user.email} exporting RSVPs`);

    // Fetch all RSVPs
    const { data: rsvps, error } = await supabase
      .from('wedding_rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch RSVPs' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Found ${rsvps?.length || 0} RSVPs`);

    // Create CSV content with proper escaping for Turkish characters
    const headers = ['Ad Soyad', 'Katılım Durumu', 'Kişi Sayısı', 'Notlar', 'Tarih'];
    const csvRows = [headers.join(',')];

    if (rsvps && rsvps.length > 0) {
      for (const rsvp of rsvps) {
        // Properly escape strings that contain commas, quotes, or Turkish characters
        const escapeCsvField = (field: string) => {
          // Replace any double quotes with two double quotes
          const escaped = field.replace(/"/g, '""');
          // Wrap in quotes
          return `"${escaped}"`;
        };

        const row = [
          escapeCsvField(rsvp.full_name),
          escapeCsvField(rsvp.attendance),
          rsvp.guest_count?.toString() || '1',
          escapeCsvField(rsvp.notes || ''),
          escapeCsvField(new Date(rsvp.created_at).toLocaleString('tr-TR')),
        ];
        csvRows.push(row.join(','));
      }
    }

    const csvContent = csvRows.join('\n');
    
    // Add BOM (Byte Order Mark) for proper Excel UTF-8 encoding with Turkish characters
    const bom = '\uFEFF';
    const csvWithBom = bom + csvContent;

    console.log('CSV export successful');

    return new Response(csvWithBom, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="wedding-rsvps.csv"',
      },
    });
  } catch (error) {
    console.error('Error in export-rsvps function:', error);
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