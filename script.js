
function showItemForm() {
  // Hide the customer details section
  const customerDetails = document.getElementById('customerDetails');
  customerDetails.style.display = 'none';
  
  // Show the item details section
  const itemDetails = document.getElementById('itemDetails');
  itemDetails.style.display = 'block';
}

let receiptItems = [];
const shopName = "Laxmi Decoraters"; // Replace 'Your Shop Name' with your shop's name

function addItem() {
  const itemName = document.getElementById('itemName').value;
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

  if (!itemName || !itemPrice || isNaN(itemPrice) || !itemQuantity || isNaN(itemQuantity)) {
    alert('Please enter valid item details.');
    return;
  }

  const newItem = { name: itemName, price: itemPrice, quantity: itemQuantity };
  receiptItems.push(newItem);
  displayReceipt();
  
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
  document.getElementById('itemQuantity').value = '';
}

function displayReceipt() {
  const receiptDiv = document.getElementById('receipt');
  receiptDiv.innerHTML = '';

  receiptItems.forEach(item => {
    const newItem = document.createElement('div');
    newItem.innerHTML = `<strong>${item.name} ::</strong> ${item.quantity}:  x ₹${(item.price).toFixed(2)} = ₹${(item.price * item.quantity).toFixed(2)}`;
    receiptDiv.appendChild(newItem);
  });
}

function generatePDF() {
  const filename = 'receipt.pdf';
  let itemsTable = '<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #000;">';
  
  // Rest of your table creation code
  itemsTable += '<tr><th style="text-align:left; padding: 8px; border-bottom: 1px solid #000;">Sr. No.</th><th style="text-align:left; padding: 8px; border-bottom: 1px solid #000; width: 40%;">Item</th><th style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">Quantity</th><th style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">Price Per Piece(₹)</th><th style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">Amount(₹)</th></tr>';

  let totalAmount = 0;
  receiptItems.forEach((item, index) => {
    const serialNumber = index + 1;
    totalAmount += item.price * item.quantity;
    itemsTable += `<tr><td style="padding: 8px; border-bottom: 1px solid #000;">${serialNumber}</td><td style="padding: 8px; border-bottom: 1px solid #000;">${item.name}</td><td style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">${item.quantity}</td><td style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">₹${item.price.toFixed(2)}</td><td style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">₹${(item.price * item.quantity).toFixed(2)}</td></tr>`;
  });
  
  itemsTable += `<tr style="background-color: rgb(223, 223, 223);"><td colspan="3" style="text-align:right; padding: 8px;"><strong>Total:</strong></td><td colspan = "2" style="text-align:center; padding: 8px; border-top: 1px solid #000;"><strong>₹${totalAmount.toFixed(2)}</strong></td></tr>`;
  itemsTable += '</table>';
  
  var cname = document.getElementById("customerName").value
  var cph = document.getElementById("customerPhone").value
  var cadd = document.getElementById("customerAddress").value
  var amt = document.getElementById("received").value
  
  const image = `<img src="android-chrome-512x512.png" alt="logo"/>`;
  const shopHeader = `<h1 style="text-align: center; font-size: 36px; margin-bottom: 10px; color: black; text-shadow: 2px 2px 4px #000;">${shopName}</h1>`;
  const shopDetails = `<p><strong>Address:</strong> B/3 Mahesh Nagar Near Hanuman Mandir Nalasopara East -401303<br><strong>Owner:</strong> SURESH NARAYAN KORGAONKAR<br><strong>Phone Number:</strong> 9892023888</p>`;
  const currentDate = new Date().toLocaleDateString();
  const customerDetails = `
  <div style="display:flex;justify-content:left; margin:5px 10px;flex-wrap:wrap;gap:30px">
  <p><strong>Bill to:</strong><p>${cname}</p><p>${cph}</p><p>${cadd}</p></p>
  </div>
  `;
  const dateDiv = `<div style="display:flex;justify-content:right; margin:px 5px 10px;">Date: ${currentDate}</div>`;
  const total = `<div style="display:flex;justify-content:right; margin:px 5px 10px;">Total Amount: ${totalAmount}</div>`;
  const recamt = `<div style="display:flex;justify-content:right; margin:px 5px 10px;">Amount Received: ${amt}</div>`;
  const balance = `<div style="display:flex;justify-content:right; margin:px 5px 10px;">Transaction Balance: ${totalAmount-amt}</div>`;
  
  const content = `<html><head><title>${shopName}</title><style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    div { display: flex; gap: 5px; justify-content: center; }
    div img { display: flex; width: 50px; height: 50px; margin: 13px 5px; padding: 5px 0px; }
    p { line-height: 30px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 10px; border: 1px solid #000; }
    th { background-color: #f2f2f2; }
  </style></head><body><div>${image} ${shopHeader}</div>${shopDetails} ${dateDiv} ${customerDetails} ${itemsTable} ${total} ${recamt} ${balance}</body></html>`;
   
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
}
