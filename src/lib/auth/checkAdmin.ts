/**
 * Checks if the provided email matches the admin email from environment variables
 * @param userEmail - The email to check against admin email
 * @returns boolean - True if the email matches the admin email (case-insensitive)
 */
export function isAdmin(userEmail: string | null | undefined): boolean {
  if (!userEmail || !process.env.ADMIN_EMAIL) return false;
  return userEmail.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase();
}
