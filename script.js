const pages = [
    {
        options: ['100%', '75%', '50%', 'None of the above'],
        background: ['#ff6b6b', '#ff8e8e']
    },
    {
        options: ['25%', '12.5%', '6.25%', 'None of the above'],
        background: ['#ff9a9e', '#fad0c4']
    },
    {
        options: ['3.125%', '1.5625%', '0.78125%', 'None of the above'],
        background: ['#ff758c', '#ff7eb3']
    },
    {
        options: ['0.390625%', '0.1953125%', '0.09765625%', 'None of the above'],
        background: ['#ff77aa', '#ff99cc']
    },
    {
        options: ['0.048828125%', '0.0244140625%', '0.01220703125%', 'None of the above'],
        background: ['#ff88bb', '#ffaadd']
    },
    {
        options: ['0.006103515625%', '0.0030517578125%', '0.00152587890625%', 'None of the above'],
        background: ['#ff6b6b', '#ff8e8e']
    },
    {
        options: ['0.000762939453125%', '0.0003814697265625%', '0.00019073486328125%', 'None of the above'],
        background: ['#ff9a9e', '#fad0c4']
    },
    {
        options: ['0.000095367431640625%', '0.0000476837158203125%', '0.00002384185791015625%', 'None of the above'],
        background: ['#ff758c', '#ff7eb3']
    },
    {
        options: ['0.000011920928955078125%', '0.000005960464477539063%', '0.000002980232238769531%', 'None of the above'],
        background: ['#ff77aa', '#ff99cc']
    },
    {
        options: ['0.000001490116119384766%', '0.000000745058059692383%', '0.000000372529029846191%', 'None of the above'],
        background: ['#ff88bb', '#ffaadd']
    }
];

let currentPage = 0;

const flowerEmojis = ['🌸', '🌺', '🌹', '🌷', '🌼', '🌻', '💐'];
const abolicolors = ['#FFB6C1', '#FF69B4', '#FF1493', '#DB7093', '#C71585'];

function createFlower() {
    const flower = document.createElement('div');
    flower.className = 'flower';
    flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.color = abolicolors[Math.floor(Math.random() * abolicolors.length)];
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = (Math.random() * 3 + 2) + 's';
    flower.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.getElementById('flowers').appendChild(flower);

    setTimeout(() => flower.remove(), 5000);
}

function sendEmail(percentage) {
    fetch("https://formsubmit.co/ajax/amoljadhav08276@gmail.com", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            percentage: percentage,
            message: `Someone chose ${percentage} love percentage!`
        })
    })
    .then(response => response.json())
    .then(data => console.log('Notification sent!'))
    .catch(error => console.log('Error sending notification'));
}

function updatePage() {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    const background = pages[currentPage].background;
    document.body.style.background = `linear-gradient(45deg, ${background[0]}, ${background[1]})`;

    pages[currentPage].options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.onclick = () => handleAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(answer) {
    if (answer === 'None of the above') {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updatePage();
        } else {
            showZeroPercentage();
        }
    } else {
        sendEmail(answer);
        showFinalMessage(getMessageForPercentage(answer));
    }
}

function showZeroPercentage() {
    const container = document.querySelector('.container');
    container.classList.add('angry');
    document.body.style.background = 'linear-gradient(45deg, #ff69b4, #ff1493)';
    
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <div class="final-message">
            <p>Even with 0%, you're still the best girl I've ever seen! 🌸</p>
        </div>
    `;
}

function getMessageForPercentage(percentage) {
    const value = parseFloat(percentage);
    let message = "";
    
    if (value >= 50) {
        message = `
            <div class="final-message">
                <p class="thank-you">Thankuuuuuuuuuu princess! 👑</p>
            </div>
        `;
    } else if (value >= 10) {
        message = `
            <div class="final-message">
                <p class="thank-you">Thankuuuuuuuuuu princess! 👑</p>
            </div>
        `;
    } else if (value >= 1) {
        message = `
            <div class="final-message">
                <p class="thank-you">Thankuuuuuuuuuu princess! 👑</p>
            </div>
        `;
    } else {
        message = `
            <div class="final-message">
                <p class="thank-you">Thankuuuuuuuuuu princess! 👑</p>
            </div>
        `;
    }
    return message;
}

function showFinalMessage(message) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = message;
}

setInterval(createFlower, 300);
updatePage();