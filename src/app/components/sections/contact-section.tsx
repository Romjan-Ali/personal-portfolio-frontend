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
} from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you. Let&apos;s create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Let&apos;s start a conversation
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8">
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
                  <div className="text-slate-400 text-sm">Email</div>
                  <div className="text-white font-medium group-hover:text-purple-400 transition-colors duration-300">
                    john.doe@example.com
                  </div>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-700 transition-colors duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Phone</div>
                  <div className="text-white font-medium group-hover:text-purple-400 transition-colors duration-300">
                    +1 (555) 123-4567
                  </div>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-700 transition-colors duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-slate-400 text-sm">Location</div>
                  <div className="text-white font-medium group-hover:text-purple-400 transition-colors duration-300">
                    New York, NY
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: '#', label: 'GitHub' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-purple-600 transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-white font-medium text-sm"
                  >
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-white font-medium text-sm"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-white font-medium text-sm"
                >
                  Subject *
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Project Collaboration"
                  className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-white font-medium text-sm"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project or just say hello..."
                  rows={6}
                  className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500 resize-none"
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
