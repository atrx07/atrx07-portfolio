import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PageMetadata } from "./components/PageMetadata";
import { RouteLoadBoundary } from "./components/RouteLoadBoundary";
import { homePageMetadata } from "./lib/pageMetadata";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const PortfolioPage = lazy(async () => {
  const module = await import("./pages/PortfolioPage");
  return { default: module.PortfolioPage };
});

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageMetadata metadata={homePageMetadata} />
            <RouteLoadBoundary>
              <PortfolioPage />
            </RouteLoadBoundary>
          </>
        }
      />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
