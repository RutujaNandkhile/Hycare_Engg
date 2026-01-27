import React from "react";
import "./Home.css"; // adjust path if Home.css is in componants folder

import images7 from "../assets/img/images7.jpg";
import job from "../assets/img/job.jpg";
import job1 from "../assets/img/job1.jpg";

const About = () => {
    return (
        <section className="about-wrap">
            <div className="about-images">
                <img className="img one" src={images7} alt="Image 1" />
                <img className="img two" src={job} alt="Image 2" />
                <img className="img three" src={job1} alt="Image 3" />
            </div>

            <div className="about-content">
                <h2>
                    About HyCare
                    <br />
                    Website
                </h2>
                <p>
                    At HYCARE ENGINEERING, our experienced team delivers top-quality spot-welding electrodes, 
                    CNC components, and fabrication services. We combine expertise, precision, 
                    and modern techniques to ensure exceptional results for our clients. 
                    Our products are suitable for high-conductivity materials like copper and are
                     ideal for spot welding, roller seam welding, projection welding, and upset welding.
                     
                </p>
                <button>Learn More</button>
            </div>
        </section>
    );
};

export default About;
