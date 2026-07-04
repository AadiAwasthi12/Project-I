const images = [
"Images/rose.jpg",
"Images/tulip.jpg",
"Images/peony.jpg",
"Images/sunflower.jpg",
"Images/lily.webp",
"Images/daisies.jpg",
"Images/Rhododendron.jpg",
"Images/Hibiscus.jpg",
"Images/marigold.jpg"
];
let i = 0;
const slide = document.getElementById("slide");
setInterval(() => {
i++;
if(i >= images.length){
i = 0;
}
slide.src = images[i];
},2500);