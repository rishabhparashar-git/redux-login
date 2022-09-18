import React from "react";

const Input = React.forwardRef((props, ref) => {
  const styles = {
    input: {
      width: "auto",
    },
  };
  return (
    <input
      ref={ref}
      style={styles.input}
      className={`btn in ${props.className}`}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
});
export default Input;
