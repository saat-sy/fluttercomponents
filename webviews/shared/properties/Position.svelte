<script lang="ts">
    import type { DropDownProperties } from "../../model/custom_properties";
    import type { DefaultPositionProperties } from "../../model/default_properties";
    import Dropdown from "../custom_properties/Dropdown.svelte";

    export let properties: DefaultPositionProperties;

    let dropdown: DropDownProperties = {
        component: Dropdown,
        values: [
            "Left",
            "Center",
            "Right"
        ],
        active: 0,
        title: ""
    }

    $: if (properties) {
        properties.align = dropdown.active;
    }
</script>
<div class="container">
    <h3>Position</h3>
    <Dropdown bind:properties={dropdown} />
</div>

<style lang="scss">
    .container {
        margin: 10px;
    }
</style>