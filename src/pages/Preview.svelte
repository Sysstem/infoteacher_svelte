<script>
    import Header from '../components/main/Header.svelte'
    import { currentPage } from '../store/globalStore';

    
    const pageName = 'Preview'

    if ($currentPage != pageName) currentPage.set(pageName)

</script>


<div>
    This is Main (Preview) Page
</div>


<style>

</style>