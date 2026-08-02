import { useParams } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug = "unknown" } = useParams();
  return <NotFoundPage articleSlug={slug} />;
}
