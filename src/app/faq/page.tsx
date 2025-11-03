'use client'

import { HelpCircle, Shield, FileText, Calendar } from 'lucide-react'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20" style={{
        backgroundImage: 'url(/weekendinthecity1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-lovelo font-black mb-4">FREQUENTLY ASKED QUESTIONS</h1>
            <p className="text-xl text-gray-100">
              Everything you need to know about Weekend in the City
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* General Questions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <HelpCircle className="h-6 w-6 mr-3 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">General Questions</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What is Weekend in the City?</h3>
                    <p className="text-gray-600">
                      Weekend in the City is a Munich-based community that organizes curated social events bringing together locals and internationals. We offer book club meetings, social gatherings, and exclusive experiences.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I join an event?</h3>
                    <p className="text-gray-600">
                      Simply browse our upcoming events page, select an event you&apos;re interested in, and complete the checkout process. You&apos;ll receive a confirmation email with all the details.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Are events in English?</h3>
                    <p className="text-gray-600">
                      Yes, all our events are conducted in English to create an inclusive environment for our international community members.
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking & Cancellation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 mr-3 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Booking & Cancellation Policy</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I cancel my booking?</h3>
                    <p className="text-gray-600">
                      All ticket purchases are final. Due to the nature of our events, we do not offer refunds or cancellations once a booking has been confirmed. We recommend checking your schedule before purchasing tickets.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What if I can&apos;t attend an event?</h3>
                    <p className="text-gray-600">
                      If you cannot attend an event, you may transfer your ticket to someone else. Please contact us at least 48 hours before the event with the new attendee&apos;s details. We cannot guarantee last-minute transfers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What happens if an event is cancelled?</h3>
                    <p className="text-gray-600">
                      In the unlikely event that we need to cancel an event, you will receive a full refund. We will notify you via email as soon as possible if any changes occur.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment & Pricing */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 mr-3 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Payment & Pricing</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What payment methods do you accept?</h3>
                    <p className="text-gray-600">
                      We accept all major credit and debit cards through our secure payment processor. All transactions are handled securely and in accordance with EU payment regulations.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Are prices inclusive of VAT?</h3>
                    <p className="text-gray-600">
                      Yes, all prices displayed are inclusive of applicable VAT (Umsatzsteuer) in Germany (currently 19% or reduced rate where applicable).
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy & Data */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 mr-3 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Privacy & Data Protection</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">How do you handle my personal data?</h3>
                    <p className="text-gray-600">
                      We take your privacy seriously. Any personal information collected during booking is used solely for event organization and will not be shared with third parties. We comply with GDPR (General Data Protection Regulation) and German data protection laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I request my data to be deleted?</h3>
                    <p className="text-gray-600">
                      Yes, you have the right to request deletion of your personal data at any time. Please email us at weekendinthecity.muc@gmail.com with your request. Note that we may retain certain information as required by law for accounting and legal purposes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms & Legal */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 mr-3 text-red-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Terms & Legal</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What are the terms and conditions?</h3>
                    <p className="text-gray-600 mb-3">
                      By purchasing a ticket, you agree to the following terms:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>All sales are final. No refunds or exchanges are permitted except as required by law</li>
                      <li>You must be at least 18 years old to attend events</li>
                      <li>Weekend in the City reserves the right to refuse entry or remove attendees who behave inappropriately</li>
                      <li>Event details are subject to change, and we will notify ticket holders of any significant changes</li>
                      <li>Attendees participate at their own risk and release Weekend in the City from liability for any injuries or damages</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What are my legal rights?</h3>
                    <p className="text-gray-600 mb-3">
                      As a consumer in Germany and the UK, you have certain rights under consumer protection laws:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                      <li>Right to receive clear information about events before purchase</li>
                      <li>Right to receive a proper invoice or receipt</li>
                      <li>Right to protection against misleading advertising</li>
                      <li>Right to complain about inadequate service</li>
                    </ul>
                    <p className="text-gray-600 mt-3">
                      These statutory rights are not affected by our no-refund policy for general cancellations.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Where are you legally registered?</h3>
                    <p className="text-gray-600">
                      Weekend in the City operates in Munich, Germany. German and EU laws apply to all transactions and events.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-r from-rose-50 to-lavender-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Still have questions?</h2>
                <p className="text-gray-700 text-center mb-6">
                  We&apos;re here to help! Reach out to us and we&apos;ll get back to you as soon as possible.
                </p>
                <div className="text-center">
                  <a 
                    href="mailto:weekendinthecity.muc@gmail.com"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-400 to-rose-500 text-white font-medium rounded-lg hover:from-rose-500 hover:to-rose-600 transition-all"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

