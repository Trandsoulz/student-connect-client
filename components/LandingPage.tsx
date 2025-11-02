import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { MessageSquare, Users, CheckCircle, BarChart, Clock, Shield, Mail, Phone, MapPin, ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onNavigate?: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD] to-[#F5F7FA]">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#1E88E5] to-[#0097A7] flex items-center justify-center">
              <span className="text-white">SC</span>
            </div>
            <h1 className="text-[#1E88E5] text-[18px]">StudentConnect</h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD]"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5]"
            >
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E3F2FD] rounded-full border border-[#90CAF9]">
              <Sparkles className="h-4 w-4 text-[#1E88E5]" />
              <span className="text-[#1565C0] text-[14px]">Empowering Student Voices</span>
            </div>
            <h1 className="text-[rgb(13,54,119)] text-[48px] leading-tight">
              Welcome to StudentConnect
            </h1>
            <p className="text-[#1565C0] text-[18px] leading-relaxed">
              A modern platform for students to submit feedback and complaints, and for administrators to manage and resolve them efficiently. Enhance communication, transparency, and student satisfaction.
            </p>
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5] text-[16px] px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD] text-[16px] px-8"
              >
                Login
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-[#1E88E5] text-[32px]">500+</div>
                <div className="text-[#1565C0] text-[14px]">Active Students</div>
              </div>
              <div>
                <div className="text-[#1E88E5] text-[32px]">98%</div>
                <div className="text-[#1565C0] text-[14px]">Response Rate</div>
              </div>
              <div>
                <div className="text-[#1E88E5] text-[32px]">24h</div>
                <div className="text-[#1565C0] text-[14px]">Avg Response</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                alt="University students smiling and looking at their phone"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-[#1E88E5] to-[#0097A7] rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[#0D47A1] mb-4 text-[24px] font-bold">Key Features</h2>
          <p className="text-[#1565C0]">Everything you need for effective feedback management</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-[#1E88E5] to-[#42A5F5] flex items-center justify-center mb-4">
              <MessageSquare className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-[#0D47A1] mb-3">Easy Submission</h3>
            <p className="text-muted-foreground">
              Students can easily submit feedback and track their submissions in real-time.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-[#42A5F5] to-[#64B5F6] flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-[#0D47A1] mb-3">Admin Management</h3>
            <p className="text-muted-foreground">
              Administrators can efficiently manage, respond to, and resolve all feedback.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-[#64B5F6] to-[#0097A7] flex items-center justify-center mb-4">
              <CheckCircle className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-[#0D47A1] mb-3">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor feedback status from submission to resolution with complete transparency.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#0D47A1] mb-6">How StudentConnect Works</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#42A5F5] flex items-center justify-center text-white">
                    1
                  </div>
                  <div>
                    <h3 className="text-[#0D47A1] mb-2">Submit Your Feedback</h3>
                    <p className="text-muted-foreground">
                      Share your concerns, suggestions, or complaints through our intuitive submission form.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#42A5F5] to-[#64B5F6] flex items-center justify-center text-white">
                    2
                  </div>
                  <div>
                    <h3 className="text-[#0D47A1] mb-2">Admin Reviews</h3>
                    <p className="text-muted-foreground">
                      Our dedicated team reviews and categorizes your feedback for appropriate action.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-[#64B5F6] to-[#0097A7] flex items-center justify-center text-white">
                    3
                  </div>
                  <div>
                    <h3 className="text-[#0D47A1] mb-2">Track & Resolve</h3>
                    <p className="text-muted-foreground">
                      Monitor the progress of your feedback and receive updates until resolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758874573116-2bc02232eef1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBvbmxpbmV8ZW58MXx8fHwxNzYxOTE3MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Student learning online"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[#0D47A1] mb-4">Why Choose StudentConnect?</h2>
          <p className="text-[#1565C0]">Built with students and administrators in mind</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1E88E5] to-[#42A5F5] flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-[#0D47A1] mb-2">24/7 Access</h4>
            <p className="text-muted-foreground text-[14px]">
              Submit and track feedback anytime, anywhere
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#42A5F5] to-[#64B5F6] flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-[#0D47A1] mb-2">Secure & Private</h4>
            <p className="text-muted-foreground text-[14px]">
              Your data is protected with industry-standard security
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#64B5F6] to-[#90CAF9] flex items-center justify-center mx-auto mb-4">
              <BarChart className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-[#0D47A1] mb-2">Analytics Dashboard</h4>
            <p className="text-muted-foreground text-[14px]">
              Comprehensive insights for administrators
            </p>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#90CAF9] to-[#0097A7] flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h4 className="text-[#0D47A1] mb-2">Continuous Improvement</h4>
            <p className="text-muted-foreground text-[14px]">
              Help make your institution better
            </p>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="bg-gradient-to-br from-[#1E88E5] to-[#0097A7] py-20 bg-[rgba(0,0,0,0)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1724949286531-aad1be889342?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074l"
                  alt="Modern university campus"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="text-white order-1 md:order-2">
              <h2 className="text-white mb-6">Seamlessly Integrates With Your Institution</h2>
              <p className="text-[#E3F2FD] text-[18px] mb-8">
                StudentConnect is designed to work effortlessly with your existing university systems and workflows.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Easy Setup</h4>
                    <p className="text-[#E3F2FD] text-[14px]">Get up and running in minutes with our simple onboarding process</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Scalable Solution</h4>
                    <p className="text-[#E3F2FD] text-[14px]">Grows with your institution from hundreds to thousands of students</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Mobile Responsive</h4>
                    <p className="text-[#E3F2FD] text-[14px]">Access from any device - desktop, tablet, or smartphone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#E3F2FD] to-[#F5F7FA] rounded-3xl p-12 border border-[#90CAF9] text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#90CAF9] mb-6">
              <Zap className="h-4 w-4 text-[#1E88E5]" />
              <span className="text-[#1565C0] text-[14px]">Join Today</span>
            </div>
            <h2 className="text-[#0D47A1] mb-4">Ready to Transform Student Communication?</h2>
            <p className="text-[#1565C0] text-[18px] mb-8">
              Join hundreds of students and administrators using StudentConnect to create a better university experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/register')}
                className="bg-gradient-to-r from-[#1E88E5] to-[#42A5F5] hover:from-[#1565C0] hover:to-[#1E88E5] text-[16px] px-8"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-[#1E88E5] text-[#1E88E5] hover:bg-white text-[16px] px-8"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[#0D47A1] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#1E88E5] to-[#0097A7] flex items-center justify-center">
                  <span className="text-white">SC</span>
                </div>
                <h3 className="text-white text-[18px]">StudentConnect</h3>
              </div>
              <p className="text-[#90CAF9] text-[14px]">
                Empowering student voices and enhancing institutional communication.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#90CAF9] hover:text-white text-[14px] transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#90CAF9] text-[14px]">
                  <Mail className="h-4 w-4" />
                  info@uniport.edu.ng
                </li>
                <li className="flex items-center gap-2 text-[#90CAF9] text-[14px]">
                  <Phone className="h-4 w-4" />
                  +234 84 817 137
                </li>
                <li className="flex items-center gap-2 text-[#90CAF9] text-[14px]">
                  <MapPin className="h-4 w-4" />
                  East-West Road, Choba, Port Harcourt
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#1565C0] pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[#90CAF9] text-[14px]">
                © 2025 University of Port Harcourt. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-[#90CAF9] hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#90CAF9] hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#90CAF9] hover:text-white transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L7.773 13.98l-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.954z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
