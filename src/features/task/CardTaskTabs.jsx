import IMG_Details from "../../assets/details.png";
import IMG_Date from "../../assets/date.png";
import IMG_Time from "../../assets/time.png";
import IMG_Priority from "../../assets/priority.png";
import IMG_Tags from "../../assets/tags.png";

const CardTaskTabs = ({ toggleTaskTab }) => {
  return (
    <div className="ml-5">
      <img
        src={IMG_Details}
        alt=""
        className="icon"
        title="Details"
        onClick={() => {
          toggleTaskTab("details");
        }}
      />
      <img
        src={IMG_Date}
        alt=""
        className="icon"
        title="Due Date"
        onClick={() => {
          toggleTaskTab("dueDate");
        }}
      />
      <img
        src={IMG_Priority}
        alt=""
        className="icon"
        title="Priority"
        onClick={() => toggleTaskTab("priority")}
      />
      <img
        src={IMG_Tags}
        alt=""
        className="icon"
        title="Tags"
        onClick={() => toggleTaskTab("tags")}
      />
    </div>
  );
};

export default CardTaskTabs;
