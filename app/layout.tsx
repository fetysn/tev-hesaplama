import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEV Hesap | Telafi Edici Vergi Hesaplama",
  description: "Telafi Edici Vergi tutarını satır bazında hesaplayın, kontrol edin ve raporlayın.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
