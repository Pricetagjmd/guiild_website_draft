from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from . import models, schemas


async def list_events(session: AsyncSession) -> list[models.Event]:
    result = await session.execute(select(models.Event).order_by(models.Event.date.asc()))
    return result.scalars().all()


async def create_event(session: AsyncSession, event_in: schemas.EventCreate) -> models.Event:
    event = models.Event(**event_in.model_dump())
    session.add(event)
    await session.commit()
    await session.refresh(event)
    return event
