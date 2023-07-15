import { Alignment } from "../model/alignment_model";
import type { ColorPickerProperties, TextFieldProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import ColorPicker from "../shared/custom_properties/ColorPicker.svelte";
import TextField from "../shared/custom_properties/TextField.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";

const customProperties: CustomContainerProperties = {
    color: {
        title: "Background Color",
        component: ColorPicker,
        color: ""
    },
    borderWidth: {
        component: TextField,
        value: "",
        title: "Border Width"
    },
    borderColor: {
        component: ColorPicker,
        color: "",
        title: "Border Color"
    },
    borderRadius: {
        component: TextField,
        value: "",
        title: "Border Radius"
    },
    elevation: {
        component: TextField,
        value: "",
        title: "Elevation"
    }
};

export const containerProperties: PropertiesModel = {
    title: "Container",
    children: 1,
    alignment: Alignment.ANY,
    position: {
        component: PositionDesign,
        centerAlign: true
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
    elevation: TextFieldProperties,
}