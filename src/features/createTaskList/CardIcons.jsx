import React from "react";
import { IMAGES_Icons, listTemplates } from "../../data/templates";

const CardIcons = ({ handleIcon }) => {
  return (
    <div className="flex flex-wrap items-center">
      {listTemplates.map((item, index) => {
        return (
          <img
            key={index}
            alt=""
            src={IMAGES_Icons + item.icon}
            className="icon-lg cursor-pointer"
            onClick={() => handleIcon(item.icon)}
          />
        );
      })}
    </div>
  );
};

export default CardIcons;
