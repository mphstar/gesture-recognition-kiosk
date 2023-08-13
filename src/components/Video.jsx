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
const Video = () => {
  const camm = useRef(null);
  const mycanv = useRef(null);

  const { IsFocus, SetFocus, kontenTab } = useContext(ItemContext);

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
          
        } else if((nilai.hand == "Left" || nilai.hand == "Right") && nilai.gesture == "One"){
          // Go to tab one
          IsFocus.focused.current.children[0].click()
        } else if((nilai.hand == "Left" || nilai.hand == "Right") && nilai.gesture == "Two"){
          // Go to tab two
          IsFocus.focused.current.children[1].click()
        } else if((nilai.hand == "Left" || nilai.hand == "Right") && nilai.gesture == "Three"){
          // Go to tab three
          IsFocus.focused.current.children[2].click()
        } 
      }
    }

    console.log(IsFocus.description);
  };

  useLayoutEffect(() => {
    handleGesture();
  }, [nilai]);

  useEffect(() => {
    const FPS = 10;
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
    }, 1000 / FPS);

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
