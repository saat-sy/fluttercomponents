<script lang="ts">
    import type { TextFieldProperties } from "../../model/custom_properties";

    export let properties: TextFieldProperties;
</script>

<div class="container">
    <span>{properties.title}</span>
    <input type="text" bind:value={properties.value}>
</div>

<style lang="scss">
    .container {
        margin: 10px 0 10px 0;

        input {
            margin-top: 5px;
        }
    }
</style>