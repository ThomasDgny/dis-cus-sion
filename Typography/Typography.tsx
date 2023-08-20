import React from "react";

interface TypographyBaseProps {
  text: string;
}

interface HeadingProps extends TypographyBaseProps {
  tagName: "h1" | "h2" | "h3" | "h4";
}

interface ParagraphProps extends TypographyBaseProps {
  tagName: "p";
  variation: "default" | "lead" | "large" | "muted";
}

type TypographyProps = HeadingProps | ParagraphProps;

function isTypographyParagraphProps(props: TypographyProps): props is ParagraphProps {
  return (props as ParagraphProps).tagName === "p";
}

function Typography(props: TypographyProps) {

  const classes = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    default: "leading-7 [&:not(:first-child)]:mt-6",
    lead: "text-xl text-muted-foreground",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    muted: "text-sm text-muted-foreground",
  };

  const tagStyles: Record<string, string> = {
    h1: classes.h1,
    h2: classes.h2,
    h3: classes.h3,
    h4: classes.h4,
    p: isTypographyParagraphProps(props) ? classes[props.variation] : classes.default,
    small: classes.small,
  };

  const styleClassName = tagStyles[props.tagName] || "";

  const Tag = props.tagName;
  return <Tag className={styleClassName}>{props.text}</Tag>;
}

export default Typography;
