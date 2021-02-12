import React from "react";
import "./Input.css";
const input = (props) => {
  let validdata = null;
  const inputClass = ["InputElement"];
  if (props.valid && props.shouldvalidate && props.touched) {
    inputClass.push("Invalid");
    validdata = <p>Enter your {props.configuration.name} correctly.</p>;
  }
  let elemType = null;
  switch (props.inputtype) {
    case "input":
      elemType = (
        <input
          {...props.configuration}
          className={inputClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      elemType = (
        <textarea
          {...props.configuration}
          className={inputClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      elemType = (
        <select value={props.value} onChange={props.changed}>
          {props.configuration.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          ))}
        </select>
      );
      break;
    case "date":
      elemType = (
        <input
          type="date"
          {...props.configuration}
          className={inputClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    default:
      elemType = (
        <input
          {...props.configuration}
          className={inputClass.join(" ")}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div>
      {elemType}
      {validdata}
    </div>
  );
};
export default input;
