import React from "react";

type DelimiterProps = {
  text: string
}

function Delimiter(props: DelimiterProps) {
  return (
    <div className="delimiter">
      <span className="delimiter-text">{props.text}</span>
      <hr />
    </div>
  );
}

export default Delimiter;
