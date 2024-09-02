"use client";
// import prisma from "@/lib/db";
// import EachSection from "./eachSection";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import EachSection from "./eachSection";

const GetSection = () => {
  const searchParams = useSearchParams();
  const sectionName = searchParams.get("sn");
  const classId = searchParams.get("cd");
  const year = searchParams.get("y");

  useEffect(() => {
    const getSection = async () => {
      try {
        const sections = await fetch("/api/admin/section");
      } catch (error) {}
    };
  }, []);

  // const sections = await prisma.section.findMany({ where: {} });

  return (
    <div className="site-txt">
      <EachSection />
    </div>
  );
};

export default GetSection;
