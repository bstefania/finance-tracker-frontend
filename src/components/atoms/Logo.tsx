import Icon from "./Icon";
import styles from "../../styles/atoms/Logo.module.scss"

type LogoProps = {
  showName: boolean
}

const Logo = (props: LogoProps) => {
  return (
    <div className={styles["logo"]}>
      <div className={styles["svg-background"]}/>
        <div className={styles["svg"]}>
          <Icon icon="chart-simple" className={styles["logo-icon"]} />
        </div>
      {props.showName && <span>WiseWallet</span>}
    </div>
  );
};

export default Logo;
