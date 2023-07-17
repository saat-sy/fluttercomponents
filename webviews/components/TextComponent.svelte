<script lang="ts">
    import { cssVariables } from "../helper/css-variables";
    import type { PropertiesModel } from "../model/properties_model";
    import type { CustomTextProperties } from "../properties/text";

    export let properties: PropertiesModel;
    let textProperties: CustomTextProperties;

    $: textProperties = properties.customProperties as CustomTextProperties;
</script>

<!-- TODO: Max lines -->

<div class="container">
    <span 
        class="main"
        use:cssVariables={
            {
                fontSize: `${textProperties.fontSize.value}px`,
                color: textProperties.color.color,
                fontWeight: textProperties.fontWeight.values
                    [textProperties.fontWeight.active]
                    .split("-")[0]
                    .trim(),
                textAlign: textProperties.textAlign.values
                    [textProperties.textAlign.active]
                    .toLowerCase(),
                fontStyle: textProperties.styling.values
                    [textProperties.styling.active] == "Italic" ?
                    "italic" : "normal",
                textDecoration: textProperties.styling.values
                    [textProperties.styling.active] != "Normal" ||
                    textProperties.styling.values
                    [textProperties.styling.active] != "Italic" ?
                    textProperties.styling.values
                    [textProperties.styling.active].toLowerCase() : "none",
                userSelect: textProperties.selectable.checked,
            }
        }>
        {textProperties.text.value}
    </span>
</div>

<style lang="scss">
    .container {

        span {
            cursor: pointer;
            font-size: var(--fontSize);
            color: var(--color);
            font-weight: var(--fontWeight);
            text-align: var(--textAlign);
            font-style: var(--fontStyle);
            text-decoration: var(--textDecoration);
            user-select: var(--userSelect);
        }
    }
</style>