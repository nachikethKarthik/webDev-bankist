'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const accounts = [account1, account2];
/////////////////////////////////////////////////
// Functions
function formatCur(transaction, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(transaction);
}

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  // each element of thE array is a timestring so if we pass in to the date namespace we get a date object
  movs.forEach(function (mov, i) {
    const daysPassed = (day1, day2) => {
      let temp = (day2 - day1) / (1000 * 60 * 60 * 24);
      return Math.floor(Math.abs(temp));
    };

    let transactionDate = new Date(account.movementsDates[i]);
    let whenItHappend = '';
    if (daysPassed(new Date(), transactionDate) === 0) {
      whenItHappend = 'today';
    } else if (daysPassed(new Date(), transactionDate) === 1) {
      whenItHappend = 'yesterday';
    } else {
      whenItHappend = `${daysPassed(new Date(), transactionDate)} days ago`;
    }
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const formattedMov = formatCur(mov, account.locale, account.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  let temp = acc.balance;
  labelBalance.textContent = `${formatCur(
    temp.toFixed(2),
    currentAccount.locale,
    currentAccount.currency
  )}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCur(
    incomes.toFixed(2),
    currentAccount.locale,
    currentAccount.currency
  )}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCur(
    Math.abs(out).toFixed(2),
    currentAccount.locale,
    currentAccount.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCur(
    interest.toFixed(2),
    currentAccount.locale,
    currentAccount.currency
  )}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;
// timer function
let sessionTimer;
let sessionTime;
console.log(sessionTimer);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  sessionTime = 300;
  const tick = () => {
    let min = (Math.trunc(sessionTime / 60) + '').padStart(2, 0);
    let second = ((sessionTime % 60) + '').padStart(2, 0);
    labelTimer.textContent = `${min}:${second}`;

    if (sessionTime === 0) {
      clearInterval(sessionTimer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // decrement after checking so that it doesnt fade away at 1 second left
    sessionTime--;
  };
  // call the function once because the interval function takes one second to execute
  tick();
  // checking if there are any existing timers
  if (sessionTimer) clearInterval(sessionTimer);
  sessionTimer = setInterval(tick, 1000);
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // day/month/year
    labelDate.textContent = `${(new Date().getDate() + '').padStart(2, '0')}-${(
      new Date().getMonth() +
      1 +
      ''
    ).padStart(2, '0')}-${new Date().getFullYear()}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
    sessionTime = 300;
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    // put this in a timeout fn
    let approveLoan = setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      // Update UI
      updateUI(currentAccount);
    }, 2000);
    sessionTime = 300;
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// convert string to Number
console.log(+'23');
// Parsing
console.log(Number.parseInt('32fu', 10));
console.log(Number.parseFloat('3.2rem', 10));
console.log(Number.parseInt('3.2fu', 10));
let randomRange = (max, min) => {
  console.log(Math.trunc(Math.random() * (max - min + 1) + min));
};
randomRange(20, 10);
function labelClicked() {
  let arrayOfEvenNodes = Array.from(
    document.querySelectorAll('.movements__row'),
    (node, index) => {
      if (index % 2 === 0) {
        return node;
      }
    }
    );
    console.log(arrayOfEvenNodes);
    arrayOfEvenNodes.forEach(node => {
      if (node !== undefined) {
        node.style.backgroundColor = 'blue';
      }
    });
  }
  labelBalance.addEventListener('click', labelClicked);
  //haido sweeni
  const now = new Date();
  console.log(now);
  console.log(new Date('Wed Dec 23 2020 07:58:59'));
  console.log(new Date('December 24,2020'));
  console.log(future.getFullYear());
  // date internationalization
  let date1 = new Date();
  console.log(date1.getDay());
  let options = {
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'long',
  };
  labelBalance.textContent = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(new Date());
  // set timeout
  setTimeout(
    (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
    5000,
    'olives',
    'extra CHEEEEZ'
    );
    console.log('Wait');
    */
