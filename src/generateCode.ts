import type { CodeTemplate } from "../common/code";
import { codeBeginning, codeEnd, codeValue, componentTitle, replacableCharacter } from "../common/constants";
import { CodeTextProperties } from "../components/model/text_properties";
import { codeText } from "../components/text";

export function generateCode(object: CodeTemplate) {
    let finalObject: CodeTextProperties = parseObjectWithProps(object);
    return convertObjectToCode(finalObject, 0);
}

function parseObjectWithProps(object: CodeTemplate): CodeTextProperties {
    let allProps = codeText;
    allProps = updateProps(allProps, object);
    return allProps;
}

function updateProps(props: CodeTextProperties, object) {
    for (var key in props) {
        if (key === componentTitle) {
            continue;
        }
        if (typeOfCode(props[key])) {
            if (object.hasOwnProperty(key)) {
                props[key].value = object[key];
            }
        } else {
            props[key] = updateProps(props[key], object);
        }
    }
    return props;
}

function convertObjectToCode(object, padding: number): string {
    let code = `${object[componentTitle]}(\n`;
    let active = false;
    for (var key in object) {
        if (key === componentTitle) {
            continue;
        }
        if (typeOfCode(object[key])) {
            if (object[key].value !== undefined) {
                if (key.toLowerCase().includes('color')) {
                    object[key][codeValue] = object[key][codeValue].replace("#", "");
                } 
                code += '\t' +
                    object[key][codeBeginning] +
                    object[key][codeValue] +
                    object[key][codeEnd] +
                    '\n';
                active = true;
            }
        } else {
            code += convertObjectToCode(object[key], 1);
            active = true;
        }
    }
    if (active) {
        code += `),\n`;
        let tabs = '';
        while (padding > 0) {
            tabs += '\t';
            padding--;
        }
        code.replace('\n', `\n${tabs}`);
        return code;
    } 
    return '';
}

export function addPaddingToLines(code: string, padding: string, firstLine: boolean): string {
    let lines = code.split('\n');
    let newCode = '';
    for (var i = 0 ; i < lines.length; i++) {
        if (i === 0 && !firstLine) {
            lines[i] = lines[i];
        } else {
            lines[i] = padding + lines[i];
        }
        newCode += lines[i] + '\n';
    }
    return newCode;
}

function typeOfCode(object: any): boolean {
    if (
        (Object.keys(object).includes(codeBeginning) &&
        Object.keys(object).includes(codeEnd)) ||
        Object.keys(object).includes(codeValue)
    ) {
        return true;
    } 
    return false;
}