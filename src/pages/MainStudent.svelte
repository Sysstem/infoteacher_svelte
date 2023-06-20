<script>
    import { currentPage, user } from '../store/globalStore';
    import { fly, fade } from 'svelte/transition';

    
    const pageName = 'MainTeacher'

    localStorage.setItem('requestPage', pageName)
    
    if(!$user) {
        goToPage('Preview')
    }

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    <h2>Добро пожаловать, ученик {$user?.name}</h2>
    This is {pageName} Page
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding-top: 20px;
        font-size: 2rem;
    }
</style>