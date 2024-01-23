import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flex-grow">
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </section>
  );
};

export default Unauthorized;
