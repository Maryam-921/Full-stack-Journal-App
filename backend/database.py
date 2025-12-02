import sqlite3
from sentiment import analyze_sentiment

path = "journal.db"

def set_path(new_path):
    global path
    path = new_path

def get_connection():
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    return conn

def set_database():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("PRAGMA foreign_keys = ON;")
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            password_hash TEXT NOT NULL
        );
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            subject TEXT,
            content TEXT NOT NULL,
            positive_score NUMERIC,
            negative_score NUMERIC,
            compound_score NUMERIC,
            sentiment TEXT,
            created_at DATE DEFAULT (DATE('now')),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        """
    )
    # created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    conn.commit()
    conn.close()

def create_user(username, name, password):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users WHERE username=?;", (username,))
    if cur.fetchone() is not None:
        conn.close()
        return False # duplicate user
    
    cur.execute(
        """
        INSERT INTO users (name, username, password_hash) 
        VALUES (?, ?, ?);
        """,
        (name, username, password)
    )
    conn.commit()
    conn.close()
    return True

def get_user(username):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT * FROM users WHERE username=?;
        """,
        (username, )
    )

    row = cur.fetchone()
    conn.close()

    if row is None:
        return None
    return row

def create_entry(user_id, subject, content):

    sentiment = analyze_sentiment(content)

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO entries (user_id, subject, content, 
        positive_score, negative_score,
        compound_score, sentiment) 
        VALUES (?, ?, ?, ?, ?, ?, ?);
        """,
        (user_id, subject, content, sentiment['positive'], 
        sentiment['negative'], sentiment['compound'], sentiment['sentiment'])
    )
    conn.commit()
    conn.close()

def get_journal_entries(user_id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        SELECT id, subject, content, sentiment, created_at,
        positive_score, negative_score, compound_score
        FROM entries 
        WHERE user_id = ?
        ORDER BY created_at DESC;
        """,
        (user_id,)
    )
    rows = cur.fetchall()
    conn.close()

    entries = [dict(row) for row in rows]
    return entries

def see_users():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM users;")
    users = cur.fetchall()
    print("Users:", users)
    headers = [desc[0] for desc in cur.description]

    # Print headers
    print(" | ".join(headers))
    print("-" * (len(" | ".join(headers)) + 10))

    # Print each row
    for user in users:
        print(" | ".join(str(field) for field in user))

    # ENTRIES
    cur.execute("SELECT * FROM entries;")
    entries = cur.fetchall()
    print("Entries:", entries)
    headers = [desc[0] for desc in cur.description]

    # Print headers
    print(" | ".join(headers))
    print("-" * (len(" | ".join(headers)) + 10))

    # Print each row
    for entry in entries:
        print(" | ".join(str(field) for field in entry))

    conn.close()

def delete_tabels():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DROP TABLE users;")
    cur.execute("DROP TABLE entries;")
    conn.commit()
    conn.close()

# from sqlalchemy import create_engine
# engine = create_engine('sqlite:///data.sqlite')
# conn = engine.connect()