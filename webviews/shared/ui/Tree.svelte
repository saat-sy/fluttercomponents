<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone, SHADOW_PLACEHOLDER_ITEM_ID, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
    import Component from "./Component.svelte";

    export let parent;
    export let tree;

    let size = Object.keys(tree).length + 1;

    const flipDurationMs = 300;

	function handleDndConsider(e) {
        let update = updateNewElement(e.detail.items, true)

        if (update.update) {
            e.detail.items.splice(update.i, 1, update.updatedComponent);
        }
		parent.children = e.detail.items;
	}
    
	function handleDndFinalize(e) {
        if (`component${size}` in tree) {
            let update = updateNewElement(e.detail.items, false)

            if (update.update) {
                e.detail.items.splice(update.i, 1, update.updatedComponent);
            }

            size += 1;
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

</script>

<Component properties={parent.component.property} >
    {#if parent.hasOwnProperty("children")}
        <section 
            use:dndzone={{
                items: parent.children, 
                flipDurationMs, 
                centreDraggedOnCursor: true,
            }}
            on:consider={handleDndConsider} 
            on:finalize={handleDndFinalize}>		

                {#each parent.children.filter(item => item.id !== SHADOW_PLACEHOLDER_ITEM_ID) as item(item.id)}
                    <div animate:flip="{{duration: flipDurationMs}}" class="item">
                        <svelte:self bind:tree={tree} parent={tree[item.id]} />
                    </div>
                {/each}

        </section>
    {/if}
</Component>

<style>
    section {
        padding: 20px;
    }
</style>
