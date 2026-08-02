import type { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type Props = {
  children: ReactNode;
};

export function RoutePageShell({ children }: Props) {
  return (
    <div id="top" className="app-shell route-shell">
      <Header />
      <main id="main" className="route-main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
