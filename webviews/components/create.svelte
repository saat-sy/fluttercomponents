<script lang="ts">
    import { draggable } from "../shared/functions/draggable"; 
    import { dropzone } from "../shared/functions/dropzone";
    import DraggableComponent from "../shared/ui/DraggableComponent.svelte";
    import Component from "../shared/ui/Component.svelte";
    import properties from "../shared/properties/properties";

    let builderTree: Tree = null;

    let components = [
        {
            id: 0,
            name: "Row",
        },
        {
            id: 1,
            name: "Column",
        },
        {
            id: 2,
            name: "Container",
        },
        {
            id: 3,
            name: "Text",
        },
    ]

    let component_props = [
        properties.rowProperties,
        properties.columnProperties,
        properties.containerProperties,
        properties.textProperties
    ]

    let dropToParent = true;

    function onDropped(componentId: number, title) {
        console.log(`${components[componentId].name} was dropped into ${title}`);
        // if (builderTree == null) {
            builderTree = {
                component: components[componentId],
                children: []
            };
            dropToParent = false;
        // }
    }
</script>

<style lang="scss">
    @import "../shared/ui/variables.scss";

    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        margin: 0px;

        .components {
            float: left;
            height: 100%;
            width: $component-width;
            background-color: $background-light;
        }

        .render {
            float:left;
            height: 100%;
            width: $render-width;
            background-color: $background-dark;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .properties {
            float: right;
            height: 100%;
            width: $properties-width;
            background-color: $background-light;
        }
    }
</style>

<div class="main">
    <div class="components">
        {#each components as component}
            <div use:draggable={component.id}>
				<DraggableComponent>{component.name}</DraggableComponent>
			</div>
        {/each}
    </div>

    {#if builderTree == null}
        <div class="render" use:dropzone={{
            onDropped,
            title: "Parent",
        }}>
            <span>Drag elements to get started</span>
        </div>
    {:else}
        <div class="render">
            <Component onDropped={onDropped} properties={component_props[builderTree.component.id]} />
        </div>
    {/if}
    
    <div class="properties">
        <h1>Hello</h1>    
    </div>
</div>