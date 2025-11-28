import type { Metadata } from "next";
import StoreProvider from "../store/StoreProvider";

export const metadata: Metadata = {
  title: "E-commerce Task",
  description: "Product listing and product details using Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
