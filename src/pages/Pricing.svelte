<script>
    import { fly, fade } from 'svelte/transition';
    
    const pageName = 'Pricing'

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    This is {pageName} Page
</div>


<style>
    .wrapper {
        padding: 20px;
        font-size: 2.5rem
    }
</style>