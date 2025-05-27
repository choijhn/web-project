import { useState } from 'react';
import styled from 'styled-components';
import TravelPost from '../components/TravelPost';
import Button from '../components/Button';

const PageWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 2rem;
`;

const Header = styled.header`
  width: 100%;
  text-align: right;
  margin-bottom: 1rem;

  button {
    margin-left: 0.5rem;
    background: none;
    border: none;
    color: #088395;
    font-weight: bold;
    cursor: pointer;
  }
`;

export default function MainPage() {
  const [travelData, setTravelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRandomClick = async () => {
    try {
      setIsLoading(true);

      const cityRes = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'city' }),
      });
      const city = await cityRes.json();

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Header>
        <button onClick={() => (window.location.href = '/')}>홈</button>
        <button onClick={() => (window.location.href = '/scrapbook')}>스크랩북</button>
      </Header>
      <Title>🌎 오늘의 랜덤 여행지</Title>
      {!travelData && (
        <Button onClick={handleRandomClick} disabled={isLoading}>
          {isLoading ? '로딩 중...' : '🎲 Roll the Dice 🎲'}
        </Button>
      )}
      {travelData ? (
        <TravelPost data={travelData} />
      ) : (
        <p>여행지를 추천받아보세요!</p>
      )}
    </PageWrapper>
  );
}
