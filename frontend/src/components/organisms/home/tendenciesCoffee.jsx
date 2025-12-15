import { useEffect, useRef } from "react";
import { TendenciesCard } from "../../molecules/home/homeTendeciesCard";

function TendenciesCoffee() {
  const trackRef = useRef(null);
  const speed = 0.4;

  const tendenciesCoffee = [
    {
      img: "/TEN-COFFEE1.png",
      title: "Café Espresso",
      description:
        "Intenso y concentrado, es la base perfecta para muchas bebidas clásicas.",
    },
    {
      img: "/TEN-COFFEE2.png",
      title: "Café Latte",
      description:
        "Suave y cremoso, mezcla armoniosa de espresso con abundante leche.",
    },
    {
      img: "/TEN-COFFEE3.png",
      title: "Café Americano",
      description:
        "Ligero y equilibrado, ideal para quienes prefieren un sabor menos fuerte.",
    },
    {
      img: "/TEN-COFFEE4.png",
      title: "Café Mocha",
      description:
        "Dulce y chocolatoso, combina espresso con cacao y un toque de leche.",
    },
  ];

  useEffect(() => {
    const track = trackRef.current;
    let x = 0;
    let animationId;

    const animate = () => {
      x -= speed;

      // cuando ya se fue todo el primer bloque
      if (Math.abs(x) >= track.scrollWidth / 2) {
        x = 0;
      }

      track.style.transform = `translateX(${x}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div
        ref={trackRef}
        className="flex w-max"
        style={{ willChange: "transform" }}
      >
        {/* Original */}
        <div className="flex gap-8 px-4">
          <TendenciesCard tendenciesCoffee={tendenciesCoffee} />
        </div>

        {/* Duplicado */}
        <div className="flex gap-8 px-4">
          <TendenciesCard tendenciesCoffee={tendenciesCoffee} />
        </div>
      </div>
    </div>
  );
}

export { TendenciesCoffee };
