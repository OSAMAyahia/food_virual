import React, { useState } from "react";

const CardCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // المؤشر الحالي
  const cards = [
    "https://images.unsplash.com/photo-1606756790138-2617a898f412?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605478371315-105910a68be9?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604908554160-1d7a0d054a85?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543332164-6b06f531ea49?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604908177590-2995d4e0a3a5?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523986371872-9d3ba2e2d21f?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543353071-873f17a7a5c9?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1601050690037-31d1350d1cfa?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544025167-0d3a66f1c5f8?w=400&h=230&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542831371-d531d36971e6?w=400&h=230&fit=crop&q=80",
  ];

  const cardsPerPage = 5; // عدد الكروت التي تظهر معًا
  const step = 4; // عدد الكروت التي يتم التحرك بها عند الضغط على الزر

  // التنقل لليمين
  const handleNext = () => {
    if (currentIndex + step < cards.length - cardsPerPage + 1) {
      setCurrentIndex(currentIndex + step);
    }
  };

  // التنقل لليسار
  const handlePrev = () => {
    if (currentIndex - step >= 0) {
      setCurrentIndex(currentIndex - step);
    }
  };

  return (
    <div className="container my-5">
      <h4 className="my-5">Category</h4>
      <div className="d-flex justify-content-between align-items-center">
        {/* زر اليسار */}
        <button
          className="btn btn-primary"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          &lt; {/* سهم لليسار */}
        </button>

        {/* عرض الكروت */}
        <div className="d-flex overflow-hidden" style={{ width: "100%" }}>
          <div
            className="d-flex"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsPerPage}%)`,
              transition: "transform 0.5s ease-in-out",
              width: `${(cards.length * 100) / cardsPerPage}%`,
            }}
          >
            {cards.map((card, index) => (
              <div
                className="card mx-2"
                style={{ width: `${100 / cardsPerPage}%`, flexShrink: 0 }}
                key={index}
              >
                <img
                  src={card}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x230?text=No+Image'; }}
                  alt={`Card ${index}`}
                  className="card-img-top"
                  style={{ width: "100%", objectFit: "cover", height: "230px" }}
                />
                <div className="card-body">
                  <p className="card-text">Card {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* زر اليمين */}
        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={currentIndex + cardsPerPage >= cards.length}
        >
          &gt; {/* سهم لليمين */}
        </button>
      </div>
    </div>
  );
};

export default CardCategory;
