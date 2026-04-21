import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react";
import { useLocationContext } from "@/context/LocationContext";

const DrainCleaning = () => {
  const { selected } = useLocationContext();

  return (
    <Layout>
      <Seo route="/drain-cleaning" />
      <ServiceHero
        title="Drain Cleaning"
        subtitle="From a clogged sink to a stubborn sewer line — we have the right tool for every drain."
        image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782424851-239UZ1AYR9TZR5MG8VW6/drains.jpg"
      />
      <section className="py-16 md:py-24">
        <div className="container space-y-20">
          <ServiceCard
            title="Every Drain, Every Size"
            description="Clogs are inevitable in both residential and commercial lines. When the plunger won't budge it, our professional technicians choose the right method to clear bathroom sinks, tubs, showers, toilets, kitchen sinks, laundry, storm drains, downspouts, driveway drains, catch basins, sewer lines, irrigation lines, culverts and more."
            items={[
              "Bathroom & Kitchen Sinks",
              "Tubs, Showers & Toilets",
              "Storm & Driveway Drains",
              "Catch Basins & Culverts",
              "Sewer & Irrigation Lines",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782424855-JRDLF32ZWVSB8F2BR26P/drain-cleaning1.jpg"
          />
          <ServiceCard
            title="From Hand Snakes to Hydrojetters"
            description="From small handheld machines all the way up to large truck-mounted hydrojetters, we have the equipment to clean drains of all sizes and types — including invasive tree roots and stubborn buildup that other crews can't touch."
            items={[
              "High-pressure hydrojetting",
              "Mechanical drain snaking",
              "Root removal & cutting",
              "Camera-verified results",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782424858-DOTVB1HHCIU3XJURXREP/drain-cleaning3.jpg"
            reverse
          />
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="section-dark py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/20" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-primary-foreground mb-4">
                Available 24/7 for <span className="text-primary">Emergencies</span>
              </h2>
              <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto">
                Don't wait for a small problem to become a major disaster. Our team is ready to respond day or night.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={selected.phone}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call {selected.short}
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 font-display uppercase text-sm tracking-wider hover:border-primary hover:text-primary transition-colors rounded-sm"
                >
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-primary-foreground/50">
                <MapPin className="w-4 h-4" />
                <span>Serving {selected.label}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DrainCleaning;