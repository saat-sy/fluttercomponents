import type { Base, Code } from "./base";

export interface CodeContainerProperties extends Base {
    decoration?: Decoration
}

interface Decoration extends Base {
    color?: Code,
    borderRadius?: Code,
    border?: Border
}

interface Border extends Base {
    borderWidth?: Code,
    borderColor?: Code,
}