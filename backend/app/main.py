from fastapi import FastAPI , staticfiles
from app.api import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.mount("/data", staticfiles.StaticFiles(directory="data"), name="data")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


