<script>
    import { currentPage, user } from '../store/globalStore';

    
    const pageName = 'Main'

    localStorage.setItem('requestPage', pageName)
    
    if(!$user) {
        currentPage.set('Preview')
    }

</script>


<div class="wrapper">
    <h2>Добро пожаловать, {$user?.name}</h2>
    This is {pageName} Page
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>