<script lang="ts">
	import { cssVariables } from "../helper/css-variables";
	import type { PropertiesModel } from "../model/properties_model";
	import type { ActiveModel } from "../model/tree";
	import type { CustomContainerProperties } from "../properties/container";
	import ActiveBorder from "../shared/ui/ActiveBorder.svelte";

	export let properties: PropertiesModel;
	export let active: ActiveModel;
    export let dnd2: Boolean = false;
	let containerProperties: CustomContainerProperties;

	$: containerProperties = properties.customProperties as CustomContainerProperties;

	let startX, startY;
	let isResizing = false;
	let direction = null;

	function startResize(event, dir) {
		startX = event.clientX;
		startY = event.clientY;
		isResizing = true;
        dnd2 = false;
		direction = dir;
		window.addEventListener("mousemove", handleResize);
		window.addEventListener("mouseup", stopResize);
	}

	function stopResize() {
		isResizing = false;
        // dnd2 = !isResizing;
		window.removeEventListener("mousemove", handleResize);
		window.removeEventListener("mouseup", stopResize);
	}

	function handleResize(event) {
		if (!isResizing) return;
        dnd2 = false;

		const deltaX = event.clientX - startX;
		const deltaY = event.clientY - startY;

		if (!direction) return;

		if (direction === 'right') {
			containerProperties.width.value = (parseInt(containerProperties.width.value) + deltaX).toString();
		} else if (direction === 'left') {
			containerProperties.width.value = (parseInt(containerProperties.width.value) - deltaX).toString();
		}
		
		if (direction === 'bottom') {
			containerProperties.height.value = (parseInt(containerProperties.height.value) + deltaY).toString();
		} else if (direction === 'top') {
			containerProperties.height.value = (parseInt(containerProperties.height.value) - deltaY).toString();
		}

		startX = event.clientX;
		startY = event.clientY;
	}

	function handleDrag(event) {
		if (isResizing) {
			event.preventDefault();
		}
	}
</script>

<div 
	class="container"
	use:cssVariables={
		{
			width: `${containerProperties.width.value}px`,
			height: `${containerProperties.height.value}px`,
			background: containerProperties.color.value,
			borderWidth: `${containerProperties.borderWidth.value}px`,
			borderColor: containerProperties.borderColor.value,
			borderRadius: `${containerProperties.borderRadius.value}px`,
		}
	}
	on:mousedown={handleDrag}>
	
	<div class="handle left" on:mousedown={(e) => startResize(e, 'left')}></div>
	<div class="handle right" on:mousedown={(e) => startResize(e, 'right')}></div>
	<div class="handle top" on:mousedown={(e) => startResize(e, 'top')}></div>
	<div class="handle bottom" on:mousedown={(e) => startResize(e, 'bottom')}></div>
	<slot></slot>
</div>

<style lang="scss">
	.container {
		width: var(--width);
		height: var(--height);
		background-color: var(--background);
		border: var(--borderWidth) solid var(--borderColor);
		border-radius: var(--borderRadius);
		min-width: 30px;
		max-width: 100%;
		min-height: 30px;
		max-height: 100%;
		position: relative;

		.handle {
			position: absolute;
			background-color: #007bff;
		}

		.left {
			left: -25px;
			top: 50%;
			border-radius: 10px;
			width: 5px;
			height: 30px;
			transform: translateY(-50%);
			cursor: col-resize;
		}

		.right {
			right: -25px;
			top: 50%;
			border-radius: 10px;
			width: 5px;
			height: 30px;
			transform: translateY(-50%);
			cursor: col-resize;
		}

		.top {
			top: -25px;
			left: 50%;
			width: 30px;
			height: 5px;
			border-radius: 10px;
			transform: translateX(-50%);
			cursor: row-resize;
		}

		.bottom {
			bottom: -25px;
			left: 50%;
			width: 30px;
			height: 5px;
			border-radius: 10px;
			transform: translateX(-50%);
			cursor: row-resize;
		}
	}
</style>