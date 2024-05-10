import { FormField } from "../constants/Schema";

export type InputPropsT = FormField & {
    value: string | string[];   
    handleInputChange:(name: string, value: string | string[]) => void;
    hasInitialRenderPassed: boolean;
}
