from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

def test_create_entry():
    # Step 1: login to get token
    login_res = client.post("/login", json={
        "username": "testuser",
        "password": "12345"
    })
    token = login_res.json()["result"]["access_token"]

    # Step 2: create journal entry
    response = client.post(
        "/entry",
        headers={"Authorization": f"Bearer {token}"},
        json={"subject": "Test entry", "content": "This is a test journal entry"}
    )

    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert data["message"] == "Entry recieved"

def test_get_entries():
    # Step 1: Login to get token
    login_res = client.post("/login", json={
        "username": "testuser",
        "password": "12345"
    })
    token = login_res.json()["result"]["access_token"]

    # Step 2: Call protected route
    response = client.get(
        "/entries",
        headers={"Authorization": f"Bearer {token}"}
    )

    assert response.status_code == 200
    assert isinstance(response.json(), list)
