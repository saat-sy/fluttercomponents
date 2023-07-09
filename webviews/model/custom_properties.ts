import type ColorPicker from "../shared/custom_properties/ColorPicker.svelte";
import type CheckBox from "../shared/custom_properties/CheckBox.svelte";
import type Dropdown from "../shared/custom_properties/Dropdown.svelte";
import type TextField from "../shared/custom_properties/TextField.svelte";

export interface Prop {
    title: string,
}

export interface ColorPickerProperties extends Prop {
    component: typeof ColorPicker,
    color: string
}

export interface CheckBoxProperties extends Prop {
    component: typeof CheckBox,
    checked: boolean
}

export interface DropDownProperties extends Prop {
    component: typeof Dropdown,
    values: Array<string>,
    active: number
}

export interface TextFieldProperties extends Prop {
    component: typeof TextField,
    value: string
}