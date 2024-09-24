import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const FormInput = ({
  icon,
  label,
  onKeyDown,
  name,
  type,
  defaultValue,
  placeholder,
  className,
  onChange,
  iconclassName,
  disabled
}) => {
  return (
    <div className="mb-2 relative">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <div className="">
        {icon && <span className={iconclassName}>{icon}</span>}
        <Input
          className={className}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || name}
          defaultValue={defaultValue}
          required
          disabled={disabled||false}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default FormInput;
