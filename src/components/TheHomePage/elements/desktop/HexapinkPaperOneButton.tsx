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
        <HexagonSignupButton onClick={handleSignup} active={true}><span>Create Account</span></HexagonSignupButton>
        <HexagonLoginButton onClick={handleLogin} active={true}><span>Log in</span></HexagonLoginButton>
    </>
  )
}
