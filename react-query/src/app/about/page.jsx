import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      about
      <Link href="blog/123"> go to about</Link>
    </div>
  );
};

export default page;
