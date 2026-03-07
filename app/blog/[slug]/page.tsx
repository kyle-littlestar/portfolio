import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Nav } from "@/components/Nav";
import { MDXRemote } from "next-mdx-remote/rsc";

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
      style={{ width: "100%", borderRadius: "2px", margin: "32px 0" }}
    />
  ),
  img: (props: any) => (
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
        <Nav activePage="blog" />
        <main style={{ paddingTop: "89px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "serif", fontSize: "24px", color: "#8C8880" }}>Post not found.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --cream: #F5F2ED;
          --ink: #1A1814;
          --warm-gray: #6B6760;
          --accent: #C8593A;
          --border: #DDD9D3;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-dm-mono), monospace;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.5;
        }

        main { padding-top: 89px; }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          text-decoration: none;
          padding: 24px 48px;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
          width: 100%;
        }

        .back-link:hover { color: var(--ink); }

        /* POST HEADER */
        .post-header {
          padding: 64px 48px 0;
          max-width: 800px;
          margin: 0 auto;
        }

        .post-category {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .post-title {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-bottom: 24px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-bottom: 48px;
          border-bottom: 1px solid var(--border);
        }

        .post-date {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--warm-gray);
        }

        .post-reading-time {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--warm-gray);
        }

        /* COVER IMAGE */
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
        }

        .post-cover-placeholder {
          width: 100%;
          height: 400px;
          background: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MDX CONTENT */
        .post-body {
          max-width: 800px;
          margin: 0 auto;
          padding: 48px 48px 80px;
        }

        .post-body p {
          font-family: var(--font-cormorant), serif;
          font-size: 22px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--ink);
          margin-bottom: 28px;
        }

        .post-body h2 {
          font-family: var(--font-cormorant), serif;
          font-size: 40px;
          font-weight: 300;
          line-height: 1.1;
          color: var(--ink);
          margin: 56px 0 24px;
          letter-spacing: -0.01em;
        }

        .post-body h3 {
          font-family: var(--font-cormorant), serif;
          font-size: 28px;
          font-weight: 400;
          line-height: 1.2;
          color: var(--ink);
          margin: 40px 0 16px;
        }

        .post-body em {
          font-style: italic;
          color: var(--accent);
        }

        .post-body strong {
          font-weight: 600;
        }

        .post-body a {
          color: var(--ink);
          border-bottom: 1px solid var(--accent);
          text-decoration: none;
          transition: color 0.2s;
        }

        .post-body a:hover { color: var(--accent); }

        .post-body hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 48px 0;
        }

        .post-body blockquote {
          border-left: 2px solid var(--accent);
          padding-left: 24px;
          margin: 32px 0;
        }

        .post-body blockquote p {
          font-style: italic;
          color: var(--warm-gray);
        }

        .post-body ul, .post-body ol {
          margin: 0 0 28px 24px;
        }

        .post-body li {
          font-family: var(--font-cormorant), serif;
          font-size: 22px;
          font-weight: 300;
          line-height: 1.7;
          color: var(--ink);
          margin-bottom: 8px;
        }

        .post-body code {
          font-family: var(--font-dm-mono), monospace;
          font-size: 14px;
          background: var(--border);
          padding: 2px 8px;
          border-radius: 2px;
        }

        /* PREV / NEXT */
        .post-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
        }

        .post-nav-item {
          padding: 48px;
          text-decoration: none;
          color: var(--ink);
          border-right: 1px solid var(--border);
          transition: background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .post-nav-item:last-child { border-right: none; }
        .post-nav-item:hover { background: #F0EDE7; }
        .post-nav-item.next { text-align: right; }

        .post-nav-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
        }

        .post-nav-title {
          font-family: var(--font-cormorant), serif;
          font-size: 24px;
          font-weight: 300;
          line-height: 1.2;
        }

        .footer {
          padding: 32px 48px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy { font-size: 11px; letter-spacing: 0.08em; color: var(--warm-gray); }
        .footer-tagline { font-family: var(--font-cormorant), serif; font-size: 13px; font-style: italic; color: var(--warm-gray); }

        @media (max-width: 768px) {
          .back-link { padding: 20px 24px; }
          .post-header { padding: 40px 24px 0; }
          .post-cover { padding: 0 24px; margin: 32px auto; }
          .post-cover-placeholder { height: 240px; }
          .post-body { padding: 32px 24px 64px; }
          .post-body p, .post-body li { font-size: 20px; }
          .post-body h2 { font-size: 32px; }
          .post-nav { grid-template-columns: 1fr; }
          .post-nav-item { padding: 32px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .post-nav-item.next { text-align: left; }
          .footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <Nav activePage="blog" />

      <main>
        <a href="/blog" className="back-link">← The Journal</a>

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
            <a href={`/blog/${prev.slug}`} className="post-nav-item prev">
              <span className="post-nav-label">← Previous</span>
              <span className="post-nav-title">{prev.title}</span>
            </a>
          ) : <div />}
          {next ? (
            <a href={`/blog/${next.slug}`} className="post-nav-item next">
              <span className="post-nav-label">Next →</span>
              <span className="post-nav-title">{next.title}</span>
            </a>
          ) : <div />}
        </div>
      </main>

      <footer className="footer">
        <span className="footer-copy">© 2024 Kyle Littlestar. All rights reserved.</span>
        <span className="footer-tagline">Type enthusiast & adventurist</span>
      </footer>
    </>
  );
}
