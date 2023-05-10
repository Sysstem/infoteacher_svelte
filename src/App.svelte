<script>
	import Main from "./pages/Main.svelte";

	export let name;
</script>

<main>
	<div class="container">
		<Main />
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
</style>