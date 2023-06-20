<script>
    import { fly } from 'svelte/transition';

    let grade = null,
        lessonId = null
        

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    {#if (!grade && !lessonId)}
        <div class="gradeBlock">

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
</style>