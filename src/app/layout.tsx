import { ApolloWrapper } from "@/app/lib/graphql";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
