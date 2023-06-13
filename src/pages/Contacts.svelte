<script>

    import { testUserT } from "../store/globalStore";

    const pageName = 'Contacts'

</script>


<div class="wrapper">
    This is {pageName} Page
    <br><br>
    email: {$testUserT.email}
    <br><br>
    name: {$testUserT.name}
</div>


<style>
    .wrapper {
        padding: 20px;
        font-size: 2.5rem
    }
</style>