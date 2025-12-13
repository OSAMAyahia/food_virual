import React, { useState } from "react";

const CardCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // المؤشر الحالي
  const cards = [
    { title: "بيتزا", src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=230&fit=crop&q=80" },
    { title: "برجر", src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=230&fit=crop&q=80" },
    { title: "باستا", src: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=230&fit=crop&q=80" },
    { title: "شاورما", src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=230&fit=crop&q=80" },
    { title: "سلطات", src: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=230&fit=crop&q=80" },
    { title: "مأكولات بحرية", src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=230&fit=crop&q=80" },
    { title: "مأكولات عربية", src: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=230&fit=crop&q=80" },
    { title: "حلويات", src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=230&fit=crop&q=80" },
    { title: "سوشي", src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=230&fit=crop&q=80" },
    { title: "مشويات", src: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=230&fit=crop&q=80" },
    { title: "دجاج", src: "https://images.unsplash.com/photo-1606756790138-2617a898f412?w=400&h=230&fit=crop&q=80" },
    { title: "شوربات", src: "https://source.unsplash.com/400x230/?soup" },
    { title: "مشروبات", src: "https://source.unsplash.com/400x230/?juice" },
    { title: "كباب", src: "https://source.unsplash.com/400x230/?kebab" },
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
                  src={card.src}
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x230?text=No+Image'; }}
                  alt={card.title}
                  className="card-img-top"
                  style={{ width: "100%", objectFit: "cover", height: "230px" }}
                />
                <div className="card-body">
                  <p className="card-text">{card.title}</p>
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
