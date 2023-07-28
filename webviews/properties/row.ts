import { Alignment } from "../model/alignment_model";
import type { DropDownProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import Dropdown from "../shared/custom_properties/Dropdown.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";
import {
    mainAxisSize,
    crossAxisAlignment,
    mainAxisAlignment,
    activeCrossAxisAlignment,
    activeMainAxisAlignment,
    activeMainAxisSize
} from "../../common/default/defaultRowProps";
import { cloneDeep } from "lodash";

const customProperties: CustomRowProperties = {
    mainAxisSize: {
        title: "Main Axis Size",
        component: Dropdown,
        values: mainAxisSize,
        active: activeMainAxisSize,
        default: activeMainAxisSize,
        required: false
    },
    crossAxisAlignment: {
        title: "Cross Axis Alignment",
        component: Dropdown,
        values: crossAxisAlignment,
        active: activeCrossAxisAlignment,
        default: activeCrossAxisAlignment,
        required: false
    },
    mainAxisAlignment: {
        title: "Main Axis Alignment",
        component: Dropdown,
        values: mainAxisAlignment,
        active: activeMainAxisAlignment,
        default: activeMainAxisAlignment,
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
    customProperties: cloneDeep(customProperties)
};

export interface CustomRowProperties {
    mainAxisSize: DropDownProperties,
    mainAxisAlignment: DropDownProperties,
    crossAxisAlignment: DropDownProperties
}