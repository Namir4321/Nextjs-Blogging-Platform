"use client";
import { useState } from "react";
import Image from "next/image";
import FormContainer from "@/components/form/FormContainer";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import {ButtonProp} from "@/components/form/ButtonProp"

const ImageFormContainer = ({ image, name, action, text, children }) => {
 const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
 return (
   <>
     <div>
       {image ? (
         <>
           <Image
             src={image}
             alt={name}
             width={100}
             height={100}
             className="rounded-lg object-cover mb-4 w-24 h-24"
           />
         </>
       ) : (
        ""
       )}
       <Button
         variant="outline"
         btnsize="sm"
         onClick={() => setUpdateFormVisible((prev) => !prev)}
       >
         {text}
       </Button>
       {isUpdateFormVisible && (
         <div className="max-w-lg mt-4">
           <FormContainer action={action}>
             {children}
             <ImageInput />
             <ButtonProp btnsize="sm" text={text} />
           </FormContainer>
         </div>
       )}
     </div>
   </>
 );
};

export default ImageFormContainer;
