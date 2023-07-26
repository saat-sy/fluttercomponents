import type { TreeComponent, TreeModel } from "../model/tree";
import type { CustomPropertiesType } from "../properties/properties";
import type { CodeTemplate } from "../../common/code";
import { CHILDREN_ID, CHILD_ID, COMPONENT_ID } from "../../common/constants";

export function convertBuilderTreeToCode(builderTree: TreeComponent): CodeTemplate {
    if (Object.keys(builderTree).length > 0) {
        let parent = builderTree[Object.keys(builderTree)[0]];
        let code: CodeTemplate = {
            [COMPONENT_ID]: parent.component.id
        };
        if (parent.children) {
            if (parent.component.property.children > 1) {
                code[CHILDREN_ID] = [];
                parent.children.forEach( (child) => {
                    code[CHILDREN_ID].push(
                        convertComponentToCodeTemplate(
                            builderTree[child.id]
                        )
                    );
                });
            } else {
                code[CHILD_ID] = convertComponentToCodeTemplate(
                    builderTree[parent.children[0].id]
                );
            }
        }
        console.log(code);
        return code;
    }
}

function convertComponentToCodeTemplate(treeModel: TreeModel): CodeTemplate {
    let componentId = treeModel.component.id;
    let customProps: CustomPropertiesType = 
        treeModel.component.property.customProperties;

    let code: CodeTemplate = {
        [COMPONENT_ID]: componentId
    };

    for (var propKey in customProps) {
        let prop: CustomPropertiesType = customProps[propKey];
        if (prop.hasOwnProperty("value")) {
            if ((prop["required"]) || (prop["value"] !== prop["default"])) {
                code[propKey] = prop["value"];
            }
        }
        if (prop.hasOwnProperty("values")) {
            if ((prop["required"]) || (prop["active"] !== prop["default"])) {
                code[propKey] = prop["values"][prop["active"]];
            }
        }
    }
    return code;
}