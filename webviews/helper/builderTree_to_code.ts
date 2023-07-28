import type { TreeComponent, TreeModel } from "../model/tree";
import type { CustomPropertiesType } from "../properties/properties";
import type { CodeTemplate } from "../../common/code";
import { CHILDREN_ID, CHILD_ID, COMPONENT_ID } from "../../common/constants";

export function convertBuilderTreeToCode(builderTree: TreeComponent, parent: TreeModel): CodeTemplate {
    console.log("sahnlihsd");
    if (Object.keys(builderTree).length > 0) {
        let code: CodeTemplate = {
            [COMPONENT_ID]: parent.component.id
        };
        if (parent.children.length > 0) {
            if (parent.property.children > 1) {
                code[CHILDREN_ID] = [];
                parent.children.forEach( (child) => {
                    code[CHILDREN_ID].push(
                        convertBuilderTreeToCode(
                            builderTree,
                            builderTree[child.id]
                        )
                    );
                });
            } else {
                code[CHILD_ID] = convertBuilderTreeToCode(
                    builderTree,
                    builderTree[parent.children[0].id]
                );
            }
        } 
        code = convertComponentToCodeTemplate(parent, code);
        return code;
    }
}

function convertComponentToCodeTemplate(treeModel: TreeModel, codeTemplate?: CodeTemplate): CodeTemplate {
    let componentId = treeModel.component.id;
    let customProps: CustomPropertiesType = 
        treeModel.property.customProperties;


    let code: CodeTemplate = codeTemplate !== undefined ? 
        codeTemplate : {
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