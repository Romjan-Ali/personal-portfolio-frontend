'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, LoaderCircle } from 'lucide-react'

const initialMessageData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [messageData, setMessageData] = useState(initialMessageData)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          to_name: 'Romjan Ali',
          from_name: messageData.name,
          from_email: messageData.email,
          subject: messageData.subject,
          message: messageData.message,
        },
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )

      toast.success('Email sent successfully')
      setMessageData(initialMessageData)
    } catch (err) {
      console.error(err)
      toast.error('An error occurred. Failed to send email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="font-medium text-sm">
            Full Name *
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Romjan Ali"
            className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
            value={messageData.name}
            onChange={(e) =>
              setMessageData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="font-medium text-sm">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="romjan@example.com"
            className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
            value={messageData.email}
            onChange={(e) =>
              setMessageData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="font-medium text-sm">
          Subject *
        </label>
        <Input
          id="subject"
          type="text"
          placeholder="Project Collaboration"
          className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
          value={messageData.subject}
          onChange={(e) =>
            setMessageData((prev) => ({
              ...prev,
              subject: e.target.value,
            }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="font-medium text-sm">
          Message *
        </label>
        <Textarea
          id="message"
          placeholder="Tell me about your project or just say hello..."
          rows={6}
          className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500 resize-none"
          value={messageData.message}
          onChange={(e) =>
            setMessageData((prev) => ({
              ...prev,
              message: e.target.value,
            }))
          }
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
      >
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
