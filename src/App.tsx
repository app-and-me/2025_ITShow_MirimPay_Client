// route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/test';
import Cart from './pages/Cart';
import Pay from './pages/Pay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </Router>
  );
}

export default App;