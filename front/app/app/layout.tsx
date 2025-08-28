export const metadata = {
  title: "関西度診断",
};

import "./title.css";
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {children}
         <Script src="/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
