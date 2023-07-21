import { type Base } from "./base";

export interface CodeTextProperties extends Base {
    text?: string,
    maxLines?: string,
    textAlign?: string,
    style?: Style
}

interface Style extends Base {
    fontSize?: string,
    color?: string,
    fontWeight?: string,
    styling?: string,
}