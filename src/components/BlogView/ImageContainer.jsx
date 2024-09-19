import Image from "next/image";

const ImageContainer = ({ mainimage, name, className }) => {
  return (
    <section className={`${className} relative w-full h-[400px]`}>
      <Image src={mainimage} fill alt={name} className="object-cover" />
    </section>
  );
};

export default ImageContainer;
