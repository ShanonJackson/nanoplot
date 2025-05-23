/* write a script to load FigTree font from Google Fonts and set it as default font */
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);
document.body.style.fontFamily = "FigTree, sans-serif";
document.body.style.fontSize = "16px";
document.body.style.lineHeight = "1.5";
document.body.style.fontOpticalSizing = "auto";
