"use client";
/* Runtime: never use a static `import { MDXRemote }` or React hooks inside the MDX `components` map — that triggers Invalid hook call / useState on null. */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false }
);

const extractYouTubeId = (input: string): string | undefined => {
  const trimmed = input?.trim();
  if (!trimmed) return undefined;

  if (!trimmed.includes("://") && !trimmed.includes("/") && trimmed.length >= 6) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.toLowerCase();

    if (host === "youtu.be") {
      return url.pathname.replace(/^\/+/, "").split("/")[0] || undefined;
    }

    const v = url.searchParams.get("v");
    if (v) return v;

    const parts = url.pathname.split("/").filter(Boolean);
    const embedIndex = parts.findIndex((p) => p.toLowerCase() === "embed");
    if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
  } catch {
    // ignore
  }

  const match = trimmed.match(/(?:v=|youtu\.be\/|\/embed\/)([a-zA-Z0-9_-]{6,})/);
  return match?.[1];
};

const Video = ({
  src,
  footnote,
}: {
  src: string;
  sources?: string[];
  footnote?: string;
}) => {
  const videoId = extractYouTubeId(src);
  return (
    <div className="flex w-full min-w-0 flex-col justify-center">
      {/* Taller cap so embeds balance long text columns; grid of 2 uses width for height */}
      <div className="relative aspect-video w-full max-h-[min(72vh,720px)] min-h-[180px] overflow-hidden rounded-sm border border-[#7c3aed]/30 bg-black shadow-2xl">
        <iframe
          className="absolute inset-0 z-10 h-full w-full"
          src={videoId ? `https://www.youtube.com/embed/${videoId}` : undefined}
          allowFullScreen
        />
      </div>
      {footnote ? (
        <p className="mt-4 max-w-4xl text-center font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 opacity-90">
          {footnote}
        </p>
      ) : null}
    </div>
  );
};

