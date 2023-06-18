<script>
	import { each, onMount } from "svelte/internal";
	import { fade } from "svelte/transition";
	import { currentPage, pageNames, user, previousPage, goToPage, phoneNumber } from "../../store/globalStore"
	import Modal from "./Modal.svelte";

	export let logoElementTransform = 0;


	const pageNamesArray = $pageNames;

	let navItemsForGuest = [
			{
				id: 1,
				title: 'Превью',
				pageName: pageNamesArray[1],
			},
			{
				id: 3,
				title: 'О сервисе',
				pageName: pageNamesArray[2], //About
			},
			{
				id: 2,
				title: 'Цены',
				pageName: pageNamesArray[3], // Pricing
			},
			{
				id: 4,
				title: 'Контакты',
				pageName: pageNamesArray[4], // Contacts
			}
		],
		navItemsForTeacher = [
			{
				id: 1,
				title: 'Главная',
				pageName: pageNamesArray[0], // Main
			},
			{
				id: 3,
				title: '2',
				pageName: pageNamesArray[2],
			},
			{
				id: 2,
				title: '3',
				pageName: pageNamesArray[3],
			},
			{
				id: 4,
				title: '4',
				pageName: pageNamesArray[4],
			}
		],
		navItemsForStudent = [
			{
				id: 1,
				title: 'Главная',
				pageName: pageNamesArray[0],
			},
			{
				id: 3,
				title: '2ss',
				pageName: pageNamesArray[2],
			},
			{
				id: 2,
				title: '3ss',
				pageName: pageNamesArray[3],
			},
			{
				id: 4,
				title: '4ss',
				pageName: pageNamesArray[4],
			}
		],
		navItems = navItemsForGuest,
		modalData = {
			title: 'Телефон',
			info: 'Наш телефон: ' + $phoneNumber,
			confirm: 'OK'
		},
		isModalVisible = false,
		logoPath = './assets/svg/Logo_dark.svg',
		isNavOpen = false,
		responsiveBorder = 700,
		mobileVersion = window.innerWidth < responsiveBorder,
		navElement,
		headerElement,
		logoElement,
		currentPageName = $currentPage;

	onMount(() => {
		logoElement = document.querySelector('.logo')
	})

	currentPage.subscribe(value => {
		currentPageName = value
	});

	$: isNavListVisible = currentPageName != 'Login'
	$: navItems = 
		$user?.category == 'teacher'
		? navItemsForTeacher
		: $user?.category == 'student'
		? navItemsForStudent
		: navItemsForGuest;
	
		
	function showConfirmModal() {
		isModalVisible = !isModalVisible
	}

	function windowResize() {
		mobileVersion = window.innerWidth < responsiveBorder;
		if (!isNavListVisible) {
			const headerWidth = headerElement.clientWidth,
				paddingOffset = parseFloat(window.getComputedStyle(headerElement).getPropertyValue('padding-left'));
			logoElementTransform = headerWidth/2 - logoElement.clientWidth/2 - paddingOffset

			return
		}
		if(!mobileVersion) {
			navElement.style.left = '0'
			isNavOpen = true
		} else {
			let firstLine = document.querySelector('#firstLine'),
				secondLine = document.querySelector('#secondLine'),
				thirdLine = document.querySelector('#thirdLine');
			if (isNavOpen) {
				navElement.style.left = 'calc(100% + 35px)'
				secondLine.style.opacity = '1'
				firstLine.setAttribute('d', 'M5 7H15')
				thirdLine.setAttribute('d', 'M5 17H12')
				firstLine.style.transform = 'rotate(0deg)'
				thirdLine.style.transform = 'rotate(0deg)'
				isNavOpen = false
			}
		}
	}
	window.onresize = windowResize

	function goToLoginPage() {
		goToPage('Login')
		if(!logoElementTransform) {
			const headerWidth = headerElement.clientWidth,
				paddingOffset = parseFloat(window.getComputedStyle(headerElement).getPropertyValue('padding-left'));
				
			logoElementTransform = headerWidth/2 - logoElement.clientWidth/2 - paddingOffset
		}
		
	}
	function goToProfilePage() {
		if(currentPageName != 'Profile')
			goToPage('Profile')
		else
			goToPage($previousPage || navItems[0].pageName)
	}

	function loginBtnClick() {
		if(!$user) {
			goToLoginPage() 
		}
		else {
			goToProfilePage()
		}
	}

	function onLogoClick() {
		goToPage(navItems[0].pageName)
	}

	function onNavBurgerClick() {
		let firstLine = document.querySelector('#firstLine'),
			secondLine = document.querySelector('#secondLine'),
			thirdLine = document.querySelector('#thirdLine');
		if (isNavOpen) {
			navElement.style.left = 'calc(100%)'
			secondLine.style.opacity = '1'
			firstLine.setAttribute('d', 'M5 7H15')
			thirdLine.setAttribute('d', 'M5 17H12')
			firstLine.style.transform = 'rotate(0deg)'
			thirdLine.style.transform = 'rotate(0deg)'

		} else {
			navElement.style.left = '0'
			secondLine.style.opacity = '0'
			firstLine.setAttribute('d', 'M5 7H20')
			thirdLine.setAttribute('d', 'M5 17H20')
			firstLine.style.transform = 'rotate(45deg)'
			thirdLine.style.transform = 'rotate(-45deg)'
		}
		isNavOpen = !isNavOpen
	}
	
	$: calculateLogoPos = currentPageName != 'Login' ? 0 : logoElementTransform;
