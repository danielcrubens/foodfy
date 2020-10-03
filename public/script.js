const cards = document.querySelectorAll('.card')

const content = document.querySelector('.grid-receita')

for (let i = 0; cards.length; i++) {

    cards[i].addEventListener("click", function(){
        window.location.href = `/recipes/${i}`
    })
}

// event.preventDefault() // evita o refresh da pagína.