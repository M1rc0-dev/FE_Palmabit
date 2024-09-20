import "./Landing.css";
import Button from "../../library/Button";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/services");
  };

  return (
    <div className="splash">
      <h1>Welcome to Lithia Motors</h1>
      <div className="mainContent">
        <img src="../images/logo.png" alt="immagine del logo" height={300} />
        <p>
          Lithia Motors wants to put you in full control of your car-owning
          experience by providing easy to book service appointments from the
          comfort of your own home!
        </p>
        <div>
          <Button onClick={handleGetStartedClick}>Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
