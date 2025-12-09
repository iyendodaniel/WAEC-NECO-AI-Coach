from fastapi import FastAPI
from model_loader import ensure_model_ready
from routers.ask import ask_router

app = FastAPI()

@app.on_event("startup")
def startup():
    app.state.model_pipeline = ensure_model_ready()

@app.get("/generate/")
def generate(prompt: str):
    output = app.state.model_pipeline(prompt)
    return {"result": output[0]["generated_text"]}

app.include_router(ask_router)

# ONLY for development:
if __name__ == "__main__":
    print("Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8001")
