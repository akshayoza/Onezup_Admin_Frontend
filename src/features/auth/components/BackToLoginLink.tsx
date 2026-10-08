import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackToLoginLink = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/login")}
      className="mt-7 inline-flex cursor-pointer items-center gap-2 text-base font-semibold text-brand-primary transition-colors duration-200 hover:text-brand-primary-hover"
    >
      <ArrowLeft size={18} strokeWidth={2} />
      Back to Login
    </button>
  );
};

export default BackToLoginLink;
