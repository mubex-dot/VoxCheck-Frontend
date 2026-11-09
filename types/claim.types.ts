export interface ClaimRead {
  id: string;
  status: string;
  message_type: string;
  created_at: string;
  updated_at: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vcon: Record<string, any>;
}

export interface ClaimPage {
  items: ClaimRead[];
  total: number;
  page: number;
  page_size: number;
}

export type ClaimStatus =
  | "True"
  | "False"
  | "Unverified"
  | "Needs Human Review";

export interface ClaimReview {
  status: ClaimStatus;
  summary: string;
  sources?: string[];
}
