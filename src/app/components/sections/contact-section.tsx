// components/sections/contact-section.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message too short'),
})

type ContactForm = z.infer<typeof contactSchema>

export function ContactSection() {
  const { register, handleSubmit, formState } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    try {
      // POST to your API route (implement server later)
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      alert('Message sent')
    } catch (err) {
      console.error(err)
      alert('Failed to send')
    }
  }

  return (
    <section id="contact" className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <Input {...register('name')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <Input {...register('email')} />
        </div>
        <div>
          <label className="block text-sm font-medium">Message</label>
          <Textarea {...register('message')} rows={6} />
        </div>
        <div>
          <Button type="submit" disabled={formState.isSubmitting}>
            Send Message
          </Button>
        </div>
      </form>
    </section>
  )
}
