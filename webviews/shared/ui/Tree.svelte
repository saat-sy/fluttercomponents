<script lang="ts">
	import type { TreeModel, TreeComponent } from "../../model/tree";
	import { SHADOW_ITEM_MARKER_PROPERTY_NAME, dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Component from "./Component.svelte";
	import type { ComponentModel } from "../../model/component_model";
	import { getId, getProperty } from "../../helper/helper";

	export let parent: TreeModel;
	export let tree: TreeComponent;
	export let main: Boolean;
	export let onFinalize: Function;

	const flipDurationMs = 200;
    let size = Object.keys(tree).length + 1;
    let dropTargetStyle = {};

	function handleDndConsider(e) {
		let update = updateNewElement(e.detail.items, true);

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
		onFinalize();
	}

    function updateNewElement(elements, isDndShadow) {
		for (let i = 0; i < elements.length; i++) {
			if (elements[i].name == undefined) {
				continue
			}
            let component = elements[i];
            component.id = getId(elements[i].name);
			if (!(`component${size}` in tree)) {
				tree[`component${size}`] = {
					component: elements[i],
					id: `component${size}`,
					active: {
						status: false,
					},
					children: [],
					property: getProperty(elements[i].id, elements[i].name)
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

{#if parent?.hasOwnProperty("children") && parent}
	<Component 
		component={parent.component}
		componentClick={(event, component) => {componentClick(event, component)}}
		bind:properties={parent.property} 
		main={main}
		activeStatus={parent.active} >
		<section use:dndzone={{items: parent.children, flipDurationMs, centreDraggedOnCursor: true, dropTargetStyle}}
						on:consider={handleDndConsider} 
						on:finalize={handleDndFinalize}>		
				{#each parent.children as item(item.id)}
					<div animate:flip="{{duration: flipDurationMs}}" class="item">
						<svelte:self bind:tree={tree} parent={tree[item.id]} />
					</div>
				{/each}
		</section>
	</Component>
{/if}

<style>
	section {
		width: auto;
		border: 0px solid black;
		padding: 20px;
		overflow-y: auto ;
		height: auto;
	}
</style>