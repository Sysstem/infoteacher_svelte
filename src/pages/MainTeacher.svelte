<script>
    import { goToPage, user, changeHeader } from '../store/globalStore';
    import { fly, fade } from 'svelte/transition';
    
    function sectionChoice(pageName, title = '') {
        goToPage(pageName)
        changeHeader(title ? 'titledNav' : 'nav', title)
    }
</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400, y: 400}}" class="wrapper">
    <h2 class="title">Добро пожаловать, {$user.name}</h2>
    <p class="subtitle">Выберите раздел:</p>
    <div class="navigationGrid">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="nav Lessons" on:click={() => sectionChoice('Lessons', 'Уроки')}>
            <div class="cardSvgBlock">
                <img class="cardSvg" src="./assets/svg/blackboard.svg" alt="">
            </div>
            <p class="navText">Уроки</p>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="nav Practice" on:click={() => goToPage('Practice')}>
            <div class="cardSvgBlock">
                <img class="cardSvg" src="./assets/svg/puzzle4.svg" alt="">
            </div>
            <p class="navText">Практика</p>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="nav Materials" on:click={() => goToPage('Materials')}>
            <div class="cardSvgBlock">
                <img class="cardSvg" src="./assets/svg/books.svg" alt="">
            </div>
            <p class="navText">Материалы</p>
        </div>
    </div>
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding-top: 40px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .title {
        font-size: 3rem;
        padding: 20px;
    }
    .subtitle {
        font-size: 2rem;
        padding: 20px;
    }
    .navigationGrid {
        position: relative;
        width: 85%;
        max-width: 800px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(2, minmax(200px, 1fr));
        gap: 5%;

        padding: 20px;
    }
    .cardSvgBlock {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
    .cardSvg {
        width: 80%;
    }
    .nav {
        border-radius: 20px;
        font-size: 1.5rem;
        aspect-ratio: 1/1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        -webkit-box-shadow: 4px 4px 28px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 4px 4px 28px 0px rgba(34, 60, 80, 0.2);
        box-shadow: 4px 4px 28px 0px rgba(34, 60, 80, 0.2);
        cursor: pointer;

        transition: background-color .3s ease;
    }
    .nav:hover {
        background-color: #eeeeee;
    }
    .navText {
        color: var(--dark);
        font-size: 2.3rem;
    }

    @media screen and (max-width: 500px) {
        .navigationGrid {
            grid-template-columns: repeat(1, minmax(200px, 1fr));
            width: 100%;
        }
    }
</style>