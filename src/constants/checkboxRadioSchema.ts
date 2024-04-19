export type option = {
    id : string;
    name : string;
}

type checkBoxRadioSchemaT = {
    id: string;
    title: string;
    options: option[],
    multipleSelection: {
        status : boolean;
        // if status is true then for multiple selection either use checkbox 
        elementToUse: "Checkbox" | "Select" | "RadioButton"
    };
    required: boolean;
    disabled: boolean;

}

export const inputData: checkBoxRadioSchemaT[] = [
    {
      id: "Role",
      title: "Select a role",
      options: [
        { id: "1", name: "Intern" },
        { id: "2", name: "Junior" },
        { id: "3", name: "Senior" },
        { id: "4", name: "Prinicipal" },
      ],
      multipleSelection: {
        status: false,
        elementToUse: "RadioButton",
      },
      required:true,
      disabled: false,
    },
    {
      id:"Fruits",
      title: "Choose some fruits",
      options: [
          { id: "b", name: "Dragon Fruit" },
          { id: "c", name: "Cherry" },
          { id: "a", name: "Apple" },
        { id: "d", name: "Mango" },
      ],
      multipleSelection: {
        status: true,
        elementToUse: "Checkbox",
      },
      required:true,
      disabled: false,
    },
    {
      id:"Groceries",
      title: "Choose some groceries",
      options: [
          { id: "b", name: "Paneer" },
          { id: "c", name: "Spinach" },
          { id: "a", name: "Eggs" },
        { id: "d", name: "Tomato" },
      ],
      multipleSelection: {
        status: true,
        elementToUse: "Checkbox",
      },
      required:true,
      disabled: false,
    },
    {
      id:"District",
      title: "Select your district",
      options: [
          { id: "KTM", name: "Kathmandu" },
          { id: "BKT", name: "Bhaktapur" },
          { id: "LLT", name: "Lalitpur" },
        { id: "JHP", name: "Jhapa" },
      ],
      multipleSelection: {
        status: false,
        elementToUse: "Select",
      },
      required:true,
      disabled: false,
    },
  ];