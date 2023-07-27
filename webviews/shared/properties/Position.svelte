<script lang="ts">
    import type { DropDownProperties } from "../../model/custom_properties";
    import type { DefaultPositionProperties } from "../../model/default_properties";
    import type { TreeComponent } from "../../model/tree";
    import Dropdown from "../custom_properties/Dropdown.svelte";

    export let properties: DefaultPositionProperties;
    export let tree: TreeComponent;
    export let onFinalize: Function;

    let dropdown: DropDownProperties = {
		component: Dropdown,
		values: [
			"Left",
			"Center",
			"Right"
		],
		active: 0,
		title: "",
		default: 0,
		required: false
	}

    $: if (properties) {
        properties.align = dropdown.active;
        tree = {...tree};
    }
</script>
<div class="container">
    <h3>Position</h3>
    <Dropdown properties={dropdown} tree={undefined} onFinalize={onFinalize} />
</div>

<style lang="scss">
    .container {
        margin: 10px;
    }
</style>