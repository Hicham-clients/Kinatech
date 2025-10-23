import "../css/globals.css";
import "../css/classes.css";
import "../css/tailwind.css";
import "../css/hover.css";
import "../css/swiper.css";
import Menu from "@/components/partials/Menu";
import Footer from "@/components/partials/Footer";
import Brands from "./_components/brands";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ReactQueryProvider>
          <header>
            <Menu />
          </header>
          <main className="min-h-[80vh]">{children}</main>

          <footer>
            <Brands />
            <Footer />
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
