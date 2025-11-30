from fastapi import FastAPI, Header
from .models import Login, Signup, Entry
from .auth import signup_user, login_user, get_current_user
from .database import create_entry, set_database, see_users, delete_tabels, get_journal_entries
from fastapi.middleware.cors import CORSMiddleware

# delete_tabels()
set_database()
see_users()

import random
from datetime import datetime, timedelta
def add_samples():

    # Example subjects
    subjects = [
        "Morning Thoughts", "Work Reflection", "Personal Growth", "Daily Gratitude",
        "Evening Thoughts", "Mood Check", "Weekend Journal", "Learning Highlights",
        "Random Ideas", "Travel Dreams"
    ]

    # Example contents
    contents = [
        "I woke up feeling refreshed and ready to tackle the day.",
        "Work was challenging today, but I learned a lot.",
        "I feel grateful for my family and friends.",
        "Had a productive day and managed to finish my tasks.",
        "Feeling a bit down today, but I’m trying to stay positive.",
        "I spent time reading a good book, it lifted my mood.",
        "Went for a long walk and enjoyed the fresh air.",
        "I made progress on my personal project and felt accomplished.",
        "I had a small argument but resolved it calmly.",
        "Today I tried something new and it went surprisingly well.",
        "Feeling motivated to start a new habit.",
        "Had a relaxing evening, watched a movie and felt good.",
        "I am proud of myself for handling stress effectively.",
        "I noticed my energy levels were low, so I took a short nap.",
        "I feel optimistic about the upcoming week.",
        "Spent time reflecting on my goals and priorities.",
        "Had a fun conversation with a friend, felt happy.",
        "Felt anxious today, but meditated and felt calmer.",
        "I enjoyed cooking a new recipe, it turned out delicious.",
        "I felt content and peaceful after a long walk in nature."
    ]

    # Generate random dates for past 20 days
    dates = [(datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(20)]

    # Loop to insert entries for user_id=1
    user_id = 1
    for i in range(10):
        subject = random.choice(subjects)
        content = contents[i]
        created_at = dates[i]
        create_entry(user_id, subject, content, created_at)
    
    # Loop to insert entries for user_id=2
    user_id = 2
    for i in range(10, 20):
        subject = random.choice(subjects)
        content = contents[i]
        created_at = dates[i]
        create_entry(user_id, subject, content, created_at)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API running."}

# Creating endpoints
@app.post("/login")
def login(user: Login):
    return {"result": login_user(user)}

@app.post("/signup")
def signup(user: Signup):
    return {"result": signup_user(user)}

@app.post("/entry")
def add_entry(entry: Entry,
            authorization: str = Header(...)):
    token = authorization.split()[1]
    user_id = get_current_user(token)['user_id']
    create_entry(user_id, entry.subject, entry.content)
    return {"message": "Entry recieved"}

@app.get("/entries")
def list_entries(authorization: str = Header(...)):
    token = authorization.split()[1]
    user_id = get_current_user(token)['user_id']
    return get_journal_entries(user_id)

@app.get("/username")
def list_user(authorization: str = Header(...)):
    token = authorization.split()[1]
    user_name = get_current_user(token)
    print(user_name)
    # return get_current_user(token)['name']

# uvicorn main:app --reload
# lsof -i :4000
# kill -9 <>

# Add a database 
# Add JWT authentication
# Create protected route
# Write unit tests
# Add ML prediction
# Add routers
# Add frontend
