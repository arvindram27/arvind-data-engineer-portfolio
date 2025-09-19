"use client";

import { useState, useEffect } from "react";
import Hyperspeed from "@/components/Hyperspeed";
import PillNav from "@/components/PillNav";
import TextType from "@/components/TextType";
import SplitText from "@/components/SplitText";
import GradientText from "@/components/GradientText";
import SpotlightCard from "@/components/SpotlightCard";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, Download, Database, BarChart, Cloud, Code, Cpu } from "lucide-react";

const projectsData = [
  {
    title: "Real-time Data Pipeline",
    description: "Built a scalable real-time data processing pipeline using Apache Kafka and Python to handle streaming data from multiple sources.",
    technologies: ["Apache Kafka", "Python", "Docker", "PostgreSQL"],
    githubUrl: "https://github.com/arvind-ramachandran/realtime-pipeline",
    liveUrl: "https://pipeline-demo.vercel.app",
    status: "Completed"
  },
  {
    title: "Sales Analytics Dashboard",
    description: "Created an interactive analytics dashboard using Python and Streamlit to visualize sales data and generate insights for business teams.",
    technologies: ["Python", "Streamlit", "Pandas", "Plotly", "SQL"],
    githubUrl: "https://github.com/arvind-ramachandran/sales-dashboard",
    liveUrl: "https://sales-analytics-arvind.streamlit.app",
    status: "Completed"
  },
  {
    title: "ETL Automation Framework",
    description: "Developed an automated ETL framework to process and transform data from various sources using Apache Airflow and Python.",
    technologies: ["Apache Airflow", "Python", "SQL", "AWS S3", "Docker"],
    githubUrl: "https://github.com/arvind-ramachandran/etl-framework",
    status: "In Progress"
  }
];

const experienceData = [
  {
    title: "Junior Data Engineer",
    company: "Tech Solutions Inc.",
    period: "2024 - Present",
    description: "Working on data pipeline development and analytics solutions for enterprise clients.",
    achievements: [
      "Developed 5+ data pipelines processing 100GB+ daily data",
      "Improved data quality by implementing validation frameworks",
      "Collaborated with cross-functional teams on analytics projects"
    ]
  },
  {
    title: "Data Analytics Intern",
    company: "StartupCorp",
    period: "2023 - 2024",
    description: "Supported data analysis and reporting initiatives for business intelligence.",
    achievements: [
      "Created automated reports reducing manual work by 60%",
      "Built dashboards for tracking key business metrics",
      "Learned industry best practices in data engineering"
    ]
  }
];

