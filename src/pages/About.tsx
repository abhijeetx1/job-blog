import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Globe, Code2, Zap, Heart, Lightbulb } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: "Abhijeet",
      role: "Founder & CEO",
      experience: "2+ years in tech industry",
      expertise: "AI, Tech Career, Strategic Leadership"
    }
    // {
    //   name: "Sarah Chen",
    //   role: "Chief Technology Officer",
    //   experience: "12+ years in software development",
    //   expertise: "Full-Stack Development, Cloud Architecture"
    // },
    // {
    //   name: "Michael Rodriguez",
    //   role: "Head of Content",
    //   experience: "10+ years in tech journalism",
    //   expertise: "Technical Writing, Industry Analysis"
    // },
    // {
    //   name: "Emily Watson",
    //   role: "Community Manager",
    //   experience: "8+ years in community building",
    //   expertise: "Developer Relations, Content Strategy"
    // }
  ];

  const achievements = [
    { icon: Users, number: "5K+", label: "Monthly Readers" },
    { icon: Globe, number: "75+", label: "Cities Reached" },
    { icon: Award, number: "5+", label: "Industry Recognition" },
    { icon: Code2, number: "500+", label: "Tutorial Published" }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We constantly explore cutting-edge technologies and share the latest innovations with our community."
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building a supportive community where developers can learn, grow, and succeed together."
    },
    {
      icon: Zap,
      title: "Excellence",
      description: "Delivering high-quality content and resources that truly make a difference in developers' careers."
    },
    {
      icon: Target,
      title: "Impact",
      description: "Creating meaningful content that helps professionals advance their careers and build better products."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            About <span className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tech Tribune
              </span> 
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
           Empowering Developers. Inspiring Innovation.
Since 2023, Tech Tribune has been on a mission to empower developers, students, and tech enthusiasts with real, relevant, and reliable content. We’re not just a blog — we’re your tech companion in this fast-moving digital world.

Whether you’re a beginner or a working professional, we simplify complex concepts, explore the latest tech trends, and guide you through your career journey.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Technology Leadership</Badge>
            <Badge variant="secondary">Developer Education</Badge>
            <Badge variant="secondary">Industry Innovation</Badge>
            <Badge variant="secondary">Community Building</Badge>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I’m Abhijeet, the founder of Tech Tribune.

                  Back in 2018, I started this platform with one simple goal — to bridge the gap between beginner-friendly content and deep technical knowledge.
                </p>
                <p>
                 There were a lot of resources out there, but few that spoke to both freshers and working professionals. So I built Tech Tribune as a space where anyone — from a student to a senior engineer — can learn, grow, and stay updated.
                </p>
                <p>
                  Today, TechTribune stands as one of the most trusted resources in the technology industry, 
                  known for our in-depth tutorials, career guidance, and thought leadership on emerging 
                  technologies like AI, blockchain, cloud computing, and cybersecurity.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="p-0">
                    <achievement.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-primary">{achievement.number}</div>
                    <div className="text-sm text-muted-foreground">{achievement.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission & Vision */}
        <section className="mb-16 bg-muted/50 rounded-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="h-6 w-6 mr-2 text-primary" />
                Our Mission
              </h3>
              <p className="text-muted-foreground">
                To empower technology professionals at every stage of their career by providing 
                accessible, practical, and cutting-edge educational content. We believe that 
                knowledge should be freely shared, and we're committed to breaking down barriers 
                that prevent talented individuals from reaching their full potential in tech.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Globe className="h-6 w-6 mr-2 text-primary" />
                Our Vision
              </h3>
              <p className="text-muted-foreground">
                To become the world's most comprehensive and trusted platform for technology 
                education and career development. We envision a future where every developer, 
                regardless of their background or location, has access to the resources they 
                need to build innovative solutions and advance their careers.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-xs text-muted-foreground mb-2">{member.experience}</p>
                  <p className="text-xs text-muted-foreground">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <Code2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Technical Tutorials</h3>
                <p className="text-muted-foreground text-sm">
                  Step-by-step guides covering everything from basic programming concepts to 
                  advanced system architecture, written by industry experts and updated regularly.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Career Guidance</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive career advice, interview preparation, salary negotiation tips, 
                  and industry insights to help you advance your tech career.
                </p>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardContent className="p-0">
                <Lightbulb className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Industry Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  In-depth analysis of technology trends, market insights, and emerging 
                  technologies that shape the future of the tech industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're just starting your tech journey or you're a seasoned professional, 
            we'd love to have you as part of our growing community of learners and innovators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              <a href="/contact" className="text-sm">Get in Touch</a>
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <a href="/auth" className="text-sm">Join Our Newsletter</a>
            </Badge>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
