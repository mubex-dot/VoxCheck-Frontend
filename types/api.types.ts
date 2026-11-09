export interface APIResponse<T> {
  status: string;
  message: string;
  data: T | null;
  error?: Record<string, unknown> | null;
}
