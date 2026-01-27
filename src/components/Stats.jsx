import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper"; // ✅ Works in Swiper 9
import "swiper/css";
import "./Stats.css";

// Counter Component
const Counter = ({ end, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / 50);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="stat">
      <h2>
        {count}
        {end >= 100 ? "+" : ""}
      </h2>
      <p>{label}</p>
    </div>
  );
};

// Stats Slider Component
const Stats = () => {
  const statsData = [
    { end: 30, label: "Years Experience" },
    { end: 150, label: "Project Done" },
    { end: 100, label: "Happy Client" },
    { end: 50, label: "Awards Won" },
  ];

  return (
    <section className="stats">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        }}
      >
        {statsData.map((stat, index) => (
          <SwiperSlide key={index}>
            <Counter end={stat.end} label={stat.label} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Stats;
