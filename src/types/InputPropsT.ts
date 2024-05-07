import { FormField } from "../constants/Schema";

export type InputPropsT = FormField & {
    value: string | string[];   
    error: string[];
    handleInputChange:(name: string, value: string | string[], error: string[]) => void;
    hasInitialRenderPassed: boolean;
    validateData: (name: string, value: string | string[]) => string[];
}
