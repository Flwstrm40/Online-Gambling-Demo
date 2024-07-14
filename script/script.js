let initialMoney = 0;
let currentMoney = 0;
let currentRound = 0;

const rounds = [
    { prob: 1.0, multiplier: 1.2 },
    { prob: 0.75, multiplier: 1.5 },
    { prob: 0.5, multiplier: 1.8 },
    { prob: 0.2, multiplier: 2.5 },
    { prob: 0.0, multiplier: 10 }
];

const initialMoneyForm = document.getElementById('initialMoneyForm');
const initialMoneyInput = document.getElementById('initialMoney');
const gameSection = document.getElementById('gameSection');
const currentMoneyElement = document.getElementById('currentMoney');
const resultElement = document.getElementById('result');
const betForm = document.getElementById('betForm');
const betAmountInput = document.getElementById('betAmount');
const roundInfoElement = document.getElementById('roundInfo');
const betButton = document.getElementById('betButton');

initialMoneyForm.addEventListener('submit', function(event) {
    event.preventDefault();
    initialMoney = parseFloat(initialMoneyInput.value);
    
    if (initialMoney < 50000 || initialMoney > 1000000) {
        alert('Uang awal harus di antara Rp 50.000 dan Rp 1.000.000');
        return;
    }

    currentMoney = initialMoney;
    currentMoneyElement.textContent = `Uang Sekarang: Rp ${currentMoney.toFixed(2)}`;
    initialMoneyForm.classList.add('hidden');
    gameSection.classList.remove('hidden');
});

betForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (betButton.textContent === "Retry") {
        resetGame();
        return;
    }

    const betAmount = parseFloat(betAmountInput.value);
    
    if (betAmount < 50000) {
        resultElement.textContent = 'Jumlah taruhan minimal adalah Rp 50.000.';
        resultElement.classList.add('text-red-500');
        return;
    }

    if (betAmount > currentMoney) {
        resultElement.textContent = 'Kamu tidak punya cukup uang untuk bertaruh.';
        resultElement.classList.add('text-red-500');
        return;
    }
    else {
        resultElement.classList.remove('text-red-500');
        resultElement.classList.add('text-green-500');
        resultElement.textContent = '';
    }
    
    currentMoney -= betAmount;
    const { prob, multiplier } = rounds[currentRound];
    const isWin = Math.random() <= prob;

    let roundResult = `Round ${currentRound + 1}: `;

    if (isWin) {
        const winnings = betAmount * multiplier;
        currentMoney += winnings;
        roundResult += `Win! You won Rp ${winnings.toFixed(2)}. `;
    } else {
        roundResult += `Lose. You lost Rp ${betAmount.toFixed(2)}. `;
        betButton.textContent = "Retry";
        resultElement.classList.remove('text-green-500');
        resultElement.classList.add('text-red-500');
        roundInfoElement.textContent = "Game Over!";
    }

    roundResult += `Uang Sekarang: Rp ${currentMoney.toFixed(2)}<br>`;
    resultElement.innerHTML += roundResult;
    currentRound += 1;

    if (currentRound >= rounds.length && betButton.textContent !== "Retry" && isWin) {
        betButton.textContent = "Retry";
    } else {
        roundInfoElement.textContent = `Round: ${currentRound + 1}`;
    }

    currentMoneyElement.textContent = `Uang Sekarang: Rp ${currentMoney.toFixed(2)}`;
});

function resetGame() {
    currentRound = 0;
    resultElement.innerHTML = '';
    resultElement.classList.remove('text-red-500');
    betButton.textContent = "Atur Bet";
    roundInfoElement.textContent = "Round: 1";
    currentMoneyElement.textContent = `Uang Sekarang: Rp ${currentMoney.toFixed(2)}`;
}
