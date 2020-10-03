const modalOverlay = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");

for (let card of cards) {
  const imageId = card.getAttribute("id");
  const title = card.querySelector(" .card-title").innerText;
  const info = card.querySelector(".card-info").innerText;

  card.addEventListener("click", function () {
    modalOverlay.classList.add("active");
    modalOverlay.querySelector("img").src = `/img/${imageId}.png`;
    modalOverlay.querySelector(' h4').textContent =title;
    modalOverlay.querySelector('p').textContent = info;
  });
}

document.querySelector(".close-modal").addEventListener("click", function () {
  modalOverlay.classList.remove("active");
});
