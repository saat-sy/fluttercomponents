<!-- svelte-ignore a11y-click-events-have-key-events -->
<script lang="ts">
    import type { DefaultPaddingProperties } from "../../model/default_properties";
    import type { TreeComponent } from "../../model/tree";

    export let properties: DefaultPaddingProperties;
    export let tree: TreeComponent;
    export let onFinalize: Function;

    let expanded = false;
    const expand = () => expanded = true;
    const compress = (e) => {
        expanded = false;
        properties.paddingBottom = undefined;
        properties.paddingTop = undefined;
        properties.paddingStart = undefined;
        properties.paddingEnd = undefined;
        properties.padding = undefined;
        updateTree();
        e.stopPropagation();    
    };

    let paddingRef;

    const changeAllPadding = () => {
        properties.paddingBottom = properties.padding;
        properties.paddingTop = properties.padding;
        properties.paddingStart = properties.padding;
        properties.paddingEnd = properties.padding;
        updateTree();
        return false;
    }

    const changePadding = () => {
        properties.padding = "~";
        updateTree();
    }

    function updateTree() {
        tree = {...tree};
        onFinalize();
    }
</script>

<div class="container">
    <div class="accordion" on:click={expand}>
        <h3>Padding</h3>
        {#if !expanded}
            <span>&plus;</span>
        {:else}
            <span on:click={compress}>&minus;</span>
        {/if}
    </div>
    <div class="content" class:expanded={expanded}>
        <div class="padding-top">
            <input 
                placeholder="T" 
                type="text" 
                bind:value={properties.paddingTop}
                on:input={changePadding}>
        </div>
        <div class="padding-left">
            <input 
                placeholder="L" 
                type="text" 
                bind:value={properties.paddingStart}
                on:input={changePadding}>
        </div>
        <div class="padding">
            <input 
                placeholder="All" 
                type="text" 
                bind:value={properties.padding} 
                on:input={changeAllPadding}
                bind:this={paddingRef}
                on:focus={
                    () => {
                        if (properties.padding == "~") {
                            paddingRef.select();
                        }
                    }
                }>
        </div>
        <div class="padding-right">
            <input 
                placeholder="R" 
                type="text" 
                bind:value={properties.paddingEnd}
                on:input={changePadding}>
        </div>
        <div class="padding-bottom">
            <input 
                placeholder="B" 
                type="text" 
                bind:value={properties.paddingBottom}
                on:input={changePadding}>
        </div>
    </div>
</div>

<style lang="scss">
    .container {
        margin: 2px 10px;

        .accordion {
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;

            span {
                user-select: none;
                font-size: 23px;
                margin-right: 5px;
            }

            h3 {
                user-select: none;
            }
        }

        .content {
            display: none;
        }

        .expanded {
            display: grid;
            column-gap: 5px;
            row-gap: 5px;
            padding: 10px 40px;

            .padding-top {
                grid-row-start: 1;
                grid-row-end: 2;
                grid-column-start: 3;
                grid-column-end: 4;
            }

            .padding-left {
                grid-row-start: 3;
                grid-row-end: 4;
                grid-column-start: 1;
                grid-column-end: 2;
            }

            .padding {
                grid-row-start: 3;
                grid-row-end: 4;
                grid-column-start: 3;
                grid-column-end: 4;
            }

            .padding-right {
                grid-row-start: 3;
                grid-row-end: 4;
                grid-column-start: 5;
                grid-column-end: 6;
            }

            .padding-bottom {
                grid-row-start: 5;
                grid-row-end: 6;
                grid-column-start: 3;
                grid-column-end: 4;
            }

            input {
                text-align: center;
            }
        }
    }
</style>