import { ImageResponse } from "next/og";

import { SITE } from "@/data/portfolio";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#06070A",
          color: "#EEF1F5",
          backgroundImage: "radial-gradient(circle at 85% 100%, rgba(200,255,61,0.28), rgba(6,7,10,0) 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#C8FF3D",
              color: "#0A0D03",
              fontSize: 26,
              fontWeight: 700,
              clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)",
            }}
          >
            IM
          </div>
          <div style={{ fontSize: 30, color: "#A5ABB8" }}>{SITE.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <div>Complex work,</div>
          <div style={{ color: "#C8FF3D" }}>made simple.</div>
        </div>
        <div style={{ fontSize: 30, color: "#7CE7FF" }}>Frontend Developer · Product Engineer (Software) · UI/UX Developer</div>
      </div>
    ),
    { ...size },
  );
}
