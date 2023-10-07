import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/atoms/Logo.scss"

type LogoProps = {
  showName: boolean
}

const Logo = (props: LogoProps) => {
  return (
    <div className="logo">
      <div className="svg-background"/>
        <div className="svg">
          <FontAwesomeIcon icon={faChartSimple} className="logo-icon" />
        </div>
      {props.showName && <span>WiseWallet</span>}
    </div>
  );
};

export default Logo;
