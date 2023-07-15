import type { CustomPropertiesType } from "../properties/properties";
import type { Alignment } from "./alignment_model";
import type { Margin, Padding, Position, Size } from "./default_properties";

export interface PropertiesModel {
    title: string,
    children: number,
    alignment: Alignment,
    position: Position,
    padding: Padding,
    customProperties: CustomPropertiesType
}