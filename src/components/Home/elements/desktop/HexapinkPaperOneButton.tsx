import HexagonSignupButton from "./HexagonSignupButton";
import HexagonLoginButton from "./HexagonLoginButton";
import { useNavigate } from "react-router-dom";

export default function HexapinkPaperOneButton() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup/1");
  };
  return (
    <>
      <HexagonSignupButton onClick={handleSignup} active={true}>
        <span>Create Account</span>
      </HexagonSignupButton>
      <HexagonLoginButton onClick={handleLogin} active={true}>
        <span>Log in</span>
      </HexagonLoginButton>
    </>
  );
}
