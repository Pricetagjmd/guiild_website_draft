"""FastAPI application entry-point for the Guild backend."""

from __future__ import annotations

from fastapi import Depends, FastAPI

from . import api
from .config import Settings, get_settings
from .database import init_db

app = FastAPI(title="Guild Events API", version="1.0.0")


@app.on_event("startup")
async def on_startup() -> None:
    """Initialise the database once the application starts."""

    await init_db()


@app.get("/health", tags=["health"])
async def health_check(settings: Settings = Depends(get_settings)) -> dict[str, str]:
    """Simple endpoint to confirm the application is running."""

    # Accessing settings ensures that dependency injection works and configuration is valid.
    _ = settings.async_database_url
    return {"status": "ok"}


app.include_router(api.router)


__all__ = ["app"]
