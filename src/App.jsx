import Header from "./components/Header";
import TabItems from "./components/TabItems";
import Burger from "./assets/images/burger.png";
import Snack from "./assets/images/doritos.png"
import Drink from "./assets/images/pocari.png";
import Dessert from "./assets/images/Fantasy-Jeruk.png";
import Items from "./components/Items";
import Cart from "./components/Cart";
import { BsCartCheck } from "react-icons/bs";
import BackgroundModal from "./components/BackgroundModal";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ListData from "./models";
import ItemContext from "./utils/ItemContext.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { socket } from "./utils/socket";
import Video from "./components/Video";
import convertRupiah from "./utils/convertRupiah";

function App() {
  const [isShowCart, ShowCart] = useState(false);
  const [DataShow, SetDataShow] = useState(ListData.burger);
  const [tabSelected, SetTabSelected] = useState("Snack");
  const [DataCart, SetDataCart] = useState({
    total_items: 0,
    price: 0,
    data: [],
  });

  const [IsConnected, SetIsConnected] = useState(false);

  const kontenTab = useRef(null);
  const kontenItem = useRef(null);
  const kontenCart = useRef(null);

  const [IsFocus, SetFocus] = useState({
    description: "",
    focused: null,
  });

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
      // document.body.style.overflow = "hidden";
      toast.error("Items already in cart!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleCart = (data) => {
    // console.log(DataCart.price);
    const datas = DataCart.data.filter((item) => item.data.id === data.id);
    if (datas.length == 0) {
      SetDataCart({
        ...DataCart,
        total_items: DataCart.data.length + 1,
        price: DataCart.price + data.price,
        data: [
          ...DataCart.data,
          {
            data: data,
            subtotal: data.price,
            qty: 1,
          },
        ],
      });
      HandleToast("success");
    } else {
      HandleToast("error");
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      SetIsConnected(true);
    });

    return () => {};
  }, [IsConnected]);

  return (
    <ItemContext.Provider
      value={{
        DataCart,
        SetDataCart,
        IsFocus,
        SetFocus,
        kontenTab,
        kontenItem,
        kontenCart,
        ShowCart,
      }}
    >
      {IsConnected ? (
        <div className="fixed z-[90] opacity-0 flex justify-center items-center w-full h-full pointer-events-none">
          <Video />
        </div>
      ) : undefined}

      <ToastContainer />
      <div
        className={`bg-gray-500 min-h-screen flex items-center justify-center px-4 py-4`}
      >
        <div className="flex flex-col lg:flex-row bg-gray-100 rounded-lg h-full lg:h-[800px] max-w-[1280px] w-full overflow-x-hidden">
          <div className="flex flex-col px-0 w-full lg:w-[70%] h-full py-4">
            <div className="h-fit flex mb-4 px-4">
              <Header />
            </div>
            <div className="flex w-full flex-1 flex-col lg:flex-row overflow-hidden">
              <div
                ref={kontenTab}
                id="content-tab"
                className="w-full h-full items-center lg:w-[200px] px-4 py-4 duration-300 ease-in-out border-l-[6px] border-transparent flex gap-2 justify-start lg:justify-center flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden"
              >
                <TabItems
                  onclick={() => handleTab(ListData.burger, "Snack")}
                  title={"Snack"}
                  image={Snack}
                  isSelected={tabSelected == "Snack" ? true : false}
                />
                <TabItems
                  onclick={() => handleTab(ListData.drink, "Drink")}
                  title={"Drink"}
                  image={Drink}
                  isSelected={tabSelected == "Drink" ? true : false}
                />
                <TabItems
                  onclick={() => handleTab(ListData.dessert, "Ice cream")}
                  title={"Icecream"}
                  image={Dessert}
                  isSelected={tabSelected == "Ice cream" ? true : false}
                />
              </div>
              <div className="flex flex-col px-6 mt-4 border-l-[6px] duration-300 w-full ease-in-out border-transparent pb-4">
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
                  <div
                    ref={kontenItem}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full w-full mt-2 gap-3"
                  >
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
            <div
              ref={kontenCart}
              className="flex bg-white w-full h-full duration-300 ease-in-out border-[2px] border-transparent border-opacity-40 rounded-2xl"
            >
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
                DataCart.data.length == 0 ? "hidden" : "flex"
              } items-center justify-center rounded-full absolute top-0 right-1`}
            >
              {DataCart.data.length}
            </div>
          </div>
        </div>
      </div>
    </ItemContext.Provider>
  );
}

export default App;
