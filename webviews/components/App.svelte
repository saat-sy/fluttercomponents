<script lang="ts">
    import DraggableComponents from "../shared/ui/DraggableComponents.svelte";
    import properties from "../properties/properties";
    import Tree from "../shared/ui/Tree.svelte";

    let components: ComponentModel[] = [
        {
            id: 1000,
            name: "Row",
            property: properties.rowProperties
        },
        {
            id: 1001,
            name: "Column",
            property: properties.columnProperties
        },
        {
            id: 1002,
            name: "Container",
            property: properties.containerProperties
        },
        {
            id: 1003,
            name: "Text",
            property: properties.textProperties
        },
    ]

    let builderTree = {
        component1: {
            component: components[0],
            id: 'component1',
            children: [
                {id: "component2"},
                {id: "component3"},
                {id: "component4"},
            ]
        }, 
        component2: {
            component: components[1],
            id: 'component2',
            children: []
        }, 
        component3: {
            component: components[2],
            id: 'component3',
            children: []
        }, 
        component4: {
            component: components[3],
            id: 'component4',
            children: []
        }
    }
</script>

<style lang="scss">
    @import "../shared/ui/variables.scss";

    .main {
        width: 100%;
        height: 100%;
        position: absolute;
        margin: 0px;

        .components {
            float: left;
            height: 100%;
            width: $component-width;
            background-color: $background-light;
        }

        .render {
            float:left;
            height: 100%;
            width: $render-width;
            background-color: $background-dark;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .properties {
            float: right;
            height: 100%;
            width: $properties-width;
            background-color: $background-light;
        }
    }
</style>

<div class="main">
    <div class="components">
        <DraggableComponents components={components} />
    </div>

    <div class="render">
        <Tree parent={builderTree.component1} tree={builderTree} />
    </div>

    <div class="properties">
        <h1>Hello</h1>    
    </div>
</div>