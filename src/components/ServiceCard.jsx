const ServiceCard = ({ icon, title, desc, active }) => {
  return (
    <div className={`service-card ${active ? "active" : ""}`}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      {/* <span className="more">→ Learn More</span> */}
    </div>
  );
};

export default ServiceCard;
