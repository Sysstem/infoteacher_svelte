<script>

    import { fade, fly } from "svelte/transition";
    import { cubicOut, cubicIn } from 'svelte/easing'
    import { createEventDispatcher } from 'svelte';


    export let modalData = {
        title: 'Заголовок модального окна',
        info: 'Текст модального окна',
        confirm: 'OK',
        cancel: 'Отмена'
    }
    export let visibilityChange = null
    export let visibility = null

    const dispatch = createEventDispatcher();

    function closeThis() {
        visibilityChange()
    }
    function cancelClick() {
        console.log('cancel')
        closeThis()
    }
    function confirmClick() {
        dispatch('modalconfirm', {text: 'msg'})
        console.log('confirm')
        closeThis()
    }

</script>

{#if visibility}
    <div transition:fade class="modalBg">
        <div class="modal"
            in:fly="{{ delay: 100, y: 200, duration: 300, easing: cubicOut }}"
            out:fly="{{ y: 200, duration: 300, easing: cubicIn }}"
        >
            <div class="header">
                <p class="title">{modalData.title}</p>
                <img class="close" src="./assets/svg/cross.svg" alt="close" on:click={closeThis} on:keyup={closeThis}>
                <div class="line"></div>
            </div>
            <div class="main">
                <p class="text">{modalData.info}</p>
            </div>
            <div class="buttons">
                {#if modalData.cancel}
                    <div class="button cancel" on:click={cancelClick} on:keyup={cancelClick}>{modalData.cancel}</div>
                {/if}
                <div class="button ok" on:click={confirmClick} on:keyup={confirmClick}>{modalData.confirm}</div>
            </div>
        </div>
    </div>
{/if}



<style>
    .modalBg {
        position: fixed;
        top:0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(5px);
        z-index: 100;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal {
        position: relative;
        width: 90%;
        max-width: 500px;
        min-height: 150px;
        background-color: #fff;
        border-radius: 20px;
    }
    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
    }
    .title {
        font-size: 1.2rem;
        font-weight: 700;
    }
    .close {
        width: 20px;
    }
    .main {
        position: relative;
        padding: 20px;
    }
    .buttons {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px;
    }
    .button {
        padding: 10px 15px;
        border-radius: 10px;
        line-height: 12px;
        cursor: pointer;
        user-select: none;
    }
    .ok {
        background-color: var(--dark);
        color: white;
    }
    .cancel{
        background-color: var(--lightGray);
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