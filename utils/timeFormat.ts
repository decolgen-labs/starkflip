export function timeAgo(dateString: string): string {
  const date: Date = new Date(dateString);
  const now: Date = new Date();
  const diffInMilliseconds: number = now.getTime() - date.getTime();

  const minutes: number = Math.floor(diffInMilliseconds / (1000 * 60));
  const hours: number = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const days: number = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }
}
