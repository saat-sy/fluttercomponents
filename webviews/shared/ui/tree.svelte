<script lang="ts">
    import properties from "../../properties/properties";
    import Component from "./Component.svelte";

    let component_props = [
        properties.rowProperties,
        properties.columnProperties,
        properties.containerProperties,
        properties.textProperties
    ]

    export let tree: TreeModel;
    
    let component: ComponentModel;
    let index: Array<number>;
    let children: Array<TreeModel>;

    $: {
        ({ component, index, children } = tree);
    }
    export let onDropped: Function;
</script>

<Component onDropped={onDropped} properties={component_props[component.id]} index={index} children={children.length}>

    {#each children as child}
        <svelte:self tree={child} onDropped={onDropped} />
    {/each}

</Component>
