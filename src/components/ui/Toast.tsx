import { AlertCircle, CheckCircle2, X } from "lucide-react";

type ToastVariant = "success" | "error";

interface ToastProps {
  title: string;
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const Toast = ({
  title,
  message,
  variant = "success",
  onClose,
}: ToastProps) => {
  const isError = variant === "error";

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="
        fixed
        right-5
        top-5
        z-50
        w-[calc(100%-2.5rem)]
        max-w-[390px]
        overflow-hidden
        rounded-2xl
        border
        bg-surface
        shadow-[0_20px_50px_rgba(0,0,0,0.15)]
        sm:right-6
        sm:top-6
      "
    >
      <div className="flex items-start gap-4 p-4">
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            ${isError ? "bg-error/10" : "bg-brand-primary/10"}
          `}
        >
          {isError ? (
            <AlertCircle
              size={24}
              strokeWidth={2.2}
              className="text-error"
            />
          ) : (
            <CheckCircle2
              size={24}
              strokeWidth={2.2}
              className="text-brand-primary"
            />
          )}
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-text-primary">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-text-secondary">
            {message}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="
              cursor-pointer
              rounded-md
              p-1
              text-text-muted
              transition-colors
              hover:bg-page-background
              hover:text-text-primary
            "
          >
            <X size={18} strokeWidth={2} />
          </button>
        )}
      </div>

      <div className="h-1 w-full bg-page-background">
        <div
          className={`
            h-full
            w-full
            origin-left
            animate-[toast-progress_4s_linear_forwards]
            ${isError ? "bg-error" : "bg-brand-primary"}
          `}
        />
      </div>
    </div>
  );
};

export default Toast;