'use client';

import React from 'react';

export function MediaPanels() {
  // Top pills content
  const pills = ['Expert Insights', 'Always Up-to-Date', 'Watch & Listen'];

  // Left: videos (YouTube embeds)
  const videoItems = [
    {
      label: 'Intro',
      src: 'https://www.youtube.com/embed/FN3MFhYPWWo?controls=1&modestbranding=1&rel=0',
    },
    {
      label: 'Demo',
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&modestbranding=1&rel=0',
    },
    {
      label: 'Tutorial',
      src: 'https://www.youtube.com/embed/oHg5SJYRHA0?controls=1&modestbranding=1&rel=0',
    },
    {
      label: 'Highlights',
      src: 'https://www.youtube.com/embed/3GwjfUFyY6M?controls=1&modestbranding=1&rel=0',
    },
    {
      label: 'Q&A',
      src: 'https://www.youtube.com/embed/2Z4m4lnjxkY?controls=1&modestbranding=1&rel=0',
    },
  ];

  // Right: podcasts (Spotify embeds)
  const podcastItems = [
    {
      label: 'Episode 1',
      src: 'https://open.spotify.com/embed/episode/71Wz1SKVcvAD8XvVDb45Xt?utm_source=generator',
    },
    {
      label: 'Episode 2',
      src: 'https://open.spotify.com/embed/episode/7makk4oTQel546B0PZlDM5?utm_source=generator',
    },
    {
      label: 'Episode 3',
      src: 'https://open.spotify.com/embed/episode/6k8Yd6eLQw90oMZjg8Dd1k?utm_source=generator',
    },
    {
      label: 'Episode 4',
      src: 'https://open.spotify.com/embed/episode/5zT1JLIj9E57p3e1rFm9UO?utm_source=generator',
    },
    {
      label: 'Episode 5',
      src: 'https://open.spotify.com/embed/episode/0ofXAdFIQQRsCYj9754UFx?utm_source=generator',
    },
  ];

  const [activeVideo, setActiveVideo] = React.useState(0);
  const [activePodcast, setActivePodcast] = React.useState(0);

  // Keyboard navigation for accessibility
  const handleKeyNav = (e, isVideo) => {
    const items = isVideo ? videoItems : podcastItems;
    const active = isVideo ? activeVideo : activePodcast;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      const next = (active - 1 + items.length) % items.length;
      isVideo ? setActiveVideo(next) : setActivePodcast(next);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      const next = (active + 1) % items.length;
      isVideo ? setActiveVideo(next) : setActivePodcast(next);
    }
  };

  return (
    <section className="media-wrap" aria-label="Featured Videos and Broadcasts">
      <style>{`
        :root {
          --ink: #0b1324;
          --muted: #475569;
          --primary: #2f80ed;
          --primary-2: #1b4db3;
          --green: #10b981;
          --ring: rgba(47,128,237,0.35);
          --panel-bg: rgba(255,255,255,0.7);
          --panel-border: rgba(2,6,23,0.06);
          --shadow-1: 0 10px 30px rgba(2,6,23,0.08);
          --shadow-2: 0 16px 34px rgba(2,6,23,0.12);
          --rail-bg: rgba(2,6,23,0.04);
          --rail-border: rgba(2,6,23,0.08);
          --btn-bg: rgba(255,255,255,0.85);
          --btn-border: rgba(2,6,23,0.08);
          --btn-active: linear-gradient(90deg, var(--primary), var(--primary-2));
        }

        .media-wrap {
          position: relative;
          padding: 64px 18px;
          background:
            radial-gradient(1200px 600px at 10% -10%, rgba(47,128,237,0.10), transparent 40%),
            radial-gradient(1000px 500px at 90% 0%, rgba(16,185,129,0.08), transparent 45%);
        }

        /* Top pills, heading, subheading */
        .map-pills {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 18px;
        }
        .map-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.02em;
          background: rgba(47, 128, 237, 0.08);
          color: #1f4e9b;
          border: 1px solid rgba(47, 128, 237, 0.18);
        }
        .media-heading {
          margin: 0 0 8px;
          font-size: 40px;
          line-height: 1.08;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-align: center;
          background: linear-gradient(92deg, #0b1324 0%, #274760 40%, #2f80ed 80%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .media-subdesc {
          margin: 8px auto 30px;
          max-width: 760px;
          text-align: center;
          color: var(--muted);
          line-height: 1.7;
          font-size: 16px;
        }
        @media (max-width: 768px) {
          .media-heading { font-size: 34px; }
          .media-subdesc { font-size: 15px; padding: 0 6px; }
          .media-wrap { padding: 44px 14px; }
        }
        @media (max-width: 480px) {
          .media-heading { font-size: 28px; }
          .media-subdesc { font-size: 14px; }
        }

        /* Main grid and decorative divider */
        .media-grid {
          max-width: 1300px;
          margin: 0 auto;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        .media-grid::before {
          content: '';
          position: absolute;
          top: 6%;
          bottom: 6%;
          left: 50%;
          width: 1px;
          background: linear-gradient(180deg, rgba(2,6,23,0), rgba(2,6,23,0.18), rgba(2,6,23,0));
          pointer-events: none;
        }

        /* Panels */
        .panel {
          border-radius: 22px;
          background: var(--panel-bg);
          border: 1px solid var(--panel-border);
          box-shadow: var(--shadow-1);
          backdrop-filter: saturate(140%) blur(6px);
          padding: 16px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          height: 390px;
          position: relative;
          overflow: hidden;
        }
        .panel::after {
          content: '';
          position: absolute;
          inset: -40%;
          background: radial-gradient(420px 260px at var(--mx, 60%) var(--my, 40%), rgba(47,128,237,0.12), transparent 55%);
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
        }
        .panel:hover::after { opacity: 1; }

        /* Rails */
        .rail {
          width: 180px;
          min-width: 180px;
          background: var(--rail-bg);
          border: 1px solid var(--rail-border);
          border-radius: 14px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 350px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.5);
          overflow: auto;
          scrollbar-width: thin;
        }
        .rail-title {
          font-size: 12.5px;
          font-weight: 900;
          color: var(--muted);
          padding: 4px 6px 8px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: sticky;
          top: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
          border-radius: 10px;
        }
        .rail-btn {
          appearance: none;
          border: 1px solid var(--btn-border);
          background: var(--btn-bg);
          color: var(--ink);
          border-radius: 12px;
          padding: 10px 12px;
          font-weight: 850;
          font-size: 14px;
          text-align: left;
          cursor: pointer;
          transition: transform 160ms ease, box-shadow 180ms ease, background 180ms ease;
          box-shadow: 0 8px 18px rgba(2,6,23,0.08);
          outline: none;
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
          white-space: nowrap;
        }
        .rail-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 22px rgba(2,6,23,0.12); }
        .rail-btn:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
        .rail-btn.active {
          color: #fff;
          background: var(--btn-active);
          border-color: rgba(255,255,255,0.4);
          box-shadow: 0 10px 22px rgba(47,128,237,0.24), inset 0 1px 0 rgba(255,255,255,0.35);
        }
        .btn-dot {
          width: 8px; height: 8px; border-radius: 999px; background: rgba(2,6,23,0.22);
          flex: 0 0 8px;
        }
        .rail-btn.active .btn-dot { background: #fff; box-shadow: 0 0 0 4px rgba(255,255,255,0.18); }

        /* Media area */
        .media-area {
          position: relative;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(2,6,23,0.02), rgba(2,6,23,0.00));
          border: 1px solid var(--panel-border);
          box-shadow: var(--shadow-1);
          display: grid;
          place-items: center;
          overflow: hidden;
          height: 350px;
        }
        .frame {
          position: relative;
          width: min(100%, 900px);
          aspect-ratio: 16 / 9;
          border-radius: 14px;
          overflow: hidden;
          background: #000;
          border: 1px solid rgba(255,255,255,0.4);
          box-shadow: var(--shadow-2);
          transform: translateY(2px) scale(0.99);
          transition: transform 320ms cubic-bezier(.22,.61,.36,1), box-shadow 320ms ease;
        }
        .media-area:hover .frame { transform: translateY(0) scale(1); }

        .frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }

        /* Fade switch */
        .fade-in { animation: fadeIn 260ms ease forwards; opacity: 0; }
        @keyframes fadeIn { to { opacity: 1; } }

        /* Panel headings (inside each panel) */
        .panel-head {
          position: absolute;
          top: 30px;
          right: 40px;
          font-weight: 800;
          font-size: 13px;
          color: var(--muted);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          opacity: 0.85;
          z-index: 1;
        }
        .panel-head .led {
          width: 8px; height: 8px; border-radius: 999px;
          background: linear-gradient(180deg, var(--primary), var(--green));
          box-shadow: 0 0 10px rgba(47,128,237,0.6);
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .media-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .media-grid::before { display: none; }
        }

        @media (max-width: 680px) {
          .panel {
            grid-template-columns: 1fr;
            height: auto;
            min-height: 0;
            gap: 12px;
            padding: 12px;
          }

          /* So the spotlight doesn't cause jank on mobile */
          .panel::after { display: none; }

          .panel-head {
            position: static;
            margin: -2px 0 2px;
            justify-content: flex-end;
            font-size: 12px;
          }

          .rail {
            width: 100%;
            min-width: 0;
            height: auto;
            max-height: none;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            padding: 8px;
            overflow: visible;
          }

          /* 3-up on slightly larger phones */
          @media (min-width: 420px) and (max-width: 680px) {
            .rail { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          }

          .rail-title {
            grid-column: 1 / -1;
            position: relative;
            background: transparent;
            padding: 2px 2px 6px;
          }

          .rail-btn {
            justify-content: center;
            text-align: center;
            font-size: 13px;
            padding: 10px 8px;
            min-height: 38px;
            white-space: normal;
          }

          .btn-dot { display: none; }

          .media-area {
            height: auto;
            min-height: 0;
            padding: 4px;
          }

          .frame {
            width: 100%;
            aspect-ratio: 16 / 9;
            transform: none;
          }
        }

        /* Tiny phones */
        @media (max-width: 360px) {
          .rail { grid-template-columns: 1fr; }
          .rail-btn { font-size: 12px; }
          .media-heading { font-size: 24px; }
        }
      `}</style>

      {/* Header area */}
      <div className="map-pills" aria-label="Highlights">
        {pills.map((p, i) => (
          <span className="map-pill" key={i}>{p}</span>
        ))}
      </div>
      <h2 className="media-heading">Watch, Learn, and Listen</h2>
      <p className="media-subdesc">
        Explore our latest video briefings and audio broadcasts. Use the side buttons to switch topics—
        the player updates instantly in the center.
      </p>

      {/* Content grid */}
      <div className="media-grid">
        {/* Left panel: Videos */}
        <section
          className="panel"
          aria-label="Video selection panel"
          onMouseMove={(e) => {
            const t = e.currentTarget;
            const r = t.getBoundingClientRect();
            const mx = ((e.clientX - r.left) / r.width) * 100;
            const my = ((e.clientY - r.top) / r.height) * 100;
            t.style.setProperty('--mx', mx + '%');
            t.style.setProperty('--my', my + '%');
          }}
        >
          <div className="panel-head"><span className="led" /> Videos</div>

          <div
            className="rail"
            role="tablist"
            aria-label="Select video"
            onKeyDown={(e) => handleKeyNav(e, true)}
          >
            <div className="rail-title">Choose Topic</div>
            {videoItems.map((v, i) => (
              <button
                key={i}
                className={`rail-btn ${activeVideo === i ? 'active' : ''}`}
                role="tab"
                aria-selected={activeVideo === i}
                aria-controls={`video-panel-${i}`}
                onClick={() => setActiveVideo(i)}
              >
                <span className="btn-dot" />
                {v.label}
              </button>
            ))}
          </div>

          <div className="media-area">
            <div className="frame fade-in" key={activeVideo} id={`video-panel-${activeVideo}`} role="tabpanel">
              <iframe
                src={videoItems[activeVideo].src}
                title={`Video ${activeVideo + 1}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Right panel: Broadcasts */}
        <section
          className="panel"
          aria-label="Broadcast selection panel"
          onMouseMove={(e) => {
            const t = e.currentTarget;
            const r = t.getBoundingClientRect();
            const mx = ((e.clientX - r.left) / r.width) * 100;
            const my = ((e.clientY - r.top) / r.height) * 100;
            t.style.setProperty('--mx', mx + '%');
            t.style.setProperty('--my', my + '%');
          }}
        >
          <div className="panel-head"><span className="led" /> Broadcast</div>

          <div
            className="rail"
            role="tablist"
            aria-label="Select broadcast episode"
            onKeyDown={(e) => handleKeyNav(e, false)}
          >
            <div className="rail-title">Pick Episode</div>
            {podcastItems.map((p, i) => (
              <button
                key={i}
                className={`rail-btn ${activePodcast === i ? 'active' : ''}`}
                role="tab"
                aria-selected={activePodcast === i}
                aria-controls={`podcast-panel-${i}`}
                onClick={() => setActivePodcast(i)}
              >
                <span className="btn-dot" />
                {p.label}
              </button>
            ))}
          </div>

          <div className="media-area">
            <div className="frame fade-in" key={activePodcast} id={`podcast-panel-${activePodcast}`} role="tabpanel">
              <iframe
                src={podcastItems[activePodcast].src}
                title={`Podcast ${activePodcast + 1}`}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}