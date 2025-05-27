export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method is allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { mode, query } = req.body;

  try {
    if (mode === 'city') {
      const cityRes = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&sort=-population', {
        headers: {
          'X-RapidAPI-Key': process.env.VITE_RAPIDAPI_KEY_GEO_DB,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      });
      const data = await cityRes.json();
      const cities = data.data;
      const random = cities[Math.floor(Math.random() * cities.length)];

      return res.status(200).json({
        city: random.city,
        country: random.country,
        latitude: random.latitude,
        longitude: random.longitude,
      });
    }

    if (mode === 'image') {
      const url = `https://source.unsplash.com/800x600/?${encodeURIComponent(query.city)},travel`;
      return res.status(200).json({ imageUrl: url });
    }

    if (mode === 'weather') {
      const weatherRes = await fetch(`https://climate-api.open-meteo.com/v1/climate?latitude=${query.lat}&longitude=${query.lon}&monthly_temperature=true&timezone=auto`);
      const data = await weatherRes.json();
      const temps = data.monthly_temperature?.temperature_2m_max;
      const currentMonthIndex = new Date().getMonth();
      const monthLabel = `${currentMonthIndex + 1}월 평균 기온`;
      const value = temps?.[currentMonthIndex];

      return res.status(200).json({
        monthlyWeather: value ? `${monthLabel}: ${value}°C` : `${monthLabel}: 정보 없음`,
      });
    }

    return res.status(400).json({ error: 'Invalid mode' });
  } catch (error) {
    console.error('API 오류:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}