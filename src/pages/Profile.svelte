<script>
    import Header from '../components/main/Header.svelte'
    import InfoRow from '../components/main/InfoRow.svelte';
    import ActionRow from '../components/main/ActionRow.svelte';
    import { currentPage, user, pageNames } from '../store/globalStore';
    import { onDestroy } from 'svelte/internal';

    
    const pageName = 'Profile';

    localStorage.setItem('requestPage', pageName)

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

</script>


<div>
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
        svg={'./assets/svg/profile_onecolor.svg'}
        title={'Имя1234'}
        info={$user.name + ' ' + $user.surname}
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

</style>