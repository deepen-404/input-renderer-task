import { FormField } from "../constants/newSchema";

export type InputPropsT = FormField & {
    value: string | string[];   
    handleInputChange: (name: string, value: string | string[]) => void
}
