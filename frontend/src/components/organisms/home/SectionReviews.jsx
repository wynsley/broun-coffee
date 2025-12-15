import { ReviewCard } from "../../molecules/home/reviewCard"
import { ContTitles } from "../../molecules/home/reviewTitles"

function Reviews() {  
  const listReviews = [
    {
      id: 1,
      title: "Café con arte latte cremoso y delicioso",
      img: "/REVIEW-1.jpg" 
    },
    {
      id: 2,
      title: "Postres caseros, como esta rebanada de pastel fresca",
      img: "REVIEW-5.jpg"   
    },
    {
      id: 3,
      title: "Galletas de chispas de chocolate recién horneadas",
      img: "REVIEW-3.jpg" 
    },
    {
      id: 4,
      title: "La combinación perfecta de café y postre en tu mesa",
      img: "REVIEW-4.jpg" 
    },
    {
      id: 5,
      title: "Ambiente acogedor e ideal para tus momentos de relax",
      img: "REVIEW-2.jpg"
    },
    {
      id: 6,
      title: "Proceso de preparación del mejor café de la ciudad",
      img: "REVIEW-6.jpg" 
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-8 md:gap-12 mx-auto w-[92%] mb-20 py-4">
      <ContTitles/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-5 gap-4 md:gap-6 w-full lg:h-[650px]">
        <ReviewCard 
          title={listReviews[0].title}
          img={listReviews[0].img}
          className="lg:col-start-1 lg:row-span-3 h-52 md:h-64 lg:h-full"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
        />

        <ReviewCard 
          title={listReviews[1].title}
          img={listReviews[1].img}
          className="lg:col-start-2 lg:row-span-2 h-52 md:h-64 lg:h-full"
          data-aos="zoom-in"
          data-aos-duration="1000"
          data-aos-delay="200"
        />

        <ReviewCard 
          title={listReviews[2].title}
          img={listReviews[2].img}
          className="lg:col-start-3 lg:row-span-3 h-52 md:h-64 lg:h-full"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="100"
        />

        <ReviewCard 
          title={listReviews[3].title}
          img={listReviews[3].img}
          className="lg:col-start-1 lg:row-span-2 h-52 md:h-64 lg:h-full"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        />

        <ReviewCard 
          title={listReviews[4].title}
          img={listReviews[4].img}
          className="lg:col-start-2 lg:row-start-3 lg:row-span-3 h-52 md:h-64 lg:h-full"
          data-aos="flip-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        />

        <ReviewCard 
          title={listReviews[5].title}
          img={listReviews[5].img}
          className="lg:col-start-3 lg:row-span-2 h-52 md:h-64 lg:h-full"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="300"
        />
      </div>
    </section>
  )
}

export { Reviews }