import TextComponent from "../components/TextComponent.svelte";
import { Alignment } from "../model/alignment_model";
import type { ColorPickerProperties, DropDownProperties, TextFieldProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import ColorPicker from "../shared/custom_properties/ColorPicker.svelte";
import Dropdown from "../shared/custom_properties/Dropdown.svelte";
import TextField from "../shared/custom_properties/TextField.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";
import {
    text,
    fontSize,
    color,
    fontWeight,
    activeFontWeight,
    textAlign,
    activeTextAlign,
    styling,
    activeStyling,
    maxLines
} from "../../common/default/defaulTextProps";

const customProperties: CustomTextProperties = {
    text: {
        component: TextField,
        value: text,
        title: "Text",
        default: text,
        required: true
    },
    fontSize: {
        component: TextField,
        value: fontSize,
        title: "Font Size",
        default: fontSize,
        required: false
    },
    color: {
        component: ColorPicker,
        value: color,
        title: "Text Color",
        default: color,
        required: false
    },
    fontWeight: {
        component: Dropdown,
        values: fontWeight,
        active: activeFontWeight,
        title: "Font Weight",
        default: activeFontWeight,
        required: false
    },
    textAlign: {
        component: Dropdown,
        values: textAlign,
        active: activeTextAlign,
        title: "Text Align",
        default: activeTextAlign,
        required: false
    },
    styling: {
        component: Dropdown,
        values: styling,
        active: activeStyling,
        title: "Styling",
        default: activeStyling,
        required: false
    },
    maxLines: {
        component: TextField,
        value: maxLines,
        title: "Max Lines",
        default: maxLines,
        required: false
    },
};

export const textProperties: PropertiesModel = {
    component: TextComponent,
    title: "Text",
    children: 0,
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

export interface CustomTextProperties {
    text: TextFieldProperties,
    fontSize: TextFieldProperties,
    color: ColorPickerProperties,
    fontWeight: DropDownProperties,
    textAlign: DropDownProperties,
    styling: DropDownProperties,
    maxLines: TextFieldProperties,
}