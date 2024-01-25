import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import Icon from "./Icon";
import { uiActions } from "../../store/uiSlice";
import styles from "../../styles/atoms/Notification.module.scss";

const Notification = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.ui.error);

  return error ? (
    <div className={styles["notification-background"]}>
      <p>{error}</p>
      <Icon
        icon="close"
        withAction
        onClick={() => dispatch(uiActions.clearError())}
      />
    </div>
  ) : (
    <></>
  );
};

export default Notification;
