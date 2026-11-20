const SERIES = {
  DXY: "DTWEXBGS",
  US10Y: "DGS10",
  US2Y: "DGS2",
  REAL_YIELD: "DFII10",
  FED_RATE: "FEDFUNDS",
  CPI: "CPIAUCSL",
  PCE: "PCEPI"
};

export default async () => {
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "FRED_API_KEY belum dipasang di Netlify"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const results = {};

    for (const [name, id] of Object.entries(SERIES)) {
      const url = new URL(
        "https://api.stlouisfed.org/fred/series/observations"
      );

      url.search = new URLSearchParams({
        series_id: id,
        api_key: apiKey,
        file_type: "json",
        sort_order: "desc",
        limit: "10"
      });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`FRED gagal mengambil ${name}`);
      }

      const data = await response.json();

      const valid = (data.observations || []).filter(
        item => item.value !== "."
      );

      const latest = valid[0];
      const previous = valid[1];

      results[name] = {
        id,
        latest: latest ? Number(latest.value) : null,
        previous: previous ? Number(previous.value) : null,
        change:
          latest && previous
            ? Number(latest.value) - Number(previous.value)
            : null,
        date: latest?.date || null
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        updated_at: new Date().toISOString(),
        series: results
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=900"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
