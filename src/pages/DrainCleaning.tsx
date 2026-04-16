import Layout from "@/components/Layout";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";

const DrainCleaning = () => (
  <Layout>
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
  </Layout>
);

export default DrainCleaning;
