import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Droplets, HardHat, ShieldCheck, Waves } from "lucide-react";

const capabilities = [
  "Commercial water service installation and replacement",
  "Sewer mains, septic systems, and storm drainage",
  "Excavation, trenching, backfill, and site restoration",
  "Underground utilities for new builds and expansions",
  "Emergency pipe failures, backups, and water intrusion",
  "Fixture, grease line, and high-demand system upgrades",
];

const scalePoints = [
  { icon: HardHat, label: "Excavation", text: "When the work goes below grade, we bring the equipment, crew, and planning to open the site and solve it right." },
  { icon: Waves, label: "Sewer & Septic", text: "From backups to full line replacement, we handle the dirty work that keeps businesses open." },
  { icon: Droplets, label: "Water Lines", text: "High-volume water service, leak repairs, trenchless options, and replacements built for long service life." },
  { icon: ShieldCheck, label: "Commercial Response", text: "Fast, accountable service for property managers, contractors, facilities teams, and business owners." },
];

const CommercialPlumbing = () => (
  <Layout>
    <section className="relative min-h-[640px] flex items-center overflow-hidden section-dark">
      <img
        src="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422119-FY52WQS4PPKSN6X0HGZ5/P1670180.jpg"
        alt="Commercial plumbing crew working on a large utility project"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
      <div className="container relative z-10 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-5">
            Commercial Plumbing
          </p>
          <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
            Big Problems Need <span className="text-primary">Big Crews.</span>
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
            Hukill's takes on the commercial plumbing work that stops business cold — excavation,
            sewer and septic, water lines, underground utilities, and job-site coordination at scale.
          </p>
          <a
            href="/contact"
            className="mt-10 inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-display uppercase text-sm tracking-wider rounded-sm hover:bg-primary/90 transition-colors"
          >
            Start the Conversation <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-background">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-primary" />
            <span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
              Built for Scale
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-foreground mb-6 leading-tight">
            From One Broken Line to an Entire Site.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Commercial plumbing is not just fixing a leak. It is protecting tenants, schedules,
            inventory, equipment, customers, and revenue. Our team is built to diagnose fast, move
            dirt when needed, coordinate with other trades, and finish with systems that can take a beating.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scalePoints.map((point, index) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="border border-border bg-card p-6 hover:border-primary transition-colors"
            >
              <point.icon className="w-8 h-8 text-primary mb-5" />
              <h3 className="font-display uppercase tracking-tight text-2xl mb-3">{point.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-dark py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
      <div className="container relative z-10">
        <div className="max-w-3xl mb-12">
          <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">
            What We Handle
          </p>
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground leading-tight">
            The Kind of Work That Cannot Wait.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary-foreground/10">
          {capabilities.map((item) => (
            <div key={item} className="bg-secondary/90 p-6 min-h-32 flex items-end">
              <p className="font-display uppercase tracking-tight text-xl text-primary-foreground">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default CommercialPlumbing;