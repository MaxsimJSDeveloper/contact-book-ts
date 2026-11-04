import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  id: string;
  name?: string;
  label?: string;
  autoComplete?: "current-password" | "new-password";
}

export const PasswordField = ({
  id,
  name = "password",
  label = "Password",
  autoComplete = "current-password",
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="font-medium text-gray-800">
        {label}
      </label>

      <div className="relative mt-2">
        <Field
          type={showPassword ? "text" : "password"}
          name={name}
          id={id}
          autoComplete={autoComplete}
          className="h-[50px] w-full rounded-xl border-none bg-white pl-4 pr-12 text-gray-800 outline-none focus:ring-2 focus:ring-brand-accent"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-800"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="min-h-[26px] pt-1">
        <ErrorMessage
          name={name}
          component="span"
          className="text-[12px] text-red-500"
        />
      </div>
    </div>
  );
};
