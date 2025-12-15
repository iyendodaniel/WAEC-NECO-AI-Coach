def generate_answer(model_pipeline, user_question: str, language: str):
    # 1. Build system message
    system_message = {
        "igbo": "You are N-ATLaS, respond ONLY in Igbo.",
        "yoruba": "You are N-ATLaS, respond ONLY in Yoruba.",
        "hausa": "You are N-ATLaS, respond ONLY in Hausa."
    }.get(language.lower(), "You are N-ATLaS, respond naturally in English.")

    # 2. Build full prompt
    prompt = f"{system_message}\n\nUser: {user_question}\nAnswer:"

    # 3. Call LLaMA server
    result = model_pipeline(prompt)

    # 4. Return text
    return result[0]["text"]
