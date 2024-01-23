import styles from "../../styles/atoms/ErrorMessage.module.scss"

type ErrorMessageProps = {
  text: string
}

function ErrorMessage(props: ErrorMessageProps) {
  return <p className={styles["error-message"]}>{props.text}</p>;
}

export default ErrorMessage;
