<script>
	import { fly } from 'svelte/transition';
	import ActionRow from '../components/main/ActionRow.svelte';
	import { backHeader, errorMsg, goToPage, changeHeader } from '../store/globalStore';
	import { gradesData, lessonsList, lessonsData, definitions } from '../store/gradesAndLessons'
	import InfoRow_v2 from '../components/main/InfoRow_v2.svelte';

	export let lessonData = null;
	export let backFunction = () => {};

	let nav = true,
		defs = false;

	changeHeader('titledNav', lessonData.title, true)


	function backToLessonNav() {
		nav = true
		defs = false
		backHeader.set(backFunction)
	}


	function sectionChoice() {
		nav = false
		backHeader.set(backToLessonNav)
	}

	function showDefs() {
		nav = false
		defs = true
		backHeader.set(backToLessonNav)
	}

</script>

<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapperoutside">
{#if nav}
	<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
		<div class="navigationGrid">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="nav Lessons" on:click={() => sectionChoice()}>
				<div class="cardSvgBlock">
					<img class="cardSvg" src="./assets/svg/learn.svg" alt="">
				</div>
				<p class="navText">Материал урока</p>
			</div>
			<a href="./assets/files/computer.pptx">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="nav Materials" on:click={() => {$errorMsg = {title: 'Загрузка презентации', text: 'Презентация загружается на ваш компьютер.'}}}>
					<div class="cardSvgBlock">
						<img class="cardSvg" src="./assets/svg/presentation_dwnl.svg" alt="">
					</div>
					<p class="navText">Скачать презентацию</p>
				</div>
			</a>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="nav Practice" on:click={() => goToPage('Practice')}>
				<div class="cardSvgBlock">
					<img class="cardSvg" src="./assets/svg/puzzle4.svg" alt="">
				</div>
				<p class="navText">Практика</p>
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="nav Practice" on:click={() => showDefs()}>
				<div class="cardSvgBlock">
					<img class="cardSvg" src="./assets/svg/books.svg" alt="">
				</div>
				<p class="navText">Определения</p>
			</div>
		</div>
	</div>
{:else if !defs}
	<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
		<div class="lessonWrap">
			{#each lessonData.material as data}
					{#if data.type == 'text'}
						<p class="text">
							{@html data.data}
						</p>
					{:else if data.type == 'img'}
						<div class="imgContainer">
							<img class="lessonImg" src={data.data} alt="">
						</div>
					{/if}
			{/each}
		</div>
	</div>
{:else}
<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
	<div class="defsWrap">
		{#each lessonData.definitions as def}
            {#if definitions[def]}
                <InfoRow_v2
                    title={definitions[def].title}
                    info={definitions[def].def}
                />
            {/if}
        {/each}
	</div>
</div>
{/if}
</div>
<style>
	.wrapperoutside {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	.wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		overflow: auto;
	}
	.imgContainer {
		position: relative;
		height: auto;
		width: 1000px;
		height: 650px;
		padding: 20px;
		margin: 0 auto;
		overflow: hidden;
	}
	.lessonImg {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.text {
		display: block;
		font-size: 1.45rem;
		text-indent: 1.5em;
		max-width: 850px;
	}
	.lessonWrap {
		display: flex;
		flex-direction: column;
		gap: 30px;
		align-items: center;
	}
	.title {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
		text-align: center;
		font-size: 1.6rem;
		font-weight: bold;
		padding: 0 20px 20px 20px;
	}
	.navigationGrid {
		position: relative;
		width: 85%;
		max-width: 800px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		gap: 5%;

		padding: 20px;
	}
	.cardSvgBlock {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
	}
	.cardSvg {
		width: 80%;
	}
	.nav {
		height: 100%;
		width: 100%;
		border-radius: 20px;
		font-size: 1.5rem;
		aspect-ratio: 1/1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 20px;
		-webkit-box-shadow: 4px 4px 28px 0px rgba(34, 60, 80, 0.2);
		-moz-box-shadow: 4px 4px 28px 0px rgba(34, 60, 80, 0.2);
		box-shadow: 4px 4px 28px 0px rgba(34, 60, 80, 0.2);
		cursor: pointer;

		transition: background-color .3s ease;
	}
	.nav:hover {
		background-color: #eeeeee;
	}
	.navText {
		color: var(--dark);
		font-size: 2.3rem;
	}

	@media screen and (max-width: 500px) {
		.navigationGrid {
			grid-template-columns: repeat(1, minmax(200px, 1fr));
			width: 100%;
		}
	}
</style>