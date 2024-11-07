import React from "react";
import SectionNavbar from "../_components/SectionNavbar";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { sectionId: string };
}) => {
  const sectionId = params.sectionId;

  return (
    <section>
      <SectionNavbar sectionId={sectionId} />
      <div>{children}</div>
    </section>
  );
};

export default Layout;
