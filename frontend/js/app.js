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
    document.getElementById("register").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
    
        // Collect form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();
    
        // Validation: Ensure all fields are filled
        if (!name || !email || !phone || !password || !confirmPassword) {
            alert("❌ Please fill in all fields before submitting.");
            return; // Stop execution
        }
    
        // Validation: Ensure passwords match
        if (password !== confirmPassword) {
            alert("❌ Passwords do not match. Please re-enter.");
            return;
        }
    
        // Prepare data for API request
        const formData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };
    
        // Send data to Flask API
        fetch("http://127.0.0.1:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // Show response from server
        })
        .catch(error => {
            console.error("Error:", error);
            alert("❌ Something went wrong. Please try again.");
        });
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
// enrolment session 
document.addEventListener("DOMContentLoaded", function () {
    const userEmail = sessionStorage.getItem("user_email"); // Get stored email from session

    if (userEmail) {
        const enrollButtons = document.querySelectorAll(".enroll-btn");
        enrollButtons.forEach(button => {
            button.setAttribute("data-user-email", userEmail);
        });
    }
});
// enrollment click handler 
document.addEventListener("DOMContentLoaded", function () {
    const enrollButtons = document.querySelectorAll(".enroll-btn");

    enrollButtons.forEach(button => {
        button.addEventListener("click", function () {
            const courseId = this.getAttribute("data-course-id");
            const userEmail = this.getAttribute("data-user-email");

            if (!userEmail) {
                alert("Please log in to enroll in this course.");
                window.location.href = "/login"; // Redirect to login page
                return;
            }

            fetch("/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_email: userEmail,
                    course_id: courseId
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    });
});

// Enrollment Request
document.addEventListener("DOMContentLoaded", function () {
    const enrollButtons = document.querySelectorAll(".enroll-btn");

    enrollButtons.forEach(button => {
        button.addEventListener("click", function () {
            const courseId = this.getAttribute("data-course-id");
            const userEmail = this.getAttribute("data-user-email");

            if (!userEmail) {
                alert("Please log in to enroll in this course.");
                window.location.href = "/login"; 
                return;
            }

            fetch("/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_email: userEmail, course_id: courseId })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        });
    });
});
//Progress Update Request

function updateProgress(courseId, newProgress) {
    const userEmail = sessionStorage.getItem("user_email"); 

    fetch("/update_progress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_email: userEmail,
            course_id: courseId,
            progress: newProgress
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Progress updated:", data.message);
    })
    .catch(error => {
        console.error("Error updating progress:", error);
    });
}
