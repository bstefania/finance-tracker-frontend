import "../../styles/atoms/Delimiter.scss"

type DelimiterProps = {
  text: string
}

function Delimiter(props: DelimiterProps) {
  return (
    <div className="separator">{props.text}</div>
  );
}

export default Delimiter;
