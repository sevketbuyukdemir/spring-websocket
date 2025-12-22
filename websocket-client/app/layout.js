import "./globals.css";

export const metadata = {
  title: "WebSocket Client",
  description: "WebSocket integration implementation with SockJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
