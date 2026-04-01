import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  items?: string[];
  image: string;
  reverse?: boolean;
}

const ServiceCard = ({ title, description, items, image, reverse }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
      reverse ? "lg:direction-rtl" : ""
    }`}
  >
    <div className={`${reverse ? "lg:order-2" : ""}`}>
      <div className="aspect-[4/3] rounded-lg overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
    <div className={`${reverse ? "lg:order-1" : ""}`}>
      <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-primary mb-4">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
      {items && items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </motion.div>
);

export default ServiceCard;
