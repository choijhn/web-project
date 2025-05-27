import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
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
  color: #1a6ed8;
  text-decoration: underline;
`;

export default function ScrapItemCard({ item }) {
  const { city, country, monthlyWeather, food, flightPrice, imageUrl } = item;

  return (
    <Card>
      {imageUrl && <Image src={imageUrl} alt={`${city}`} />}
      <h3>📍 {city}, {country}</h3>
      <p>🌤️ {monthlyWeather}</p>
      <p>🍽️ {food?.join(', ')}</p>
      <p>✈️ 항공권: {flightPrice}</p>
      <BlogLink
        href={`https://search.naver.com/search.naver?query=${city}+여행`}
        target="_blank"
        rel="noopener noreferrer"
      >
        🔗 {city} 여행 블로그 보기
      </BlogLink>
    </Card>
  );
}
