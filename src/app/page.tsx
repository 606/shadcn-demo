import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Zap, Github } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: 'Markdown Based',
      description: 'Write documentation in Markdown and get a beautiful site automatically.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Statically generated pages with Next.js for optimal performance.',
    },
    {
      icon: Github,
      title: 'Deploy Anywhere',
      description: 'Deploy to GitHub Pages, Vercel, or any static hosting provider.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <div className="inline-block px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
              <span className="text-sm font-medium text-blue-900">✨ Modern Documentation Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
              Avro Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A fast, modern documentation site built with Next.js, Markdown, and React. Deploy to GitHub Pages with automatic CI/CD.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/docs" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                📖 Read Documentation
              </Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                ⭐ View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose Avro?</h2>
          <p className="text-gray-600 text-lg">Everything you need for professional documentation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-2">
                    <Icon size={32} className="text-blue-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-blue-200 bg-white">
            <CardHeader>
              <CardTitle className="text-3xl">Get Started in Minutes</CardTitle>
              <CardDescription className="text-lg">
                Everything you need to set up your documentation site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <h3 className="font-semibold">Create Markdown Files</h3>
                  <p className="text-gray-600 text-sm">
                    Write your documentation in simple Markdown format
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <h3 className="font-semibold">Automatic Build</h3>
                  <p className="text-gray-600 text-sm">
                    GitHub Actions automatically builds your site
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <h3 className="font-semibold">Deploy Live</h3>
                  <p className="text-gray-600 text-sm">
                    Your docs are live on GitHub Pages instantly
                  </p>
                </div>
              </div>

              <Link href="/docs" className="block">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  View Full Documentation →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-white">
        <div className="max-w-6xl mx-auto text-center text-gray-600">
          <p>Built with Next.js, React, and Markdown</p>
          <p className="text-sm mt-2">Deploy your documentation to GitHub Pages with one click</p>
        </div>
      </footer>
    </div>
  );
}
