import { FormField } from "../constants/Schema";

export type InputPropsT = FormField & {
    value: string | string[];   
    error: string[];
    handleInputChange: (name: string, value: string | string[]) => void
}
