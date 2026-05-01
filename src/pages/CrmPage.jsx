import { useEffect, useMemo, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'

import { LazyImage } from '../components/LazyImage'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fileToBase64 } from '../lib/files'
import { request } from '../lib/api'
import { clearAuthError, loginAdmin, logoutAdmin } from '../features/auth/authSlice'
import {
  addProjectGalleryImages,
  createProject,
  deleteProject,
  deleteProjectGalleryImage,
  fetchProjectBySlug,
  fetchProjects,
  updateProjectGalleryImageCaption,
  updateProject,
} from '../features/projects/projectsSlice'

const leadStatusOptions = ['new', 'pending', 'completed', 'rejected']

export default function CrmPage() {
  const dispatch = useAppDispatch()
  const { token, username, status: authStatus, error: authError } = useAppSelector((state) => state.auth)
  const {
    items: projects,
    selectedProject,
    mutationStatus,
    error: projectError,
  } = useAppSelector((state) => state.projects)

  const [activePanel, setActivePanel] = useState('cards')
  const [selectedSlug, setSelectedSlug] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [projectForm, setProjectForm] = useState({
    name: '',
    shortDescription: '',
    coverPhoto: null,
    editingSlug: '',
  })
  const [galleryFiles, setGalleryFiles] = useState([])
  const [editingCaptionKey, setEditingCaptionKey] = useState('')
  const [captionDraft, setCaptionDraft] = useState('')
  const [leads, setLeads] = useState([])
  const [leadsStatus, setLeadsStatus] = useState('idle')
  const [leadsError, setLeadsError] = useState('')
  const [leadStatusDrafts, setLeadStatusDrafts] = useState({})
  const [updatingLeadId, setUpdatingLeadId] = useState('')
  const [leadModal, setLeadModal] = useState(null)

  const isBusy = authStatus === 'loading' || mutationStatus === 'loading'
  const errorMessage = useMemo(() => authError || projectError, [authError, projectError])
  const leadRows = useMemo(
    () =>
      leads.map((lead) => ({
        id: lead._id,
        ...lead,
      })),
    [leads],
  )

  const leadColumns = useMemo(
    () => [
      { field: 'fullName', headerName: 'Name', flex: 1.05, minWidth: 180 },
      { field: 'phone', headerName: 'Phone', flex: 0.9, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1.15, minWidth: 220 },
      { field: 'location', headerName: 'Location', flex: 0.95, minWidth: 160 },
      { field: 'message', headerName: 'Message', flex: 1.4, minWidth: 260 },
      {
        field: 'status',
        headerName: 'Status',
        flex: 0.8,
        minWidth: 140,
        renderCell: (params) => (
          <span className={`crm-status-badge crm-status-badge--${params.value}`}>{params.value}</span>
        ),
      },
      {
        field: 'actions',
        headerName: 'Action',
        sortable: false,
        filterable: false,
        minWidth: 130,
        flex: 0.7,
        renderCell: (params) => (
          <div className="crm-lead-actions">
            <button
              className="crm-icon-button crm-icon-button--edit"
              type="button"
              aria-label="Edit lead status"
              title="Edit lead status"
              onClick={() => handleOpenLeadModal(params.row)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 20h4l10-10-4-4L4 16v4zm12.7-13.3 1.6-1.6a1 1 0 0 1 1.4 0l1.2 1.2a1 1 0 0 1 0 1.4L19.3 9l-2.6-2.3z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              className="crm-icon-button crm-icon-button--delete"
              type="button"
              aria-label="Delete lead"
              title="Delete lead"
              onClick={() => handleDeleteLead(params.row.id)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 7h2v8h-2v-8Zm4 0h2v8h-2v-8ZM7 10h2v8H7v-8Zm-1 10h12l1-12H5l1 12Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        ),
      },
      {
        field: 'createdAt',
        headerName: 'Created',
        flex: 0.9,
        minWidth: 180,
        valueFormatter: (value) => {
          if (!value) {
            return ''
          }

          return new Date(value).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        },
      },
    ],
    [],
  )

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch])

  useEffect(() => {
    if (!token) {
      return
    }

    const fetchLeads = async () => {
      setLeadsStatus('loading')
      setLeadsError('')

      try {
        const payload = await request('/api/leads')
        setLeads(payload.data || [])
        setLeadStatusDrafts(
          Object.fromEntries((payload.data || []).map((lead) => [lead._id, lead.status || 'new'])),
        )
        setLeadsStatus('succeeded')
      } catch (error) {
        setLeadsStatus('failed')
        setLeadsError(error.message || 'Failed to fetch leads')
      }
    }

    fetchLeads()
  }, [token])

  useEffect(() => {
    if (!selectedSlug && projects.length) {
      setSelectedSlug(projects[0].slug)
    }
  }, [projects, selectedSlug])

  useEffect(() => {
    if (selectedSlug) {
      dispatch(fetchProjectBySlug(selectedSlug))
    }
  }, [dispatch, selectedSlug])

  useEffect(() => {
    setEditingCaptionKey('')
    setCaptionDraft('')
  }, [selectedSlug])

  const resetProjectForm = () => {
    setProjectForm({
      name: '',
      shortDescription: '',
      coverPhoto: null,
      editingSlug: '',
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setStatusMessage('')
    dispatch(clearAuthError())

    try {
      await dispatch(loginAdmin(loginForm)).unwrap()
      setStatusMessage('Logged in successfully.')
    } catch (error) {
      return error
    }
  }

  const handleLogout = () => {
    dispatch(logoutAdmin())
    setStatusMessage('Logged out.')
  }

  const handleProjectSubmit = async (event) => {
    event.preventDefault()
    setStatusMessage('')
    try {
      const projectPayload = {
        name: projectForm.name,
        shortDescription: projectForm.shortDescription,
      }

      if (projectForm.coverPhoto) {
        projectPayload.coverPhoto = {
          fileName: projectForm.coverPhoto.name,
          contentType: projectForm.coverPhoto.type,
          content: await fileToBase64(projectForm.coverPhoto),
        }
      }

      if (!projectForm.editingSlug && !projectPayload.coverPhoto) {
        throw new Error('Cover photo is required for a new client card')
      }

      if (projectForm.editingSlug) {
        await dispatch(
          updateProject({
            token,
            slug: projectForm.editingSlug,
            projectPayload,
          }),
        ).unwrap()
        setStatusMessage('Client card updated successfully.')
      } else {
        await dispatch(createProject({ token, projectPayload })).unwrap()
        setStatusMessage('Client card created successfully.')
      }

      await dispatch(fetchProjects()).unwrap()
      resetProjectForm()
    } catch (error) {
      return error
    }
  }

  const handleEditProject = async (slug) => {
    try {
      const project = await dispatch(fetchProjectBySlug(slug)).unwrap()
      setProjectForm({
        name: project.name,
        shortDescription: project.shortDescription,
        coverPhoto: null,
        editingSlug: project.slug,
      })
      setActivePanel('cards')
    } catch (error) {
      return error
    }
  }

  const handleDeleteProject = async (slug) => {
    if (!window.confirm('Delete this client card and its gallery images?')) {
      return
    }

    try {
      await dispatch(deleteProject({ token, slug })).unwrap()
      setStatusMessage('Project deleted successfully.')

      if (selectedSlug === slug) {
        setSelectedSlug('')
      }

      await dispatch(fetchProjects()).unwrap()
    } catch (error) {
      return error
    }
  }

  const handleGalleryUpload = async (event) => {
    event.preventDefault()

    if (!selectedSlug || !galleryFiles.length) {
      return
    }

    try {
      const gallery = await Promise.all(
        galleryFiles.map(async (file) => ({
          fileName: file.name,
          contentType: file.type,
          content: await fileToBase64(file),
          caption: file.name.replace(/\.[^.]+$/, ''),
        })),
      )

      await dispatch(addProjectGalleryImages({ token, slug: selectedSlug, gallery })).unwrap()
      setGalleryFiles([])
      setStatusMessage('Gallery images added successfully.')
      await dispatch(fetchProjects()).unwrap()
      await dispatch(fetchProjectBySlug(selectedSlug)).unwrap()
    } catch (error) {
      return error
    }
  }

  const handleDeleteGalleryImage = async (key) => {
    if (!window.confirm('Delete this gallery image permanently?')) {
      return
    }

    try {
      await dispatch(deleteProjectGalleryImage({ token, slug: selectedSlug, key })).unwrap()
      setStatusMessage('Gallery image deleted successfully.')
      await dispatch(fetchProjects()).unwrap()
      await dispatch(fetchProjectBySlug(selectedSlug)).unwrap()
    } catch (error) {
      return error
    }
  }

  const handleLeadStatusUpdate = async (leadId, status) => {
    setStatusMessage('')
    setLeadsError('')
    setUpdatingLeadId(leadId)

    try {
      const payload = await request(`/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      setLeads((current) =>
        current.map((lead) => (lead._id === leadId ? payload.data : lead)),
      )
      setLeadStatusDrafts((current) => ({
        ...current,
        [leadId]: payload.data.status,
      }))
      setStatusMessage('Lead status updated successfully.')
    } catch (error) {
      setLeadsError(error.message || 'Failed to update lead status')
    } finally {
      setUpdatingLeadId('')
    }
  }

  const handleOpenLeadModal = (lead) => {
    setLeadStatusDrafts((current) => ({
      ...current,
      [lead.id]: lead.status,
    }))
    setLeadModal(lead)
  }

  const handleCloseLeadModal = () => {
    if (updatingLeadId) {
      return
    }

    setLeadModal(null)
  }

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Hide this lead from the CRM list?')) {
      return
    }

    setStatusMessage('')
    setLeadsError('')
    setUpdatingLeadId(leadId)

    try {
      await request(`/api/leads/${leadId}`, {
        method: 'DELETE',
      })

      setLeads((current) => current.filter((lead) => lead._id !== leadId))
      setLeadStatusDrafts((current) => {
        const next = { ...current }
        delete next[leadId]
        return next
      })
      setStatusMessage('Lead hidden successfully.')
    } catch (error) {
      setLeadsError(error.message || 'Failed to hide lead')
    } finally {
      setUpdatingLeadId('')
    }
  }

  const getGalleryCaptionValue = (image) => {
    if (image.caption) {
      return image.caption
    }

    const rawFileName = image.key.split('/').pop() || ''
    const fileNameWithoutPrefix = rawFileName.replace(/^\d+-/, '')

    return fileNameWithoutPrefix.replace(/\.[^.]+$/, '') || selectedProject?.name || 'Gallery image'
  }

  const handleStartCaptionEdit = (image) => {
    setEditingCaptionKey(image.key)
    setCaptionDraft(getGalleryCaptionValue(image))
  }

  const handleCancelCaptionEdit = () => {
    setEditingCaptionKey('')
    setCaptionDraft('')
  }

  const handleSaveGalleryCaption = async (key) => {
    try {
      await dispatch(
        updateProjectGalleryImageCaption({
          token,
          slug: selectedSlug,
          key,
          caption: captionDraft,
        }),
      ).unwrap()
      setStatusMessage('Gallery image caption updated successfully.')
      setEditingCaptionKey('')
      setCaptionDraft('')
      await dispatch(fetchProjectBySlug(selectedSlug)).unwrap()
    } catch (error) {
      return error
    }
  }

  if (!token) {
    return (
      <div className="crm-shell">
        <div className="crm-login">
          <div className="crm-login__card">
            <p className="crm-login__eyebrow">Admin CRM</p>
            <h1>Project Showcase Manager</h1>
            <p>Sign in with your static admin credentials to manage client cards and project galleries.</p>
            <form className="crm-form" onSubmit={handleLogin}>
              <label>
                <span>Username</span>
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, username: event.target.value }))
                  }
                  required
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((current) => ({ ...current, password: event.target.value }))
                  }
                  required
                />
              </label>
              <button className="crm-button crm-button--primary" type="submit" disabled={isBusy}>
                {isBusy ? 'Signing in...' : 'Login'}
              </button>
            </form>
            {errorMessage ? <p className="crm-alert crm-alert--error">{errorMessage}</p> : null}
            <p className="crm-login__hint">Default static credentials: `admin` / `gis@123`</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="crm-shell">
      <aside className="crm-sidebar">
        <div>
          <p className="crm-sidebar__eyebrow">Logged In</p>
          <h2>{username}</h2>
          <p>Manage main-page client cards and add multiple gallery images for each client project.</p>
        </div>
        <div className="crm-sidebar__nav">
          <button
            className={`crm-nav-button ${activePanel === 'cards' ? 'crm-nav-button--active' : ''}`}
            onClick={() => setActivePanel('cards')}
            type="button"
          >
            Client Cards
          </button>
          <button
            className={`crm-nav-button ${activePanel === 'gallery' ? 'crm-nav-button--active' : ''}`}
            onClick={() => setActivePanel('gallery')}
            type="button"
          >
            Gallery Manager
          </button>
          <button
            className={`crm-nav-button ${activePanel === 'leads' ? 'crm-nav-button--active' : ''}`}
            onClick={() => setActivePanel('leads')}
            type="button"
          >
            Leads
          </button>
        </div>
        <button className="crm-button crm-button--secondary" onClick={handleLogout} type="button">
          Logout
        </button>
      </aside>

      <main className="crm-content">
        <div className="crm-toolbar">
          <div>
            <p className="crm-section__eyebrow">Dashboard</p>
            <h1>Project CRM</h1>
          </div>
          <Link className="crm-button crm-button--secondary" to="/">
            View Website
          </Link>
        </div>

        {statusMessage ? <p className="crm-alert crm-alert--success">{statusMessage}</p> : null}
        {errorMessage ? <p className="crm-alert crm-alert--error">{errorMessage}</p> : null}

        {activePanel === 'cards' ? (
          <section className="crm-panel-grid">
            <form className="crm-panel crm-form" onSubmit={handleProjectSubmit}>
              <div className="crm-panel__header">
                <div>
                  <p className="crm-section__eyebrow">Main Page</p>
                  <h2>{projectForm.editingSlug ? 'Edit Client Card' : 'Add Client Card'}</h2>
                </div>
                {projectForm.editingSlug ? (
                  <button className="crm-button crm-button--ghost" onClick={resetProjectForm} type="button">
                    Cancel Edit
                  </button>
                ) : null}
              </div>

              <label>
                <span>Client / Project Name</span>
                <input
                  type="text"
                  value={projectForm.name}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, name: event.target.value }))
                  }
                  required
                />
              </label>

              <label>
                <span>Short Description</span>
                <textarea
                  rows="4"
                  value={projectForm.shortDescription}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      shortDescription: event.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label>
                <span>{projectForm.editingSlug ? 'Replace Cover Photo' : 'Cover Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      coverPhoto: event.target.files?.[0] || null,
                    }))
                  }
                />
              </label>

              <button className="crm-button crm-button--primary" type="submit" disabled={isBusy}>
                {projectForm.editingSlug ? 'Update Card' : 'Create Card'}
              </button>
            </form>

            <div className="crm-panel crm-panel--scroll-layout">
              <div className="crm-panel__header">
                <div>
                  <p className="crm-section__eyebrow">Existing Cards</p>
                  <h2>Client Card List</h2>
                </div>
                <span>{projects.length} total</span>
              </div>

              <div className="crm-list crm-list--scroll">
                {projects.map((project) => (
                  <article className="crm-project-item" key={project.slug}>
                    <LazyImage src={project.coverImage?.url} alt={project.name} />
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.shortDescription}</p>
                      <span>{project.galleryCount} gallery images</span>
                    </div>
                    <div className="crm-project-item__actions">
                      <button
                        className="crm-button crm-button--ghost"
                        onClick={() => {
                          setSelectedSlug(project.slug)
                          setActivePanel('gallery')
                        }}
                        type="button"
                      >
                        Gallery
                      </button>
                      <button
                        className="crm-button crm-button--ghost"
                        onClick={() => handleEditProject(project.slug)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        className="crm-button crm-button--danger"
                        onClick={() => handleDeleteProject(project.slug)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : activePanel === 'gallery' ? (
          <section className="crm-panel-grid crm-panel-grid--gallery">
            <div className="crm-panel crm-panel--scroll-layout">
              <div className="crm-panel__header">
                <div>
                  <p className="crm-section__eyebrow">Gallery Selector</p>
                  <h2>Choose Client</h2>
                </div>
              </div>
              <div className="crm-selector-list crm-selector-list--scroll">
                {projects.map((project) => (
                  <button
                    className={`crm-selector ${selectedSlug === project.slug ? 'crm-selector--active' : ''}`}
                    key={project.slug}
                    onClick={() => setSelectedSlug(project.slug)}
                    type="button"
                  >
                    <strong>{project.name}</strong>
                    <span>{project.galleryCount} images</span>
                  </button>
                ))}
              </div>

              <form className="crm-form crm-form--compact" onSubmit={handleGalleryUpload}>
                <label>
                  <span>Add Multiple Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))}
                  />
                </label>
                <button className="crm-button crm-button--primary" type="submit" disabled={isBusy}>
                  Upload To Gallery
                </button>
              </form>
            </div>

            <div className="crm-panel crm-panel--scroll-layout">
              <div className="crm-panel__header">
                <div>
                  <p className="crm-section__eyebrow">Gallery CRUD</p>
                  <h2>{selectedProject?.name || 'Select a Client'}</h2>
                </div>
                <span>{selectedProject?.galleryImages?.length || 0} images</span>
              </div>

              {selectedProject ? (
                <div className="crm-gallery-grid crm-gallery-grid--scroll">
                  {selectedProject.galleryImages.map((image) => (
                    <figure className="crm-gallery-item" key={image.key}>
                      <LazyImage src={image.url} alt={image.caption || selectedProject.name} />
                      {editingCaptionKey === image.key ? (
                        <div className="crm-gallery-item__editor">
                          <label className="crm-gallery-item__caption-field">
                            <span>Caption</span>
                            <input
                              type="text"
                              value={captionDraft}
                              onChange={(event) => setCaptionDraft(event.target.value)}
                            />
                          </label>
                          <div className="crm-gallery-item__actions">
                            <button
                              className="crm-button crm-button--primary"
                              onClick={() => handleSaveGalleryCaption(image.key)}
                              type="button"
                              disabled={isBusy}
                            >
                              Save
                            </button>
                            <button
                              className="crm-button crm-button--ghost"
                              onClick={handleCancelCaptionEdit}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="crm-gallery-item__caption-row">
                          <figcaption>{getGalleryCaptionValue(image)}</figcaption>
                          <button
                            className="crm-icon-button"
                            onClick={() => handleStartCaptionEdit(image)}
                            type="button"
                            aria-label="Edit image caption"
                            title="Edit caption"
                          >
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M4 20h4l10-10-4-4L4 16v4zm12.7-13.3 1.6-1.6a1 1 0 0 1 1.4 0l1.2 1.2a1 1 0 0 1 0 1.4L19.3 9l-2.6-2.3z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                      <div className="crm-gallery-item__actions">
                        <button
                          className="crm-button crm-button--danger"
                          onClick={() => handleDeleteGalleryImage(image.key)}
                          type="button"
                        >
                          Delete Image
                        </button>
                      </div>
                    </figure>
                  ))}
                </div>
              ) : (
                <p>Select a client card from the left panel to manage its gallery.</p>
              )}
            </div>
          </section>
        ) : (
          <section className="crm-panel-grid crm-panel-grid--single">
            <div className="crm-panel crm-panel--scroll-layout">
              <div className="crm-panel__header">
                <div>
                  <p className="crm-section__eyebrow">Lead Inbox</p>
                  <h2>Submitted Leads</h2>
                </div>
                <span>{leadRows.length} total</span>
              </div>

              {leadsError ? <p className="crm-alert crm-alert--error">{leadsError}</p> : null}

              <div className="crm-data-grid">
                <DataGrid
                  rows={leadRows}
                  columns={leadColumns}
                  loading={leadsStatus === 'loading'}
                  disableRowSelectionOnClick
                  pageSizeOptions={[10, 25, 50]}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                        page: 0,
                      },
                    },
                    sorting: {
                      sortModel: [{ field: 'createdAt', sort: 'desc' }],
                    },
                  }}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {leadModal ? (
        <div className="crm-modal-backdrop" onClick={handleCloseLeadModal} role="presentation">
          <div
            className="crm-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
          >
            <div className="crm-panel__header">
              <div>
                <p className="crm-section__eyebrow">Lead Action</p>
                <h2 id="lead-modal-title">Update Lead Status</h2>
              </div>
              <button
                className="crm-button crm-button--ghost crm-button--small"
                type="button"
                onClick={handleCloseLeadModal}
                disabled={updatingLeadId === leadModal.id}
              >
                Close
              </button>
            </div>

            <div className="crm-modal__body">
              <p><strong>Name:</strong> {leadModal.fullName}</p>
              <p><strong>Email:</strong> {leadModal.email}</p>
              <p><strong>Phone:</strong> {leadModal.phone}</p>
              <label className="crm-modal__field">
                <span>Status</span>
                <select
                  className="crm-status-select"
                  value={leadStatusDrafts[leadModal.id] || leadModal.status}
                  onChange={(event) =>
                    setLeadStatusDrafts((current) => ({
                      ...current,
                      [leadModal.id]: event.target.value,
                    }))
                  }
                  disabled={updatingLeadId === leadModal.id}
                >
                  {leadStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="crm-modal__actions">
              <button
                className="crm-button crm-button--ghost"
                type="button"
                onClick={handleCloseLeadModal}
                disabled={updatingLeadId === leadModal.id}
              >
                Cancel
              </button>
              <button
                className="crm-button crm-button--primary"
                type="button"
                disabled={
                  updatingLeadId === leadModal.id ||
                  (leadStatusDrafts[leadModal.id] || leadModal.status) === leadModal.status
                }
                onClick={async () => {
                  const nextStatus = leadStatusDrafts[leadModal.id] || leadModal.status
                  await handleLeadStatusUpdate(leadModal.id, nextStatus)
                  setLeadModal((current) =>
                    current ? { ...current, status: nextStatus } : current,
                  )
                  if (nextStatus !== leadModal.status) {
                    setLeadModal(null)
                  }
                }}
              >
                {updatingLeadId === leadModal.id ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
