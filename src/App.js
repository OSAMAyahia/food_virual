import './App.css';
import FoodDetails from './Components/FoodDetails';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomeS from './Components/Home';
import Cart from './Components/Cart';
import Filter from './Components/Filter';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProfilePage from './Components/Profile';
import OrdersPage from './Components/Order';
import ProtecRouteHook from './Components/Hooks/ProtecRouteHook';
import SecurityWrapper from './Components/Hooks/SecurityWrapper';
import Footer from './Components/Footer';
import Contact from './Components/Contact';
import Favorites from './Components/Favorites';
import SearchResults from './Components/SearchResults';
import Categories from './Components/Categories';
import NavBarCom from './Components/NavBarCom';
import Checkout from './Components/Checkout';
import OrderConfirmation from './Components/OrderConfirmation';
import ConditionalNavBar from './Components/ConditionalNavBar';
import ConditionalFooter from './Components/ConditionalFooter';
import { useDispatch } from 'react-redux';
import { checkAuth } from './Redux/Food/Security';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const [islogged] = ProtecRouteHook("off")
  console.log('the state of loged user is', islogged)
  return (
    <div className="App  ">
      <Router>
        <ConditionalNavBar islogged={islogged} />
        <Routes>
          <Route index element={<HomeS islogged={islogged} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/details/:id" element={<FoodDetails />} />
          <Route path="/dishes" element={<Categories />} />
          <Route element={<SecurityWrapper islogged={islogged} route={'/login'} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/order" element={<OrdersPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <SearchResults />
        <ConditionalFooter />
      </Router>
    </div>
  );
}

export default App;