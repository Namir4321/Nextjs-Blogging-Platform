import { ButtonProp } from "../form/ButtonProp"

const EditButton = () => {
  return (
    <div className="flex gap-2">
      <ButtonProp
        variant="default"
        size="md"
        type="submit"
        text="Publish"
        className="rounded-full "
      />
      <ButtonProp
        variant="ghost"
        size="md"
        type="submit"
        text="Save Draft"
        className="rounded-full"
      />
    </div>
  );
}

export default EditButton