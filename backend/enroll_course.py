from db_config import connect_db

def enroll_student(course_name, student_name, email):
    connection = connect_db()
    if connection is None:
        print("❌ Database connection failed!")
        return

    cursor = connection.cursor()
    try:
        sql = "INSERT INTO courses (course_name, student_name, email) VALUES (%s, %s, %s)"
        values = (course_name, student_name, email)
        cursor.execute(sql, values)
        connection.commit()
        print("✅ Enrollment Successful!")
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        cursor.close()
        connection.close()

# Test Enrollment
if __name__ == "__main__":
    enroll_student("Mathematics", "John Doe", "johndoe@example.com")
