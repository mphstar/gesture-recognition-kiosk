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

  const { IsFocus, SetFocus, kontenTab, kontenItem } = useContext(ItemContext);

  const [nilai, setNilai] = useState({
    hand: null,
    gesture: null,
  });

  const handleGesture = () => {
    if (IsFocus.focused == null) {
      // here is not focused
      if (nilai.hand == "Left" && nilai.gesture == "Open") {
        // Here focused to tab menu
        SetFocus({
          ...IsFocus,
          description: "Focused Tab",
          focused: kontenTab,
        });
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
                  top: IsFocus.focused.current.children[index + 1].offsetTop - IsFocus.focused.current.children[index + 1].offsetHeight,
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
                  top: index == 1 ? 0 : IsFocus.focused.current.children[index - 1].offsetTop - IsFocus.focused.current.children[index - 1].offsetHeight,
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
        } else if (nilai.hand == "Right" && nilai.gesture == "Okay") {
          // Add to
          IsFocus.itemFocused.click();
        }
      }
    }

    console.log(IsFocus.description);
  };

  useLayoutEffect(() => {
    Swal.isVisible()
      ? nilai.hand == "Left" && nilai.gesture == "Okay"
        ? Swal.close()
        : undefined
      : handleGesture();
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
    }, 700 / FPS);

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
