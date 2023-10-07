import "../../styles/atoms/ErrorMessage.scss"

type ErrorMessageProps = {
  text: string
}

function ErrorMessage(props: ErrorMessageProps) {
  return <p className="error-message">{props.text}</p>;
}

export default ErrorMessage;
