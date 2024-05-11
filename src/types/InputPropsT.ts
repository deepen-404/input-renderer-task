import { FormField } from "../constants/Schema";

export type InputPropsT = FormField & {
  hasInitialRenderPassed: boolean;
  value: string | string[];
  handleInputChange: (name: string, value: string | string[]) => void;
  handleErrors: (name: string, errors: string[]) => void;
  errors: string[];
};
