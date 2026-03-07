import { getAllPosts } from "@/lib/blog";
import BlogPage from "./BlogPage";

export default function Blog() {
  const posts = getAllPosts();
  return <BlogPage posts={posts} />;
}
