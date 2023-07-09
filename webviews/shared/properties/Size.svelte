<script lang="ts">
    import { type Size } from "../../model/default_properties";

    export let properties: Size;
</script>

<div class="container">
    <h3>Size</h3>
    <div class="input">
        <div class="width">
            <span>Width</span>
            <input type="text" bind:value={properties.width}>
        </div>
        <div class="height">
            <span>Height</span>
            <input type="text" bind:value={properties.height}>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../ui/variables.scss";

    .container {
        margin: 10px;

        h3 {
            user-select: none;
        }

        .input {
            margin: 10px 0 10px 0;
            display: flex;
            flex-direction: row;

            .width {
                margin-right: 5px;
                position: relative;

                span {
                    position: absolute;
                    left: 3px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: $inactive;
                }

                input {
                    padding-left: 50px;
                }
            }

            .height {
                margin-left: 5px;
                position: relative;

                span {
                    position: absolute;
                    left: 3px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: $inactive;
                }

                input {
                    padding-left: 50px;
                }
            }
        }
    }
</style>