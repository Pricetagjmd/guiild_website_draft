import json
from functools import lru_cache
from typing import Any

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', env_file_encoding='utf-8', extra='ignore')

    database_url: str = 'postgresql+asyncpg://postgres:postgres@localhost:5432/guild'
    cors_origins: list[str] = ['http://localhost:5173']

    @field_validator('cors_origins', mode='before')
    @classmethod
    def parse_cors_origins(cls, value: Any) -> list[str]:
        if isinstance(value, str):
            if value.startswith('['):
                return json.loads(value)
            return [origin.strip() for origin in value.split(',') if origin.strip()]
        return value


@lru_cache()
def get_settings() -> Settings:
    return Settings()
