// 1. IMPORTANTE: Agregamos 'useCallback' a los imports
import { useState, useEffect, useCallback } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { Title } from "../../atoms/titles" 
import { AboutUsNavButton } from "../../atoms/aboutUs/aboutUsNavButton";
import { AboutUsMemberCard } from "../../molecules/aboutUs/AboutUsMemberCard";
import { AboutUsPaginationDot } from "../../atoms/aboutUs/aboutUsPaginationDot";

const teamMembers = [
  { name: "Juan Pérez", role: "Barista Principal", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "María Garcia", role: "Pastelera", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Carlos López", role: "Jefe de Barra", image: "https://randomuser.me/api/portraits/men/85.jpg" },
  { name: "Ana Torres", role: "Atención al Cliente", image: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Luis Diaz", role: "Tostador", image: "https://randomuser.me/api/portraits/men/22.jpg" },
]

function AboutUsTeamCarousel() {
  const [startIndex, setStartIndex] = useState(teamMembers.length - 1);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = useCallback((direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'next') {
        setStartIndex((prev) => (prev + 1) % teamMembers.length);
      } else {
        setStartIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
      }
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]); 

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideChange('next');
    }, 5000);

    return () => clearInterval(interval);
  }, [handleSlideChange]); 

  const getMemberAtPosition = (position) => {
    const index = (startIndex + position) % teamMembers.length;
    return teamMembers[index];
  };

  return (
    <section className="relative py-20 w-full mt-10">
      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col items-center">
        
        {/* Título - Aparece con fade-down */}
        <Title 
          level="h2" 
          text="Nuestro Equipo" 
          variant="primary" 
          className="font-joti mb-16 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] text-center"
          data-aos="fade-down"
          data-aos-duration="1000"
        />

        <div className="flex items-center justify-center w-full gap-2 md:gap-8">
          
          {/* Botón izquierdo - Aparece desde la izquierda */}
          <AboutUsNavButton 
            onClick={() => handleSlideChange('prev')}
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <FaChevronLeft />
          </AboutUsNavButton>

          {/* Cards del carrusel - Aparecen con zoom */}
          <div className={`grid grid-cols-1 md:grid-cols-3 items-center justify-items-center gap-4 md:gap-8 w-full max-w-5xl transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {[0, 1, 2].map((position) => {
              const member = getMemberAtPosition(position);
              const isCenterDesktop = position === 1;
              return (
                <AboutUsMemberCard 
                  key={position}
                  member={member}
                  position={position}
                  isCenter={isCenterDesktop}
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay={300 + (position * 150)}
                />
              )
            })}
          </div>

          {/* Botón derecho - Aparece desde la derecha */}
          <AboutUsNavButton 
            onClick={() => handleSlideChange('next')}
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <FaChevronRight />
          </AboutUsNavButton>
        </div>

        {/* Dots de paginación - Aparecen con fade */}
        <div 
          className="flex gap-3 mt-12"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
        >
          {teamMembers.map((_, i) => {
            const centerIndex = (startIndex + 1) % teamMembers.length;
            const isActive = i === centerIndex;
            return <AboutUsPaginationDot key={i} isActive={isActive} />
          })}
        </div>

      </div>
    </section>
  )
}
export { AboutUsTeamCarousel }