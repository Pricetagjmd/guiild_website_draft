"""Database helpers and session management for the FastAPI app."""

from __future__ import annotations

from typing import AsyncGenerator, Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncEngine, AsyncSession, async_sessionmaker, create_async_engine
from sqlmodel import SQLModel

from .config import Settings, get_settings

_async_engine: Optional[AsyncEngine] = None
_sessionmaker: Optional[async_sessionmaker[AsyncSession]] = None


def get_engine(settings: Settings) -> AsyncEngine:
    """Create (or return) the shared async engine instance."""

    global _async_engine, _sessionmaker
    if _async_engine is None:
        _async_engine = create_async_engine(settings.async_database_url, echo=settings.db_echo, future=True)
        _sessionmaker = async_sessionmaker(
            _async_engine,
            expire_on_commit=False,
            class_=AsyncSession,
        )
    return _async_engine


async def init_db() -> None:
    """Initialise the database by creating tables if necessary."""

    settings = get_settings()
    engine = get_engine(settings)
    async with engine.begin() as connection:
        await connection.run_sync(SQLModel.metadata.create_all)


async def get_session(
    settings: Settings = Depends(get_settings),
) -> AsyncGenerator[AsyncSession, None]:
    """Provide a database session via dependency injection."""

    global _sessionmaker
    if _sessionmaker is None:
        get_engine(settings)
    assert _sessionmaker is not None  # For type checkers

    async with _sessionmaker() as session:
        yield session


__all__ = ["get_engine", "get_session", "init_db"]
