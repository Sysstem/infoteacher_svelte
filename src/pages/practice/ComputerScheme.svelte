<script>
	import { fly, fade } from 'svelte/transition';
  import { errorMsg } from '../../store/globalStore';

	/* let componentsObj = {
		motherboard: {
			name: 'motherboard',
			label: 'Материнская плата',
			svg: './assets/svg/tasks/motherboard.svg',
			pos: {
				x: 10,
				y: 20
			},
			width: 200,
			element: null
		},
		cpu: {
			name: 'cpu',
			label: 'Процессор',
			svg: './assets/svg/tasks/chip.svg',
			pos: {
				x: 70,
				y: 450
			},
			width: 50,
			element: null
		},
		ram: {
			name: 'ram',
			label: 'Оперативная память',
			svg: './assets/svg/tasks/ram.svg',
			svgDone: './assets/svg/tasks/ram_done.svg',
			pos: {
				x: 170,
				y: 310
			},
			width: 100,
			element: null
		},
		ssd: {
			name: 'ssd',
			label: 'SSD диск',
			svg: './assets/svg/tasks/ssd.svg',
			pos: {
				x: 20,
				y: 240
			},
			width: 120,
			element: null
		},
		gamepad: {
			name: 'gamepad',
			label: 'Геймпад',
			svg: './assets/svg/tasks/game-controller.svg',
			pos: {
				x: 245,
				y: 160
			},
			width: 100,
			element: null
		},
		gpu: {
			name: 'gpu',
			label: 'Видеокарта',
			svg: './assets/svg/tasks/video-card.svg',
			svgDone: './assets/svg/tasks/video-card_done.svg',
			pos: {
				x: 220,
				y: 10
			},
			width: 150,
			element: null
		},
		sata: {
			name: 'sata',
			label: 'Кабель',
			svg: './assets/svg/tasks/sata.svg',
			pos: {
				x: 220,
				y: 430
			},
			width: 70,
			element: null
		},
	} */

	let components = [
		{
			name: 'motherboard',
			label: 'Материнская плата',
			svg: './assets/svg/tasks/motherboard.svg',
			pos: {
				x: 10,
				y: 20
			},
			donePos: {
				x: 10,
				y: 50
			},
			width: 200,
			element: null
		},{
			name: 'cpu',
			label: 'Процессор',
			svg: './assets/svg/tasks/chip.svg',
			pos: {
				x: 70,
				y: 450
			},
			donePos: {
				x: 50,
				y: 76
			},
			width: 60,
			element: null
		},{
			name: 'ram',
			label: 'Оперативная память',
			svg: './assets/svg/tasks/ram.svg',
			svgDone: './assets/svg/tasks/ram_done.svg',
			pos: {
				x: 170,
				y: 310
			},
			donePos: {
				x: 130,
				y: 65
			},
			width: 100,
			widthDone: 50,
			element: null
		},{
			name: 'ssd',
			label: 'SSD диск',
			svg: './assets/svg/tasks/ssd.svg',
			pos: {
				x: 20,
				y: 240
			},
			donePos: {
				x: 280,
				y: 160
			},
			width: 100,
			element: null
		},{
			name: 'gamepad',
			label: 'Геймпад',
			svg: './assets/svg/tasks/game-controller.svg',
			pos: {
				x: 245,
				y: 160
			},
			donePos: {
				x: 0,
				y: 0
			},
			width: 100,
			element: null
		},{
			name: 'gpu',
			label: 'Видеокарта',
			svg: './assets/svg/tasks/video-card.svg',
			svgDone: './assets/svg/tasks/video-card_done.svg',
			pos: {
				x: 220,
				y: 10
			},
			donePos: {
				x: 20,
				y: 145
			},
			width: 150,
			element: null
		},{
			name: 'sata',
			label: 'Кабель',
			svg: './assets/svg/tasks/sata.svg',
			svgDone: './assets/svg/tasks/sata_done.svg',
			pos: {
				x: 220,
				y: 430
			},
			donePos: {
				x: 190,
				y: 180
			},
			width: 70,
			widthDone: 100,
			element: null
		},
	]

	let drop_zone,
	
		dropped = [],
		status = '',
	
		dropped_in = '',
		activeEvent = '',
		originalX = '',
		originalY = '',
		taskBg;

	function handleDragEnter(e) {
		status = "You are dragging over the " + e
			.target
			.getAttribute('id');
	}

	function handleDragLeave(e) {
		status = "You left the " + e
			.target
			.getAttribute('id');
	}

	function handleDragDrop(e) {
		e.preventDefault();
		var element_id = e
			.dataTransfer
			.getData("text");
		
		switch(element_id) {
			case 'cpu':
				if(!dropped.includes('motherboard')) {
					errorMsg.set({title: 'Упс!', text: 'Для установки процессора необходима материнская плата'})
					return
				}
				break;
			case 'ram':
			if(!dropped.includes('motherboard')) {
					errorMsg.set({title: 'Упс!', text: 'Для установки оперативной памяти необходима материнская плата'})
					return
				}
				break;
			case 'gpu':
			if(!dropped.includes('motherboard')) {
					errorMsg.set({title: 'Упс!', text: 'Для установки видеокарты необходима материнская плата'})
					return
				}
				break;
			case 'sata':
			if(!dropped.includes('motherboard') || !dropped.includes('ssd')) {
					errorMsg.set({title: 'Упс!', text: 'Sata кабель соединяет материнскую плату и внешний диск, сначала нужно установить их'})
					return
				}
				break;
			case 'gamepad':
				errorMsg.set({title: 'Упс!', text: 'Геймпад здесь явно лишний, в нем нет необходимости'})
				return
				break;
		}
		dropped = dropped.concat(element_id);
		console.log(dropped)
		dropped_in = true;
		status = "You droped " + element_id + " into drop zone";
	}
	
		function handleDragStart(e) {
		status = "Dragging the element " + e
			.target
		.getAttribute('id');
		e.dataTransfer.dropEffect = "move";
		e.dataTransfer
		.setData("text", e.target.getAttribute('id'));
	}

	function handleDragEnd(e) {
		if (dropped_in == false) {
		status = "You let the " + e
			.target
		.getAttribute('id') + " go.";
		}
	dropped_in = false;
	}

	$: if(
		dropped.includes('motherboard') 
		&& dropped.includes('cpu') 
		&& dropped.includes('ram') 
		&& dropped.includes('gpu') 
		&& dropped.includes('ssd') 
		&& dropped.includes('sata')
	) {
		errorMsg.set({title: 'Задание выполнено!', text: 'Вы успешно выполнили задание', type: 'good'})
		taskBg = 'var(--taskDone)'
	}

