from fastapi import FastAPI
from model_loader import ensure_model_ready
from routers.ask import ask_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

@app.on_event("startup")
def startup():
    app.state.model_pipeline = ensure_model_ready()  # now it's just a request function

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate/")
def generate(prompt: str):
    output = app.state.model_pipeline(prompt)
    return {"result": output[0]["text"]}  # adapt key if LLaMA server uses 'text' instead of 'generated_text'

app.include_router(ask_router)

if __name__ == "__main__":
    print("Run with: uvicorn main:app --reload --host 0.0.0.0 --port 8001")
