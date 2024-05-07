/*
min lenth and max length are used for array and string
min and max are used for number
*/

export type  RulesT = {
    required?: boolean;
    disabled?: boolean;
    maxlength?: number;
    minlength?: number;
    min?: number;
    max?: number;
    pattern?: string;
}

export type OptionsT = {
  value: string;
  label: string;
};

export type FormField = {
    name: string;
    label: string;
    defaultValue?:string ;
    multipleDefaultValue?:string[]
    placeholder?:string;
    type: "text" | "number" | "email" | "radio" | "select" | "checkbox";
    rules?: RulesT
    options?: OptionsT[];
  };
  
  type FormDataT = FormField[];
  
  const Schema: FormDataT = [
    {
      name: "techStack",
      label: "Tech Stack",
      type: "checkbox",
      multipleDefaultValue: ["react", "node"],
      options: [
        { value: "react", label: "React" },
        { value: "node", label: "Node" },
        { value: "nextJs", label: "NEXTJS" },
      ],
      rules: { required: true, disabled: false, minlength: 1 },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      defaultValue: "email@test.com",
      placeholder: "Enter your email",
      rules: {
        required: true,
        disabled: false,
        pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
      },
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      defaultValue: "testFname",
      placeholder: "Enter your first name",
      rules: { required: true, disabled: false, minlength: 2, maxlength: 20 },
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      defaultValue: "testLname",
      placeholder: "Enter your last name",
      rules: { required: true, disabled: false, minlength: 2, maxlength: 20 },
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      defaultValue: "20",
      placeholder: "Enter your age",
      rules: { required: true, disabled: false, min: 18, max: 65 },
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      defaultValue: "male",
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      rules: { required: true, disabled: false },
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      defaultValue: "usa",
      options: [
        { value: "nepal", label: "Nepal" },
        { value: "india", label: "India" },
        { value: "usa", label: "USA" },
      ],
      rules: { required: true, disabled: false },
    },
  ];
  
  export default Schema;