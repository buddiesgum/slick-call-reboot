import { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";

const locations = [
  { id: "fort-worth", label: "Fort Worth, TX", short: "Fort Worth" },
  { id: "medford", label: "Medford, OR", short: "Medford" },
];

const LocationSelector = () => {
  const [selected, setSelected] = useState(locations[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs font-body text-secondary-foreground/70 hover:text-primary transition-colors"
      >
        <MapPin className="w-3.5 h-3.5 text-primary" />
        <span className="hidden sm:inline">{selected.label}</span>
        <span className="sm:hidden">{selected.short}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-popover border border-border rounded-md shadow-lg overflow-hidden z-50">
          <div className="px-3 py-2 border-b border-border">
            <span className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">
              Select Location
            </span>
          </div>
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => {
                setSelected(loc);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left transition-colors hover:bg-accent ${
                selected.id === loc.id ? "text-primary bg-accent/50" : "text-popover-foreground"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              {loc.label}
              {selected.id === loc.id && (
                <span className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
