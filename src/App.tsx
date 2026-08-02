import { BrowserRouter } from "react-router-dom";
import { RouteEffects } from "./components/RouteEffects";
import { AppRoutes } from "./router";

export default function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <AppRoutes />
    </BrowserRouter>
  );
}
