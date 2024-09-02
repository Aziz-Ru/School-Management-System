import Addsection from "@/components/section/addSection";
import GetSection from "@/components/section/getSection";

const Section = () => {
  return (
    <section className="site-bg max-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <Addsection />
        <GetSection />
      </div>
    </section>
  );
};

export default Section;
