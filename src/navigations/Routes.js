import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import Home from '../components/pages/homepage/Home';
import LoginPage from '../components/pages/loginpage/LoginPage';
import SignupPage from '../components/pages/signuppage/SignupPage';
import AddProductPage from '../components/pages/addProductpage/addProductPage';
import ProductDetailPage from '../components/pages/productdetailpage/ProductDetailPage';
import AddToCartPage from '../components/pages/addtocartpage/AddToCartPage';
import PageNotFound from '../components/pages/404Page/PageNotFound';
export default function PageRoutes() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/addproduct" element={<AddProductPage/>} />
        <Route path="/product/:id" element={<ProductDetailPage/>} />
        <Route path="/addtocart" element={<AddToCartPage/>} />
        <Route path="*" element={<PageNotFound/>} />
        </Routes>
    </Router>
  );
}
