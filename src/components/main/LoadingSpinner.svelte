<script>
    
    export let w = 'auto';
    export let percent = false;

    if(w != 'auto') {
        w += percent ? '%' : 'px'
    }
</script>

<div class="wrapper" style={'width:' + w}>
    <div class="spinner"></div>
</div>
    

<style>
    .wrapper {
        position: relative;
        margin: 0 auto;
        max-width: 100%;
        max-height: 100%;
        aspect-ratio: 1/1;
    }
    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
    
    .spinner:before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        aspect-ratio: 1/1;
        margin-top: -10px;
        margin-left: -10px;
        border-radius: 50%;
        border: 2px solid #ccc;
        border-top-color: #000;
        animation: spinner .6s linear infinite;
    }
</style>
