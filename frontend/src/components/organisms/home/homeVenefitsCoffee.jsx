import { GiCoffeeBeans, GiCoffeeCup, GiCoffeePot, GiCoffeeMug } from "react-icons/gi";
import { SiCoffeescript, SiBuymeacoffee } from "react-icons/si";
import { VenefitionsList } from "../../molecules/home/homeVenefyList";
import { ContTitles } from "../../molecules/home/venefitsTitles";

function VenefitsCoffee() {
  const verifyOne = [
    {
      icon: <GiCoffeeBeans className="text-2xl sm:text-3xl lg:text-4xl hover:transform rotate-2" />,
      title: 'Más Energía',
      paragraph: 'La cafeína te mantiene despierto, enfocado y activo todo el día.'
    },
    {
      icon: <SiCoffeescript className="text-2xl sm:text-3xl lg:text-4xl" />,
      title: 'Mejor Enfoque',
      paragraph: 'Ayuda a mejorar la concentración, la memoria y la claridad mental.'
    },
    {
      icon: <GiCoffeeCup className="text-2xl sm:text-3xl lg:text-4xl" />,
      title: 'Antioxidantes Naturales',
      paragraph: 'Protege las células y retrasa el envejecimiento gracias a sus antioxidantes.'
    },
  ]

  const verifyTwo = [
    {
      icon: <GiCoffeePot className="text-2xl sm:text-3xl lg:text-4xl" />,
      title: 'Buen Ánimo',
      paragraph: 'El café libera hormonas que mejoran el humor y reducen el estrés.'
    },
    {
      icon: <GiCoffeeMug className="text-2xl sm:text-3xl lg:text-4xl" />,
      title: 'Metabolismo Activo',
      paragraph: 'Acelera la quema de calorías y potencia el rendimiento físico.'
    },
    {
      icon: <SiBuymeacoffee className="text-2xl sm:text-3xl lg:text-4xl" />,
      title: 'Momentos Únicos',
      paragraph: 'El café crea experiencias: conversaciones, reuniones y buenos recuerdos.'
    },
  ]

  return (
    <section className="flex flex-col items-center justify-center gap-15 py-10 mt-10 px-3 md:px-20">
      
      {/* Título - Aparece desde arriba */}
      <div
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <ContTitles/>
      </div>

      <div className="flex flex-col min-[600px]:flex-row gap-10 p-10 items-center justify-center">
        
        {/* Lista izquierda - Aparece desde la izquierda */}
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <VenefitionsList items={verifyOne} />
        </div>

        {/* Imagen central - Aparece con zoom */}
        <div 
          className="flex items-center justify-center"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="400"
        >
          <img
            src="/VENEFITIONS.png"
            alt="Vaso de cafe"
            className="
              w-52 sm:w-64 md:w-80 lg:w-96 xl:w-[400px] 
              min-[700px]:mt-[-3em]
              transition-transform duration-500 
              hover:scale-110
            "
          />
        </div>

        {/* Lista derecha - Aparece desde la derecha */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <VenefitionsList 
            items={verifyTwo} 
            iconPosition="right"
          />
        </div>
      </div>
    </section>
  )
}

export { VenefitsCoffee }