import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LocationSelector from "./LocationSelector";

const PHONE_NUMBER = "tel:+15555555555";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Plumbing", path: "/plumbing" },
  { label: "Excavation", path: "/excavation" },
  { label: "Restoration", path: "/restoration" },
  { label: "Remodels", path: "/remodels" },
  { label: "Foundations", path: "/foundations" },
  { label: "Projects", path: "/projects" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-secondary">
        <div className="container flex items-center justify-between h-16 md:h-20">
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
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 font-display text-sm uppercase tracking-wider transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-secondary-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={PHONE_NUMBER}
              className="ml-4 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
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
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 font-display text-sm uppercase tracking-wider transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-secondary-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
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
                {navLinks.slice(1).map((link) => (
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
