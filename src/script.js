// Arrayer för att spara transaktioner
const transactions = [];
const income = [];
const expenses = [];

// Referenser till HTML-element
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const transactionList = document.getElementById("transactionList");
const balanceSpan = document.getElementById("balance");

// Funktion för att uppdatera alla listor och saldo
function updateUI() {
  // Töm listorna
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";
  transactionList.innerHTML = "";

  // Variabel för saldo
  let balance = 0;

  // Gå igenom alla transaktioner
  transactions.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: ${item.type === "income" ? "+" : "-"}${item.amount} kr`;
    li.classList.add(item.type);
    transactionList.appendChild(li);

    if (item.type === "income") {
      incomeList.appendChild(li.cloneNode(true));
      balance += item.amount;
    } else {
      expenseList.appendChild(li.cloneNode(true));
      balance -= item.amount;
    }
  });

  // Uppdatera saldo
  balanceSpan.textContent = balance;
}

// Funktion för att lägga till en transaktion
function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (description === "" || isNaN(amount)) {
    alert("Fyll i både beskrivning och ett giltigt belopp.");
    return;
  }

  const transaction = { description, amount, type };

  // Lägg till i rätt arrayer
  transactions.push(transaction);
  if (type === "income") {
    income.push(transaction);
  } else if (type === "expense") {
    expenses.push(transaction);
  }

  // Rensa inputfält
  descInput.value = "";
  amountInput.value = "";

  // Uppdatera gränssnitt
  updateUI();
}

// Eventlyssnare för knappar
incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));
