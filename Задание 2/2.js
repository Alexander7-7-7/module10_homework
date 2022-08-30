// Задание 2.
// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
// Удачи!




const btn = document.querySelector('.getdada__button');

btn.addEventListener('click', () => {
  alert(`Размер монитора = ${window.screen.width} х ${window.screen.height}   
Размер окна браузера без полосы прокрутки = ${document.documentElement.clientWidth} х ${document.documentElement.clientHeight}
Размер окна браузера с полосой прокрутки = ${window.innerWidth} x ${window.innerHeight}`);
});

