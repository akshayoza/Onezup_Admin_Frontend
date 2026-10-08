import { useNavigate } from "react-router-dom";

const ForgotPasswordLink = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/forgot-password")}
      className="mt-7 cursor-pointer text-base font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
    >
      Forgot Password?
    </button>
  );
};

export default ForgotPasswordLink;
