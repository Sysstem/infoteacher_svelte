<script>
    import LoadingSpinner from "./LoadingSpinner.svelte";
    import { createEventDispatcher } from "svelte";

    export let name = "Кнопка"
    export let loading = false
    export let disabled = false

    let dispatch = createEventDispatcher()

    function onBtnClick() {
        dispatch('btnclick')
    }

</script>


<button class="button" disabled='{disabled || loading}' on:click={onBtnClick}>
    <div class="btnText">
        {#if !loading}
            {name}
        {:else}
            <LoadingSpinner />
        {/if}
    </div>

</button>



<style>
    .button {
        width: 100%;
        max-width: 300px;
        background: none;
        border: 1px solid var(--dark);
        border-radius: 15px;
        padding: 10px 20px;

        transition: all .2s ease;
    }
    .button:hover {
        background-color: var(--dark);
        color: #fff;
    }
    .button:active {
        background-color: var(--semidark);
    }
    .button:disabled {
        background-color: #fff;
        color: #ccc;
        border: 1px solid #ccc;
    }
    .btnText {
        position: relative;
        height: 22px;
        line-height: 22px;
        font-size: 1.2rem;
        margin: 0;
    }
</style>