<script lang="ts">
    import type { CheckBoxProperties } from "../../model/custom_properties";
    import type { TreeComponent } from "../../model/tree";

    export let properties: CheckBoxProperties;
    export let tree: TreeComponent;
    export let onFinalize: Function;

    $: if (properties.value) {
        tree = {...tree};
        onFinalize();
    }
</script>

<div class="container">
    <label for="{properties.title}">{properties.title}</label>
    <input type="checkbox" id={properties.title} bind:checked={properties.value}>
</div>

<style lang="scss">
    .container {
        margin: 10px 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        label {
            user-select: none;
            cursor: pointer;
        }
    }
</style>