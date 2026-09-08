import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Office Seating | Call Center Dashboard",
  description: "Static office floor plan viewer for room, table, and seat status.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
