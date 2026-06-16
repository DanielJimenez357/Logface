import requests
from google import genai
import os


def classify_priority_ai(ticket_text):
    if not os.getenv("GEMINI_API_KEY"):
        print("GEMINI_API_KEY is not set in the environment variables.")
        return "low"
    try:
        client = genai.Client()
        prompt = (
            "Eres un clasificador de incidencias de soporte técnico.  "
            "Clasifica el siguiente ticket en exactamente una de estas prioridades: 'baja', 'media' o 'alta'. "
            "Responde ÚNICAMENTE con la palabra en minúsculas ('baja', 'media' o 'alta')."
            "No incluyas ninguna explicación, signos de puntuación, introducción ni texto extra.\n\n"
            f"Ticket: {ticket_text}"
        )
        response = client.models.generate_content(
            model="gemini-flash-latest", contents=prompt
        )
        winner_priority = response.text.strip().lower()

        if winner_priority not in ["baja", "media", "alta"]:
            print(
                f"Warning: Gemini returned an unexpected value: '{winner_priority}'. Defaulting to 'low'."
            )
            return "low"
        return winner_priority
    except Exception as e:
        print(f"Error calling Google Gemini API: {e}")
        return "low"
