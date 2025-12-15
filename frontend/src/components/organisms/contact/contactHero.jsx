import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"
import { BannerBgCurve } from "../../molecules/bannerBgCurve"

function ContactHero() {
  return (
    <section className="relative h-[75vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      
      {/* Fondo con zoom */}
      <div 
        className="absolute inset-0 z-0"
        data-aos="zoom-in"
        data-aos-duration="1500"
      >
        <img 
          src="/IMG-BOOKING.jpeg" 
          alt="Fondo Contacto" 
          className="w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 max-w-4xl text-center gap-4 mt-4 pb-20 md:pb-32">
        
        {/* Subtítulo - Aparece primero */}
        <span 
          className="text-[#FFBB00] pt-15 text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-2 animate-pulse drop-shadow-md"
          data-aos="fade-down"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          Estamos para ti
        </span>

        {/* Título principal - Aparece con zoom */}
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <Title 
            level="h1" 
            text="Contáctanos" 
            variant="secondary"
            className="font-joti text-5xl md:text-7xl lg:text-8xl drop-shadow-[0_4px_15px_rgba(0,0,0,1)] scale-110"
          />
        </div>
        
        {/* Párrafo - Aparece desde abajo */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          <Paragraph 
            text="¿Tienes alguna pregunta o sugerencia? Estamos aquí para escucharte y hacer de tu experiencia algo inolvidable." 
            variant="primary"
            size="medium"
            align="center"
            className="max-w-2xl font-light text-gray-200 leading-loose drop-shadow-md"
          />
        </div>

        {/* Línea decorativa - Aparece con fade */}
        <div 
          className="w-16 h-1 bg-[#FFBB00] rounded-full mt-4 shadow-[0_0_10px_#FFBB00]"
          data-aos="fade"
          data-aos-duration="800"
          data-aos-delay="800"
        ></div>

      </div>

      {/* Curva decorativa inferior */}
      <div className="absolute bottom-0 w-full z-20 leading-0">
        <BannerBgCurve 
            design={4} 
            height="h-16 md:h-24" 
        />
      </div>

    </section>
  )
}

export { ContactHero }