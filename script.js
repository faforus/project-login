`use strict`;

//////////////////////////////////////////////////////////////////
// SHORTCUTS
//////////////////////////////////////////////////////////////////
const login = document.querySelector(`.login_input_user`);
const password = document.querySelector(`.login_input_pwd`);
const btnLogin = document.querySelector(`.btn_login`);
const btnChooseLog = document.querySelector(`.btn_choose_log`);
const btnChooseCreate = document.querySelector(`.btn_choose_create`);
const loginBox = document.querySelector(`.loginBox`);
const createAccountBox = document.querySelector(`.createAccountBox`);
const main = document.querySelector(`.mainBody`);
const firstPageOptions = document.querySelector(`.first_page_options`);
const btnCreate = document.querySelector(`.btn_create`);
const createInputUser = document.querySelector(`.create_input_user`);
const createInputPwd = document.querySelector(`.create_input_pwd`);
const createInputPwdC = document.querySelector(`.create_input_pwdc`);
const popupMsg = document.querySelector(`.popupMsg`);
const modal = document.querySelector(`.modal`);
const overlay = document.querySelector(`.overlay`);
const btnCloseModal = document.querySelector(`.btn_close-modal`);
const btnsOpenModal = document.querySelectorAll(`.show-modal`);
const btnLogOut = document.querySelector(`.btn_log_out`);
const displayAccountName = document.querySelector(`.acc_name`);
const displayAccountPwd = document.querySelector(`.acc_pwd`);
const btnAccountSettings = document.querySelector(`.btn_acc_settings`);
const accountSettingsDiv = document.querySelector(`.acc_settings_div`);
const logoutTimer = document.querySelector(`.timer`);
const displayAccOwnName = document.querySelector(`.acc_own_name`);
const displayAccOwnSur = document.querySelector(`.acc_own_sur`);
const btnUpdateFirst = document.querySelector(`.btnUpdateFirst`);
const btnUpdate = document.querySelector(`.btnUpdate`);
const updateWindow = document.querySelector(`.updateWindow`);
const btnCancelUpdate = document.querySelector(`.btnCancelUpdate`);
const updateName = document.querySelector(`.updateName`);
const updateSurname = document.querySelector(`.updateSurname`);
const footer = document.querySelector(`.footer`);
const homeLogo = document.querySelector(`.homeLogo`);
const postBoxWindow = document.querySelector(`.postBoxWindow`);
const linkPostBox = document.querySelector(`.linkPostBox`);
const linkHome = document.querySelector(`.linkHome`);
//////////////////////////////////////////////////////////////////
/*
modal overlay needs fixing

implement a timer, every time a change is made trigger a timer,
once timer is running no changes can be made
OR
set a value to 2. each time an action is made substruct 1. once the value is 0 stop all actions
start interval and add 1 to the number, once amx number is reached stop interval

scrolling sticky menu
*/

// ACCOUNTS
//////////////////////////////////////////////////////////////////
let accounts = [
  {
    accname: `1`,
    password: `1`,
    accownerfirstname: `Biggus`,
    accownersurname: `Dickus`,
    logindates: [1616143750530],
  },
  {
    accname: `2`,
    password: `2`,
    accownerfirstname: `Smallus`,
    accownersurname: `Dickus`,
    logindates: [1616143750530],
  },
  {
    accname: `3`,
    password: `3`,
    accownerfirstname: ``,
    accownersurname: ``,
    logindates: [1616143750530],
  },
];

let currentAccount, timer;

class App {
  constructor() {
    firstPageOptions.addEventListener(`click`, this.toggleLogin);
    btnLogin.addEventListener(`click`, this.btnLogin);
  }

