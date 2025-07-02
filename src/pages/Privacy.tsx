
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, Database, Mail, Cookie } from 'lucide-react';

export default function Privacy() {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Personal Information: When you create an account, subscribe to our newsletter, or contact us, we may collect personal information such as your name, email address, and any other information you voluntarily provide.",
        "Usage Information: We automatically collect information about how you interact with our website, including your IP address, browser type, operating system, referring URLs, and pages visited.",
        "Cookies and Tracking: We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and personalize content."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our services, including creating and managing your account",
        "To send you newsletters, updates, and promotional content (with your consent)",
        "To respond to your inquiries and provide customer support",
        "To analyze usage patterns to improve our website and services",
        "To detect, prevent, and address technical issues and security vulnerabilities",
        "To comply with legal obligations and protect our rights and interests"
      ]
    },
    {
      icon: Shield,
      title: "Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "We may share information with trusted service providers who assist us in operating our website",
        "We may disclose information when required by law or to protect our rights and safety",
        "In the event of a merger or acquisition, user information may be transferred to the new entity"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "We implement appropriate security measures to protect your personal information",
        "All data transmission is encrypted using industry-standard SSL/TLS protocols",
        "We regularly update our security practices and conduct security assessments",
        "Access to personal information is restricted to authorized personnel only",
        "We cannot guarantee absolute security, but we strive to use best practices"
      ]
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking Technologies",
      content: [
        "Essential Cookies: Required for basic website functionality and security",
        "Analytics Cookies: Help us understand how visitors interact with our website",
        "Preference Cookies: Remember your settings and preferences",
        "Marketing Cookies: Used to deliver relevant advertisements and measure campaign effectiveness",
        "You can control cookie preferences through your browser settings"
      ]
    },
    {
      icon: Mail,
      title: "Email Communications",
      content: [
        "We will only send you emails if you have opted in to receive them",
        "You can unsubscribe from our mailing list at any time using the unsubscribe link",
        "We may still send you important service-related communications even if you opt out of marketing emails",
        "We use reputable email service providers that comply with anti-spam regulations"
      ]
    }
  ];

  const rights = [
    "Access: Request a copy of the personal information we hold about you",
    "Rectification: Request correction of inaccurate or incomplete information",
    "Erasure: Request deletion of your personal information under certain circumstances",
    "Portability: Request transfer of your data to another service provider",
    "Objection: Object to processing of your personal information for marketing purposes",
    "Restriction: Request limitation of processing under certain circumstances"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information when you use TechBlog.
          </p>
          <Badge variant="outline" className="px-4 py-2">
            Last Updated: {lastUpdated}
          </Badge>
        </section>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Our Commitment to Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              At TechBlog, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy describes how we collect, use, 
              disclose, and safeguard your information when you visit our website, subscribe to 
              our newsletter, or interact with our services. By using our website, you consent 
              to the practices described in this policy.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground leading-relaxed flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
            <p className="text-muted-foreground">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {rights.map((right, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-muted-foreground">{right}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              To exercise any of these rights, please contact us using the information provided in the Contact section below.
            </p>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our website may contain links to third-party websites or integrate with third-party services. 
              We use the following trusted third-party services:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Analytics & Performance</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Google Analytics for website analytics</li>
                  <li>• Performance monitoring tools</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Communication & Support</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Email service providers</li>
                  <li>• Customer support platforms</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              These third-party services have their own privacy policies, and we encourage you to review them.
            </p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our services are not intended for children under the age of 13. We do not knowingly 
              collect personal information from children under 13. If you are a parent or guardian 
              and believe that your child has provided us with personal information, please contact 
              us so we can delete such information.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. When we make material changes, 
              we will notify you by updating the "Last Updated" date and may provide additional notice 
              through our website or email. Your continued use of our services after any changes 
              indicates your acceptance of the updated policy.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, 
              please contact us:
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>Email:</strong> privacy@techblog.com</p>
              <p><strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              We will respond to your inquiry within 30 days of receiving your request.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
