from fastapi.testclient import TestClient
from ..main import app
from .. import database
import os

# Override the DB path for tests
TEST_DB = "journal_test.db"

def setup_module():
    # Ensure a clean test DB file
    if os.path.exists(TEST_DB):
        os.remove(TEST_DB)

    # Override the database path
    database.set_path(TEST_DB)

    # Create fresh tables
    database.set_database()

client = TestClient(app)

def test_signup():
    response = client.post("/signup", json={
        "name": "test",
        "username": "testuser",
        "password": "12345"
    })

    assert response.status_code == 200
    result = response.json()["result"]
    assert "message" in result
    assert result["message"] == "User created successfully!"

def test_signup_duplicate():
    # signing up the same user again
    response = client.post("/signup", json={
        "name": "test",
        "username": "testuser",
        "password": "12345"
    })
    assert response.json()["result"]["error"] == "Invalid credentials"

def test_login():
    response = client.post("/login", json={
        "username": "testuser",
        "password": "12345"
    })

    assert response.status_code == 200
    result = response.json()["result"]
    assert "access_token" in result
