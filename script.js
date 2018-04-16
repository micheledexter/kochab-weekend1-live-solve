console.log('js');

const employeeList = [];
const MONTHLY_CONST_CAP = 20000;

$(document).ready(readyNow);

function readyNow() {
	console.log('JQ');
	$('#btn-add').on('click', addEmployee);
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

	// Style the footer row if the cost is above limit
	const monthlyCost = calculateTotalMonthlyCost();
	if (monthlyCost > MONTHLY_CONST_CAP) {
		$('tfoot tr').addClass('red');
	} else {
		$('tfoot tr').removeClass('red');
	}
	$('#out-monthly-cost').text(monthlyCost);
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
		</tr>
	`;
}