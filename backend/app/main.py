from collections.abc import Sequence

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from . import crud, schemas
from .config import get_settings
from .database import Base, engine, get_session

settings = get_settings()

app = FastAPI(title='University Guild API', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.on_event('startup')
async def on_startup() -> None:
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)


@app.get('/health', tags=['status'])
async def health_check() -> dict[str, str]:
    return {'status': 'ok'}


@app.get('/api/events', response_model=Sequence[schemas.EventRead], tags=['events'])
async def get_events(session: AsyncSession = Depends(get_session)) -> Sequence[schemas.EventRead]:
    events = await crud.list_events(session)
    return events


@app.post('/api/events', response_model=schemas.EventRead, status_code=status.HTTP_201_CREATED, tags=['events'])
async def create_event(event_in: schemas.EventCreate, session: AsyncSession = Depends(get_session)) -> schemas.EventRead:
    try:
        event = await crud.create_event(session, event_in)
        return event
    except SQLAlchemyError as exc:  # pragma: no cover - defensive
        await session.rollback()
        raise HTTPException(status_code=500, detail='Could not create event') from exc
