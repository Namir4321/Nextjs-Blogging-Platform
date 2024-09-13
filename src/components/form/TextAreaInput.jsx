import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
const TextAreaInput = ({
  name,
  labelText,
  defaultValue,
  className,
  placeholder,
  onChange,
  disabled,
  row,value
}) => {
  return (
    <div className=" mt-5">
      <Label htmlFor={name} className="capitalize">
        {labelText || name}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder || name}
        defaultValue={defaultValue}
        value={value}
        rows={row}
        className={` leading-loose ${className} `}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TextAreaInput;
