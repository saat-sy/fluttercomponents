import { cloneDeep } from "lodash";
import { COLUMN_ID, CONTAINER_ID, ROW_ID, TEXT_ID } from "../../common/constants";
import type { TreeComponent } from "../model/tree";
import properties from "../properties/properties";

export function builderTreeContainsShadowItem(builderTree: TreeComponent): boolean {
    if (Object.keys(builderTree).length > 0) {
        let shadowItem = false;
        for (var key in builderTree) {
            if (Object.keys(builderTree[key]).includes("isDndShadowItem")) {
                shadowItem = true;
                break;
            }
        }
        return shadowItem;
    }
}

export function getProperty(id: number) {
    let stringId = id.toString();
    if (stringId.startsWith(TEXT_ID.toString())) {
        return cloneDeep(properties.textProperties);
    } else if (stringId.startsWith(ROW_ID.toString())) {
        return cloneDeep(properties.rowProperties);
    } else if (stringId.startsWith(CONTAINER_ID.toString())) {
        return cloneDeep(properties.containerProperties);
    } else if (stringId.startsWith(COLUMN_ID.toString())) {
        return cloneDeep(properties.columnProperties);
    }
}