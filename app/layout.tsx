import type { Metadata } from "next";



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
        {children}
      </body>
    </html>
  );
}
