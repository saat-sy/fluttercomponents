<script lang="ts">
    import type { CheckBoxProperties } from "../../model/custom_properties";
    import type { TreeComponent } from "../../model/tree";

    export let properties: CheckBoxProperties;
    export let tree: TreeComponent;

    $: if (properties.checked) {
        tree = {...tree};
    }
</script>

<div class="container">
    <label for="{properties.title}">{properties.title}</label>
    <input type="checkbox" id={properties.title} bind:checked={properties.checked}>
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