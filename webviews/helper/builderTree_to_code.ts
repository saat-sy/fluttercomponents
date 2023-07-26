import type { TreeComponent, TreeModel } from "../model/tree";
import type { CustomPropertiesType } from "../properties/properties";
import type { CodeTemplate } from "../../common/code";
import { COMPONENT_ID } from "../../common/constants";

export function convertBuilderTreeToCode(builderTree: TreeComponent): CodeTemplate {
    if (builderTree) {
        for (var key in builderTree) {
            let data: TreeModel = builderTree[key];
            let componentId = data.component.id;
            let customProps: CustomPropertiesType = 
                data.component.property.customProperties;

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
            console.log(code);
            return code;
        }
    }
}