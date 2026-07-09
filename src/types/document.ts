export interface DocumentItem {
  id: number;

  name: string;

  type: string;

  size: string;

  lastModified: string;

  shared: boolean;

  status: "Draft" | "In Review" | "Signed";

  preview?: string;

  signature?: string;
}