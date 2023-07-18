<script lang="ts">
	import { cssVariables } from "../../helper/css-variables";

	export let active: boolean;
</script>

<div use:cssVariables={{
	border: active ? '1px': '0px',
	padding: active ? '5px': '6px',
}} class="container">
	<div class="border">
		<slot></slot>
	</div>
</div>

<style lang="scss">
	@import "./variables.scss";

	.container {
		width: fit-content;

		.border {
			margin-top: 5px;
			border: var(--border) solid $active-border;
			padding: var(--padding);
		}
	}
</style>