let receiptItems = [];
const shopName = "General Store"; // Replace 'Your Shop Name' with your shop's name

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
    let itemsTable = '<table style="width:100%; border-collapse: collapse; margin-bottom: 20px; border: 1px solid #000;"><tr><th style="text-align:left; padding: 8px; border-bottom: 1px solid #000;">Sr. No.</th><th style="text-align:left; padding: 8px; border-bottom: 1px solid #000; width: 40%;">Item</th><th style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">Quantity</th><th style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">Price (₹)</th></tr>';
  
    let totalAmount = 0;
    receiptItems.forEach((item, index) => {
      const serialNumber = index + 1;
      totalAmount += item.price * item.quantity;
      itemsTable += `<tr><td style="padding: 8px; border-bottom: 1px solid #000;">${serialNumber}</td><td style="padding: 8px; border-bottom: 1px solid #000;">${item.name}</td><td style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">${item.quantity}</td><td style="text-align:right; padding: 8px; border-bottom: 1px solid #000;">₹${item.price.toFixed(2)}</td></tr>`;
    });
  
    itemsTable += `<tr><td colspan="3" style="text-align:right; padding: 8px;"><strong>Total:</strong></td><td style="text-align:right; padding: 8px; border-top: 1px solid #000;"><strong>₹${totalAmount.toFixed(2)}</strong></td></tr>`;
    itemsTable += '</table>';
  
    const shopHeader = `<h1 style="text-align: center; font-size: 36px; margin-bottom: 10px; color: black; text-shadow: 2px 2px 4px #000;">${shopName}</h1>`;
    const shopDetails = `<p><strong>Address:</strong> Your Shop Address<br><strong>Owner:</strong> XXXXX<br><strong>Phone Number:</strong>XXXXXXXXXX</p>`;
  
    const content = `<html><head><title>${shopName}</title><style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 10px; border: 1px solid #000; }
      th { background-color: #f2f2f2; }
    </style></head><body>${shopHeader}${shopDetails}${itemsTable}</body></html>`;
  
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();
  
    printWindow.print();
  }
  