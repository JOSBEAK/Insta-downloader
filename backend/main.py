import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/", StaticFiles(directory="/app/frontend/.next", html=True), name="static")

class VideoRequest(BaseModel):
    url: str
    quality: str  # We'll keep this for consistency, but it's not used in this API

# Use environment variables, but fall back to hardcoded values if not set
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY")
RAPIDAPI_HOST = os.getenv("RAPIDAPI_HOST")
RAPIDAPI_ENDPOINT = os.getenv("RAPIDAPI_ENDPOINT")

@app.post("/download")
async def download_instagram_video(request: VideoRequest):
    try:
        logger.info(f"Received request for URL: {request.url}")

        payload = f"-----011000010111000001101001\r\nContent-Disposition: form-data; name=\"url\"\r\n\r\n{request.url}\r\n-----011000010111000001101001--\r\n\r\n"
        
        headers = {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": RAPIDAPI_HOST,
            "Content-Type": "multipart/form-data; boundary=---011000010111000001101001"
        }

        response = requests.post(RAPIDAPI_ENDPOINT, data=payload, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        logger.debug(f"API Response: {data}")

        # Check if the response contains the download link
        if isinstance(data, list) and len(data) > 0:
            download_link = data[0]
            return {
                "url": download_link,
            }
        else:
            logger.error(f"Unexpected API response structure: {data}")
            raise HTTPException(status_code=400, detail="Unable to fetch video data")

    except requests.RequestException as e:
        logger.error(f"Error fetching data from RapidAPI: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error fetching data from API: {str(e)}")
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)