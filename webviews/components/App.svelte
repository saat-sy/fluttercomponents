<script lang="ts">
    import DraggableComponents from "../shared/ui/DraggableComponents.svelte";
    import properties from "../properties/properties";
    import Tree from "../shared/ui/Tree.svelte";
    import { TRIGGERS, dndzone } from "svelte-dnd-action";
    import Component from "../shared/ui/Component.svelte";

    let components: ComponentModel[] = [
        {
            id: 1000,
            name: "Row",
            property: properties.rowProperties
        },
        {
            id: 1001,
            name: "Column",
            property: properties.columnProperties
        },
        {
            id: 1002,
            name: "Container",
            property: properties.containerProperties
        },
        {
            id: 1003,
            name: "Text",
            property: properties.textProperties
        },
    ]

    let firstItem = [];
    let firstItemHover = false;

    let builderTree = null;

    function emptyOnConsider(e) {
        if (e.detail.info.trigger == TRIGGERS.DRAGGED_ENTERED) {
            firstItemHover = true;
        } else if (e.detail.info.trigger == TRIGGERS.DRAGGED_LEFT) {
            firstItemHover = false;
        }
        firstItem = e.detail.items;
    }

    function emptyOnFinalize(e) {
        builderTree = {
            component1: {
                component: e.detail.items[0],
                id: 'component1',
                children: []
            }
        }
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

            .render-first-drop {
                width: 50%;
                height: 35%;
                border: 1px dashed $border;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    z-index: 100;
                }
            }
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
        <DraggableComponents components={components} />
    </div>

    {#if builderTree == null}
        <div class="render">
            <div class="render-first-drop"
                use:dndzone={{
                    items: firstItem,
                    dropTargetStyle: {
                        "border": "1px solid var(--vscode-tab-activeBorderTop)",
                        "border-radius": "6px"
                    }
                }}
                on:consider={emptyOnConsider}
                on:finalize={emptyOnFinalize}>
                {#each firstItem as item}
                    <Component properties={item.property} main={true} />
                {/each}
                {#if !firstItemHover}
                    <span>Start dragging elements</span>                   
                {/if}
                
            </div>
        </div>
    {:else}
        <div class="render">
            <Tree parent={builderTree.component1} tree={builderTree} main={true} />
        </div>
    {/if}

    <div class="properties">
        <h1>Hello</h1>    
    </div>
</div>