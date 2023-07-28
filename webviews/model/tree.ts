import type { ComponentModel } from "./component_model";
import type { PropertiesModel } from "./properties_model";

export interface TreeModel {
    component: ComponentModel,
    id: string,
    children: TreeModel[],
    active: ActiveModel,
    property: PropertiesModel
};

export interface TreeComponent {
    [componentId: string] : TreeModel
}

export interface ActiveModel {
    status: boolean,
    component?: ComponentModel
}