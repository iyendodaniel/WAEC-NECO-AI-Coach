from datetime import datetime
import torch


def generate_answer(model, tokenizer, user_question: str, language: str):

    # 1. Choose system message based on language
    if language == "igbo":
        system_message = (
            "You are N-ATLaS, a multilingual WAEC/NECO tutor. "
            "Respond ONLY in Igbo language. "
            "Make your explanations clear and accurate."
        )

    elif language == "yoruba":
        system_message = (
            "You are N-ATLaS, a multilingual WAEC/NECO tutor. "
            "Respond ONLY in Yoruba language. "
            "Use simple Yoruba, short sentences, and be very clear."
        )

    elif language == "hausa":
        system_message = (
            "You are N-ATLaS, a multilingual WAEC/NECO tutor. "
            "Respond ONLY in Hausa language."
        )

    else:  # English
        system_message = (
            "You are N-ATLaS, a multilingual WAEC/NECO tutor. "
            "Respond naturally in English."
        )

    # 2. Build chat messages
    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_question}
    ]

    # 3. Format for model
    today = datetime.now().strftime("%d %b %Y")
    formatted = tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=False,
        date_string=today
    )

    # 4. Tokenize
    inputs = tokenizer(
        formatted,
        return_tensors="pt",
        add_special_tokens=False
    ).to(model.device)

    # 5. Generate
    outputs = model.generate(
        **inputs,
        max_new_tokens=500,
        temperature=0.1,
        repetition_penalty=1.1,
        use_cache=True
    )

    # 6. Decode
    answer = tokenizer.batch_decode(outputs)[0]
    return answer
