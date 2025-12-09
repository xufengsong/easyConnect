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
    // bg-foreground가 보통 어두운 색이므로, 텍스트는 밝은색(primary-foreground)을 유지했습니다.
    <footer id="families" className="bg-stone-900 text-stone-50">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">무료 체험</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 word-keep-all">
              나만을 위한 이야기,<br className="hidden md:block"/> 미리 받아보세요.
            </h2>
            
            {/* Description */}
            <p className="text-lg opacity-80 mb-8 word-keep-all">
              어르신의 취향에 딱 맞춘 주간 소식지가 어떤 모습인지 보여드릴게요. 
              이메일 주소를 남겨주시면 샘플을 무료로 보내드립니다.
            </p>

            {/* Form / Success Message */}
            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 p-6 rounded-2xl bg-white/10">
                <CheckCircle2 className="w-6 h-6 text-golden" />
                <p className="text-lg word-keep-all">
                  감사합니다! 곧 이메일로 따뜻한 이야기를 보내드릴게요.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="이메일 주소를 입력해주세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-14 px-6 text-lg rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-golden"
                />
                <Button 
                  type="submit"
                  className="h-14 px-8 rounded-full bg-peach hover:bg-peach-dark text-stone-900 font-semibold shadow-lg transition-all hover:scale-105 shrink-0"
                >
                  샘플 받아보기
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
<a href="/" className="flex items-center gap-2 group">
  {/* 기존 하트 아이콘 div를 삭제하고 img 태그로 교체 */}
  <img 
    src="/logo.png"  
    alt="말벗 로고" 
    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" 
  />
  
  <span className="font-serif text-2xl font-semibold text-white">
    말벗
  </span>
</a>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm md:text-base">
            <a href="#vision" className="text-white/70 hover:text-white transition-colors">
              말벗 소개
            </a>
            <a href="#process" className="text-white/70 hover:text-white transition-colors">
              이용 방법
            </a>
            <a href="#community" className="text-white/70 hover:text-white transition-colors">
              사랑방 (커뮤니티)
            </a>
            <a href="#families" className="text-white/70 hover:text-white transition-colors">
              가족을 위한 안내
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-sm">
            © 2025 말벗 (Malbeot). 마음을 담아 만듭니다.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;