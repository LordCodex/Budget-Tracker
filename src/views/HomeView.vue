<script setup>
import { ref, onMounted } from 'vue'
import { showNotification } from "@/utils/notify"


// export  defineComponent({
//   components: {
//     DarkMode,
//   },
// });
// Reactive variables
const greeting = ref('');
const budget = ref(0);
const budgetAmount = ref("");
const expenses = ref(0);
const remainingBudget = ref(budget.value);
const expenseAmount = ref("");
const expenseDescription = ref('');
const expenseTitle = ref('');
const expenseDate = ref('');
const expenseList = ref([]);

// Methods
const addBudget = () => {
  let amount = parseFloat(budgetAmount.value);
  if (isNaN(amount) || amount <= 0) {
    showNotification({
          message: 'Please enter a valid expense amount.',
          success: false,
        });
    return;
  }


  remainingBudget.value += amount;
  budget.value += amount;
  showNotification({
          message: "Budget Sucessfully Added",
          success: true,
        });
  budgetAmount.value = "";

};

const addExpense = () => {
  const amount = parseFloat(expenseAmount.value);
  if (isNaN(amount) || amount <= 0) {
    showNotification({
          message: 'Please enter a valid expense amount.',
          success: false,
        });
    return;
  }

  if (amount > remainingBudget.value) {
    showNotification({
          message: 'Insufficient Balance..',
          success: false,
        });
    return;
  }

  expenses.value += amount;
  remainingBudget.value -= amount;

  expenseList.value.push({
    amount,
    description: expenseDescription.value,
    title: expenseTitle.value,
    date: expenseDate.value,
  });
  showNotification({
          message: "Expense Sucessfully Added",
          success: true,
        });
  // Clear input fields
  expenseAmount.value = "";
  expenseDescription.value = '';
};

const removeExpense = (index) => {
  const removedExpense = expenseList.value[index];
  expenses.value -= removedExpense.amount;
  remainingBudget.value += removedExpense.amount;

  expenseList.value.splice(index, 1);
  showNotification({
          message: "Expense Sucessfully Removed",
          success: true,
        });
};

const reset = () => {
   budget.value = 0;
   remainingBudget.value = 0;
   expenses.value = 0;
   expenseList.value.splice(0)
   showNotification({
          message: "All data Cleared",
          success: true,
        });
};
const setGreeting = () => {
  const currentTime = new Date().getHours();

  if (currentTime >= 6 && currentTime < 12) {
    greeting.value = 'Good Morning!';
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting.value = 'Good Afternoon!';
  } else {
    greeting.value = 'Good Evening!';
  }
};

onMounted(() => {
  setGreeting();
  // expenseList.value.push({
  //   amount:0,
  //   description: "KODEXCODES",
  //   title: "New Expenses",
  //   date: "12-5-2020",
  // });
});
</script>

<template>
  <main>
    <nav>
      <div class="nav-title">
        Expense Tracker 
      </div>

    </nav>

    <header class="container">
      <!-- Dashboard Title -->

      <div class="main-title flex">
        <div class="dashborad-title">
          <h1 class="title">Dashboard</h1>
          <p>Hello, {{ greeting }} Kodex</p>
        </div>

        <div class="reset-btn flex" id="reset" @click="reset">
          Reset
        </div>
      </div>

      <!-- Dashboard -->

      <main class="dashboard ">

        <!-- Budget Section -->

        <div class="budgetSection flex">
          <div class="total-balance flex fl-col">
            <div class="balance-title">
              <p>Your Budget</p>
            </div>
            <div class="balance-amount text-elipses">
              <h1 id="balance-amount">₦ {{ budget.toLocaleString() }}</h1>
            </div>
          </div>

          <!-- Add Budget box -->

          <div class="addBudget flex fl-col">
            <div class="budget-title">Budget</div>
            <form @submit.prevent="addBudget" class="flex fl-col">
              <input type="number" v-model="budgetAmount" class="input-field" id="budgetAmount"
                placeholder="Enter your budget.." autofocus>
              <button class="primary-btn flex" type="submit" id="addBudget">Add Budget <ion-icon
                  name="arrow-forward-outline"></ion-icon></button>
            </form>
          </div>
        </div>

        <div class="expenseSection flex">


          <!-- Income And Expense box / Expense List -->

          <div class="expense-list-box flex fl-col">


            <div class="income-expense-boxes flex">

              <!-- Income box -->

              <div class="incomebox flex fl-col text-elipses">
                <h2 class="income-title">Current Balance</h2>
                <h1 id="currentAmount" class="current-amount">₦ {{ remainingBudget.toLocaleString() }}</h1>
              </div>

              <!-- Expense box -->

              <div class="expensebox flex fl-col text-elipses">
                <h2 class="expense-title">Expense</h2>
                <h1 id="expenseAmount" class="expense-amount">₦ {{ expenses.toLocaleString() }}</h1>
              </div>
            </div>

            <!-- Expense List -->

            <div class="main-title">
              <h2>Expense List : </h2>
            </div>

            <div class="expenseList">
              <ul class="listITems flex fl-col" id="expenseList">

                <!-- Expense Items -->

                <li v-for="(expense, index) in expenseList" class="item flex">
                  <div class="list-expense-title-desc text-elipses flex">
                    <div class="flex fl-col list-text">
                      <div class="list-expense-title">{{ expense.title }}</div>
                      <div class="list-expense-desc">{{ expense.description }}</div>
                    </div>
                    <div class="list-expense-amount flex fl-col">
                      <span>₦ {{ expense.amount.toLocaleString() }}</span>
                      <div class="date">{{ expense.date }}</div>
                    </div>
                  </div>
                  <button id="delete" @click="removeExpense(index)">X</button>
                </li>


              </ul>
            </div>

          </div>

          <div class="addExpense flex fl-col">
            <div class="expense-title">Add Expense</div>
            <form @submit.prevent="addExpense" class="flex fl-col expenseForm">
              <div>
                <label>Expense Title: </label>
                <input type="text" class="input-field" id="expTitle" v-model="expenseTitle"
                  placeholder="Enter your expense title.." required maxlength="15" autocomplete="off">
              </div>
              <div>
                <label>Expense Description: </label>
                <input type="text" class="input-field" id="expDesc" v-model="expenseDescription"
                  placeholder="Enter your expense Desc.." required maxlength="30" autocomplete="off">
              </div>
              <div>
                <label>Expense Amount: </label>
                <input type="number" class="input-field" v-model="expenseAmount" id="expAmount"
                  placeholder="Enter your expense.." required autocomplete="off">
              </div>

              <div>
                <label>Current Date: </label>
                <input type="date" class="input-field" v-model="expenseDate" id="date" placeholder="Enter your expense.."
                  required autocomplete="off">
              </div>

              <button class="primary-btn flex" id="addExpense" type="submit">Add Expense <ion-icon
                  name="arrow-forward-outline"></ion-icon></button>
            </form>
          </div>



        </div>
      </main>

    </header>

    <!-- Footer Section -->

    <footer class="flex container">
      <div class="footer-text">
        Copyright © 2023 - All right reserved | KODEXCODES
      </div>

    </footer>

  </main>
</template>
