document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
  
    let currentIndex = 0;
    const itemWidth = items[0].offsetWidth + 16; // ширина + отступ
    const totalItems = items.length;
  
    // Клонируем первый и последний элементы
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[totalItems - 1].cloneNode(true);
  
    carouselContainer.appendChild(firstClone);
    carouselContainer.insertBefore(lastClone, items[0]);
  
    // Устанавливаем начальное смещение для перехода к реальному первому элементу
    currentIndex = 1;
    carouselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  
    function updateCarousel() {
      const offset = -(currentIndex * itemWidth);
      carouselContainer.style.transform = `translateX(${offset}px)`;
    }
  
    function handleTransitionEnd() {
      if (currentIndex === 0) {
        // Если находимся на клонированном последнем элементе
        currentIndex = totalItems; // Перемещаемся на последний оригинальный элемент
        carouselContainer.classList.add("no-transition");
        updateCarousel();
      } else if (currentIndex === totalItems + 1) {
        // Если находимся на клонированном первом элементе
        currentIndex = 1; // Перемещаемся на первый оригинальный элемент
        carouselContainer.classList.add("no-transition");
        updateCarousel();
      }
    }
  
    function nextSlide() {
      if (currentIndex < totalItems + 1) {
        currentIndex++;
        carouselContainer.classList.remove("no-transition");
        updateCarousel();
      }
    }
  
    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        carouselContainer.classList.remove("no-transition");
        updateCarousel();
      }
    }
  
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
  
    // Добавляем обработчик окончания перехода
    carouselContainer.addEventListener("transitionend", handleTransitionEnd);
  });
  