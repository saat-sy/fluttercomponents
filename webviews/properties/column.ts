import { Alignment } from "../model/alignment_model";
import type { DropDownProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import Dropdown from "../shared/custom_properties/Dropdown.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";

const customProperties: CustomColumnProperties = {
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

export const columnProperties: PropertiesModel = {
    title: "Column",
    children: Infinity,
    alignment: Alignment.VERTICAL,
    position: {
        component: PositionDesign,
        centerAlign: true
    },
    padding: {
        component: Padding
    },
    customProperties: customProperties
};

export interface CustomColumnProperties {
    mainAxisSize: DropDownProperties,
    mainAxisAlignment: DropDownProperties,
    crossAxisAlignment: DropDownProperties
}