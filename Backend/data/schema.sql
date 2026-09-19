CREATE TABLE claims (
    id UUID PRIMARY KEY,
    status TEXT NOT NULL,
    status_id TEXT NOT NULL,
    farmer_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    crop TEXT NOT NULL,
    incident_date DATE NOT NULL,
    incident_event TEXT NOT NULL,
    case_status TEXT,
    weather JSONB,
    appeal_draft JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE claim_evidence (
    id UUID PRIMARY KEY,
    claim_id UUID NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_hash TEXT NOT NULL,
    exif JSONB,
    verification JSONB NOT NULL,
    ai_assessment JSONB,
    accepted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX claim_evidence_claim_id_idx ON claim_evidence(claim_id);
CREATE INDEX claim_evidence_hash_idx ON claim_evidence(claim_id, file_hash);
