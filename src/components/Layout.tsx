import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LocationSelector from "./LocationSelector";

const PHONE_NUMBER = "tel:+15555555555";

const serviceLinks = [
  { label: "Plumbing", path: "/plumbing" },
  { label: "Excavation", path: "/excavation" },
  { label: "Restoration", path: "/restoration" },
  { label: "Remodels", path: "/remodels" },
  { label: "Foundations", path: "/foundations" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isServicePage = serviceLinks.some((l) => location.pathname === l.path);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
        {/* Bible verse bar */}
        <div className="bg-secondary-foreground/5 border-b border-secondary-foreground/10">
          <div className="container flex justify-center py-1">
            <span className="text-[10px] sm:text-[11px] italic text-secondary-foreground/50 font-body tracking-wide">
              "For God so loved the world, that he gave his only begotten Son…" — John 3:16
            </span>
          </div>
        </div>

        <div className="container flex items-center justify-between h-14 md:h-18">
          {/* Logo + Location */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png"
                alt="Hukill's"
                className="h-10 md:h-14 w-auto"
              />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-secondary-foreground/20" />
            <LocationSelector />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Bible verse */}
            <span className="text-[11px] italic text-secondary-foreground/50 font-body tracking-wide mr-2">
              "For God so loved the world…" — John 3:16
            </span>

            {/* Services dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`flex items-center gap-1 px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
                  isServicePage
                    ? "text-primary"
                    : "text-secondary-foreground/80 hover:text-primary"
                }`}
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-popover border border-border rounded-md shadow-xl overflow-hidden z-50"
                  >
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setServicesOpen(false)}
                        className={`block px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
                          location.pathname === link.path
                            ? "text-primary bg-accent/50"
                            : "text-popover-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/projects"
              className={`px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
                location.pathname === "/projects"
                  ? "text-primary"
                  : "text-secondary-foreground/80 hover:text-primary"
              }`}
            >
              Projects
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
                location.pathname === "/about"
                  ? "text-primary"
                  : "text-secondary-foreground/80 hover:text-primary"
              }`}
            >
              About Us
            </Link>

            <a
              href={PHONE_NUMBER}
              className="ml-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-secondary-foreground p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-secondary"
            >
              <nav className="container flex flex-col py-4 gap-1">
                {/* Bible verse mobile */}
                <p className="px-4 py-2 text-[11px] italic text-secondary-foreground/50 font-body">
                  "For God so loved the world…" — John 3:16
                </p>

                {/* Services accordion */}
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`flex items-center justify-between px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
                    isServicePage
                      ? "text-primary"
                      : "text-secondary-foreground/80"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`block pl-8 pr-4 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
                            location.pathname === link.path
                              ? "text-primary"
                              : "text-secondary-foreground/60 hover:text-primary"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  to="/projects"
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
                    location.pathname === "/projects"
                      ? "text-primary"
                      : "text-secondary-foreground/80 hover:text-primary"
                  }`}
                >
                  Projects
                </Link>

                <Link
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
                    location.pathname === "/about"
                      ? "text-primary"
                      : "text-secondary-foreground/80 hover:text-primary"
                  }`}
                >
                  About Us
                </Link>

                <a
                  href={PHONE_NUMBER}
                  className="mx-4 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="section-dark py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img
                src="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png"
                alt="Hukill's"
                className="h-12 w-auto mb-4"
              />
              <p className="text-sm opacity-70 leading-relaxed">
                Family-owned company serving communities for over 40 years.
                One call does it all.
              </p>
            </div>
            <div>
              <h4 className="font-display uppercase text-sm tracking-wider mb-4 text-primary">
                Services
              </h4>
              <div className="flex flex-col gap-2">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-display uppercase text-sm tracking-wider mb-4 text-primary">
                Contact
              </h4>
              <a
                href={PHONE_NUMBER}
                className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Us Today
              </a>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-muted-foreground/20 text-center text-xs opacity-50">
            © {new Date().getFullYear()} Hukill's Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Call Button */}
      <a
        href={PHONE_NUMBER}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Call Hukill's"
      >
        <span className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
        <Phone className="w-6 h-6 relative z-10" />
      </a>
    </div>
  );
};

export default Layout;
