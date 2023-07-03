<script>
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    
    const pageName = 'Preview';


     
</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    
    <div class="firstBlock">
        <p class="mainText">This is {pageName} Page</p>
    </div>
</div>


<style>
    .wrapper {
        height: 100%;
        width: 100%;
    }
    .mainText {
        position: absolute;
        bottom: 5%;
        left: 5%;
        font-size: 4rem;
        transition: all .3s ease;
    }
    .firstBlock {
        width: 100%;
        height: 100%;
    }
</style>