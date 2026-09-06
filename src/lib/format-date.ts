export function formatDate(
  value?: string,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    year: "numeric",
  }
): string | null {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-GB", options);
  } catch {
    return value;
  }
}

/** Day/month/year short form (en-GB default). */
export function formatDateShort(value?: string): string | null {
  if (!value) return null;
  try {
    return new Date(value).toLocaleDateString("en-GB");
  } catch {
    return value;
  }
}
