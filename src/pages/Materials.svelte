<script>
    import { fly, fade } from 'svelte/transition';
    import { definitions } from '../store/gradesAndLessons';
    import InfoRow from '../components/main/InfoRow.svelte';

    let searchValue = ''

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    <div class="search">
        <input type="text" bind:value={searchValue}>
    </div>
    <div class="results">
        {#each Object.values(definitions) as def}
            {#if def.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1}
                <InfoRow
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
        padding-top: 40px;
        margin: 0 auto;
        overflow: auto;
    }
    .search {

        margin-bottom: 50px;
    }  
    .results {

    }  

</style>