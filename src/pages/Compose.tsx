import { Input } from "@/components/ui/input";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Compose = () => {
  const { handleSubmit, register } = useForm();
  const [body, setBody] = useState("");
  const editor = useRef(null);

  const onSubmit = (data: FieldValues) => {
    // Handle submitted data
    console.log(data);
  };

  const config = {
    height: 300,
  };

  return (
    <div className="bg-white rounded-lg w-full h-full px-4 md:px-8 py-4 md:py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full overflow-y-auto"
      >
        <div className="grid md:grid-cols-2 gap-3 md:gap-6 mb-8">
          <div>
            <Input placeholder="Enter recipent's email" />
          </div>
          <div>
            <Input placeholder="Enter subject" />
          </div>
        </div>
        <JoditEditor ref={editor} value="" config={config} />
      </form>
    </div>
  );
};

export default Compose;
