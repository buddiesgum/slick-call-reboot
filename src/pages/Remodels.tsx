import Layout from "@/components/Layout";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react";
import { useLocationContext } from "@/context/LocationContext";

const Remodels = () => {
  const { selected } = useLocationContext();

  return (
    <Layout>
      <ServiceHero
        title="Remodels"
        subtitle="We make the remodeling process easy and seamless with attention to detail."
        image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782425808-3XP2I6BBVXWPG5NSJBUR/remodel-kitchen.jpg"
      />
      <section className="py-16 md:py-24">
        <div className="container space-y-20">
          <ServiceCard
            title="Kitchen & Bath Remodel"
            description="Our team is prepared to complete your kitchen or bathroom remodeling and construction needs. Whether it's a minor refresh or a complete remodel, Hukill's can transform your space into a luxurious retreat."
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782425808-3XP2I6BBVXWPG5NSJBUR/remodel-kitchen.jpg"
          />
          <ServiceCard
            title="Interior & Exterior Painting"
            description="Hukill's Restoration has a team of skilled painters ready to tackle any paint project."
            items={[
              "Walls & Ceilings",
              "Trim Work & Doors",
              "Cabinetry",
              "Full Exterior Repaint",
              "Deck Finishing",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782425826-DJZM9QRD6V32OI2WN1VG/remodel-painting.jpg"
            reverse
          />
          <ServiceCard
            title="Cabinet Design & Install"
            description="Our team can assist with all cabinet design and installation. Our aim is to leave you with a comfortable and functional space."
            items={[
              "Custom Layout",
              "Space Saving Solutions",
              "Full Height & Pantry Cabinets",
              "Cabinet Refacing",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782425834-AFU6O2YUBTZ5152L3PD2/remodel-cabinets.jpg"
          />
          <ServiceCard
            title="Flooring Installation"
            description="Hukill's is experienced in an array of flooring varieties including hardwood, laminate, tile, and carpet. From installation to removal, we handle it all."
            items={[
              "Hardwood & Laminate",
              "Tile Installation",
              "Carpet Installation",
              "Flooring Removal & Haul-Away",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782425841-G5RZPQDYQNLJ5Z9Q840Z/remodel-flooring.jpg"
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

export default Remodels;