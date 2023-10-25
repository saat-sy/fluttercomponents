<script lang="ts">
    import type { ComponentModel } from "../../model/component_model";
    import type { PropertiesModel } from "../../model/properties_model";
    import type { ActiveModel } from "../../model/tree";
    import Border from "./Border.svelte";
    
    export let properties: PropertiesModel;
    export let main: Boolean;
    export let componentClick: (event, component: ComponentModel) => void;
    export let component: ComponentModel;
    export let activeStatus: ActiveModel;
</script>

<style lang="scss">
    .component-container {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .main {
            width: 50%;
            // margin-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .inner {
            width: 100%;
            // margin-bottom: 15px;
        }
    }
</style>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="component-container">
    <div on:click={(event) => componentClick(event, component)} class="{main ? "main" : "inner"}">
        {#if properties.component}
            <svelte:component 
                this="{properties.component}" 
                bind:properties={properties}
                bind:active={activeStatus} >
                <slot></slot>
            </svelte:component>
        {:else}
            <Border title={properties.title}>
                <slot></slot>
            </Border>
        {/if}
    </div>
</div>