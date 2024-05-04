import { FormField } from "../constants/newSchema";

export type InputPropsT = FormField & {
    formInputs: Record<string, string | string[]>;
    handleInputChange: (name: string, value: string | string[]) => void
}