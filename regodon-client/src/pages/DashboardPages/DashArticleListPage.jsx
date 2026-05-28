import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  createArticle,
  fetchArticles,
  toggleArticleStatus,
  updateArticle,
} from '../../../ArticleService.js';

const mapArticleToRow = (article, index) => {
  const paragraphs = Array.isArray(article.content) ? article.content : [];
  const preview = paragraphs.length ? paragraphs[0] : '';

  return {
    id: article._id || index + 1,
    slug: article.name,
    title: article.title,
    content: paragraphs.join('\n'),
    paragraphs: paragraphs.length,
    preview,
    status: article.isActive === false ? 'inactive' : 'active',
    coverImage: article.coverImage || '',
    coverAlt: article.coverAlt || '',
  };
};

const DashArticleListPage = () => {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({
    slug: '',
    title: '',
    coverImage: '',
    coverAlt: '',
    content: '',
    status: 'active',
  });
  const [formError, setFormError] = useState('');
  const [loadError, setLoadError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError('');

    fetchArticles({ includeInactive: true })
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }
        const nextRows = Array.isArray(data?.articles)
          ? data.articles.map(mapArticleToRow)
          : [];
        setRows(nextRows);
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        setLoadError(err?.response?.data?.message || 'Unable to load articles.');
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredRows = rows.filter((row) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      row.slug.toLowerCase().includes(query) ||
      row.title.toLowerCase().includes(query) ||
      row.preview.toLowerCase().includes(query);
    const matchesStatus =
      !statusFilter || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = useMemo(() => [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 180 },
    { field: 'title', headerName: 'Title', flex: 1.2, minWidth: 220 },
    { field: 'paragraphs', headerName: 'Paragraphs', width: 140 },
    {
      field: 'preview',
      headerName: 'Preview',
      flex: 1.6,
      minWidth: 260,
      renderCell: ({ row }) => (
        <span title={row.preview}>
          {row.preview ? `${row.preview.slice(0, 60)}...` : 'No preview'}
        </span>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: ({ row }) => (
        <Chip
          size="small"
          label={row.status === 'active' ? 'Active' : 'Inactive'}
          color={row.status === 'active' ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={() => openModal(row)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color={row.status === 'active' ? 'warning' : 'success'}
            onClick={() => handleToggleStatus(row.id)}
          >
            {row.status === 'active' ? 'Disable' : 'Activate'}
          </Button>
        </Stack>
      ),
    },
  ], [rows]);

  const openModal = (row) => {
    setFormError('');
    if (row) {
      setForm({
        slug: row.slug,
        title: row.title,
        coverImage: row.coverImage || '',
        coverAlt: row.coverAlt || '',
        content: row.content || '',
        status: row.status,
      });
      setModal({ open: true, id: row.id });
      return;
    }

    setForm({
      slug: '',
      title: '',
      coverImage: '',
      coverAlt: '',
      content: '',
      status: 'active',
    });
    setModal({ open: true, id: null });
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setFormError('');
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formError) {
      setFormError('');
    }
  };

  const handleSave = async () => {
    const slug = form.slug.trim();
    const title = form.title.trim();
    const coverImage = form.coverImage.trim();
    const coverAlt = form.coverAlt.trim();

    if (!slug || !title) {
      setFormError('Slug and title are required.');
      return;
    }

    const content = form.content.trim();
    const paragraphs = content
      ? content.split('\n').map((line) => line.trim()).filter(Boolean)
      : [];
    setIsSaving(true);
    setFormError('');

    try {
      if (modal.id) {
        const payload = {
          name: slug,
          title,
          coverImage,
          coverAlt,
          content: paragraphs,
          isActive: form.status === 'active',
        };
        const { data } = await updateArticle(modal.id, payload);
        const nextRow = mapArticleToRow(data.article, 0);
        setRows((prev) => prev.map((row) => (row.id === modal.id ? nextRow : row)));
      } else {
        const payload = {
          name: slug,
          title,
          coverImage,
          coverAlt,
          content: paragraphs,
          isActive: form.status === 'active',
        };
        const { data } = await createArticle(payload);
        const nextRow = mapArticleToRow(data.article, 0);
        setRows((prev) => [nextRow, ...prev]);
      }

      closeModal();
    } catch (err) {
      const message = err?.response?.data?.message || 'Unable to save article.';
      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (rowId) => {
    try {
      const { data } = await toggleArticleStatus(rowId);
      const nextRow = mapArticleToRow(data.article, 0);
      setRows((prev) => prev.map((row) => (row.id === rowId ? nextRow : row)));
    } catch (err) {
      setLoadError(err?.response?.data?.message || 'Unable to update status.');
    }
  };

  return (
    <Box sx={{ width: '100%', minWidth: 0 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography variant="h4">Article List</Typography>
      </Box>

      <Paper sx={{ p: { xs: 2, sm: 3 }, minWidth: 0, overflow: 'hidden' }}>
        {loadError ? (
          <Typography sx={{ mb: 2 }} color="error">
            {loadError}
          </Typography>
        ) : null}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 2 }}
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            size="small"
            placeholder="Search Articles"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            sx={{ flex: 1, minWidth: 220 }}
          />
          <TextField
            select
            size="small"
            label="Status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" onClick={() => openModal()} disabled={isLoading}>
            Add Article
          </Button>
        </Stack>

        <Box sx={{ height: { xs: 468, sm: 520 }, width: '100%', minWidth: 0 }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            disableRowSelectionOnClick
            loading={isLoading}
            pageSizeOptions={[5, 10]}
            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
            sx={{
              minWidth: 6,
              '& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader': {
                outline: 'none',
              },
            }}
          />
        </Box>
      </Paper>

      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="sm">
        <DialogTitle>{modal.id ? 'Edit Article' : 'Add Article'}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              name="slug"
              label="Slug"
              value={form.slug}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="coverImage"
              label="Cover Image URL"
              value={form.coverImage}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="coverAlt"
              label="Cover Image Alt Text"
              value={form.coverAlt}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="content"
              label="Content"
              value={form.content}
              onChange={handleFormChange}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              select
              name="status"
              label="Status"
              value={form.status}
              onChange={handleFormChange}
              fullWidth
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            {formError ? <Typography color="error">{formError}</Typography> : null}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={isSaving}>
            {modal.id ? 'Save Changes' : 'Add Article'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;