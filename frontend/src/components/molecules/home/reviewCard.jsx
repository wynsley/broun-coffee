import { Title } from "../../atoms/titles"

function ReviewCard({ title, img, className = "", ...props }) {
  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-lg group ${className}`}
      {...props}
    >
      <img 
        src={img} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <Title 
          text={title}
          level="h4"
          align="center"
          variant="primary"
        />
      </div>
    </div>
  )
}

export { ReviewCard }