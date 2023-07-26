import type { CodeTemplate } from "../common/code";
import { 
    COLUMN_ID, 
    COMPONENT_ID, 
    CONTAINER_ID, 
    ROW_ID, 
    TEXT_ID, 
    codeBeginning, 
    codeEnd, 
    codeValue, 
    componentTitle
} from "../common/constants";
import { CodeProperties } from "../components/model/properties";
import { codeText } from "../components/text";
import { codeContainer } from "../components/container";
import { codeColumn } from "../components/column";
import { codeRow } from "../components/row";

export function generateCode(object: CodeTemplate) {
    let finalObject: CodeProperties = parseObjectWithProps(object);
    return convertObjectToCode(finalObject, 0, true);
}

function parseObjectWithProps(object: CodeTemplate): CodeProperties {
    let allProps: CodeProperties = getAllProps(object[COMPONENT_ID]);
    if (allProps === undefined) {
        return;
    }
    allProps = updateProps(allProps, object);
    return allProps;
}

function updateProps(props: CodeProperties, object) {
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

function convertObjectToCode(object, padding: number, main: boolean): string {
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
            let innerCode = convertObjectToCode(object[key], padding + 1, false);
            if (innerCode !== "") {
                code += innerCode;
                active = true;
            }
        }
    }
    if (main && !active) {
        code = `${object[componentTitle]}(),\n`;
        return code;
    }
    else if (active) {
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

function getAllProps(id: number): CodeProperties {
    switch(id) {
        case TEXT_ID: 
            return codeText;
        case CONTAINER_ID:
            return codeContainer;
        case COLUMN_ID:
            return codeColumn;
        case ROW_ID:
            return codeRow;
        default:
            return undefined;
    }
}