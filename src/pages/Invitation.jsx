import { useState, useEffect, useRef, useCallback } from "react";

const rand = (min, max) => Math.random() * (max - min) + min;

const PETALS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: rand(0, 100),
  delay: rand(0, 12),
  duration: rand(7, 14),
  size: rand(7, 18),
  rotate: rand(0, 360),
  drift: rand(-120, 120),
  color: i % 3 === 0 ? "rgba(255,200,150,0.55)" : i % 3 === 1 ? "rgba(212,175,55,0.45)" : "rgba(200,230,200,0.4)",
}));

const FIREFLIES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: rand(5, 95),
  y: rand(5, 95),
  size: rand(3, 7),
  delay: rand(0, 6),
  dur: rand(3, 7),
  driftX: rand(-40, 40),
  driftY: rand(-40, 40),
}));

const COUPLE1 = {
  groom: "MUHAMMED SHIBIL N",
  bride: "SAHNA SHERIN P",
  groomShort: "Shibil",
  brideShort: "Shahna",
  accent: "#a8d5a2",
  accentSoft: "rgba(168,213,162,",
  glow: "rgba(168,213,162,0.35)",
  label: "First Union",
  verse: "Manhappetty × Veethanassery",
  emoji: "⭐",
};

const COUPLE2 = {
  groom: "SUDAIS N",
  bride: "FATHIMA HIBA T",
  groomShort: "Sudais",
  brideShort: "Hiba",
  accent: "#d4af37",
  accentSoft: "rgba(212,175,55,",
  glow: "rgba(212,175,55,0.35) ",
  label: "Second Union",
  verse: "Manhappetty × Chembrassery",
  emoji: "🌙",
};

function CoupleCard({ couple, side, revealed, delay }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = side === "left";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 280,
        background: hovered
          ? `linear-gradient(160deg, rgba(255,252,240,0.06) 0%, ${couple.accentSoft}0.1) 100%)`
          : `linear-gradient(160deg, rgba(255,252,240,0.03) 0%, ${couple.accentSoft}0.05) 100%)`,
        border: `1px solid ${couple.accentSoft}${hovered ? "0.45)" : "0.2)"}`,
        borderRadius: 3,
        padding: "48px 36px",
        position: "relative",
        transition: "all 0.5s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px ${couple.glow}, 0 0 40px ${couple.accentSoft}0.1)` : "none",
        opacity: revealed ? 1 : 0,
        animation: revealed ? `fadeUp 1s ease ${delay}s both` : "none",
      }}
      className="w-[80%] sm:w-[90%]"
    >
      {/* Corner accents */}
      {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
        <div key={v+h} style={{
          position:"absolute",
          [v]: -1, [h]: -1,
          width: 32, height: 32,
          borderTop: v==="top" ? `2px solid ${couple.accentSoft}0.7)` : "none",
          borderBottom: v==="bottom" ? `2px solid ${couple.accentSoft}0.7)` : "none",
          borderLeft: h==="left" ? `2px solid ${couple.accentSoft}0.7)` : "none",
          borderRight: h==="right" ? `2px solid ${couple.accentSoft}0.7)` : "none",
        }}/>
      ))}

      {/* Label badge */}
      <div style={{ textAlign:"center", marginBottom: 20 }}>
        <span style={{
          fontFamily:"'EB Garamond', serif",
          fontSize: 12,
          letterSpacing: 5,
          textTransform:"uppercase",
          color: `${couple.accentSoft}0.55)`,
          borderBottom: `1px solid ${couple.accentSoft}0.25)`,
          paddingBottom: 6,
        }}>{couple.emoji} {couple.label}</span>
      </div>

      {/* Groom name */}
      <div style={{ textAlign:"center", marginBottom: 6 }}>
        <p style={{
          fontFamily:"'EB Garamond', serif",
          fontSize: 10,
          letterSpacing: 5,
          textTransform:"uppercase",
          color: `${couple.accentSoft}0.45)`,
          marginBottom: 8,
        }}>Groom</p>
        <h2 style={{
          fontFamily:"'Cinzel Decorative', serif",
          fontSize: "clamp(22px, 2.2vw, 28px)",
          fontWeight: 900,
          background: `linear-gradient(90deg, ${couple.accent}, #fff8e7, ${couple.accent})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 4s linear infinite",
          lineHeight: 1.3,
          letterSpacing: 1,
        }}>{couple.groom}</h2>
      </div>

      {/* Heart connector */}
      <div style={{
        textAlign:"center",
        margin:"18px 0",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap: 10,
      }}>
        <div style={{ flex:1, height:1, background:`linear-gradient(to right, transparent, ${couple.accentSoft}0.4))` }}/>
        <span style={{
          fontSize: 20,
          animation:"heartbeat 2s ease-in-out infinite",
          display:"inline-block",
          filter:`drop-shadow(0 0 6px ${couple.glow})`,
        }}>🤍</span>
        <div style={{ flex:1, height:1, background:`linear-gradient(to left, transparent, ${couple.accentSoft}0.4))` }}/>
      </div>

      {/* Bride name */}
      <div style={{ textAlign:"center", marginBottom: 24 }}>
        <p style={{
          fontFamily:"'EB Garamond', serif",
          fontSize: 10,
          letterSpacing: 5,
          textTransform:"uppercase",
          color: `${couple.accentSoft}0.45)`,
          marginBottom: 8,
        }}>Bride</p>
        <h2 style={{
          fontFamily:"'Cinzel Decorative', serif",
          fontSize: "clamp(22px, 2.2vw, 28px)",
          fontWeight: 900,
          background: `linear-gradient(90deg, ${couple.accent}, #fff8e7, ${couple.accent})`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 4s linear infinite 0.5s",
          lineHeight: 1.3,
          letterSpacing: 1,
        }}>{couple.bride}</h2>
      </div>

      {/* Origin tag */}
      <div style={{ textAlign:"center", marginBottom: 28 }}>
        <span style={{
          fontFamily:"'EB Garamond', serif",
          fontStyle:"italic",
          fontSize: 14,
          color: `${couple.accentSoft}0.45)`,
          letterSpacing: 2,
        }}>{couple.verse}</span>
      </div>

      {/* Divider */}
      <div style={{
        borderTop: `1px solid ${couple.accentSoft}0.12)`,
        paddingTop: 24,
        textAlign:"center",
      }}>
        <p style={{
          fontFamily:"'Cormorant Garamond', serif",
          fontStyle:"italic",
          fontSize: 13,
          color: `${couple.accentSoft}0.5)`,
          lineHeight: 1.8,
        }}>Two souls, one destiny. United in love across miles.</p>
      </div>
    </div>
  );
}

