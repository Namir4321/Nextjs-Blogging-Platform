import { fetchFavouriteId, getAuthUser } from "@/utils/action";
import { CardSigninButton } from "@/components/form/ButtonProp";
import FavouriteToggleForm from "@/components/Card/FavouriteToggleForm";
const FavouriteToggleButton = async ({ blogId }) => {
  const user = await getAuthUser();
  if (!user) return <CardSigninButton />;
  const favouriteId = await fetchFavouriteId({ blogId });
  return <FavouriteToggleForm favouriteId={favouriteId} blogId={blogId} />;
};

export default FavouriteToggleButton;
