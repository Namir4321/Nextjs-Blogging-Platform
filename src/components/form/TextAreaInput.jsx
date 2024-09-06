import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
  className,
  placeholder,
}) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder || name}
        defaultValue={defaultValue}
        rows={3}
        className={`leading-loose ${className}`}
      />
    </div>
  );
};

export default TextAreaInput;
