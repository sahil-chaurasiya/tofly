import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { adminAPI } from '../../utils/api'

export default function AdminBlogs() {
  const qc = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => adminAPI.getBlogs(),
    select: res => res.data.blogs
  })

  const deleteBlog = useMutation({
    mutationFn: (id) => adminAPI.deleteBlog(id),
    onSuccess: () => { qc.invalidateQueries(['admin-blogs']); toast.success('Blog deleted') }
  })

  const togglePublish = useMutation({
    mutationFn: ({ id, isPublished }) => adminAPI.updateBlog(id, { isPublished }),
    onSuccess: () => { qc.invalidateQueries(['admin-blogs']); toast.success('Status updated') }
  })

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Blog Posts</h1>
          <p className="text-white/40 text-sm">{data?.length || 0} articles</p>
        </div>
        <Link to="/admin/blogs/new" className="btn-primary text-sm">
          <Plus size={16} /> <span className="hidden sm:inline">New Post</span><span className="sm:hidden">New</span>
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: '580px' }}>
            <thead>
              <tr className="border-b border-white/5">
                {['Title', 'Category', 'Status', 'Views', 'Date', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-white/35 uppercase tracking-wider px-4 sm:px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/3">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 sm:px-5 py-4"><div className="skeleton h-4 rounded" /></td>
                    ))}
                  </tr>
                ))
              ) : data?.length ? (
                data.map(blog => (
                  <tr key={blog._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="px-4 sm:px-5 py-4 max-w-[200px]">
                      <div className="text-sm font-medium text-white line-clamp-1">{blog.title}</div>
                      <div className="text-xs text-white/30 mt-0.5 truncate">/{blog.slug}</div>
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <span className="section-tag text-xs whitespace-nowrap">{blog.category}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
                        blog.isPublished
                          ? 'bg-green-500/15 text-green-400 border-green-500/25'
                          : 'bg-white/5 text-white/35 border-white/10'
                      }`}>
                        {blog.isPublished ? <Eye size={10} /> : <EyeOff size={10} />}
                        {blog.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-4 text-sm text-white/40">{blog.views || 0}</td>
                    <td className="px-4 sm:px-5 py-4 text-xs text-white/30 whitespace-nowrap">
                      {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                    </td>
                    <td className="px-4 sm:px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => togglePublish.mutate({ id: blog._id, isPublished: !blog.isPublished })}
                          className={`p-1.5 rounded-lg transition-colors ${blog.isPublished ? 'text-yellow-400/60 hover:text-yellow-400 hover:bg-yellow-400/10' : 'text-green-400/60 hover:text-green-400 hover:bg-green-400/10'}`}
                          title={blog.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {blog.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <Link to={`/admin/blogs/edit/${blog._id}`}
                          className="p-1.5 rounded-lg text-white/25 hover:text-brand-400 hover:bg-brand-500/10 transition-colors">
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => { if(confirm('Delete this blog post?')) deleteBlog.mutate(blog._id) }}
                          className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center text-white/25 text-sm">
                    No blog posts yet.{' '}
                    <Link to="/admin/blogs/new" className="text-brand-400 hover:text-brand-300">Create your first post →</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}