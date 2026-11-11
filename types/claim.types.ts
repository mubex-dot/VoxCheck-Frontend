export interface VconDialog {
  body?: string;
  url?: string;
  type?: "text" | "recording";
  start?: string;
  duration?: string; // Not in the API response yet, but in Figma
}

export interface VconParty {
  name?: string;
  role?: string;
  tel?: string;
  hashed_whatsapp?: string;
}

export interface VconAnalysis {
  type?: string;
  claim?: string;
  body?: string;
  status?:
    | "True"
    | "False"
    | "Unverified"
    | "Needs Human Review"
    | "Pending"
    | string;
  sources?: string[];
  summary?: string;
  analyzer?: string;
  confidence?: number; // Missing in real API, optional for UI
}

export interface VconData {
  uuid: string;
  vcon: string;
  created_at: string;
  dialog: VconDialog[];
  parties: VconParty[];
  analysis: VconAnalysis[];
}

export interface ClaimRead {
  id: string;
  status: string; // e.g., "ai_verified"
  message_type: "text" | "voice";
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
  status: "True" | "False" | "Unverified" | "Needs Human Review";
  summary: string;
  sources?: string[];
}
