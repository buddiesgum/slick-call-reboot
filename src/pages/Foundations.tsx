import Layout from "@/components/Layout";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";

const Foundations = () => (
  <Layout>
    <ServiceHero
      title="Foundations"
      subtitle="Foundation issues can affect the safety, appearance and value of your home."
      image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/d9fa939c-c14f-4244-8f3d-8815ffcdffef/foundations-page.jpg"
    />
    <section className="py-16 md:py-24">
      <div className="container space-y-20">
        <ServiceCard
          title="Foundation Repair"
          description="If your foundation has been affected by water damage, age, poor construction or other factors, Hukill's Foundation Systems can help. We have trained professionals and use top grade products to make these repairs."
          items={[
            "Push Piers",
            "Helical Pre-Construction Piers",
            "Wall Stabilizing",
          ]}
          image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/d9fa939c-c14f-4244-8f3d-8815ffcdffef/foundations-page.jpg"
        />
        <ServiceCard
          title="Crawl Space"
          description="Crawl spaces can have unknown issues affecting the inside of your house. Hukills Foundation Systems can make necessary repairs including water damage, structural issues, and moisture problems."
          items={[
            "Sump Pumps",
            "Encapsulations",
            "Vapor Barrier",
            "Drainage Systems",
            "Earthquake Retrofitting",
          ]}
          image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/4f9e4459-31d8-406f-afb7-639b41324a7c/crawl-space-page-1.jpg"
          reverse
        />
        <ServiceCard
          title="Basement Repair"
          description="Ground level leaks, musty smells or damp walls are indicators that your basement may need waterproofing. Hukills Foundation Systems provides products and services to solve your basement problems."
          items={[
            "Waterproofing",
            "Wall Stabilization",
            "Interior Perimeter Drainage",
            "Sump Pumps",
            "Floor Crack Repairs",
            "Window Well Drains",
          ]}
          image="https://images.squarespace-cdn.com/content/v1/671a62937af7e4192d2e3eec/81f27b07-f3e2-44a1-9a18-ca1bc5baa1a3/basement-page.jpg"
        />
      </div>
    </section>
  </Layout>
);

export default Foundations;
