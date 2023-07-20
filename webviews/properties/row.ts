import { Alignment } from "../model/alignment_model";
import type { DropDownProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import Dropdown from "../shared/custom_properties/Dropdown.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";

const customProperties: CustomRowProperties = {
    mainAxisSize: {
        title: "Main Axis Size",
        component: Dropdown,
        values: ["Max", "Min"],
        active: 0,
        default: 0,
        required: false
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
        active: 0,
        default: 0,
        required: false
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
        active: 0,
        default: 0,
        required: false
    }
};

export const rowProperties: PropertiesModel = {
    title: "Row",
    children: Infinity,
    alignment: Alignment.HORIZONTAL,
    position: {
        component: PositionDesign,
        align: 0
    },
    padding: {
        component: Padding
    },
    customProperties: customProperties
};

export interface CustomRowProperties {
    mainAxisSize: DropDownProperties,
    mainAxisAlignment: DropDownProperties,
    crossAxisAlignment: DropDownProperties
}