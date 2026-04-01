
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body>
      <AppRouterCacheProvider>
      {/* Layout UI */}
      {/* Place children where you want to render a page or nested layout */}
      <main>{children}</main>
      </AppRouterCacheProvider>
      </body>
      </html>
  );
}
