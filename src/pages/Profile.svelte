<script>
    import { fly, fade } from 'svelte/transition';
    import InfoRow from '../components/main/InfoRow.svelte';
    import ActionRow from '../components/main/ActionRow.svelte';
    import { currentPage, user } from '../store/globalStore';
    import { onDestroy } from 'svelte/internal';

    

    let exit = false,
        confirmData = {
            title: 'Выход из аккаунта',
            info: 'Вы действительно хотите выйти из аккаунта?',
            confirm: 'Выйти',
            cancel: 'Отмена'
        };

    function exitFromAccount() {
        localStorage.setItem('testUser', '')
        localStorage.setItem('requestPage', 'Preview')
        currentPage.set('Preview')
        exit = true
    }

    onDestroy(() => {
        if(exit) {
            user.set(null)
        }
    })

    function transformCategory(category) {
        switch(category) {
            case 'teacher': 
                return 'Учитель'
            case 'student':
                return 'Ученик'
            case 'admin':
                return 'Администратор'
            default:
                return 'Гость'
        }
    }

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
    <InfoRow 
        svg={'./assets/svg/profile_onecolor.svg'}
        title={'Имя'}
        info={$user.name + ' ' + $user.surname}
    />
    <InfoRow 
        svg={'./assets/svg/at.svg'}
        title={'E-mail'}
        info={$user.email}
    />
    <InfoRow 
        svg={'./assets/svg/hat.svg'}
        title={'Тип профиля'}
        info={transformCategory($user.category)}
    />
    <InfoRow 
        svg={'./assets/svg/at.svg'}
        title={'E-mail'}
        info={$user.email}
    />
    <ActionRow 
        svg={'./assets/svg/exit.svg'}
        title={'Выход'}
        color={'var(--bad)'}
        confirmData={confirmData}
        on:modalconfirm={exitFromAccount}
    />
</div>


<style>
    .wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        padding-top: 20px;
    }
</style>