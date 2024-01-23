import { Action } from "../../types/types";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "../../styles/molecules/Actions.module.scss";
import Icon from "../atoms/Icon";

type ActionsProps = React.HTMLAttributes<HTMLDivElement> & {
  actions: Action[];
  data: any;
};

const Actions = ({ actions, data, ...extraProps }: ActionsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  let className = styles["actions"];
  if (extraProps.className) {
    className += ` ${styles[extraProps.className]}`;
  }

  useOutsideClick(menuRef, () => setShowMenu(false));

  return (
    <div ref={menuRef} className={className} {...extraProps}>
      <Icon
        icon="ellipsis-vertical"
        withAction
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className={`${styles["dropdown-menu"]} ${styles["actions-list"]}`}>
          {actions.map((action) => (
            <div
              key={action.label}
              onClick={() => {
                action.onClick(data);
                setShowMenu(false);
              }}
              className={styles["dropdown-item"]}
            >
              {action.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Actions;
