import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AccordianISectionQuestion from "./AccordianISectionQuestion";
const Accordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion text-TK_Text">
      {/* {sections.map((section, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-between"
            onClick={() => toggleAccordion(index)}
          >
            {section.title} <IoIosArrowDown className="text-lg"/>
          </button>
          {activeIndex === index && (
            <div className="p-4 bg-white h-[200px] overflow-y-scroll">
              {section.content}
            </div>
          )}
        </div>
      ))} */}

      {
        sections.map((section, idx) => (
          <div key={idx} className="border-b border-gray-200">
            <button
              className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex items-center justify-between"
              onClick={() => toggleAccordion(idx)}
            >
              {section.sectionTitle} <IoIosArrowDown className="text-lg" />
            </button>
            {activeIndex === idx && (
              <div className="p-4 bg-white h-[200px] overflow-y-scroll">
                {
                  section.questions.map((ques, idx) => (
                    <AccordianISectionQuestion key={idx} data={ques} />
                  ))
                }
              </div>
            )}
          </div>
        ))
      }

    </div>
  );
};

export default Accordion;
