import styles from "../../styles/atoms/NoData.module.scss";

type NoDataProps = {
  isLoading: boolean;
  loadingText: string;
  notFoundText: string;
};

function NoData({isLoading, loadingText, notFoundText}: NoDataProps) {
  return (
    <div className={styles["not-found"]}>
      {isLoading ? loadingText : notFoundText}
  </div>
  )
}

export default NoData;