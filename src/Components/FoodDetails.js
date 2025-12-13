import React, { useEffect } from 'react'
import NavBarCom from './NavBarCom';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { getfoodDetails } from '../Redux/Root';
import { useParams } from 'react-router-dom';
import { CreateCart } from '../Redux/Food/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '../showToast';

const FoodDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getfoodDetails(id)); // تمرير الـ id لجلب بيانات العنصر
  }, [id, dispatch]);

  const { currentFood, loading, error } = useSelector((state) => state?.food || {});

  if (loading) return <div className="spinner-border" role="status"></div>;

  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  if (!currentFood) return <p>No food details available.</p>;

  const AddCart=()=>{
dispatch(CreateCart({
  products:id,
  quantity:1,
}))

showToast(true)
  }
    return (
    <div className='container-fluid ' style={{textAlign:'left'}}>
      <ToastContainer/>
        <NavBarCom/>
      <div className='row my-5 ' style={{display:'flex' , justifyContent:'center'}}>
        <div className='col-4'>
        <img
            style={{ width: '100%', height: '380px', borderRadius: '50px' , objectFit:'contain'}}
            src={currentFood.image}
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x380?text=No+Image'; }}
            className="card-img-top"
            alt={currentFood.name}
          />
        </div>
        <div className='col-6'>
        <div className="my-4">
            <p><strong>Category:</strong> {currentFood.category}</p>  
             <p><strong>Price:</strong> {currentFood.price}</p>  
             <p><strong>description:</strong> {currentFood.description}</p>  
          </div>          
          <div className='my-4  ' style={{display:'flex', flexWrap:'wrap'}}>
  {Array.isArray(currentFood?.ingredients) && currentFood.ingredients.length > 0
    ? currentFood.ingredients.map((item, index) => (
        <p key={index} className='buttons'>{item}</p>
      ))
    : <p>No ingredients available.</p>}
</div>



            <div style={{display:'flex', justifyContent:'center'  }}>
            <button style={{margin:'5px', width:'100%'}}   type="button" class="btn btn-danger">Danger</button>
            <button style={{margin:'5px' ,width:'100%'}} type="button" class="btn btn-outline-danger" onClick={AddCart}>Add Cart</button>

            </div>

        </div>
      </div>
    </div>
  )
}

export default FoodDetails
