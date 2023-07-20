import type { TreeComponent, TreeModel } from "../model/tree";
import type { CustomPropertiesType } from "../properties/properties";
import type { CodeTemplate } from "../../common/code";

export function convertBuilderTreeToCode(builderTree: TreeComponent) {
    if (builderTree) {
        console.log(builderTree);
        for (var key in builderTree) {
            let data: TreeModel = builderTree[key];
            let customProps: CustomPropertiesType = 
                data.component.property.customProperties;
            let code: CodeTemplate = {};
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