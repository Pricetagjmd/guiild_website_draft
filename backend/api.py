"""API routers for the backend application."""

from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from .database import get_session
from .models import Event, EventCreate, EventRead

router = APIRouter(prefix="/api/events", tags=["events"])


@router.get("", response_model=List[EventRead])
async def list_events(session: AsyncSession = Depends(get_session)) -> List[EventRead]:
    """Return all events ordered by their event date."""

    statement = select(Event).order_by(Event.date)
    result = await session.execute(statement)
    events = result.scalars().all()
    return events


@router.post("", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def create_event(
    event_in: EventCreate, session: AsyncSession = Depends(get_session)
) -> EventRead:
    """Create a new event after validating the input payload."""

    event = Event(**event_in.dict())
    session.add(event)
    try:
        await session.commit()
    except IntegrityError as exc:
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to create event due to a database constraint violation.",
        ) from exc

    await session.refresh(event)
    return event


__all__ = ["router"]
