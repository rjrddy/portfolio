import { TECH_ICONS, type TechKey } from "@/lib/tech-icons";

type Props = {
  name: TechKey;
  /** Renders the label next to the mark. */
  showLabel?: boolean;
  className?: string;
};

/**
 * Monochrome brand mark. Paths inherit `currentColor`, so colour is entirely
 * the caller's business.
 */
export function TechIcon({ name, showLabel = false, className }: Props) {
  const icon = TECH_ICONS[name];
  if (!icon) return null;

  return (
    <span className={`tech${className ? ` ${className}` : ""}`}>
      <svg
        className="tech__mark"
        viewBox={icon.viewBox}
        fill="currentColor"
        role="img"
        aria-label={showLabel ? undefined : icon.title}
        aria-hidden={showLabel || undefined}
        focusable="false"
      >
        {icon.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </svg>
      {showLabel && <span className="tech__label">{icon.title}</span>}
    </span>
  );
}

/** A row of marks — used for the per-role and per-project stacks. */
export function TechRow({
  items,
  showLabels = false,
}: {
  items: readonly TechKey[];
  showLabels?: boolean;
}) {
  if (items.length === 0) return null;
  return (
    <ul className="tech-row">
      {items.map((key) => {
        const icon = TECH_ICONS[key];
        if (!icon) return null;
        return (
          <li key={key} title={icon.title}>
            <TechIcon name={key} showLabel={showLabels} />
          </li>
        );
      })}
    </ul>
  );
}
