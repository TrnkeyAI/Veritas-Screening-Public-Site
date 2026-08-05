type VMarkProps = {
  /** Pixel size for both width and height. Omit and size via `className` instead (e.g. for the oversized watermark treatment). */
  size?: number;
  className?: string;
};

/**
 * Hand-authored "V" monogram for Veritas — a sharp, geometric chevron set
 * inside a cut-corner badge frame. Institutional, not a script letter.
 * Uses currentColor so it inherits whatever text color is set on it.
 *
 * ponytail: decorative-only now that the client's real logo (public/logo*.png)
 * is wired into Header/Footer. Kept solely for the oversized, low-opacity
 * background watermarks on the home hero and closing CTA band, since the
 * real logo is multicolour and can't serve as a monochrome watermark.
 * Should ideally be replaced with a silhouette traced from the real shield
 * once an SVG version of the client's logo exists.
 */
export default function VMark({ size, className = "" }: VMarkProps) {
  return (
    <svg
      {...(size ? { width: size, height: size } : {})}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M15 3h18l12 12v18l-12 12H15L3 33V15L15 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
        opacity="0.4"
      />
      <path
        d="M10 13l14 27 14-27"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  );
}
