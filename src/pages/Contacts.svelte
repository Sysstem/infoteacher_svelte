<script>
    import Header from '../components/main/Header.svelte'
    import { currentPage } from '../store/globalStore';

    const pageName = 'Contacts'

    if ($currentPage != pageName) currentPage.set(pageName)

</script>


<div>
    This is Contacts Page
</div>


<style>

</style>