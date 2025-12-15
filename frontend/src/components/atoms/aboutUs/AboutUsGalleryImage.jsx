function AboutUsGalleryImage({ src, alt, className = '', ...props }) {
  return (
    <div 
      className={`relative overflow-hidden rounded-2xl shadow-2xl border border-[#FFBB00]/20 group ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
      
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
  )
}

export { AboutUsGalleryImage }