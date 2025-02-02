import HexagonSignupButton from './HexagonSignupButton'
import HexagonLoginButton from './HexagonLoginButton';

export default function HexapinkPaperOneButton() {
    const handleLogin = () => {
        alert("Login button is clicked");
      };
      const handleSignup = () => {
        alert("Signup button is clicked");
      };
  return (
    <>
        <HexagonSignupButton onClick={handleSignup}><span>Create Account</span></HexagonSignupButton>
        <HexagonLoginButton onClick={handleLogin}><span>Log in</span></HexagonLoginButton>
    </>
  )
}
