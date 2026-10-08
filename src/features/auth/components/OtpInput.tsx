import { useEffect, useRef } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

const OtpInput = ({
  value,
  onChange,
  length = 6,
  disabled = false,
}: OtpInputProps) => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const digits = Array.from({ length }, (_, index) => value[index] ?? "");

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (index: number, inputValue: string) => {
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    const nextDigits = [...digits];
    nextDigits[index] = digit;

    onChange(nextDigits.join(""));

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    onChange(pastedValue);

    const nextIndex = Math.min(pastedValue.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit ? "*" : ""}
          disabled={disabled}
          aria-label={`OTP digit ${index + 1}`}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className="h-12 w-11 rounded-md border border-transparent bg-surface text-center text-xl font-semibold text-text-primary outline-none transition-colors focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 disabled:cursor-not-allowed disabled:opacity-60 sm:h-14 sm:w-14"
        />
      ))}
    </div>
  );
};

export default OtpInput;
