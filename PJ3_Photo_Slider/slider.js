const sourceSlides = ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg"];

let numberOfActiveSlide = 0;

const navigation = document.querySelector(".navigation");
const sliderTools = document.querySelector(".content__slider-tools");
const slide = document.querySelector(".content__slider-image");
const leftArrowSliderTools = sliderTools.firstElementChild;
const rightArrowSliderTools = sliderTools.lastElementChild;
const linksSlidesNavigation = navigation.querySelectorAll("li > a");
const dotsSliderTools = sliderTools.querySelectorAll(".content__slider-tools-dots div")

function clickLinksNavigation(event) {
    let itemClickLink = numberOfActiveSlide;

    for (let i = 0; i < linksSlidesNavigation.length; i++)
        if (linksSlidesNavigation[i] === event.target) {
            itemClickLink = i;
            break;
        }

    if (itemClickLink === numberOfActiveSlide)
        return 1;

    linksSlidesNavigation[numberOfActiveSlide].className = "";
    dotsSliderTools[numberOfActiveSlide].className = "";
    numberOfActiveSlide = itemClickLink;
    linksSlidesNavigation[numberOfActiveSlide].className = "navigation__link-active";
    dotsSliderTools[numberOfActiveSlide].className = "content__slider-tools-dots_dot-active";
    slide.src = sourceSlides[numberOfActiveSlide];
}

function clickSliderTools(event) {
    let itemClickLink = numberOfActiveSlide;

    if (event.target === leftArrowSliderTools) {
        itemClickLink--;
        if (itemClickLink < 0)
            itemClickLink = 2;
    }
    else if (event.target === rightArrowSliderTools) {
        itemClickLink++;
        if (itemClickLink > 2)
            itemClickLink = 0;
    }
    else {


        for (let i = 0; i < dotsSliderTools.length; i++)
            if (dotsSliderTools[i] === event.target) {
                itemClickLink = i;
                break;
            }
    }

    if (itemClickLink === numberOfActiveSlide)
        return 1;


    linksSlidesNavigation[numberOfActiveSlide].className = "";
    dotsSliderTools[numberOfActiveSlide].className = "";
    numberOfActiveSlide = itemClickLink;
    linksSlidesNavigation[numberOfActiveSlide].className = "navigation__link-active";
    dotsSliderTools[numberOfActiveSlide].className = "content__slider-tools-dots_dot-active";
    slide.src = sourceSlides[numberOfActiveSlide];
}

sliderTools.addEventListener("click", clickSliderTools);
navigation.addEventListener("click", clickLinksNavigation);

