import { fieldType } from "../types/fieldType"

type SchemaT = {
    fields: fieldType[]
}

export const schema :SchemaT = {
    fields: [
     {
            name: "email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
            disabled:true
     },
      {
        name: "username",
        type: "text",
        placeholder: "Enter your username",
        required: false,
        disabled: false
      },
      
      {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        required: true,
        disabled: false,
      },
      {
        name: "date",
        type: "date",
        placeholder: "Enter date",
        required: true,
        disabled: false,
      },
    ]
  }
  