import type { Alignment } from "./alignment_model";
import type { Margin, Padding, Position, Size } from "./default_properties";

export interface PropertiesModel {
    title: string,
    children: number,
    alignment: Alignment,
    size: Size,
    position: Position,
    padding?: Padding,
    margin?: Margin
}