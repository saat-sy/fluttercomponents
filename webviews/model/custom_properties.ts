import type ColorPicker from "../shared/custom_properties/ColorPicker.svelte";
import type CheckBox from "../shared/custom_properties/CheckBox.svelte";
import type Dropdown from "../shared/custom_properties/Dropdown.svelte";
import type TextField from "../shared/custom_properties/TextField.svelte";

export interface Prop {
    title: string,
    required: boolean
}

export interface ColorPickerProperties extends Prop {
    component: typeof ColorPicker,
    value: string,
    default: string,
}

export interface CheckBoxProperties extends Prop {
    component: typeof CheckBox,
    value: boolean,
    default: boolean,
}

export interface DropDownProperties extends Prop {
    component: typeof Dropdown,
    values: Array<string>,
    active: number,
    default: number
}

export interface TextFieldProperties extends Prop {
    component: typeof TextField,
    value: string,
    default: string
}

export type CustomFieldsProperties = 
    ColorPickerProperties |
    CheckBoxProperties |
    DropDownProperties |
    TextFieldProperties;