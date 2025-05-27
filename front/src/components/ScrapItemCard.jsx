import styled from 'styled-components';
import Button from './Button';
import useScrapbookStore from '../hooks/useScrapbookStore';
import { initDB, deleteScrapFromDB } from '../hooks/indexedDB';

const Card = styled.div`
  width: 100%;
  max-width: 320px;
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid #ddd;
  border-radius: 14px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const BlogLink = styled.a`
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #088395;
  text-decoration: underline;
`;

const DeleteButton = styled(Button)`
  background-color:rgb(255, 255, 255);
  color: rgb(156, 156, 156);

  &:hover {
    background-color: rgb(255, 255, 255);
    color:rgb(0, 0, 0);
  }
`;

export default function ScrapItemCard({ item }) {
  const { city, country, imageUrl } = item;
  const { removeScrapItem } = useScrapbookStore();

  const handleDelete = async () => {
    if (!confirm(`'${item.city}' 여행지를 삭제할까요?`)) return;

    try {
      const db = await initDB();
      await deleteScrapFromDB(db, item.id);
      removeScrapItem(item.id); 
    } catch (err) {
      console.error('스크랩 삭제 실패:', err);
    }
  };

  return (
    <Card>
      {imageUrl && <Image src={imageUrl} alt={`${city}`} />}
      <h3>📍 {city}, {country}</h3>
      <BlogLink
        href={`https://search.naver.com/search.naver?query=${city}+여행`}
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 {city} 여행 블로그 보기
      </BlogLink>
      <DeleteButton onClick={handleDelete}>삭제</DeleteButton> 
    </Card>
  );
}
