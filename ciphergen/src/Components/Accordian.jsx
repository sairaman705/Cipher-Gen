import React from "react";
import AccordianItem from "./AccordianItem";
import "../Components/Accordian.css";

const Accordian = ({ data }) => {
    return (
      <div className="faq-wrapper">
        <img src="../Images/Faq.jpg" className="curly-left" alt="" />
        <img src="../Images/Faq.jpg" className="curly-right" alt="" />
        <h2 className="faq-title">Password Generator FAQs</h2>
        <div className="faq-grid">
          {data.map((item, index) => (
            <div
              key={item.id}
              className={`faq-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <AccordianItem question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Accordian;