  btnLogin(e) {
    e.preventDefault();
    currentAccount = accounts.find(function (acc) {
      return acc.accname === login.value;
    });
    if (currentAccount?.password === password.value) {
      /// IF LOGIN SUCCESS
      // TIME OPTIONS 1.
      const options = {
        day: `numeric`,
        month: `long`,
        year: `numeric`,
        weekday: `long`,
        hour: `numeric`,
        minute: `numeric`,
      };
      // DISPLAY LAST LOGIN 2.
      document.querySelector(
        `.lastDate`
      ).textContent = `Last login: ${new Intl.DateTimeFormat(
        navigator.language,
        options
      ).format(
        accounts[Number(accounts.indexOf(currentAccount))].logindates[
          accounts[Number(accounts.indexOf(currentAccount))].logindates.length - 1
        ]
      )}`;
      // GENERATE DATE 3.
      const now = new Date();
      const theTime = new Intl.DateTimeFormat(navigator.language, options).format(
        now
      );
      // START TIMER
      if (timer) clearInterval(timer);
      timer = startLogOutTimer();
      // CLEAR LOGIN FIELDS
      login.value = ``;
      clearFields();
      // OPEN MODAL
      openModal(`Logging in...`, 0, `120px`);
      // START ANIMATION
      main.classList.remove(`hidden`);
      setTimeout(function () {
        popupMsg.textContent =
          currentAccount.accownerfirstname === ``
            ? `Welcome ${
                currentAccount.accname.slice(0, 1).toUpperCase() +
                currentAccount.accname.slice(1).toLocaleLowerCase()
              }`
            : `Welcome ${currentAccount.accownerfirstname} ${currentAccount.accownersurname}`;
        setTimeout(function () {
          main.style.opacity = 100;
          createAccountBox.classList.add(`hidden`);
          loginBox.classList.add(`hidden`);
          firstPageOptions.classList.add(`hidden`);
          closeModal();
          homeLogo.classList.add(`homeLogoTriggered`);
          homeLogo.classList.remove(`hidden`);
        }, 1500);
      }, 1000);
      clearFields();
      // WELCOME MESSAGE
      document.querySelector(`.welcome`).textContent =
        currentAccount.accownerfirstname === ``
          ? `Welcome ${currentAccount.accname}`
          : `Welcome ${currentAccount.accownerfirstname} ${currentAccount.accownersurname}`;
      // DISPLAY CURRENT TIME
      document.querySelector(`.date`).textContent = theTime;
      // LOG LOGIN DATE
      accounts[Number(accounts.indexOf(currentAccount))].logindates.push(
        Number(new Date())
      );
      // PARAS JOKE TIME
      const publishDate = document.querySelector(`.publishDate`);
      publishDate.textContent = new Intl.DateTimeFormat(
        navigator.language,
        options
      ).format(new Date(Number(new Date()) - 3900000));
      //// IF LOGIN SUCCESS
    } else if (password.value === `` || login.value === ``) {
    } else {
      openModal(`Incorrect details`, 100, `100px`);
      clearFields();
    }
  };

  toggleLogin(e) {
    e.preventDefault();
    if (e.target.classList.contains(`btn_select_p1`)) {
      const link = e.target;
      const links = link
        .closest(`.first_page_options`)
        .querySelectorAll(`.btn_select_p1`);
      links.forEach(function (el) {
        el.classList.remove(`btnactive`);
        document.querySelector(`.box-1`).classList.add(`hidden`);
        document.querySelector(`.box-2`).classList.add(`hidden`);
      });
      links.forEach(function () {
        link.classList.add(`btnactive`);
        document
          .querySelector(`.box-${link.dataset.tab}`)
          .classList.remove(`hidden`);
      });
    }
  };


}


const app = new App();

// CLEAR FIELDS
//////////////////////////////////////////////////////////////////
const clearFields = function () {
  password.value = createInputPwd.value = createInputPwdC.value = ``;
};
//////////////////////////////////////////////////////////////////
// BUTTONS
linkPostBox.addEventListener(`click`, function () {
  postBoxWindow.classList.remove(`hidden`);
  homeLogo.classList.add(`hidden`);
  accountSettingsDiv.classList.add(`hidden`);
});