const skillsData = {
  "Programming Languages": ["Python", "SQL", "Java", "R", "Bash"],
  "Big Data & Analytics": ["Apache Kafka", "Apache Airflow", "Spark", "Pandas", "NumPy"],
  "Cloud Platforms": ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Snowflake"],
  "Tools & Frameworks": ["Git", "Streamlit", "Jupyter", "Terraform", "dbt"]
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeHref, setActiveHref] = useState('#home');

  useEffect(() => {
    setIsVisible(true);
    
    // Handle scroll to update active navigation
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      let current = '#home';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = `#${section}`;
          }
        }
      }
      setActiveHref(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items for PillNav
  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  const hyperspeedOptions = {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 9,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 50,
    lightPairsPerRoadWay: 50,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.05, 400 * 0.15],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.2, 0.2],
    carFloorSeparation: [0.05, 1],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      leftCars: [0xff102a, 0xeb383e, 0xff102a],
      rightCars: [0xdadafa, 0xbebae3, 0x8f97e4],
      sticks: 0xdadafa
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="pill-nav-container">
          <PillNav
            logo="/logo.svg"
            logoAlt="Arvind Ramachandran R"
            items={navItems}
            activeHref={activeHref}
            baseColor="#8b5cf6"
            pillColor="#1e1b4b"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#c4b5fd"
            className="pill-nav-custom"
            ease="power2.easeOut"
            initialLoadAnimation={true}
          />
        </div>
      </div>

      {/* Hero Section with Hyperspeed Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 sm:opacity-30">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>
        
        <div className={`relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-16 md:pt-0 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Database className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4">
              <GradientText 
                colors={['#00d4ff', '#0ea5e9', '#06b6d4', '#0891b2', '#00d4ff']}
                animationSpeed={6}
                className="text-3xl sm:text-5xl md:text-7xl font-bold"
              >
                Arvind Ramachandran R
              </GradientText>
            </h1>
            <div className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-4 sm:mb-6">
              <TextType
                text={[
                  "Entry-Level Data Engineer",
                  "Pipeline Builder", 
                  "Data Analytics Enthusiast",
                  "Cloud Computing Explorer",
                  "Problem Solver"
                ]}
                as="h2"
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={2000}
                className="text-type--subtitle"
                cursorCharacter="_"
                cursorBlinkDuration={0.8}
              />
            </div>
            <div className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
              <SplitText
                text="Passionate about transforming raw data into actionable insights through efficient data pipelines, analytics solutions, and modern data engineering practices."
                tag="p"
                splitType="words"
                delay={60}
                duration={0.8}
                ease="power3.out"
                from={{ opacity: 0, y: 20, rotationX: 45 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                textAlign="center"
                className="split-text-description"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4 sm:px-0">
            <Button size="default" className="bg-blue-600 hover:bg-blue-700 sm:size-lg w-full sm:w-auto">
              <a href="#projects" className="flex items-center justify-center gap-2 w-full">
                View My Work
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button size="default" className="bg-blue-600 hover:bg-blue-700 sm:size-lg w-full sm:w-auto">
              <a href="#contact" className="flex items-center justify-center gap-2 w-full">
                Get In Touch
                <Mail className="w-4 h-4" />
              </a>
            </Button>
            <Button size="default" className="bg-blue-600 hover:bg-blue-700 sm:size-lg w-full sm:w-auto">
              <a href="/resume.pdf" target="_blank" className="flex items-center justify-center gap-2 w-full">
                Download Resume
                <Download className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a href="https://linkedin.com/in/arvind-ramachandran" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://github.com/arvind-ramachandran" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="mailto:arvind.ramachandran@email.com" className="text-gray-400 hover:text-blue-400 transition-colors">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              As an entry-level data engineer, I&apos;m passionate about building robust data solutions that drive business value.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Profile Card */}
            <div className="flex justify-center">
              <ProfileCard
                avatarUrl="/images/profile.jpg"
                miniAvatarUrl="/images/profile.jpg"
                handle="arvind-ramachandran"
                status="Available for Opportunities"
                contactText="Contact Me"
                showUserInfo={true}
                enableTilt={true}
                behindGradient={undefined}
                innerGradient={undefined}
                onContactClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="max-w-xs"
              />
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold mb-4">
                <GradientText 
                  colors={['#34d399', '#10b981', '#059669', '#047857', '#34d399']}
                  animationSpeed={8}
                  className="animated-gradient-text--subtitle"
                >
                  My Journey
                </GradientText>
              </h3>
              <p className="text-gray-400 mb-6">
                I&apos;m a dedicated data engineering professional with a strong foundation in programming, database management,
                and data pipeline development. My passion lies in transforming complex data challenges into streamlined, 
                efficient solutions.
              </p>
              <p className="text-gray-400 mb-6">
                With hands-on experience in modern data stack technologies including Python, SQL, Apache Kafka, and cloud platforms, 
                I specialize in building scalable data infrastructure that enables organizations to make data-driven decisions.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100GB+</div>
                  <div className="text-gray-400">Data Processed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2+</div>
                  <div className="text-gray-400">Years Learning</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
                  <div className="text-gray-400">Technologies Mastered</div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-8 mt-8">
                <h3 className="text-2xl font-semibold mb-6">
                  <GradientText 
                    colors={['#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#60a5fa']}
                    animationSpeed={7}
                    className="animated-gradient-text--subtitle"
                  >
                    What I Bring
                  </GradientText>
                </h3>
                <ul className="space-y-4">
                  {[
                    "Strong foundation in data engineering principles",
                    "Experience with modern data stack technologies",
                    "Passion for learning and adapting to new tools",
                    "Collaborative mindset and problem-solving skills",
                    "Focus on building scalable and maintainable solutions"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText 
                colors={['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#fbbf24']}
                animationSpeed={5}
                className="animated-gradient-text--title"
              >
                Technical Skills
              </GradientText>
            </h2>
            <p className="text-xl text-gray-400">Technologies and tools I work with</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsData).map(([category, skills], index) => (
              <SpotlightCard key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm" spotlightColor="rgba(59, 130, 246, 0.15)">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    {category === "Programming Languages" && <Code className="w-5 h-5" />}
                    {category === "Big Data & Analytics" && <BarChart className="w-5 h-5" />}
                    {category === "Cloud Platforms" && <Cloud className="w-5 h-5" />}
                    {category === "Databases" && <Database className="w-5 h-5" />}
                    {category === "Tools & Frameworks" && <Cpu className="w-5 h-5" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-blue-600 text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <GradientText 
                colors={['#ec4899', '#db2777', '#be185d', '#9d174d', '#ec4899']}
                animationSpeed={6}
                className="animated-gradient-text--title"
              >
                Featured Projects
              </GradientText>
            </h2>
            <p className="text-xl text-gray-400">Some of my recent data engineering work</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <SpotlightCard key={index} className="bg-gray-700/70 border-gray-600 backdrop-blur-sm transition-all duration-300" spotlightColor="rgba(236, 72, 153, 0.2)">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-blue-400 border-blue-400">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" className="flex items-center gap-1">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" className="flex items-center gap-1">
                          <ExternalLink className="w-4 h-4" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Experience</h2>
            <p className="text-xl text-gray-400">My journey in data engineering</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {experienceData.map((exp, index) => (
              <div key={index} className="mb-12 last:mb-0">
                <SpotlightCard className="bg-gray-800/60 border-gray-700 backdrop-blur-sm" spotlightColor="rgba(52, 211, 153, 0.15)">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-white text-xl">{exp.title}</CardTitle>
                        <CardDescription className="text-blue-400 font-medium">{exp.company}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-gray-400 border-gray-600 mt-2 md:mt-0">
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-white font-medium">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-400">Let&apos;s connect and discuss data engineering opportunities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">arvind.ramachandran@email.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                  <span className="text-gray-300">Chennai, Tamil Nadu, India</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium text-white mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <a href="https://linkedin.com/in/arvind-ramachandran" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin className="w-8 h-8" />
                  </a>
                  <a href="https://github.com/arvind-ramachandran" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Github className="w-8 h-8" />
                  </a>
                  <a href="mailto:arvind.ramachandran@email.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Mail className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="text-white">Send me a message</CardTitle>
                  <CardDescription className="text-gray-300">
                    I&apos;d love to hear about opportunities or collaborations!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input placeholder="Your Name" className="bg-gray-800 border-gray-600 text-white" />
                      </div>
                      <div>
                        <Input type="email" placeholder="Your Email" className="bg-gray-800 border-gray-600 text-white" />
                      </div>
                    </div>
                    <Input placeholder="Subject" className="bg-gray-800 border-gray-600 text-white" />
                    <Textarea 
                      placeholder="Your Message" 
                      rows={5} 
                      className="bg-gray-800 border-gray-600 text-white" 
                    />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Arvind Ramachandran R. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
