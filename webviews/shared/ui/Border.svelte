<script lang="ts">
    export let title = "Component";
</script>

<div class="container">
    <span class="title">{title}</span>
    <div class="border">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "./variables.scss";

    .container {
        width: 100%;

        .border {
            margin-top: 5px;
            border: 1px solid $border;
            border-radius: 6px;
        }
    }

    .border:global(.droppable) {
        border: 1px solid $active-border !important;
    }

    slot {
        padding: 50px;
    }
</style>