
import { readable } from "svelte/store";

// Pages
import Preview from "../pages/Preview.svelte";
import About from "../pages/About.svelte";
import Pricing from "../pages/Pricing.svelte";
import Contacts from "../pages/Contacts.svelte";
import Login from "../pages/Login.svelte";
import Profile from "../pages/Profile.svelte";
import MainTeacher from "../pages/MainTeacher.svelte"
import MainStudent from "../pages/MainStudent.svelte";
import Lessons from "../pages/Lessons.svelte";
import Practice from "../pages/Practice.svelte";
import Materials from "../pages/Materials.svelte";
import Lesson from "../pages/Lesson.svelte";

export const routing = readable({
    Preview: Preview,
    Pricing: Pricing,
    Contacts: Contacts,
    About: About,
    Login: Login,
    Profile: Profile,
    MainTeacher: MainTeacher,
    MainStudent: MainStudent,
    Lessons: Lessons,
    Practice: Practice,
    Materials: Materials,
    Lesson: Lesson,
}, set => {
	
})
