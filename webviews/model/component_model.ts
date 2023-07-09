import type { PropertiesModel } from "./properties_model";

export interface ComponentModel {
    id: number,
    name: string,
    property: PropertiesModel
}