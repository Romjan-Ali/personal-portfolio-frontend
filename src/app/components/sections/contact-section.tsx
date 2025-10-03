// app/components/sections/contact-section.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Facebook,
} from 'lucide-react'
import Link from 'next/link'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 
        text-slate-900 dark:text-white 
        bg-gradient-to-br from-slate-50 to-slate-100 
        dark:from-slate-900 dark:to-slate-800
        transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Let&apos;s start a conversation
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                I&apos;m always interested in new opportunities, whether
                it&apos;s a full-time position, freelance work, or just chatting
                about technology and development.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-700 transition-colors duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    Email
                  </div>
                  <div className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    000romjanali@gmail.com
                  </div>
                </div>
              </div>

              <Link
                href="tel:+8801402857913"
                className="flex items-center group"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-700 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    Phone
                  </div>
                  <div className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    +880 14 0285-7913
                  </div>
                </div>
              </Link>

              <Link href="https://www.google.com/maps/place/Dhaka/@23.7810672,90.254874,11z/data=!3m1!4b1!4m6!3m5!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!8m2!3d23.804093!4d90.4152376!16zL20vMGZuYjQ?entry=ttu&g_ep=EgoyMDI1MDkzMC4wIKXMDSoASAFQAw%3D%3D" className="flex items-center group">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-700 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    Location
                  </div>
                  <div className="font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    Dhaka, Bangladesh
                  </div>
                </div>
              </Link>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: 'https://github.com/Romjan-Ali', label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/romjan-ali-a429bb274', label: 'LinkedIn' },
                  { icon: Facebook, href: 'https://www.facebook.com/romjan001', label: 'Facebook' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 rounded-lg flex items-center justify-center hover:text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 border border-slate-300 dark:border-slate-700">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-medium text-sm">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
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
                    placeholder="john@example.com"
                    className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
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
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
