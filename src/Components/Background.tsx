export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#77E4C8_0%,_transparent_25%)] opacity-20 animate-pulse" />
      
      {/* Dot pattern */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <pattern
            id="dotPattern"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.22676" cy="1.22676" r="1.22676" fill="rgba(119, 228, 200, 0.07)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
    </div>
  );
}