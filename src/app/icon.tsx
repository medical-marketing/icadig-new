import { ImageResponse } from "next/og";
import { createClient } from "@/prismicio";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default async function Icon() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const { favicon } = settings.data;
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 24,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <img
          src={favicon.url || "default-favicon.png"}
          alt={favicon.alt || ""}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
