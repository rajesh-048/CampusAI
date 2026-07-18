"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-24 bg-background/50 relative border-t border-white/5">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Have questions about bringing CampusAI to your institution? We are here to help.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-white/10">
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Email Us</div>
                <div className="font-semibold text-foreground mt-0.5">support@campusai.edu</div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-white/10">
              <div className="p-3.5 rounded-xl bg-secondary/10 text-secondary border border-secondary/20">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Call Us</div>
                <div className="font-semibold text-foreground mt-0.5">+91 9876543000</div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4 border border-white/10">
              <div className="p-3.5 rounded-xl bg-accent/10 text-accent border border-accent/20">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase font-semibold">Campus Location</div>
                <div className="font-semibold text-foreground mt-0.5">Campus Road, Hyderabad, Telangana 500001</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@campus.edu" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="General Inquiry / Support" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Tell us how we can assist you..."
                    className="flex w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass-card"
                  />
                </div>

                <Button type="submit" className="w-full gradient-primary text-white h-11 text-base font-semibold">
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" /> Message Sent Successfully!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
