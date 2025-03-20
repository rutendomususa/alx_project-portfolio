from flask import Flask, request, jsonify
from enroll_course import enroll_student

app = Flask(__name__)

@app.route('/enroll', methods=['POST'])
def enroll():
    data = request.json
    course_name = data.get("course_name")
    student_name = data.get("student_name")
    email = data.get("email")

    if not course_name or not student_name or not email:
        return jsonify({"error": "All fields are required!"}), 400

    enroll_student(course_name, student_name, email)
    return jsonify({"message": "Enrollment successful!"}), 200

if __name__ == "__main__":
    app.run(debug=True)
