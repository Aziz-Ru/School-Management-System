import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-screen-xl mx-auto min-h-[50vh]">{children}</div>;
};

export default layout;
