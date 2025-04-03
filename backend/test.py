from database import connect_db

conn = connect_db()
if conn:
    print("Database connection successful!")
    conn.close()
