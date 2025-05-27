import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./pages/MainPage.jsx";
import Scrapbook from "./pages/ScrapbookPage.jsx";
import Header from './components/Header.jsx';
import styled from 'styled-components';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    padding: 0 10px;
  }
`;

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/scrapbook" element={<Scrapbook />} />
      </Routes>
    </BrowserRouter>
  );
}
