import React from "react";

interface Props {
  password: string;
}

const PasswordStrength: React.FC<Props> = ({ password }) => {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const getColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getText = () => {
    if (strength <= 1) return "Weak";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  const width =
    strength === 0
      ? "0%"
      : strength === 1
      ? "25%"
      : strength === 2
      ? "50%"
      : strength === 3
      ? "75%"
      : "100%";

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded ${getColor()}`}
          style={{ width }}
        ></div>
      </div>

      {password && (
        <p className="text-sm mt-1">
          Password Strength:
          <span className="font-semibold ml-1">
            {getText()}
          </span>
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;