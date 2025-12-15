def generate_answer(model_pipeline, user_question: str, language: str):
    # build prompt
    system_message = {
        "igbo": "You are N-ATLaS, respond ONLY in Igbo.",
        "yoruba": "You are N-ATLaS, respond ONLY in Yoruba.",
        "hausa": "You are N-ATLaS, respond ONLY in Hausa."
    }.get(language.lower(), "You are N-ATLaS, respond naturally in English.")

    prompt = f"{system_message}\n\nUser: {user_question}\nAnswer:"

    # call model pipeline (synchronous)
    result = model_pipeline(prompt)

    answer = result.split("\nUser:")[0]
    
    return answer