const Intel = ({
  word,
  def,
  className,
}: {
  word: string;
  def: string;
  className?: string;
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);

  const recalcPosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const estimatedWindowHeight = 140;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    // Flip above when there's not enough room below but enough room above.
    setFlipUp(spaceBelow < estimatedWindowHeight && spaceAbove > estimatedWindowHeight * 0.7);
  }, []);

  useEffect(() => {
    if (!open) return;
    recalcPosition();
    window.addEventListener("resize", recalcPosition);
    window.addEventListener("scroll", recalcPosition, true);
    return () => {
      window.removeEventListener("resize", recalcPosition);
      window.removeEventListener("scroll", recalcPosition, true);
    };
  }, [open, recalcPosition]);

  return (
    <span className={`relative inline-block align-baseline ${className || ""}`}>
      <button
        ref={triggerRef}
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline cursor-help border-b border-dotted border-[var(--purple-accent)]/90 text-[var(--purple-accent)] hover:text-[#c4b5fd] focus:outline-none"
      >
        {word}
      </button>
      {open && (
        <span
          className={`absolute left-1/2 z-[80] w-[min(80vw,320px)] -translate-x-1/2 rounded-md border border-white/20 bg-black/75 px-3 py-2 text-left font-mono text-[11px] normal-case tracking-normal text-slate-200 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.55)] ${
            flipUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
          role="tooltip"
        >
          {def}
        </span>
      )}
    </span>
  );
};

const BackgroundImage = ({ src }: { src: string }) => (
  <img
    src={src}
    alt=""
    aria-hidden
    className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
  />
);

/** Chapter title slides only: shorter backdrop + lighter / more transparent look */
const CHAPTER_BG_BOTTOM_GAP = "clamp(2rem, 12vh, 6rem)";

function ChapterTitleBackdrop({ src }: { src: string }) {
  const bandHeight = `calc(100% - ${CHAPTER_BG_BOTTOM_GAP})`;
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 w-full object-cover object-center opacity-40"
        style={{ height: bandHeight }}
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-[1] w-full bg-gradient-to-b from-black/35 via-black/20 to-transparent"
        style={{ height: bandHeight }}
      />
    </>
  );
}

type KeyFrontmatter = {
  title?: string;
  subtitle?: string;
  index?: string[];
  [key: string]: unknown;
};

type LoadedKey = {
  id: string;
  frontmatter: KeyFrontmatter;
  mdxSource: any;
  rawContent?: string;
};

const isVideoElement = (node: React.ReactNode): boolean => {
  if (!React.isValidElement(node)) return false;
  return (node.type as any) === Video;
};

const isBackgroundImageElement = (node: React.ReactNode): boolean => {
  if (!React.isValidElement(node)) return false;
  return (node.type as any) === BackgroundImage;
};

function countVideosInTree(node: React.ReactNode): number {
  if (node == null || typeof node === "boolean") return 0;
  if (Array.isArray(node)) return node.reduce((acc, n) => acc + countVideosInTree(n), 0);
  if (!React.isValidElement(node)) return 0;
  if (isVideoElement(node)) return 1;
  return countVideosInTree((node.props as any)?.children);
}

function normalizeSources(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (item == null) return "";
        return String(item).trim();
      })
      .filter(Boolean);
  }

  if (typeof input === "string") {
    const trimmed = input.trim();
    if (!trimmed) return [];

    // Handle JSON-ish arrays passed as strings: '["a","b"]'
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return normalizeSources(parsed);
      } catch {
        // Fall through to delimiter split.
      }
    }

    // Fallback: comma/newline-delimited string.
    return trimmed
      .split(/[\n,]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  if (input && typeof input === "object") {
    // Handle array-like objects from MDX runtime ({0: "...", 1: "...", length: 2})
    const asAny = input as any;
    if (typeof asAny.length === "number") {
      const maybeArrayLike = Array.from(asAny);
      if (maybeArrayLike.length > 0) return normalizeSources(maybeArrayLike);
    }

    // Handle plain objects with numeric/string keys
    const values = Object.values(asAny);
    if (values.length > 0) return normalizeSources(values);
  }

  return [];
}

const findFirstVideo = (node: React.ReactNode): React.ReactElement | null => {
  if (!node) return null;
  if (Array.isArray(node)) {
    for (const n of node) {
      const found = findFirstVideo(n);
      if (found) return found;
    }
    return null;
  }

  if (isVideoElement(node)) return node as React.ReactElement;

  if (React.isValidElement(node)) {
    const children = React.Children.toArray((node.props as any)?.children);
    for (const child of children) {
      if (isVideoElement(child)) return child as React.ReactElement;
    }
  }

  return null;
};

const restrictNodeToFirstVideo = (node: React.ReactNode): React.ReactNode => {
  // Keep grids / multi-embed layouts intact (only collapse duplicate single-wrapper mistakes)
  if (countVideosInTree(node) > 1) return node;

  const first = findFirstVideo(node);
  if (!first) return node;

  if (isVideoElement(node)) return first;

  if (React.isValidElement(node)) {
    return React.cloneElement(node, { ...(node.props as any), children: first });
  }

  return first;
};

function collectSourcesFromNode(node: React.ReactNode): string[] {
  if (node == null || typeof node === "boolean") return [];
  if (Array.isArray(node)) return node.flatMap((n) => collectSourcesFromNode(n));
  if (!React.isValidElement(node)) return [];

  const props = (node.props as any) || {};
  const own = normalizeSources(props.sources ?? props.source);
  const child = collectSourcesFromNode(props.children);
  return [...own, ...child];
}

/** No hooks — safe inside next-mdx-remote `components` map */
const mdxComponentsBase = {
  Slide: ({
    children,
    sources,
    source,
    footnote,
  }: {
    children: React.ReactNode;
    sources?: unknown;
    source?: unknown;
    footnote?: string;
  }) => {
    const parts = React.Children.toArray(children).filter(
      (p) => !(typeof p === "string" && p.trim() === "")
    );
    const bgNode = parts.find(isBackgroundImageElement) as React.ReactElement | undefined;
    const bgSrc =
      bgNode && typeof (bgNode.props as any)?.src === "string"
        ? ((bgNode.props as any).src as string)
        : undefined;
    const contentParts = parts.filter((p) => !isBackgroundImageElement(p));

    const left = contentParts[0] ?? null;
    const rightRaw = contentParts[1] ?? null;
    const right = restrictNodeToFirstVideo(rightRaw);

    const slideSources = normalizeSources(sources ?? source);
    const nestedSources = collectSourcesFromNode(contentParts);
    const allSources = Array.from(
      new Set([...slideSources, ...nestedSources].map((s) => s.trim()).filter(Boolean))
    );
    const hasSources = allSources.length > 0;

    const rightWithFootnote =
      footnote &&
      React.isValidElement(right) &&
      typeof (right.props as any)?.caption === "string" &&
      (right.type as any) !== Video
        ? React.cloneElement(right as any, { footnote })
        : right;

    const renderSourceItem = (s: string, i: number) => {
      const trimmed = (s || "").trim();
      const looksLikeUrl = /^https?:\/\//i.test(trimmed);

      if (looksLikeUrl) {
        return (
          <a
            key={i}
            href={trimmed}
            target="_blank"
            rel="noreferrer"
            className="block truncate border border-white/5 bg-white/5 p-3 font-mono text-[10px] text-slate-200 transition-colors hover:bg-white/10"
          >
            {trimmed}
          </a>
        );
      }

      return (
        <div
          key={i}
          className="truncate border border-white/5 bg-white/5 p-3 font-mono text-[10px] text-slate-400"
        >
          {trimmed}
        </div>
      );
    };

    if (bgSrc && contentParts.length <= 1) {
      const slideH = "calc(100vh - var(--nav-offset, 64px))";
      return (
        <section
          className="chapter-title-slide slide-section relative isolate box-border flex w-full flex-col items-center justify-center overflow-hidden px-6 py-8 text-center sm:px-10"
          style={{
            height: slideH,
            minHeight: slideH,
            maxHeight: slideH,
            scrollMarginTop: "var(--nav-offset, 64px)",
          }}
        >
          <ChapterTitleBackdrop src={bgSrc} />
          <div className="relative z-10 flex w-full max-w-5xl shrink-0 flex-col items-center justify-center px-4">
            {left}
            {hasSources && (
              <div className="absolute right-0 top-0 z-40 translate-x-[22%] -translate-y-[22%]">
                <details className="group">
                  <summary
                    className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-100 backdrop-blur-sm transition-all hover:border-cyan-200/60 hover:bg-black/80 hover:text-cyan-100"
                  >
                    <span className="text-[12px] leading-none">◎</span>
                    <span className="group-open:hidden">{`SRC ${allSources.length}`}</span>
                    <span className="hidden group-open:inline">CLOSE</span>
                  </summary>
                  <div className="mt-2 mr-0 ml-auto w-[min(86vw,340px)] max-h-[40vh] space-y-2 overflow-auto rounded-xl border border-white/15 bg-black/80 p-3 text-left backdrop-blur-sm">
                    {allSources.map((s, i) => renderSourceItem(s, i))}
                  </div>
                </details>
              </div>
            )}
          </div>
        </section>
      );
    }

    return (
      <div
        className="slide-section box-border flex w-full flex-col items-stretch justify-center gap-10 overflow-x-hidden py-16 sm:gap-12 sm:py-24 lg:flex-row lg:items-center"
        style={{
          minHeight: "calc(100vh - var(--nav-offset, 64px))",
          scrollMarginTop: "var(--nav-offset, 64px)",
        }}
      >
        <div className="relative z-10 flex w-full min-w-0 flex-col justify-center rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm lg:max-w-[48%] lg:flex-[0.95]">
          {hasSources && (
            <div className="absolute right-0 top-0 z-40 translate-x-[22%] -translate-y-[22%]">
              <details className="group">
                <summary
                  className="inline-flex cursor-pointer list-none items-center gap-2 rounded-full border border-white/25 bg-black/65 px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-100 backdrop-blur-sm transition-all hover:border-cyan-200/60 hover:bg-black/80 hover:text-cyan-100"
                >
                  <span className="text-[12px] leading-none">◎</span>
                  <span className="group-open:hidden">{`SRC ${allSources.length}`}</span>
                  <span className="hidden group-open:inline">CLOSE</span>
                </summary>
                <div className="mt-2 mr-0 ml-auto w-[min(86vw,340px)] max-h-[40vh] space-y-2 overflow-auto rounded-xl border border-white/15 bg-black/80 p-3 backdrop-blur-sm">
                  {allSources.map((s, i) => renderSourceItem(s, i))}
                </div>
              </details>
            </div>
          )}
          <div>{left}</div>
        </div>
        {/* No max-height / overflow-y here — that nested scroll looked like a “slider” on images */}
        <div className="flex w-full min-w-0 flex-col items-stretch justify-start pb-10 pt-2 lg:max-w-[52%] lg:flex-[1.05] lg:justify-center lg:pb-14 lg:pt-0">
          {rightWithFootnote ?? <div aria-hidden className="h-full w-full" />}
        </div>
      </div>
    );
  },
  KeyImage: ({
    src,
    footnote,
  }: {
    src: string;
    footnote?: string;
    caption?: string;
    sources?: string[];
  }) => (
    <div className="z-10 flex w-full max-w-full min-w-0 flex-col items-center pb-6 lg:pb-10">
      <div className="relative w-full max-w-4xl min-w-0 overflow-hidden border border-[#7c3aed]/30 bg-black/40 p-1 shadow-2xl">
        <img
          src={src}
          className="mx-auto block h-auto max-h-[50vh] w-full max-w-full object-contain object-center grayscale transition-all duration-1000 hover:grayscale-0"
          alt=""
        />
      </div>
      {footnote ? (
        <p className="mt-4 max-w-4xl text-center font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 opacity-90">
          {footnote}
        </p>
      ) : null}
    </div>
  ),
  BackgroundImage,
  Intel,
  Video,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const url = href?.trim() || "";
    const looksLikeYouTube =
      url.includes("youtu.be") || url.includes("youtube.com") || url.includes("youtube-nocookie.com");

    if (looksLikeYouTube) {
      return <Video src={url} sources={[]} />;
    }

    if (!href) return <>{children}</>;

    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-[#a78bfa] underline">
        {children}
      </a>
    );
  },
  h2: (props: any) => (
    <h2
      {...props}
      className="section-header m-0 text-center font-['Orbitron'] text-4xl font-semibold uppercase leading-[1.08] tracking-[0.02em] text-white drop-shadow-[0_8px_26px_rgba(0,0,0,0.95)] [text-shadow:0_0_6px_rgba(0,0,0,0.9),0_0_14px_rgba(0,0,0,0.75)] sm:text-5xl md:text-6xl lg:text-7xl"
    />
  ),
  h3: (props: any) => (
    <div className="mb-10 mt-20 border-l-4 border-[#7c3aed] pl-6">
      <h3
        {...props}
        className="font-mono text-lg uppercase tracking-[0.4em] text-[#a78bfa] md:text-2xl"
      />
    </div>
  ),
  p: (props: any) => (
    <p
      {...props}
      className="mb-10 max-w-2xl font-sans text-xl leading-relaxed text-slate-300 opacity-80 md:text-2xl"
    />
  ),
  li: (props: any) => (
    <li
      {...props}
      className="mb-4 flex font-mono text-sm uppercase tracking-widest text-slate-400 before:mr-4 before:text-[#7c3aed] before:content-['//']"
    />
  ),
};

function extractSlideTagSources(rawContent?: string): string[][] {
  if (!rawContent) return [];
  const matches: string[][] = [];
  const slideTagRegex = /<Slide\b([^>]*)>/g;
  let tagMatch: RegExpExecArray | null;

  while ((tagMatch = slideTagRegex.exec(rawContent)) !== null) {
    const attrs = tagMatch[1] || "";
    const sourceMatch = /\b(?:sources|source)\s*=\s*\{([\s\S]*?)\}/.exec(attrs);
    if (!sourceMatch) {
      matches.push([]);
      continue;
    }
    matches.push(normalizeSources(sourceMatch[1]));
  }

  return matches;
}

function mdxComponentsForKey(keyId: string, rawContent?: string) {
  const fallbackSourcesBySlide = extractSlideTagSources(rawContent);
  let slideCursor = 0;

  return {
    ...mdxComponentsBase,
    Chapter: ({ id }: { id: string }) => (
      <div
        id={`${keyId}--${id}`}
        className="slide-anchor pointer-events-none relative h-px w-full"
      />
    ),
    Slide: (props: any) => {
      const directSources = normalizeSources(props?.sources ?? props?.source);
      const fallbackSources = fallbackSourcesBySlide[slideCursor] || [];
      slideCursor += 1;
      const mergedSources =
        directSources.length > 0
          ? directSources
          : fallbackSources;
      return (mdxComponentsBase as any).Slide({ ...props, sources: mergedSources });
    },
  };
}

export default function KeyUI({
  keyId,
  mdxSource,
  frontmatter,
  rawContent,
}: {
  keyId: string;
  mdxSource: any;
  frontmatter: KeyFrontmatter;
  rawContent?: string;
}) {
  const [activeId, setActiveId] = useState("hero");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const didLogRef = useRef(false);
  const [navOffsetPx, setNavOffsetPx] = useState<number>(64);

  const [loadedKeys, setLoadedKeys] = useState<LoadedKey[]>([
    { id: keyId, mdxSource, frontmatter, rawContent },
  ]);

  const lastLoadedIdRef = useRef<string>(keyId);
  const fetchingRef = useRef<boolean>(false);
  const doneRef = useRef<boolean>(false);

  useEffect(() => {
    const last = loadedKeys[loadedKeys.length - 1];
    if (last) lastLoadedIdRef.current = last.id;
  }, [loadedKeys]);

  useEffect(() => {
    const measure = () => {
      const gnosisLink = Array.from(document.querySelectorAll("a")).find(
        (a) => a.textContent?.trim() === "Gnosis."
      );
      const navWrap = gnosisLink?.closest("div.fixed") as HTMLElement | null;
      const navRect = navWrap?.getBoundingClientRect();
      if (navRect?.height && Number.isFinite(navRect.height)) {
        setNavOffsetPx(navRect.height);
      }
    };

    requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const sections = useMemo(() => {
    const ids = [
      "definition",
      "denominations",
      "matters",
      "origins",
      "practices",
      "elite",
      "debate",
      "references",
    ];

    return loadedKeys.flatMap((k) => {
      const index = Array.isArray(k.frontmatter.index) ? k.frontmatter.index : [];
      return index.map((title: string, i: number) => {
        const chapterId = ids[i] ?? `section-${i}`;
        return { id: `${k.id}--${chapterId}`, title };
      });
    });
  }, [loadedKeys]);

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            if (target?.id) setActiveId(target.id);
          }
        });
      },
      { root, threshold: 0.1, rootMargin: "-40% 0% -40% 0%" }
    );

    const elements = root.querySelectorAll(".slide-anchor");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections.length]);

  useEffect(() => {
    if (didLogRef.current) return;
    didLogRef.current = true;

    const logSnapshot = () => {
      try {
        const root = scrollContainerRef.current;
        if (!root) return;

        const gnosisLink = Array.from(document.querySelectorAll("a")).find((a) =>
          a.textContent?.trim() === "Gnosis."
        );

        const navWrap = gnosisLink?.closest("div.fixed") as HTMLElement | null;
        const navRect = navWrap?.getBoundingClientRect();

        const rootRect = root.getBoundingClientRect();
        const rootStyles = window.getComputedStyle(root);
        const paddingTop = parseFloat(rootStyles.paddingTop || "0");

        const hScreenSections = Array.from(
          root.querySelectorAll("section.h-screen.snap-start")
        ) as HTMLElement[];
        const chapterSection = hScreenSections.find((sec) => (sec.id || "") !== "hero");

        const chapterRect = chapterSection?.getBoundingClientRect();
        const chapterOverflow = chapterSection
          ? window.getComputedStyle(chapterSection).overflow
          : undefined;

        const chapterImg = chapterSection?.querySelector(
          'img[aria-hidden="true"]'
        ) as HTMLElement | null;
        const chapterImgRect = chapterImg?.getBoundingClientRect();
        const chapterImgZ = chapterImg ? window.getComputedStyle(chapterImg).zIndex : undefined;

        const runId = "post-fix";

        fetch("http://127.0.0.1:7266/ingest/ad06b0cd-1eda-48f1-8d51-f5e070348dba", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "00bae6",
          },
          body: JSON.stringify({
            sessionId: "00bae6",
            runId,
            hypothesisId: "H1",
            location: "KeyUI.tsx:log-nav-layout",
            message: "Navbar/root padding snapshot",
            data: {
              navHeight: navRect?.height,
              navTop: navRect?.top,
              navBottom: navRect?.bottom,
              rootTop: rootRect?.top,
              rootPaddingTop: paddingTop,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});

        fetch("http://127.0.0.1:7266/ingest/ad06b0cd-1eda-48f1-8d51-f5e070348dba", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "00bae6",
          },
          body: JSON.stringify({
            sessionId: "00bae6",
            runId,
            hypothesisId: "H2",
            location: "KeyUI.tsx:log-chapter-top",
            message: "Chapter top snapshot",
            data: {
              chapterTop: chapterRect?.top,
              chapterHeight: chapterRect?.height,
              chapterOverflow,
              navBottom: navRect?.bottom,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});

        fetch("http://127.0.0.1:7266/ingest/ad06b0cd-1eda-48f1-8d51-f5e070348dba", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "00bae6",
          },
          body: JSON.stringify({
            sessionId: "00bae6",
            runId,
            hypothesisId: "H3",
            location: "KeyUI.tsx:log-chapter-bg",
            message: "Chapter background stacking snapshot",
            data: {
              chapterImgTop: chapterImgRect?.top,
              chapterImgZ,
              chapterSectionTop: chapterRect?.top,
            },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
      } catch (e) {
        fetch("http://127.0.0.1:7266/ingest/ad06b0cd-1eda-48f1-8d51-f5e070348dba", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Debug-Session-Id": "00bae6",
          },
          body: JSON.stringify({
            sessionId: "00bae6",
            runId: "pre-fix",
            hypothesisId: "H0",
            location: "KeyUI.tsx:log-error",
            message: "Failed to log snapshot",
            data: { error: String(e) },
            timestamp: Date.now(),
          }),
        }).catch(() => {});
      }
    };

    requestAnimationFrame(logSnapshot);
    window.addEventListener("resize", logSnapshot);
    return () => window.removeEventListener("resize", logSnapshot);
  }, [loadedKeys.length]);

  const loadNext = useCallback(async () => {
    if (fetchingRef.current || doneRef.current) return;

    fetchingRef.current = true;
    try {
      const res = await fetch(
        `/api/keys/next?currentId=${encodeURIComponent(lastLoadedIdRef.current)}`
      );
      if (!res.ok) throw new Error(`Failed to fetch next key: ${res.status}`);

      const data = await res.json();
      if (data?.done) {
        doneRef.current = true;
        return;
      }

      const next = data?.next as LoadedKey | undefined;
      if (!next?.id) {
        doneRef.current = true;
        return;
      }

      setLoadedKeys((prev) => {
        if (prev.some((k) => k.id === next.id)) return prev;
        return [...prev, next];
      });
    } catch (e) {
      console.error(e);
    } finally {
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    const root = scrollContainerRef.current;
    const sentinel = sentinelRef.current;
    if (!root || !sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) void loadNext();
      },
      { root, threshold: 0.01, rootMargin: "0px 0px 250px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadNext]);

  const heroTitle = loadedKeys[0]?.frontmatter?.title ?? "";
  const heroSubtitle = loadedKeys[0]?.frontmatter?.subtitle as string | undefined;

  const mainScrollStyle = {
    paddingTop: navOffsetPx,
    scrollPaddingTop: navOffsetPx,
    "--nav-offset": `${navOffsetPx}px`,
  } as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-0 flex overflow-hidden bg-black font-sans text-slate-200">
      <style jsx global>{`
        .mdx-slide-engine {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .slide-section {
          scroll-snap-align: center;
          scroll-snap-stop: always;
        }
        .infinite-sentinel {
          scroll-snap-align: none;
          scroll-snap-stop: normal;
          min-height: 1px;
          height: 1px;
        }
        .section-header {
          letter-spacing: -0.01em;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes titleTyping {
          0%,
          100% {
            width: 0;
          }
          30%,
          80% {
            width: 100%;
          }
        }
        .typewriter-title {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 4px solid #7c3aed;
          animation: titleTyping 8s steps(30, end) infinite;
        }
      `}</style>

      <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
        <img src="/dark-magic-101.gif" className="h-full w-full object-cover" alt="" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <aside className="z-10 hidden w-80 shrink-0 flex-col border-r border-white/10 bg-black/90 px-10 py-20 backdrop-blur-3xl lg:flex">
          <h1 className="mb-16 border-b border-[#7c3aed]/20 pb-4 text-xl font-normal uppercase italic tracking-[0.4em] text-white">
            {heroTitle}
          </h1>
          <nav className="flex-1 space-y-8">
            {sections.map((section: any) => (
              <div
                key={section.id}
                className={`transition-all duration-700 ${
                  activeId === section.id ? "opacity-100" : "opacity-20"
                }`}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white">
                  {section.title}
                </span>
                <div
                  className={`mt-2 h-px transition-all duration-1000 ${
                    activeId === section.id ? "w-full bg-[#7c3aed]" : "w-0"
                  }`}
                />
              </div>
            ))}
          </nav>
        </aside>

        <main
          ref={scrollContainerRef}
          className="relative z-10 min-h-screen flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth bg-black/40 no-scrollbar"
          style={mainScrollStyle}
        >
          <section
            id="hero"
            className="flex h-screen w-full snap-start snap-always flex-col items-center justify-center px-10 text-center"
          >
            <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center text-center">
              <div className="h-28">
                <h1 className="typewriter-title text-5xl font-normal uppercase tracking-[0.1em] text-white md:text-8xl">
                  {heroTitle}
                </h1>
              </div>
              {heroSubtitle && (
                <p className="mt-12 font-mono text-sm uppercase tracking-[0.8em] text-[#a78bfa] opacity-60 md:text-xl">
                  {heroSubtitle}
                </p>
              )}
            </div>
          </section>

          <div className="mdx-slide-engine mx-auto w-full max-w-7xl px-10 lg:px-24">
            {loadedKeys.map((k) => (
              <MDXRemote key={k.id} {...k.mdxSource} components={mdxComponentsForKey(k.id, k.rawContent)} />
            ))}
            <div ref={sentinelRef} className="infinite-sentinel w-full" />
          </div>
        </main>
      </div>
    </div>
  );
}
