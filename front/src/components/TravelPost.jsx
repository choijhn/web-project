import styled from 'styled-components';
import useScrapbookStore from '../hooks/useScrapbookStore';
import { initDB, saveScrapToDB } from '../hooks/indexedDB';
import Button from './Button';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 14px;
  padding: 1.5rem;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const BlogLink = styled.a`
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.95rem;
  color: #088395;
  text-decoration: underline;
`;

export default function TravelPost({ data }) {
  const { scrapbook, addScrapItem } = useScrapbookStore();

  const {
    city,
    country,
    imageUrl,
  } = data;

  const alreadyExists = scrapbook.some((item) => item.city === city);

  const handleAddScrap = async () => {
    if (alreadyExists) return;
    try {
      const db = await initDB();
      const scrapData = {
        id: Date.now(),
        city,
        country,
        imageUrl,
      };
      await saveScrapToDB(db, scrapData);
      addScrapItem(scrapData);
    } catch (err) {
      console.error('스크랩 추가 실패:', err);
    }
  };

  return (
    <Card>
      <Image src={imageUrl} alt={`${city}`} />
      <h3>📍 {city}, {country}</h3>
      <BlogLink
        href={`https://search.naver.com/search.naver?query=${city}+여행`}
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 {city} 여행 블로그 보기
      </BlogLink>
      <Button onClick={handleAddScrap} disabled={alreadyExists}>
        {alreadyExists ? '✅ 이미 스크랩됨' : '📥 스크랩 추가하기'}
      </Button>
    </Card>
  );
}