import { cloneDeep } from "lodash";
import { COLUMN_ID, COLUMN_NAME, CONTAINER_ID, CONTAINER_NAME, ROW_ID, ROW_NAME, TEXT_ID, TEXT_NAME } from "../../common/constants";
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

export function getProperty(id: number, name: string) {
    let stringId = id.toString();
    if (stringId.startsWith(TEXT_ID.toString()) || name.includes(TEXT_NAME)) {
        return cloneDeep(properties.textProperties);
    } else if (stringId.startsWith(ROW_ID.toString()) || name.includes(ROW_NAME)) {
        return cloneDeep(properties.rowProperties);
    } else if (stringId.startsWith(CONTAINER_ID.toString()) || name.includes(CONTAINER_NAME)) {
        return cloneDeep(properties.containerProperties);
    } else if (stringId.startsWith(COLUMN_ID.toString()) || name.includes(COLUMN_NAME)) {
        return cloneDeep(properties.columnProperties);
    }
}


export function getId(name: string) {
    if (name.includes(TEXT_NAME)) {
        return TEXT_ID;
    } else if (name.includes(ROW_NAME)) {
        return ROW_ID;
    } else if (name.includes(CONTAINER_NAME)) {
        return CONTAINER_ID;
    } else if (name.includes(COLUMN_NAME)) {
        return COLUMN_ID;
    }
}