import { useState, useEffect } from "react";
import About from "./About";
import Stats from "./Stats";
import Services from "./Services";
import Partners from "./Partners";
import PartnershipSection from "./Partnership/PartnershipSection";
import HomePhotoSection from "../components/HomePhotoSection";
import FAQComponent from "./FAQComponent";
import homeVideo from "../assets/video/homevideo.mp4";
import photoStore from "../store/photostore";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  // Load photos from localStorage on mount
  useEffect(() => {
    photoStore.load(); // load from localStorage
    setPhotos([...photoStore.photos]); // trigger re-render with photos
  }, []);

  return (
    <>
      <section className="hero-video-section">
        <div className="hero-overlay"></div>
        <h1 className="hero-title">
          HYCARE <span>INDUSTRIES</span>
        </h1>

        <div className="full-video-box">
          <video
            className="full-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <About />
      <Stats />
      <Services />
      <Partners />
      <HomePhotoSection photos={photos} /> {/* pass state here */}
      <PartnershipSection />
      <FAQComponent />
    </>
  );
};

export default Home;
