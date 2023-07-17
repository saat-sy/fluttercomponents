import type { CustomPropertiesType } from "../properties/properties";
import type { Alignment } from "./alignment_model";
import type { DefaultPaddingProperties, DefaultPositionProperties } from "./default_properties";

export interface PropertiesModel {
    component?: any,
    title: string,
    children: number,
    alignment: Alignment,
    position: DefaultPositionProperties,
    padding: DefaultPaddingProperties,
    customProperties: CustomPropertiesType
}