linkHome.addEventListener(`click`, function () {
  postBoxWindow.classList.add(`hidden`);
  homeLogo.classList.remove(`hidden`);
  accountSettingsDiv.classList.add(`hidden`);
});
btnAccountSettings.addEventListener(`click`, function () {
  accountSettingsDiv.classList.remove(`hidden`);
  postBoxWindow.classList.add(`hidden`);
  homeLogo.classList.add(`hidden`);
  updateAccountSettings();
});
// CLEAR TIMER
main.addEventListener(`click`, function () {
  clearInterval(timer);
  timer = startLogOutTimer();
});

// SELECT LOG IN


// LOGIN BUTTON


// LOG OUT BUTTON
btnLogOut.addEventListener(`click`, function () {
  clearInterval(timer);
  closeModal2();
  main.style.opacity = 0;
  openModal(`Logged Out`, 0, `120px`);
  setTimeout(function () {
    closeModal();
    postBoxWindow.classList.add(`hidden`);
    homeLogo.classList.remove(`homeLogoTriggered`);
    homeLogo.classList.add(`hidden`);
    accountSettingsDiv.classList.add(`hidden`);
    main.classList.add(`hidden`);
    firstPageOptions.classList.remove(`hidden`);
    loginBox.classList.remove(`hidden`);
  }, 3000);
});

// CREATE ACCOUNT
btnCreate.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (
    accounts.find(function (acc) {
      return acc.accname === createInputUser.value;
    })
  ) {
    createInputUser.value = ``;
    openModal(`Username already in use`, 100, `100px`);
    clearFields();
  } else if (
    createInputUser.value === `` ||
    createInputPwd.value === `` ||
    createInputPwdC === ``
  ) {
  } else if (createInputUser.value.length < 5) {
    openModal(`Username must be at least 5 characters long`, 100, `100px`);
    clearFields();
  } else if (createInputPwd.value.length < 5) {
    openModal(`Password must be at least 5 characters long`, 100, `100px`);
    clearFields();
  } else if (createInputPwd.value !== createInputPwdC.value) {
    openModal(`Passwords do not match`, 100, `100px`);
    clearFields();
  } else {
    accounts.push({
      accname: createInputUser.value,
      password: createInputPwd.value,
      accownerfirstname: ``,
      accownersurname: ``,
      logindates: [],
    });
    createInputUser.value = ``;
    clearFields();
    openModal(`Account created`, 100, `100px`);
  }
});

// ACCOUNT SETTINGS
const updateAccountSettings = function () {
  displayAccountName.textContent = `Account name: ${currentAccount.accname}`;
  displayAccountPwd.textContent = `Account password: ${currentAccount.password}`;
  displayAccOwnName.textContent = `Owner name: ${currentAccount.accownerfirstname}`;
  displayAccOwnSur.textContent = `Owner surname: ${currentAccount.accownersurname}`;
};

btnUpdateFirst.addEventListener(`click`, function (e) {
  e.preventDefault();
  updateWindow.classList.remove(`hidden`);
  updateWindow.style.display = `flex`;
  overlay.classList.remove(`hidden`);
});

btnUpdate.addEventListener(`click`, function (e) {
  e.preventDefault();

  function hasNumbers(t) {
    const regex = /\d/g;
    return regex.test(t);
  }

  if (updateName.value.length < 2 || updateSurname.value.length < 2) {
    openModal(
      `Your name and surname must be at least 2 letters long`,
      100,
      `100px`
    );
    modal.style.backgroundColor = `rgb(51, 51, 51)`;
    modal.style.color = `white`;
  } else if (hasNumbers(updateName.value) || hasNumbers(updateSurname.value)) {
    openModal(`Your name and surname cannot contain numbers`, 100, `100px`);
    modal.style.backgroundColor = `rgb(51, 51, 51)`;
    modal.style.color = `white`;
  } else if (
    !hasNumbers(updateName.value) &&
    !hasNumbers(updateSurname.value) &&
    updateName.value.length > 1 &&
    updateSurname.value.length > 1
  ) {
    currentAccount.accownerfirstname = updateName.value;
    currentAccount.accownersurname = updateSurname.value;
    updateName.value = updateSurname.value = ``;
    updateAccountSettings();
    openModal(`Account information updated`, 100, `100px`);
    updateWindow.classList.add(`hidden`);
    updateWindow.style.display = `none`;
  }
});

