function BannerCoffee({
  src = "/CUP-COFFEE.png",
  alt = "Taza de café",
  position = "bottom-10 right-12",
  className = "",
  ...props
}) {
  return (
    <div
      className={`bg-white absolute z-30 rounded-full shadow-2xl border border-black shadow-gray-900 flex items-center justify-center
                  transition-transform duration-500 hover:scale-110

                  ${position} w-24 h-24
                  max-[360px]:right-4 
                  sm:bottom-10 sm:right-25 sm:w-28 sm:h-28
                  md:bottom-10 md:right-25 md:w-36 md:h-36
                  lg:bottom-18 lg:right-32 lg:w-44 lg:h-44
                  xl:bottom-18 xl:right-48 xl:w-52 xl:h-52

                  ${className}`}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-20 sm:w-20 md:w-28 lg:w-36 xl:w-50 object-contain 
                  transition-transform duration-500 hover:-rotate-20"
      />
    </div>
  );
}

export { BannerCoffee };