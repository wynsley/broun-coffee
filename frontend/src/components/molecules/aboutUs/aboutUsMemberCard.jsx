import { AboutUsMemberPhoto } from "../../atoms/aboutUs/AboutUsMemberPhoto"
import { Title } from "../../atoms/titles"
import { Paragraph } from "../../atoms/paragraph"

function AboutUsMemberCard({ member, position, isCenter, ...props }) {
  return (
    <div 
      className={`
        flex-col items-center transition-all duration-500
        ${position !== 0 ? 'hidden md:flex' : 'flex'} 
        ${isCenter ? 'scale-110 z-10 brightness-100' : 'md:scale-90 z-0 md:brightness-50'}
      `}
      {...props}
    >
      <AboutUsMemberPhoto src={member.image} alt={member.name} isActive={isCenter} />

      <div className={`mt-6 w-full text-center transition-all duration-500 ${isCenter ? 'opacity-100' : 'md:opacity-60'}`}>
        
        <Title 
          level="h3" 
          text={member.name} 
          variant="secondary" 
          align="center" 
          className="font-joti mb-1 drop-shadow-md text-2xl!" 
        />
        
        <Paragraph 
          text={member.role}
          align="center" 
          variant="primary" 
          className="uppercase tracking-widest font-bold text-sm"
        />
        
      </div>
    </div>
  )
}
export { AboutUsMemberCard }