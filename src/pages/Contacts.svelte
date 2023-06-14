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
            <img class="contactSvg" src="./assets/svg/location-pin.svg" alt="Location">
        </div>
    </div>
    <div class="infoBlock">
        <div class="contactSvgWrapper">
            <img class="contactSvg" src="./assets/svg/location-pin.svg" alt="Location">
        </div>
        <p class="contactText">
            Наше представительство находится по адресу: Московская обл. г. Коломна, ул. Ленина, д. 67А
        </p>
    </div>
</div>


<style>
    .wrapper {
        padding: 0;
    }
    .infoBlock {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 300px;
    }
    .contactText {
        flex-basis: 70%;
        min-width: 70%;
        font-size: 1.2rem;
        padding: 10px 0 10px 15px;
    }
    .contactSvgWrapper {
        position: relative;
        flex-basis: 30%;
        height: 100%;
    }
    .contactSvg {
        max-height: 100%;
        position: relative;
        left: -15%;
    }
</style>