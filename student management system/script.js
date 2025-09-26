document.addEventListener('DOMContentLoaded', function() {
    // Student data storage
    let students = [
        { id: 1, name: 'Student 1', advisor: 'Teacher 1', status: 'Approved', semester: 'Fall', type: 'TA', budget: '12345', percentage: '100%' },
        { id: 2, name: 'Student 2', advisor: 'Teacher 2', status: 'Approved', semester: 'Fall', type: 'TA', budget: '23456', percentage: '100%' },
        { id: 3, name: 'Student 3', advisor: 'Teacher 3', status: 'Approved', semester: 'Fall', type: 'TA', budget: '34567', percentage: '100%' }
    ];

    // DOM elements
    const tableBody = document.querySelector('#students-table tbody');
    const submitBtn = document.getElementById('submit-btn');
    const addStudentBtn = document.getElementById('add-student-btn');
    const messageModal = document.getElementById('message-modal');
    const messageText = document.getElementById('message-text');
    const editModal = document.getElementById('edit-modal');
    const editTitle = document.getElementById('edit-title');
    const editInput = document.getElementById('edit-input');
    const editOk = document.getElementById('edit-ok');
    const editCancel = document.getElementById('edit-cancel');
    const closeModal = document.querySelector('.close');

    // Initialize the table
    function initializeTable() {
        tableBody.innerHTML = '';
        students.forEach(student => {
            addStudentToTable(student);
        });
    }

    // Add a student to the table
    function addStudentToTable(student) {
        const row = document.createElement('tr');
        row.setAttribute('data-id', student.id);
        
        // Expand/collapse cell
        const expandCell = document.createElement('td');
        const expandIcon = document.createElement('span');
        expandIcon.className = 'expand-icon';
        expandIcon.textContent = '▶';
        expandIcon.addEventListener('click', toggleDetails);
        expandCell.appendChild(expandIcon);
        row.appendChild(expandCell);
        
        // Student name cell
        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        row.appendChild(nameCell);
        
        // Advisor cell
        const advisorCell = document.createElement('td');
        advisorCell.textContent = student.advisor;
        row.appendChild(advisorCell);
        
        // Status cell
        const statusCell = document.createElement('td');
        statusCell.textContent = student.status;
        row.appendChild(statusCell);
        
        // Semester cell
        const semesterCell = document.createElement('td');
        semesterCell.textContent = student.semester;
        row.appendChild(semesterCell);
        
        // Type cell
        const typeCell = document.createElement('td');
        typeCell.textContent = student.type;
        row.appendChild(typeCell);
        
        // Budget cell
        const budgetCell = document.createElement('td');
        budgetCell.textContent = student.budget;
        row.appendChild(budgetCell);
        
        // Percentage cell
        const percentageCell = document.createElement('td');
        percentageCell.textContent = student.percentage;
        row.appendChild(percentageCell);
        
        // Delete button cell
        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteStudent);
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);
        
        // Edit button cell
        const editCell = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editStudent);
        editCell.appendChild(editBtn);
        row.appendChild(editCell);
        
        // Checkbox for row selection
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'row-selector';
        checkbox.addEventListener('change', handleRowSelection);
        
        // Insert checkbox at the beginning of the row
        row.insertBefore(createCellWithCheckbox(checkbox), row.firstChild);
        
        // Add the row to the table
        tableBody.appendChild(row);
        
        // Add details row
        addDetailsRow(student.id);
    }

    // Create a cell with a checkbox
    function createCellWithCheckbox(checkbox) {
        const cell = document.createElement('td');
        cell.appendChild(checkbox);
        return cell;
    }

    // Add details row for a student
    function addDetailsRow(studentId) {
        const detailsRow = document.createElement('tr');
        detailsRow.className = 'details-row';
        detailsRow.setAttribute('data-id', studentId);
        
        const detailsCell = document.createElement('td');
        detailsCell.colSpan = 10;
        detailsCell.className = 'details-content';
        
        detailsCell.innerHTML = `
            <h4>Student ${studentId} Details:</h4>
            <p><strong>Award Details:</strong> Honors Student</p>
            <p><strong>Semester:</strong> Fall 1-2024(TA)</p>
            <p><strong>Comments:</strong> Outstanding</p>
            <p><strong>Award Status:</strong> A</p>
        `;
        
        detailsRow.appendChild(detailsCell);
        tableBody.appendChild(detailsRow);
    }

    // Toggle details row visibility
    function toggleDetails(event) {
        const icon = event.target;
        const row = icon.closest('tr');
        const studentId = row.getAttribute('data-id');
        const detailsRow = document.querySelector(`.details-row[data-id="${studentId}"]`);
        
        if (detailsRow.classList.contains('expanded')) {
            detailsRow.classList.remove('expanded');
            icon.textContent = '▶';
        } else {
            detailsRow.classList.add('expanded');
            icon.textContent = '▼';
        }
    }

    // Handle row selection via checkbox
    function handleRowSelection(event) {
        const checkbox = event.target;
        const row = checkbox.closest('tr');
        const studentId = row.getAttribute('data-id');
        const deleteBtn = row.querySelector('.delete-btn');
        const editBtn = row.querySelector('.edit-btn');
        
        if (checkbox.checked) {
            row.classList.add('selected');
            deleteBtn.style.display = 'inline-block';
            editBtn.style.display = 'inline-block';
            submitBtn.classList.add('enabled');
            submitBtn.disabled = false;
        } else {
            row.classList.remove('selected');
            deleteBtn.style.display = 'none';
            editBtn.style.display = 'none';
            
            // Check if any checkboxes are still selected
            const anySelected = document.querySelectorAll('.row-selector:checked').length > 0;
            if (!anySelected) {
                submitBtn.classList.remove('enabled');
                submitBtn.disabled = true;
            }
        }
    }

    // Add a new student
    function addNewStudent() {
        // Find the next available ID (fill gaps if any)
        let nextId = 1;
        const existingIds = students.map(s => s.id).sort((a, b) => a - b);
        
        for (let i = 0; i < existingIds.length; i++) {
            if (existingIds[i] !== nextId) {
                break;
            }
            nextId++;
        }
        
        const newStudent = {
            id: nextId,
            name: `Student ${nextId}`,
            advisor: `Teacher ${nextId}`,
            status: 'Approved',
            semester: 'Fall',
            type: 'TA',
            budget: (12345 + (nextId - 1) * 11111).toString(),
            percentage: '100%'
        };
        
        students.push(newStudent);
        addStudentToTable(newStudent);
        showMessage(`Student ${nextId} Record added successfully`);
    }

    // Delete a student
    function deleteStudent(event) {
        const button = event.target;
        const row = button.closest('tr');
        const studentId = parseInt(row.getAttribute('data-id'));
        const studentName = `Student ${studentId}`;
        
        // Remove from students array
        students = students.filter(s => s.id !== studentId);
        
        // Remove from table
        row.remove();
        
        // Remove details row
        const detailsRow = document.querySelector(`.details-row[data-id="${studentId}"]`);
        if (detailsRow) {
            detailsRow.remove();
        }
        
        showMessage(`${studentName} Record deleted successfully`);
        
        // Update submit button state
        const anySelected = document.querySelectorAll('.row-selector:checked').length > 0;
        if (!anySelected) {
            submitBtn.classList.remove('enabled');
            submitBtn.disabled = true;
        }
    }

    // Edit a student (show modal)
    function editStudent(event) {
        const button = event.target;
        const row = button.closest('tr');
        const studentId = parseInt(row.getAttribute('data-id'));
        const studentName = `Student ${studentId}`;
        
        editTitle.textContent = `Edit details of ${studentName}`;
        editInput.value = '';
        editModal.style.display = 'block';
        
        // Store the student ID for the OK button handler
        editOk.dataset.studentId = studentId;
    }

    // Show message in modal
    function showMessage(message) {
        messageText.textContent = message;
        messageModal.style.display = 'block';
    }

    // Event listeners
    addStudentBtn.addEventListener('click', addNewStudent);
    
    closeModal.addEventListener('click', function() {
        messageModal.style.display = 'none';
    });
    
    editOk.addEventListener('click', function() {
        const studentId = parseInt(this.dataset.studentId);
        const studentName = `Student ${studentId}`;
        
        if (editInput.value.trim() !== '') {
            showMessage(`${studentName} data updated successfully`);
        } else {
            showMessage(`No changes made to ${studentName}`);
        }
        
        editModal.style.display = 'none';
    });
    
    editCancel.addEventListener('click', function() {
        editModal.style.display = 'none';
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === messageModal) {
            messageModal.style.display = 'none';
        }
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Initialize the table when page loads
    initializeTable();
});