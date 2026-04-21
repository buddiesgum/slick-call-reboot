import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { locations, useLocationContext } from "@/context/LocationContext";

const Contact = () => {
  const { selected, setSelected } = useLocationContext();

  return (
    <Layout>
      <Seo route="/contact" />
      {/* HERO */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center overflow-hidden">
        <img
          src="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1752613454679-Q0DS5GYLU397B41SSC5X/unsplash-image-Q_N-etBvHNY.jpg"
          alt="Hukill's contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40" />
        <div className="container relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
          >
            One Call <span className="text-primary">Does It All.</span>
          </motion.h1>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {locations.map((loc, i) => {
              const isActive = selected.id === loc.id;
              return (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative border-2 p-8 md:p-10 transition-all ${
                    isActive
                      ? "border-primary bg-card shadow-2xl"
                      : "border-border bg-card/50 hover:border-primary/50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-4 right-4 text-[10px] font-display uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-sm">
                      Selected
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-foreground">
                      {loc.label}
                    </h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                    <a
                      href={loc.phone}
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="font-display text-xl tracking-tight">
                        {loc.phoneDisplay}
                      </span>
                    </a>
                    <div className="flex items-start gap-3 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                      <span>24/7 Emergency Service Available</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={loc.phone}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call {loc.short}
                    </a>
                    {!isActive && (
                      <button
                        onClick={() => setSelected(loc)}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-border px-5 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
                      >
                        Set as My Location
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="section-dark py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-primary-foreground mb-4">
              Looking to Join the <span className="text-primary">Team?</span>
            </h3>
            <p className="text-primary-foreground/70 mb-8">
              We're always looking for skilled tradespeople who share our values of integrity,
              excellence, and faith.
            </p>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
            >
              View Careers
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
