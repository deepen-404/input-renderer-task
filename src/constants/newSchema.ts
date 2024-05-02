type FormField = {
    name: string;
    label: string;
    defaultValue?:string ;
    multipleDefaultValue?:string[]
    placeholder?:string;
    type: "text" | "number" | "email" | "radio" | "select" | "checkbox";
    rules?: {
        required: boolean;
        disabled: boolean;
    }
    options?: { value: string; label: string }[];
  };
  
  type FormDataT = FormField[];
  
  const formData: FormDataT = [
    {
        name: "techStack",
        label: "Tech Stack",
        type: "checkbox",
        multipleDefaultValue: ["react", "node"],
        options: [
          {
            value: "react",
            label: "React",
          },
          {
            value: "node",
            label: "Node",
          },
          {
            value: "nextJs",
            label: "NEXTJS",
          },
        ],
      },
    {
      name: "email",
      label: "Email",
      type: "email",
      defaultValue: "email@test.com",
      placeholder:"Enter your email",
      rules:{
        required: false,
        disabled: true
      },

    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      defaultValue: "testFname",
      placeholder:"Enter your first name",
      rules:{
        required: true,
        disabled: false
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      defaultValue: "testLname",
      placeholder:"Enter your last name",
      rules:{
        required: true,
        disabled: false
      }
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      defaultValue: "20",
      placeholder:"Enter you number",
      rules:{
        required: true,
        disabled: false
      }
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      defaultValue: "male",
      options: [
        {
          value: "male",
          label: "Male",
        },
        {
          value: "female",
          label: "Female",
        },
      ],
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      defaultValue: "usa",
      options: [
        {
          value: "nepal",
          label: "Nepal",
        },
        {
          value: "india",
          label: "India",
        },
        {
          value: "usa",
          label: "USA",
        },
      ],
    },
    
  ];
  
  export default formData;