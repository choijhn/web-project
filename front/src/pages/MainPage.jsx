import { useState } from 'react';
import styled from 'styled-components';
//import Header from '../components/Header';
import TravelPost from '../components/TravelPost';

const PageWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto 2rem;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #1a6ed8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export default function MainPage () {
  const [travelData, setTravelData] = useState(null);

  const handleRandomClick = async () => {
    try {
      // 1. 도시 정보
      const cityRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'city' }),
      });
      const city = await cityRes.json();

      // 2. 이미지 요청
      const imageRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'image', query: { city: city.city } }),
      });
      const image = await imageRes.json();

      // 3. 날씨 요청
      const weatherRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'weather', query: { lat: city.latitude, lon: city.longitude } }),
      });
      const weather = await weatherRes.json();

      // 4. 데이터 결합
      setTravelData({
        city: city.city,
        country: city.country,
        imageUrl: image.imageUrl || image.url, // 실제 응답 속성 확인 필요
        monthlyWeather: weather.monthlyWeather || '날씨 정보 없음',
        description: `여행지 ${city.city}에 대한 소개 문구는 준비 중입니다.`,
      });
    } catch (err) {
      console.error('🌐 랜덤 여행지 추천 실패:', err);
    }
  };

  return (
    <PageWrapper>
      <Title>🎲 오늘의 랜덤 여행지</Title>
      <Button onClick={handleRandomClick}>다른 여행지 추천받기</Button>
      <TravelPost data={travelData} />
    </PageWrapper>
  );
}