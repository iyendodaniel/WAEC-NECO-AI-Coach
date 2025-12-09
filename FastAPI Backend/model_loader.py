from transformers import pipeline
import os

MODEL_NAME = "NCAIR1/N-ATLaS"
LOCAL_DIR = "models/natlas"

def ensure_model_ready():
    if os.path.exists(LOCAL_DIR):
        print("Loading N-ATLaS from local storage...")
        generator = pipeline("text-generation", model=LOCAL_DIR)
    else:
        print("Downloading N-ATLaS model...")
        generator = pipeline("text-generation", model=MODEL_NAME, cache_dir=LOCAL_DIR)
        print("Download complete!")
    return generator
