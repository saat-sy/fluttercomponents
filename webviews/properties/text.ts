import TextComponent from "../components/TextComponent.svelte";
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
        value: "14",
        title: "Font Size"
    },
    color: {
        component: ColorPicker,
        color: "#FFFFFF",
        title: "Text Color"
    },
    fontWeight: {
        component: Dropdown,
        values: [
            "100 - Thin",
            "200 - Extra-light",
            "300 - Light",
            "400 - Normal",
            "500 - Medium",
            "600 - Semi-bold",
            "700 - Bold",
            "800 - Extra-bold",
            "900 - Black",
        ],
        active: 3,
        title: "Font Weight"
    },
    textAlign: {
        component: Dropdown,
        values: [
            "Left",
            "Center",
            "Right",
            "Justify"
        ],
        active: 0,
        title: "Text Align"
    },
    styling: {
        component: Dropdown,
        values: [
            "Normal",
            "Italic",
            "Underline",
            "Line-through"
        ],
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
    selectable: CheckBoxProperties
}