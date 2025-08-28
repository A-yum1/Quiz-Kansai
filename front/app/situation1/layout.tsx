export const metadata = {
  title: "関西度診断",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <body>
        {children}
      </body>
  );
}
