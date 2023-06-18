<script>
	import Preview from "./pages/Preview.svelte";
	import About from "./pages/About.svelte";
	import Pricing from "./pages/Pricing.svelte";
	import Contacts from "./pages/Contacts.svelte";
	import { fly, fade } from "svelte/transition";
	import { onDestroy } from "svelte";
	import { currentPage } from "./store/globalStore";
	import { pageNames } from "./store/globalStore";
  	import Header from "./components/main/Header.svelte";
  	import Login from "./pages/Login.svelte";
	import Profile from "./pages/Profile.svelte";
	import MainTeacher from "./pages/MainTeacher.svelte"
	import { user } from "./store/globalStore";
  	import MainStudent from "./pages/MainStudent.svelte";


	const pageNamesArray = $pageNames

	let currentPageName = '',
		testUser = localStorage.getItem('testUser'),
		requestPage = localStorage.getItem('requestPage');

	if(testUser) {
		user.set(JSON.parse(testUser))
		if(!requestPage) requestPage = 'Main'
	} else {
		if(!requestPage) requestPage = 'Preview'
	}

	currentPage.set(requestPage)
	
	const unsubscribeCurrentPage = currentPage.subscribe(value => {
		currentPageName = value
	});

	onDestroy(() => {
		unsubscribeCurrentPage()
	})

</script>

<main>
	<div class="mainContainer">
		<Header />
		<div class="pageWrapper">
			{#if currentPageName == pageNamesArray[1]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<Preview />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[0]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<MainTeacher />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[7]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<MainStudent />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[2]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<About />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[3]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<Pricing />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[4]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<Contacts />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[5]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<Login />
				</section>
			{/if}
			{#if currentPageName == pageNamesArray[6]}
				<section class="pageWrapperS" in:fly="{{delay: 350, y: 300, duration: 400}}" out:fade="{{duration: 400}}">
					<Profile />
				</section>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		height: 100%;
		width: 100%;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.mainContainer {
		position: relative;
		height: 100%;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	.pageWrapper {
		position: relative;
		width: 100%;
		flex-grow: 1;
	}
	.pageWrapperS {
		position: absolute;
		inset: 0;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>