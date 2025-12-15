from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.ask import ask_router
from model_loader import ensure_model_ready

app = FastAPI()

# Initialize model pipeline once
@app.on_event("startup")
def startup():
    app.state.model_pipeline = ensure_model_ready()

# Allow your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the chat router
app.include_router(ask_router)

if __name__ == "__main__":
    print("Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8001")
