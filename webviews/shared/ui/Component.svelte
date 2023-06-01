<script lang="ts">
    import Border from "../ui/border.svelte";
    import { dropzone } from "../functions/dropzone";

    export let onDropped: Function; 
    export let properties: PropertiesModel;
</script>

<div use:dropzone={{onDropped, title: properties.title}}>
    <Border title={properties.title}>
        <slot></slot>
    </Border>
</div>