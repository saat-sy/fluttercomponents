<script>
	export let active = false;
	export let title = "Component";
</script>
  
<div class="active-border" class:active={active}>
	<!-- <div class="border-container"></div>
	{#if active}
		<div class="title">{title}</div>
	{/if} -->
	<slot></slot>
</div>

<style lang="scss">
	@import "../ui/variables.scss";

	.active-border {
		position: relative;
		cursor: pointer;

		.border-container {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border: 1px solid $active-border; 
			display: none;
		}

		.title {
			position: absolute;
			top: -18px;
			left: 0;
			color: $active-border; 
			display: none;
		}
	}

	.active-border.active {
		.border-container,
		.title {
			display: block;
		}
	}
  	
</style>