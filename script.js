console.log('js');

const employeeList = [];
const MONTHLY_CONST_CAP = 20000;

$(document).ready(readyNow);

function readyNow() {
	console.log('JQ');
	$('#btn-add').on('click', addEmployee);
	$('#out-employees').on('click', '.btn-delete', deleteEmployee)
}

function deleteEmployee() {
	console.log('Clicked on', $(this));
	const rowToDelete = $(this).closest('tr');
	console.log('Row to delete', rowToDelete);
	const employeeToDelete = rowToDelete.data();
	console.log('Employee to delete', employeeToDelete);
	rowToDelete.remove();

	// Remove the employee from the array
	for (let i = 0; i < employeeList.length; i++) {
		let current = employeeList[i];
		if (current.employeeID == employeeToDelete.employeeID) {
			employeeList.splice(i, 1);
		}
	}

	// Recalculate the monthly cost
	updateTotalMonthlyCost()
}

function updateTotalMonthlyCost() {
	// Style the footer row if the cost is above limit
	const monthlyCost = calculateTotalMonthlyCost();
	if (monthlyCost > MONTHLY_CONST_CAP) {
		$('tfoot tr').addClass('red');
	} else {
		$('tfoot tr').removeClass('red');
	}
	$('#out-monthly-cost').text(monthlyCost);
}

function Employee (first, last, id, title, salary) {
	this.firstName = first;
	this.lastName = last;
	this.employeeID = id;
	this.title = title;
	this.annualSalary = parseInt(salary);
}

function addEmployee() {
	const employee = new Employee(
		$('#in-first').val(),
		$('#in-last').val(),
		$('#in-id').val(),
		$('#in-title').val(),
		$('#in-salary').val()
	);
	console.log('New employee: ', employee);
	
	// Clear the input fields
	$('input').val('');

	// Add it to the array
	employeeList.push(employee);


	// Update the DOM to show employee
	$('#out-employees').append(createEmployeeHtml(employee));
	// Add employee data to the last row added to the tbody
	$('#out-employees tr:last').data(employee);
	updateTotalMonthlyCost();
}

function calculateTotalMonthlyCost() {
	let totalAnnual = 0;
	for (let employee of employeeList) {
		totalAnnual += employee.annualSalary;
	}
	return (totalAnnual / 12).toFixed(2);
}

function createEmployeeHtml(employee) {
	return `
		<tr>
			<td>${employee.firstName}</td>
			<td>${employee.lastName}</td>
			<td>${employee.employeeID}</td>
			<td>${employee.title}</td>
			<td>${employee.annualSalary}</td>
			<td><button class="btn-delete">Delete</button></td>
		</tr>
	`;
}