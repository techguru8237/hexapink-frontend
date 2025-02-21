import { useNavigate } from "react-router-dom";
import HexagonLoginButton_M from "./HexagonLoginButton_M";
import HexagonSignupButton_M from "./HexagonSignupButton_M";

export default function HexapinkPaperOneButton_M() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup/1");
  };
  return (
    <>
      <HexagonSignupButton_M onClick={handleSignup}>
        <span>Register</span>
      </HexagonSignupButton_M>
      <HexagonLoginButton_M onClick={handleLogin}>
        <span>Log In</span>
      </HexagonLoginButton_M>
    </>
  );
}
