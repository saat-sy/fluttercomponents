import { componentTitle } from "../common/constants";
import { CodeTextProperties } from "./model/text_properties";

export const text: CodeTextProperties = {
    text: "\"\\\"",
    maxLines: "maxLines: \\,",
    textAlign: "textAlign: \\,",
    style: {
        fontSize: "fontSize: \\,",
        color: "color: \\,",
        fontWeight: "fontWeight: \\,",
        styling: "\\",
        [componentTitle]: "style: TextStyle"
    },
    [componentTitle]: "Text"
};