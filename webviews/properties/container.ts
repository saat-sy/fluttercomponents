import { Alignment } from "../model/alignment_model";
import type { ColorPickerProperties, TextFieldProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import ColorPicker from "../shared/custom_properties/ColorPicker.svelte";
import TextField from "../shared/custom_properties/TextField.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";
import {
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth
} from "../../common/default/defaultContainerProps";

const customProperties: CustomContainerProperties = {
    color: {
        title: "Background Color",
        component: ColorPicker,
        value: backgroundColor,
        default: backgroundColor,
        required: false
    },
    borderWidth: {
        component: TextField,
        value: borderWidth,
        title: "Border Width",
        default: borderWidth,
        required: false
    },
    borderColor: {
        component: ColorPicker,
        value: borderColor,
        title: "Border Color",
        default: borderColor,
        required: false
    },
    borderRadius: {
        component: TextField,
        value: borderRadius,
        title: "Border Radius",
        default: borderRadius,
        required: false
    },
};

export const containerProperties: PropertiesModel = {
    title: "Container",
    children: 1,
    alignment: Alignment.ANY,
    position: {
        component: PositionDesign,
        align: 0
    },
    padding: {
        component: Padding
    },
    customProperties: customProperties,
};

export interface CustomContainerProperties {
    color: ColorPickerProperties,
    borderWidth: TextFieldProperties,
    borderColor: ColorPickerProperties,
    borderRadius: TextFieldProperties,
}