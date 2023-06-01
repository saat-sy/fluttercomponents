<script lang="ts">
    import { draggable } from "../shared/functions/draggable"; 
    import { dropzone } from "../shared/functions/dropzone";
    import DraggableComponent from "../shared/ui/DraggableComponent.svelte";
    import properties from "../shared/properties/properties";
    import Tree from "../shared/ui/tree.svelte";

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

    let builderTree: TreeModel = {
        component: components[0],
        index: [-1],
        children: [
            {
                component: components[1],
                index: [0],
                children: [
                    {
                        component: components[2],
                        index: [0, 1],
                        children: []
                    }
                ]
            },
            {
                component: components[3],
                index: [2],
                children: []
            }
        ]
    };

    let dropToParent = true;

    function onDropped(componentId: number, index: Array<number>) {
        if (builderTree == null) {
            builderTree = {
                component: components[componentId],
                index: [-1],
                children: []
            };
            dropToParent = false;
        } else {
            let treeToInsert = builderTree;
            let firstChildren = false;

            for (let i of index) {
                if (i == -1) {
                    firstChildren = true;
                    break;
                } else {
                    treeToInsert = builderTree.children[i];
                }
            }

            treeToInsert.children.push({
                component: components[componentId],
                index: firstChildren ? 
                    [treeToInsert.children.length] : 
                    [...treeToInsert.index, treeToInsert.children.length],
                children: []
            });

            console.log(builderTree);
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
            <Tree tree={builderTree} onDropped={onDropped} />
        </div>
    {/if}
    
    <div class="properties">
        <h1>Hello</h1>    
    </div>
</div>