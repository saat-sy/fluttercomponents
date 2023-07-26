import type { CHILDREN_ID, CHILD_ID } from "./constants";

export interface CodeTemplate {
    [key: string]: any,
    [CHILD_ID]?: CodeTemplate,
    [CHILDREN_ID]?: Array<CodeTemplate>
}