<script>
    import { fly, fade } from 'svelte/transition';
    import { definitions } from '../store/gradesAndLessons';
    import InfoRow_v2 from '../components/main/InfoRow_v2.svelte';

    let searchValue = ''

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    <div class="searchWrapper">
        <div class="search">
            <input class="input" type="text" bind:value={searchValue}>
            <img class="searchSvg" src="./assets/svg/search.svg" alt="">
        </div>
    </div>
    
    <div class="results">
        {#each Object.values(definitions) as def}
            {#if def.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1}
                <InfoRow_v2
                    title={def.title}
                    info={def.def}
                />
            {/if}
        {/each}
    </div>
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        max-width: 700px;
        margin: 0 auto;
        overflow: auto;
    }
    .searchWrapper {
        position: sticky;
        top: 0;
        background-color: white;
        padding: 20px;
        z-index: 10;
    }
    .search {
        width: 100%;
        max-width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 50px;
        background-color: var(--verylightGray);
        border-radius: 15px;
        margin: 0 auto;
        padding: 0 10px 0 20px;
    }
    .input {
        width: 100%;
        outline: none;
        border: none;
        background: transparent;
        height: 40px;
        padding: 0;
        margin: 0;
    }
    .searchSvg {
        width: 25px;
    }

</style>