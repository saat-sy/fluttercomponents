import type { TreeComponent } from "../model/tree";

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