<script>

    export let name = "Кнопка"
    export let loading = false

    function onBtnClick() {
        loading = true
        setTimeout(() => {
            loading = false
        }, 2000)
    }

</script>


<button class="button" on:click={onBtnClick}>
    <div class="btnText">
        {#if !loading}
            {name}
        {:else}
            <img width="22" src="./assets/img/loading2.gif" alt="">
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
    }
    .btnText {
        height: 22px;
        line-height: 22px;
        font-size: 1.2rem;
        margin: 0;
    }
</style>