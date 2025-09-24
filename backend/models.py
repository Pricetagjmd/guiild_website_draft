"""Database models and Pydantic schemas for the FastAPI application."""

from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal
from typing import Optional

from sqlalchemy import Column, DateTime, Numeric, Text
from sqlalchemy.sql import func
from sqlmodel import Field, SQLModel


class EventBase(SQLModel):
    """Shared fields across Event models."""

    title: str = Field(max_length=200, description="Name of the event")
    date: datetime = Field(description="Date and time when the event takes place")
    location: str = Field(max_length=255, description="Venue or city for the event")
    description: str = Field(sa_column=Column(Text), description="Detailed description")
    price: Decimal = Field(
        ge=0,
        sa_column=Column(Numeric(10, 2), nullable=False),
        description="Ticket price in the venue's local currency",
    )


class Event(EventBase, table=True):
    """SQLModel table representing an event."""

    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        sa_column=Column(
            DateTime(timezone=True),
            nullable=False,
            server_default=func.now(),
        ),
        description="Timestamp when the event was created",
    )


class EventCreate(EventBase):
    """Payload used when creating a new event."""

    pass


class EventRead(EventBase):
    """Response model for returning events to clients."""

    id: int
    created_at: datetime

    class Config:
        orm_mode = True


__all__ = ["Event", "EventCreate", "EventRead"]
