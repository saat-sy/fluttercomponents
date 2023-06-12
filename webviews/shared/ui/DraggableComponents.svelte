<script lang="ts">
    import { flip } from 'svelte/animate';
    import { dndzone, TRIGGERS, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

    export let components;

    const flipDurationMs = 300;
    let shouldIgnoreDndEvents = false;

    function handleDndConsider(e) {
        const {trigger, id} = e.detail.info;
        if (trigger === TRIGGERS.DRAG_STARTED) {
            const idx = components.findIndex(item => item.id === id);
            const newId = `${id}_copy_${Math.round(Math.random()*100000)}`;

            e.detail.items = e.detail.items.filter(item => !item[SHADOW_ITEM_MARKER_PROPERTY_NAME]);
            e.detail.items.splice(idx, 0, {...components[idx], id: newId});

            components = e.detail.items;
            shouldIgnoreDndEvents = true;
        }
        else if (!shouldIgnoreDndEvents) {
            components = e.detail.items;
        }
        else {
            components = [...components];
        }
    }

    function handleDndFinalize(e) {
        if (!shouldIgnoreDndEvents) {
            components = e.detail.items;
        }
        else {
            components = [...components];
            shouldIgnoreDndEvents = false;
        }
    }
</script>

<div 
    use:dndzone={{
        items: components, 
        flipDurationMs, 
        dropFromOthersDisabled: true,
        centreDraggedOnCursor: true,
    }} 
    on:consider={handleDndConsider} 
    on:finalize={handleDndFinalize}>
    {#each components as component (component.id)}
        <div class="component" animate:flip="{{duration: flipDurationMs}}">
            {component.name}
        </div>
    {/each}
</div>

<style lang="scss">
    @import "./variables.scss";

    .component {
        border: 1px solid $border;
        background-color: $background-light;
        margin: 10px;
        padding: 10px;
    }
</style>
