let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
let editId = null;

const form = document.getElementById("ticketForm");
const tableBody = document.getElementById("ticketsTable");
const resetBtn = document.getElementById("resetBtn");

const subjectInput = document.getElementById("subjectInput");
const statusSelect = document.getElementById("statusSelect");
const prioritySelect = document.getElementById("prioritySelect");
const messageInput = document.getElementById("messageInput");
const authorInput = document.getElementById("authorInput");

const subjectError = document.getElementById("subjectError");
const statusError = document.getElementById("statusError");
const priorityError = document.getElementById("priorityError");
const messageError = document.getElementById("messageError");
const authorError = document.getElementById("authorError");

function render() {
  tableBody.innerHTML = "";

  tickets.forEach(ticket => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${ticket.subject}</td>
      <td>${ticket.status}</td>
      <td>${ticket.priority}</td>
      <td>${ticket.author}</td>
      <td>
        <button data-edit="${ticket.id}">Редагувати</button>
        <button data-delete="${ticket.id}">Видалити</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  localStorage.setItem("tickets", JSON.stringify(tickets));
}

function validate() {
  let valid = true;

  clearErrors();

  if (!subjectInput.value.trim()) {
    subjectError.textContent = "Введіть тему";
    subjectInput.classList.add("invalid");
    valid = false;
  }

  if (!statusSelect.value) {
    statusError.textContent = "Оберіть статус";
    statusSelect.classList.add("invalid");
    valid = false;
  }

  if (!prioritySelect.value) {
    priorityError.textContent = "Оберіть пріоритет";
    prioritySelect.classList.add("invalid");
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = "Введіть опис";
    messageInput.classList.add("invalid");
    valid = false;
  }

  if (!authorInput.value.trim()) {
    authorError.textContent = "Введіть автора";
    authorInput.classList.add("invalid");
    valid = false;
  }

  return valid;
}

function clearErrors() {
  document.querySelectorAll(".error-text").forEach(e => e.textContent = "");
  document.querySelectorAll("input, select, textarea")
    .forEach(el => el.classList.remove("invalid"));
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  if (!validate()) return;

  const ticketData = {
    id: editId || Date.now(),
    subject: subjectInput.value.trim(),
    status: statusSelect.value,
    priority: prioritySelect.value,
    message: messageInput.value.trim(),
    author: authorInput.value.trim()
  };

  if (editId) {
    tickets = tickets.map(t => t.id === editId ? ticketData : t);
    editId = null;
  } else {
    tickets.push(ticketData);
  }

  form.reset();
  render();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  editId = null;
  clearErrors();
});

tableBody.addEventListener("click", function(e) {
  const edit = e.target.dataset.edit;
  const del = e.target.dataset.delete;

  if (del) {
    tickets = tickets.filter(t => t.id != del);
    render();
  }

  if (edit) {
    const ticket = tickets.find(t => t.id == edit);

    subjectInput.value = ticket.subject;
    statusSelect.value = ticket.status;
    prioritySelect.value = ticket.priority;
    messageInput.value = ticket.message;
    authorInput.value = ticket.author;

    editId = ticket.id;
  }
});

render();

