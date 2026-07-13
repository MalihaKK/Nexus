import React, { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { AlertCircle } from "lucide-react";

interface Props {
  onVerify: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<Props> = ({ onVerify, onBack }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (otp === "123456") {
      onVerify();
    } else {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">OTP Verification</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3 mb-4">
          <p className="text-sm text-blue-700">
            <strong>Demo OTP:</strong> 123456
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Use this code to verify your account in the demo application.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 p-3 rounded-lg">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <Input
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        fullWidth
      />

      <Button fullWidth onClick={handleVerify}>
        Verify OTP
      </Button>

      <Button variant="outline" fullWidth onClick={onBack}>
        Back
      </Button>
    </div>
  );
};

export default OTPVerification;
