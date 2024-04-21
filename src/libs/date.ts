export function formatDateDifference(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Bangkok',
  };
  const formattedDateTime = date.toLocaleString('en-US', options);
  return formattedDateTime;
}

export function formatDate(date: string) {
  const inputDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  const formattedDate = inputDate.toLocaleDateString('en-US', options);
  return formattedDate;
}
