import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Payment from "./pages/Payment";
import Pay from './pages/Pay';
import Face from './pages/Face';
import Pin from './pages/Pin';
import Successful from './pages/Successful';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/face" element={<Face />} />
        <Route path="/pin" element={<Pin />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;