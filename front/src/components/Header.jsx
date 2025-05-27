import styled from "styled-components";
import { Link} from 'react-router-dom';

const Title = styled(Link)`
  font-size: 2em;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export default function Header() {
  return (
    <HeaderContainer>
        <Title to="/scrapbook">스크랩북</Title>
    </HeaderContainer>
  );
}