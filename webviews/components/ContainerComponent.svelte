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
    <ActiveBorder active={active.status} title={properties.title}>
        <div class="main">
            <slot></slot>
        </div>
    </ActiveBorder>
</div>

<style lang="scss">
    .container {
        width: 100%;

        .main {
            width: 100px;
            height: 100px;
            margin-top: 5px;

            slot {
                padding: 50px;
            }
        }
    }
</style>