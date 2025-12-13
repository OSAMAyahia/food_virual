import React, { useEffect, useState } from "react";
import NavBarCom from "./NavBarCom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFood } from "../Redux/Root";
import { Link } from "react-router-dom";

const Filter = () => {
  const dispatch = useDispatch();
  const { foodItem, loading, error } = useSelector((state) => state?.food || {});

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(130); // عرض جميع الأسعار افتراضيًا من 130

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchFood());
    };
    fetchData();
  }, [dispatch]);

  // تصفية العناصر
  const filteredFoodItems = Array.isArray(foodItem)
    ? foodItem.filter(
        (item) =>
          (selectedCategories.length === 0 || selectedCategories.includes(item.name)) &&
          (priceRange === 130 // "All" يعرض جميع العناصر إذا كانت
            ? true
            : priceRange === 150
            ? item.price >= 150 // تصفية الأسعار من 150 إلى الأقل
            : item.price <= priceRange) // تصفية العناصر الأقل من القيمة الحالية
      )
    : [];

  // تحديث الفئات المحددة
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <NavBarCom />

      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <h3 className="mb-3">Food Categories</h3>
            <div className="btn-group-vertical w-100 mb-4" role="group" aria-label="Basic checkbox toggle button group">
              {Array.isArray(foodItem) && foodItem.length > 0 ? (
                foodItem.map((i) => (
                  <div key={i._id}>
                    <input
                      type="checkbox"
                      className="btn-check"
                      id={`btncheck${i._id}`}
                      autoComplete="off"
                      onChange={() => handleCategoryChange(i.name)}
                    />
                    <label className="btn btn-outline-dark" htmlFor={`btncheck${i._id}`}>{i.name}</label>
                  </div>
                ))
              ) : (
                loading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <p>No food items available.</p>
                )
              )}
            </div>

            <label htmlFor="customRange3" className="form-label">
              Filter by Price: {priceRange === 130 ? "All" : `$${priceRange}`}
            </label>
            <input
              type="range"
              className="form-range"
              min="130"
              max="5000"
              step="10"
              id="customRange3"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
            />
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <div className="row g-4">
              {loading && (
                <div className="d-flex justify-content-center w-100">
                  <div className="spinner-border" role="status" />
                </div>
              )}
              {error && <p className="text-danger">Error: {error}</p>}
              {filteredFoodItems.length > 0 ? (
                filteredFoodItems.map((i, index) => (
                  <div className="col-12 col-sm-6 col-lg-4" key={index}>
                    <div className="card h-100">
                      <Link to={`/details/${i._id}`} style={{ textDecoration: "none" }}>
                        <img
                          src={i.image}
                          onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x230?text=No+Image'; }}
                          className="card-img-top"
                          alt={i.name}
                          style={{
                            width: "100%",
                            height: "230px",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title">{i.name}</h5>
                        <p className="card-text">{i.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-primary fw-bold">${i.price}</span>
                          <Link to={`/details/${i._id}`} className="btn btn-sm btn-dark">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No food items available matching your filters.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
