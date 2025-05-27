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
  const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&sort=-population';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY_GEO_DB,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  });

  const data = await response.json();

  console.log('🔍 GeoDB 응답 상태코드:', response.status);
  console.log('🔍 GeoDB 응답 내용:', JSON.stringify(data, null, 2));

  return res.status(response.status).json(data);
}
  } catch (error) {
    console.error('🔥 API 서버 오류:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}