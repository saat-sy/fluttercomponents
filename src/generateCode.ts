import type { CodeTemplate } from "../common/code";
import { 
    CHILDREN_ID,
    CHILD_ID,
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
import { cloneDeep } from 'lodash';

export function generateCode(object: CodeTemplate) {
    console.log(object);
    let finalObject: CodeProperties = parseObjectWithProps(object); 
    return convertObjectToCode(finalObject, 0, true);
}

function parseObjectWithProps(object: CodeTemplate): CodeProperties {
    let allProps: CodeProperties = getAllProps(object[COMPONENT_ID].toString());
    if (allProps === undefined) {
        return;
    }
    allProps = updateProps(allProps, object);
    return allProps;
}

function updateProps(props: CodeProperties, object: CodeTemplate) {
    for (var key in props) {
        if (key === componentTitle) {
            continue;
        }
        if (key === CHILD_ID) {
            let child: CodeTemplate = object[key]!;
            if (child) {
                props[key].value = "";
                props[key].value += generateCode(child) + '\n';
            }
        } else if (key === CHILDREN_ID) {
            let children: Array<CodeTemplate> = object[key]!;
            if (children) {
                props[key].value = "";
                children.forEach((child: CodeTemplate) => {
                    props[key].value += generateCode(child) + 
                        '\n';
                });
            }
        } else if (typeOfCode(props[key])) {
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

function getAllProps(id: string): CodeProperties {
    if (id.startsWith(TEXT_ID.toString())) {
            return cloneDeep(codeText);
    } else if (id.startsWith(COLUMN_ID.toString())) {
        return cloneDeep(codeColumn);
    } else if (id.startsWith(CONTAINER_ID.toString())) {
        return cloneDeep(codeContainer);
    } else if (id.startsWith(ROW_ID.toString())) {
        return cloneDeep(codeRow);
    } else {
        return undefined;
    }
}