import './App.css';
import FoodDetails from './Components/FoodDetails';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
  import HomeS from './Components/Home';
import Cart from './Components/Cart';
 import Filter from './Components/Filter';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ProfilePage from './Components/Profile';
import OrdersPage from './Components/Order';
import ProtecRouteHook from './Components/Hooks/ProtecRouteHook';
import SecurityWrapper from './Components/Hooks/SecurityWrapper';
 
function App() {
  const [islogged]=ProtecRouteHook("off")
  console.log('the state of loged user is' , islogged)
  return (
    <div className="App  ">
        <Router>
        <Routes>
    <Route index element={<HomeS islogged={islogged}/>} />
    <Route path="/login" element={<Login   />} />
    <Route path="/signup" element={<Signup />} />
  <Route element={<SecurityWrapper islogged={islogged} route={'/login'} />}>
    <Route path="/details/:id" element={<FoodDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/category" element={<Filter />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/order" element={<OrdersPage />} />
  </Route>
   <Route path="*" element={<Navigate to="/" />} />
</Routes>


    </Router>
      </div>
  );
}

export default App;
