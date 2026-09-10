import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import BookDetail from './pages/BookDetail';
import ReadingSession from './pages/ReadingSession';
import GrowthJournal from './pages/GrowthJournal';
import Goals from './pages/Goals';
import Analytics from './pages/Analytics';
import AICoach from './pages/AICoach';
import Discover from './pages/Discover';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="library" element={<Library />} />
          <Route path="books/:id" element={<BookDetail />} />
          <Route path="reading/session" element={<ReadingSession />} />
          <Route path="journal" element={<GrowthJournal />} />
          <Route path="goals" element={<Goals />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-coach" element={<AICoach />} />
          <Route path="discover" element={<Discover />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
