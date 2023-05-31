<script lang="ts">

</script>

<div class="component">
    <span>
        <slot></slot>
    </span>
</div>

<style lang="scss">
    @import "./variables.scss";

    .component {
        border: 1px solid $border;
        background-color: $background-light;
        margin: 10px;
        padding: 10px;
    }
</style>
