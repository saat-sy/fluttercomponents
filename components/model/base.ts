import { codeBeginning, codeEnd, codeValue, componentTitle } from "../../common/constants";

export interface Base {
    [componentTitle]: string,
}

export interface Code {
    [codeBeginning]: string,
    [codeValue]?: string,
    [codeEnd]: string,
}