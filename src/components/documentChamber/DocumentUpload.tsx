import React from "react";
import { UploadCloud, FileText } from "lucide-react";

interface Props {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const DocumentUpload: React.FC<Props> = ({
  selectedFile,
  setSelectedFile,
}) => {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-4">
        Upload Contract
      </h3>

      <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary-500 transition">

        <UploadCloud size={48} className="text-primary-600 mb-3" />

        <p className="font-medium">
          Click to Upload
        </p>

        <p className="text-sm text-gray-500 mt-1">
          PDF, DOC, DOCX
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

      </label>

      {selectedFile && (
        <div className="mt-5 flex items-center gap-3 bg-gray-50 rounded-lg p-3">

          <FileText className="text-primary-600" />

          <div>

            <p className="font-medium">
              {selectedFile.name}
            </p>

            <p className="text-sm text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>

          </div>

        </div>
      )}
    </div>
  );
};

export default DocumentUpload;