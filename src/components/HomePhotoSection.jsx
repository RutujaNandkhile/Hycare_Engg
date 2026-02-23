import { useEffect, useState } from "react";
import photoStore from "../store/photostore";
import "./HomePhotoSection.css";

const HomePhotoSection = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const unsub = photoStore.subscribe((data) => {
      setPhotos([...data].reverse()); // recent first
    });
    return () => unsub();
  }, []);

  /* 🔥 AUTO SLIDE */
  useEffect(() => {
    if (photos.length <= 1) return;
    const t = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(t);
  }, [photos, index]);

  /* 🔥 MANUAL BUTTONS */
  const nextSlide = () => {
    setIndex((p) => (p + 1) % photos.length);
  };

  const prevSlide = () => {
    setIndex((p) => (p - 1 + photos.length) % photos.length);
  };

  /* 🔥 5 items for half-peek effect */
  const getVisible = () => {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(photos[(index + i) % photos.length]);
    }
    return arr;
  };

  const visible = getVisible();

  return (
    <section className="gallery">
      <h2>Gallery</h2>

      <div className="slider-wrapper">

        {/* Prev */}
        <button className="nav prev" onClick={prevSlide}>‹</button>

       <div className="slider">
  {visible.map((p, i) => (
    <div key={p?.id || i} className={`slide pos-${i}`}>
      <img src={p?.image} alt={p?.title} />
      <p>{p?.title}</p>
    </div>
  ))}
</div>


        {/* Next */}
        <button className="nav next" onClick={nextSlide}>›</button>

      </div>
    </section>
  );
};

export default HomePhotoSection;
