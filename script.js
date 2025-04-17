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


  newRow.querySelectorAll("input").forEach(input => input.value = "");
  newRow.querySelectorAll("select").forEach(select => select.value = "");


  newRow.querySelector("td").innerText = rowCount++;


  const actionCell = newRow.querySelector("td:last-child");
  actionCell.innerHTML = `
    <button class="addBtn" onclick="addRow(this)">Add</button>
    <button class="removeBtn" onclick="removeRow(this)">Remove</button>
  `;

  tbody.appendChild(newRow);
  showSuccess();
}

function removeRow(btn) {
  const row = btn.closest("tr");
  const tbody = document.querySelector("#formTable tbody");

  if (tbody.rows.length > 1) {
    row.remove();
  } else {
    alert("At least one row must remain.");
  }
}
