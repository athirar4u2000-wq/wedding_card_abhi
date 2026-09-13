import { useEffect, useState } from "react";
import "./App.css";

const WEDDING_DATE = new Date("2026-12-20T10:00:00+05:30");

const VENUE = "SHAMS Auditorium, Azhiyur, Kerala";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=SHAMS+Auditorium+Azhiyur+Kerala";

function useCountdown() {
  const getTime = () => {
    const difference = Math.max(
      0,
      WEDDING_DATE.getTime() - Date.now()
    );

    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [invitationOpen, setInvitationOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const time = useCountdown();

  /*
   * Current website URL
   */
  const currentUrl = window.location.href;

  /*
   * Share message
   */
  const shareText = `Abhinandh & Athira are getting married and having a reception on 20 December 2026 at 4:00 PM onwards at ${VENUE}. Join us in celebrating their special day!`;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Share
   */
  const share = async (network) => {
    const text = `${shareText} ${currentUrl}`;

    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,

      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,

      telegram: `https://t.me/share/url?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(shareText)}`,

      email: `mailto:?subject=${encodeURIComponent(
        "Abhinandh & Athira Wedding Invitation"
      )}&body=${encodeURIComponent(text)}`,
    };

    /*
     * Instagram does not support direct
     * website sharing through URL parameters.
     */
    if (network === "instagram") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Abhinandh & Athira Wedding Invitation",
            text: shareText,
            url: currentUrl,
          });

          return;
        } catch (error) {
          if (error.name === "AbortError") {
            return;
          }
        }
      }

      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);

        window.open(
          "https://www.instagram.com/",
          "_blank",
          "noopener,noreferrer"
        );

        setTimeout(() => {
          setCopied(false);
        }, 1800);
      } catch {
        window.open(
          "https://www.instagram.com/",
          "_blank",
          "noopener,noreferrer"
        );
      }

      return;
    }

    if (urls[network]) {
      window.open(
        urls[network],
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  /*
   * Copy website link
   */
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      console.error("Unable to copy link");
    }
  };

  /*
   * Native share
   */
  const nativeShare = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title: "Abhinandh & Athira Wedding Invitation",
        text: shareText,
        url: currentUrl,
      });
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  return (
    <div className="reference-site">

      {/* Falling flowers */}
      <div className="falling-flowers" aria-hidden="true">
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
        <span>❧</span>
      </div>

      {/* Navigation */}
      {menuOpen && (
        <div
          className="menu-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className="navbar">
        <a className="logo" href="#top" aria-label="Abhinandh and Athira">
          <span className="logo-initial">A</span>
          <span className="logo-heart">♡</span>
          <span className="logo-initial">A</span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <div
          className={`menu-links ${
            menuOpen ? "is-open" : ""
          }`}
        >
          <a
            href="#countdown"
            onClick={() => setMenuOpen(false)}
          >
            Countdown
          </a>

          <a
            href="#couple"
            onClick={() => setMenuOpen(false)}
          >
            Couple
          </a>

          <a
            href="#event"
            onClick={() => setMenuOpen(false)}
          >
            Event
          </a>

          <a
            href="#schedule"
            onClick={() => setMenuOpen(false)}
          >
            Schedule
          </a>

          <a
            href="#qr"
            onClick={() => setMenuOpen(false)}
          >
            QR Code
          </a>

          <a
            href="#share"
            onClick={() => setMenuOpen(false)}
          >
            Share
          </a>
        </div>
      </nav>

      <main>

        {/* HERO */}
        <section
          className="reference-hero"
          id="top"
        >
          <div className="hero-overlay" />

          <div className="hero-copy">

            <div className="hero-names">
              <h1>
                <strong>
                  <em>Abhinandh</em>
                </strong>
              </h1>

              <span>♡</span>

              <h1>
                <strong>
                  <em>Athira</em>
                </strong>
              </h1>
            </div>

            <p className="hero-lede">
              Together with their families, they invite you
              to share in the joy of their wedding day.
            </p>

            <div className="hero-actions">

              <button
                onClick={() =>
                  setInvitationOpen(true)
                }
              >
                Open the Invitation
              </button>

              <button
                className="find-venue-button"
                onClick={() =>
                  window.open(
                    MAP_URL,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                ⌖ &nbsp; Find the Venue
              </button>

            </div>

            <div className="hero-meta">
              <p>20 December 2026</p>
              <p>Reception at 4:00 PM onwards</p>
              <p>{VENUE}</p>
            </div>

          </div>

          <a
            className="scroll-cue"
            href="#countdown"
          >
            <span>Scroll</span>
            <b>↓</b>
          </a>
        </section>


        {/* COUNTDOWN */}
        <section
          className="reference-section countdown-block"
          id="countdown"
        >
          <p className="section-kicker">
            The Big Day
          </p>

          <h2>Counting Down to Forever</h2>

          <p className="section-intro">
            Every passing moment brings us closer to
            a beautiful beginning.
          </p>

          <div className="countdown-row">
            {[
              [time.days, "Days"],
              [time.hours, "Hours"],
              [time.minutes, "Minutes"],
              [time.seconds, "Seconds"],
            ].map(([value, label]) => (
              <div
                className="countdown-cell"
                key={label}
              >
                <strong>
                  {String(value).padStart(2, "0")}
                </strong>

                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>


        {/* COUPLE */}
        <section
          className="reference-section couple-block"
          id="couple"
        >
          <p className="section-kicker">
            The Two Souls
          </p>

          <h2>Meet the Couple</h2>

          <p className="section-intro">
            Two hearts, one promise, and a lifetime of
            moments waiting to unfold.
          </p>

          <img
            className="couple-photo"
            src="/file_000000002a6c81fa8a9d5d0b7adfa42e.png"
            alt="Athira and Abhinandh together"
          />

          <div className="couple-cards">

            <article>
              <div>
                <p>The Groom</p>

                <h3>
                  <strong>
                    <em>Abhinandh</em>
                  </strong>
                </h3>
              </div>
            </article>

            <span
              className="couple-love love-symbol"
              aria-hidden="true"
            >
              ♡
            </span>

            <article>
              <div>
                <p>The Bride</p>

                <h3>
                  <strong>
                    <em>Athira</em>
                  </strong>
                </h3>
              </div>
            </article>

          </div>
        </section>


        {/* EVENT */}
        <section
          className="reference-section details-block"
          id="event"
        >
          <p className="section-kicker">
            Join Us
          </p>

          <h2>Event Details</h2>

          <p className="section-intro">
            Your presence will make our happiest day
            even more meaningful.
          </p>

          <div className="event-panel">

            <div>

              <div className="event-list">

                <div className="event-item">
                  <b>◷</b>

                  <span>
                    Date
                    <strong>
                      20 December 2026
                    </strong>
                  </span>
                </div>

                <div className="event-item">
                  <b>◌</b>

                  <span>
                    Time
                    <strong>
                      4:00 PM onwards
                    </strong>
                  </span>
                </div>

                <div className="event-item">
                  <b>⌖</b>

                  <span>
                    Venue
                    <strong>{VENUE}</strong>
                  </span>
                </div>

              </div>

              <a
                className="map-link"
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
              >
                ⌖ &nbsp; Open in Google Maps
              </a>

            </div>

            <iframe
              title="Wedding venue map"
              src="https://www.google.com/maps?q=SHAMS%20Auditorium%20Azhiyur%20Kerala&output=embed"
              loading="lazy"
            />

          </div>
        </section>


        {/* SCHEDULE */}
        <section
          className="reference-section schedule-block"
          id="schedule"
        >
          <p className="section-kicker">
            Save the Date
          </p>

          <h2>The Celebration</h2>

          <p className="section-intro">
            A day filled with blessings, laughter,
            and the people we love most.
          </p>

          <div className="schedule-card">
            <span>
              Sunday, December 20
            </span>

            <b>✦</b>

            <h3>
              4:00 PM - 9:00 PM
            </h3>

            <p>{VENUE}</p>

            <small>
              Come celebrate the beginning of
              our forever.
            </small>
          </div>
        </section>


        {/* QR */}
        <section
          className="reference-section qr-block"
          id="qr"
        >
          <p className="section-kicker">
            Share the Love
          </p>

          <h2>Carry the Joy</h2>

          <p className="section-intro">
            Keep this invitation close, or share it
            with everyone who makes your world brighter.
          </p>

          <div className="qr-card">

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                currentUrl
              )}`}
              alt="QR code for this wedding invitation"
            />

            <div>

              <p>Scan the Invitation</p>

              <span>
                Point your camera at the code to open
                our wedding invitation.
              </span>

              <a
                href={`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(
                  currentUrl
                )}`}
                download="athira-abhinandh-wedding-qr.png"
              >
                ⇩ &nbsp; Download QR Code
              </a>

            </div>

          </div>
        </section>


        {/* SHARE */}
        <section
          className="reference-section share-block"
          id="share"
        >
          <p className="section-kicker">
            Spread the Joy
          </p>

          <h2>Share Our Happiness</h2>

          <p className="section-intro">
            A little share from you would mean the
            world to us and our families.
          </p>

          <div className="share-row">

            {/* WhatsApp */}
            <button
              className="share-whatsapp"
              aria-label="Share on WhatsApp"
              title="WhatsApp"
              onClick={() =>
                share("whatsapp")
              }
            >
              <svg viewBox="0 0 24 24" className="icon-filled" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.476-.15-.677.15-.201.301-.78 0.979-.955 1.18-.175.201-.351.226-.652.075-1.83-.915-3.029-1.632-4.225-3.687-.317-.545.317-.506.908-1.687.099-.201.05-.376-.025-.527-.075-.15-.677-1.632-.928-2.235-.245-.588-.494-.509-.678-.518h-.578c-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509c0 1.48 1.079 2.909 1.23 3.109.15.201 2.122 3.24 5.141 4.542 2.094.904 2.898.887 3.935.733.633-.094 1.78-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.352zM12 2C6.477 2 2 6.477 2 12c0 1.89.526 3.66 1.438 5.176L2 22l4.981-1.396A9.954 9.954 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.05c-1.63 0-3.15-.476-4.437-1.298l-.318-.202-3.056.856.818-2.981-.22-.338A8.04 8.04 0 0 1 3.95 12c0-4.439 3.611-8.05 8.05-8.05 4.439 0 8.05 3.611 8.05 8.05 0 4.439-3.611 8.05-8.05 8.05z" />
              </svg>
            </button>


            {/* Facebook */}
            <button
              className="share-facebook"
              aria-label="Share on Facebook"
              title="Facebook"
              onClick={() =>
                share("facebook")
              }
            >
              <svg viewBox="0 0 24 24" className="icon-filled" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>


            {/* Instagram */}
            <button
              className="share-instagram"
              aria-label="Share on Instagram"
              title="Instagram"
              onClick={() =>
                share("instagram")
              }
            >
              <svg viewBox="0 0 24 24" className="icon-filled" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </button>


            {/* Telegram */}
            <button
              className="share-telegram"
              aria-label="Share on Telegram"
              title="Telegram"
              onClick={() =>
                share("telegram")
              }
            >
              <svg viewBox="0 0 24 24" className="icon-filled" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </button>


            {/* Email */}
            <button
              className="share-email"
              aria-label="Share by email"
              title="Email"
              onClick={() =>
                share("email")
              }
            >
              <svg viewBox="0 0 24 24" className="icon-filled" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </button>


            {/* Copy */}
            <button
              className={`share-copy ${copied ? "is-copied" : ""}`}
              aria-label={
                copied
                  ? "Link copied!"
                  : "Copy link"
              }
              title={
                copied
                  ? "Link copied!"
                  : "Copy link"
              }
              onClick={copyLink}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" strokeWidth="2.5" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 15a4 4 0 0 0 5.7.3l2-2a4 4 0 0 0-5.7-5.7l-1.1 1.1m5.1.9a4 4 0 0 0-5.7-.3l-2 2A4 4 0 0 0 13 17l1.1-1.1" strokeWidth="2" />
                </svg>
              )}
            </button>


            {/* Native Share */}
            <button
              className="share-native"
              aria-label="Share invitation"
              title="Share"
              onClick={nativeShare}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 16V4m0 0L7 9m5-5 5 5M5 14v5h14v-5" strokeWidth="2" />
              </svg>
            </button>

          </div>

          {copied && (
            <p className="share-copied-notice">
              ✓ Link copied to clipboard!
            </p>
          )}
        </section>

      </main>


      {/* FOOTER */}
      <footer className="reference-footer">

        <p>
          With Blessings From Our Families
        </p>

        <h2>
          <strong>
            <em>Abhinandh</em>
          </strong>{" "}

          <i className="love-symbol">
            ♡
          </i>{" "}

          <strong>
            <em>Athira</em>
          </strong>
        </h2>

        <p>
          20 December 2026
        </p>

        <small>
          {VENUE}
        </small>

        <div>
          Made with love ·{" "}
          <strong>
            <em>Abhinandh</em>
          </strong>{" "}
          &amp;{" "}
          <strong>
            <em>Athira</em>
          </strong>{" "}
          · 2026
        </div>

      </footer>


      {/* INVITATION MODAL */}
      {invitationOpen && (
        <div
          className="invitation-modal"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() =>
              setInvitationOpen(false)
            }
            aria-label="Close invitation"
          >
            ×
          </button>

          <p>
            With love and blessings
          </p>

          <h2>
            <strong>
              <em>Abhinandh </em>
            </strong>{" "}

            <i className="love-symbol">
              ♡
            </i>{" "}

            <strong>
              <em>Athira</em>
            </strong>
          </h2>

          <p>
            We warmly invite you to celebrate
            our special day with us.
          </p>

          <a
            href="#event"
            onClick={() =>
              setInvitationOpen(false)
            }
          >
            View Event Details
          </a>
        </div>
      )}


      {/* SCROLL TOP */}
      {showScrollTop && (
        <button
          className="scroll-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}

    </div>
  );
}

export default App;
