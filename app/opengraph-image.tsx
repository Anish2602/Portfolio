import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
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
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0d1117",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#67e8f9", fontSize: 28 }}>
          $ whoami
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            marginTop: 24,
            letterSpacing: "-0.02em",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 16,
            color: "#67e8f9",
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 32,
            color: "#8b949e",
          }}
        >
          FastAPI · Kafka · Kubernetes · Azure & AWS
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 12,
            backgroundColor: "#67e8f9",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
