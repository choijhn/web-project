import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const NavButton = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;

  &:hover {
    background-color: #ddd;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <span onClick={() => (window.location.href = '/')}>🏠</span>
      <Link to="/scrapbook">스크랩북</Link>
    </HeaderContainer>
  );
}