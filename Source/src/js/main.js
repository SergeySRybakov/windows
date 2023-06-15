window.addEventListener('DOMContentLoaded', () => {
    //modals

    function bindModal(trigger, modal, close) {

        const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
            modalEngineer = document.querySelector('.popup_engineer'),
            modalEngineerClose = document.querySelector('.popup_engineer .popup_close'); 

        trigger.addEventListener('click', (event) => {
            if (event.target) {
                event.preventDefault;
            }

            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        });

        close.addEventListener('click', () => {
            modal.style.display = "none";
            document.body.style.overflow = "";
        });

        modal.addEventListener('click', (e)=> {
            if (e.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "";
            }
        })
    }

    const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
        modalEngineer = document.querySelector('.popup_engineer'),
        modalEngineerClose = document.querySelector('.popup_engineer .popup_close');

    bindModal(callEngineerBtn, modalEngineer, modalEngineerClose);


    //tabs

    const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
        const header = document.querySelector(headerSelector),
              tab = document.querySelectorAll(tabSelector),
              content = document.querySelectorAll(contentSelector);
    
        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
    
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
    
        function showTabContent(i = 0) {
            content[i].style.display = 'block';
            tab[i].classList.add(activeClass);
        }
    
        hideTabContent();
        showTabContent();
    
        header.addEventListener('click', (e) => {
            const target = e.target;
            if (target &&
                (target.classList.contains(tabSelector.replace(/\./, "")) || 
            target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    };

    tabs('.glazing_slider ', '.glazing_block', '.glazing_content', 'active');
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');

    // forms

    const forms = () => {
        const form = document.querySelectorAll('form'),
              inputs = document.querySelectorAll('input'),
              phoneInputs = document.querySelectorAll('input[name="user_phone"]');
    
        phoneInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/, '');
            });
        });
        
        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        const postData = async function(url, data) {
            document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: "POST",
                body: data
            });
    
            return await res.text();
        };
    
        const clearInputs = () => {
            inputs.forEach(item => {
                item.value = '';
            });
        };
    
        form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();
    
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.appendChild(statusMessage);
    
                const formData = new FormData(item);
    
                postData('assets/server.php', formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = message.success;
                    })
                    .catch(() => statusMessage.textContent = message.failure)
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                    });
            });
        });
    };

    forms();
    
});