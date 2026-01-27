import BenefitItem from "./BenefitItem";
import {
  benefitsData,
  trackRecordData,
  industries,
} from "../../data/partnershipData";
import "./partnership.css";

const PartnershipSection = () => {
  return (
    <section className="partnership container">
      <span className="badge">WHY CHOOSE US</span>

      <h2>
        Partnership <span>Benefits</span>
      </h2>

      <p className="subtitle">
        Experience the advantages of working with StrongerCNC – your trusted
        manufacturing partner since 2012.
      </p>

      {/* TWO SECTIONS */}
      <div className="row partnership-sections">
        {/* LEFT : BENEFITS */}
        <div className="col-lg-6 col-md-12 benefits-section">
          {benefitsData.map((item, index) => (
            <BenefitItem key={index} item={item} />
          ))}
        </div>

        {/* RIGHT : TRACK RECORD */}
        <div className="col-lg-6 col-md-12 track-record">
          <h3>Our Track Record</h3>

          <div className="stats-grid">
            {trackRecordData.map((stat, index) => (
              <div className="stat-card" key={index}>
                <h2 className={`stat-value ${stat.color}`}>
                  {stat.value}
                </h2>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          <hr />

          <h4>Industries Served</h4>

          <div className="industry-tags">
            {industries.map((industry, index) => (
              <span key={index} className="tag">
                {industry}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
