// route
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/test';
import Cart from './pages/Cart';
import Payment from "./pages/Payment";
import Pay from './pages/Pay';
import Face from './pages/Face';
import Pin from './pages/Pin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/face" element={<Face />} />
        <Route path="/pin" element={<Pin />} />
      </Routes>
    </Router>
  );
}

export default App;