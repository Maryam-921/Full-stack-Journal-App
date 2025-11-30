from pydantic import BaseModel

class Signup(BaseModel):
    name: str
    username: str
    password: str

class Login(BaseModel):
    username: str
    password: str

class Entry(BaseModel):
    subject: str
    content: str

