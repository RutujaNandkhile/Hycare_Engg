import "./Services.css";
import ServiceCard from "./ServiceCard";
import servicesData from "./servicesData";

const Services = () => {
  return (
    <section className="services">
      <div className="services-head">
        <div className="services-name">
          <h6>Service We Provide</h6>
          <h2>Machining Categories</h2>
          
          <p>
            Comprehensive CNC machining services with advanced equipment and experienced operators for all your manufacturing needs.
          </p>
        </div>
        <button className="btn">Learn More</button>
      </div>

      <div className="grid">
        {servicesData.map((item) => (
          <ServiceCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            active={item.active}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
    