
import { writable, derived, readable } from 'svelte/store';

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

