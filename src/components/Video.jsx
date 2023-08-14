import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import { socket } from "../utils/socket";
import ItemContext from "../utils/ItemContext";
import Swal from "sweetalert2";
const Video = () => {
  const camm = useRef(null);
  const mycanv = useRef(null);

  const { IsFocus, SetFocus, kontenTab, kontenItem, kontenCart, ShowCart } =
    useContext(ItemContext);

  const [nilai, setNilai] = useState({
    hand: null,
    gesture: null,
  });

  const handleGesture = () => {
    if (IsFocus.focused == null) {
      // here is not focused
      if (
        (nilai.hand == "Left" || nilai.hand == "Right") &&
        nilai.gesture == "One"
      ) {
        // Here focused to tab menu
        SetFocus({
          ...IsFocus,
          description: "Focused Tab",
          focused: kontenTab,
        });

        // Add effect focus
        kontenTab.current.classList.remove("border-transparent");
        kontenTab.current.classList.add("border-orange-600");
      } else if (
        (nilai.hand == "Left" || nilai.hand == "Right") &&
        nilai.gesture == "Two"
      ) {
        // Here focused to item menu
        SetFocus({
          ...IsFocus,
          description: "Focused Item",
          focused: kontenItem,
          itemFocused: kontenItem.current.firstChild,
        });
        kontenItem.current.firstChild.children[0].classList.add(
          "-translate-y-5"
        );
        kontenItem.current.firstChild.children[1].classList.add(
          "border-orange-500"
        );
        kontenItem.current.firstChild.children[1].classList.add("pt-8");

        // console.log(kontenItem.current.firstChild.getAttribute('class'));
      } else if (
        (nilai.hand == "Right" || nilai.hand == "Left") &&
        nilai.gesture == "Three"
      ) {
        // Here focused to cart
        ShowCart(true);
        const contentCart =
          kontenCart.current.firstChild.children[0].children[2].children;
        SetFocus({
          ...IsFocus,
          description: "Focused Cart",
          focused: kontenCart,
          itemFocused: contentCart[0],
        });

        // Set effect focus

        if (contentCart.length != 0) {
          contentCart[0].classList.add("border-orange-600");
        } else {
          // set focus in background cart
          kontenCart.current.classList.remove("border-transparent");
          kontenCart.current.classList.add("border-orange-600");
        }
      }
    } else {
      if (IsFocus.focused == kontenTab) {
        if (
          (nilai.hand == "Left" || nilai.hand == "Right") &&
          nilai.gesture == "Close"
        ) {
          // Here unfocus from tab menu
          SetFocus({
            ...IsFocus,
            description: "",
            focused: null,
          });

          // Remove effect focus
          // Add effect focus
          kontenTab.current.classList.remove("border-orange-600");
          kontenTab.current.classList.add("border-transparent");
        } else if (
          (nilai.hand == "Left" || nilai.hand == "Right") &&
          nilai.gesture == "One"
        ) {
          // Go to tab one
          IsFocus.focused.current.children[0].click();
        } else if (
          (nilai.hand == "Left" || nilai.hand == "Right") &&
          nilai.gesture == "Two"
        ) {
          // Go to tab two
          IsFocus.focused.current.children[1].click();
        } else if (
          (nilai.hand == "Left" || nilai.hand == "Right") &&
          nilai.gesture == "Three"
        ) {
          // Go to tab three
          IsFocus.focused.current.children[2].click();
        }
      } else if (IsFocus.focused == kontenItem) {
        if (
          (nilai.hand == "Left" || nilai.hand == "Right") &&
          nilai.gesture == "Close"
        ) {
          // Here unfocus

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          IsFocus.itemFocused.children[0].classList.remove("-translate-y-5");
          IsFocus.itemFocused.children[1].classList.remove("border-orange-500");
          IsFocus.itemFocused.children[1].classList.remove("pt-8");

          SetFocus({
            ...IsFocus,
            description: "",
            focused: null,
          });
        } else if (nilai.hand == "Right" && nilai.gesture == "One") {
          // Focus in next item
          // cek if last item: do nothing
          if (IsFocus.focused.current.lastChild != IsFocus.itemFocused) {
            // remove effect focus
            IsFocus.itemFocused.children[0].classList.remove("-translate-y-5");
            IsFocus.itemFocused.children[1].classList.remove(
              "border-orange-500"
            );
            IsFocus.itemFocused.children[1].classList.remove("pt-8");

            // Add effects for next item
            for (
              let index = 0;
              index < IsFocus.focused.current.children.length;
              index++
            ) {
              const element = IsFocus.focused.current.children[index];
              if (element == IsFocus.itemFocused) {
                window.scrollTo({
                  top:
                    IsFocus.focused.current.children[index + 1].offsetTop -
                    IsFocus.focused.current.children[index + 1].offsetHeight,
                  behavior: "smooth",
                });
                IsFocus.focused.current.children[
                  index + 1
                ].children[0].classList.add("-translate-y-5");
                IsFocus.focused.current.children[
                  index + 1
                ].children[1].classList.add("border-orange-500");
                IsFocus.focused.current.children[
                  index + 1
                ].children[1].classList.add("pt-8");

                // then set new focus
                SetFocus({
                  ...IsFocus,
                  description: "Focused Item",
                  focused: kontenItem,
                  itemFocused: IsFocus.focused.current.children[index + 1],
                });
              }
            }
          }
        } else if (nilai.hand == "Left" && nilai.gesture == "One") {
          // Focus in previus item
          // cek if first item: do nothing
          if (IsFocus.focused.current.firstChild != IsFocus.itemFocused) {
            // remove effect focus
            IsFocus.itemFocused.children[0].classList.remove("-translate-y-5");
            IsFocus.itemFocused.children[1].classList.remove(
              "border-orange-500"
            );
            IsFocus.itemFocused.children[1].classList.remove("pt-8");

            // Add effects for previus item
            for (
              let index = 0;
              index < IsFocus.focused.current.children.length;
              index++
            ) {
              const element = IsFocus.focused.current.children[index];
              if (element == IsFocus.itemFocused) {
                window.scrollTo({
                  top:
                    index == 1
                      ? 0
                      : IsFocus.focused.current.children[index - 1].offsetTop -
                        IsFocus.focused.current.children[index - 1]
                          .offsetHeight,
                  behavior: "smooth",
                });
                IsFocus.focused.current.children[
                  index - 1
                ].children[0].classList.add("-translate-y-5");
                IsFocus.focused.current.children[
                  index - 1
                ].children[1].classList.add("border-orange-500");
                IsFocus.focused.current.children[
                  index - 1
                ].children[1].classList.add("pt-8");

                // then set new focus
                SetFocus({
                  ...IsFocus,
                  description: "Focused Item",
                  focused: kontenItem,
                  itemFocused: IsFocus.focused.current.children[index - 1],
                });
              }
            }
          }
        } else if ((nilai.hand == "Right" || nilai.hand == "Left") && nilai.gesture == "Okay") {
          // Add to
          IsFocus.itemFocused.click();
        }
      } else if (IsFocus.focused == kontenCart) {
        if (
          (nilai.hand == "Left" || nilai.hand == "Right") &&
          nilai.gesture == "Close"
        ) {
          ShowCart(false);

          IsFocus.focused.current.firstChild.firstChild.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          const contentCart =
            kontenCart.current.firstChild.children[0].children[2].children;
          // Here unfocus
          // remove effect focus
          if (contentCart.length != 0) {
            IsFocus.itemFocused.classList.remove("border-orange-600");
          } else {
            // remove focus in background cart
            kontenCart.current.classList.remove("border-orange-600");
            kontenCart.current.classList.add("border-transparent");
          }

          SetFocus({
            ...IsFocus,
            description: "",
            focused: null,
          });
        } else if (nilai.hand == "Right" && nilai.gesture == "One") {
          // Focus in next item
          // cek if last item: do nothing
          const contentCart =
            kontenCart.current.firstChild.children[0].children[2];
          if (contentCart.children.length != 0) {
            if (contentCart.lastChild != IsFocus.itemFocused) {
              // remove effect focus
              IsFocus.itemFocused.classList.remove("border-orange-600");

              // Add effects for next item
              for (
                let index = 0;
                index < contentCart.children.length;
                index++
              ) {
                const element = contentCart.children[index];
                if (element == IsFocus.itemFocused) {
                  IsFocus.focused.current.firstChild.firstChild.scrollTo({
                    top:
                      contentCart.children[index + 1].offsetTop -
                      contentCart.children[index + 1].offsetHeight -
                      300,
                    behavior: "smooth",
                  });
                  console.log(IsFocus.focused);

                  contentCart.children[index + 1].classList.add(
                    "border-orange-600"
                  );

                  // then set new focus
                  SetFocus({
                    ...IsFocus,
                    description: "Focused Cart",
                    focused: kontenCart,
                    itemFocused: contentCart.children[index + 1],
                  });
                }
              }
            }
          }
        } else if (nilai.hand == "Left" && nilai.gesture == "One") {
          // Focus in previous item
          // cek if last item: do nothing
          const contentCart =
            kontenCart.current.firstChild.children[0].children[2];
          if (contentCart.children.length != 0) {
            if (contentCart.firstChild != IsFocus.itemFocused) {
              // remove effect focus
              IsFocus.itemFocused.classList.remove("border-orange-600");

              // Add effects for previous item
              for (
                let index = 0;
                index < contentCart.children.length;
                index++
              ) {
                const element = contentCart.children[index];
                if (element == IsFocus.itemFocused) {
                  IsFocus.focused.current.firstChild.firstChild.scrollTo({
                    top:
                      index == 1
                        ? 0
                        : contentCart.children[index - 1].offsetTop -
                          contentCart.children[index - 1].offsetHeight -
                          300,
                    behavior: "smooth",
                  });

                  contentCart.children[index - 1].classList.add(
                    "border-orange-600"
                  );

                  // then set new focus
                  SetFocus({
                    ...IsFocus,
                    description: "Focused Cart",
                    focused: kontenCart,
                    itemFocused: contentCart.children[index - 1],
                  });
                }
              }
            }
          }
        } else if (nilai.hand == "Right" && nilai.gesture == "Thumb Up") {
          if (IsFocus.itemFocused) {
            // increase quantity
            IsFocus.itemFocused.children[1].children[2].click()
          }
        } else if(nilai.hand == "Left" && nilai.gesture == "Thumb Up"){
          if (IsFocus.itemFocused) {
            // Decrease quantity
            IsFocus.itemFocused.children[1].children[0].click()
          }
        } else if((nilai.hand == "Left" || nilai.hand == "Right") && nilai.gesture == "Okay"){
          if (IsFocus.itemFocused) {
            // payyyy
            IsFocus.focused.current.firstChild.children[1].firstChild.click()
          }
        }
      }
    }

    console.log(IsFocus.description);
  };

  useLayoutEffect(() => {
    handleGesture();
  }, [nilai]);

  useEffect(() => {
    const FPS = 1;
    const contextCanvas = mycanv.current.getContext("2d");
    setInterval(() => {
      // console.log("dwa");
      contextCanvas.drawImage(
        camm.current.video,
        0,
        0,
        mycanv.current.width,
        mycanv.current.height
      );
      var data = mycanv.current.toDataURL("image/jpeg", 0.5);
      contextCanvas.clearRect(0, 0, 800, 600);
      // console.log(data);
      socket.emit("image", data);
    }, 1400 / FPS);

    socket.on("processed_image", function (image) {
      if (image.result !== "null") {
        setNilai({
          ...nilai,
          hand: image.result.hand,
          gesture: image.result.result,
        });
      } else {
        setNilai({
          ...nilai,
          hand: null,
          gesture: "Nothing",
        });
      }
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "10px",
        overflow: "hidden",
        height: "fit-content",
        width: "fit-content",
        flexDirection: "column",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Webcam mirrored ref={camm} height={600} width={800} />
      <canvas
        style={{
          background: "red",
          marginTop: "5px",
          display: "none",
        }}
        height={600}
        width={800}
        ref={mycanv}
      />
      <h1
        style={{
          textAlign: "center",
          fontSize: "50sp",
        }}
      >
        {nilai.hand != null
          ? `${nilai.hand} || ${nilai.gesture}`
          : nilai.gesture}
      </h1>
    </div>
  );
};

export default Video;
