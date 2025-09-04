# D:\Granth\ml\main.py
from fastapi import FastAPI

# Create FastAPI app instance
app = FastAPI()

# Sample root endpoint
@app.get("/")
def read_root():
    return {"message": "ML service is running on port 8000"}
