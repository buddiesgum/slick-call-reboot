import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ChevronDown, ChevronRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LocationSelector from "./LocationSelector";
import { useLocationContext } from "@/context/LocationContext";
import hukillsLogo from "@/assets/hukills-logo.png";

const plumbingSubLinks = [
  { label: "Plumbing", path: "/plumbing" },
  { label: "Drain Cleaning", path: "/drain-cleaning" },
  { label: "Leak Detection", path: "/leak-detection" },
  { label: "Water Heaters", path: "/water-heaters" },
  { label: "Septic Services", path: "/septic-services" },
];

type ServiceLink = {
  label: string;
  path: string;
  subLinks?: { label: string; path: string }[];
};

const serviceLinks: ServiceLink[] = [
  { label: "All Services", path: "/all-services" },
  { label: "Plumbing", path: "/plumbing", subLinks: plumbingSubLinks },
  { label: "Commercial Plumbing", path: "/commercial-plumbing" },
  { label: "New Build Plumbing", path: "/new-build-plumbing" },
  { label: "Excavation", path: "/excavation" },
  { label: "Restoration", path: "/restoration" },
  { label: "Remodels", path: "/remodels" },
  { label: "Foundations", path: "/foundations" },
];

const plumbingPaths = plumbingSubLinks.map((l) => l.path);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [plumbingOpen, setPlumbingOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePlumbingOpen, setMobilePlumbingOpen] = useState(false);
  const location = useLocation();
  const { selected: currentLocation } = useLocationContext();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
        setPlumbingOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isPlumbingPage = plumbingPaths.includes(location.pathname);
  const isServicePage =
    serviceLinks.some((l) => location.pathname === l.path) || isPlumbingPage;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
        {/* Bible verse bar */}
        <div>
          <div className="container flex justify-center py-1">
            <span className="text-[10px] sm:text-[11px] italic text-primary font-body tracking-wide">
              "For God so loved the world, that he gave his only begotten Son…" — John 3:16
            </span>
          </div>
        </div>

        <div className="container flex items-center justify-between h-14 md:h-18">
          {/* Logo + Location */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex-shrink-0">
              <img
                src={hukillsLogo}
                alt="Hukill's"
                className="h-[46px] md:h-16 w-auto"
              />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-secondary-foreground/20" />
            <LocationSelector />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">

            <Link
              to="/"
              className={`px-3 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-secondary-foreground/80 hover:text-primary"
              }`}
            >
              Home
            </Link>

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
                    className="absolute top-full left-0 mt-1 w-52 bg-popover border border-border rounded-md shadow-xl z-50"
                  >
                    {serviceLinks.map((link) => {
                      const hasSub = !!link.subLinks;
                      return (
                        <div
                          key={link.path}
                          className="relative"
                          onMouseEnter={() => hasSub && setPlumbingOpen(true)}
                          onMouseLeave={() => hasSub && setPlumbingOpen(false)}
                        >
                          <Link
                            to={link.path}
                            onClick={() => {
                              setServicesOpen(false);
                              setPlumbingOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
                              location.pathname === link.path ||
                              (hasSub && isPlumbingPage)
                                ? "text-primary bg-accent/50"
                                : "text-popover-foreground"
                            }`}
                          >
                            {link.label}
                            {hasSub && <ChevronRight className="w-3.5 h-3.5 ml-2" />}
                          </Link>

                          {/* Nested submenu */}
                          {hasSub && (
                            <AnimatePresence>
                              {plumbingOpen && (
                                <motion.div
                                  initial={{ opacity: 0, x: -4 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -4 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute top-0 left-full w-56 bg-popover border border-border rounded-md shadow-xl overflow-hidden z-50"
                                >
                                  {link.subLinks!.map((sub) => (
                                    <Link
                                      key={sub.path}
                                      to={sub.path}
                                      onClick={() => {
                                        setServicesOpen(false);
                                        setPlumbingOpen(false);
                                      }}
                                      className={`block px-4 py-2.5 text-sm font-display uppercase tracking-wider transition-colors hover:bg-accent hover:text-primary ${
                                        location.pathname === sub.path
                                          ? "text-primary bg-accent/50"
                                          : "text-popover-foreground"
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      );
                    })}
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

                <Link
                  to="/contact"
                  className="ml-2 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
                >
                  Contact Us
                </Link>
                <Link
                  to="/financing"
                  className={`ml-1 inline-flex items-center gap-2 border-2 px-5 py-2 font-display uppercase text-sm tracking-wider transition-colors rounded-sm ${
                    location.pathname === "/financing"
                      ? "border-primary text-primary"
                      : "border-primary/60 text-secondary-foreground/90 hover:border-primary hover:text-primary"
                  }`}
                >
                  Financing
                </Link>
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
                      {serviceLinks.map((link) => {
                        const hasSub = !!link.subLinks;
                        if (!hasSub) {
                          return (
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
                          );
                        }
                        return (
                          <div key={link.path}>
                            <button
                              onClick={() => setMobilePlumbingOpen(!mobilePlumbingOpen)}
                              className={`w-full flex items-center justify-between pl-8 pr-4 py-2.5 font-display text-sm uppercase tracking-wider transition-colors ${
                                isPlumbingPage
                                  ? "text-primary"
                                  : "text-secondary-foreground/60 hover:text-primary"
                              }`}
                            >
                              {link.label}
                              <ChevronDown
                                className={`w-4 h-4 transition-transform ${mobilePlumbingOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            <AnimatePresence>
                              {mobilePlumbingOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  {link.subLinks!.map((sub) => (
                                    <Link
                                      key={sub.path}
                                      to={sub.path}
                                      onClick={() => setMobileOpen(false)}
                                      className={`block pl-12 pr-4 py-2 font-display text-xs uppercase tracking-wider transition-colors ${
                                        location.pathname === sub.path
                                          ? "text-primary"
                                          : "text-secondary-foreground/50 hover:text-primary"
                                      }`}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
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

                <Link
                  to="/contact"
                  className="mx-4 mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
                >
                  Contact Us
                </Link>
                <Link
                  to="/financing"
                  onClick={() => setMobileOpen(false)}
                  className="mx-4 mt-2 inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-5 py-3 font-display uppercase text-sm tracking-wider rounded-sm"
                >
                  Financing
                </Link>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src={hukillsLogo}
                alt="Hukill's"
                className="h-[67px] w-auto mb-4"
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
                Company
              </h4>
              <div className="flex flex-col gap-2">
                <Link to="/about" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  About Us
                </Link>
                <Link to="/projects" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  Projects
                </Link>
                <Link to="/careers" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  Careers
                </Link>
                <Link to="/contact" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  Contact
                </Link>
                <Link to="/privacy-policy" className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-display uppercase text-sm tracking-wider mb-4 text-primary">
                Contact — {currentLocation.label}
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 text-sm opacity-70">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{currentLocation.address}</span>
                </div>
                <a
                  href={currentLocation.phone}
                  className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                >
                  <Phone className="w-4 h-4" />
                  {currentLocation.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-muted-foreground/20 text-center text-xs opacity-50">
            © {new Date().getFullYear()} Hukill's Inc. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Sticky Call Button */}
      <a
        href={currentLocation.phone}
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
