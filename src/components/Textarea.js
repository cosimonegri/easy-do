import React from "react";
import styles from "components/textarea.module.css";

const Textarea = ({
  text,
  onChangeFunction,
  onSubmitFunction,
  placeholder,
  rows,
}) => {
  const handleSubmitIfEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmitFunction(event);
    }
  };

  return (
    <textarea
      id="focus-textarea"
      className={styles.textarea}
      type="text"
      value={text}
      onChange={onChangeFunction}
      onKeyPress={handleSubmitIfEnter}
      placeholder={placeholder}
      rows={rows}
      autoFocus
      spellCheck={false}
    />
  );
};

export default Textarea;
