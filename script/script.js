
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    // Timer
    /*function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining () {
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor((timeRemaining / 60 / 60) % 24);
            return {timeRemaining, hours, minutes, seconds};
        }
        function updateClock() {
            let timer = getTimeRemaining();
            let idInterval = setInterval(updateClock, 1000);
            if(timer.timeRemaining < 0) {
                clearInterval(idInterval);
            } else {
                if (timer.hours < 10) {
                    timerHours.textContent = '0' + timer.hours;
                } else {
                    timerHours.textContent = timer.hours;
                }
                if(timer.minutes < 10) {
                    timerMinutes.textContent = '0' + timer.minutes;
                } else {
                    timerMinutes.textContent = timer.minutes;
                }
                if(timer.seconds < 10) {
                    timerSeconds.textContent = '0' + timer.seconds;
                } else {
                    timerSeconds.textContent = timer.seconds;
                }
            }
        }
        updateClock();
    }
    countTimer('01 july 2021');
*/
    //menu

    const toggleMenu = ()=>{
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        let handlerMenu = ()=>{
            menu.classList.toggle('active-menu');
        };
        
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();
    
    //popup

    const togglePopup = ()=>{
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
        
        popupBtn.forEach((elem)=>{
            elem.addEventListener('click', ()=>{
                popUp.style.display = 'block';
            });
        });
        
        popUp.addEventListener('click', (event)=>{
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
            
        });
    };
    togglePopup();

    //Tabs
    const tabs = ()=>{
        const tabHeader = document.querySelector('.service-header'),
            tabs = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index)=>{
            for (let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tabs[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tabs[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event)=>{
            let target = event.target;
            target = target.closest('.service-header-tab');
            if(target){
                tabs.forEach((item, i)=>{
                    if (item === target){
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Slider 
    const slider = ()=>{
        const portfolioContent = document.querySelector('.portfolio-content'),
            slide = portfolioContent.querySelectorAll('.portfolio-item'),
            dots = portfolioContent.querySelectorAll('.dot'),
            btn = portfolioContent.querySelectorAll('.portfolio-btn');
            
        let currentSlide = 0;
        const prevSlide = (elem, index, strClass)=>{
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass)=>{
            elem[index].classList.add(strClass);
        };
        let interval;
        const autoPlaySlide = ()=>{
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000)=>{
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = ()=>{
            clearInterval(interval);
        };
        portfolioContent.addEventListener('click', (event)=>{
            event.preventDefault();
            let target = event.target;
            if (!target.matches('.portfolio-btn, .dot')){
                return;
            } 
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            if (target.matches('#arrow-right')){
                currentSlide++;
            }else if (target.matches('#arrow-left')){
                currentSlide--;
            }else if (target.matches('.dot')){
                dots.forEach((elem, index)=>{
                    if (elem === target){
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }else if(currentSlide < 0) {
                currentSlide = slide.length -1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });
        portfolioContent.addEventListener('mouseover', (event)=>{
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });
        portfolioContent.addEventListener('mouseout', (event)=>{
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });
        startSlide(3000);
    };
    slider();
});
