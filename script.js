document.addEventListener("mousemove", function(e) {
    const lily = document.createElement("div");
    lily.className = "lily"; // Используем класс .lily
    lily.style.left = `${e.pageX}px`;
    lily.style.top = `${e.pageY}px`;
    document.body.appendChild(lily);

    setTimeout(() => {
        lily.remove();
    }, 1000); // Лилия исчезает через 1 секунду
});
