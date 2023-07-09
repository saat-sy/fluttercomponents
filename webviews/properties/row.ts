import { Alignment } from "../model/alignment_model";
import type { DropDownProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import Dropdown from "../shared/custom_properties/Dropdown.svelte";
import PositionDesign from "../shared/properties/Position.svelte";
import SizeDesign from "../shared/properties/Size.svelte";

const customProperties: CustomRowProperties = {
    mainAxisSize: {
        title: "Main Axis Size",
        component: Dropdown,
        values: ["Max", "Min"],
        active: 0
    },
    crossAxisAlignment: {
        title: "Cross Axis Alignment",
        component: Dropdown,
        values: [
            "Start",
            "Center",
            "End",
            "Stretch"
        ],
        active: 0
    },
    mainAxisAlignment: {
        title: "Main Axis Alignment",
        component: Dropdown,
        values: [
            "Start",
            "Center",
            "End",
            "Space Evenly",
            "Space Between",
            "Space Around"
        ],
        active: 0
    }
};

export const rowProperties: PropertiesModel = {
    title: "Row",
    children: Infinity,
    alignment: Alignment.HORIZONTAL,
    size: {
        component: SizeDesign,
        width: "100%",
        height: "100%"
    },
    position: {
        component: PositionDesign,
        centerAlign: true
    },
    customProperties: customProperties
};

export interface CustomRowProperties {
    mainAxisSize: DropDownProperties,
    mainAxisAlignment: DropDownProperties,
    crossAxisAlignment: DropDownProperties
}