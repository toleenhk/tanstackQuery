import Link from "next/link";
import React from "react";

const page = ({ params }) => {
  return <Link href="/about">ID: {params.id}</Link>;
};

export default page;
