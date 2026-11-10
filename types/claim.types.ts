export interface VconDialog {
  url: string;
  duration?: string; // Added based on UI needs
}

export interface VconAnalysis {
  type: string;
  confidence: number;
  body: string;
}

export interface VconData {
  vcon: string;
  uuid: string;
  created_at: string;
  parties: Array<{ hashed_whatsapp: string }>;
  dialog: VconDialog[];
  analysis: VconAnalysis[];
}

export interface ClaimRead {
  id: string;
  status: "True" | "False" | "Unverified" | "Needs Human Review" | "Pending";
  message_type: string;
  created_at: string;
  updated_at: string;
  vcon: VconData;
}

export interface ClaimPage {
  items: ClaimRead[];
  total: number;
  page: number;
  page_size: number;
}

export interface ClaimReview {
  status: ClaimStatus;
  summary: string;
  sources?: string[];
}

export type ClaimStatus =
  | "True"
  | "False"
  | "Unverified"
  | "Needs Human Review";
