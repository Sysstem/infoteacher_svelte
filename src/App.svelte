<script>
// Components
  	import Header from "./components/main/Header.svelte";
  	import Message from "./components/main/Message.svelte";

// Svelte
	import { fly, fade } from "svelte/transition";
	import { onDestroy } from "svelte";

// Stores
	import { user, currentPage } from "./store/globalStore";
	import { routing } from "./store/routing"

	let currentPageName = '',
		testUser = localStorage.getItem('testUser'),
		requestPage = localStorage.getItem('requestPage'),
		pages = null;

	if(testUser) {
		user.set(JSON.parse(testUser))
		if(!requestPage) {
			requestPage = $user?.category == 'teacher' ? 'MainTeacher' : $user?.category == 'student' ? 'MainStudent' : 'Preview'
		}
	} else {
		if(!requestPage) requestPage = 'Preview'
	}

	currentPage.set(requestPage)
	
	const unsubscribeCurrentPage = currentPage.subscribe(value => {
		currentPageName = value
	});

	const unsubscribeRouting = routing.subscribe(value => {
		pages = value
	});


	onDestroy(() => {
		unsubscribeCurrentPage()
	})

</script>

<main>
	<div class="mainContainer">
		<Message />
		<Header />
		<div class="pageWrapper">
			<section class="pageWrapperS">
				<svelte:component this={pages[currentPageName]} />
			</section>
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
		overflow-y: hidden;
		overflow-x: hidden;
	}
</style>