</script>


<div in:fly="{{delay: 400, y: 300, duration: 400}}" out:fly="{{duration: 400, y: 400}}" class="wrapper">
	<p class="taskText">
		Задача: из данных комплектующих собрать упрощенную модель компьютера, изученную на уроке (подсказка: среди даных компонентов могут быть лишние)
	</p>
	<div class="grid">
		<div class="componentsBlock">
			<p class="titleText">Комплектующие</p>
			<div class="components">
				{#each components as component, i}
					{#if !dropped.includes(`${component.name}`)}
						<img class="component"
							style={`width: ${component.width}px; top: ${component.pos.y}px; left: ${component.pos.x}px`} 
							width={component.width} 
							src={component.svg} 
							title={component.label} 
							alt={component.label}
							id={component.name}
							bind:this={components[i].element}

							draggable=true 
							on:dragstart={handleDragStart}
							on:dragend={handleDragEnd}
						>
					{/if}
					
				{/each}
			</div>
		</div>
		<div class="configurateBlock" style={`background-color: ${taskBg || 'transparent'}`}>
			<p class="titleText">Сборка</p>
			<div class="configurate">
				<div class="computerBlock"
					on:dragenter={handleDragEnter} 
					on:dragleave={handleDragLeave}  
					on:drop={handleDragDrop} 
					bind:this={drop_zone}
					id="drop_zone" 
					ondragover="return false"
				>
					<img class="computerBlock" src="./assets/svg/tasks/block.svg" alt="Block">
					{#each components.filter(el => dropped.includes(`${el.name}`)) as component}
						<img style={`position: absolute; width: ${component.widthDone || component.width}px; top: ${component.donePos.y}px; left: ${component.donePos.x}px`} 
							src={component.svgDone || component.svg}
							title={component.label} 
							alt={component.label}
							draggable=false
						>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>


<style>
	.computerBlock {
		position: relative;
		width: 450px;
		height: 450px;
	}
	.component {
		position: absolute;
		cursor: move;
	}
	.wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		padding-top: 30px;
		overflow: auto;
	}
	.taskText {
		font-size: 1.4rem;
		padding: 20px;
		margin: 0 auto;
		max-width: 800px;
	}
	.titleText {
		font-size: 1.55rem;
		padding: 10px;
		text-align: center;
	}
	.grid {
		display: grid;
		grid-template-columns: 400px 650px;
		gap: 50px;
		position: relative;
		width: 1100px;
		height: 700px;
		margin: 0 auto;
	}
	.componentsBlock,
	.configurateBlock {
		border: 5px solid var(--dark);
		border-radius: 30px;
		display: flex;
		flex-direction: column;
	}
	.components {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.configurate {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
</style>