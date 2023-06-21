import { Alignment } from "../model/alignment_model";
import type { PropertiesModel } from "../model/properties_model";
import PositionDesign from "../shared/properties/Position.svelte";
import SizeDesign from "../shared/properties/Size.svelte";

export const columnProperties: PropertiesModel = {
    title: "Column",
    children: Infinity,
    alignment: Alignment.VERTICAL,
    size: {
        component: SizeDesign,
        width: "100%",
        height: "100%"
    },
    position: {
        component: PositionDesign,
        centerAlign: true
    }
};