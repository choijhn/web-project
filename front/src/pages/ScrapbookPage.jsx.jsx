import { useEffect } from 'react';
import useScrapbookStore from '../hooks/useScrapbookStore';
import { initDB, loadScrapsFromDB } from '../hooks/indexedDB';import styled from 'styled-components';
import ScrapItemCard from '../components/ScrapItemCard';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const ScrapList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

export default function ScrapbookPage() {
  const { scrapbook, setScrapbook } = useScrapbookStore();

  useEffect(() => {
    async function fetchScrapbook() {
      try {
        const db = await initDB();
        const items = await loadScrapsFromDB(db);
        setScrapbook(items);
      } catch (error) {
        console.error('스크랩북 아이템 로드 실패:', error);
      }
    }

    fetchScrapbook();
  }, [setScrapbook]);

  return (
    <PageWrapper>
      <Title>📚 스크랩북</Title>
      {scrapbook.length === 0 ? (
        <p>아직 저장된 여행지가 없어요!</p>
      ) : (
        <ScrapList>
          {scrapbook.map((item) => (
            <ScrapItemCard key={item.id} item={item} />
          ))}
        </ScrapList>
      )}
    </PageWrapper>
  );
}