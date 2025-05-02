import React, { useState } from "react";
import "../Components/Accordian.css";

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-question" onClick={toggleAccordion}>
        <span>{question}</span>
        <span className="accordion-symbol">{isOpen ? "-" : "+"}</span>
      </div>
      <div className={`accordion-answer ${isOpen ? "open" : ""}`}>{answer}</div>
    </div>
  );
};

export default AccordionItem;
