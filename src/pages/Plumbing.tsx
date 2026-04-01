import Layout from "@/components/Layout";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";

const Plumbing = () => (
  <Layout>
    <ServiceHero
      title="Plumbing"
      subtitle="No matter how big or how small — our experienced team handles all your plumbing needs."
      image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422119-FY52WQS4PPKSN6X0HGZ5/P1670180.jpg"
    />
    <section className="py-16 md:py-24">
      <div className="container space-y-20">
        <ServiceCard
          title="Full-Service Plumbing"
          description="Hukill's is here for all your plumbing needs. We repair and replace everything from toilets, leaking faucets, shower valves, water heaters, pressure-reducing valves, backflow devices, garbage disposals, water lines, sewer lines, and more."
          items={[
            "Toilets & Faucets",
            "Water Heaters",
            "Pressure-Reducing Valves",
            "Backflow Devices",
            "Water & Sewer Lines",
            "Garbage Disposals",
          ]}
          image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422119-FY52WQS4PPKSN6X0HGZ5/P1670180.jpg"
        />
        <ServiceCard
          title="Trenchless Replacement"
          description="With our new trenchless water and sewer line replacement technology, a steel bursting head breaks through the existing pipe, pulling new HDPE pipe behind it with a service life of over 100 years."
          items={[
            "Cleaner — Minimum site disturbance",
            "Easier — Compact, powerful equipment saves time",
            "Safer — Very little digging, no open trenches",
          ]}
          image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/1729782422119-FY52WQS4PPKSN6X0HGZ5/P1670180.jpg"
          reverse
        />
      </div>
    </section>
  </Layout>
);

export default Plumbing;
