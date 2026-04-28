import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, MessageSquare, Phone, Play, Star } from "lucide-react";
import Layout from "@/components/Layout";
import LocationSelector from "@/components/LocationSelector";
import ServiceImageGrid from "@/components/ServiceImageGrid";
import { useLocationContext } from "@/context/LocationContext";
import { allServices } from "@/data/services";
import aboutHero from "@/assets/about-hero.jpg";

const reviews = [
  { name: "Google Review", text: "Fast, professional, and honest. They showed up when we needed help and handled everything." },
  { name: "Google Review", text: "The crew was respectful, clean, and knew exactly what they were doing from start to finish." },
  { name: "Google Review", text: "Reliable service, clear communication, and excellent work. We would absolutely call again." },
];

const AllServices = () => {
  const { selected } = useLocationContext();
  const smsHref = `sms:${selected.phone.replace("tel:", "")}`;

  return (
    <Layout>
      <section className="relative min-h-[560px] flex items-center overflow-hidden section-dark">
        <img src={aboutHero} alt="Hukill's service fleet and crew" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/40" />
        <div className="container relative z-10 py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-5">Available 24/7</p>
            <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tight text-primary-foreground leading-[0.9]">
              All Services. <span className="text-primary">One Call.</span>
            </h1>
            <p className="mt-8 text-lg md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
              Plumbing, restoration, excavation, septic, sewer, water lines, remodels, foundations, and emergencies — built for homes, businesses, and jobs that cannot wait.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={selected.phone} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm">
                <Phone className="w-5 h-5" /> Call {selected.phoneDisplay}
              </a>
              <a href={smsHref} className="inline-flex items-center gap-2 bg-primary-foreground text-secondary px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors rounded-sm">
                <MessageSquare className="w-5 h-5" /> Text Us
              </a>
              <Link to="/projects" className="inline-flex items-center gap-2 border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground hover:text-secondary transition-colors rounded-sm">
                View Past Projects <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background border-b border-border">
        <div className="container flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-display uppercase tracking-[0.2em] text-sm text-primary">Serving {selected.label}</span>
            </div>
            <p className="text-muted-foreground max-w-2xl">Select your location so phone numbers, addresses, and service calls update across the site.</p>
          </div>
          <div className="bg-secondary text-secondary-foreground px-5 py-4 rounded-sm inline-flex">
            <LocationSelector />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tight text-foreground">What We <span className="text-primary">Do</span></h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">A full-service crew for everyday repairs, high-pressure emergencies, and large-scale work that needs serious capability.</p>
          </div>
          <ServiceImageGrid services={allServices} />
        </div>
      </section>

      <section className="section-dark py-20 md:py-28">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">See the Crew</p>
            <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground leading-tight mb-6">Built to Move Fast.</h2>
            <p className="text-primary-foreground/70 leading-relaxed mb-8">Use this area for a company video, project reel, customer testimonial, or emergency service overview.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary/90 transition-colors rounded-sm">Request 24/7 Help</Link>
          </div>
          <div className="relative aspect-video border border-primary-foreground/15 bg-background/5 overflow-hidden flex items-center justify-center">
            <img src={aboutHero} alt="Video preview for Hukill's services" className="absolute inset-0 w-full h-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-secondary/60" />
            <div className="relative z-10 w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Play className="w-9 h-9 ml-1" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-primary font-display uppercase tracking-[0.3em] text-sm mb-4">Google Reviews</p>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight text-foreground">Trusted When It Matters.</h2>
            </div>
            <div className="flex gap-1 text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.text} className="border border-border bg-card p-7">
                <div className="flex gap-1 text-primary mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-muted-foreground leading-relaxed mb-6">“{review.text}”</p>
                <p className="font-display uppercase tracking-wider text-sm text-foreground">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-primary">
        <div className="container text-center">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tight text-primary-foreground mb-5">Need Help Right Now?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">We are available 24/7 for urgent plumbing, restoration, sewer, septic, excavation, and water damage issues in {selected.label}.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={selected.phone} className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-secondary/90 transition-colors rounded-sm"><Phone className="w-5 h-5" /> Call Now</a>
            <a href={smsHref} className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 font-display uppercase text-sm tracking-wider hover:bg-primary-foreground/10 transition-colors rounded-sm"><MessageSquare className="w-5 h-5" /> Text Us</a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AllServices;