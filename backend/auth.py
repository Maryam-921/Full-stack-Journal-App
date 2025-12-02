# PASSWORD HASHING
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# CREATE JWT SETTINGS
from jose import jwt
from datetime import datetime, timedelta

SECRET_KEY = "my_secret"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    to_encode["exp"] = datetime.utcnow() + timedelta(hours=1)
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# IMPLEMENT SIGNUP
from .models import Signup, Login
from .database import create_user, get_user

def signup_user(user: Signup):
    hashed_pw = hash_password(user.password)
    success = create_user(user.username, user.name, hashed_pw)

    if not success:
        return {"error": "Invalid credentials"}

    token = internal_login(user.username, user.password)
    return {"message": "User created successfully!",
            "access_token": token,
            "token_type": "bearer"}

# IMPLEMENT LOGIN
def login_user(user: Login):
    token = internal_login(user.username, user.password)
    # if not token:
    #     raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message" : "Login successful", 
            "access_token": token,
            "token_type": "bearer"}

def get_current_user(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload

def internal_login(username: str, password: str):
    # Validate user in DB
    user_row = get_user(username)
    if not user_row:
        return {"error": "Invalid credentials"}
    
    if not verify_password(password, user_row["password_hash"]):
        return {"error": "Invalid credentials"}

    # create JWT token
    token = create_access_token({
        "user_id": user_row["id"],
        "username": username
    })
    return token
