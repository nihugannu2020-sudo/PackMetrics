import { useEffect, useMemo, useState } from 'react';
import { LayoutGrid, FileText, Upload, ShieldCheck, UserCog, MessageSquareText, NotebookPen, Bell, Search, ChevronRight, ArrowUpRight, Eye, Check, X, AlertTriangle, Download, Plus, LogOut, FileCheck2, BarChart3, BookOpenText, Database, Wrench, CircleUserRound, SlidersHorizontal, Building2, Factory, BriefcaseBusiness, CircleDashed, Send, ClipboardCheck, FilePenLine } from 'lucide-react';

const logo = 'METROLOGY';

const demoAccounts = {
  manufacturer: { label: 'Manufacturer', email: 'demo.manufacturer@metrology.local', role: 'manufacturer' },
  official: { label: 'Government Official', email: 'demo.gov@metrology.local', role: 'official' },
  admin: { label: 'Admin', email: 'demo.admin@metrology.local', role: 'admin' },
};

const seededData = {
  manufacturer: {
    name: 'Amit Verma',
    company: 'ABC Foods Pvt Ltd',
    stats: [
      { label: 'Total Submissions', value: '32' },
      { label: 'Approved', value: '18', tone: 'success' },
      { label: 'Rejected', value: '6', tone: 'danger' },
      { label: 'Pending', value: '8', tone: 'warning' },
    ],
    submissions: [
      { id: 'SCN2001', product: 'Wheat Flour 1kg', status: 'Pending', submittedOn: '24/05/2025', decision: 'Awaiting Review', action: 'View' },
      { id: 'SCN2002', product: 'Basmati Rice 5kg', status: 'Approved', submittedOn: '23/05/2025', decision: 'Approved', action: 'View Report' },
      { id: 'SCN2003', product: 'Sugar 1kg', status: 'Rejected', submittedOn: '22/05/2025', decision: 'Rejected', action: 'View' },
      { id: 'SCN2004', product: 'Fruit Juice 1L', status: 'Pending', submittedOn: '21/05/2025', decision: 'Awaiting Review', action: 'View' },
    ],
    rules: [
      { name: 'Legal Metrology (Packaged Commodities) Rules, 2011', version: 'Version 4.2', effectiveDate: '01/07/2024', status: 'Active' },
      { name: 'Packaged Commodities Amendment Rules', version: 'Version 2.1', effectiveDate: '15/04/2023', status: 'Active' },
      { name: 'Weights & Measures Standards', version: 'Version 7.0', effectiveDate: '09/11/2022', status: 'Current' },
    ],
  },
  official: {
    name: 'Sanjana Iyer',
    department: 'State Legal Metrology Department',
    stats: [
      { label: 'Pending Reviews', value: '24' },
      { label: 'Approved Today', value: '15', tone: 'success' },
      { label: 'Rejected Today', value: '7', tone: 'danger' },
      { label: 'Total Reviewed', value: '156' },
    ],
    pending: [
      { id: 'SCN2018', manufacturer: 'ABC Foods Pvt Ltd', product: 'Wheat Flour 1kg', submittedOn: '28/05/2025' },
      { id: 'SCN2019', manufacturer: 'PureLife Beverages', product: 'Fruit Juice 1L', submittedOn: '27/05/2025' },
      { id: 'SCN2020', manufacturer: 'FreshPack Industries', product: 'Sugar 1kg', submittedOn: '26/05/2025' },
    ],
  },
  admin: {
    name: 'Anand Rao',
    stats: [
      { label: 'Total Officials', value: '125' },
      { label: 'Total Manufacturers', value: '432' },
      { label: 'Pending Approvals', value: '8', tone: 'warning' },
      { label: 'Total Scans', value: '1,248' },
    ],
  },
};

