import { useEffect, useRef } from "react";

const Home = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;

    // Clear old elements (important in React strict mode)
    scene.querySelectorAll(".gen").forEach(el => el.remove());

    // ⭐ Stars
    for (let i = 0; i < 90; i++) {
      const el = document.createElement("div");
      el.className = "star gen";

      const s = Math.random() * 2.5 + 0.5;

      el.style.cssText = `
        width:${s}px;height:${s}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        --d:${2 + Math.random() * 4}s;
        --delay:${-Math.random() * 5}s;
        --lo:${0.15 + Math.random() * 0.45};
      `;
      scene.appendChild(el);
    }

    // 🌸 Petals
    const petalColors = [
      "rgba(230,150,180,0.75)",
      "rgba(200,120,210,0.65)",
      "rgba(245,200,220,0.7)",
      "rgba(180,130,230,0.6)",
      "rgba(255,180,200,0.7)",
    ];

    for (let i = 0; i < 28; i++) {
      const el = document.createElement("div");
      el.className = "petal gen";

      const sz = 6 + Math.random() * 10;
      const dx = (Math.random() - 0.5) * 120;

      el.style.cssText = `
        width:${sz}px;height:${sz * 0.7}px;
        left:${Math.random() * 100}%;
        bottom:${-10 - Math.random() * 30}px;
        background:${petalColors[i % petalColors.length]};
        --pd:${6 + Math.random() * 8}s;
        --pdelay:${-Math.random() * 14}s;
        --dx:${dx}px;
        --rot:${Math.random() * 720 - 360}deg;
      `;
      scene.appendChild(el);
    }

    // ✨ Dust
    const dustColors = ["#f5e2a8", "#e8c9fa", "#ffc8e0", "#c8d4ff", "#ffe0a0"];

    for (let i = 0; i < 45; i++) {
      const el = document.createElement("div");
      el.className = "dust gen";

      el.style.cssText = `
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 20}%;
        background:${dustColors[i % dustColors.length]};
        --dd:${4 + Math.random() * 8}s;
        --ddelay:${-Math.random() * 12}s;
      `;
      scene.appendChild(el);
    }

    // 🌠 Shooting stars
    for (let i = 0; i < 5; i++) {
      const el = document.createElement("div");
      el.className = "shoot gen";

      const angle = -18 - Math.random() * 15;
      const len = 80 + Math.random() * 120;

      el.style.cssText = `
        width:${len}px;
        top:${5 + Math.random() * 40}%;
        left:${10 + Math.random() * 50}%;
        --sd:${5 + Math.random() * 7}s;
        --sdelay:${-Math.random() * 12}s;
        --sang:${angle}deg;
        --sx:${200 + Math.random() * 200}px;
        --sy:${80 + Math.random() * 80}px;
      `;
      scene.appendChild(el);
    }
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative w-full h-[100vh] overflow-hidden  font-sans"
      style={{
        background:
          "linear-gradient(160deg, #2e1a47 0%, #1a0f2e 40%, #0d0620 100%)",
      }}
    >
      {/* Orbs */}
      <div className="orb w-[240px] h-[240px] top-[10%] left-[5%] bg-purple-500/20 absolute" />
      <div className="orb w-[300px] h-[300px] top-[30%] right-0 bg-pink-500/20 absolute" />
      <div className="orb w-[180px] h-[180px] bottom-[10%] left-[30%] bg-blue-400/20 absolute" />

      {/* Rings */}
      <div className="ring w-[180px] h-[180px] top-1/2 left-1/2 absolute" />
      <div className="ring w-[180px] h-[180px] top-1/2 left-1/2 absolute delay-1000" />

      {/* Center Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-[28px] sm:text-[42px] tracking-[0.14em] text-yellow-200 font-serif drop-shadow-lg">
          We're Getting Married
        </h2>

        <div className="flex items-center justify-center gap-3 my-2">
          <hr className="w-[60px] border-yellow-200/30" />
          <span className="text-yellow-200/60">✦</span>
          <hr className="w-[60px] border-yellow-200/30" />
        </div>

        <p className="text-[13px] tracking-[0.22em] text-purple-200/70 uppercase">
          A celebration of love & unity
        </p>
      </div>

      {/* Styles */}
      <style>{`
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--d) ease-in-out infinite var(--delay);
        }

        @keyframes twinkle {
          0%, 100% { opacity: var(--lo); transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }

        .petal {
          position: absolute;
          border-radius: 50% 0 50% 0;
          animation: floatPetal var(--pd) ease-in-out infinite var(--pdelay);
        }

        @keyframes floatPetal {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.7; }
          100% {
            transform: translateY(-520px) translateX(var(--dx)) rotate(var(--rot));
            opacity: 0;
          }
        }

        .dust {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          animation: riseUp var(--dd) linear infinite var(--ddelay);
        }

        @keyframes riseUp {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(-580px); opacity: 0; }
        }

        .shoot {
          position: absolute;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #ffd878, transparent);
          animation: shoot var(--sd) ease-in infinite var(--sdelay);
        }

        @keyframes shoot {
          0% { opacity: 0; transform: translate(0,0) rotate(var(--sang)); }
          10% { opacity: 1; }
          100% {
            opacity: 0;
            transform: translate(var(--sx), var(--sy)) rotate(var(--sang));
          }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: drift 12s ease-in-out infinite alternate;
        }

        @keyframes drift {
          0% { transform: translate(0,0); }
          100% { transform: translate(40px, 30px); }
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(232,201,122,0.2);
          transform: translate(-50%, -50%);
          animation: expand 5s infinite;
        }

        @keyframes expand {
          from { transform: translate(-50%, -50%) scale(0.2); opacity: 0.7; }
          to { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Home;