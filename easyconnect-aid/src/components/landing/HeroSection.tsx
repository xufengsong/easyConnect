import { ArrowRight, MessageCircleHeart } from "lucide-react"; // 아이콘 변경 추천
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <section className="relative pt-40 pb-10 md:pt-48 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-200 bg-white mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
            <span className="text-xs uppercase tracking-widest font-medium text-stone-500">
              SINCE 2025
            </span>
          </div>
{/* Headline 수정 */}
<h1 className="font-serif font-medium text-stone-900 leading-tight tracking-tight mb-8">
  {/* 첫 번째 줄: text-2xl(모바일) ~ text-5xl(PC)로 조정 */}
  <span className="block text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 sm:mb-4 word-keep-all">
    다정한 말동무가 되어드리고,
  </span>
  
  {/* 두 번째 줄 동일하게 적용 */}
  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-stone-500 italic font-serif word-keep-all">
    소중한 인연을 이어드립니다.
  </span>
</h1>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={handleClick}
              className="rounded-full px-10 h-14 text-base bg-stone-900 hover:bg-stone-800 text-white shadow-none transition-all duration-300 w-full sm:w-auto"
            >
              말벗 시작하기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full px-10 h-14 text-base border-stone-300 text-stone-600 hover:bg-stone-100 hover:text-stone-900 w-full sm:w-auto"
            >
              대화 예시 들어보기
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-20 pt-10 border-t border-stone-200/60">
            <p className="text-sm text-stone-400 font-medium tracking-wide uppercase">
              벌써 5,000분 이상의 어르신이 새로운 벗을 만나셨습니다
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;