import { Alignment } from "../model/alignment_model";
import type { CheckBoxProperties, ColorPickerProperties, DropDownProperties, TextFieldProperties } from "../model/custom_properties";
import type { PropertiesModel } from "../model/properties_model";
import CheckBox from "../shared/custom_properties/CheckBox.svelte";
import ColorPicker from "../shared/custom_properties/ColorPicker.svelte";
import Dropdown from "../shared/custom_properties/Dropdown.svelte";
import TextField from "../shared/custom_properties/TextField.svelte";
import Padding from "../shared/properties/Padding.svelte";
import PositionDesign from "../shared/properties/Position.svelte";

const customProperties: CustomTextProperties = {
    text: {
        component: TextField,
        value: "Text",
        title: "Text"
    },
    fontSize: {
        component: TextField,
        value: "",
        title: "Font Size"
    },
    color: {
        component: ColorPicker,
        color: "",
        title: "Text Color"
    },
    fontWeight: {
        component: Dropdown,
        values: [],
        active: 0,
        title: "Font Weight"
    },
    textAlign: {
        component: Dropdown,
        values: [],
        active: 0,
        title: "Text Align"
    },
    styling: {
        component: Dropdown,
        values: [],
        active: 0,
        title: "Styling"
    },
    maxLines: {
        component: TextField,
        value: "",
        title: "Max Lines"
    },
    selectable: {
        component: CheckBox,
        checked: false,
        title: "Selectable"
    }
};

export const textProperties: PropertiesModel = {
    title: "Text",
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

export interface CustomTextProperties {
    text: TextFieldProperties,
    fontSize: TextFieldProperties,
    color: ColorPickerProperties,
    fontWeight: DropDownProperties,
    textAlign: DropDownProperties,
    styling: DropDownProperties,
    maxLines: TextFieldProperties,
    selectable: CheckBoxProperties
}