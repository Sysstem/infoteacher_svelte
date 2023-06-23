<script>
    import { errorMsg } from "../../store/globalStore";
    import { fly } from "svelte/transition";

    let message = null

    $: message = $errorMsg

    function closeThis() {
        $errorMsg = {title: '', text: '', type: ''}
    }

</script>

{#if message?.text || message?.title}
    <div transition:fly="{{y: -200, duration: 400}}" class="wrapper">
        <div class="msgBlock">
            <div class="titleBlock">
                <div class="title" style={message.type == 'error' ? 'color: var(--bad)' : message.type == 'good' ? 'color: var(--good)' : 'color: var(--dark)'}>{message.title || 'Внимание'}</div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img class="close" on:click={closeThis} src="./assets/svg/cross.svg" alt="Close">
            </div>
            <div class="line"></div>
            <div class="text">{message.text || 'Сообщение отсутствует'}</div>
        </div>
    </div>
{/if}
    


<style>
    .wrapper {
        position: fixed;
        top: 10px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;

        pointer-events: none;
        z-index: 100;
    }
    .msgBlock {
        width: 90%;
        max-width: 400px;
        min-height: 50px;
        border-radius: 15px;
        background-color: #FFFFFF;
        -webkit-box-shadow: 4px 4px 28px 5px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 4px 4px 28px 5px rgba(34, 60, 80, 0.2);
        box-shadow: 4px 4px 28px 5px rgba(34, 60, 80, 0.2);

        pointer-events: all;
    }
    .titleBlock {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
    }
    .close {
        width: 20px;
        cursor: pointer;
    }
    .title {
        font-size: 1.7rem;
        font-weight: bold;
    }
    .text {
        font-size: 1.2rem;
        padding: 15px 20px;
    }
    .line {
        width: 100%;
        border-bottom: 1px solid black;
        opacity: 0.1;
    }
</style>