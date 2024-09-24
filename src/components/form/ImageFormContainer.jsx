"use client";
import { useState } from "react";
import Image from "next/image";
import FormContainer from "@/components/form/FormContainer";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import { ButtonProp } from "@/components/form/ButtonProp";

const ImageFormContainer = ({ image, name, action, text, children }) => {
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center min-w-[340px] p-2 ">
        {image ? (
          <>
            <Image
              src={image}
              alt={name}
              width={100}
              height={100}
              className="rounded-full object-cover mb-4 w-24 h-24"
            />
          </>
        ) : (
          ""
        )}
        <Button
          variant="outline"
          btnsize="sm"
          className=""
          onClick={() => setUpdateFormVisible((prev) => !prev)}
        >
          {text}
        </Button>
        {isUpdateFormVisible && (
          <div className="flex flex-col items-center">
            <FormContainer action={action}>
              <div className="flex flex-col mt-4 items-center justify-center">
                {children}
                <ImageInput />
                <ButtonProp
                  btnsize="sm"
                  text={text}
                  variant="default"
                  className=""
                />
              </div>
            </FormContainer>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageFormContainer;
