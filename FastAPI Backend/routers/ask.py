from fastapi import APIRouter, Request
from generate import generate_answer
from pydantic import BaseModel

ask_router = APIRouter()

class QuestionRequest(BaseModel):
    question: str
    language: str


@ask_router.post("/ask")
def ask_question(request: Request, body: QuestionRequest):
    model = request.app.state.model
    tokenizer = request.app.state.tokenizer
    answer = generate_answer(model, tokenizer, body.question, body.language)
    return {"answer": answer}