const closeModal2 = function () {
  updateWindow.classList.add(`hidden`);
  updateWindow.style.display = `none`;
  overlay.classList.add(`hidden`);
};

btnCancelUpdate.addEventListener(`click`, function (e) {
  e.preventDefault();
  closeModal2();
});
//////////////////////////////////////////////////////////////////
// MODAL
//////////////////////////////////////////////////////////////////
const openModal = function (str, opacity, height) {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
  popupMsg.textContent = str;
  btnCloseModal.style.opacity = opacity;
  modal.style.lineHeight = height;
  // THIS DOES NOT WORK
  // const button = document.createElement(`button`);
  // button.classList.add(`btn`, `close-modal`);
  // button.innerHTML = `&times;`;
  // document.querySelector(`.modal`).append(button);
};
// CLOSE MODAL FUNCTION
const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
  modal.style.backgroundColor = `white`;
  modal.style.color = `rgb(51, 51, 51)`;
};

// CLOSE MODAL BUTTON / OVERLAY
btnCloseModal.addEventListener(`click`, closeModal);
overlay.addEventListener(`click`, closeModal);
// CLOSE MODAL ESCAPE KEY
document.addEventListener(`keydown`, function (e) {
  if (
    (e.key === `Escape` && !modal.classList.contains(`hidden`)) ||
    (e.key === `Enter` && !modal.classList.contains(`hidden`))
  ) {
    closeModal();
  }
});
//////////////////////////////////////////////////////////////////
// LOG OUT TIMER
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    logoutTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      main.style.opacity = 0;
      homeLogo.classList.add(`homeLogoTriggered`);
      openModal(`Logged Out`, 0, `120px`);
      setTimeout(function () {
        closeModal();
        main.classList.add(`hidden`);
        firstPageOptions.classList.remove(`hidden`);
        loginBox.classList.remove(`hidden`);
      }, 3000);
    }
    time--;
  };
  let time = 300;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
//////////////////////////////////////////////////////////////////
// POSTBOX
document.querySelector(`.btnPostBox`).addEventListener(`click`, function (e) {
  e.preventDefault();
  const options = {
    day: `numeric`,
    month: `numeric`,
    year: `numeric`,
    hour: `numeric`,
    minute: `numeric`,
  };
  const postBoxTitle = document.querySelector(`.postBoxTitle`);
  const postBoxText = document.querySelector(`.postBoxText`);
  const postBoxComments = document.querySelector(`.postBoxComments`);
  const currentDate = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(new Date());

  const html = `<div class="flexBox">
  <h2>${currentAccount.accownerfirstname} ${currentAccount.accownersurname}
  </h2><p class="publishDate">${currentDate}</p>
  <h3 class="underline">${postBoxTitle.value}</h3>
  <p>${postBoxText.value}</p>
</div>`;

  if (postBoxTitle.value.length > 0 && postBoxText.value.length > 0)
    postBoxComments.insertAdjacentHTML(`afterbegin`, html);
  postBoxTitle.value = postBoxText.value = ``;
});
//////////////////////////////////////////////////////////////////

// FAKE LOGIN
// main.classList.remove(`hidden`);
// main.style.opacity = 100;
// document.querySelector(`.postBoxWindow`).classList.add(`hidden`);
// createAccountBox.classList.add(`hidden`);
// loginBox.classList.add(`hidden`);
// firstPageOptions.classList.add(`hidden`);
// currentAccount = accounts[2];
// FAKE LOGIN
