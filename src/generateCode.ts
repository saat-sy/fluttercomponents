import type { CodeTemplate } from "../common/code";
import { replacableCharacter } from "../common/constants";
import { CodeTextProperties } from "../components/model/text_properties";
import { text } from "../components/text";

export function generateCode(object: CodeTemplate) {
    let finalObject: CodeTextProperties = parseObjectWithProps(object);
    return convertObjectToCode(finalObject);
}

function parseObjectWithProps(object: CodeTemplate): CodeTextProperties {
    console.log(object);
    let allProps: CodeTextProperties = text;
    allProps = updateProps(allProps, object);
    return allProps;
}

function updateProps(props, object) {
    for (var key in props) {
        if (typeof(props[key]) === 'string') {
            if (object.hasOwnProperty(key)) {
                props[key] = props[key].replace(replacableCharacter, object[key]);
            }
        } else {
            props[key] = updateProps(props[key], object);
        }
    }
    return props;
}

function convertObjectToCode(object: CodeTextProperties): string {
    return "";
}