import { Circle, Line, Path, Rect, Svg } from "@react-pdf/renderer";

import { PDF_ICONS, type PdfIconName } from "./icons";

const SHAPES = { path: Path, circle: Circle, rect: Rect, line: Line } as const;

/** A Lucide icon drawn as PDF vector paths (stays crisp and keeps the text selectable around it). */
export function PdfIcon({
  name,
  size = 9,
  color,
  strokeWidth = 2,
  style,
}: {
  name: PdfIconName;
  size?: number;
  color: string;
  strokeWidth?: number;
  style?: React.ComponentProps<typeof Svg>["style"];
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {PDF_ICONS[name].map(([tag, attrs], i) => {
        // react-pdf primitives are typed as classes; render them generically
        const Shape = SHAPES[tag as keyof typeof SHAPES] as unknown as React.ComponentType<Record<string, unknown>>;
        return (
          <Shape
            key={i}
            {...attrs}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
    </Svg>
  );
}
