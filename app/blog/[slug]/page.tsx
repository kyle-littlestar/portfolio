import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post?.title || "Post Not Found",
    description: post?.excerpt || "",
  };
}

const components = {
  Video: ({ src }: { src: string }) => (
    <video
      src={src}
      controls
      style={{ width: "100%", margin: "32px 0", border: "2px solid var(--border)" }}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      style={{ width: "100%", height: "auto", margin: "32px 0", display: "block" }}
    />
  ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prev = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  if (!post) {
    return (
      <>
        <Nav activePage="journal" />
        <main style={{ paddingTop: "62px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--text-muted)" }}>Post not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{`
        main { padding-top: 76px; }

        .back-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px 48px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
          padding: 10px 28px;
          background: var(--accent-bg);
          border: var(--border-w) solid var(--accent-bg);
          transition: all 0.2s;
        }

        .back-link:hover {
          background: var(--accent-bg-hover);
          border-color: var(--accent-bg-hover);
        }

        .post-header {
          padding: 64px 48px 0;
          max-width: 800px;
          margin: 0 auto;
        }

        .post-category {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .post-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-bottom: 48px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .post-date, .post-reading-time {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .post-cover {
          width: 100%;
          max-width: 800px;
          margin: 48px auto;
          padding: 0 48px;
        }

        .post-cover img {
          width: 100%;
          height: auto;
          display: block;
          border: var(--border-w) solid var(--border);
        }

        /* MDX CONTENT */
        .post-body {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px 48px 80px;
        }

        .post-body p {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .post-body h2 {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin: 56px 0 20px;
        }

        .post-body h3 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 40px 0 16px;
        }

        .post-body strong { font-weight: 700; color: var(--text-primary); }

        .post-body em { color: var(--accent); }

        .post-body a {
          color: var(--text-primary);
          border-bottom: 1px solid var(--accent);
          transition: color 0.2s;
        }

        .post-body a:hover { color: var(--accent); }

        .post-body hr {
          border: none;
          border-top: var(--border-w) solid var(--border);
          margin: 48px 0;
        }

        .post-body blockquote {
          border-left: var(--border-w-thick) solid var(--accent);
          padding-left: 24px;
          margin: 32px 0;
        }

        .post-body blockquote p { color: var(--text-muted); }

        .post-body ul, .post-body ol { margin: 0 0 24px 24px; }

        .post-body li {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .post-body code {
          font-family: var(--font-body);
          font-size: 13px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 2px 8px;
        }

        /* PREV / NEXT */
        .post-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: var(--border-w) solid var(--border);
        }

        .post-nav-item {
          padding: 48px;
          text-decoration: none;
          color: var(--text-primary);
          border-right: var(--border-w) solid var(--border);
          transition: background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .post-nav-item:last-child { border-right: none; }
        .post-nav-item:hover { background: var(--bg-surface); }
        .post-nav-item.next { text-align: right; }

        .post-nav-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .post-nav-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (max-width: 768px) {
          .back-bar { padding: 12px 20px; }
          .post-header { padding: 40px 20px 0; }
          .post-cover { padding: 0 20px; margin: 32px auto; }
          .post-body { padding: 32px 20px 64px; }
          .post-nav { grid-template-columns: 1fr; }
          .post-nav-item { padding: 32px 20px; border-right: none; border-bottom: var(--border-w) solid var(--border); }
          .post-nav-item.next { text-align: left; }
        }
      `}</style>

      <Nav activePage="journal" />

      <main>
        <div className="back-bar">
          <Link href="/blog" className="back-link">&larr; The Journal</Link>
        </div>

        <div className="post-header">
          <p className="post-category">{post.category}</p>
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="post-reading-time">{post.readingTime}</span>
          </div>
        </div>

        {post.coverImage && (
          <div className="post-cover">
            <img src={post.coverImage} alt={post.title} />
          </div>
        )}

        <div className="post-body">
          <MDXRemote source={post.content} components={components} />
        </div>

        <div className="post-nav">
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="post-nav-item prev">
              <span className="post-nav-label">&larr; Previous</span>
              <span className="post-nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/blog/${next.slug}`} className="post-nav-item next">
              <span className="post-nav-label">Next &rarr;</span>
              <span className="post-nav-title">{next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </main>

      <Footer />
    </>
  );
}
