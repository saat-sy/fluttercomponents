import type { ComponentModel } from "./component_model";

export interface TreeModel {
    component: ComponentModel,
    id: string,
    children: TreeModel[],
    active: ActiveModel
};

export interface TreeComponent {
    [componentId: string] : TreeModel
}

export interface ActiveModel {
    status: boolean,
    component?: ComponentModel
}