<script>
    export let svg = ''
    export let title = 'Заголовок'
    export let info = 'Информация'

</script>


<div class="wrapper">
    <div class="content">
        {#if svg}
            <div class="svgWrapper">
                <img class="svg" src={svg} alt="svg">
            </div>
        {/if}
        <div class="data">
            <p class="title">{title}</p>
            <p class="info">{info}</p>
            <div class="line"></div>
        </div>
        
    </div>
</div>


<style>
    .wrapper {
        --svgWidth: 25px;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 0;
    }
    .content {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        padding: 0 0 0 20px;
    }
    .svgWrapper {
        width: var(--svgWidth);
        height: var(--svgWidth);
    }
    .svg {
        width: var(--svgWidth);
        height: var(--svgWidth);
    }
    .data {
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 5px;
        padding: 15px 20px 15px 0;
    }
    .title {
        font-size: 0.9rem;
        color: var(--semidark);
        line-height: 15px;
    }
    .info {
        font-size: 1.1rem;
        color: var(--dark);
        line-height: 15px;
    }
    .line {
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        border-bottom: 1px solid black;
        opacity: 0.1;
        
    }
</style>