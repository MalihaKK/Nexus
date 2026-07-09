import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "../ui/Button";

interface Props {
  onSave: () => void;
}

const SignaturePad: React.FC<Props> = ({ onSave }) => {
  const sigRef = useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    sigRef.current?.clear();
  };

  const saveSignature = () => {
    if (!sigRef.current?.isEmpty()) {
      onSave();
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-4">
        E-Signature
      </h3>

      <div className="border rounded-lg overflow-hidden">

        <SignatureCanvas
          ref={sigRef}
          canvasProps={{
            width: 500,
            height: 200,
            className: "bg-white",
          }}
        />

      </div>

      <div className="flex gap-3 mt-4">

        <Button
          variant="outline"
          onClick={clearSignature}
        >
          Clear
        </Button>

        <Button onClick={saveSignature}>
          Save Signature
        </Button>

      </div>

    </div>
  );
};

export default SignaturePad;