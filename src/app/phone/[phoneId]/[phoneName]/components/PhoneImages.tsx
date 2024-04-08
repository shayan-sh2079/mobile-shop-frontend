"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  alt: string;
};

const PhoneImages = (props: Props) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className={"ml-10 w-[250px] xl:w-[300px] 2xl:w-[400px]"}>
      <Image
        src={props.images[activeImg]}
        alt={props.alt}
        width={400}
        height={400}
        className={
          "h-[250px] w-[250px] rounded-md xl:h-[300px] xl:w-[300px] 2xl:h-[400px] 2xl:w-[400px]"
        }
      />
      <div className={"mt-5 flex justify-between"}>
        {props.images.map((img, idx) => (
          <Image
            src={img}
            alt={props.alt}
            key={idx}
            className={
              "h-[60px] w-[60px] cursor-pointer rounded-md border border-gray-300 p-0.5 xl:h-[70px] xl:w-[70px] xl:p-2 2xl:h-[80px] 2xl:w-[80px]"
            }
            width={80}
            height={80}
            onClick={() => setActiveImg(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhoneImages;
