"use server";

import getSession from "@/lib/get_session";
import { notFound } from "next/navigation";

const ResultPage = async () => {
  const { user } = await getSession();

  if (
    user.role !== "TEACHER" ||
    user.role !== "ADMIN" ||
    user.role !== "STUDENT"
  ) {
    notFound();
  }
  return <ResultPage />;
};

export default ResultPage;
