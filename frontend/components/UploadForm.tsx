'use client'

import { useState } from 'react'

export default function UploadForm() {
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/upload-profile', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (res.ok) {
      setPreviewUrl(data.url)
    } else {
      alert('Upload failed: ' + data.error)
    }

    setUploading(false)
  }

  return (
    <div className="p-4 space-y-4">
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>Uploading...</p>}
      {previewUrl && (
        <div>
          <p className="text-green-600 text-sm">Uploaded Successfully</p>
          <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {previewUrl}
          </a>
          <img src={previewUrl} alt="IPFS Image" className="mt-2 w-48 rounded" />
        </div>
      )}
    </div>
  )
}
