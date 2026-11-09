export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (typeof err === "object" && err !== null && "data" in err) {
    const data = (
      err as {
        data?: {
          message?: string;
          detail?: Array<{ msg: string }> | { msg: string };
        };
      }
    ).data;

    // FastAPI 422: detail is an array of { loc, msg, type }
    if (Array.isArray(data?.detail) && data.detail[0]?.msg) {
      return data.detail[0].msg;
    }

    // FastAPI sometimes returns detail as an object
    if (
      typeof data?.detail === "object" &&
      data.detail !== null &&
      "msg" in data.detail
    ) {
      return data.detail.msg as string;
    }

    // Backend's APIResponse wrapper
    if (data?.message) {
      return data.message;
    }
  }
  return fallback;
}
