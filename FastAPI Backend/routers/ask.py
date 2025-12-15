from fastapi import APIRouter, Request
from pydantic import BaseModel
from generate import generate_answer
import asyncio

ask_router = APIRouter()

class QuestionRequest(BaseModel):
    question: str
    language: str

@ask_router.post("/ask")
def ask_question(body: QuestionRequest, request: Request):
    answer = generate_answer(
        request.app.state.model_pipeline,
        body.question,
        body.language
    )
    return {"answer": answer}
