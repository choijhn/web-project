import React from 'react';
import styled from 'styled-components';
import useScrapbookStore from '../hooks/useScrapbookStore';
import { initDB, addScrapbookItem } from '../hooks/indexedDB';

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
  color: #1a6ed8;
  text-decoration: underline;
`;

const AddButton = styled.button`
  display: block;
  margin: 1.2rem auto 0;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #1a6ed8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default function TravelPost({ data }) {
  const { scrapbook, addScrap } = useScrapbookStore();

  const {
    city,
    country,
    imageUrl,
    monthlyWeather,
    description,
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
      await addScrapbookItem(db, scrapData);
      addScrap(scrapData);
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
      <AddButton onClick={handleAddScrap} disabled={alreadyExists}>
        {alreadyExists ? '✅ 이미 스크랩됨' : '📥 스크랩 추가하기'}
      </AddButton>
    </Card>
  );
}