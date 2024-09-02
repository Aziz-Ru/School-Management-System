import Addsection from "@/components/section/addNewSection";

const Section = async () => {
  return (
    <section className="site-bg">
      <div className="max-w-screen-xl mx-auto">
        <Addsection />
        
      </div>
    </section>
  );
};

export default Section;

{/* <div className="max-w-screen-xl mx-auto">
          <ul>
            {section.map((section) => {
              return <li key={section.id}>{section.name}</li>;
            })}
          </ul>
        </div> */}