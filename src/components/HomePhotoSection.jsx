import "./HomePhotoSection.css";

const HomePhotoSection = ({ photos }) => {
  return (
    <section className="services-section py-5">
      <div className="container">
        <h2 className="text-center mb-2">Gallery</h2>
        <p className="text-center text-muted mb-4">
          FIND THE OPTION THAT'S RIGHT FOR YOU!
        </p>

        <div className="row">
          {photos.length > 0 ? (
            photos.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <p className="card-text text-center mb-0">{item.title}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No photos to display.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePhotoSection;
