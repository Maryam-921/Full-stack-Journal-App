from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_signup():
    response = client.post("/signup", json={
        "name": "test",
        "username": "testuser",
        "password": "12345"
    })

    assert response.status_code == 200
    data = response.json()
    assert "result" in data
    assert data["result"]["message"] == "User created successfully!"

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
