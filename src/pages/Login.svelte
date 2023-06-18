<script>

    import Button from "../components/main/Button.svelte";
    import { currentPage, testUserT, testUserS, user, goToPage } from "../store/globalStore";
    import { onMount, onDestroy, createEventDispatcher } from "svelte/internal";

    const loginRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        minPasswordLength = 3,
        pageName = 'Login';

    //localStorage.setItem('requestPage', pageName)

    let buttonDisabled = true,
        loginValue,
        passwordValue,
        loginProcess,
        loginLabelElement,
        passwordLabelElement,
        inputLoginElement,
        loginValid = {
            valid: true,
            message: 'Ошибка',
            showMessage: false,
        };


    function loginSuccess() {
        console.log('Login Success')
        //get Data from server

        if(passwordValue.length >= 5) {
            user.set($testUserS)
            localStorage.setItem('testUser', JSON.stringify($testUserS))
            goToPage('MainStudent')
        } else {
            user.set($testUserT)
            localStorage.setItem('testUser', JSON.stringify($testUserT))
            goToPage('MainTeacher')
        }
    }

    function loginAttempt() {
        loginProcess = true
        console.log('loginAttempt')
        setTimeout(() =>{
            loginProcess = false
            loginSuccess()
        }, 1000)
    }

    function submitForm(event) {
        event.preventDefault()
        console.log('Login')
    }

    function isLoginValid() {
        if(loginRegExp.test(loginValue)) {
            loginValid.valid = true
            loginValid.showMessage = false
            inputLoginElement.style.borderColor = 'var(--dark)'
            return true
        } else {
            loginValid.valid = false
            return false
        }
    }

    function validateButton() {
        if(isLoginValid() && passwordValue?.length >= minPasswordLength) {
            buttonDisabled = false
            return true
        } else {
            buttonDisabled = true
            return false
        }
    }

    function loginInputFocusIn() {
        loginLabelElement.style.cssText = "top: -5px; left: 10px; font-size: 0.75rem;"
    }
    function loginInputFocusOut() {
        if(!loginValue) {
            loginLabelElement.style.cssText = ""
            loginValid.showMessage = false
            inputLoginElement.style.borderColor = 'var(--dark)'
            return
        }
        if(!isLoginValid()) {
            loginValid.message = 'Почта введена неверно'
            loginValid.showMessage = true
            inputLoginElement.style.borderColor = 'var(--bad)'
        }
    }
    function borderColorCheck() {
        if(loginValid.showMessage && !loginValid.valid) {
            console.log('bad')
            return 'border-color: var(--bad)'
        } else {
            console.log('not bad')
            return 'border-color: var(--dark)'
        }
    }

    function passwordInputFocusIn() {
        passwordLabelElement.style.cssText = "top: -5px; left: 10px; font-size: 0.75rem;"
    }
    function passwordInputFocusOut() {
        if(passwordValue > minPasswordLength) {

        }
        if(passwordValue) return
        passwordLabelElement.style.cssText = ""
    }

</script>


<div class="wrapper">
    <p class="loginPageTitle">Вход</p>
    <form class="loginForm" on:submit={submitForm}>
        <div class="inputWrapper">
            <input class="input login" 
                type="text"
                name="inputLogin"
                id="inputLogin"
                autocomplete="email"
                placeholder=""
                bind:value={loginValue}
                bind:this={inputLoginElement}
                on:input={validateButton}
                on:focusin={loginInputFocusIn}
                on:focusout={loginInputFocusOut}
            >
            <label for="inputLogin" class="inputLabel" bind:this={loginLabelElement}>Логин / Почта</label>
            {#if !loginValid.valid && loginValid.showMessage}
                <p class="errorMessage">{loginValid.message}</p>
            {/if}
        </div>
        <div class="inputWrapper">
            <input class="input password"
                type="password"
                name="inputPassword"
                id="inputPassword"
                placeholder=""
                bind:value={passwordValue}
                on:input={validateButton}
                on:focusin={passwordInputFocusIn}
                on:focusout={passwordInputFocusOut}
            >
            <label for="inputPassword" class="inputLabel" bind:this={passwordLabelElement}>Пароль</label>
        </div>
        <Button 
            name={"Войти"}
            loading={loginProcess}
            disabled={buttonDisabled}
            on:btnclick={loginAttempt}
        />
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
        gap: 40px;
    }
    .loginPageTitle {
        font-size: 4rem;
        font-weight: 700;
        margin: 15px;
        text-align: center;
    }
    .errorMessage{
        position: absolute;
        bottom: -10px;
        left: 10px;
        height: 10px;
        font-size: 0.95rem;
        color: var(--bad);
    }
    .inputWrapper {
        position: relative;
        width: 100%;
        max-width: 320px;
    }
    .inputLabel {
        position: absolute;
        font-size: 1.2rem;
        line-height: 10px;
        top: 40%;
        left: 15px;
        color: var(--semidark);

        transition: all .2s ease;
    }
    .input {
        outline: none;
        width: 100%;
        max-width: 320px;
        border: none;
        border-bottom: 2px solid var(--dark);
        font-size: 1.2rem;
        margin: 0;

        transition: all .3s ease;
    }
</style>