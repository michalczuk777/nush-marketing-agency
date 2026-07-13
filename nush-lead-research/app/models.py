from datetime import datetime
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

class Company(Base):
    __tablename__ = 'companies'
    id: Mapped[int] = mapped_column(primary_key=True)
    company_name: Mapped[str] = mapped_column(String(300), index=True)
    nip: Mapped[str | None] = mapped_column(String(20), index=True); regon: Mapped[str | None] = mapped_column(String(20), index=True)
    status: Mapped[str] = mapped_column(String(40), default='ACTIVE'); province: Mapped[str | None] = mapped_column(String(80), index=True); city: Mapped[str | None] = mapped_column(String(100), index=True); pkd_main: Mapped[str | None] = mapped_column(String(30), index=True); pkd_all_json: Mapped[str] = mapped_column(Text, default='[]')
    website_original: Mapped[str | None] = mapped_column(String(500)); website_normalized: Mapped[str | None] = mapped_column(String(500)); domain: Mapped[str | None] = mapped_column(String(255), index=True); phone: Mapped[str | None] = mapped_column(String(60)); ceidg_email: Mapped[str | None] = mapped_column(String(255)); source_file: Mapped[str | None] = mapped_column(String(255)); imported_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow); updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    analysis = relationship('WebsiteAnalysis', back_populates='company', uselist=False, cascade='all, delete-orphan'); emails = relationship('EmailAddress', back_populates='company', cascade='all, delete-orphan'); qualification = relationship('LeadQualification', back_populates='company', uselist=False, cascade='all, delete-orphan')

class WebsiteAnalysis(Base):
    __tablename__ = 'website_analyses'
    id: Mapped[int] = mapped_column(primary_key=True); company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'), unique=True); status: Mapped[str] = mapped_column(String(30), default='PENDING'); final_url: Mapped[str | None] = mapped_column(String(500)); http_status: Mapped[int | None] = mapped_column(Integer); https_enabled: Mapped[bool] = mapped_column(Boolean, default=False); title: Mapped[str | None] = mapped_column(String(500)); meta_description: Mapped[str | None] = mapped_column(Text); viewport_present: Mapped[bool] = mapped_column(Boolean, default=False); platform: Mapped[str | None] = mapped_column(String(80)); ecommerce_detected: Mapped[bool] = mapped_column(Boolean, default=False); catalog_detected: Mapped[bool] = mapped_column(Boolean, default=False); product_url_estimate: Mapped[int | None] = mapped_column(Integer); signals_json: Mapped[str] = mapped_column(Text, default='[]'); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow); company = relationship('Company', back_populates='analysis')

class EmailAddress(Base):
    __tablename__ = 'email_addresses'
    id: Mapped[int] = mapped_column(primary_key=True); company_id: Mapped[int] = mapped_column(ForeignKey('companies.id')); email: Mapped[str] = mapped_column(String(255)); email_type: Mapped[str] = mapped_column(String(30), default='UNKNOWN'); email_role: Mapped[str] = mapped_column(String(30), default='unknown'); source_url: Mapped[str | None] = mapped_column(String(500)); source_method: Mapped[str | None] = mapped_column(String(40)); mx_valid: Mapped[bool | None] = mapped_column(Boolean); preferred: Mapped[bool] = mapped_column(Boolean, default=False); excluded: Mapped[bool] = mapped_column(Boolean, default=False); company = relationship('Company', back_populates='emails')

class LeadQualification(Base):
    __tablename__ = 'lead_qualifications'
    id: Mapped[int] = mapped_column(primary_key=True); company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'), unique=True); fit_score: Mapped[int] = mapped_column(Integer, default=0); score_reasons_json: Mapped[str] = mapped_column(Text, default='[]'); lead_status: Mapped[str] = mapped_column(String(30), default='NEW', index=True); reason_to_contact: Mapped[str | None] = mapped_column(Text); manual_notes: Mapped[str | None] = mapped_column(Text); do_not_contact: Mapped[bool] = mapped_column(Boolean, default=False); do_not_contact_reason: Mapped[str | None] = mapped_column(String(100)); updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow); company = relationship('Company', back_populates='qualification')

class CrawlJob(Base):
    __tablename__ = 'crawl_jobs'
    id: Mapped[int] = mapped_column(primary_key=True); status: Mapped[str] = mapped_column(String(30), default='QUEUED'); total_companies: Mapped[int] = mapped_column(Integer, default=0); processed_companies: Mapped[int] = mapped_column(Integer, default=0); error_message: Mapped[str | None] = mapped_column(Text); created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
