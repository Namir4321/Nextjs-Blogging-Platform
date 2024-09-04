import {Input} from "@/components/ui/input"
import { Label } from "@/components/ui/label";
const FormInput = ({label, name, type, defaultValue, placeholder,className}) => {
    return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        className={className}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder||name}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};

export default FormInput;
