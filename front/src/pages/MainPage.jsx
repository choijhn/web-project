import { useState } from 'react';
import styled from 'styled-components';
import TravelPost from '../components/TravelPost';
import Button from '../components/Button';

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

export default function MainPage() {
  const [travelData, setTravelData] = useState(null);

  const handleRandomClick = async () => {
    try {
      // 도시 정보
      const cityRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'city' }),
      });
      const city = await cityRes.json();

      // 이미지
      const imageRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'image', query: { city: city.city } }),
      });
      const image = await imageRes.json();

      if (!city.city || !city.country) {
        throw new Error('도시 정보를 불러올 수 없습니다.');
      }

      setTravelData({
        city: city.city,
        country: city.country,
        imageUrl: image.imageUrl || '',
      });
    } catch (err) {
      console.error('🌐 랜덤 여행지 추천 실패:', err);
    }
  };

  return (
    <PageWrapper>
      <Title>🌎 오늘의 랜덤 여행지</Title>
      <Button onClick={handleRandomClick}>🎲 Roll the Dice 🎲</Button>
      {travelData ? (
        <TravelPost data={travelData} />
      ) : (
        <p style={{ textAlign: 'center' }}>여행지를 추천받아보세요!</p>
      )}
    </PageWrapper>
  );
}