</script>


<div class="wrapper">
	<div class="header" bind:this={headerElement}>
		<div class="logo" 
			style="transform: translateX({calculateLogoPos}px)"
			on:click={onLogoClick} 
			on:keyup={onLogoClick}
		>
			<img class="logoSvg" src={logoPath} alt="Logo">
		</div>

		{#if currentPageName != 'Login'}
			<nav transition:fade class="nav" bind:this={navElement}>
				<ul class="navList">
					{#each navItems as item, index (item.id)}
						<li class={'navItem ' + (item.pageName == currentPageName ? 'chosen' : '')} 
							on:click={() => {goToPage(item.pageName); if(mobileVersion) onNavBurgerClick()}}
							on:keyup={() => {goToPage(item.pageName); if(mobileVersion) onNavBurgerClick()}}
						>
							{item.title}
						</li>
					{/each}
				</ul>
				{#if mobileVersion}
					<div class="navSidebarInfoBlock">
						<img class="logoSvgNav" src={logoPath} alt="Logo">
						<div class="linksBlock">
							<a href="https://telegram.org" class="socialLink">
								<img class="socialLinkSvg" src="./assets/svg/telegram.svg" alt="Telegram">
							</a>
							<a href="https://vk.com" class="socialLink">
								<img class="socialLinkSvg" src="./assets/svg/vk.svg" alt="VK">
							</a>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div on:click={showConfirmModal} class="socialLink">
								<img class="socialLinkSvg" src="./assets/svg/phone2.svg" alt="Phone">
							</div>
							
						</div>
					</div>
				{/if}
			</nav>
		{/if}
		{#if currentPageName != 'Login'}
			<div transition:fade class="loginBtn {currentPageName == 'Profile' ? 'loginBtnProfile' : ''}" on:click={loginBtnClick} on:keyup={loginBtnClick}>
				<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path class="path {currentPageName == 'Profile' ? 'loginBtnSvgProfile' : ''}" stroke="#292D32" opacity="0.4" d="M12.1605 10.87C12.0605 10.86 11.9405 10.86 11.8305 10.87C9.45055 10.79 7.56055 8.84 7.56055 6.44C7.56055 3.99 9.54055 2 12.0005 2C14.4505 2 16.4405 3.99 16.4405 6.44C16.4305 8.84 14.5405 10.79 12.1605 10.87Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path class="path {currentPageName == 'Profile' ? 'loginBtnSvgProfile' : ''}" stroke="#292D32" d="M7.1607 14.56C4.7407 16.18 4.7407 18.82 7.1607 20.43C9.9107 22.27 14.4207 22.27 17.1707 20.43C19.5907 18.81 19.5907 16.17 17.1707 14.56C14.4307 12.73 9.9207 12.73 7.1607 14.56Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				{#if !mobileVersion}
					{#if $user}
						<p>Профиль</p>
					{:else}
						<p>Вход / <br>Регистрация</p>
					{/if}	
				
				{/if}
			</div>
		{/if}
		{#if currentPageName != 'Login'}
			<div transition:fade class="showNavBtn" on:click={onNavBurgerClick} on:keyup={onNavBurgerClick}>
				<!-- <img width="40" src="./assets/svg/burger.svg" alt="Burger"> -->
				<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path id="firstLine" class="burgerLine" d="M5 7H15" stroke="#3d3d3d" stroke-width="2" stroke-linecap="round"/>
					<path id="secondLine" class="burgerLine" d="M5 12H18" stroke="#3d3d3d" stroke-width="2" stroke-linecap="round"/>
					<path id="thirdLine" class="burgerLine" d="M5 17H12" stroke="#3d3d3d" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</div>
		{/if}
	</div>
	<div class="bottomGrad">

	</div>
</div>

<Modal 
    modalData={modalData}
    visibilityChange={showConfirmModal}
    visibility={isModalVisible}
	on:modalconfirm
/>


<style>

	.wrapper {
		width: 100%;
		z-index: 15;
		position: relative;
	}

	.header {
		position: relative;
		width: 100%;
		padding: 20px 20px 0 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 10;
	}

	.bottomGrad {
		position: absolute;
		bottom: -20px;
		left: 0;
		height: 20px;
		width: 100%;
		background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);

		z-index: 5;
	}
	.path {
		transition: stroke .3s ease;
	}
	.burgerLine {
		transition: all .3s ease;
		transform-origin: 50% 50%;
		transform: rotate(0deg);
	}
	#firstLine {
		transform-origin: 20% 25%;
	}
	#thirdLine {
		transform-origin: 20% 75%;
	}
	.loginBtn {
		height: 45px;
		border: 1px solid var(--dark);
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px 10px;
		cursor: pointer;

		transition: background-color .3s ease, color .3s ease;
	}
	@media(hover: hover) {
		.loginBtn:hover .path {
			background-color: var(--dark);
			stroke: #FFFFFF;
		}
		.loginBtn:hover {
			background-color: var(--dark);
			color: #FFFFFF;
		}
		.navItem:hover:after {
			width: 100%;
			left: 0;
			-webkit-box-shadow: 0px 11px 66px 9px rgba(112, 159, 18, 0.2);
			-moz-box-shadow: 0px 11px 66px 9px rgba(112, 159, 18, 0.2);
			box-shadow: 0px 11px 66px 9px rgba(112, 159, 18, 0.3);
		}
	}
	
	.loginBtnProfile {
		background-color: var(--dark);
		color: #FFFFFF;
	}
	.loginBtnSvgProfile {
		stroke: #FFFFFF;
	}
	.logo {
		cursor: pointer;

		transition: transform .5s ease-in-out;
	}
	.logoSvg {
		max-height: 80px;
	}
	.logoSvgNav {
		max-height: 160px;
	}

	.nav {
		position: relative;
		left: 0;
		min-width: 60%;
		padding: 0 20px;
		user-select: none;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		transition: left .4s ease-in-out;
	}
	.navSidebarInfoBlock {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		gap: 60px;
	}
	.linksBlock {
		width: 100%;
		display: flex;
		gap: 15px;
		justify-content: center;
	}
	.socialLink {
		border-radius: 50%;
		width: 45px;
		height: 45px;
		border: 1px solid var(--dark);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.socialLinkSvg {
		width: 30px;
	}

	.showNavBtn {
		display: none;
		width: 40px;
		height: 40px;
		z-index: 50;
	}

	.navList {
		list-style: none;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding-inline-start: 0;
	}

	.navItem {
		position: relative;
		display: block;
		font-size: 1.1rem;
		cursor: pointer;
		padding: 5px 0;
	}

	.navItem:after {
		display: block;
		position: absolute;
		left: 50%; /*изменить на right:0;, чтобы изменить направление подчёркивания */
		bottom: 0;
		width: 0;/*задаём длинну линии до наведения курсора*/
		height: 2px; /*задаём ширину линии*/
		background-color: var(--greenHover); /*задаём цвет линии*/
		content: "";
		box-shadow: none;

		transition: width .3s ease, left .3s ease, box-shadow 0.3s ease; /*задаём время анимации*/
	}

	.chosen:after {
		display: block;
		position: absolute;
		left: 0; /*изменить на right:0;, чтобы изменить направление подчёркивания */
		width: 100%;/*задаём длинну линии до наведения курсора*/
		height: 2px; /*задаём ширину линии*/
		background-color: var(--greenActive); /*задаём цвет линии*/
		content: "";
		transition: width 0.3s ease-out; /*задаём время анимации*/
	}

	@media screen and (max-width: 700px) {
		.nav {
			position: absolute;
			width: 100vw;
			left: calc(100% + 35px);
			top: 0;
			height: 100vh;
			background-color: rgba(255, 255, 255, 0.3);
			backdrop-filter: blur(10px);
			padding: 15px 15px 40px 15px;
		}
		.navItem {
			font-size: 1.3rem;
		}
		.showNavBtn {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.navList {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: 20px;
			margin-top: 80px;
			padding: 0 20px;
		}
	}
	@media screen and (max-width: 420px) {
		.header {
			padding: 20px 20px 0 20px;
		}
	}
	

</style>