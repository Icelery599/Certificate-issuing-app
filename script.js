// Student data with status
        const students = [
            { name: "Alex Johnson", status: "cleared" },
            { name: "Maria Garcia", status: "outstanding" },
            { name: "James Smith", status: "cleared" },
            { name: "Sarah Williams", status: "outstanding" },
            { name: "Robert Chen", status: "cleared" },
            { name: "Emma Davis", status: "cleared" },
            { name: "Michael Brown", status: "outstanding" },
            { name: "Olivia Wilson", status: "cleared" }
        ];
        
        // DOM Elements
        const studentSelect = document.getElementById('studentName');
        const studentList = document.getElementById('studentList');
        const issueDate = document.getElementById('issueDate');
        const todayBtn = document.getElementById('todayBtn');
        const certificateType = document.getElementById('certificateType');
        const generateBtn = document.getElementById('generateBtn');
        const clearBtn = document.getElementById('clearBtn');
        const printBtn = document.getElementById('printBtn');
        
        // Certificate display elements
        const recipientName = document.getElementById('recipientName');
        const certificateDate = document.getElementById('certificateDate');
        const statusDisplay = document.getElementById('statusDisplay');
        
        // Initialize with today's date
        function setTodayDate() {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            issueDate.value = formattedDate;
            certificateDate.textContent = formatDateForDisplay(today);
        }
        
        // Format date for display
        function formatDateForDisplay(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
        
        // Populate student list
        function populateStudentList() {
            studentList.innerHTML = '';
            
            students.forEach(student => {
                const studentItem = document.createElement('div');
                studentItem.className = 'student-item';
                studentItem.dataset.name = student.name;
                studentItem.dataset.status = student.status;
                
                studentItem.innerHTML = `
                    <span class="student-name">${student.name}</span>
                    <span class="status-badge ${student.status === 'outstanding' ? 'status-outstanding' : 'status-cleared'}">
                        ${student.status === 'outstanding' ? 'Outstanding' : 'Cleared'}
                    </span>
                `;
                
                // Add click event to select student
                studentItem.addEventListener('click', () => {
                    studentSelect.value = student.name;
                    updateCertificate();
                });
                
                studentList.appendChild(studentItem);
            });
        }
        
        // Update certificate display
        function updateCertificate() {
            const selectedStudentName = studentSelect.value;
            const selectedDate = new Date(issueDate.value);
            const selectedType = certificateType.value;
            
            // Update recipient name
            if (selectedStudentName) {
                recipientName.textContent = selectedStudentName;
                
                // Find student status
                const selectedStudent = students.find(student => student.name === selectedStudentName);
                if (selectedStudent) {
                    const status = selectedStudent.status;
                    statusDisplay.textContent = `Status: ${status === 'outstanding' ? 'Outstanding Requirements' : 'All Cleared'}`;
                    statusDisplay.className = `status-display ${status === 'outstanding' ? 'status-outstanding' : 'status-cleared'}`;
                    
                    // Update certificate title based on status
                    const certificateTitle = document.querySelector('.certificate-title');
                    if (status === 'outstanding') {
                        certificateTitle.textContent = `Certificate of ${selectedType} (Pending)`;
                        certificateTitle.style.color = 'var(--outstanding-color)';
                    } else {
                        certificateTitle.textContent = `Certificate of ${selectedType}`;
                        certificateTitle.style.color = 'var(--secondary-color)';
                    }
                }
            } else {
                recipientName.textContent = '[Student Name]';
                statusDisplay.textContent = 'Status: Not Selected';
                statusDisplay.className = 'status-display';
            }
            
            // Update date
            if (issueDate.value) {
                certificateDate.textContent = formatDateForDisplay(selectedDate);
            } else {
                certificateDate.textContent = '[Date]';
            }
        }
        
        // Event Listeners
        todayBtn.addEventListener('click', setTodayDate);
        
        studentSelect.addEventListener('change', updateCertificate);
        
        issueDate.addEventListener('change', updateCertificate);
        
        certificateType.addEventListener('change', updateCertificate);
        
        generateBtn.addEventListener('click', () => {
            if (!studentSelect.value) {
                alert('Please select a student first.');
                return;
            }
            
            updateCertificate();
            
            // Add a visual confirmation
            generateBtn.innerHTML = '<i class="fas fa-check"></i> Certificate Generated';
            generateBtn.style.backgroundColor = 'var(--cleared-color)';
            
            setTimeout(() => {
                generateBtn.innerHTML = '<i class="fas fa-certificate"></i> Generate Certificate';
                generateBtn.style.backgroundColor = '';
            }, 2000);
        });
        
        clearBtn.addEventListener('click', () => {
            studentSelect.value = '';
            setTodayDate();
            certificateType.value = 'Completion';
            updateCertificate();
            
            // Visual feedback
            clearBtn.innerHTML = '<i class="fas fa-check"></i> Form Cleared';
            setTimeout(() => {
                clearBtn.innerHTML = '<i class="fas fa-redo"></i> Clear Form';
            }, 1500);
        });
        
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        // Initialize
        setTodayDate();
        populateStudentList();
        updateCertificate();