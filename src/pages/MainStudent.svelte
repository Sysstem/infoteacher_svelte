<script>
    import { currentPage, user } from '../store/globalStore';

    
    const pageName = 'MainTeacher'

    localStorage.setItem('requestPage', pageName)
    
    if(!$user) {
        goToPage('Preview')
    }

</script>


<div class="wrapper">
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