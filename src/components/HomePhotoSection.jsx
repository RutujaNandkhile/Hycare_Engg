import { useEffect, useState } from "react";
import photoStore from "../store/photostore";
import "./HomePhotoSection.css";

const HomePhotoSection = () => {
  const [photos, setPhotos] = useState(photoStore.photos);

  useEffect(() => {
    const unsub = photoStore.subscribe(setPhotos);
    return () => unsub();
  }, []);

  return (
    <section className="services-section py-5">
      <div className="container">
        <h2 className="text-center mb-4">Gallery</h2>

        <div className="row">
          {photos.length ? (
            photos.map((p) => (
              <div key={p.id} className="col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src={p.image}
                    className="card-img-top"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    {p.title}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No photos available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePhotoSection;
