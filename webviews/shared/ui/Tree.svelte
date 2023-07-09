<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, SHADOW_ITEM_MARKER_PROPERTY_NAME, TRIGGERS } from 'svelte-dnd-action';
    import Component from "./Component.svelte";
    import { droppableClass } from '../../model/constants';
    import { Alignment } from '../../model/alignment_model';
  import type { ComponentModel } from '../../model/component_model';

    export let parent;
    export let tree;
    export let main: Boolean;

    let size = Object.keys(tree).length + 1;

    const flipDurationMs = 200;
    
    let dropTargetStyle = {};

    $: dropFromOthersDisabled = (
        parent.children.length === parent.component.property.children
    ); 

	function handleDndConsider(e: CustomEvent<DndEvent<any>>) {
        let update = updateNewElement(e.detail.items, true)

        if (update.update) {
            e.detail.items.splice(update.i, 1, update.updatedComponent);
        }
		parent.children = e.detail.items;

        const {trigger} = e.detail.info;
        const target: HTMLInputElement = e.target as HTMLInputElement;

        if (trigger == TRIGGERS.DRAGGED_ENTERED) {
            target.classList.add(droppableClass);
        } else if (trigger === TRIGGERS.DRAGGED_LEFT) {
            target.classList.remove(droppableClass);
        }
	}
    
	function handleDndFinalize(e) {
        if (`component${size}` in tree) {
            let update = updateNewElement(e.detail.items, false)

            if (update.update) {
                e.detail.items.splice(update.i, 1, update.updatedComponent);
            }

            size += 1;
        }
        const target: HTMLInputElement = e.target as HTMLInputElement;
        if (target.classList.contains(droppableClass)) {
            target.classList.remove(droppableClass);
        }
		parent.children = e.detail.items;
		tree = {...tree};
	}

    function updateNewElement(elements, isDndShadow) {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name == undefined) {
                continue
            }
            if (!(`component${size}` in tree)) {
                tree[`component${size}`] = {
                    component: elements[i],
                    id: `component${size}`,
                    active: {
                        status: false,
                    },
                    children: []
                }
            }
            let updatedComponent = {
                id: `component${size}`
            };
            if (isDndShadow) {
                updatedComponent[SHADOW_ITEM_MARKER_PROPERTY_NAME] = true;
            }
            return {
                update: true,
                i: i,
                updatedComponent: updatedComponent
            };
        }  
        return {update: false};
    }

    function componentClick(event, component: ComponentModel) {
        let status: boolean;
        let targetComponent;

        if (event.target.classList.contains("active")) {
            event.target.classList.remove("active");
            status = false;
            targetComponent = undefined;
        } else {
            event.target.classList.add("active");
            status = true;
            targetComponent = event.target;
        }

        for (let c in tree) {
            let activeComp = tree[c].active;
            if (component === tree[c].component) {
                activeComp.status = status;
                activeComp.component = targetComponent;
            } else if (targetComponent != undefined) {
                if (activeComp.status) {
                    activeComp.status = false;
                    activeComp.component.classList.remove("active");
                    activeComp.component = undefined;
                }
            }
        }
		tree = {...tree};
        event.stopPropagation();
    }
</script>

<Component 
    component={parent.component}
    componentClick={(event, component) => {componentClick(event, component)}}
    properties={parent.component.property} 
    main={main} >
    {#if parent.hasOwnProperty("children")}
        <section 
            class:horizontal={parent.component.property.alignment == Alignment.HORIZONTAL}
            use:dndzone={{
                items: parent.children, 
                flipDurationMs, 
                centreDraggedOnCursor: true,
                dropTargetStyle,
                dropFromOthersDisabled
            }}
            on:consider={handleDndConsider} 
            on:finalize={handleDndFinalize}>		

                {#each parent.children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                    <div animate:flip="{{duration: flipDurationMs}}" class="item">
                        <svelte:self bind:tree={tree} parent={tree[item.id]} main={false} />
                    </div>
                {/each}

        </section>
    {/if}
</Component>

<style lang="scss">
    @import "./variables.scss";

    .item {
        width: 100%;
        margin: 5px;
    }

    section {
        padding: 20px;
    }

    section:global(.droppable) {
        border: 1px solid $active-border !important;
        border-radius: 6px;
    }

    section:global(.horizontal) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        overflow-x: auto;
    }

    section:global(.active) {
        box-sizing: border-box;
        border: 1px solid $active-border !important;
        border-radius: 6px;
    }
</style>
