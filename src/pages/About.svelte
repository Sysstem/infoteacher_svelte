<script>
    import Header from '../components/main/Header.svelte'
    import { currentPage } from '../store/globalStore';

    
    const pageName = 'About'

    if ($currentPage != pageName) currentPage.set(pageName)

</script>


<div>
    This is About Page
</div>


<style>

</style>