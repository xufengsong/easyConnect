import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "말벗 소개", href: "#vision" },
    { label: "이용 방법", href: "#process" },
    { label: "사랑방", href: "#community" },
    { label: "가족을 위한 안내", href: "#families" },
  ];

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false); // 모바일 메뉴에서 클릭 시 닫히도록
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF8F6]/90 backdrop-blur-md border-b border-stone-200/50">
      {/* bg-cream 대신 구체적인 색상코드(#FDF8F6) 사용 혹은 tailwind config에 맞게 유지 */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
             <img 
    src="/logo.png"  
    alt="말벗 로고" 
    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" 
  />
  
            <span className="font-serif text-2xl font-semibold text-stone-900">
              말벗
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg text-stone-500 hover:text-stone-900 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              onClick={handleLoginClick}
              className="rounded-full px-8 py-6 text-lg font-medium bg-peach hover:bg-peach-dark text-stone-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              말벗 시작하기
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-stone-100 animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xl text-stone-600 hover:text-stone-900 transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button 
                onClick={handleLoginClick}
                className="mt-4 rounded-full px-8 py-6 text-lg font-medium bg-peach hover:bg-peach-dark text-stone-900 shadow-md w-full"
              >
                말벗 시작하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;