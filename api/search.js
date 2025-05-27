// /api/search.js
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
      const city = await getRandomCity();
      return res.status(200).json(city);
    }

    if (mode === 'image') {
      const result = await getImage(query.city);
      return res.status(200).json(result);
    }

    return res.status(400).json({ error: 'Invalid mode' });
  } catch (error) {
    console.error('API 경고:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
}

async function getRandomCity() {
  const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&sort=-population';

  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_GEO_DB,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  });

  const json = await res.json();
  console.log('[Geo DB 응답]', json);

  const cities = json.data;
  if (!cities || cities.length === 0) {
    throw new Error('Error: 도서 데이터를 불러오지 못했습니다.');
  }

  const random = cities[Math.floor(Math.random() * cities.length)];

  return {
    city: random.city,
    country: random.country,
    latitude: random.latitude,
    longitude: random.longitude,
    population: random.population,
  };
}

async function getImage(city) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(city + ' travel')}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  const res = await fetch(url);
  const json = await res.json();
  const firstImage = json.results?.[0]?.urls?.regular;

  return {
    imageUrl: firstImage || '/default.jpg',
  };
}