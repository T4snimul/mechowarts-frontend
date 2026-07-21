import type { Metadata } from "next";
import "../styles/fonts.css";
import "../styles/tailwind.css";
import "../styles/theme.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Mechowarts",
  description:
    "Student portal for the Department of Mechanical & Industrial Engineering, RUET",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
