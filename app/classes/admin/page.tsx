'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, Download, Save, X, Plus } from 'lucide-react';
import { fetchClasses, verifyPassword } from '@/app/actions';
import styles from './admin.module.css';

interface InstructionalClass {
  date: string;
  time: string;
  type: 'in-person' | 'virtual';
}

interface CourseClass {
  id: string;
  name?: string;
  isFull: boolean;
  startDate: string;
  endDate: string;
  orientation: {
    date: string;
    time: string;
  };
  instructionalClasses: InstructionalClass[];
  finalTest: {
    date: string;
    time: string;
  };
}

// --- Time formatting helpers ---
function parseTimeString(timeStr: string) {
  if (!timeStr) return { start: '', end: '' };
  const parts = timeStr.split(' - ');
  
  const parsePart = (t: string) => {
    if (!t) return '';
    const splitted = t.trim().split(' ');
    if (splitted.length < 2) return '';
    const [time, period] = splitted;
    const timeParts = time.split(':');
    if (timeParts.length < 2) return '';
    let [h, m] = timeParts;
    let hours = parseInt(h, 10);
    if (isNaN(hours)) return '';
    if (period.toUpperCase() === 'PM' && hours < 12) hours += 12;
    if (period.toUpperCase() === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${m}`;
  };
  
  return { 
    start: parts[0] ? parsePart(parts[0]) : '', 
    end: parts[1] ? parsePart(parts[1]) : '' 
  };
}

function formatTimeString(start: string, end: string) {
  const formatPart = (t: string) => {
    if (!t) return '';
    let [h, m] = t.split(':');
    if (!h || !m) return '';
    let hours = parseInt(h, 10);
    if (isNaN(hours)) return '';
    const period = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;
    return `${hours}:${m} ${period}`;
  };
  
  const s = formatPart(start);
  const e = formatPart(end);
  if (!s && !e) return '';
  return `${s} - ${e}`;
}

const isValidTime = (timeStr: string) => {
  if (!timeStr) return false;
  const parts = timeStr.split(' - ');
  return parts.length === 2 && parts[0].trim() !== '' && parts[1].trim() !== '' && parts[0].includes(':') && parts[1].includes(':');
};

const TimeRangeInput = ({ value, onChange, style, title }: { value: string, onChange: (val: string) => void, style?: any, title?: string }) => {
  const { start, end } = parseTimeString(value);
  
  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatTimeString(e.target.value, end));
  };
  
  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(formatTimeString(start, e.target.value));
  };
  
  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', width: '100%' }}>
      <input type="time" value={start} onChange={handleStartChange} style={{ ...style, flex: 1 }} title={title} />
      <span style={{ color: 'var(--text-secondary)' }}>to</span>
      <input type="time" value={end} onChange={handleEndChange} style={{ ...style, flex: 1 }} title={title} />
    </div>
  );
};
// ------------------------------

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [classes, setClasses] = useState<CourseClass[]>([]);
  const [originalClasses, setOriginalClasses] = useState<CourseClass[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Fetch initial data
  const loadClasses = async () => {
    try {
      const data = await fetchClasses();
      setClasses(data);
      setOriginalClasses(JSON.parse(JSON.stringify(data)));
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error('Failed to load classes', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadClasses();
    }
  }, [isAuthenticated]);

  // Handle unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Check for changes
  useEffect(() => {
    if (isAuthenticated) {
      const current = JSON.stringify(classes);
      const original = JSON.stringify(originalClasses);
      setHasUnsavedChanges(current !== original);
    }
  }, [classes, originalClasses, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      const isValid = await verifyPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    }
  };

  const handleSave = async () => {
    // Validation
    for (let i = 0; i < classes.length; i++) {
      const cls = classes[i];
      if (!cls.name || !cls.startDate || !cls.endDate) {
        setError(`Class ${cls.id} is missing required course fields (Name, Start Date, or End Date).`);
        return;
      }
      if (!cls.orientation.date || !isValidTime(cls.orientation.time)) {
        setError(`Class ${cls.id} is missing a valid orientation date or time range.`);
        return;
      }
      if (!cls.finalTest.date || !isValidTime(cls.finalTest.time)) {
        setError(`Class ${cls.id} is missing a valid final test date or time range.`);
        return;
      }
      for (let j = 0; j < cls.instructionalClasses.length; j++) {
        const inst = cls.instructionalClasses[j];
        if (!inst.date || !isValidTime(inst.time) || !inst.type) {
          setError(`Class ${cls.id} is missing required fields (Date, complete Time Range, or Type) for instructional class #${j + 1}.`);
          return;
        }
      }
    }

    setIsSaving(true);
    setError('');
    try {
      const res = await fetch('/api/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, classes }),
      });

      const data = await res.json();
      if (res.ok) {
        setOriginalClasses(JSON.parse(JSON.stringify(classes)));
        setHasUnsavedChanges(false);
        alert('Classes saved successfully! A backup has been created.');
      } else {
        setError(data.error || 'Failed to save classes');
        if (res.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      setError('A network error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(classes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'classes.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateClass = (index: number, field: keyof CourseClass, value: any) => {
    const newClasses = [...classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setClasses(newClasses);
  };

  const updateNestedField = (classIndex: number, parentField: 'orientation' | 'finalTest', field: string, value: string) => {
    const newClasses = [...classes];
    newClasses[classIndex] = {
      ...newClasses[classIndex],
      [parentField]: {
        ...newClasses[classIndex][parentField],
        [field]: value
      }
    };
    setClasses(newClasses);
  };

  const updateInstructionalClass = (classIndex: number, instIndex: number, field: keyof InstructionalClass, value: string) => {
    const newClasses = [...classes];
    newClasses[classIndex].instructionalClasses[instIndex] = {
      ...newClasses[classIndex].instructionalClasses[instIndex],
      [field]: value
    };
    setClasses(newClasses);
  };

  const addInstructionalClass = (classIndex: number) => {
    const newClasses = [...classes];
    const instructionalClasses = newClasses[classIndex].instructionalClasses;
    
    let nextDate = '';
    let defaultTime = '';
    let defaultType: 'in-person' | 'virtual' = 'in-person';
    
    if (instructionalClasses.length > 0) {
      const last = instructionalClasses[instructionalClasses.length - 1];
      if (last.date) {
        const lastDateObj = new Date(last.date + 'T00:00:00'); // Prevent timezone shift
        lastDateObj.setDate(lastDateObj.getDate() + 1);
        nextDate = lastDateObj.toISOString().split('T')[0];
      }
      defaultTime = last.time;
      defaultType = last.type;
    }

    instructionalClasses.push({ date: nextDate, time: defaultTime, type: defaultType });
    setClasses(newClasses);
  };

  const removeInstructionalClass = (classIndex: number, instIndex: number) => {
    const newClasses = [...classes];
    newClasses[classIndex].instructionalClasses.splice(instIndex, 1);
    setClasses(newClasses);
  };

  const addNewClass = () => {
    const newId = (classes.length > 0 ? Math.max(...classes.map(c => parseInt(c.id || '0'))) + 1 : 1).toString();
    setClasses([...classes, {
      id: newId,
      name: '',
      isFull: false,
      startDate: '',
      endDate: '',
      orientation: { date: '', time: '' },
      instructionalClasses: [],
      finalTest: { date: '', time: '' }
    }]);
  };

  const deleteClass = (index: number) => {
    if (confirm('Are you sure you want to delete this class?')) {
      const newClasses = [...classes];
      newClasses.splice(index, 1);
      setClasses(newClasses);
    }
  };

  const cancelChanges = () => {
    if (confirm('Are you sure you want to discard all unsaved changes?')) {
      setClasses(JSON.parse(JSON.stringify(originalClasses)));
      setHasUnsavedChanges(false);
      setError('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminContainer}>
        <div className={styles.loginContainer}>
          <h1>Admin Access</h1>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Please enter the administrator password to manage classes.</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer} style={{ paddingBottom: '100px' }}>
      <div className={styles.header}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Manage Classes</h1>
          {hasUnsavedChanges && <span style={{ color: '#d97706', fontWeight: 'bold' }}>You have unsaved changes</span>}
        </div>
        <div className={styles.actions}>
          <button className="btn btn-secondary" onClick={handleDownload}>
            <Download size={18} style={{ marginRight: '0.5rem' }} /> Download JSON
          </button>
          <button className="btn btn-primary" onClick={addNewClass}>
            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add New Class
          </button>
        </div>
      </div>

      {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #fca5a5' }}>{error}</div>}

      <div className={styles.classesWrapper}>
        {classes.map((cls, classIndex) => (
          <div key={cls.id || classIndex} className={styles.classCard}>
            <button className={styles.deleteClassBtn} onClick={() => deleteClass(classIndex)}>
              <Trash2 size={16} style={{ display: 'inline', marginRight: '0.25rem' }}/> Delete Class
            </button>
            
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)', paddingRight: '120px' }}>
              Class {cls.id}: {cls.name || 'Unnamed Course'}
            </h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Course Name <span style={{color: 'red'}}>*</span></label>
                <input type="text" value={cls.name || ''} onChange={(e) => updateClass(classIndex, 'name', e.target.value)} placeholder="e.g. July 2026 Morning Course" />
              </div>
              <div className={styles.formGroup} style={{ justifyContent: 'center' }}>
                <label className={styles.checkboxGroup}>
                  <input type="checkbox" checked={cls.isFull} onChange={(e) => updateClass(classIndex, 'isFull', e.target.checked)} />
                  Mark Course as Full
                </label>
              </div>
              <div className={styles.formGroup}>
                <label>Start Date <span style={{color: 'red'}}>*</span></label>
                <input type="date" value={cls.startDate} onChange={(e) => updateClass(classIndex, 'startDate', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label>End Date <span style={{color: 'red'}}>*</span></label>
                <input type="date" value={cls.endDate} onChange={(e) => updateClass(classIndex, 'endDate', e.target.value)} />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <div className={styles.sectionTitle} style={{ marginTop: 0 }}>Orientation</div>
                <label>Date <span style={{color: 'red'}}>*</span></label>
                <input type="date" value={cls.orientation.date} onChange={(e) => updateNestedField(classIndex, 'orientation', 'date', e.target.value)} />
                <label style={{ marginTop: '0.5rem' }}>Time <span style={{color: 'red'}}>*</span></label>
                <TimeRangeInput 
                  value={cls.orientation.time} 
                  onChange={(val) => updateNestedField(classIndex, 'orientation', 'time', val)} 
                  style={{ borderColor: !isValidTime(cls.orientation.time) ? 'red' : 'var(--border)' }} 
                  title={!isValidTime(cls.orientation.time) ? "Both start and end times are required" : ""} 
                />
              </div>
              <div className={styles.formGroup}>
                <div className={styles.sectionTitle} style={{ marginTop: 0 }}>Final Test</div>
                <label>Date <span style={{color: 'red'}}>*</span></label>
                <input type="date" value={cls.finalTest.date} onChange={(e) => updateNestedField(classIndex, 'finalTest', 'date', e.target.value)} />
                <label style={{ marginTop: '0.5rem' }}>Time <span style={{color: 'red'}}>*</span></label>
                <TimeRangeInput 
                  value={cls.finalTest.time} 
                  onChange={(val) => updateNestedField(classIndex, 'finalTest', 'time', val)} 
                  style={{ borderColor: !isValidTime(cls.finalTest.time) ? 'red' : 'var(--border)' }} 
                  title={!isValidTime(cls.finalTest.time) ? "Both start and end times are required" : ""} 
                />
              </div>
            </div>

            <div className={styles.sectionTitle}>Instructional Classes</div>
            <div className={styles.instructionalClassList}>
              {cls.instructionalClasses.map((inst, instIndex) => (
                <div key={instIndex} className={styles.instructionalClassItem}>
                  <input type="date" value={inst.date} onChange={(e) => updateInstructionalClass(classIndex, instIndex, 'date', e.target.value)} style={{ borderColor: !inst.date ? 'red' : 'var(--border)' }} title={!inst.date ? "Required" : ""} />
                  <TimeRangeInput 
                    value={inst.time} 
                    onChange={(val) => updateInstructionalClass(classIndex, instIndex, 'time', val)} 
                    style={{ borderColor: !isValidTime(inst.time) ? 'red' : 'var(--border)' }} 
                    title={!isValidTime(inst.time) ? "Both start and end times are required" : ""} 
                  />
                  <select value={inst.type} onChange={(e) => updateInstructionalClass(classIndex, instIndex, 'type', e.target.value as any)} style={{ borderColor: !inst.type ? 'red' : 'var(--border)' }}>
                    <option value="in-person">In-Person</option>
                    <option value="virtual">Virtual</option>
                  </select>
                  <button className={styles.deleteBtn} onClick={() => removeInstructionalClass(classIndex, instIndex)} title="Remove Class">
                    <X size={18} />
                  </button>
                </div>
              ))}
              <button className={styles.addBtn} onClick={() => addInstructionalClass(classIndex)}>
                + Add Instructional Class
              </button>
            </div>
          </div>
        ))}
        {classes.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No classes found. Click "Add New Class" to create one.</p>}
      </div>

      {hasUnsavedChanges && (
        <div className={styles.footerActions}>
          <button className="btn btn-secondary" onClick={cancelChanges} disabled={isSaving}>Cancel Changes</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
            <Save size={18} style={{ marginRight: '0.5rem' }} /> {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      )}
    </div>
  );
}
