import {
  FaCheckCircle,
  FaHandshake,
  FaCogs,
  FaBolt,
  FaProjectDiagram,
  FaTools,
} from "react-icons/fa";

const ServicesData = [
  {
    id: 1,
    icon: <FaCheckCircle />,
    title: "Quality Assurance",
     desc: "At Hycare Engineering, quality is our top priority. Every product and service undergoes rigorous testing to meet the highest industry standards.",
    active: true,
  },
  {
    id: 2,
    icon: <FaHandshake />,
    title: "Customer-Centric Approach",
    desc: "We believe in building lasting relationships with our clients. Our team works closely with you to understand your requirements and deliver solutions that exceed expectations.",
  
  },
  {
    id: 3,
    icon: <FaCogs />,
    title: "CNC Turning & Lathe",
    desc: "Cylindrical parts, shafts, and rotational components with high precision and excellent concentricity.",

  },
  {
    id: 4,
    icon: <FaBolt />,
    title: "Swiss Type Machining",
    desc: "Precision small parts and high-volume production with exceptional accuracy and repeatability.",

  },
  {
    id: 5,
    icon: <FaProjectDiagram />,
    title: "5-Axis CNC Machining",
    desc: "Complex parts with intricate geometries, undercuts, and compound angles machined in single setup.",

  },
  {
    id: 6,
    icon: <FaTools />,
    title: "3-Axis CNC Milling",
    desc: "Versatile machining for flat surfaces, slots, and simple 3D geometries with excellent precision and surface finish.",

  },
];

export default ServicesData;
