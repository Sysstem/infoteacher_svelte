<script>

    import Button from "../components/main/Button.svelte";


    function submitForm(event) {
        event.preventDefault()
        console.log('Login')
    }
</script>


<div class="wrapper">
    <p class="loginPageTitle">Вход</p>
    <form class="loginForm" on:submit={submitForm}>
        <input class="input login" type="text" placeholder="Логин">
        <input class="input password" type="password" placeholder="Пароль">
        <Button name={"Войти"} />
        <!-- <button type="submit">Войти</button> -->
    </form>
</div>


<style>
    .wrapper {
        width: 100%;
        height: 100%;
    }
    .loginForm {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .loginPageTitle {
        font-size: 4rem;
        font-weight: 700;
        margin: 15px;
        text-align: center;
    }
    .input {
        outline: none;
        width: 100%;
        max-width: 320px;
        border: none;
        border-bottom: 3px solid var(--dark);
        font-size: 1.2rem;
        margin-bottom: 35px;

        transition: all .3s ease;
    }
    .input:focus {
        border-bottom: 3px solid var(--greenHover);
    }
    .login {
    }
</style>