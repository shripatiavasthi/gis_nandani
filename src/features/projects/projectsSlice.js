import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { request } from '../../lib/api'

const authorizedJsonRequest = (path, token, options = {}) =>
  request(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  })

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const payload = await request('/api/projects')
  return payload.data || []
})

export const fetchProjectBySlug = createAsyncThunk('projects/fetchProjectBySlug', async (slug) => {
  const payload = await request(`/api/projects/${slug}`)
  return payload.data
})

export const createProject = createAsyncThunk(
  'projects/createProject',
  async ({ token, projectPayload }) => {
    const payload = await authorizedJsonRequest('/api/projects', token, {
      method: 'POST',
      body: JSON.stringify(projectPayload),
    })
    return payload.data
  },
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ token, slug, projectPayload }) => {
    const payload = await authorizedJsonRequest(`/api/projects/${slug}`, token, {
      method: 'PUT',
      body: JSON.stringify(projectPayload),
    })
    return payload.data
  },
)

export const deleteProject = createAsyncThunk('projects/deleteProject', async ({ token, slug }) => {
  await authorizedJsonRequest(`/api/projects/${slug}`, token, {
    method: 'DELETE',
  })
  return slug
})

export const addProjectGalleryImages = createAsyncThunk(
  'projects/addProjectGalleryImages',
  async ({ token, slug, gallery }) => {
    const payload = await authorizedJsonRequest(`/api/projects/${slug}/gallery`, token, {
      method: 'POST',
      body: JSON.stringify({ gallery }),
    })
    return payload.data
  },
)

export const deleteProjectGalleryImage = createAsyncThunk(
  'projects/deleteProjectGalleryImage',
  async ({ token, slug, key }) => {
    const payload = await authorizedJsonRequest(
      `/api/projects/${slug}/gallery?key=${encodeURIComponent(key)}`,
      token,
      {
        method: 'DELETE',
      },
    )
    return payload.data
  },
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    selectedProject: null,
    status: 'idle',
    detailStatus: 'idle',
    mutationStatus: 'idle',
    error: '',
  },
  reducers: {
    clearSelectedProject: (state) => {
      state.selectedProject = null
    },
    setSelectedFallbackProject: (state, action) => {
      state.selectedProject = action.payload
    },
    clearProjectsError: (state) => {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch projects'
      })
      .addCase(fetchProjectBySlug.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = ''
      })
      .addCase(fetchProjectBySlug.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selectedProject = action.payload
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.error.message || 'Failed to fetch project'
      })
      .addMatcher(
        (action) =>
          [
            createProject.pending.type,
            updateProject.pending.type,
            deleteProject.pending.type,
            addProjectGalleryImages.pending.type,
            deleteProjectGalleryImage.pending.type,
          ].includes(action.type),
        (state) => {
          state.mutationStatus = 'loading'
          state.error = ''
        },
      )
      .addMatcher(
        (action) =>
          [
            createProject.fulfilled.type,
            updateProject.fulfilled.type,
            deleteProject.fulfilled.type,
            addProjectGalleryImages.fulfilled.type,
            deleteProjectGalleryImage.fulfilled.type,
          ].includes(action.type),
        (state, action) => {
          state.mutationStatus = 'succeeded'
          if (action.type === updateProject.fulfilled.type) {
            state.selectedProject = action.payload
          }
          if (action.type === addProjectGalleryImages.fulfilled.type) {
            state.selectedProject = action.payload
          }
          if (action.type === deleteProjectGalleryImage.fulfilled.type) {
            state.selectedProject = action.payload
          }
          if (action.type === deleteProject.fulfilled.type && state.selectedProject?.slug === action.payload) {
            state.selectedProject = null
          }
        },
      )
      .addMatcher(
        (action) =>
          [
            createProject.rejected.type,
            updateProject.rejected.type,
            deleteProject.rejected.type,
            addProjectGalleryImages.rejected.type,
            deleteProjectGalleryImage.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.mutationStatus = 'failed'
          state.error = action.error.message || 'Project mutation failed'
        },
      )
  },
})

export const { clearSelectedProject, setSelectedFallbackProject, clearProjectsError } =
  projectsSlice.actions
export default projectsSlice.reducer
