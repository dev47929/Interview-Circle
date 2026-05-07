# app/database/models.py

import uuid
from datetime import datetime

from sqlalchemy import (
    Column,
    String,
    Boolean,
    Text,
    TIMESTAMP,
    ForeignKey,
    Integer,
    Enum,
    ARRAY
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database.db import Base


# -------------------------
# USERS
# -------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)

    uid = Column(UUID(as_uuid=True), unique=True, index=True, default=uuid.uuid4)

    handle = Column(String(20), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=True)

    email = Column(String(255), unique=True, nullable=True, index=True)
    phone = Column(String(20), unique=True, nullable=True, index=True)
    role = Column(String(20), default="user")

    is_email_verified = Column(Boolean, default=False)
    is_phone_verified = Column(Boolean, default=False)

    password_hash = Column(Text, nullable=True)

    bio = Column(Text, nullable=True)
    avatar_url = Column(Text, nullable=True)

    is_active = Column(Boolean, default=False)
    is_suspended = Column(Boolean, default=False)

    handle_updated_at = Column(TIMESTAMP, nullable=True)

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    updated_at = Column(TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)


# -------------------------
# OTP CODES
# -------------------------
class OTPCode(Base):
    __tablename__ = "otp_codes"

    ref = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    contact = Column(String(255), nullable=False, index=True)

    code_hash = Column(Text, nullable=False)
    purpose = Column(String(50), nullable=False)
    # 'login', 'signup', 'reset'

    expires_at = Column(TIMESTAMP, nullable=False)
    is_used = Column(Boolean, default=False)
    attempt_count = Column(Integer, default=0)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    user = relationship("User")

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    difficulty = Column(String(50), nullable=True)
    position = Column(String(100), nullable=True)   
    type = Column(String(50), nullable=True)  # e.g., "behavioral", "technical"
    company = Column(String(100), nullable=True)
    cv = Column(Text, nullable=True)  # Store CV text or path to CV file

    created_at = Column(TIMESTAMP, default=datetime.utcnow)
    user = relationship("User")