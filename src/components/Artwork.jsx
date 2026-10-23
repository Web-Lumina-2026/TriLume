/** Pure-gradient "artwork" tile — no image assets required. */
export default function Artwork({ palette, children, className = "" }) {
  const [a1, a2, a3] = palette;
  return (
    <div
      className={`art ${className}`}
      style={{
        background: `linear-gradient(160deg, ${a1}, ${a2} 45%, ${a3})`,
        "--art-a1": a1,
        "--art-a2": a2,
        "--art-a3": a3,
      }}
    >
      {children}
    </div>
  );
}

export const PALETTES = {
  kiln: ["#1f2b45", "#d8a24a", "#7a1f1f"],
  veil: ["#3a2a4d", "#c9a0dc", "#e8d9a0"],
  harvest: ["#4d2f1a", "#e0b34a", "#8a5a24"],
  tide: ["#12303c", "#7fc4c9", "#f0d9a8"],
  dusk: ["#2b1d33", "#e2725b", "#f0c987"],
  bronze: ["#231a10", "#caa24a", "#6b4a1c"],
};
