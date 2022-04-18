'use strict';

export default class Field {
    constructor(dogCount, bugCount) {
        this.dogCount = dogCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.onClick = this.onClick.bind(this)
        this.field.addEventListener('click', this.onClick);
    }

    init(){
        this.field.innerHTML = '';
        this._addItem('corgi', 5, '/img/corgi.png')
        this._addItem('mosquito', 7, '/img/mosquito.png')
    }

    _addItem(className, count, imgPath){
        const x1= 0;
        const y1 = 0;
    
        const x2 = this.fieldRect.width - DOG_SIZE;
        const y2 = this.fieldRect.height - DOG_SIZE;
    
        for(let i = 0; i < count; i++){
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
    
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onFieldClick(e){
        if(!started){
            return;
        }
    
        const target = e.target;
        if (target.matches('.mosquito')){
            target.remove();
            score++;
            updateScoreBoard();
    
            if(score === BUG_COUNT){
                finishGame(true);
            }
        } else if (target.matches('.corgi')){
            stopGameTimer();
            finishGame(false);
        }
    }
}