const roles = {
  manufacturer: {
    label: 'Manufacturer',
    nav: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { key: 'submissions', label: 'My Submissions', icon: FileText },
      { key: 'upload', label: 'Upload New Scan', icon: Upload },
      { key: 'precheck', label: 'AI Pre-Check', icon: ShieldCheck },
      { key: 'reports', label: 'Reports', icon: NotebookPen },
      { key: 'rules', label: 'Rules & Amendments', icon: BookOpenText },
      { key: 'assistant', label: 'AI Assistant', icon: MessageSquareText },
      { key: 'profile', label: 'Profile', icon: CircleUserRound },
      { key: 'logout', label: 'Logout', icon: LogOut },
    ],
  },
  official: {
    label: 'Government Official',
    nav: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { key: 'reviews', label: 'Scans for Review', icon: ClipboardCheck },
      { key: 'submissions', label: 'All Submissions', icon: FileText },
      { key: 'reports', label: 'Reports', icon: NotebookPen },
      { key: 'rules', label: 'Rules & Amendments', icon: BookOpenText },
      { key: 'assistant', label: 'AI Assistant', icon: MessageSquareText },
      { key: 'notifications', label: 'Notifications', icon: Bell },
      { key: 'profile', label: 'Profile', icon: CircleUserRound },
      { key: 'logout', label: 'Logout', icon: LogOut },
    ],
  },
  admin: {
    label: 'Admin / Supervising Authority',
    nav: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
      { key: 'users', label: 'User Management', icon: UserCog },
      { key: 'officials', label: 'Government Officials', icon: BriefcaseBusiness },
      { key: 'manufacturers', label: 'Manufacturers', icon: Factory },
      { key: 'approvals', label: 'Approvals Overview', icon: FileCheck2 },
      { key: 'roles', label: 'Roles & Permissions', icon: SlidersHorizontal },
      { key: 'rules', label: 'Metrology Rules', icon: BookOpenText },
      { key: 'amendments', label: 'Amendments', icon: NotebookPen },
      { key: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
      { key: 'logs', label: 'System Logs', icon: Database },
      { key: 'models', label: 'AI Model Management', icon: Wrench },
      { key: 'settings', label: 'Settings', icon: SettingsIcon },
    ],
  },
};

function SettingsIcon(props) { return <SlidersHorizontal {...props} />; }

function useObjectUrls(files) {
  const urls = useMemo(() => files.map((file) => URL.createObjectURL(file)), [files]);
  useEffect(() => () => urls.forEach((url) => URL.revokeObjectURL(url)), [urls]);
  return urls;
}

function statusClass(status) {
  const normalized = status.toLowerCase();
  if (normalized === 'approved' || normalized === 'pass' || normalized === 'compliant') return 'status success';
  if (normalized === 'rejected' || normalized === 'fail' || normalized === 'non-compliant') return 'status danger';
  if (normalized === 'pending' || normalized === 'warning' || normalized === 'needs clarification') return 'status warning';
  return 'status neutral';
}

