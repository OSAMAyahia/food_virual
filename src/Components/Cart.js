import React, { useEffect } from 'react';
import NavBarCom from './NavBarCom';
import { useDispatch, useSelector } from 'react-redux';
import { GetCart } from '../Redux/Food/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCart()); // جلب بيانات السلة
  }, [dispatch]);

  const { cartItems, loading, err } = useSelector((state) => state?.cart || {});

  if (loading) return <div className="spinner-border" role="status"></div>;
  if (err) return <p style={{ color: 'red' }}>Error: {err}</p>;
  if (!cartItems?.length) return <p>No food details available.</p>;

  console.log('cartItems:', cartItems);

  return (
    <div>
      <NavBarCom />
      <div className="container">
        <h3 className="mb-5">Your Cart</h3>
        <div className="row">
          <div className="col-12  col-lg-7">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h6 className='ms-3'>Product</h6>
              <div   style={{ gap: '38px', display: 'flex' }}>
                <h6   >Price</h6>
                <h6  >Quantity</h6>
                <h6 className="mx-3">Subtotal</h6>
              </div>
            </div>
            {cartItems?.map((cartItem) =>
              cartItem.products?.map((item) => (
                <div className='my-5' key={item?._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex' }}>
                  <img
  style={{
    height: '90px',
    width: '100px',
    objectFit: 'cover', // سيضمن أن الصورة ستملأ المساحة المخصصة دون تشويه
  }}
  src={item?.product?.image || item?.image || 'https://placehold.co/100x90?text=No+Image'}
  alt={item?.product?.name || item?.name || 'Product'}
  onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x90?text=No+Image'; }}
/> 

                    <p style={{ textAlign: 'left', margin: '5px' }}>
                      {item?.product?.description || 'No description available.'}
                    </p>
                  </div>
                  <div style={{ gap: '20px', display: 'flex' }}>
                    <p>{item?.product?.price ? `${item.product.price}$` : 'Price not available'}</p>
                    <input style={{ width: '100px',textAlign:'center' }} type="number" defaultValue={item?.quantity || 1} />
                    <h6 className="mx-3">
                      {item?.product?.price && item?.quantity
                        ? `${item.product.price * item.quantity}$`
                        : 'N/A'}
                    </h6>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="col-12 col-lg-5" style={{ textAlign: 'left' }}>
            <div className="p-4">
              <h5 className="mb-4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Subtotal:</strong>{' '}
                <span className="text-success">
                  {cartItems?.reduce((acc, cartItem) => {
                    return (
                      acc +
                      cartItem.products?.reduce((productAcc, item) => {
                        return productAcc + item.product?.price * item.quantity;
                      }, 0)
                    );
                  }, 0) }$
                </span>
              </h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your delivery address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="payment" className="form-label">Payment Method</label>
                  <select className="form-select" id="payment">
                    <option value="credit">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Checkout</button>
              </form>
               {/* <form>
                <h5>Delivery Details:</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone no. +91 XXXXX XXXXX"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Complete Address (Address, State, Country, Pincode)"
                    rows="3"
                  ></textarea>
                </div>
                <h5>Payment:</h5>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card Number"
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Expiration Date"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="CVV"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Card Holder Name"
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Place Order
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
