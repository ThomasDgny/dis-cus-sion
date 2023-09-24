export function scrollToBottom(containerRef: React.RefObject<HTMLDivElement>) {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }