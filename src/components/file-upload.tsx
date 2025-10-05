// components/file-upload.tsx
'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface FileUploadProps {
  onFileUpload: (url: string) => void
  currentImage?: string
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export function FileUpload({
  onFileUpload,
  currentImage,
  accept = 'image/*',
  maxSize = 5, // 5MB default
  className = '',
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(currentImage || '')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    // Check file type
    if (accept !== '*/*' && !file.type.match(accept.replace('*', '.'))) {
      setError(`Please select a valid file type. Accepted: ${accept}`)
      return false
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSize) {
      setError(`File size must be less than ${maxSize}MB`)
      return false
    }

    setError('')
    return true
  }

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!validateFile(file)) {
      return
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Simulate upload process
    setIsUploading(true)
    try {
      // In a real app, you would upload to your backend or cloud storage
      // For demo purposes, we'll simulate an upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Replace this with your actual upload logic
      const uploadedUrl = await uploadToServer(file)

      onFileUpload(uploadedUrl)
      setPreviewUrl(uploadedUrl)
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Failed to upload file. Please try again.')
      setPreviewUrl('')
    } finally {
      setIsUploading(false)
    }
  }

  // Mock upload function - replace with your actual upload logic
  const uploadToServer = async (file: File): Promise<string> => {
    // Example: Upload to your backend API
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      return data.url
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Fallback to a placeholder service for demo
      // In production, you might use Cloudinary, AWS S3, etc.
      return `https://picsum.photos/800/400?random=${Date.now()}`
    }
  }

  const handleRemove = () => {
    setPreviewUrl('')
    onFileUpload('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // For drag and drop:
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      const syntheticEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>

      handleFileSelect(syntheticEvent)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {previewUrl ? (
        <div className="space-y-2">
          <div className="relative group">
            <Image
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border-2 border-slate-200 dark:border-slate-700"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="bg-red-600 hover:bg-red-700"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Click the image to change
          </p>
        </div>
      ) : (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
            ${
              error
                ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20'
                : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
            }
            cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50
          `}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <div className="space-y-2">
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              {isUploading
                ? 'Uploading...'
                : 'Click to upload or drag and drop'}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {accept.includes('image') ? 'PNG, JPG, GIF' : 'Any file'} up to{' '}
              {maxSize}MB
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={isUploading}
      />

      {!previewUrl && (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full border-slate-300 dark:border-slate-600"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </>
          )}
        </Button>
      )}
    </div>
  )
}
