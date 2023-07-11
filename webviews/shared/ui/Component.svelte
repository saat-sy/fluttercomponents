<script lang="ts">
    import type { ComponentModel } from "../../model/component_model";
    import type { PropertiesModel } from "../../model/properties_model";
    import Border from "./Border.svelte";
    
    export let properties: PropertiesModel;
    export let main: Boolean;
    export let componentClick: (event, component: ComponentModel) => void;
    export let component: ComponentModel;
</script>

<style lang="scss">
    .main {
        width: 50%;
        margin-bottom: 15px;
    }

    .inner {
        width: 100%;
        margin-bottom: 15px;
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={(event) => componentClick(event, component)} class={main ? "main" : "inner"}>
    <Border title={properties.title}>
        <slot></slot>
    </Border>
</div>