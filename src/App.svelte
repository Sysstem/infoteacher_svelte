<script>
	import Preview from "./pages/Preview.svelte";
	import About from "./pages/About.svelte";
	import Pricing from "./pages/Pricing.svelte";
	import Contacts from "./pages/Contacts.svelte";
	import { onDestroy } from "svelte";
	import { currentPage } from "./store/globalStore";
	import { pageNames } from "./store/globalStore";
  import Header from "./components/main/Header.svelte";

	let currentPageName = ''
	const pageNamesArray = $pageNames

	currentPage.set(pageNamesArray[1])
	const unsubscribeCurrentPage = currentPage.subscribe(value => {
		currentPageName = value
	});

	onDestroy(() => {
		unsubscribeCurrentPage()
	})

</script>

<main>
	<div class="container mainContainer">
		<Header/>
		{#if currentPageName == pageNamesArray[1]}
			<Preview />
		{/if}
		{#if currentPageName == pageNamesArray[2]}
			<About />
		{/if}
		{#if currentPageName == pageNamesArray[3]}
			<Pricing />
		{/if}
		{#if currentPageName == pageNamesArray[4]}
			<Contacts />
		{/if}
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