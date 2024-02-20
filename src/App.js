//import Login from './Components/Login'
// import Api from './Services/Api'
import Login from './Components/Auth/Login'
import Product from './Components/Auth/Product'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Product />} />
      </Routes>

    </Router>

  );
}

export default App;
