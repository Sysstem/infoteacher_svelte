<script>

    import { testUserT } from "../store/globalStore";

    const pageName = 'Contacts'

</script>


<div class="wrapper">
    <div class="infoBlock">
        <p class="contactText">
            Наше представительство находится по адресу: Московская обл. г. Коломна, ул. Ленина, д. 67А
        </p>
        <div class="contactSvgWrapper">
            <img class="contactSvg svgRight" src="./assets/svg/location-pin.svg" alt="Location">
        </div>
    </div>
    <div class="infoBlock">
        <div class="contactSvgWrapper">
            <img class="contactSvg svgLeft" src="./assets/svg/phone.svg" alt="Location">
        </div>
        <p class="contactText">
            Телефон поддержки: +7(465)444-21-21
        </p>
    </div>
    <div class="infoBlock">
        <p class="contactText centered">
            Telegram
        </p>
        <div class="contactSvgWrapper">
            <img class="contactSvg svgRight" src="./assets/svg/telegram.svg" alt="Telegram">
        </div>
    </div>
    <div class="infoBlock">
        <div class="contactSvgWrapper">
            <img class="contactSvg svgLeft" src="./assets/svg/vk.svg" alt="VK">
        </div>
        <p class="contactText centered">
            VK
        </p>
    </div>
</div>


<style>
    .wrapper {
        padding: 20px 0 0 0;
    }
    .infoBlock {
        display: flex;
        justify-content: center;
        gap: 20px;
        align-items: center;
        width: 100%;
    }
    .contactText {
        flex-basis: 70%;
        max-width: 400px;
        font-size: 1.2rem;
        padding: 10px 0 10px 15px;
    }
    .contactSvgWrapper {
        position: relative;
        flex-basis: 30%;
        max-width: 30%;
        height: 100%;
    }
    .contactSvg {
        height: 400px;
    }
    .svgLeft {
        float: right;
        position: relative;
        right: -30px;
    }
    .svgRight {
        position: relative;
        left: -50px;
    }
    .centered {
        width: 100%;
        text-align: center;
    }

    @media screen and (max-width: 500px) {
        .contactSvg {
            height: 300px;
        }
    }
    @media screen and (max-width: 370px) {
        .contactSvg {
            height: 250px;
        }
    }
</style>