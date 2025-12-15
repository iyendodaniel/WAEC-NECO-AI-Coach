import requests

LLAMA_SERVER_URL = "http://127.0.0.1:8080/v1/completions"

def ensure_model_ready():
    def generate(prompt: str):
        payload = {
            "prompt": prompt,
            "max_tokens": 200,
            "stop": ["\nQuestion:", "\n\nQuestion:"]
        }
        response = requests.post(LLAMA_SERVER_URL, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["text"]
    return generate

