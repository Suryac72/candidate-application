import { Card, CardContent, Button, Typography, Chip } from "@mui/material";
import "./JobCard.css";
import PropTypes from "prop-types";

const JobCard = ({
  jdLink,
  jobDetailsFromCompany,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  location,
  minExp,
  maxExp,
  jobRole,
  companyName,
  logoUrl,
}) => {
  return (
    <Card
      variant="outlined"
      style={{
        maxWidth: "400px",
        margin: "auto",
        borderRadius: "20px",
      }}
    >
      <CardContent>
        <div className="posted-info">
          <Chip label="⏳ Posted 4 days ago" variant="outlined" />
        </div>
        <div className="company-info">
          <img src={logoUrl} alt="Company Logo" className="company-logo" />
          <Typography variant="subtitle1" className="company-name">
            {companyName}
          </Typography>
        </div>
        <div className="position-info">
          <Typography variant="subtitle2">Senior Engineer</Typography>
          <Typography variant="body2" color="textSecondary">
            {`${location} | Exp: ${minExp ?? 0} ${minExp ? "-" : ""} ${
              maxExp ?? ""
            } years`}
          </Typography>
        </div>
        <Typography variant="subtitle2" className="salary-info">
          {`Estimated Salary: ${salaryCurrencyCode} ${minJdSalary} - ${maxJdSalary} LPA ✅`}
        </Typography>
        <div className="card-description">
          <Typography variant="body1" className="company-description">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>About Company:</strong>
              <strong className="company-description-title">About us</strong>
            </div>
            {jobDetailsFromCompany}
          </Typography>
          <div />
          <div className="founder-info">
            <Typography variant="body1">
              <strong>Founder/Recruiter profiles:</strong>
              <br />
              Chirag Singh Toor
            </Typography>
            {/* <span>
              <Button variant="text" size="small">
                Show more
              </Button>
            </span> */}
          </div>
        </div>
        <Typography variant="p" className="section-title">
          Skills
        </Typography>
        <div className="skills">
          <Chip
            label={jobRole}
            color="success"
            size="small"
            style={{
              backgroundColor: "#D9FED3",
              color: "#0C359E",
              fontSize: "10px",
            }}
          />
        </div>
        <Typography variant="p" className="section-title">
          Minimum Experience
        </Typography>
        <Typography variant="body1" className="experience-info">
          5 years
        </Typography>
        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "#55EFC4",
              fontWeight: "bold",
              color: "black",
            }}
            onClick={() => window.open(jdLink, "_blank")}
          >
            View Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

JobCard.propTypes = {
  jdLink: PropTypes.string.isRequired,
  jobDetailsFromCompany: PropTypes.string.isRequired,
  maxJdSalary: PropTypes.number.isRequired,
  minJdSalary: PropTypes.number.isRequired,
  salaryCurrencyCode: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  minExp: PropTypes.number.isRequired,
  maxExp: PropTypes.number.isRequired,
  jobRole: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

export default JobCard;
