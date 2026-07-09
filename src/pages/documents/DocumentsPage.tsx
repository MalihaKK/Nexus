import React, { useEffect } from "react";
import { FileText, Upload, Download, Trash2, Share2 } from "lucide-react";

import { Card, CardHeader, CardBody } from "../../components/ui/Card";

import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

import { DocumentItem } from "../../types/document";

import DocumentChamber from "../../components/documentChamber/DocumentChamber";

const STORAGE_KEY = "nexus-documents";

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    name: "Pitch Deck 2024.pdf",
    type: "PDF",
    size: "2.4 MB",
    lastModified: "2024-02-15",
    shared: true,
    status: "Draft",
  },
  {
    id: 2,
    name: "Financial Projections.xlsx",
    type: "Spreadsheet",
    size: "1.8 MB",
    lastModified: "2024-02-10",
    shared: false,
    status: "In Review",
  },
  {
    id: 3,
    name: "Business Plan.docx",
    type: "Document",
    size: "3.2 MB",
    lastModified: "2024-02-05",
    shared: true,
    status: "Signed",
  },
  {
    id: 4,
    name: "Market Research.pdf",
    type: "PDF",
    size: "5.1 MB",
    lastModified: "2024-01-28",
    shared: false,
    status: "Draft",
  },
];

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = React.useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return initialDocuments;
  });

  const [selectedDocument, setSelectedDocument] =
    React.useState<DocumentItem | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    if (!selectedDocument && documents.length) {
      setSelectedDocument(documents[0]);
      return;
    }

    if (selectedDocument) {
      const latest = documents.find((doc) => doc.id === selectedDocument.id);

      if (latest) {
        setSelectedDocument(latest);
      }
    }
  }, [documents]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const newDocument: DocumentItem = {
        id: Date.now(),
        name: file.name,
        type: file.name.split(".").pop()?.toUpperCase() || "FILE",
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        lastModified: new Date().toISOString().split("T")[0],
        shared: false,
        status: "Draft",
        preview: reader.result as string,
      };

      setDocuments((prev) => [newDocument, ...prev]);

      setSelectedDocument(newDocument);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const deleteDocument = (id: number) => {
    const updated = documents.filter((doc) => doc.id !== id);

    setDocuments(updated);

    if (selectedDocument?.id === id) {
      setSelectedDocument(updated.length ? updated[0] : null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>

          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <>
          <Button
            leftIcon={<Upload size={18} />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Document
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleUpload}
          />
        </>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage */}

        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium">Storage</h2>
          </CardHeader>

          <CardBody className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Used</span>
                <span>12.5 GB</span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-primary-600 rounded-full"
                  style={{ width: "65%" }}
                />
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span>Available</span>
                <span>7.5 GB</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Quick Access</h3>

              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                  Recent Files
                </button>

                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                  Shared with Me
                </button>

                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                  Starred
                </button>

                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                  Trash
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Documents */}

        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium">All Documents</h2>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Sort by
                </Button>

                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc)}
                    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                      selectedDocument?.id === doc.id
                        ? "bg-primary-50 border border-primary-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="p-2 bg-primary-50 rounded-lg mr-4">
                      <FileText size={24} className="text-primary-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium">{doc.name}</h3>

                        <Badge size="sm">{doc.status}</Badge>

                        {doc.shared && (
                          <Badge variant="secondary" size="sm">
                            Shared
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm text-gray-500 flex gap-4 mt-1 flex-wrap">
                        <span>{doc.type}</span>

                        <span>{doc.size}</span>

                        <span>Modified {doc.lastModified}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Download size={18} />
                      </Button>

                      <Button variant="ghost" size="sm">
                        <Share2 size={18} />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDocument(doc.id);
                        }}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <DocumentChamber
        selectedDocument={selectedDocument}
        setSelectedDocument={setSelectedDocument}
        setDocuments={setDocuments}
      />
    </div>
  );
};
export default DocumentsPage;
