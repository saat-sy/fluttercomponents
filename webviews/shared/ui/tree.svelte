<script lang="ts">
    import properties from "../properties/properties";
    import Component from "./Component.svelte";

    let component_props = [
        properties.rowProperties,
        properties.columnProperties,
        properties.containerProperties,
        properties.textProperties
    ]

    export let tree: TreeModel;
    const { component, index, children } = tree;

    export let onDropped: Function;
</script>

<Component 
    onDropped={onDropped}
    properties={component_props[component.id]}
    index={index}>

    {#each children as child}
        <svelte:self tree={child} />
    {/each}

</Component>
