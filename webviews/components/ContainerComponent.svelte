<script lang="ts">
	import type { PropertiesModel } from "../model/properties_model";
	import type { ActiveModel } from "../model/tree";
	import type { CustomContainerProperties } from "../properties/container";
	import ActiveBorder from "../shared/ui/ActiveBorder.svelte";

    export let properties: PropertiesModel;
    export let active: ActiveModel;
    let containerProperties: CustomContainerProperties;

    $: containerProperties = properties.customProperties as CustomContainerProperties;
</script>

<div class="container">
    <slot></slot>
</div>

<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
        background-color: aqua;
    }
</style>