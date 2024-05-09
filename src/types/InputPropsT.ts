import { FormField } from "../constants/Schema";

export type InputPropsT = FormField & {
    value: string | string[];   
    error: string[];
    handleInputChange:(name: string, value: string | string[], error: string[]) => void;
    hasInitialRenderPassed: boolean;
    // handleError: (name: string, err: string[]) => void
}
