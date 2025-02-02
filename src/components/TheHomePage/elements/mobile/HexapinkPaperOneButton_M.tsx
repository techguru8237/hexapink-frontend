import HexagonLoginButton_M from './HexagonLoginButton_M';
import HexagonSignupButton_M from './HexagonSignupButton_M';
export default function HexapinkPaperOneButton_M() {
    const handleLogin = () => {
        alert("Login button is clicked");
      };
      const handleSignup = () => {
        alert("Signup button is clicked");
      };
  return (
    <>
        <HexagonSignupButton_M onClick={handleSignup}><span>Register</span></HexagonSignupButton_M>
        <HexagonLoginButton_M onClick={handleLogin}><span>Log In</span></HexagonLoginButton_M>
    </>
  )
}
