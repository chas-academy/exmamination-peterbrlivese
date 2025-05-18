// Arrayer för inkomster och utgifter
const income = [];
const expenses = [];

// Hämta element från DOM
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");
const incomeList = document.getElementById("incomeList");
const expenseList = document.getElementById("expenseList");
const balanceSpan = document.getElementById("balance");

// Funktion för att uppdatera listorna och saldo
function updateUI() {
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  let balance = 0;

  // Visa inkomster
  income.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: +${item.amount} kr`;
    incomeList.appendChild(li);
    balance += item.amount;
  });

  // Visa utgifter
  expenses.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.description}: -${item.amount} kr`;
    expenseList.appendChild(li);
    balance -= item.amount;
  });

  // Visa saldo
  balanceSpan.textContent = balance;
}

// Funktion för att lägga till en transaktion
function addTransaction(type) {
  const description = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if(description === "" || isNaN(amount)) {
    alert("Vänligen fyll i beskrivning och ett giltigt belopp.");
    return;
  }

  const transaction = { description, amount, type };

  if(type === "income") {
    income.push(transaction);
  } else {
    expenses.push(transaction);
  }

  // Rensa fälten
  descInput.value = "";
  amountInput.value = "";

  // Uppdatera sidan
  updateUI();
}

// Event-lyssnare på knapparna
incomeBtn.addEventListener("click", () => addTransaction("income"));
expenseBtn.addEventListener("click", () => addTransaction("expense"));
