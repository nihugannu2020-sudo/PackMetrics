CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL,
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS manufacturers (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    company_name VARCHAR(255) NOT NULL,
    business_id VARCHAR(100),
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS government_officials (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    official_id VARCHAR(100) UNIQUE,
    department VARCHAR(255),
    status VARCHAR(32) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY,
    manufacturer_id UUID REFERENCES manufacturers(id),
    product_name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS scans (
    id UUID PRIMARY KEY,
    product_id UUID REFERENCES products(id),
    manufacturer_id UUID REFERENCES manufacturers(id),
    status VARCHAR(32) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT NOW(),
    submitted_by UUID REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS scan_images (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    file_name VARCHAR(255) NOT NULL,
    s3_path VARCHAR(500),
    image_type VARCHAR(64),
    uploaded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ocr_results (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    raw_text TEXT,
    product_name VARCHAR(255),
    manufacturer VARCHAR(255),
    net_quantity VARCHAR(100),
    mrp VARCHAR(100),
    batch_no VARCHAR(100),
    manufacturing_date VARCHAR(100),
    consumer_care VARCHAR(255),
    extracted_json JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compliance_checks (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    rule_id UUID,
    check_name VARCHAR(255),
    status VARCHAR(32),
    message TEXT,
    evidence TEXT,
    confidence NUMERIC(5,4),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS violations (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    violation_name VARCHAR(255),
    rule_name VARCHAR(255),
    severity VARCHAR(32),
    evidence TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rules (
    id UUID PRIMARY KEY,
    rule_name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    effective_date DATE,
    status VARCHAR(32) DEFAULT 'active',
    content TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rule_versions (
    id UUID PRIMARY KEY,
    rule_id UUID REFERENCES rules(id),
    version VARCHAR(50),
    changes TEXT,
    effective_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    manufacturer_id UUID REFERENCES manufacturers(id),
    status VARCHAR(32) DEFAULT 'pending',
    submission_date TIMESTAMP DEFAULT NOW(),
    remarks TEXT
);

CREATE TABLE IF NOT EXISTS official_decisions (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    decision VARCHAR(32) NOT NULL,
    official_id UUID REFERENCES government_officials(id),
    remarks TEXT,
    decision_time TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY,
    scan_id UUID REFERENCES scans(id),
    report_type VARCHAR(64),
    content JSONB,
    pdf_path VARCHAR(500),
    generated_by UUID REFERENCES users(id),
    generated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    type VARCHAR(32),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action VARCHAR(255),
    entity_type VARCHAR(64),
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
