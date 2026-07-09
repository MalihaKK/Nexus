import React, { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface Props {
  file: File | null;
}

const DocumentPreview: React.FC<Props> = ({ file }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="border rounded-xl p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-4">
        Document Preview
      </h3>

      {!file ? (
        <div className="h-72 flex items-center justify-center text-gray-400">

          No document uploaded

        </div>
      ) : file.type === "application/pdf" ? (
        <iframe
          src={preview}
          title="PDF Preview"
          className="w-full h-72 rounded-lg border"
        />
      ) : (
        <div className="h-72 flex flex-col items-center justify-center">

          <FileText
            size={60}
            className="text-primary-600 mb-4"
          />

          <p className="font-semibold">
            {file.name}
          </p>

          <p className="text-gray-500 mt-2">
            Preview unavailable for DOC/DOCX
          </p>

        </div>
      )}
    </div>
  );
};

export default DocumentPreview;