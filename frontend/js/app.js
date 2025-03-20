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
    document.getElementById("course-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        let courseName = document.getElementById("course-name").value.trim();
        let studentName = document.getElementById("student-name").value.trim();

        if (!courseName || !studentName) {
            alert("Please provide all details!");
            return;
        }

        alert("Enrollment Successful!");
        this.reset();
    });
});
