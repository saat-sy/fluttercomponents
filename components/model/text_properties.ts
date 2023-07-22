import type { Base, Code } from "./base";

export interface CodeTextProperties extends Base {
    text?: Code,
    maxLines?: Code,
    textAlign?: Code,
    style?: Style
}

interface Style extends Base {
    fontSize?: Code,
    color?: Code,
    fontWeight?: Code,
    styling?: Code,
}