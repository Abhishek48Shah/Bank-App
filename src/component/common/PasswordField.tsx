import { useState } from "react";
import Button from "./Button";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

function PasswordField({ id, type, label, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const handleButton = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}></label>
      <div className="relative flex">
        <Input
          type={isVisible ? "text" : "password"}
          {...props}
          id={id}
          label={label}
          style="border-2 focus:border-blue-600 py-2 rounded-md w-96 border-gray-300 outline-none caret-white text-white pl-2"
        />
        <div className="absolute right-4 top-11">
          <Button
            name={isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            onClick={handleButton}
            style="text-white cursor-pointer"
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default PasswordField;
