import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from "./pages/MainPage.jsx";
import Scrapbook from "./pages/ScrapbookPage.jsx";
import Header from './components/Header.jsx';

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
