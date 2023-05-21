<script>
    import Header from '../components/main/Header.svelte'
    import { currentPage } from '../store/globalStore';

    
    const pageName = 'Preview';

    localStorage.setItem('requestPage', pageName)

</script>


<div>
    This is Main (Preview) Page
</div>


<style>

</style>