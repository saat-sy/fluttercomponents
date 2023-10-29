<script lang="ts">
    export let title = "Component";
    export let dnd2: Boolean;
</script>

<div class="container">
    <!-- <span class="title">{title}</span> -->
    <div class="border">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "./variables.scss";

    .container {
        width: 100%;
        height: 100px;

        .border {
            margin-top: 5px;
            border: 1px solid $border;
            border-radius: 6px;
            height: 100px;
        }

        span {
            user-select: none;
        }
    }

    slot {
        padding: 50px;
    }
</style>