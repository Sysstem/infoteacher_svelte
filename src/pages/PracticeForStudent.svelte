<script>
    import { fly, fade } from 'svelte/transition';
    import { definitions, practiceList } from '../store/gradesAndLessons';
    import ActionRow from '../components/main/ActionRow.svelte';
    import { backHeader, changeHeader, goToPage, user } from '../store/globalStore';

    let searchValue = '',
        practiceListForStudent = practiceList.filter(el => $user.exercises.indexOf(el.pageName) != -1);
    

    function goToPractice(practice) {
        changeHeader('titledNav', practice.name)
        backHeader.set(() => {
            goToPage('Practice')
            changeHeader('menu', '')
        })
        goToPage(practice.pageName)
    }


</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    <div class="searchWrapper">
        <div class="search">
            <input class="input" type="text" bind:value={searchValue}>
            <img class="searchSvg" src="./assets/svg/search.svg" alt="">
        </div>
    </div>
    
    <div class="results">
        {#each practiceListForStudent as practice}
            {#if practice.name.toLowerCase().indexOf(searchValue.toLowerCase()) != -1}
                <ActionRow
                    title={practice.name}
                    svg={practice.svg}
                    onClick={() => {goToPractice(practice)}}
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