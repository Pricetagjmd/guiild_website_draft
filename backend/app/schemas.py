from datetime import datetime

from pydantic import BaseModel, Field


class EventBase(BaseModel):
    title: str = Field(..., max_length=255)
    date: datetime
    location: str = Field(..., max_length=255)
    description: str
    price: str | None = Field(default=None, max_length=120)


class EventCreate(EventBase):
    pass


class EventRead(EventBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
