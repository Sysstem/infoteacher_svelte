<script>

    import Modal from "./Modal.svelte";


    export let svg = ''
    export let number = 0
    export let title = 'Заголовок'
    export let color = 'var(--dark)'
    export let confirmData = null
    export let onClick = () => {
        console.log('clickOnThat')
    }

    let isModalVisible = false


    function showConfirmModal() {
        isModalVisible = !isModalVisible
    }

    function rowClickHandle() {
        if(confirmData) {
            showConfirmModal()
        } else {
            onClick()
        }
    }

</script>


<div class="wrapper">
    <div class="content" on:click={rowClickHandle} on:keyup={rowClickHandle}>
        {#if svg}
            <div class="svgWrapper">
                <img class="svg" src={svg} alt="svg">
            </div>
        {:else if number}
            <p class="number">{number}</p>
        {/if}
        <div class="data">
            <p style="font-size: 1.1rem; color: {color}">{title}</p>
            <img class="svg" src="./assets/svg/arrow_right.svg" alt="arrow">
            <div class="line"></div>
        </div>
        
    </div>
</div>

<Modal 
    modalData={confirmData}
    visibilityChange={showConfirmModal}
    visibility={isModalVisible}
    on:modalconfirm
/>


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

        cursor: pointer;
    }
    .number {
        display: block;
        min-width: 25px;
        font-size: 25px;
        font-weight: bold;
    }
    .svgWrapper {
        width: var(--svgWidth);
        height: var(--svgWidth);
    }
    .svg {
        width: var(--svgWidth);
        height: var(--svgWidth);
        color: var(--bad);
    }
    .data {
        position: relative;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 65px;
        gap: 5px;
        padding: 15px 20px 15px 0;
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