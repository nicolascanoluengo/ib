import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Target, 
  Heart, 
  Linkedin, 
  Twitter, 
  Mail,
  GraduationCap,
  BookOpen,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Co-Founder & Chief AI Officer",
      background: "Former IB Examiner, PhD in Machine Learning",
      experience: "15 years in IB education, 8 years in AI research",
      image: "Professional headshot of Dr. Sarah Chen, Asian woman in business attire",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@ibassessmentai.com"
      }
    },
    {
      name: "Marcus Johnson",
      role: "Co-Founder & CEO",
      background: "Former IB Coordinator, MBA from Oxford",
      experience: "12 years in international education, 6 years in EdTech",
      image: "Professional headshot of Marcus Johnson, confident business leader",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "marcus@ibassessmentai.com"
      }
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Head of Curriculum",
      background: "IB Workshop Leader, PhD in Education",
      experience: "20 years in IB curriculum development",
      image: "Professional headshot of Dr. Elena Rodriguez, education expert",
      social: {
        linkedin: "#",
        email: "elena@ibassessmentai.com"
      }
    },
    {
      name: "Alex Kim",
      role: "Lead Developer",
      background: "Full-stack Engineer, Computer Science from MIT",
      experience: "10 years in AI/ML development",
      image: "Professional headshot of Alex Kim, tech developer",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "alex@ibassessmentai.com"
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We strive for the highest accuracy in our AI analysis, matching real examiner standards."
    },
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every feature is designed with student success and learning outcomes in mind."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in both technology and educational expertise."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making high-quality IB feedback accessible to students worldwide, regardless of location."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "Started by former IB educators frustrated with the lack of quality feedback tools."
    },
    {
      year: "2023",
      title: "AI Model Development",
      description: "Trained our first AI model on 10,000+ real IB essays with examiner feedback."
    },
    {
      year: "2023",
      title: "Beta Launch",
      description: "Launched beta version with 50 schools across 15 countries."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Reached 45,000+ essays analyzed across 170+ countries with 98% accuracy."
    }
  ];

  const stats = [
    { number: "45,000+", label: "Essays Analyzed" },
    { number: "170+", label: "Countries Served" },
    { number: "98%", label: "Accuracy Rate" },
    { number: "4.9/5", label: "Student Rating" }
  ];

  return (
    <>
      <Helmet>
        <title>About Us - IB Assessment AI | Our Story & Team</title>
        <meta name="description" content="Learn about IB Assessment AI's mission to provide examiner-level feedback to IB students worldwide. Meet our team of former IB educators and AI experts." />
      </Helmet>

      <Navigation />

      <div className="pt-24 pb-20">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Empowering <span className="gradient-text">IB Students</span> Worldwide
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                We're on a mission to democratize access to high-quality IB feedback, 
                making examiner-level analysis available to every student, everywhere.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why We Exist
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  As former IB educators, we witnessed firsthand the frustration students face: 
                  spending months on essays without knowing if they're on the right track.
                </p>
                <p className="text-lg text-gray-400 mb-8">
                  Traditional feedback is expensive, slow, and often inconsistent. We built 
                  IB Assessment AI to change that - providing instant, accurate, examiner-level 
                  feedback that helps students succeed.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <BookOpen className="h-6 w-6 text-blue-400 mr-3" />
                    <span className="text-gray-300">Built by IB educators for IB students</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="h-6 w-6 text-blue-400 mr-3" />
                    <span className="text-gray-300">Trained on real examiner feedback</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-6 w-6 text-blue-400 mr-3" />
                    <span className="text-gray-300">Accessible to students worldwide</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img  
                  className="rounded-lg shadow-2xl w-full" 
                  alt="IB students collaborating and studying together"
                 src="https://images.unsplash.com/photo-1586105073577-9eb4b70bdfe3" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card feature-card-hover h-full text-center">
                    <CardHeader>
                      <value.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Former IB educators and AI experts working together to transform IB assessment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card feature-card-hover h-full">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <img  
                          className="w-full h-full object-cover" 
                          alt={`${member.name} profile photo`}
                         src="https://images.unsplash.com/photo-1644424235476-295f24d503d9" />
                      </div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription className="text-blue-400 font-medium">
                        {member.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-400 mb-2">{member.background}</p>
                      <p className="text-xs text-gray-500 mb-4">{member.experience}</p>
                      <div className="flex justify-center space-x-3">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                          <Mail className="h-4 w-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                From idea to global impact in just two years
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <Card className="glass-card">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-blue-500/20 text-blue-300">
                            {milestone.year}
                          </Badge>
                          <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                          <p className="text-gray-400">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-slate-900 relative z-10"></div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Impact
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Numbers that reflect our commitment to student success
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Want to Learn More?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We'd love to hear from you. Whether you're a student, teacher, or school administrator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-4">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/20 hover:bg-white/10">
                  <Users className="mr-2 h-5 w-5" />
                  Join Our Community
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default AboutPage;