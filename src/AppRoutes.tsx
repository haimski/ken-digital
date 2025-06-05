import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from "react-router-dom";
import App from "./App";

function LanguageWrapper() {
  const { lang } = useParams();
  console.log('lang:', lang);
  return <App routeLang={lang} />;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/he" replace />} />
        <Route path="/:lang" element={<LanguageWrapper />} />
        <Route path="*" element={<Navigate to="/he" replace />} />
      </Routes>
    </Router>
  );
}