import type { Base, Code } from "./base";

export interface CodeContainerProperties extends Base {
    child?: Code,
    width?: Code,
    height?: Code,
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