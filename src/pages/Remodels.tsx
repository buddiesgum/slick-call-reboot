import Layout from "@/components/Layout";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";

const Remodels = () => (
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
  </Layout>
);

export default Remodels;
