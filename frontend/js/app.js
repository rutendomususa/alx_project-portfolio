document.addEventListener("DOMContentLoaded", function () {
    console.log("EduConnect Loaded!");

    // Smooth Scroll Animation for Sections
    const sections = document.querySelectorAll(".info-section");

    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 50) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    // Signup Form Validation
    document.getElementById("signup-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let password = document.getElementById("password").value.trim();

        if (!name || !email || !password) {
            alert("Please fill in all fields!");
            return;
        }

        alert("Signup Successful!");
        this.reset();
    });

    // Login Form Validation
    document.getElementById("login-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        let email = document.getElementById("login-email").value.trim();
        let password = document.getElementById("login-password").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password!");
            return;
        }

        alert("Login Successful!");
        this.reset();
    });

    // Course Enrollment Validation
    document.getElementById("course-form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let courseName = document.getElementById("course-name").value;
        let studentName = document.getElementById("student-name").value;
        let email = document.getElementById("student-email").value;
    
        if (courseName === "" || studentName === "" || email === "") {
            alert("Please fill in all fields!");
            return;
        }
    
        fetch("/enroll", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ course_name: courseName, student_name: studentName, email: email })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById("course-form").reset();
        })
        .catch(error => console.error("Error:", error));
    });
    
});
// Course Enrollment Validation
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("enrollment-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const course = document.getElementById("course").value;
        
        // Simple validation
        if (name === "" || email === "" || course === "") {
            alert("Please fill in all fields.");
            return;
        }
        
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // Display confirmation message
        alert(`Thank you, ${name}! You have successfully enrolled in ${course}.`);
        
        // Optionally, clear the form after submission
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
