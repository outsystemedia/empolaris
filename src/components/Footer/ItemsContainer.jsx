import Item from "./Item";
import { PRODUCTS, RESOURCES, COMPANY, SOCIAL } from "./Menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={COMPANY} title="Polaris" />
      <Item Links={RESOURCES} title="Suporte" />
      <Item Links={SOCIAL} title="Redes Sociais" />
    </div>
  );
};

export default ItemsContainer;