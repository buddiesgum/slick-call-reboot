import Layout from "@/components/Layout";
import ServiceHero from "@/components/ServiceHero";
import ServiceCard from "@/components/ServiceCard";

const NewBuildPlumbing = () => (
  <Layout>
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
  </Layout>
);

export default NewBuildPlumbing;
