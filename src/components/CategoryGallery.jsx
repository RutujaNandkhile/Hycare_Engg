import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photoStore from "../store/photostore";
import "./CategoryGallery.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const CategoryGallery = ({ category }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // ⭐ selected image for lightbox

  useEffect(() => {
    const unsub = photoStore.subscribe(() => {
      setPhotos(photoStore.getByCategory(category));
    });
    setPhotos(photoStore.getByCategory(category));
    return () => unsub();
  }, [category]);

  if (!photos.length)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
        No photos in "{category}"
      </p>
    );

  return (
    <section className="category-gallery-section">
      <div className="container py-5 text-center">
        <h2 className="gallery-title">{category}</h2>
        <p className="gallery-subtitle">
          Explore our latest projects and photos for {category}.
        </p>

        <motion.div
          className="row g-4 justify-content-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((p) => (
            <motion.div
              key={p.id}
              className="col-6 col-md-4 col-lg-3"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="photo-card" onClick={() => setSelectedImage(p.image)}>
                <motion.img
                  src={p.image}
                  alt={p.title}
                  className="photo-img"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.img
                src={selectedImage}
                alt="Enlarged"
                className="lightbox-image"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoryGallery;
