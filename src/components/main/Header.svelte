<script>
	import { each } from "svelte/internal";
	import { currentPage, pageNames, user } from "../../store/globalStore"

	const pageNamesArray = $pageNames;

	let navItems = [
			{
				id: 1,
				title: 'Главная',
				pageName: pageNamesArray[1],
			},
			{
				id: 3,
				title: 'О сервисе',
				pageName: pageNamesArray[2],
			},
			{
				id: 2,
				title: 'Цены',
				pageName: pageNamesArray[3],
			},
			{
				id: 4,
				title: 'Контакты',
				pageName: pageNamesArray[4],
			}
		],
		logoPath = './assets/svg/Logo_dark.svg',
		isNavOpen = false,
		responsiveBorder = 700,
		mobileVersion = window.innerWidth < responsiveBorder,
		navElement;
		

		function windowResize() {
			mobileVersion = window.innerWidth < responsiveBorder;
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
				} /* else {
					navElement.style.left = '-15px'
					secondLine.style.opacity = '0'
					firstLine.setAttribute('d', 'M5 7H20')
					thirdLine.setAttribute('d', 'M5 17H20')
					firstLine.style.transform = 'rotate(45deg)'
					thirdLine.style.transform = 'rotate(-45deg)'
				} */
			}

		}
		window.onresize = windowResize


	function navClickHandle(pageName) {
		if(!pageName) {
			console.warn('Error: pageName is undefined')
			return
		}
		if(pageNamesArray.includes(pageName)) {
			currentPage.set(pageName)
		} else {
			console.warn(`Error: ${pageName} is invalid pageName`)
		}
	}

	function goToLoginPage() {
		console.log('goToLoginPage')
	}

	function onNavBurgerClick() {
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

		} else {
			navElement.style.left = '-15px'
			secondLine.style.opacity = '0'
			firstLine.setAttribute('d', 'M5 7H20')
			thirdLine.setAttribute('d', 'M5 17H20')
			firstLine.style.transform = 'rotate(45deg)'
			thirdLine.style.transform = 'rotate(-45deg)'
		}
		isNavOpen = !isNavOpen
	}
</script>


<div class="wrapper">
	<div class="header">
		<div class="logo" on:click={navClickHandle(!!$user ? 'Main' : 'Preview')} on:keyup={navClickHandle(!!$user ? 'Main' : 'Preview')}>
			<img class="logoSvg" src={logoPath} alt="Logo">
		</div>
		<nav class="nav" bind:this={navElement}>
			<ul class="navList">
				{#each navItems as item, index (item.id)}
					<li class={'navItem ' + (item.pageName == $currentPage ? 'chosen' : '')} 
						on:click={() => navClickHandle(item.pageName)} on:keyup={() => navClickHandle(item.pageName)}
					>
						{item.title}
					</li>
				{/each}
			</ul>
		</nav>

		{#if !$user}
			<div class="loginBtn" on:click={goToLoginPage} on:keyup={goToLoginPage}>
				<img src="./assets/svg/profile.svg" alt="">
				<p>Вход / <br>Регистрация</p>
			</div>
		{/if}
		<div class="showNavBtn" on:click={onNavBurgerClick} on:keyup={onNavBurgerClick}>
			<!-- <img width="40" src="./assets/svg/burger.svg" alt="Burger"> -->
			<svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path id="firstLine" class="burgerLine" d="M5 7H15" stroke="#3d3d3d" stroke-width="2" stroke-linecap="round"/>
				<path id="secondLine" class="burgerLine" d="M5 12H18" stroke="#3d3d3d" stroke-width="2" stroke-linecap="round"/>
				<path id="thirdLine" class="burgerLine" d="M5 17H12" stroke="#3d3d3d" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</div>
		
	</div>
</div>


<style>
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
	}
	.loginBtn img, .loginBtnMobile img {
		width: 25px;
	}

	.loginBtn:hover {

	}

	.wrapper {
		width: 100%;
		z-index: 15;
	}

	.header {
		position: relative;
		width: 100%;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		cursor: pointer;
	}

	.logoSvg {
		max-height: 80px;
	}

	.nav {
		position: relative;
		left: 0;
		min-width: 60%;
		padding: 0 20px;
		user-select: none;

		transition: left .4s ease-in-out;
	}

	.showNavBtn {
		display: none;
		width: 40px;
		height: 40px;
		z-index: 50;
	}

	.navList {
		list-style: none;
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

	.navItem:hover:after {
		width: 100%;
		left: 0;
		-webkit-box-shadow: 0px 11px 66px 9px rgba(112, 159, 18, 0.2);
		-moz-box-shadow: 0px 11px 66px 9px rgba(112, 159, 18, 0.2);
		box-shadow: 0px 11px 66px 9px rgba(112, 159, 18, 0.3);
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
			background-color: transparent;
			backdrop-filter: blur(10px);
			padding: 15px;
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
		}
	}
	@media screen and (max-width: 420px) {
		.header {
			padding: 20px 0;
		}
	}
	

</style>