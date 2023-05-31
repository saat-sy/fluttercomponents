<script lang="ts">
    import { draggable } from "../shared/functions/draggable"; 
    import { dropzone } from "../shared/functions/dropzone";
    import Border from "../shared/ui/border.svelte";
    import Component from "../shared/ui/comp.svelte";

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
            name: "Button",
        },
        {
            id: 3,
            name: "Text",
        },
    ]

    function onDropped(componentId: number) {
        console.log(componentId);
        // if (builderTree == null) {
            builderTree = {
                component: components[componentId],
                children: []
            };
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
				<Component>{component.name}</Component>
			</div>
        {/each}
    </div>
    
    <div class="render" use:dropzone={{
        onDropped
    }}>
        {#if builderTree == null}
            <span>Drag elements to get started</span>
        {:else}
            <Border title={builderTree.component.name}></Border>
        {/if}
    </div>
    
    <div class="properties">
        <h1>Hello</h1>    
    </div>
</div>