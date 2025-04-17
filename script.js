let rowCount = 2;

function dashboardPeWapas() {
  window.location.href = "dashboard.html"; 
}

function showSuccess() {
  const msg = document.getElementById("toast");
  msg.style.display = "block";
  setTimeout(() => (msg.style.display = "none"), 2000);
}

function addRow(btn) {
  const row = btn.closest("tr");
  const inputs = row.querySelectorAll("input, select");

  for (let el of inputs) {
    if (!el.value) {
      alert("PLEASE FILL ALL THE FIELDS!");
      return;
    }
  }

  const tbody = document.querySelector("#formTable tbody"); 
  const newRow = row.cloneNode(true);

  newRow.querySelectorAll("input").forEach((input) => (input.value = ""));
  newRow.querySelectorAll("select").forEach((select) => (select.value = ""));
  newRow.querySelector("td").innerText = rowCount;

  rowCount++;
  tbody.appendChild(newRow);
  showSuccess();
}
