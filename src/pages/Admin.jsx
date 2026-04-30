import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState(null);
  const [skills, setSkills] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  
  // Form states
  const [editingProject, setEditingProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showSocialForm, setShowSocialForm] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Project form data
  const [projectForm, setProjectForm] = useState({
    code: '',
    title: '',
    description: '',
    category: '',
    software: '',
    tags: '',
    image_url: '',
    order: 0,
    is_published: true,
    type: 'toolpath',
    tools: ''
  });

  // Skill form data
  const [skillForm, setSkillForm] = useState({
    name: '',
    percentage: 0,
    description: '',
    order: 0,
    is_active: true
  });

  // Social link form data
  const [socialForm, setSocialForm] = useState({
    platform: '',
    url: '',
    icon: '',
    order: 0
  });

  // Categories options
  const categories = ['CNC Router', '3 Axis', '4 Axis Rotary', '5 Axis', 'Furniture Design'];
  const platformOptions = ['GitHub', 'LinkedIn', 'Instagram', 'Twitter', 'YouTube', 'Fiverr', 'Upwork', 'WhatsApp', 'Email'];

  // Check authentication on load
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([
      fetchProjects(),
      fetchSettings(),
      fetchSkills(),
      fetchSocialLinks()
    ]);
    setLoading(false);
  };

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('order');
    setProjects(data || []);
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*').single();
    setSettings(data);
  };

  const fetchSkills = async () => {
    const { data } = await supabase.from('skills').select('*').order('order');
    setSkills(data || []);
  };

  const fetchSocialLinks = async () => {
    const { data } = await supabase.from('social_links').select('*').order('order');
    setSocialLinks(data || []);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === 'admin@bima.com' && password === 'bimacnc2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      fetchAllData();
      showMessage('success', 'Login successful!');
    } else {
      showMessage('error', 'Invalid email or password!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    showMessage('success', 'Logged out successfully!');
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // ==================== PROJECT CRUD ====================
  const handleSaveProject = async () => {
    setLoading(true);
    const tagsArray = projectForm.tags.split(',').map(t => t.trim()).filter(t => t);
    const toolsArray = projectForm.tools.split(',').map(t => t.trim()).filter(t => t);
    
    const projectData = {
      code: projectForm.code,
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      software: projectForm.software,
      tags: tagsArray,
      image_url: projectForm.image_url,
      order: parseInt(projectForm.order) || 0,
      is_published: projectForm.is_published,
      type: projectForm.type,
      tools: toolsArray,
      updated_at: new Date().toISOString()
    };

    let error;
    if (editingProject) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editingProject.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('projects')
        .insert([projectData]);
      error = insertError;
    }

    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', `Project ${editingProject ? 'updated' : 'added'} successfully!`);
      resetProjectForm();
      fetchProjects();
    }
    setLoading(false);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setLoading(true);
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        showMessage('error', error.message);
      } else {
        showMessage('success', 'Project deleted successfully!');
        fetchProjects();
      }
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      code: project.code || '',
      title: project.title || '',
      description: project.description || '',
      category: project.category || '',
      software: project.software || '',
      tags: (project.tags || []).join(', '),
      image_url: project.image_url || '',
      order: project.order || 0,
      is_published: project.is_published !== false,
      type: project.type || 'toolpath',
      tools: (project.tools || []).join(', ')
    });
    setShowProjectForm(true);
  };

  const resetProjectForm = () => {
    setEditingProject(null);
    setProjectForm({
      code: '', title: '', description: '', category: '', software: '',
      tags: '', image_url: '', order: 0, is_published: true, type: 'toolpath', tools: ''
    });
    setShowProjectForm(false);
  };

  // ==================== SKILL CRUD ====================
  const handleSaveSkill = async () => {
    setLoading(true);
    const skillData = {
      name: skillForm.name,
      percentage: parseInt(skillForm.percentage) || 0,
      description: skillForm.description,
      order: parseInt(skillForm.order) || 0,
      is_active: skillForm.is_active
    };

    let error;
    if (editingSkill) {
      const { error: updateError } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', editingSkill.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('skills')
        .insert([skillData]);
      error = insertError;
    }

    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', `Skill ${editingSkill ? 'updated' : 'added'} successfully!`);
      resetSkillForm();
      fetchSkills();
    }
    setLoading(false);
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setLoading(true);
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) {
        showMessage('error', error.message);
      } else {
        showMessage('success', 'Skill deleted successfully!');
        fetchSkills();
      }
      setLoading(false);
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm({
      name: skill.name || '',
      percentage: skill.percentage || 0,
      description: skill.description || '',
      order: skill.order || 0,
      is_active: skill.is_active !== false
    });
    setShowSkillForm(true);
  };

  const resetSkillForm = () => {
    setEditingSkill(null);
    setSkillForm({
      name: '', percentage: 0, description: '', order: 0, is_active: true
    });
    setShowSkillForm(false);
  };

  // ==================== SOCIAL LINKS CRUD ====================
  const handleSaveSocial = async () => {
    setLoading(true);
    const socialData = {
      platform: socialForm.platform,
      url: socialForm.url,
      icon: socialForm.icon || socialForm.platform.toLowerCase(),
      order: parseInt(socialForm.order) || 0
    };

    let error;
    if (editingSocial) {
      const { error: updateError } = await supabase
        .from('social_links')
        .update(socialData)
        .eq('id', editingSocial.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('social_links')
        .insert([socialData]);
      error = insertError;
    }

    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', `Social link ${editingSocial ? 'updated' : 'added'} successfully!`);
      resetSocialForm();
      fetchSocialLinks();
    }
    setLoading(false);
  };

  const handleDeleteSocial = async (id) => {
    if (window.confirm('Are you sure you want to delete this social link?')) {
      setLoading(true);
      const { error } = await supabase.from('social_links').delete().eq('id', id);
      if (error) {
        showMessage('error', error.message);
      } else {
        showMessage('success', 'Social link deleted successfully!');
        fetchSocialLinks();
      }
      setLoading(false);
    }
  };

  const handleEditSocial = (social) => {
    setEditingSocial(social);
    setSocialForm({
      platform: social.platform || '',
      url: social.url || '',
      icon: social.icon || '',
      order: social.order || 0
    });
    setShowSocialForm(true);
  };

  const resetSocialForm = () => {
    setEditingSocial(null);
    setSocialForm({
      platform: '', url: '', icon: '', order: 0
    });
    setShowSocialForm(false);
  };

  // ==================== UPDATE SETTINGS ====================
  const handleUpdateSettings = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('site_settings')
      .update({
        ...settings,
        updated_at: new Date().toISOString()
      })
      .eq('id', 1);
    
    if (error) {
      showMessage('error', error.message);
    } else {
      showMessage('success', 'Settings updated successfully!');
    }
    setLoading(false);
  };

  // ==================== LOGIN FORM ====================
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <form onSubmit={handleLogin} style={styles.loginForm}>
          <h2 style={styles.loginTitle}>Admin Login</h2>
          
          {message.text && (
            <div style={{...styles.message, ...(message.type === 'error' ? styles.messageError : styles.messageSuccess)}}>
              {message.text}
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.loginButton}>
            Login
          </button>
          
          <p style={styles.demoCreds}>
            Demo: admin@bima.com / bimacnc2024
          </p>
        </form>
      </div>
    );
  }

  // ==================== MAIN ADMIN PANEL ====================
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>🎯 CMS Admin Panel</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div style={{...styles.message, ...(message.type === 'error' ? styles.messageError : styles.messageSuccess)}}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div style={styles.tabs}>
        {['projects', 'settings', 'skills', 'social'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...styles.tab,
              ...(activeTab === tab ? styles.tabActive : {})
            }}
          >
            {tab === 'projects' && '📁 Projects'}
            {tab === 'settings' && '⚙️ Settings'}
            {tab === 'skills' && '💪 Skills'}
            {tab === 'social' && '🔗 Social Links'}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && !loading && (
        <div>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Projects ({projects.length})</h2>
            <button onClick={() => { resetProjectForm(); setShowProjectForm(true); }} style={styles.addButton}>
              + Add Project
            </button>
          </div>

          {/* Project Form Modal */}
          {showProjectForm && (
            <div style={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && resetProjectForm()}>
              <div style={styles.modal}>
                <h3 style={styles.modalTitle}>{editingProject ? 'Edit Project' : 'New Project'}</h3>
                
                <div style={styles.formGrid}>
                  <input placeholder="Project Code (e.g., CNC-01)" value={projectForm.code} onChange={(e) => setProjectForm({...projectForm, code: e.target.value})} style={styles.input} />
                  <input placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} style={styles.input} />
                  <textarea placeholder="Description" rows="3" value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} style={styles.textarea} />
                  <select value={projectForm.category} onChange={(e) => setProjectForm({...projectForm, category: e.target.value})} style={styles.select}>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input placeholder="Software" value={projectForm.software} onChange={(e) => setProjectForm({...projectForm, software: e.target.value})} style={styles.input} />
                  <input placeholder="Tags (comma separated)" value={projectForm.tags} onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})} style={styles.input} />
                  <input placeholder="Tools (comma separated)" value={projectForm.tools} onChange={(e) => setProjectForm({...projectForm, tools: e.target.value})} style={styles.input} />
                  <input placeholder="Image URL" value={projectForm.image_url} onChange={(e) => setProjectForm({...projectForm, image_url: e.target.value})} style={styles.input} />
                  <input type="number" placeholder="Order" value={projectForm.order} onChange={(e) => setProjectForm({...projectForm, order: parseInt(e.target.value) || 0})} style={styles.input} />
                  <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={projectForm.is_published} onChange={(e) => setProjectForm({...projectForm, is_published: e.target.checked})} />
                    Published
                  </label>
                </div>
                
                <div style={styles.modalButtons}>
                  <button onClick={handleSaveProject} style={styles.saveButton}>Save</button>
                  <button onClick={resetProjectForm} style={styles.cancelButton}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Projects Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Published</th>
                  <th style={styles.th}>Order</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id} style={styles.tr}>
                    <td style={styles.td}>{project.code}</td>
                    <td style={styles.td}>{project.title}</td>
                    <td style={styles.td}>{project.category}</td>
                    <td style={styles.td}>
                      <span style={{color: project.is_published ? '#98a869' : '#666'}}>
                        {project.is_published ? '✓' : '✗'}
                      </span>
                    </td>
                    <td style={styles.td}>{project.order}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEditProject(project)} style={styles.editButton}>Edit</button>
                      <button onClick={() => handleDeleteProject(project.id)} style={styles.deleteButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && settings && !loading && (
        <div style={styles.settingsPanel}>
          <h2 style={styles.sectionTitle}>Site Settings</h2>
          
          <div style={styles.settingsGrid}>
            <div>
              <label style={styles.label}>Hero Title</label>
              <input value={settings.hero_title || ''} onChange={(e) => setSettings({...settings, hero_title: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Hero Subtitle</label>
              <input value={settings.hero_subtitle || ''} onChange={(e) => setSettings({...settings, hero_subtitle: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Hero Description</label>
              <textarea rows="3" value={settings.hero_description || ''} onChange={(e) => setSettings({...settings, hero_description: e.target.value})} style={styles.textarea} />
            </div>
            <div>
              <label style={styles.label}>Profile Name</label>
              <input value={settings.profile_name || ''} onChange={(e) => setSettings({...settings, profile_name: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Profile Role</label>
              <input value={settings.profile_role || ''} onChange={(e) => setSettings({...settings, profile_role: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Email</label>
              <input value={settings.email || ''} onChange={(e) => setSettings({...settings, email: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>WhatsApp</label>
              <input value={settings.whatsapp || ''} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>WhatsApp Raw (for link)</label>
              <input value={settings.whatsapp_raw || ''} onChange={(e) => setSettings({...settings, whatsapp_raw: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Location</label>
              <input value={settings.location || ''} onChange={(e) => setSettings({...settings, location: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Years Experience</label>
              <input value={settings.years_experience || ''} onChange={(e) => setSettings({...settings, years_experience: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Projects Delivered</label>
              <input value={settings.projects_delivered || ''} onChange={(e) => setSettings({...settings, projects_delivered: e.target.value})} style={styles.input} />
            </div>
            <div>
              <label style={styles.label}>Machines Programmed</label>
              <input value={settings.machines_programmed || ''} onChange={(e) => setSettings({...settings, machines_programmed: e.target.value})} style={styles.input} />
            </div>
          </div>
          
          <button onClick={handleUpdateSettings} style={styles.saveSettingsButton}>
            Save Settings
          </button>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && !loading && (
        <div>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Skills ({skills.length})</h2>
            <button onClick={() => { resetSkillForm(); setShowSkillForm(true); }} style={styles.addButton}>
              + Add Skill
            </button>
          </div>

          {/* Skill Form Modal */}
          {showSkillForm && (
            <div style={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && resetSkillForm()}>
              <div style={{...styles.modal, maxWidth: '450px'}}>
                <h3 style={styles.modalTitle}>{editingSkill ? 'Edit Skill' : 'New Skill'}</h3>
                
                <div style={styles.formGrid}>
                  <input placeholder="Skill Name" value={skillForm.name} onChange={(e) => setSkillForm({...skillForm, name: e.target.value})} style={styles.input} />
                  <input type="number" placeholder="Percentage (0-100)" value={skillForm.percentage} onChange={(e) => setSkillForm({...skillForm, percentage: parseInt(e.target.value) || 0})} style={styles.input} />
                  <textarea placeholder="Description" rows="2" value={skillForm.description} onChange={(e) => setSkillForm({...skillForm, description: e.target.value})} style={styles.textarea} />
                  <input type="number" placeholder="Order" value={skillForm.order} onChange={(e) => setSkillForm({...skillForm, order: parseInt(e.target.value) || 0})} style={styles.input} />
                  <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={skillForm.is_active} onChange={(e) => setSkillForm({...skillForm, is_active: e.target.checked})} />
                    Active
                  </label>
                </div>
                
                <div style={styles.modalButtons}>
                  <button onClick={handleSaveSkill} style={styles.saveButton}>Save</button>
                  <button onClick={resetSkillForm} style={styles.cancelButton}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Skills Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Percentage</th>
                  <th style={styles.th}>Description</th>
                  <th style={styles.th}>Order</th>
                  <th style={styles.th}>Active</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map(skill => (
                  <tr key={skill.id} style={styles.tr}>
                    <td style={styles.td}>{skill.name}</td>
                    <td style={styles.td}>{skill.percentage}%</td>
                    <td style={styles.td}>{skill.description?.substring(0, 50)}...</td>
                    <td style={styles.td}>{skill.order}</td>
                    <td style={styles.td}>
                      <span style={{color: skill.is_active ? '#98a869' : '#666'}}>
                        {skill.is_active ? '✓' : '✗'}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => handleEditSkill(skill)} style={styles.editButton}>Edit</button>
                      <button onClick={() => handleDeleteSkill(skill.id)} style={styles.deleteButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === 'social' && !loading && (
        <div>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Social Links ({socialLinks.length})</h2>
            <button onClick={() => { resetSocialForm(); setShowSocialForm(true); }} style={styles.addButton}>
              + Add Social Link
            </button>
          </div>

          {/* Social Form Modal */}
          {showSocialForm && (
            <div style={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && resetSocialForm()}>
              <div style={{...styles.modal, maxWidth: '450px'}}>
                <h3 style={styles.modalTitle}>{editingSocial ? 'Edit Social Link' : 'New Social Link'}</h3>
                
                <div style={styles.formGrid}>
                  <select value={socialForm.platform} onChange={(e) => setSocialForm({...socialForm, platform: e.target.value, icon: e.target.value.toLowerCase()})} style={styles.select}>
                    <option value="">Select Platform</option>
                    {platformOptions.map(plat => <option key={plat} value={plat}>{plat}</option>)}
                  </select>
                  <input placeholder="URL (e.g., https://github.com/username)" value={socialForm.url} onChange={(e) => setSocialForm({...socialForm, url: e.target.value})} style={styles.input} />
                  <input placeholder="Icon (optional)" value={socialForm.icon} onChange={(e) => setSocialForm({...socialForm, icon: e.target.value})} style={styles.input} />
                  <input type="number" placeholder="Order" value={socialForm.order} onChange={(e) => setSocialForm({...socialForm, order: parseInt(e.target.value) || 0})} style={styles.input} />
                </div>
                
                <div style={styles.modalButtons}>
                  <button onClick={handleSaveSocial} style={styles.saveButton}>Save</button>
                  <button onClick={resetSocialForm} style={styles.cancelButton}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Social Links Table */}
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Platform</th>
                  <th style={styles.th}>URL</th>
                  <th style={styles.th}>Order</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {socialLinks.map(link => (
                  <tr key={link.id} style={styles.tr}>
                    <td style={styles.td}>{link.platform}</td>
                    <td style={styles.td}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" style={{color: '#98a869'}}>
                        {link.url?.substring(0, 40)}...
                      </a>
                    </td>
                    <td style={styles.td}>{link.order}</td>
                    <td style={styles.td}>
                      <button onClick={() => handleEditSocial(link)} style={styles.editButton}>Edit</button>
                      <button onClick={() => handleDeleteSocial(link.id)} style={styles.deleteButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== STYLES ====================
const styles = {
  container: {
    padding: '80px 24px 40px',
    maxWidth: '1400px',
    margin: '0 auto',
    background: '#110f0e',
    minHeight: '100vh'
  },
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#110f0e'
  },
  loginForm: {
    background: '#1a1a1a',
    padding: '40px',
    borderRadius: '16px',
    width: '360px',
    border: '1px solid #333'
  },
  loginTitle: {
    color: '#98a869',
    marginBottom: '24px',
    textAlign: 'center'
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    background: '#98a869',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  demoCreds: {
    color: '#666',
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '16px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  title: {
    color: '#fff',
    fontSize: '28px'
  },
  logoutButton: {
    padding: '8px 20px',
    background: '#333',
    border: '1px solid #555',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer'
  },
  message: {
    padding: '12px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  messageSuccess: {
    background: 'rgba(152,168,105,0.2)',
    border: '1px solid #98a869',
    color: '#98a869'
  },
  messageError: {
    background: 'rgba(255,0,0,0.1)',
    border: '1px solid #ff4444',
    color: '#ff4444'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    borderBottom: '1px solid #333',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 24px',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    color: '#888',
    cursor: 'pointer'
  },
  tabActive: {
    background: '#98a869',
    color: '#000',
    fontWeight: 'bold'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#98a869'
  },
  spinner: {
    display: 'inline-block',
    width: '30px',
    height: '30px',
    border: '2px solid #98a869',
    borderTopColor: 'transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    color: '#fff'
  },
  addButton: {
    padding: '10px 20px',
    background: '#98a869',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '12px',
    color: '#98a869',
    fontSize: '12px'
  },
  td: {
    padding: '12px',
    color: '#ccc',
    fontSize: '13px'
  },
  tr: {
    borderBottom: '1px solid #222'
  },
  editButton: {
    padding: '6px 12px',
    background: '#555',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '11px',
    marginRight: '8px'
  },
  deleteButton: {
    padding: '6px 12px',
    background: '#ff4444',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '11px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    background: '#1a1a1a',
    padding: '32px',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '700px',
    maxHeight: '85vh',
    overflowY: 'auto'
  },
  modalTitle: {
    color: '#98a869',
    marginBottom: '24px'
  },
  formGrid: {
    display: 'grid',
    gap: '16px'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#222',
    color: '#fff',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#222',
    color: '#fff',
    fontSize: '14px',
    resize: 'vertical'
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    background: '#222',
    color: '#fff',
    fontSize: '14px'
  },
  checkboxLabel: {
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  modalButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  saveButton: {
    padding: '10px 20px',
    background: '#98a869',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '10px 20px',
    background: '#333',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer'
  },
  settingsPanel: {
    background: '#1a1a1a',
    padding: '24px',
    borderRadius: '16px'
  },
  settingsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  label: {
    display: 'block',
    color: '#888',
    fontSize: '12px',
    marginBottom: '6px'
  },
  saveSettingsButton: {
    padding: '10px 20px',
    background: '#98a869',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '24px'
  }
};

export default Admin;