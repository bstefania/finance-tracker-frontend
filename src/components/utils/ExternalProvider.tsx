import { AuthProviderType } from "../../types/authentication";
import { signInWithThirdParty } from "../../utils/authentication";
import styles from "../../styles/utils/ExternalProvider.module.scss";

const externalProvider = () => {
  const options = [
    {
      type: AuthProviderType.Google,
      img: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    },
    {
      type: AuthProviderType.Facebook,
      img: "https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg",
    },
  ];

  return (
    <div className={styles["external-provider"]}>
      {options.map((option) => (
        <div
          className={styles["external-provider-button"]}
          onClick={() => signInWithThirdParty(option.type)}
        >
          <img src={option.img} className={styles["provider-icon"]} alt="" />
          <span className={styles["text-container"]}>Continue with {option.type}</span>
        </div>
      ))}
    </div>
  );
}

export default externalProvider;
