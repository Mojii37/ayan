export function getCurrentInfo(username: string): string {
  const now = new Date();
  const formatted = now.toISOString().replace('T', ' ').slice(0, 19);
  return `Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): ${formatted}\nCurrent User's Login: ${username}\n`;
}