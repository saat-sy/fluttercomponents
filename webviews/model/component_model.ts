import type { PropertiesModel } from "./properties_model";

export interface ComponentModel {
    [x: string]: any;
    id: number,
    name: string,
    property: PropertiesModel
}