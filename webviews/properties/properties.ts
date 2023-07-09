import { textProperties } from "./text";
import { rowProperties } from "./row";
import { columnProperties } from "./column";
import { containerProperties } from "./container";

export default {
    textProperties,
    rowProperties,
    columnProperties,
    containerProperties,
};

import type { CustomTextProperties } from "./text";
import type { CustomColumnProperties } from "./column";
import type { CustomContainerProperties } from "./container";
import type { CustomRowProperties } from "./row";

export type CustomPropertiesType = CustomColumnProperties | 
    CustomTextProperties | 
    CustomRowProperties | 
    CustomContainerProperties;