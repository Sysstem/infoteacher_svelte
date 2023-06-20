<script>
    import { fly } from 'svelte/transition';
    import ActionRow from '../components/main/ActionRow.svelte';

    let grade = null,
        lessonId = null,
        pageTitle = 'Список ваших классов:',
// Послать запрос на сервер - получить список классов
        grades = [
            {
                id: '5b2023',
                gradeNum: 5,
                title: '5а класс',
            },
            {
                id: '7a2023',
                gradeNum: 7,
                title: '7а класс',
            },
            {
                id: '7b2023',
                gradeNum: 7,
                title: '7б класс',
            },
            {
                id: '6b2023',
                gradeNum: 6,
                title: '6а класс',
            },

        ]

        grades.sort((a, b) => a.gradeNum - b.gradeNum)
        
        function gradeChoice(grade) {
            //Послать запрос на сервер - получить список уроков
            console.log(`Выбран ${grade.title}`)
        }

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    <p class="pageTitle">{pageTitle}</p>
    {#if (!grade && !lessonId)}
        <div class="gradeBlock">
            {#each grades as grade (grade.id)}
                <ActionRow 
                    title={grade.title}
                    svg={'./assets/svg/dot-circle.svg'}
                    onClick={() => gradeChoice(grade)}
                />
            {/each}
        </div>
    {:else if (grade && !lessonId)}
        <div class="lessonBlock">

        </div>
    {:else}
        <div class="idkBlock">

        </div>
    {/if}
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding-top: 40px;
    }
    .pageTitle {
        font-size: 1.5rem;
        padding: 20px 40px;
    }
    .gradeBlock {
        position: relative;
        max-width: 650px;
        margin: 0 auto;
    }
</style>