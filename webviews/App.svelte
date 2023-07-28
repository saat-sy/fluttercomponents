<script lang="ts">
    import DraggableComponents from "./shared/ui/DraggableComponents.svelte";
    import properties from "./properties/properties";
    import Tree from "./shared/ui/Tree.svelte";
    import { TRIGGERS, dndzone } from "svelte-dnd-action";
    import Component from "./shared/ui/Component.svelte";
    import type { ComponentModel } from "./model/component_model";
    import UiBorder from "./shared/properties/UiBorder.svelte";
    import type { TreeComponent } from "./model/tree";
	import { COLUMN_ID, CONTAINER_ID, ROW_ID, TEXT_ID } from "../common/constants";
	import type { CodeTemplate } from "../common/code";
	import { getProperty } from "./helper/helper";
	// import { builderTreeContainsShadowItem } from "./helper/helper";

    let components: ComponentModel[] = [
        {
            id: ROW_ID,
            name: "Row",
        },
        {
            id: COLUMN_ID,
            name: "Column",
        },
        {
            id: CONTAINER_ID,
            name: "Container",
        },
        {
            id: TEXT_ID,
            name: "Text",
        },
    ]

    let firstItem = [];
    let firstItemHover = false;
    let previousBuilderTreeCode: CodeTemplate = {};

    // let builderTree: TreeComponent = {
    //     component1: {
    //         component: components[1],
    //         id: 'component1',
    //         active: {
    //             status: false
    //         },
    //         children: [
    //             {
    //                 component: components[1],
    //                 id: 'component2',
    //                 active: {
    //                     status: false
    //                 },
    //                 children: []
    //             },
    //         ]
    //     }, 
    //     component2: {
    //         component: components[1],
    //         id: 'component2',
    //         active: {
    //             status: false
    //         },
    //         children: []
    //     }, 
    // }

    // let builderTree = {
    //     component1: {
    //         component: components[1],
    //         id: 'component1',
    //         active: {
    //             status: false
    //         },
    //         children: [
    //             {id: "component2"},
    //             {id: "component3"},
    //             {id: "component4"},
    //         ]
    //     }, 
    //     component2: {
    //         component: components[0],
    //         id: 'component2',
    //         active: {
    //             status: false
    //         },
    //         children: []
    //     }, 
    //     component3: {
    //         component: components[2],
    //         id: 'component3',
    //         active: {
    //             status: false
    //         },
    //         children: []
    //     }, 
    //     component4: {
    //         component: components[3],
    //         id: 'component4',
    //         active: {
    //             status: false
    //         },
    //         children: []
    //     }
    // }

    let builderTree: TreeComponent = {};

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
                children: [],
                active: {
                    status: false
                },
                property: getProperty(e.detail.items[0].id)
            }
        }
        onFinalize();
    }

    function builderTreeContainsShadowItem(builderTree: TreeComponent): boolean {
        if (Object.keys(builderTree).length > 0) {
            let shadowItem = false;
            for (var key in builderTree) {
                if (Object.keys(builderTree[key]).includes("isDndShadowItem")) {
                    shadowItem = true;
                    break;
                }
            }
            return shadowItem;
        }
    }
    
    // $: if (builderTree) {
        
    // }

    function onFinalize() {
        console.log(builderTree);
        // if (!builderTreeContainsShadowItem(builderTree)) {
        //     let newCode = convertBuilderTreeToCode(builderTree, builderTree[Object.keys(builderTree)[0]]);
        //     if (JSON.stringify(newCode) !== JSON.stringify(previousBuilderTreeCode)) {
        //         webVscode.postMessage({
        //             type: "onInfo",
        //             value: newCode
        //         });
        //         previousBuilderTreeCode = newCode;
        //     }
        // }
    }
</script>

<div class="main">
    <div class="components">
        <DraggableComponents components={components} />
    </div>

    {#if Object.keys(builderTree).length === 0}
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
                {#if firstItem.length != 0}
                    {#each firstItem as item}
                        <Component 
                            properties={getProperty(item.id)} 
                            main={true}
                            component={item}
                            componentClick={()=>{}}
                            activeStatus={{status: false}} />
                        <!-- <p>{item.name}</p> -->
                    {/each}
                {/if}
                {#if !firstItemHover}
                    <span>Start dragging elements</span>                   
                {/if}
                
            </div>
        </div>
    {:else}
        <div class="render">
            <Tree 
                bind:parent={builderTree.component1} 
                bind:tree={builderTree} 
                main={true}
                onFinalize={onFinalize} />
        </div>
    {/if}

    <div class="properties">
        {#each Object.entries(builderTree) as [_, data]}
            {#if data.active.status}
                <div class="customProps">
                    <h3>{data.component.name} Properties</h3>
                    <p>{data.component.id}</p>
                    {#each Object.entries(data.property.customProperties) as [_, property]}
                        <svelte:component this={property.component} bind:properties={property} bind:tree={builderTree} onFinalize={onFinalize}/>
                    {/each}
                </div>
                <UiBorder />
                {#each Object.entries(data.property) as [_, property]} 
                    {#if property.component}
                        <svelte:component this={property.component} bind:properties={property} bind:tree={builderTree} onFinalize={onFinalize}/>
                        <UiBorder />
                    {/if}
                {/each}
            {/if}
        {/each}   
    </div>
</div>

<style lang="scss">
    @import "shared/ui/variables.scss";

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
            background-color: $background;
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

    .customProps {
        margin: 10px;

        h3 {
            margin-bottom: 15px;
        }
    }
</style>