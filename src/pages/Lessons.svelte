<script>
    import { fly } from 'svelte/transition';
    import ActionRow from '../components/main/ActionRow.svelte';
    import Select from 'svelte-select';
    import { backHeader, changeHeader, errorMsg } from '../store/globalStore';
    import { gradesData, lessonsList, lessonsData } from '../store/gradesAndLessons'
  import Lesson from './Lesson.svelte';

    let chosenGrade = null,
        lessonId = null,
        lessons = null,
        lessonData = null,
// Послать запрос на сервер - получить список классов
        grades = gradesData;



        grades.sort((a, b) => a.gradeNum - b.gradeNum)

        function backToGrades() {
            chosenGrade = null
            lessons = null
            backHeader.set(null)
        }
        function backToLessons() {
            lessonId = null
            lessonData = null
            changeHeader('titledNav', 'Уроки')
            backHeader.set(backToGrades)
        }
        
        function gradeChoice(grade) {
            //Послать запрос на сервер - получить список уроков у выбранного класса
            lessons = lessonsList[grade.id]

            if(lessons) {
                chosenGrade = grade
                backHeader.set(backToGrades)
            } else {
                $errorMsg = {text: 'Для выбранного класса отсутствуют данные об уроках.', title: 'Нет данных'}
            }
        }
        function lessonChoice(lesson) {
            const id = `${lesson.classid}-${lesson.id}`

            lessonData = lessonsData.find(el => el.id == id)

            if(lessonData) {
                lessonId = id
                backHeader.set(backToLessons)
            } else {
                $errorMsg = {title: 'Нет данных', text: 'Для выбранного урока отсутствуют данные'}
            }

            
        }

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    {#if (!chosenGrade && !lessonId)}
        <div class="gradeBlock"
            in:fly="{{delay: 300, y: 200, duration: 300}}" 
            out:fly="{{duration: 300, y: 200}}"
        >
            <p class="pageTitle">Список ваших классов:</p>
            {#each grades as grade (grade.id)}
                <ActionRow 
                    title={grade.title}
                    svg={'./assets/svg/dot-circle.svg'}
                    onClick={() => gradeChoice(grade)}
                />
            {/each}
        </div>

    {:else if (chosenGrade && !lessonId)}
        <div class="lessonsBlock"
            in:fly="{{delay: 300, y: 200, duration: 300}}" 
            out:fly="{{duration: 300, y: 200}}"
        >
            <p class="pageTitle">{chosenGrade.title}</p>
            {#each lessons as lesson (lesson.id)}
                <ActionRow 
                    title={lesson.title}
                    number={lesson.lessonNumber}
                    onClick={() => lessonChoice(lesson)}
                />
            {/each}
        </div>
    {:else}
        <div class="lessonBlock"
            in:fly="{{delay: 300, y: 200, duration: 300}}"
            out:fly="{{duration: 300, y: 200}}"
        >
            <Lesson {lessonData} backFunction={backToLessons} />
        </div>
    {/if}
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding-top: 40px;
        overflow: auto;
    }
    .pageTitle {
        font-size: 1.5rem;
        padding: 20px 40px;
    }
    .gradeBlock, 
    .lessonsBlock {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
    }
    .lessonBlock {
        width: 100%;
        height: 100%;
    }
</style>