<script lang="ts">
    import Border from "../ui/border.svelte";
    import { dropzone } from "../functions/dropzone";

    export let onDropped: Function; 
    export let properties: PropertiesModel;
    export let index: Array<number>;
    export let children: number;
</script>

<style lang="scss">
    .main {
        width: 40%;
    }

    .inner {
        width: 100%;
    }
</style>

<div 
    class={index[0] == -1 ? "main" : "inner"}
    use:dropzone={{
        onDropped: onDropped, 
        properties: properties, 
        index: index, 
        children: children}}>
    <Border title={properties.title}>
        <slot></slot>
    </Border>
</div>