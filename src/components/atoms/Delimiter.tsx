import styles from "../../styles/atoms/Delimiter.module.scss"

type DelimiterProps = {
  text: string
}

function Delimiter(props: DelimiterProps) {
  return (
    <div className={styles["separator"]}>{props.text}</div>
  );
}

export default Delimiter;
