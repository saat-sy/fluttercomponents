import { componentTitle } from "../common/constants";
import { CodeColumnProperties } from "./model/column_properties";

export const codeColumn: CodeColumnProperties = {
    [componentTitle]: "Column",
    children: {
        beginning: "children: [\n",
        end: "],"
    },
    mainAxisSize: {
        beginning: "mainAxisSize: MainAxisSize.",
        end: ","
    },
    crossAxisAlignment: {
        beginning: "crossAxisAlignment: CrossAxisAlignment.",
        end: ","
    },
    mainAxisAlignment: {
        beginning: "mainAxisAlignment: MainAxisAlignment.",
        end: ","
    },
};