// Centralized styles configuration for the application
export const styles = {
  // Container styles
  custom_container: "w-11/12 hidden sm:block",
  section: "w-11/12 mx-auto",

  // Typography
  heading:
    "text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]",
  productTitle: "text-[25px] font-[600] font-Roboto text-[#333]",

  // Product pricing
  productDiscountPrice: "font-bold text-[18px] text-[#333] font-Roboto",
  price: "font-[500] text-[16px] text-[#d55b45] pl-3 mt-[-4px] line-through",

  // Shop elements
  shop_name: "pt-3 text-[15px] text-blue-400 pb-3",
  active_indicator: "absolute bottom-[-27%] left-0 h-[3px] w-full bg-[crimson]",

  // Buttons
  button:
    "w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer",
  cart_button:
    "px-[20px] h-[38px] rounded-[20px] bg-[#f63b60] flex items-center justify-center cursor-pointer",
  cart_button_text: "text-[#fff] text-[16px] font-[600]",

  // Form elements
  input: "w-full border p-1 rounded-[5px]",

  // Status indicators
  activeStatus:
    "w-[10px] h-[10px] rounded-full absolute top-0 right-1 bg-[#40d132]",
  noramlFlex: "flex items-center",
};

export default styles;
