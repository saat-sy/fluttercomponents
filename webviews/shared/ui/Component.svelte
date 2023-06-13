<script lang="ts">
    import Border from "./Border.svelte";
    
    export let properties: PropertiesModel;
    export let main: Boolean;
</script>

<style lang="scss">
    .main {
        width: 40%;
        margin-bottom: 15px;
    }

    .inner {
        width: 100%;
        margin-bottom: 15px;
    }
</style>

<div class={main ? "main" : "inner"}>
    <Border title={properties.title}>
        <slot></slot>
    </Border>
</div>