export default function Invitation() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [ripples, setRipples] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef(null);
  const sparkleId = useRef(0);

  useEffect(() => { setTimeout(() => setRevealed(true), 200); }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    if (Math.random() > 0.88) {
      const id = sparkleId.current++;
      setSparkles(p => [...p.slice(-18), { id, x, y, size: rand(4,10), hue: Math.random()>0.5?"#d4af37":"#a8d5a2" }]);
      setTimeout(() => setSparkles(p => p.filter(s => s.id !== id)), 700);
    }
  }, []);

    const handleTouchMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    if (Math.random() > 0.88) {
      const id = sparkleId.current++;
      setSparkles(p => [...p.slice(-18), { id, x, y, size: rand(4,10), hue: Math.random()>0.5?"#d4af37":"#a8d5a2" }]);
      setTimeout(() => setSparkles(p => p.filter(s => s.id !== id)), 700);
    }
  }, []);

  const handleClick = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(p => [...p.slice(-6), { id, x, y }]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 1400);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(160deg, #080a06 0%, #0f110d 35%, #0a0e14 65%, #0d0a06 100%)",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Cinzel+Decorative:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        @keyframes petalFall{
          0%{transform:translateY(-40px) rotate(0deg) translateX(0px);opacity:0;}
          10%{opacity:0.8;}90%{opacity:0.3;}
          100%{transform:translateY(110vh) rotate(var(--pr)) translateX(var(--pd));opacity:0;}
        }
        @keyframes firefly{
          0%,100%{transform:translate(0,0);opacity:0.3;}
          25%{transform:translate(var(--dx),var(--dy));opacity:0.9;}
          50%{transform:translate(calc(var(--dx)*0.5),calc(var(--dy)*1.5));opacity:0.5;}
          75%{transform:translate(calc(var(--dx)*1.2),calc(var(--dy)*0.3));opacity:0.8;}
        }
        @keyframes fadeUp{from{opacity:0;transform:translateY(40px);}to{opacity:1;transform:translateY(0);}}
        @keyframes shimmer{0%{background-position:-200% center;}100%{background-position:200% center;}}
        @keyframes heartbeat{0%,100%{transform:scale(1);}25%{transform:scale(1.18);}50%{transform:scale(1);}75%{transform:scale(1.1);}}
        @keyframes rippleOut{0%{transform:translate(-50%,-50%) scale(0);opacity:0.7;}100%{transform:translate(-50%,-50%) scale(10);opacity:0;}}
        @keyframes sparkleAnim{0%{transform:translate(-50%,-50%) scale(0) rotate(0deg);opacity:1;}60%{transform:translate(-50%,-50%) scale(1.2) rotate(180deg);opacity:0.7;}100%{transform:translate(-50%,-50%) scale(0) rotate(360deg);opacity:0;}}
        @keyframes cursorPulse{0%,100%{transform:translate(-50%,-50%) scale(1);}50%{transform:translate(-50%,-50%) scale(1.4);}}
        @keyframes float{0%,100%{transform:translateY(0px);}50%{transform:translateY(-10px);}}
        @keyframes twinkle{0%,100%{opacity:0.15;transform:scale(1);}50%{opacity:1;transform:scale(1.5);}}
        @keyframes borderGlow{0%,100%{opacity:0.6;}50%{opacity:1;}}
        @keyframes dividerExpand{from{transform:scaleX(0);}to{transform:scaleX(1);}}
        @keyframes rotateOrbit{from{transform:rotate(0deg) translateX(60px);}to{transform:rotate(360deg) translateX(60px);}}
        @keyframes orbitRing{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
      `}</style>

      {/* Custom cursor */}
      <div
        style={{
          position: "fixed",
          left: mousePos.x,
          top: mousePos.y,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.95) 0%, rgba(168,213,162,0.3) 100%)",
          border: "1px solid rgba(212,175,55,0.5)",
          pointerEvents: "none",
          zIndex: 9999,
          animation: "cursorPulse 1.8s ease-in-out infinite",
          transform: "translate(-50%,-50%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: mousePos.x,
          top: mousePos.y,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(168,213,162,0.3)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%,-50%)",
          transition: "left 0.08s ease, top 0.08s ease",
        }}
      />

      {/* Falling petals */}
      {PETALS.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            left: `${p.left}%`,
            top: 0,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: "50% 0 50% 0",
            "--pr": `${p.rotate}deg`,
            "--pd": `${p.drift}px`,
            animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Fireflies */}
      {FIREFLIES.map((f) => (
        <div
          key={f.id}
          style={{
            position: "fixed",
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            height: f.size,
            borderRadius: "50%",
            background:
              f.id % 2 === 0 ? "rgba(212,175,55,0.9)" : "rgba(168,213,162,0.9)",
            boxShadow:
              f.id % 2 === 0
                ? "0 0 8px rgba(212,175,55,0.8)"
                : "0 0 8px rgba(168,213,162,0.8)",
            "--dx": `${f.driftX}px`,
            "--dy": `${f.driftY}px`,
            animation: `firefly ${f.dur}s ${f.delay}s ease-in-out infinite`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* Click ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "1.5px solid rgba(212,175,55,0.6)",
            animation: "rippleOut 1.4s ease-out forwards",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            background: s.hue,
            clipPath:
              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
            animation: "sparkleAnim 0.7s ease-out forwards",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      ))}

      {/* ========== CONTENT ========== */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 1000,
          margin: "0 auto",
          padding: "50px 20px 80px",
        }}
      >
        {/* ── HEADER ── */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 48,
            opacity: revealed ? 1 : 0,
            transition: "opacity 1.2s ease 0.2s",
          }}
        >
          {/* Bismillah */}
          <p
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: 13,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "rgba(212,175,55,0.5)",
              marginBottom: 20,
            }}
          >
           In the Name of Allah — إن شاء الل 
          </p>

          {/* Main title */}
          <div
            style={{
              animation: revealed ? "fadeUp 1s ease 0.4s both" : "none",
            }}
          >
            <h1
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(22px,5vw,52px)",
                fontWeight: 700,
                background:
                  "linear-gradient(90deg, #8a6914, #d4af37, #f0d060, #a8d5a2, #d4af37, #8a6914)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 6s linear infinite",
                lineHeight: 1.2,
                marginBottom: 10,
              }}
            >
              Join Us in Celebrating
            </h1>
            <h2
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(13px,2.5vw,22px)",
                fontWeight: 400,
                color: "rgba(245,235,200,0.55)",
                letterSpacing: 4,
                marginBottom: 24,
              }}
            >
              Two Sacred Unions
            </h2>
          </div>

          {/* Animated ornament line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              animation: revealed ? "fadeUp 1s ease 0.7s both" : "none",
            }}
          >
            <div
              style={{
                height: 1,
                width: "clamp(40px,12vw,120px)",
                background:
                  "linear-gradient(to right, transparent, rgba(212,175,55,0.5))",
                animation: "dividerExpand 1.5s ease 1s both",
                transformOrigin: "right",
              }}
            />
            <span
              style={{
                color: "rgba(212,175,55,0.6)",
                fontSize: 20,
                letterSpacing: 8,
              }}
            >
              ✦ ✦ ✦
            </span>
            <div
              style={{
                height: 1,
                width: "clamp(40px,12vw,120px)",
                background:
                  "linear-gradient(to left, transparent, rgba(168,213,162,0.5))",
                animation: "dividerExpand 1.5s ease 1s both",
                transformOrigin: "left",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 16,
              color: "rgba(200,200,180,0.5)",
              marginTop: 20,
              letterSpacing: 1,
              animation: revealed ? "fadeUp 1s ease 0.9s both" : "none",
            }}
          >
            Two brothers. Two brides. One blessed day.
          </p>
        </div>

        {/* ── BOTH COUPLES SIDE BY SIDE ── */}
        <div
          style={{
            display: "flex",
            gap: 0,
            // alignItems:"stretch",
            // flexWrap:"wrap",
            marginBottom: 52,
          }}
          className="flex-col sm:flex-row items-center"
        >
          <CoupleCard
            couple={COUPLE1}
            side="left"
            revealed={revealed}
            delay={1.1}
          />

          {/* Center divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 24px",
              opacity: revealed ? 1 : 0,
              transition: "opacity 1s ease 1.4s",
              minWidth: 60,
            }}
            className=""
          >
            <div
              style={{
                flex: 1,
                width: 3,
                background:
                  "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), rgba(168,213,162,0.3), transparent)",
              }}
            />
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px 0",
                position: "relative",
                animation: "borderGlow 3s ease-in-out infinite",
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  animation: "heartbeat 2.5s ease-in-out infinite",
                  display: "inline-block",
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "clamp(14px, 2.2vw, 22px)",
                  fontWeight: 400,
                  background: `linear-gradient(90deg, #d4af37, #fff8e7, #d4af37)`,
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "shimmer 4s linear infinite",
                  lineHeight: 1.3,
                  letterSpacing: 1,
                }}
              >
                AND
              </span>
              {/* Orbit dot */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(212,175,55,0.8)",
                  animation: "rotateOrbit 3s linear infinite",
                  transformOrigin: "-27px 0",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                width: "5px",
                height: "100px",
                background:
                  "linear-gradient(to bottom, transparent, rgba(168,213,162,0.3), rgba(212,175,55,0.3), transparent)",
              }}
            />
          </div>

          <CoupleCard
            couple={COUPLE2}
            side="right"
            revealed={revealed}
            delay={1.3}
          />
        </div>

        {/* ── SHARED EVENT DETAILS ── */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,250,235,0.03) 0%, rgba(212,175,55,0.06) 50%, rgba(168,213,162,0.04) 100%)",
            border: "1px solid rgba(212,175,55,0.18)",
            borderRadius: 3,
            padding: "44px 40px",
            position: "relative",
            animation: revealed ? "fadeUp 1s ease 1.6s both" : "none",
            marginBottom: 48,
          }}
        >
          {/* Corner accents */}
          {[
            ["top", "left"],
            ["top", "right"],
            ["bottom", "left"],
            ["bottom", "right"],
          ].map(([v, h]) => (
            <div
              key={v + h}
              style={{
                position: "absolute",
                [v]: -1,
                [h]: -1,
                width: 36,
                height: 36,
                borderTop:
                  v === "top" ? "1px solid rgba(212,175,55,0.5)" : "none",
                borderBottom:
                  v === "bottom" ? "1px solid rgba(212,175,55,0.5)" : "none",
                borderLeft:
                  h === "left" ? "1px solid rgba(212,175,55,0.5)" : "none",
                borderRight:
                  h === "right" ? "1px solid rgba(212,175,55,0.5)" : "none",
              }}
            />
          ))}

          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 11,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.45)",
                marginBottom: 16,
              }}
            >
              You Are Warmly Invited To The
            </p>
            <h3
              style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(16px,3vw,28px)",
                fontWeight: 400,
                color: "rgba(245,230,180,0.85)",
                letterSpacing: 2,
              }}
            >
              Walima Reception
            </h3>
          </div>

          {/* Date / Time / Venue row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr auto 1fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            {/* Date */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "rgba(212,175,55,0.4)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Date
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px,5vw,46px)",
                  fontWeight: 300,
                  color: "rgba(245,230,180,0.9)",
                  lineHeight: 1,
                }}
              >
                25
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 13,
                  letterSpacing: 3,
                  color: "rgba(212,175,55,0.6)",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                April
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 13,
                  color: "rgba(212,175,55,0.4)",
                  marginTop: 2,
                }}
              >
                2026
              </p>
            </div>

            <div
              style={{
                width: 1,
                height: 80,
                background:
                  "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)",
              }}
            />

            {/* Time */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "rgba(212,175,55,0.4)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Time
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(22px,4vw,38px)",
                  fontWeight: 300,
                  color: "rgba(245,230,180,0.9)",
                }}
              >
                4:00 PM
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 12,
                  letterSpacing: 2,
                  color: "rgba(212,175,55,0.5)",
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                Onwards
              </p>
            </div>

            <div
              style={{
                width: 1,
                height: 80,
                background:
                  "linear-gradient(to bottom, transparent, rgba(168,213,162,0.3), transparent)",
              }}
            />

            {/* Venue */}
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "rgba(212,175,55,0.4)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Venue
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(16px,2.5vw,22px)",
                  fontWeight: 300,
                  color: "rgba(245,230,180,0.85)",
                  lineHeight: 1.4,
                }}
              >
                Hill View Convention Center
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "rgba(212,175,55,0.45)",
                  marginTop: 6,
                  letterSpacing: 1,
                }}
              >
                Koorad,Wandoor
              </p>
            </div>
          </div>
        </div>

        {/* ── FAMILY SECTION ── */}
        <div
          style={{
            animation: revealed ? "fadeUp 1s ease 1.9s both" : "none",
            marginBottom: 52,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: 11,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "rgba(212,175,55,0.4)",
              }}
            >
              With Blessings From
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                role: "Father of the Grooms",
                name: "Abdul Khader N",
                sub: "& Family",
              },
              {
                role: "Mother of the Grooms",
                name: "Shakkeela V",
                sub: "& Family",
              },
              {
                role: "Family of the Bride",
                name: "Sahna Sherin",
                sub: "Parents & Relatives",
              },
              {
                role: "Family of the Bride",
                name: "Fathima Hiba T",
                sub: "Parents & Relatives",
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(212,175,55,0.03)",
                  border: "1px solid rgba(212,175,55,0.12)",
                  borderRadius: 2,
                  padding: "22px 18px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,175,55,0.07)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(212,175,55,0.03)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.12)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: 10,
                    letterSpacing: 3,
                    color: "rgba(212,175,55,0.4)",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {f.role}
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 18,
                    color: "rgba(245,230,180,0.8)",
                    lineHeight: 1.5,
                  }}
                >
                  {f.name}
                </p>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontStyle: "italic",
                    fontSize: 12,
                    color: "rgba(212,175,55,0.35)",
                    marginTop: 4,
                  }}
                >
                  {f.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLOSING ── */}
        <div
          style={{
            textAlign: "center",
            animation: revealed ? "fadeUp 1s ease 2.2s both" : "none",
          }}
        >
          <p
            style={{
              fontFamily: "'EB Garamond', serif",
              fontStyle: "italic",
              fontSize: 15,
              color: "rgba(212,175,55,0.45)",
              maxWidth: 500,
              margin: "0 auto 32px",
              lineHeight: 1.9,
            }}
          >
            Your presence, prayers and blessings on this joyous occasion would
            be the greatest gift to both our families.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "RSVP — Shibil & Sahna", color: "rgba(168,213,162," },
              { label: "RSVP — Sudais & Hiba", color: "rgba(212,175,55," },
            ].map((btn, i) => (
              <button
                key={i}
                style={{
                  background: `linear-gradient(135deg, ${btn.color}0.08), ${btn.color}0.16))`,
                  border: `1px solid ${btn.color}0.4)`,
                  color: `${btn.color}0.85)`,
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 12,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  padding: "13px 28px",
                  cursor: "pointer",
                  borderRadius: 1,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${btn.color}0.2), ${btn.color}0.3))`;
                  e.currentTarget.style.boxShadow = `0 0 24px ${btn.color}0.3)`;
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${btn.color}0.08), ${btn.color}0.16))`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: 52 }}>
            <div
              style={{
                color: "rgba(212,175,55,0.25)",
                fontSize: 20,
                letterSpacing: 12,
                marginBottom: 14,
              }}
            >
              ✦ ✦ ✦
            </div>
            <p
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "rgba(212,175,55,0.3)",
                letterSpacing: 2,
              }}
            >
              "And He placed between you affection and mercy" — Quran 30:21
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}