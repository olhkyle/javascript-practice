const get = (target) => {
    return document.querySelector(target);
};

let timerId;

const throttle = (callback, time) => {
    if(timerId) return;
    return () => { 
        timerId = setTimeout(() => {
            callback();
            timerId = undefined;
        }, time)
    }
};

const $content = get('.content');
const $progressBar = get('.progress-bar');


const onScroll = () => {
    const height = $content.scrollHeight - $content.clientHeight;
    const scrollTop = $content.scrollTop;

    const progressBarWidth = ((scrollTop / height) * 100).toFixed(0);
    $progressBar.style.width = `${progressBarWidth}%`    
    if($progressBar.style.width === `100%`){
        get('.percent').style.display = 'block';
    }else{
        get('.percent').style.display = 'none';
    }
}

$content.addEventListener('scroll', () => {
    throttle(onScroll(), 1000);
})