import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Clock, MapPin } from "lucide-react";
import { useLocationContext } from "@/context/LocationContext";

const NewBuildPlumbing = () => {
  const { selected } = useLocationContext();

  return (
    <Layout>
      <Seo route="/new-build-plumbing" />
      <ServiceHero
        title="New Build Plumbing"
        subtitle="Licensed, experienced, and built into your project from day one — seamless plumbing for new construction."
        image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782431360-3F7L70UFZPZ50H7RW04P/Untitled+design+%288%29.png"
      />
      <section className="py-16 md:py-24">
        <div className="container space-y-20">
          <ServiceCard
            title="Quality Materials & Workmanship"
            description="Our team of licensed and experienced plumbers brings extensive knowledge to every project. We work closely with builders, contractors, and homeowners to ensure seamless integration of plumbing systems into your new construction — using only high-quality materials and the latest industry techniques to deliver durability and reliability that lasts for years."
            items={[
              "Licensed, experienced crew",
              "Builder & contractor partnerships",
              "Premium materials only",
              "Latest industry techniques",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782431360-3F7L70UFZPZ50H7RW04P/Untitled+design+%288%29.png"
          />
          <ServiceCard
            title="Customized Solutions"
            description="Every new build is unique, and so are the plumbing requirements. Whether you're constructing a single-family home, a multi-unit complex, or a commercial building, we provide customized plumbing solutions that meet your specific needs — from initial design through final inspection."
            items={[
              "Plumbing system design",
              "Piping & fixture installation",
              "Water supply & drainage systems",
              "Gas line installation",
              "Final inspection & testing",
            ]}
            image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782431360-3F7L70UFZPZ50H7RW04P/Untitled+design+%288%29.png"
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

export default NewBuildPlumbing;
