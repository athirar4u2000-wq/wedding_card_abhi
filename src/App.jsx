import { useEffect, useState } from "react";
import "./App.css";

const WEDDING_DATE = new Date("2026-12-20T10:00:00+05:30");
const VENUE = "SHAMS Auditorium, Azhiyur, Kerala";
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=SHAMS+Auditorium+Azhiyur+Kerala";
function useCountdown() {
  const getTime = () => {
    const difference = Math.max(0, WEDDING_DATE.getTime() - Date.now());
    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);
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

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const share = async (network) => {
    const text = `Athira and Abhinandh are getting married on 20 December 2026 at ${VENUE}. ${window.location.href}`;
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`,
      email: `mailto:?subject=${encodeURIComponent("Athira & Abhinandh Wedding Invitation")}&body=${encodeURIComponent(text)}`
    };
    if (network === "instagram") {
      if (navigator.share) {
        try {
          await navigator.share({ title: "Athira & Abhinandh", text, url: window.location.href });
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      await navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      setTimeout(() => setCopied(false), 1800);
      return;
    }
    window.open(urls[network], "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="reference-site">
      <div className="falling-flowers" aria-hidden="true"><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span><span>❧</span></div>
      <nav className="navbar">
        <a className="logo" href="#top">A<span>♡</span>A</a>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">{menuOpen ? "×" : "☰"}</button>
        <div className={`menu-links ${menuOpen ? "is-open" : ""}`}><a href="#countdown" onClick={() => setMenuOpen(false)}>Countdown</a><a href="#couple" onClick={() => setMenuOpen(false)}>Couple</a><a href="#event" onClick={() => setMenuOpen(false)}>Event</a><a href="#schedule" onClick={() => setMenuOpen(false)}>Schedule</a><a href="#qr" onClick={() => setMenuOpen(false)}>QR Code</a><a href="#share" onClick={() => setMenuOpen(false)}>Share</a></div>
      </nav>

      <main>
        <section className="reference-hero" id="top">
          <div className="hero-overlay" />
          <div className="hero-copy">
            <div className="hero-names"><h1><strong><em>Abhinandh</em></strong></h1><span>♡</span><h1><strong><em>Athira</em></strong></h1></div>
            <p className="hero-lede">Together with their families, they invite you to share in the joy of their wedding day.</p>
            <div className="hero-actions"><button onClick={() => setInvitationOpen(true)}>Open the Invitation</button><button className="find-venue-button" onClick={() => window.open(MAP_URL, "_blank", "noopener,noreferrer")}>⌖ &nbsp; Find the Venue</button></div>
            <div className="hero-meta"><p>20 December 2026</p><p>{VENUE}</p></div>
          </div>
          <a className="scroll-cue" href="#countdown"><span>Scroll</span><b>↓</b></a>
        </section>

        <section className="reference-section countdown-block" id="countdown">
          <p className="section-kicker">The Big Day</p><h2>Counting Down to Forever</h2><p className="section-intro">Every passing moment brings us closer to a beautiful beginning.</p>
          <div className="countdown-row">{[[time.days, "Days"], [time.hours, "Hours"], [time.minutes, "Minutes"], [time.seconds, "Seconds"]].map(([value, label]) => <div className="countdown-cell" key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>
        </section>

        <section className="reference-section couple-block" id="couple">
          
          <p className="section-kicker">The Two Souls</p><h2>Meet the Couple</h2><p className="section-intro">Two hearts, one promise, and a lifetime of moments waiting to unfold.</p>
          <img className="couple-photo" src="/file_000000002a6c81fa8a9d5d0b7adfa42e.png" alt="Athira and Abhinandh together" />
         
          <div className="couple-cards">
            <article>
              <div>
                <p>The Groom</p>
                <h3><strong><em>Abhinandh</em></strong></h3>
                
              </div>
            </article>
            <span className="couple-love love-symbol" aria-hidden="true">♡</span>
            <article>
              <div>
                <p>The Bride</p>
                <h3><strong><em>Athira</em></strong></h3>
                
              </div>
            </article>
          </div>
        </section>

        <section className="reference-section details-block" id="event"><p className="section-kicker">Join Us</p><h2>Event Details</h2><p className="section-intro">Your presence will make our happiest day even more meaningful.</p><div className="event-panel"><div><div className="event-list"><div className="event-item"><b>◷</b><span>Date<strong>20 December 2026</strong></span></div><div className="event-item"><b>◌</b><span>Time<strong>4:00 PM onwards</strong></span></div><div className="event-item"><b>⌖</b><span>Venue<strong>{VENUE}</strong></span></div></div><a className="map-link" href={MAP_URL} target="_blank" rel="noreferrer">⌖ &nbsp; Open in Google Maps</a></div><iframe title="Wedding venue map" src="https://www.google.com/maps?q=SHAMS%20Auditorium%20Azhiyur%20Kerala&output=embed" loading="lazy" /></div></section>

        <section className="reference-section schedule-block" id="schedule"><p className="section-kicker">Save the Date</p><h2>The Celebration</h2><p className="section-intro">A day filled with blessings, laughter, and the people we love most.</p><div className="schedule-card"><span>Sunday, December 20</span><b>✦</b><h3>4:00 PM - 9:00 PM</h3><p>{VENUE}</p><small>Come celebrate the beginning of our forever.</small></div></section>

        <section className="reference-section qr-block" id="qr"><p className="section-kicker">Share the Love</p><h2>Carry the Joy</h2><p className="section-intro">Keep this invitation close, or share it with everyone who makes your world brighter.</p><div className="qr-card"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(window.location.href)}`} alt="QR code for this wedding invitation" /><div><p>Scan the Invitation</p><span>Point your camera at the code to open our wedding invitation.</span><a href={`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(window.location.href)}`} download="athira-abhinandh-wedding-qr.png">⇩ &nbsp; Download QR Code</a></div></div></section>

        <section className="reference-section share-block" id="share"><p className="section-kicker">Spread the Joy</p><h2>Share Our Happiness</h2><p className="section-intro">A little share from you would mean the world to us and our families.</p><div className="share-row"><button className="share-whatsapp" aria-label="Share on WhatsApp" title="WhatsApp" onClick={() => share("whatsapp")}><img src="https://cdn.simpleicons.org/whatsapp/ffffff" alt="" /></button><button className="share-facebook" aria-label="Share on Facebook" title="Facebook" onClick={() => share("facebook")}><img src="https://cdn.simpleicons.org/facebook/ffffff" alt="" /></button><button className="share-instagram" aria-label="Share on Instagram" title="Instagram" onClick={() => share("instagram")}><img src="https://cdn.simpleicons.org/instagram/ffffff" alt="" /></button><button className="share-telegram" aria-label="Share on Telegram" title="Telegram" onClick={() => share("telegram")}><img src="https://cdn.simpleicons.org/telegram/ffffff" alt="" /></button><button className="share-email" aria-label="Share by email" title="Email" onClick={() => share("email")}><img src="https://cdn.simpleicons.org/gmail/ffffff" alt="" /></button><button className="share-copy" aria-label={copied ? "Copied" : "Copy link"} title={copied ? "Copied" : "Copy link"} onClick={copyLink}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 15a4 4 0 0 0 5.7.3l2-2a4 4 0 0 0-5.7-5.7l-1.1 1.1m5.1.9a4 4 0 0 0-5.7-.3l-2 2A4 4 0 0 0 13 17l1.1-1.1" /></svg></button><button className="share-native" aria-label="Share invitation" title="Share" onClick={() => navigator.share?.({ title: "Athira & Abhinandh", url: window.location.href })}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L7 9m5-5 5 5M5 14v5h14v-5" /></svg></button></div></section>
      </main>

      <footer className="reference-footer"><p>With Blessings From Our Families</p><h2><strong><em>Abhinandh </em></strong> <i className="love-symbol">♡</i> <strong><em>Athira</em></strong></h2><p>20 December 2026</p><small>{VENUE}</small><div>Made with love · <strong><em>Abhinandh</em></strong> &amp; <strong><em>Athira</em></strong> · 2026</div></footer>
      {invitationOpen && <div className="invitation-modal" role="dialog" aria-modal="true"><button onClick={() => setInvitationOpen(false)} aria-label="Close invitation">×</button><p>With love and blessings</p><h2><strong><em>Abhinandh</em></strong> <i className="love-symbol">♡</i> <strong><em>Athira</em></strong></h2><p>We warmly invite you to celebrate our special day with us.</p><a href="#event" onClick={() => setInvitationOpen(false)}>View Event Details</a></div>}
      {showScrollTop && <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top">↑</button>}
    </div>
  );
}

export default App;