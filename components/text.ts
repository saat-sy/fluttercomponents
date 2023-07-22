import { componentTitle } from "../common/constants";
import { CodeTextProperties } from "./model/text_properties";

export const codeText: CodeTextProperties = {
    text: {
        beginning: "\"",
        end: "\","
    },
    maxLines: {
        beginning: "maxLines: ",
        end: ","
    },
    textAlign: {
        beginning: "textAlign: TextAlign.",
        end: ","
    },
    style: {
        fontSize: {
            beginning: "fontSize: ",
            end: ","
        },
        color: {
            beginning: "color: Color(0xFF",
            end: "),"
        },
        fontWeight: {
            beginning: "fontWeight: FontWeight.w",
            end: ","
        },
        styling: {
            beginning: "fontStyle: FontStyle.",
            end: ","
        },
        [componentTitle]: "style: TextStyle"
    },
    [componentTitle]: "Text"
};