export function dateConverter(timestamp: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', options);
  }

