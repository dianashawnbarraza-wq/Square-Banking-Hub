"use client";

type Props = {
  tabs: readonly string[];
  value: string;
  onChange: (tab: string) => void;
  "aria-label"?: string;
};

/**
 * Monochrome Paging tabs — Figma `Paging tabs` (85:2756).
 * Active: text/10 + 2px underline. Inactive: ~55% black.
 */
export default function PagingTabs({
  tabs,
  value,
  onChange,
  "aria-label": ariaLabel = "Sections",
}: Props) {
  return (
    <div className="mono-paging" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const active = tab === value;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active}
            className={`mono-paging-tab${active ? " is-active" : ""}`}
            onClick={() => onChange(tab)}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
