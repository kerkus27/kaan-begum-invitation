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
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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

    // Create CSV content
    const headers = ['Ad Soyad', 'Katılım Durumu', 'Kişi Sayısı', 'Notlar', 'Tarih'];
    const csvRows = [headers.join(',')];

    if (rsvps && rsvps.length > 0) {
      for (const rsvp of rsvps) {
        const row = [
          `"${rsvp.full_name}"`,
          `"${rsvp.attendance}"`,
          rsvp.guest_count || 'N/A',
          `"${rsvp.notes || ''}"`,
          `"${new Date(rsvp.created_at).toLocaleString('tr-TR')}"`,
        ];
        csvRows.push(row.join(','));
      }
    }

    const csvContent = csvRows.join('\n');
    
    // Add BOM for proper Excel UTF-8 encoding
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