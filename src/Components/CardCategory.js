import React, { useState } from "react";

const CardCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // المؤشر الحالي
  const cards = [
    "https://media-cdn.tripadvisor.com/media/photo-s/17/3b/9a/d2/burger-king.jpg",
    "https://th.bing.com/th/id/OIP.2dhr5Ln6cMHIu9SmwE_uBgHaE7?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.8h2TaHpc0W46ReOIqREdQAHaHa?w=600&h=600&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.575ba79790622387c137de7809ed6986?rik=CYVFWKcLdHyFbg&pid=ImgRaw&r=0",
    "https://www.andy-cooks.com/cdn/shop/articles/20230823074558-andy-20cooks-20-20singapore-20style-20noodles.jpg?v=1692873050",
    "https://media-cdn.tripadvisor.com/media/photo-s/17/3b/9a/d2/burger-king.jpg",
    "https://th.bing.com/th/id/OIP.8h2TaHpc0W46ReOIqREdQAHaHa?w=600&h=600&rs=1&pid=ImgDetMain",
    "https://media-cdn.tripadvisor.com/media/photo-s/17/3b/9a/d2/burger-king.jpg",
    "https://th.bing.com/th/id/OIP.2dhr5Ln6cMHIu9SmwE_uBgHaE7?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.8h2TaHpc0W46ReOIqREdQAHaHa?w=600&h=600&rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.575ba79790622387c137de7809ed6986?rik=CYVFWKcLdHyFbg&pid=ImgRaw&r=0",
    "https://www.andy-cooks.com/cdn/shop/articles/20230823074558-andy-20cooks-20-20singapore-20style-20noodles.jpg?v=1692873050",
    "https://media-cdn.tripadvisor.com/media/photo-s/17/3b/9a/d2/burger-king.jpg",
    "https://th.bing.com/th/id/OIP.8h2TaHpc0W46ReOIqREdQAHaHa?w=600&h=600&rs=1&pid=ImgDetMain",
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
