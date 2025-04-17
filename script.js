

  let serial = 1;

  function createRow() {
    const table = document.getElementById("formTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();

    row.innerHTML = `
      <td>${serial}</td>
      <td><input type="text" placeholder="Bill No"></td>
      <td><input type="text" placeholder="Supplier Name"></td>
      <td><input type="text" placeholder="Item"></td>
      <td><input type="text" placeholder="Qty/Pack"></td>
      <td>
        <select>
          <option value="">Select Country</option>
          <option>Pakistan</option>
          <option>China</option>
          <option>USA</option>
          <option>India</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">Select City</option>
          <option>Lahore</option>
          <option>Karachi</option>
          <option>Islamabad</option>
          <option>Faisalabad</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">Select Fright</option>
          <option>By Air</option>
          <option>By Sea</option>
          <option>By Road</option>
        </select>
      </td>
      <td>
        <select>
          <option value="">Select Vehicle</option>
          <option>ABC-123</option>
          <option>XYZ-456</option>
          <option>LMN-789</option>
        </select>
      </td>
      <td><input type="date"></td>
      <td><button class="add-btn" onclick="addRow(this)">Add</button></td>
    `;

    serial++;
  }

  function addRow(button) {
    const row = button.closest("tr");
    const inputs = row.querySelectorAll("input, select");

    for (let input of inputs) {
      if (!input.value) {
        alert("Please fill all fields before adding a new row.");
        return;
      }
    }

    showToast();
    createRow();
  }

  function showToast() {
    const toast = document.getElementById("toast");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  }

  function goToDashboard() {
   
    window.location.href = "dashboard.html";
  }


  window.onload = () => {
    createRow();
  };
