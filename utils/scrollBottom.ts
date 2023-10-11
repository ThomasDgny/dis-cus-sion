export function scrollToBottom(containerRef: React.RefObject<HTMLDivElement>) {
  if (!containerRef.current) return;
  const scroll = containerRef.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
  console.log(scroll);
  return scroll;
}
