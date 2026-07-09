import { useRef, Dispatch, SetStateAction } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  FileText,
  File,
  PenTool,
  CheckCircle,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardBody,
} from "../ui/Card";

import { Button } from "../ui/Button";

import { DocumentItem } from "../../types/document";

interface Props {
  selectedDocument: DocumentItem | null;

  setSelectedDocument: Dispatch<
    SetStateAction<DocumentItem | null>
  >;

  setDocuments: Dispatch<
    SetStateAction<DocumentItem[]>
  >;
}

const statusOptions = [
  "Draft",
  "In Review",
  "Signed",
] as const;

const DocumentChamber: React.FC<Props> = ({
  selectedDocument,
  setSelectedDocument,
  setDocuments,
}) => {
  const signatureRef =
    useRef<SignatureCanvas>(null);

  const clearSignature = () => {
    signatureRef.current?.clear();
  };

  const saveSignature = () => {
    alert("Signature Saved Successfully (Mock)");
  };

  const changeStatus = (
    status: "Draft" | "In Review" | "Signed"
  ) => {
    if (!selectedDocument) return;

    const updatedDocument = {
      ...selectedDocument,
      status,
    };

    setSelectedDocument(updatedDocument);

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === updatedDocument.id
          ? updatedDocument
          : doc
      )
    );
  };

  if (!selectedDocument) {
    return (
      <Card className="mt-8">
        <CardBody className="py-16 text-center text-gray-500">
          Select a document from above.
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg rounded-2xl mt-8">

      <CardHeader className="border-b">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Document Chamber
            </h2>

            <p className="text-gray-500 mt-1">
              Review contracts and complete
              the signing process.
            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedDocument.status === "Draft"
                ? "bg-yellow-100 text-yellow-700"
                : selectedDocument.status ===
                  "In Review"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {selectedDocument.status}
          </span>

        </div>

      </CardHeader>

      <CardBody className="p-8">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Document Preview */}

          <div className="border rounded-xl p-6">

            <h3 className="font-semibold flex items-center gap-2 mb-5">

              <FileText size={20} />

              Document Preview

            </h3>

            {selectedDocument.preview ? (

              <iframe
                src={selectedDocument.preview}
                title={selectedDocument.name}
                className="w-full h-80 rounded-lg border"
              />

            ) : (
                            <div className="h-80 border rounded-xl flex flex-col items-center justify-center">

                <File
                  size={60}
                  className="text-primary-600 mb-4"
                />

                <h3 className="font-semibold text-lg">
                  {selectedDocument.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  {selectedDocument.size}
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  Preview unavailable for this file type.
                </p>

              </div>

            )}

          </div>

          {/* E-Signature */}

          <div className="border rounded-xl p-6">

            <h3 className="font-semibold flex items-center gap-2 mb-5">

              <PenTool size={20} />

              E-Signature

            </h3>

            <div className="border rounded-lg overflow-hidden">

              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  width: 600,
                  height: 250,
                  className: "bg-white",
                }}
              />

            </div>

            <div className="flex gap-3 mt-5">

              <Button
                variant="outline"
                onClick={clearSignature}
              >
                Clear
              </Button>

              <Button
                onClick={saveSignature}
              >
                Save Signature
              </Button>

            </div>

          </div>

          {/* Status */}

          <div className="border rounded-xl p-6">

            <h3 className="font-semibold mb-5">
              Document Status
            </h3>

            <select
              value={selectedDocument.status}
              onChange={(e) =>
                changeStatus(
                  e.target.value as
                    | "Draft"
                    | "In Review"
                    | "Signed"
                )
              }
              className="w-full border rounded-lg px-4 py-3"
            >

              {statusOptions.map((status) => (

                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>

              ))}

            </select>

            <div className="flex items-center gap-3 mt-6">

              <CheckCircle
                size={22}
                className={
                  selectedDocument.status === "Signed"
                    ? "text-green-600"
                    : "text-gray-300"
                }
              />

              <span>
                Current Status:
                <b className="ml-1">
                  {selectedDocument.status}
                </b>
              </span>

            </div>

          </div>

          {/* Contract Information */}

          <div className="border rounded-xl p-6">

            <h3 className="font-semibold mb-5">
              Contract Information
            </h3>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Contract ID
                </span>

                <span>
                  BNX-CTR-2026-001
                </span>

              </div>
                            <div className="flex justify-between">

                <span className="text-gray-500">
                  Deal Type
                </span>

                <span>
                  Investment Agreement
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Parties
                </span>

                <span>
                  Investor ↔ Startup
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Document
                </span>

                <span className="text-right break-all">
                  {selectedDocument.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Last Modified
                </span>

                <span>
                  {selectedDocument.lastModified}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  File Size
                </span>

                <span>
                  {selectedDocument.size}
                </span>

              </div>

            </div>

          </div>

        </div>

      </CardBody>

    </Card>
  );
};

export default DocumentChamber;