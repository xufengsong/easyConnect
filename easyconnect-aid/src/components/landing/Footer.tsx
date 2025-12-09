import { useState } from "react";
import { Heart, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer id="families" className="bg-foreground text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-primary-foreground/10 mb-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">Free Sample</span>
            </div>

            <h2 className="font-serif text-accessible-xl md:text-accessible-2xl font-semibold mb-4">
              Get a Sample Newsletter
            </h2>
            <p className="text-lg opacity-80 mb-8">
              See what a personalized weekly digest looks like. We'll send you an example 
              curated just for you.
            </p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-primary-foreground/10">
                <CheckCircle2 className="w-6 h-6 text-golden" />
                <p className="text-lg">Thank you! Check your inbox soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-14 px-6 text-lg rounded-pill bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-golden"
                />
                <Button 
                  type="submit"
                  className="h-14 px-8 rounded-pill bg-peach hover:bg-peach-dark text-primary-foreground font-semibold shadow-glow-peach transition-all hover:scale-105"
                >
                  Send Me One
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-peach to-golden flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="font-serif text-2xl font-semibold">
              EasyConnect
            </span>
          </a>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="#vision" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Vision
            </a>
            <a href="#process" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Our Process
            </a>
            <a href="#community" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Community
            </a>
            <a href="#families" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              For Families
            </a>
          </div>

          {/* Copyright */}
          <p className="text-primary-foreground/50 text-sm">
            © 2025 EasyConnect. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;