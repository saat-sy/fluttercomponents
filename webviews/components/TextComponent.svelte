<script lang="ts">
    import { cssVariables } from "../helper/css-variables";
    import type { PropertiesModel } from "../model/properties_model";
    import type { ActiveModel } from "../model/tree";
    import type { CustomTextProperties } from "../properties/text";
    import ActiveBorder from "../shared/ui/ActiveBorder.svelte";

    export let properties: PropertiesModel;
    export let active: ActiveModel;
    let textProperties: CustomTextProperties;

    $: textProperties = properties.customProperties as CustomTextProperties;
</script>

<!-- TODO: Max lines -->

<div class="container">
    <ActiveBorder active={active.status} title={properties.title}>
        <span 
            class="main"
            use:cssVariables={
                {
                    fontSize: `${textProperties.fontSize.value}px`,
                    color: textProperties.color.value,
                    fontWeight: textProperties.fontWeight.values
                        [textProperties.fontWeight.active],
                    textAlign: textProperties.textAlign.values
                        [textProperties.textAlign.active]
                        .toLowerCase(),
                    fontStyle: textProperties.styling.values
                        [textProperties.styling.active].toLowerCase(),
                }
            }>
            {textProperties.text.value}
        </span>
    </ActiveBorder>
</div>

<style lang="scss">
    .container {
        position: relative;
        z-index: 10;

        span {
            cursor: pointer;
            font-size: var(--fontSize);
            color: var(--color);
            font-weight: var(--fontWeight);
            text-align: var(--textAlign);
            font-style: var(--fontStyle);
            text-decoration: var(--textDecoration);
            user-select: none;
        }
    }
</style>