import ExpandableCard from "components/library/ExpandableCard";
import React from "react";
import { ReactComponent as OilChangeIcon } from "../../icons/oil-change-icon.svg";
import { ReactComponent as TiresIcon } from "../../icons/tires-icon.svg";
import { ReactComponent as DetailIcon } from "../../icons/detail-icon.svg";
import { ReactComponent as CaretIcon } from "../../icons/caret-icon.svg";
import "./Services.css";
import { useState, useEffect } from "react";
import { getServices } from "utils/services";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      const serviceData = await getServices();
      setServices(serviceData);
    };

    fetchServices();
  }, []);

  const getIcon = (serviceName) => {
    switch (serviceName) {
      case "Synthetic Oil Change":
        return <OilChangeIcon />;
      case "Tire Rotation & Inspection":
        return <TiresIcon />;
      case "Express Auto Detailing":
        return <DetailIcon />;
      default:
        return <CaretIcon />;
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="splash">
      <div>
        <button className="backButton" onClick={handleBackClick}>
          Back
        </button>
        <h1>Select a service</h1>
      </div>
      <div className="cardsContainer">
        {services.map((service) => (
          <ExpandableCard
            key={service.id}
            title={service.serviceName}
            icon={getIcon(service.serviceName)}
            serviceId={service.id}
            serviceDuration={service.serviceDuration}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
