import { useState } from "react";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { motion } from "framer-motion";
import { Briefcase, Hammer, HardHat, Wrench, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import careersHero from "@/assets/about-hero.jpg";

const trades = [
  { icon: Wrench, label: "Plumbing" },
  { icon: HardHat, label: "Restoration" },
  { icon: Hammer, label: "Excavation" },
  { icon: Briefcase, label: "Construction" },
];

const Careers = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Application received",
        description: "Thanks for applying — our team will be in touch shortly.",
      });
      (e.target as HTMLFormElement).reset();
      setFileName("");
    }, 800);
  };

  return (
    <Layout>
      <Seo route="/careers" />
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[380px] flex items-center overflow-hidden">
        <img
          src={careersHero}
          alt="The Hukill's crew on a job site"
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
            Now Hiring
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display uppercase tracking-tight text-primary-foreground max-w-3xl leading-[0.95]"
          >
            Build a <span className="text-primary">Career</span> with Purpose
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl"
          >
            Looking to join a team of dedicated professionals? Whether your background is in
            plumbing, restoration, excavation, or construction — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* TRADES */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trades.map((trade, i) => (
              <motion.div
                key={trade.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col items-center text-center p-6 border border-border hover:border-primary transition-colors"
              >
                <trade.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-display uppercase tracking-wider text-sm text-foreground">
                  {trade.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section className="section-dark py-20 md:py-28">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <span className="font-display uppercase tracking-[0.25em] text-sm text-primary">
              Application
            </span>
            <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tight text-primary-foreground mt-2">
              Send Us Your Resume
            </h2>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-background/5 backdrop-blur-sm border border-primary-foreground/10 p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-primary-foreground/80 uppercase text-xs tracking-wider">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  required
                  className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-primary-foreground/80 uppercase text-xs tracking-wider">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  required
                  className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground/80 uppercase text-xs tracking-wider">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-primary-foreground/80 uppercase text-xs tracking-wider">
                Message *
              </Label>
              <Textarea
                id="message"
                rows={5}
                required
                placeholder="Tell us about your experience..."
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-primary-foreground/80 uppercase text-xs tracking-wider">
                Resume
              </Label>
              <label className="flex items-center justify-center gap-3 px-4 py-6 border-2 border-dashed border-primary-foreground/20 hover:border-primary cursor-pointer transition-colors">
                {fileName ? (
                  <>
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary-foreground/90">{fileName}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-primary-foreground/60" />
                    <span className="text-sm text-primary-foreground/60">
                      Click to upload (PDF, DOC, DOCX)
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="updates" className="mt-0.5 border-primary-foreground/40" />
              <Label htmlFor="updates" className="text-sm text-primary-foreground/70 cursor-pointer leading-relaxed">
                Sign me up for news and updates from Hukill's
              </Label>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display uppercase tracking-wider py-6"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
