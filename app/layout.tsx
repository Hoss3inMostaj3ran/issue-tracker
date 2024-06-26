import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import AuthProvider from "./auth/AuthProvider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Simple Issue-Tracker site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme
              accentColor="indigo"
              grayColor="gray"
              radius="large"
              scaling="95%"
            >
              <Navbar />
              <Container>{children}</Container>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
