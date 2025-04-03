from flask import Flask, request, jsonify
from db_config import connect_db  # Import database connection
from enroll_course import enroll_student


app = Flask(__name__)
# Test Database Connection
conn = connect_db()
if conn:
    cursor = conn.cursor()
    print("✅ Database connection successful.")
else:
    print("❌ Database connection failed.")

# Handling User Registration
@app.route('/register', methods=['POST'])  
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    phone = data ['phone']
    password = data['password']
    confirm_password = data['confirm_password']

    conn = connect_db()
    if conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (name, email, phone, password, confirm_password) VALUES (%s, %s, %s, %s, %s)", (name, email, phone, password, confirm_password))
        conn.commit()
        cursor.close()
        return jsonify({"message": "User registered successfully!"}), 201
    else:
        return jsonify({"error": "Database connection error!"}), 500



# Route to handle course enrollment
@app.route("/enroll", methods=["POST"])
def enroll():
    try:
        data = request.json
        user_email = data.get("user_email")
        course_id = data.get("course_id")

        if not user_email or not course_id:
            return jsonify({"error": "Missing user email or course ID"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user is already enrolled
        cursor.execute("SELECT * FROM enrollments WHERE user_email = %s AND course_id = %s", (user_email, course_id))
        existing = cursor.fetchone()

        if existing:
            return jsonify({"message": "Already enrolled in this course"}), 409

        # Insert enrollment record
        cursor.execute("INSERT INTO enrollments (user_email, course_id) VALUES (%s, %s)", (user_email, course_id))
        conn.commit()

        return jsonify({"message": "Enrollment successful"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

# Route to update progress
@app.route("/update_progress", methods=["POST"])
def update_progress():
    try:
        data = request.json
        user_email = data.get("user_email")
        course_id = data.get("course_id")
        progress = data.get("progress")

        if not user_email or not course_id or progress is None:
            return jsonify({"error": "Missing required fields"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Update progress
        cursor.execute("UPDATE enrollments SET progress = %s WHERE user_email = %s AND course_id = %s",
                       (progress, user_email, course_id))
        conn.commit()

        return jsonify({"message": "Progress updated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
