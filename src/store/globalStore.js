
import { writable, derived, readable, get } from 'svelte/store';

/* 
	Все названия страниц:
		Main: Главная(Для зарегистрированных)
		Preview: Главная - Обзорная страница
		About: О сервисе
		Pricing: Цены
		Contacts: Контакты
		Login: Вход
*/

export const pageNames = readable([
	'Main',
	'Preview',
	'About',
	'Pricing',
	'Contacts',
	'Login',
	'Profile',
], set => {
	
})

export const currentPage = writable("");
export const previousPage = writable("");

export const goToPage = (target, noRestore = false) => {
	if(!target) {
		console.warn('Error: pageName is undefined')
		return
	}
	
	if(get(pageNames).includes(target)) {
		previousPage.set(get(currentPage))
		currentPage.set(target)
		if(!noRestore) {
			localStorage.setItem('requestPage', target)
		}
	} else {
		console.warn(`Error: ${target} is invalid pageName`)
	}
	
}

export const user = writable(null);
export const testUserT = writable({
	id: 0,
	email: 'test@testmail.ru',
	name: 'Тест',
	surname: 'Тестов',
	category: 'teacher',
});
export const testUserS = writable({
	id: 1,
	email: 'test@testmail.ru',
	name: 'Тест',
	surname: 'Тестов',
	category: 'student',
});

