import { useEffect, useRef, useState } from "react";
import { TendenciesCard } from "../../molecules/home/homeTendeciesCard";

function TendenciesCoffee() {
  const trackRef = useRef(null);
  const speed = 0.4;

  const [items, setItems] = useState([
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
  ]);

  useEffect(() => {
    const track = trackRef.current;
    let x = 0;
    let animationId;

    const animate = () => {
      x -= speed;
      track.style.transform = `translateX(${x}px)`;

      const firstCard = track.children[0];
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 32; // gap-8

      // cuando la primera card ya salió
      if (Math.abs(x) >= cardWidth) {
        x += cardWidth;

        setItems((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div
        ref={trackRef}
        className="flex flex-nowrap gap-8 px-4"
        style={{ willChange: "transform" }}
      >
        <TendenciesCard tendenciesCoffee={items} />
      </div>
    </div>
  );
}

export { TendenciesCoffee };
