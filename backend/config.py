"""Application configuration using environment variables.

This module provides a :class:`Settings` object that reads configuration
from environment variables, including helpers for DigitalOcean Managed
PostgreSQL instances.  The settings can be injected into FastAPI routes
using dependency injection for improved testability.
"""

from __future__ import annotations

from functools import lru_cache
from typing import Optional
from urllib.parse import quote_plus

from pydantic import BaseSettings, Field, validator


class Settings(BaseSettings):
    """Runtime configuration loaded from environment variables."""

    database_url: Optional[str] = Field(
        default=None,
        description="Full async database URL, overrides DigitalOcean specific settings.",
        env="DATABASE_URL",
    )
    do_db_host: Optional[str] = Field(default=None, env="DO_DB_HOST")
    do_db_port: int = Field(default=25060, env="DO_DB_PORT")
    do_db_name: Optional[str] = Field(default=None, env="DO_DB_DATABASE")
    do_db_user: Optional[str] = Field(default=None, env="DO_DB_USER")
    do_db_password: Optional[str] = Field(default=None, env="DO_DB_PASSWORD")
    do_db_sslmode: str = Field(default="require", env="DO_DB_SSLMODE")
    db_echo: bool = Field(default=False, env="DB_ECHO")

    class Config:
        env_file = ".env"
        case_sensitive = False

    @validator("do_db_sslmode")
    def _validate_sslmode(cls, value: str) -> str:  # noqa: D401
        """Validate the SSL mode value expected by PostgreSQL."""

        allowed = {"disable", "allow", "prefer", "require", "verify-ca", "verify-full"}
        if value not in allowed:
            raise ValueError(
                "Invalid DO_DB_SSLMODE; expected one of " + ", ".join(sorted(allowed))
            )
        return value

    @property
    def async_database_url(self) -> str:
        """Return an asyncpg-compatible database URL.

        If ``DATABASE_URL`` is supplied, it will be coerced to use the
        ``asyncpg`` driver if necessary.  Otherwise, the method will build a
        connection string tailored for DigitalOcean Managed PostgreSQL using
        the DigitalOcean-specific environment variables.
        """

        if self.database_url:
            return self._ensure_async_driver(self.database_url)

        required_fields = {
            "DO_DB_HOST": self.do_db_host,
            "DO_DB_DATABASE": self.do_db_name,
            "DO_DB_USER": self.do_db_user,
            "DO_DB_PASSWORD": self.do_db_password,
        }
        missing = [name for name, value in required_fields.items() if not value]
        if missing:
            raise ValueError(
                "Incomplete DigitalOcean PostgreSQL configuration; missing: "
                + ", ".join(missing)
            )

        user = quote_plus(self.do_db_user or "")
        password = quote_plus(self.do_db_password or "")
        return (
            f"postgresql+asyncpg://{user}:{password}@{self.do_db_host}:{self.do_db_port}/"
            f"{self.do_db_name}?sslmode={self.do_db_sslmode}"
        )

    @staticmethod
    def _ensure_async_driver(url: str) -> str:
        """Ensure the SQLAlchemy URL uses the ``asyncpg`` driver."""

        if url.startswith("postgresql+asyncpg://"):
            return url
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+asyncpg://", 1)
        raise ValueError("Unsupported database URL scheme for async PostgreSQL: %s" % url)


def get_settings() -> Settings:
    """Return a cached :class:`Settings` instance for dependency injection."""

    return _get_cached_settings()


@lru_cache()
def _get_cached_settings() -> Settings:
    return Settings()


__all__ = ["Settings", "get_settings"]
