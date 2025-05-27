import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;



export default function Header() {
  return (
    <HeaderContainer>
      <button onClick={() => (window.location.href = '/')}>🏠</button>
      <Link to="/scrapbook">스크랩북</Link>
    </HeaderContainer>
  );
}