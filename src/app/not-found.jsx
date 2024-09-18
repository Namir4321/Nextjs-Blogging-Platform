import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiBullseye } from "react-icons/gi";

const NotFound = () => {
  return (
    <section className="h-cover relative p-4 flex flex-col items-center gap-5 text-center">
      <Image
        src="https://pfkhxqpwrodtiqkjiimi.supabase.co/storage/v1/object/public/Blog-Image/blog/20602801_6324726.svg"
        alt="Not Found Image"
        width={600}
        height={600}
        className="select-none border-2 border-gray-100 w-72 aspect-square object-cover rounded"
      />
      <h1 className="text-4xl font-gelasio leading-7">Page not found</h1>
      <p className="text-gray-400 text-xl leading-7 mt-8">
        The page you are looking for does not exists. Head back to {""}
        <Link href="/" className="underline text-black">
         home
        </Link>
      </p>
      <div className="flex items-center justify-center flex-col">
        <Link href="/">
          <GiBullseye className="w-10 h-10" />
        </Link>
        <p className=" text-gray-400">
          Read millions of stories around the world
        </p>
      </div>
    </section>
  );
};

export default NotFound;
