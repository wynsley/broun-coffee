import { Paragraph } from "../../atoms/paragraph"
import { Title } from "../../atoms/titles"
import { BannerBgCurve } from "../../molecules/bannerBgCurve"
import { Description } from "../../molecules/booking/refulationsDescription"

function Regulations() {
  const title = 'Reglas o Avisos'
  const description = `Para asegurar una experiencia agradable para todos nuestros clientes,
    te recomendamos llegar con unos minutos de anticipación.
    Nuestro equipo siempre está dispuesto a ayudarte con consultas,
    cambios de reserva o requerimientos especiales.`

  return (
    <section
      className="relative w-full min-h-[70vh] md:min-h-[90vh] overflow-hidden flex flex-col justify-end"
    >
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.85]"
        style={{ backgroundImage: "url('/BG-REGULATIONS.jpg')" }}
        data-aos="zoom-in"
        data-aos-duration="1500"
      />
      <BannerBgCurve position="top" design={3} />
      <div className="relative z-20 w-full flex flex-col items-center gap-10 md:gap-6 px-6 py-20">
        
        {/* Título - Aparece con fade */}
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <Title
            text={title}
            level="h2"
            weight="bold"
            align="center"
            variant="secondary"
            className="mt-5 mb-5 md-mb-15"
          />
        </div>

        {/* Grid de tarjetas - Aparecen en cascada */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full max-w-6xl">
          
          <div 
            className="rounded shadow-xl backdrop-blur-xl p-6 bg-white border flex justify-center items-center h-0 md:h-[150px] text-center text-black"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <Paragraph
              text="Reservas válidas solo dentro del horario de atención"
              size="medium"
            />
          </div>

          <div 
            className="rounded shadow-xl backdrop-blur-xl p-6 bg-white flex justify-center items-center h-0 md:h-[150px] text-center text-black"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="450"
          >
            <Paragraph text="Se guardan las mesas hasta 10 minutos" />
          </div>

          <div 
            className="rounded shadow-xl backdrop-blur-xl p-6 bg-white flex justify-center items-center h-0 md:h-[150px] text-center text-black"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            <Paragraph text="Para grupos grandes más de 8 personas, contáctanos directamente" />
          </div>
        </div>

        {/* Descripción - Aparece al final */}
        <div
          data-aos="fade"
          data-aos-duration="1000"
          data-aos-delay="750"
        >
          <Description  
            description={description}
          />
        </div>
        
      </div>
    </section>
  )
}

export { Regulations }