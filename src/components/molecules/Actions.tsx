import { Action } from "../../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "../../styles/atoms/Dropdown.scss";
import "../../styles/molecules/Actions.scss";


type ActionsProps = {
  className?: string;
  actions: Action[];
  data: any;
};

const Actions = (props: ActionsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => setShowMenu(false));

  return (
    <div ref={menuRef} className={`actions ${props.className}`}>
      <FontAwesomeIcon
        icon="ellipsis-vertical"
        className="icon-action"
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className="dropdown-menu actions-list">
          {props.actions.map((action) => (
            <div
              key={action.label}
              onClick={() => {action.onClick(props.data); setShowMenu(false) }}
              className="dropdown-item"
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
