const get = (target) => {
    return document.querySelector(target);
}

const getAll = (target) => {
    return document.querySelectorAll(target);
}

const create = (target) => {
    return document.createElement(target);
}

/*
    Carousel Class
    1. initCarousel()
    2. moveNext()
    3. movePrev()
    4. moveCarousel() => 캐러셀을 움직일 조건 : active 클래스가 제일 정면에 보이고, transform으로 prev는 -100, next는 100 위치시키기
    5. handleBtnEvent() => 전 또는 후 버튼을 클릭했을 때, movePrev 또는 moveNext 실행
*/

class Carousel {
    constructor(carouselEl) {
        this.carouselEl = carouselEl;
        this.itemClassName = 'carousel-item';
        this.items = getAll('.carousel-item');
        this.totalItems = this.items.length;
        this.current = 0;
        this.state = false;
    }
    
    initCarousel(){
        if(this.state) return;
        this.items[0].classList.add('active');
        this.items[1].classList.add('next');
        this.items[this.totalItems - 1].classList.add('prev');
        this.showCurrentPage();
    }

    showCurrentPage(){
        get('.current-item').innerHTML = `${this.current+1} / ${this.totalItems}`
    }

    disableInteraction(){
        this.state = true;
        setTimeout(() => {
            this.state = false;
        }, 500)
    }

    handleBtnEvent(){
        this.prevBtn = get('.carousel-btn-prev');
        this.nextBtn = get('.carousel-btn-next');

        this.prevBtn.addEventListener('click', () => {
            this.movePrev();
        })
        this.nextBtn.addEventListener('click', () => {
            this.moveNext();
        })
    }

    moveCarousel(){
        this.disableInteraction()
        let prev = this.current - 1;
        let next = this.current + 1;

        if(this.current === 0){
            prev = this.totalItems - 1;
        }else if (this.current === this.totalItems - 1){
            next = 0;
        }
        this.items.forEach((item,idx) => {
            if(idx === this.current){
                this.items[idx].className = `${this.itemClassName} active`;
            } else if (idx === prev){
                this.items[idx].className = `${this.itemClassName} prev`;
            } else if (idx === next){
                this.items[idx].className = `${this.itemClassName} next`;
            } else{
                this.items[idx].className = this.itemClassName;
            }
        })
    }

    moveNext(){
        if(this.state) return;
        if(this.current === this.totalItems - 1){
            this.current = 0;
        } else{
            this.current++;
        }
        this.showCurrentPage();
        this.moveCarousel()
    }

    movePrev(){
        if(this.state) return;
        if(this.current === 0){
            this.current = this.totalItems - 1;
        }else{
            this.current--;
        }
        this.showCurrentPage();
        this.moveCarousel()
    }
}



const init = () => {
    const carouselEl = get('.carousel');
    const $carousel = new Carousel(carouselEl);
    $carousel.initCarousel();
    $carousel.handleBtnEvent();
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});