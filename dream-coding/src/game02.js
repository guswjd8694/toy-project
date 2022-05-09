
let picked = null;
let drop = null;
const map = document.querySelector('.style')
const headItems = document.querySelectorAll('.head');
const shirtItems = document.querySelectorAll('.shirt');
const pantsItems = document.querySelectorAll('.pants');
const closetList = document.querySelectorAll('.closet__list');
const headWrap = document.querySelectorAll('.closet__list-head .closet__wrap');



map.addEventListener("dragstart", e => {

    picked = e.target
    const pickedIndex = [...picked.parentNode.children].indexOf(e.target)

});

map.addEventListener("dragover", e => {
    e.preventDefault();
});

map.addEventListener("drop", e => {

    drop = e.target;
    const avatar2 = document.querySelector('.avatar2');

    console.log(drop)

    if(drop.className == 'closet__wrap'){
        droped()
        picked.style.left = 'auto'
    }


    function droped(){
        drop.appendChild(picked)
        picked.style.position = 'absolute'
        picked.style.top = '0'
        picked.style.left = '0'
    }
    

    for(let p = 0; p < picked.classList.length; p++){
        if(picked.classList[p] == 'head'){

            for(let d = 0; d < drop.classList.length; d++){
                if(drop.classList[d] == 'avatar1') {
                    droped();
                }
            }

        }
    }

    for(let p = 0; p < picked.classList.length; p++){
        if(picked.classList[p] == 'shirt'){

            for(let d = 0; d < drop.classList.length; d++){
                if(drop.classList[d] == 'avatar2'){
                    droped();
                }
                else if(drop.classList[d] == 'head'){
                    avatar2.appendChild(picked);
                }
            }

        }
    }

    for(let p = 0; p < picked.classList.length; p++){
        if(picked.classList[p] == 'pants'){

            for(let d = 0; d < drop.classList.length; d++){
                if(drop.classList[d] == 'avatar3') {
                    droped();
                }
            }

        }
    }

    for(let i=0; i<headWrap.length; i++){
        if(headWrap[i].childNodes != null){
        }
    }
});




headItems.forEach((e, i) => {

    e.onclick = () => {
        console.log(i)
    }
})

shirtItems.forEach((e, i) => {
    e.onclick = () => {
        console.log(i)
    }
})

pantsItems.forEach((e, i) => {
    e.onclick = () => {
        console.log(i)
    }
})

//closetWrap의 index 번호와 img의 index 번호를 구한다
//둘의 번호가 같은 경우
//img를 클릭하면 클릭된 img는 특정 번호의 closetWrap 자식으로 들어간다