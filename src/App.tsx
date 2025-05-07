// route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/test';
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;