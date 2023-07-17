<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
    import type { DropDownProperties } from "../../model/custom_properties";
    import type { TreeComponent } from "../../model/tree";
    export let properties: DropDownProperties;
    export let tree: TreeComponent;

    let menuOpen = false;

    function menuClicked() {
        if (menuOpen) {
            menuOpen = false;
        } else {
            menuOpen = true;
        }
    }

    function optionClicked(value: string) {
        properties.active = properties.values.indexOf(value);
        tree = {...tree};
        menuOpen = false;
    }
</script>

<div class="dropdown">
    <span>{properties.title}</span>
    <div 
        class="select" 
        on:click={menuClicked}>
        <span>{properties.values[properties.active]}</span>
        <div class="caret"></div>
    </div>
    <ul class="menu" class:open={menuOpen}>
        {#each properties.values as value}
            <li on:click={() => optionClicked(value)}>{value}</li>
            <div class="bottom-border"></div>
        {/each}
    </ul>
</div>

<style lang="scss">
    @import "../ui/variables.scss";

    .dropdown {
        margin: 10px 0 10px 0;
        position: relative;

        .select {
            margin-top: 5px;
            padding: 8px;
            border: 1px solid $border;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;

            .caret {
                width: 0;
                height: 0;
                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 5px solid $foreground;
            }
        }

        .menu {
            list-style: none;
	        background: $input-background;
            border: 1px solid $border;
            padding: 0;
            color: $foreground;
            position: absolute;
            width: 100%;
            left: 50%;
            top: 4.5em;
            transform: translateX(-50%);
            opacity: 0;
            display: none;
            transition: 0.2s;
            z-index: 1;

            li {
                margin: 8px;
                cursor: pointer;
                width: 100%;
            }

            .bottom-border {
                width: 100%;
                height: 1px;
                background: $border;
            }
        }

        .open {
            opacity: 1;
            display: block;
        }
    }
</style>