<script>
    import { currentPage, goToPage, user } from '../store/globalStore';

    
    const pageName = 'MainTeacher'

    localStorage.setItem('requestPage', pageName)
    
    if(!$user) {
        goToPage('Preview')
    }

</script>


<div class="wrapper">
    <h2 class="title">Добро пожаловать, {$user.name}</h2>
    <p class="subtitle">Выберите раздел:</p>
    <div class="navigationGrid">
        <div class="nav Lessons">
            <div class="cardSvgBlock">
                <img class="cardSvg" src="./assets/svg/blackboard.svg" alt="">
            </div>
            <p class="navText">Уроки</p>
        </div>
        <div class="nav Practice">
            <div class="cardSvgBlock">
                <img class="cardSvg" src="./assets/svg/puzzle4.svg" alt="">
            </div>
            <p class="navText">Практика</p>
        </div>
        <div class="nav Materials">
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
    }
    .navText {
        color: var(--dark);
        font-size: 2.3rem;
    }

    @media screen and (max-width: 500px) {
        .navigationGrid {
            grid-template-columns: repeat(1, minmax(200px, 1fr));
        }
    }
</style>