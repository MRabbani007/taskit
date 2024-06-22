import React, { useState } from "react";
import { IMAGES_Icons, listTemplates } from "../../data/templates";

const CardIcons = ({ list }) => {
  const [editListIcon, setEditListIcon] = useState(false);
  // Handle update list icon
  const handleIcon = (icon) => {
    handleUpdateList(list?.id, "list_icon", icon);
    setEditListIcon(false);
  };

  return (
    <div className="flex flex-wrap items-center">
      {editListIcon ? (
        <>
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
          <img
            src={IMG_Cancel}
            alt=""
            onClick={() => setEditListIcon(false)}
            className="icon"
          />
        </>
      ) : list?.icon === "" ? (
        <img
          src={IMAGES_Icons + "list-2.png"}
          alt=""
          className="icon"
          onClick={() => setEditListIcon(true)}
        />
      ) : (
        <img
          src={IMAGES_Icons + list?.icon}
          alt=""
          className="icon mr-2"
          onClick={() => setEditListIcon(true)}
        />
      )}
    </div>
  );
};

export default CardIcons;
