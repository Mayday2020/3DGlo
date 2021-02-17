
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    // Timer
    /*
    function countTimer(deadline){
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
    //Command
    const command = ()=>{
        const commandDiv = document.querySelector('.command'),
              commandItem = commandDiv.querySelectorAll('img');
        commandItem.forEach((e)=>{
            const imageSrcAttribute = e.getAttribute('src'),
                  imageDataAttribute = e.getAttribute('data-img');
            e.addEventListener('mouseenter', ()=>{
                e.src = imageDataAttribute;
            });
            e.addEventListener('mouseleave', ()=>{
                e.src = imageSrcAttribute;
            });
        });
    };
    command();
    //Calculate
    const calc = (price = 100)=>{
        const calcBlock = document.querySelector('.calc-block'),
            calcType = calcBlock.querySelector('.calc-type'),
            calcSquare = calcBlock.querySelector('.calc-square'),
            calcCount = calcBlock.querySelector('.calc-count'),
            calcDay = calcBlock.querySelector('.calc-day'),
            totalValue = calcBlock.querySelector('#total');
        const countSum = ()=>{
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }
            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = Math.floor(total);
        };
        calcBlock.addEventListener('change', (event)=>{
            const target = event.target;
            if (target.matches('input') || target.matches('select')){
                countSum();
            }
        });
    };
    calc(100);
    // Send-ajax-form

    const sendForm = ()=>{
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

        const form = document.getElementById('form1');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem;';
        
        form.addEventListener('submit', (event)=>{
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form);
            let body = {};
            for(let val of formData.entries()){
                body[val[0]] = val[1];
            }
            postData(body, 
                ()=>{
                    statusMessage.textContent = successMessage;
                }, 
                (error)=>{
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                }
            );
        });
        const postData = (body, outputData, errorData)=>{
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', ()=>{
                if (request.readyState !== 4){
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };
    };
    sendForm();
});
