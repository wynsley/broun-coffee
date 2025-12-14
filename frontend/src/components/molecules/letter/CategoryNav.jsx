import { CategoryButton } from "../../atoms/letter/CategoryButton";
import { FaCoffee, FaCookie, FaBirthdayCake } from "react-icons/fa";

function CategoryNav({ categories, onSelectCategory }) {
  if (!categories || categories.length === 0) return null;

  // Función auxiliar para asignar icono según el nombre (opcional)
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('cafe') || lowerName.includes('café')) return <FaCoffee />;
    if (lowerName.includes('cookie') || lowerName.includes('galleta')) return <FaCookie />;
    return <FaBirthdayCake />; // Default
  };

  return (
    <nav className="flex flex-wrap justify-center gap-4 my-8 sticky top-20 z-10 bg-[#FFF0F5] py-4 shadow-sm">
      {categories.map((cat) => (
        <CategoryButton
          key={cat.idCategory}
          nombre={cat.name}
          icono={getIcon(cat.name)}
          // Usamos onClick para el scroll en lugar de navegar
          onClick={() => onSelectCategory(cat.idCategory)} 
          isActive={false} // Puedes manejar estado activo si quieres luego
        />
      ))}
    </nav>
  );
}

export { CategoryNav };