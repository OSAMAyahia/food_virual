import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFood } from '../Redux/Root';
import {Link } from 'react-router-dom';
import on from './fav-on.png'
import off from './fav-off.png'
 
const Card = () => {
  const dispatch = useDispatch();

  const {foodItem,loading,error}= useSelector((state) => state?.food || {});
  console.log("foods is",foodItem);
  console.log("foods is",loading);
  console.log("  foodItem.img",foodItem.imgs
  );
  const [fav,setfav]=useState({})

  useEffect(() => { 
    const state=async()=>{
      await dispatch(fetchFood());
 
    }
    state()
    console.log(fav)

  }, [fav ]);

  const FavFun = (id) => setfav((state) => {
      return {
        ...state,
        [id]: !state[id],
      };
    });
  
  


  return (
     <div className="container">
      <h3 className="text-center my-4">Most Popular</h3>

      {loading && <div class="spinner-border" role="status">
  </div>}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <div className="row justify-content-center">
        {foodItem?.length > 0 ? (
          foodItem.map((i, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 my-3" key={index}>
              <div className="card" style={{ width: '100%' }}>
              <Link to={`/details/${i._id}`} style={{ textDecoration: 'none' }}>

                <img
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    height: '380px',  //230
                  }} 
                  src={`http://localhost:5000/uploads/${i.imgs}`}
                 
                  className="card-img-top"
                  alt="Food Item"
                />   </Link>
                <div className="card-body ">
                  <p className="card-text">
                    <strong>{i.name}</strong> <br />
                    {i.description} <br />
                    <div className='d-flex justify-content-between my-3 align-items-center'>
                    <p className='text-start'>                           <span className="text-primary fw-bold">${i.price}</span>
                    </p>
                    {fav[i._id]? <img onClick={()=>FavFun(i._id)} className='text-start' style={{width:'30px', height:'30px',   left:'250px', cursor:'pointer'}} src={on} /> :
                    <img onClick={()=>FavFun(i._id)} className='text-start' style={{width:'30px', height:'30px',   left:'250px',cursor:'pointer'}} src={off}/>
                    }

                    </div>
                  </p>

                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && !error && <p>No food items available.</p>
        )}
      </div>
    </div>
  
  );
};

export default Card;
