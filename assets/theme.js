const toggleBtn = document.getElementById("toggleBtn");
const menu = document.getElementById("menu");

toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
     toggleBtn.classList.toggle("buttonactive");
});