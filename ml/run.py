# D:\Granth\ml\run.py
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "main:app",       # points to 'app' inside main.py
        host="0.0.0.0",   # accessible on localhost + network
        port=8000,        # always runs on 8000
        reload=True       # auto-reload on code changes (dev mode)
    )
