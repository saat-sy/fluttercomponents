<script lang="ts">
    import type { ColorPickerProperties } from "../../model/custom_properties";
    import type { TreeComponent } from "../../model/tree";

    export let properties: ColorPickerProperties;
    export let tree: TreeComponent;
    export let onFinalize: Function;

    function handleColorChange(event) {
        properties.value = event.target.value;
    }

    function set() {
        tree = {...tree};
        onFinalize();
    }
</script>

<div class="container">
    <span>{properties.title}</span>
    <div class="color-picker">
        <input 
            class="color-input" 
            type="color" 
            bind:value="{properties.value}" 
            on:input="{handleColorChange}">
        <span>{properties.value != "" ? properties.value : "Choose a color"}</span>
        <button class="set" on:click={set}>Set</button>
    </div>
</div>

<style lang="scss">
    @import "../ui//variables.scss";

    .container {
        margin: 10px 0 10px 0;

        .color-picker {
            margin-top: 8px;
            display: flex;
            align-items: center;

            .color-input {
                border-radius: 50%;
                height: 40px;
                width: 40px;
                border: none;
                outline: none;
                padding: 0;
                cursor: pointer;
            }

            .color-input::-webkit-color-swatch-wrapper {
                padding: 0; 
            }
            .color-input::-webkit-color-swatch {
                border: none;
                border-radius: 50%;
            }

            span {
                margin-left: 10px;
                user-select: none;
                cursor: pointer;
            }

            .set {
                width: fit-content;
                margin-left: 20px;
                padding: 5px;
            }
        }
    }
</style>