function App() {
  const [role, setRole] = useState('manufacturer');
  const [page, setPage] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedScan, setSelectedScan] = useState('SCN2001');
  const [ocrResult, setOcrResult] = useState({
    product_name: 'Wheat Flour',
    manufacturer: 'ABC Foods Pvt Ltd',
    place_of_manufacture: 'Ahmedabad, Gujarat',
    net_quantity: '1 kg',
    mrp: '₹45.00',
    batch_no: 'B1234',
    manufacturing_date: '05/05/2025',
  });
  const [scanImages, setScanImages] = useState([]);
  const [submission, setSubmission] = useState(null);

  const activeRole = roles[role];
  const currentData = seededData[role];

  const sampleScan = useMemo(() => ({
    id: selectedScan,
    product: 'Wheat Flour',
    netQuantity: '1 kg',
    mrp: '₹45.00',
    batchNo: 'B1234',
    manufacturer: 'ABC Foods Pvt Ltd',
    manufacturingDate: '05/05/2025',
    address: 'Plot 48, Industrial Estate, Ahmedabad',
    consumerCare: '+91 98765 43210',
    overall: 'NON-COMPLIANT',
    checks: [
      { label: 'Mandatory Declaration', status: 'FAIL', reason: 'Declaration missing or unreadable on front label.', evidence: 'Front side label appears to omit declaration block.', rule: 'Rule 6(1)', confidence: 0.92 },
      { label: 'Net Quantity', status: 'FAIL', reason: 'Quantity is present but not clearly readable at required prominence.', evidence: 'Text size appears small and cropped.', rule: 'Rule 6(2)', confidence: 0.88 },
      { label: 'MRP Declaration', status: 'PASS', reason: 'Price declaration is visible and formatted correctly.', evidence: 'MRP ₹45.00 appears on label.', rule: 'Rule 6(3)', confidence: 0.96 },
      { label: 'Date Information', status: 'PASS', reason: 'Manufacturing date is legible and usable.', evidence: 'Date reads 05/05/2025.', rule: 'Rule 6(4)', confidence: 0.89 },
      { label: 'Labeling Requirement', status: 'FAIL', reason: 'Consumer care and address details incomplete.', evidence: 'Consumer care contact missing.', rule: 'Rule 6(1)', confidence: 0.9 },
      { label: 'Readability', status: 'WARNING', reason: 'Relative text size analysis inconclusive due to image quality.', evidence: 'Low contrast between dark text and background on the package.', rule: 'Rule 9', confidence: 0.72 },
      { label: 'Potential Violation', status: 'FAIL', reason: 'Mandatory declarations and label completeness may violate package compliance.', evidence: 'Multiple front-panel declarations not captured.', rule: 'Rule 6(1)', confidence: 0.91 },
    ],
  }), [selectedScan]);

  const login = (selectedRole) => {
    setRole(selectedRole);
    setPage('dashboard');
    setLoggedIn(true);
  };

  const recordDecision = async (decision, remarks) => {
    const scanId = submission?.scanId || selectedScan;
    try {
      const response = await fetch('http://localhost:8000/api/submissions/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scan_id: scanId, decision, remarks }),
      });
      if (!response.ok) throw new Error('Decision could not be recorded.');
      setSubmission((current) => ({ ...current, status: decision }));
    } catch (error) {
      window.alert(error.message);
    }
  };

  const renderDashboard = () => {
    if (!loggedIn) return <LoginScreen onLogin={login} />;

    if (role === 'manufacturer') return (
      <div className="content-stack">
        <div className="section-header db-header">
          <div>
            <p className="eyebrow">Manufacturer overview</p>
            <h1>Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="action-button secondary">Generate Summary</button>
            <button className="action-button primary" onClick={() => setPage('upload')}>Upload New Scan</button>
          </div>
        </div>
        <div className="stat-grid">
          {currentData.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="panel">
          <div className="panel-header">
            <h3>Recent Submissions</h3>
            <button className="text-button" onClick={() => setPage('submissions')}>View all</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Scan ID</th>
                  <th>Product</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.submissions.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.product}</td>
                    <td><span className={statusClass(row.status)}>{row.status}</span></td>
                    <td>{row.submittedOn}</td>
                    <td>
                      <button className="table-link" onClick={() => { setSelectedScan(row.id); setPage('precheck'); }}>{row.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    if (role === 'official') return (
      <div className="content-stack">
        <div className="section-header db-header">
          <div>
            <p className="eyebrow">Government workflow</p>
            <h1>Official Dashboard</h1>
          </div>
          <div className="header-actions">
            <button className="action-button secondary">Export Queue</button>
            <button className="action-button primary" onClick={() => setPage('reviews')}>Review Scans</button>
          </div>
        </div>
        <div className="stat-grid">
          {currentData.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="panel">
          <div className="panel-header">
            <h3>Pending Scans for Review</h3>
            <button className="text-button" onClick={() => setPage('reviews')}>View all</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Scan ID</th>
                  <th>Manufacturer</th>
                  <th>Product</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.pending.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.manufacturer}</td>
                    <td>{row.product}</td>
                    <td>{row.submittedOn}</td>
                    <td>
                      <button className="table-link" onClick={() => { setSelectedScan(row.id); setPage('reviews'); }}>Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return (
      <div className="content-stack">
        <div className="section-header db-header">
          <div>
            <p className="eyebrow">Supervisory overview</p>
            <h1>Admin Dashboard</h1>
          </div>
        </div>
        <div className="stat-grid">
          {currentData.stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <div className="two-column-grid">
          <div className="panel">
            <div className="panel-header"><h3>Approval Trend</h3></div>
            <div className="mini-chart">
              {[55, 62, 48, 74, 80, 90, 83].map((value, index) => (
                <div key={index} className="chart-bar" style={{ height: `${value}%` }} aria-label="approval trend bar" />
              ))}
            </div>
          </div>
          <div className="panel">
            <div className="panel-header"><h3>Compliance Status</h3></div>
            <div className="legend-list">
              <div><span className="dot success"></span> Compliant 68%</div>
              <div><span className="dot warning"></span> Needs Review 22%</div>
              <div><span className="dot danger"></span> Non-compliant 10%</div>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-header"><h3>Recent Activity</h3></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>User</th>
                  <th>Role</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Approved batch review</td><td>Sanjana Iyer</td><td>Official</td><td>09:42 AM</td></tr>
                <tr><td>New manufacturer onboarding</td><td>FreshPack Industries</td><td>Manufacturer</td><td>08:30 AM</td></tr>
                <tr><td>Rule amendment synced</td><td>System</td><td>Admin</td><td>Yesterday</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    if (!loggedIn) return renderDashboard();

    switch (page) {
      case 'upload':
        return <UploadPage onBack={() => setPage('dashboard')} onRunPrecheck={(payload, files) => { 
          setOcrResult(payload?.ocr || ocrResult); 
          setScanImages(files); 
          setSubmission({ 
            scanId: payload?.scan_id, 
            status: 'Pending', 
            ocr: payload?.ocr, 
            compliance_report: payload?.compliance_report,
            images: files 
          }); 
          setPage('precheck'); 
        }} />;
      case 'precheck':
        return <PreCheckPage ocrData={ocrResult} images={scanImages} complianceReport={submission?.compliance_report} onBack={() => setPage('upload')} onSubmit={() => setPage('dashboard')} />;
      case 'submissions':
        return <SubmissionsPage onOpenScan={(id) => { setSelectedScan(id); setPage('reviews'); }} />;
      case 'reviews':
        return <ReviewPage scanId={selectedScan} onDecision={recordDecision} />;
      case 'rules':
        return <RulesPage />;
      case 'assistant':
        return <AssistantPage />;
      case 'reports':
        return <ReportsPage role={role} />;
      case 'users':
      case 'officials':
      case 'manufacturers':
      case 'approvals':
      case 'roles':
      case 'amendments':
      case 'analytics':
      case 'logs':
      case 'models':
      case 'settings':
        return <AdminPage section={page} />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-box">
          <div className="brand-mark">MC</div>
          <div>
            <div className="brand-title">{logo}</div>
            <div className="brand-subtitle">Compliance Platform</div>
          </div>
        </div>

        <nav className="nav">
          {activeRole.nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={`nav-item ${page === item.key ? 'active' : ''}`}
                onClick={() => {
                  if (item.key === 'logout') {
                    setLoggedIn(false);
                    setPage('dashboard');
                    return;
                  }
                  setPage(item.key);
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-title">
            <span className="eyebrow">{activeRole.label}</span>
            <h2>{pageLabel(page)}</h2>
          </div>
          <div className="topbar-actions">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search scans, labels, reports" />
            </div>
            <button className="icon-button"><Bell size={16} /></button>
            <div className="profile-pill">
              <div className="avatar-mini">{currentData.name.split(' ').map(n => n[0]).slice(0,2).join('')}</div>
              <div>
                <strong>{currentData.name}</strong>
                <small>{activeRole.label}</small>
              </div>
            </div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

function pageLabel(key) {
  const labels = {
    dashboard: 'Dashboard',
    submissions: 'My Submissions',
    upload: 'Upload New Scan',
    precheck: 'AI Pre-Check',
    reviews: 'Scans for Review',
    reports: 'Reports',
    rules: 'Rules & Amendments',
    assistant: 'AI Assistant',
    notifications: 'Notifications',
    profile: 'Profile',
    users: 'User Management',
    officials: 'Government Officials',
    manufacturers: 'Manufacturers',
    approvals: 'Approvals Overview',
    roles: 'Roles & Permissions',
    amendments: 'Amendments',
    analytics: 'Reports & Analytics',
    logs: 'System Logs',
    models: 'AI Model Management',
    settings: 'Settings',
  };
  return labels[key] || 'Dashboard';
}

function LoginScreen({ onLogin }) {
  const [selectedRole, setSelectedRole] = useState('manufacturer');
  const [email, setEmail] = useState(demoAccounts.manufacturer.email);

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-mark large">MC</div>
          <div>
            <p className="eyebrow">METROLOGY</p>
            <h1>COMPLIANCE PLATFORM</h1>
          </div>
        </div>
        <p className="subtitle">AI-powered packaged commodity compliance and approval</p>
        <form className="login-form" onSubmit={handleLogin}>
          <label><span>Portal role</span><select value={selectedRole} onChange={(event) => { setSelectedRole(event.target.value); setEmail(demoAccounts[event.target.value].email); }}>
            {Object.entries(demoAccounts).map(([key, account]) => <option key={key} value={key}>{account.label}</option>)}
          </select></label>
          <label><span>Email</span><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></label>
          <label><span>Password</span><input type="password" placeholder="Demo password" required /></label>
          <button className="action-button primary" type="submit">Sign in to portal</button>
        </form>
        <p className="login-hint">Demo access is enabled for Manufacturer, Government Official, and Admin roles.</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value ${tone || ''}`}>{value}</div>
    </div>
  );
}

function UploadPage({ onBack, onRunPrecheck }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const previewUrls = useObjectUrls(files);

  const handleFileChange = (event) => {
    const nextFiles = Array.from(event.target.files || []).slice(0, 6);
    setFiles(nextFiles);
    setError('');
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError('Please choose one or more product package screenshots.');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append('files', file));
      const response = await fetch('http://localhost:8000/api/scans/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Upload failed');
      }
      onRunPrecheck(data, files);
    } catch (err) {
      setError(err.message || 'Unable to process file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="content-stack narrow-stack">
      <div className="section-header inline-header">
        <div>
          <p className="eyebrow">Manual submission</p>
          <h1>Upload New Scan</h1>
        </div>
        <button className="text-button" onClick={onBack}>← Back</button>
      </div>

      <div className="panel upload-panel">
        <div className="upload-zone">
          <Upload size={32} />
          <h3>Upload clear photographs of the package/label</h3>
          <p>Upload up to 6 images: front, back, sides, top or bottom</p>
          <input id="package-images" type="file" accept="image/png,image/jpeg,image/jpg" multiple onChange={handleFileChange} className="file-input" />
          <div className="upload-actions">
            <label htmlFor="package-images" className="action-button secondary file-trigger">Choose Package Images</label>
            <button className="action-button primary" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Processing...' : 'Run AI Pre-Check'}
            </button>
          </div>
          {files.length > 0 && <div className="file-summary">{files.length} package side{files.length === 1 ? '' : 's'} selected</div>}
          {error && <div className="error-banner">{error}</div>}
        </div>
        <div className="form-grid">
          <label>
            <span>Product Name</span>
            <input type="text" placeholder="Wheat Flour" defaultValue="Wheat Flour" />
          </label>
        </div>
        <div className="preview-grid">
          {files.length === 0 && <div className="preview-empty">Selected package images will appear here for review.</div>}
          {files.map((file, index) => (
            <div className="preview-box" key={`${file.name}-${index}`}>
              <img src={previewUrls[index]} alt={`Package side ${index + 1}`} />
              <div className="preview-label">{['Front', 'Back', 'Left Side', 'Right Side', 'Top', 'Bottom'][index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreCheckPage({ ocrData, images, onBack, onSubmit, complianceReport }) {
  const previewUrls = useObjectUrls(images);
  const checks = complianceReport?.checks || [
    { check: 'Processing...', status: 'PENDING' }
  ];

  const overall = complianceReport?.overall_result || 'UNKNOWN';

  return (
    <div className="content-stack narrow-stack">
      <div className="section-header inline-header">
        <div>
          <p className="eyebrow">AI pre-check</p>
          <h1>Compliance Assessment</h1>
        </div>
        <button className="text-button" onClick={onBack}>← Back</button>
      </div>

      <div className="panel precheck-layout">
        <div className="image-panel">
          <div className="review-image-grid">
            {images.length > 0 ? images.map((file, index) => (
              <img key={`${file.name}-${index}`} src={previewUrls[index]} alt={`Uploaded package side ${index + 1}`} />
            )) : <div className="scan-image large-image" />}
          </div>
          <div className="progress-list">
            <div className="progress-item"><span>Uploading</span><Check size={14} /></div>
            <div className="progress-item"><span>Processing Image</span><Check size={14} /></div>
            <div className="progress-item"><span>Extracting Text</span><Check size={14} /></div>
            <div className="progress-item"><span>Running Compliance Checks</span><Check size={14} /></div>
            <div className="progress-item"><span>Generating Report</span><Check size={14} /></div>
          </div>
        </div>

        <div className="result-panel">
          <div className="result-header">
            <p className="eyebrow">Overall Result</p>
            <h2 className={overall === 'COMPLIANT' ? 'result-success' : 'result-danger'}>{overall}</h2>
          </div>
          <div className="issue-list">
            {checks.map((item, idx) => (
              <div key={idx} className="issue-row">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span>{item.check}</span>
                  <small style={{color: 'var(--muted)', fontSize: '0.75rem'}}>{item.message}</small>
                </div>
                <span className={statusClass(item.status)}>{item.status}</span>
              </div>
            ))}
          </div>

          <div className="data-block">
            <h4>Detected Information</h4>
            <div className="metadata-grid">
              <div><span>Product</span><strong>{ocrData.product_name || 'Not Detected'}</strong></div>
              <div><span>Net Quantity</span><strong>{ocrData.net_quantity || 'Not Detected'}</strong></div>
              <div><span>MRP</span><strong>{ocrData.mrp || 'Not Detected'}</strong></div>
              <div><span>Batch No</span><strong>{ocrData.batch_no || 'Not Detected'}</strong></div>
              <div><span>Manufacturer</span><strong>{ocrData.manufacturer || 'Not Detected'}</strong></div>
              <div><span>Place of Manufacture</span><strong>{ocrData.place_of_manufacture || 'Not Detected'}</strong></div>
              <div><span>Manufacturing Date</span><strong>{ocrData.manufacturing_date || 'Not Detected'}</strong></div>
              <div><span>Consumer Care</span><strong>{ocrData.consumer_care || 'Not Detected'}</strong></div>
            </div>
          </div>

          <div className="button-row">
            <button className="action-button secondary">Download Report</button>
            <button className="action-button primary" onClick={onSubmit}>Submit for Official Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmissionsPage({ onOpenScan }) {
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8000/api/scans')
      .then(res => res.json())
      .then(data => setRows(data.items || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Submission history</p>
          <h1>My Submissions</h1>
        </div>
      </div>
      <div className="panel" style={{ background: 'transparent', padding: 0, boxShadow: 'none' }}>
        <div className="panel-header inline-header">
          <div className="filter-row">
            <button className="filter-chip active">All</button>
            <button className="filter-chip">Pending</button>
            <button className="filter-chip">Approved</button>
            <button className="filter-chip">Rejected</button>
          </div>
        </div>
        <div className="masonry-grid">
            {rows.map((row) => (
              <div className="submission-card" key={row.id}>
                {row.images && row.images.length > 0 && (
                  <div className="card-image-box">
                    <img src={`http://localhost:8000${row.images[0]}`} alt={row.product} />
                  </div>
                )}
                <div className="card-content">
                  <h3>{row.product}</h3>
                  <p className="card-meta">ID: {row.id} &bull; {row.submitted_on}</p>
                  <p className="card-manufacturer">{row.manufacturer}</p>
                  <div className="card-status-row">
                    <span className={statusClass(row.status)}>{row.status}</span>
                    <button className="table-link" onClick={() => onOpenScan && onOpenScan(row.id)}>Open</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function ReviewPage({ scanId, onDecision }) {
  const [remarks, setRemarks] = useState('');
  const [scan, setScan] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/scans/${scanId}`)
      .then(res => res.json())
      .then(data => setScan(data))
      .catch(err => console.error(err));
  }, [scanId]);

  if (!scan) return <div style={{padding: 40}}>Loading scan details...</div>;

  const images = scan.images || [];
  const previewUrls = images.map(img => typeof img === 'string' ? `http://localhost:8000${img}` : img);
  const ocrData = scan.ocr_data || {};
  const report = scan.compliance_report || {};
  const checks = report.checks || [];
  const currentStatus = scan.status || 'Pending';
  const overall = report.overall_result || 'UNKNOWN';

  return (
    <div className="content-stack wide-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Review submission</p>
          <h1>Scan Review</h1>
        </div>
      </div>

      <div className="review-grid">
        <div className="panel image-review">
          {images.length > 0 ? <div className="official-image-grid">{images.map((url, index) => <img key={index} src={previewUrls[index]} alt={`Package side ${index + 1}`} />)}</div> : <div className="scan-image tall-image" />}
          <div className="review-caption">{images.length || 0} package images submitted for review</div>
        </div>

        <div className="panel review-right">
          <div className="panel-header"><h3>Extracted Information (AI)</h3><span className={statusClass(currentStatus)}>{currentStatus}</span></div>
          <div className="metadata-grid compact-grid">
            <div><span>Product Name</span><strong>{ocrData.product_name || 'Not Detected'}</strong></div>
            <div><span>Net Quantity</span><strong>{ocrData.net_quantity || 'Not Detected'}</strong></div>
            <div><span>MRP</span><strong>{ocrData.mrp || 'Not Detected'}</strong></div>
            <div><span>Batch No.</span><strong>{ocrData.batch_no || 'Not Detected'}</strong></div>
            <div><span>Manufacturing Date</span><strong>{ocrData.manufacturing_date || 'Not Detected'}</strong></div>
            <div><span>Manufacturer</span><strong>{ocrData.manufacturer || 'Not Detected'}</strong></div>
            <div><span>Manufactured At</span><strong>{ocrData.place_of_manufacture || 'Not Detected'}</strong></div>
            <div><span>Consumer Care</span><strong>{ocrData.consumer_care || 'Not Detected'}</strong></div>
          </div>

          <div className="rule-checks">
            {checks.map((item, idx) => (
              <div key={idx} className="check-row">
                <div className="check-left" style={{flex: 1}}>
                  <span>{item.check}</span>
                  <small style={{color: 'var(--muted)', display: 'block'}}>{item.message}</small>
                </div>
                <div className="check-right" style={{marginLeft: 16}}>
                  <span className={statusClass(item.status)}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel decision-panel">
        <div className="decision-header">
          <div>
            <p className="eyebrow">AI-generated recommendation</p>
            <h3 className={overall === 'COMPLIANT' ? 'result-success' : 'result-danger'}>Overall Result: {overall}</h3>
          </div>
          {overall !== 'COMPLIANT' && <span className="status danger">AI suggests rejection</span>}
          {overall === 'COMPLIANT' && <span className="status success">AI suggests approval</span>}
        </div>

        <div className="ai-guidance"><strong>AI decision support</strong><p>Review the compliance report and visual evidence. Verify the declarations before deciding.</p><small>AI guidance supports official review and is not a legal determination.</small></div>

        <div className="decision-actions">
          <button className="action-button primary" onClick={() => onDecision('Approved', remarks)}>APPROVE</button>
          <button className="action-button secondary" onClick={() => onDecision('Rejected', remarks)}>REJECT</button>
          <button className="action-button neutral" onClick={() => onDecision('Re-evaluation requested', remarks)}>REQUEST RE-EVALUATION</button>
        </div>
        <textarea rows="4" value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Official remarks or supporting reason"></textarea>
      </div>
    </div>
  );
}

function RulesPage() {
  const rules = [
    { name: 'Legal Metrology (Packaged Commodities) Rules, 2011', version: 'V4.2', effectiveDate: '01/07/2024', status: 'Active' },
    { name: 'Packaged Commodities Amendment Rules', version: 'V2.1', effectiveDate: '15/04/2023', status: 'Current' },
    { name: 'Weights & Measures Standards', version: 'V7.0', effectiveDate: '09/11/2022', status: 'Active' },
  ];

  return (
    <div className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Regulatory library</p>
          <h1>Rules & Amendments</h1>
        </div>
        <button className="action-button primary">Compare Old vs New Rules</button>
      </div>
      <div className="rules-grid">
        {rules.map((rule) => (
          <div key={rule.name} className="panel rule-card">
            <div className="rule-head">
              <h3>{rule.name}</h3>
              <span className="status neutral">{rule.status}</span>
            </div>
            <div className="rule-meta">
              <p><strong>Version:</strong> {rule.version}</p>
              <p><strong>Effective Date:</strong> {rule.effectiveDate}</p>
            </div>
            <button className="text-button">View Rule</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssistantPage() {
  const prompts = [
    'What declarations are required on a packaged commodity?',
    'Why did my product fail the pre-check?',
    'What information is missing?',
    'How can I fix this label?',
  ];

  return (
    <div className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Decision support</p>
          <h1>AI Assistant</h1>
        </div>
      </div>
      <div className="panel chatbot-panel">
        <div className="prompt-list">
          {prompts.map((prompt) => (
            <button key={prompt} className="prompt-pill">{prompt}</button>
          ))}
        </div>
        <div className="chat-thread">
          <div className="chat-bubble user">What information is missing?</div>
          <div className="chat-bubble assistant">The package appears to omit consumer care details and a complete mandatory declaration block. Relevant rule: Rule 6(1) and Rule 6(2). This is a preliminary assessment, not final legal determination.</div>
        </div>
        <div className="chat-input-wrap">
          <input type="text" placeholder="Ask about declarations, rule mapping, or suspected violations" />
          <button className="action-button primary"><Send size={14} /> Send</button>
        </div>
      </div>
    </div>
  );
}

function ReportsPage({ role }) {
  return (
    <div className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Compliance reporting</p>
          <h1>{role === 'manufacturer' ? 'Manufacturer Reports' : 'Compliance Reports'}</h1>
        </div>
      </div>
      <div className="panel report-preview">
        <div className="report-block">
          <h3>METROLOGY COMPLIANCE REPORT</h3>
          <div className="report-section">
            <p><strong>Scan ID:</strong> SCN2001</p>
            <p><strong>Product:</strong> Wheat Flour</p>
            <p><strong>Manufacturer:</strong> ABC Foods Pvt Ltd</p>
            <p><strong>Submission Date:</strong> 24/05/2025</p>
          </div>
          <div className="report-section">
            <h4>Compliance Checks</h4>
            <ul>
              <li>Net Quantity Format — FAIL</li>
              <li>Mandatory Declaration — FAIL</li>
              <li>MRP Declaration — PASS</li>
              <li>Readability — WARNING</li>
            </ul>
          </div>
          <div className="report-section">
            <h4>AI Recommendation</h4>
            <p>Recommend resubmission with corrected mandatory declaration and clarity of net quantity.</p>
          </div>
        </div>
        <div className="button-row">
          <button className="action-button secondary"><Download size={14} /> Download PDF</button>
        </div>
      </div>
    </div>
  );
}

function AdminPage({ section }) {
  const sections = {
    users: 'User Management',
    officials: 'Government Officials',
    manufacturers: 'Manufacturers',
    approvals: 'Approvals Overview',
    roles: 'Roles & Permissions',
    amendments: 'Amendments',
    analytics: 'Reports & Analytics',
    logs: 'System Logs',
    models: 'AI Model Management',
    settings: 'Settings',
  };

  return (
    <div className="content-stack">
      <div className="section-header">
        <div>
          <p className="eyebrow">Administration</p>
          <h1>{sections[section] || 'Administration'}</h1>
        </div>
      </div>
      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sanjana Iyer</td>
                <td>State Legal Metrology</td>
                <td><span className="status success">Active</span></td>
                <td><button className="table-link">View</button></td>
              </tr>
              <tr>
                <td>Rohan Mehta</td>
                <td>Central Lab</td>
                <td><span className="status warning">Pending</span></td>
                <td><button className="table-link">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
