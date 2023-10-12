export function scrollToBottom(containerRef: React.RefObject<HTMLDivElement>) {
  if (containerRef.current) {
    containerRef.current.scrollTop =
    containerRef.current.scrollHeight;
  }
}


