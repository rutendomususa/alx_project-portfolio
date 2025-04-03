import mysql.connector

# Database Configuration
db_config = {
    "host": "localhost",
    "user": "root",   
    "password": "root",  
    "database": "educonnect_db"
}

def connect_db():
    try:
        conn = mysql.connector.connect(**db_config)
        if conn.is_connected():
            print("✅ Connected to MySQL Database")
        return conn
    except mysql.connector.Error as e:
        print(f"❌ Database Connection Error: {e}")
        return None
