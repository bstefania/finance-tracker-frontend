import React from "react";

type ErrorMessageProps = {
  text: string
}

function ErrorMessage(props: ErrorMessageProps) {
  return <p className="errmsg">{props.text}</p>;
}

export default ErrorMessage;
