
import { writable, derived, readable } from 'svelte/store';

/* 
    Все названия страниц:
        Main: Главная(Для зарегистрированных)
        Preview: Главная - Обзорная страница
        About: О сервисе
        Pricing: Цены
        Contacts: Контакты
*/

export const pageNames = readable([
    'Main',
    'Preview',
    'About',
    'Pricing',
    'Contacts',
    'Login',
], set => {
    
})

export const currentPage = writable("");

export const user = writable(null);

