import type { Metadata } from "next";
import AccountVerifierWrapper from "@/components/common/verifier-wrapper/VerifierWrapper";

export const metadata: Metadata = {
  title: "dis·cus·sion",
  description: "Auth page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountVerifierWrapper>{children}</AccountVerifierWrapper>;
}
