"use client";
import { usePathname } from "next/navigation";
import FormContainer from "@/components/form/FormContainer";
import { CardSubmitButton } from "@/components/form/ButtonProp";
import { toggleFavouriteAction } from "@/utils/action";
const FavouriteToggleForm = ({ favouriteId, blogId }) => {
  const pathname = usePathname();
  const toggleAction = toggleFavouriteAction.bind(null, {
    blogId,
    favouriteId,
    pathname,
  });
  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavourite={favouriteId ? true : false} />
    </FormContainer>
  );
};

export default FavouriteToggleForm;
