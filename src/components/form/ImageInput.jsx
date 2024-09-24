import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ImageInput = ({className,children}) => {
  const name = "image";
  return (
    <div className="mb-2 flex flex-col items-center justify-center">
      {/* <Label htmlFor={name} className="capitalize mb-2">
      {children||name}
      </Label> */}
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className={`max-w-xs ${className} `}
      />
    </div>
  );
};

export default ImageInput;
