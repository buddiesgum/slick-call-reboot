import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, Clock, Wallet } from "lucide-react";
import Layout from "@/components/Layout";

const PHONE_NUMBER = "tel:+15555555555";

const Financing = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const SRC = "https://www.enhancify.com/paymentcalculatorwidget/";
    // Load script if not already present
    let script = document.querySelector(
      `script[src="${SRC}"]`,
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.src = SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    return () => {
      // Clear widget contents on unmount so it re-renders on revisit
      if (widgetRef.current) widgetRef.current.innerHTML = "";
    };
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/536b13a7-fe1e-4895-8c56-787d7e5594c7/Hukills-Group_2.png)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
        <div className="container relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-primary font-display uppercase tracking-wider text-sm mb-4">
              Project Financing
            </span>
            <h1 className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
              Flexible <span className="text-primary">Financing</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-lg">
              Don't let budget hold your project back. Estimate your monthly payment in seconds and get the work started today.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={PHONE_NUMBER}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
              >
                <Phone className="w-5 h-5" />
                Talk To Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"
              >
                Start A Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Wallet,
                title: "Affordable Payments",
                copy: "Pick a plan that fits your monthly budget instead of paying everything upfront.",
              },
              {
                icon: Clock,
                title: "Quick Decisions",
                copy: "Pre-qualify in minutes with no impact to your credit score.",
              },
              {
                icon: ShieldCheck,
                title: "Trusted Partners",
                copy: "Backed by Enhancify's network of reputable home improvement lenders.",
              },
            ].map((b) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="border border-border bg-card p-8 rounded-sm"
              >
                <b.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-display uppercase text-lg tracking-wider text-foreground mb-2">
                  {b.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Widget */}
      <section className="py-16 md:py-24 section-dark">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight">
              Estimate Your <span className="text-primary">Payment</span>
            </h2>
            <p className="mt-4 text-primary-foreground/70">
              Use the calculator below to see what your monthly payment could look like.
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-background rounded-sm p-4 md:p-6 shadow-xl">
            <div
              ref={widgetRef}
              id="paymentcalculatorwidget"
              data-defaultScheme="false"
              data-color1="#68BA62"
              data-color2="#1C418C"
              data-coBrandedColor="#FFFFFF"
              data-border="true"
              data-page="9933370"
              data-hideLink="0"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4">
            Ready To Move Forward?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Reach out and let's scope your project — we'll help you pick the right financing path.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-10 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Financing;