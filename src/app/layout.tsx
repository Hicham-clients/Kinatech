import type { Metadata } from "next";
import "../css/globals.css";
import "../css/classes.css";
import "../css/tailwind.css";
import "../css/hover.css";
import Menu from "@/components/partials/Menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr"> 
   
      <body>
        <header>
          <Menu/>
        </header>
        <main>
          {children}
        </main> 

        <footer>
          
        </footer>
        
        </body>
    </html>
  );
}
