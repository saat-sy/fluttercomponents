import { CodeContainerProperties } from "./container_properties";
import { CodeTextProperties } from "./text_properties";
import { CodeRowProperties } from "./row_properties";
import { CodeColumnProperties } from "./column_properties";

export type CodeProperties = 
    CodeTextProperties | 
    CodeContainerProperties | 
    CodeRowProperties | 
    CodeColumnProperties |
    undefined;