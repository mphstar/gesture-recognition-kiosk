import Header from "./components/Header";
import TabItems from "./components/TabItems";
import Burger from "./assets/images/burger.png";
import Drink from "./assets/images/drink.png";
import Dessert from "./assets/images/dessert.png";
import Items from "./components/Items";
import Cart from "./components/Cart";
import { BsCartCheck } from "react-icons/bs";
import BackgroundModal from "./components/BackgroundModal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ListData from "./models";
import ItemContext from "./utils/ItemContext,js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

function App() {
  const [isShowCart, ShowCart] = useState(false);
  const [DataShow, SetDataShow] = useState(ListData.burger);
  const [tabSelected, SetTabSelected] = useState("Burger");
  const [DataCart, SetDataCart] = useState([]);

  const handleTab = (data, category) => {
    SetDataShow(data);
    SetTabSelected(category);
  };

  const HandleToast = (status) => {
    if (status == "success") {
      toast.success("🦄 Success add to cart", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      Swal.fire("Failed", "This item already add to cart", "error");
    }
  };

  const handleCart = (data) => {
    const datas = DataCart.filter((item) => item.id === data.id);
    if (datas.length == 0) {
      SetDataCart([
        ...DataCart,
        {
          data: data,
          qty: 1,
        },
      ]);
      HandleToast("success");
    } else {
      HandleToast("error");
    }
  };

  useEffect(() => {
    document.body.style.overflow = isShowCart ? "hidden" : "unset";
  }, [isShowCart]);

  return (
    <ItemContext.Provider value={[DataCart, SetDataCart]}>
      <ToastContainer />
      <div
        className={`bg-gray-500 min-h-screen flex items-center justify-center px-4 py-4`}
      >
        <div className="flex flex-col lg:flex-row bg-gray-100 rounded-lg h-full lg:h-[800px] max-w-[1280px] w-full overflow-x-hidden">
          <div className="flex flex-col px-4 w-full lg:w-[70%] h-full py-4">
            <div className="h-fit flex">
              <Header />
            </div>
            <div className="flex w-full flex-1 flex-col lg:flex-row overflow-hidden">
              <div
                id="content-tab"
                className="w-full h-full lg:w-[480px] px-4 py-4  mt-4 flex gap-2 justify-start lg:justify-center flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden"
              >
                <TabItems
                  onclick={() => handleTab(ListData.burger, "Burger")}
                  title={"Burger"}
                  image={Burger}
                  isSelected={tabSelected == "Burger" ? true : false}
                />
                <TabItems
                  onclick={() => handleTab(ListData.drink, "Drink")}
                  title={"Drink"}
                  image={Drink}
                  isSelected={tabSelected == "Drink" ? true : false}
                />
                <TabItems
                  onclick={() => handleTab(ListData.dessert, "Dessert")}
                  title={"Dessert"}
                  image={Dessert}
                  isSelected={tabSelected == "Dessert" ? true : false}
                />
              </div>
              <div className="flex flex-col px-6 overflow-y-auto mt-4">
                <motion.h1
                  key={tabSelected}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="font-bold text-3xl mt-4"
                >
                  {tabSelected}
                </motion.h1>
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full w-full mt-2 gap-3">
                    {DataShow.map((value, index) => {
                      return (
                        <Items
                          onclick={() => handleCart(value)}
                          name={value.name}
                          desc={value.desc}
                          price={value.price}
                          image={value.image}
                          key={value.id}
                        />
                      );
                    })}
                  </div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <BackgroundModal
            onClick={() => ShowCart(false)}
            isShow={isShowCart}
          />
          <div
            className={`flex fixed flex-col w-[90%] max-w-[430px] lg:flex-grow top-0 h-full right-[50%] lg:translate-x-0 lg:right-0 p-4 lg:static z-[10] translate-x-[50%] ${
              isShowCart ? "scale-100" : "scale-0"
            } duration-300 ease-in-out lg:scale-100`}
          >
            <div className="flex bg-white w-full h-full rounded-2xl">
              <Cart />
            </div>
          </div>
          <div
            onClick={() => ShowCart(true)}
            className="fixed bottom-6 right-8 p-1 lg:hidden"
          >
            <div className=" flex justify-center items-center  w-16 h-16 p-4 drop-shadow-md rounded-full bg-orange-500">
              <BsCartCheck className="h-full w-full" color="white" />
            </div>
            <div
              className={`h-6 w-6 border-[2px] text-xs bg-white ${
                DataCart.length == 0 ? "hidden" : "flex"
              } items-center justify-center rounded-full absolute top-0 right-1`}
            >
              {DataCart.length}
            </div>
          </div>
        </div>
      </div>
    </ItemContext.Provider>
  );
}

export default App;
