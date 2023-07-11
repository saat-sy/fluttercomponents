import type { ComponentModel } from "./component_model";

interface TreeModel {
    component: ComponentModel,
    id: string,
    children: TreeModel[],
    active: ActiveModel
};

export interface TreeComponent {
    [componentId: string] : TreeModel
}

interface ActiveModel {
    status: boolean,
    component?: ComponentModel
}