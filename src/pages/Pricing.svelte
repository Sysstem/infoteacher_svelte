<script>
    import Header from '../components/main/Header.svelte'
    import { currentPage } from '../store/globalStore';

    
    const pageName = 'Pricing'

    if ($currentPage != pageName) currentPage.set(pageName)

</script>


<div>
    This is Pricing Page
</div>


<style>

</style>