import type { Base, Code } from "./base";

export interface CodeRowProperties extends Base {
    mainAxisSize?: Code,
    crossAxisAlignment?: Code,
    mainAxisAlignment?: Code,
    children?: Code
}