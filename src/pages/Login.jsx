import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import UrlServer from "../utils/urlServer";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const inputPw = useRef();
  const inputUserid = useRef();

  const [valueUserid, SetValueUserid] = useState("");
  const [valuePw, SetValuePw] = useState("");

  const [IsShowPw, SetIsShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userid", valueUserid);
    formData.append("password", valuePw);

    var error = "";
    if (valueUserid == "" || valuePw == "") {
      error = "Field Userid and Password Required";
    }

    if (error != "") {
      Swal.fire("Information", error, "error");
    } else {
      Swal.fire({
        title: "Question?",
        text: `Are you sure to Login?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Loading",
            html: '<div class="body-loading"><div class="loadingspinner"></div></div>', // add html attribute if you want or remove
            allowOutsideClick: false,
            showConfirmButton: false,
          });

          const resultt = await fetch(`${UrlServer}/api/login`, {
            method: "POST",
            body: formData,
          }).catch((e) => {
            Swal.fire("Failed", `Failed Access Server`, "error");
          });

          const res = await resultt.json();
          if (res.status == "success") {
            Swal.fire("Success", `Login Success`, "success").then(() => {
              localStorage.setItem("isLogin", JSON.stringify(res.result));
              window.location.href = "/dashboard";
            });
          } else {
            toast.error("Wrong userid or password!", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            Swal.close();

            SetValuePw("");
          }
        }
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center text-xs">
      <ToastContainer />
      <div className="py-12 w-[90%] flex flex-col bg-white drop-shadow-2xl rounded-lg max-w-[520px] px-12 overflow-x-hidden overflow-y-auto scrollbar-hide my-4">
        <div className="flex flex-row justify-between w-full items-center h-fit">
          <div className="flex flex-row gap-4 items-center cursor-pointer py-1 px-2 rounded-md hover:bg-slate-100">
            <p className="font-semibold text-[20px] w-full h-full">
              Login Page
            </p>
          </div>
        </div>
        <div className="mt-4"></div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="py-2" htmlFor="userid">
            Userid
          </label>
          <input
            className="px-2 py-3 border-[1px] rounded-lg outline-none border-[#CECECE]"
            type="text"
            placeholder="Userid"
            value={valueUserid}
            onChange={(e) => SetValueUserid(e.target.value)}
            ref={inputUserid}
            name="userid"
            id="userid"
          />

          <label className="py-2" htmlFor="password">
            Password
          </label>
          <div className="relative flex flex-col">
            <input
              className="px-2 py-3 pr-16 appearance-none border-[1px] rounded-lg outline-none border-[#CECECE]"
              name="password"
              type={IsShowPw ? 'text' : 'password'}
              placeholder="Password"
              onChange={(e) => SetValuePw(e.target.value)}
              value={valuePw}
              ref={inputPw}
              id="password"
            />
            <div
              onClick={() => SetIsShowPw(!IsShowPw)}
              className="cursor-pointer absolute h-full flex items-center w-6 right-5"
              id="btnShowHide"
            >
              {!IsShowPw ? (
                <svg
                  className="fill-[#9e9e9e]"
                  viewBox="0 0 29 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M27.5564 7.96191C25.7202 4.98855 21.5433 0 14.2124 0C6.88151 0 2.70462 4.98855 0.868346 7.96191C0.300686 8.87475 0 9.92677 0 11C0 12.0732 0.300686 13.1252 0.868346 14.0381C2.70462 17.0115 6.88151 22 14.2124 22C21.5433 22 25.7202 17.0115 27.5564 14.0381C28.1241 13.1252 28.4248 12.0732 28.4248 11C28.4248 9.92677 28.1241 8.87475 27.5564 7.96191ZM25.5378 12.8057C23.9608 15.3553 20.3913 19.6458 14.2124 19.6458C8.03347 19.6458 4.46393 15.3553 2.88694 12.8057C2.54968 12.2631 2.37105 11.6378 2.37105 11C2.37105 10.3622 2.54968 9.73692 2.88694 9.19433C4.46393 6.64473 8.03347 2.3542 14.2124 2.3542C20.3913 2.3542 23.9608 6.64002 25.5378 9.19433C25.8751 9.73692 26.0537 10.3622 26.0537 11C26.0537 11.6378 25.8751 12.2631 25.5378 12.8057Z" />
                  <path d="M14.1151 5.06189C12.9406 5.06189 11.7926 5.41015 10.8161 6.06263C9.83954 6.71511 9.07845 7.64251 8.62901 8.72755C8.17957 9.81258 8.06198 11.0065 8.2911 12.1584C8.52022 13.3103 9.08577 14.3683 9.91622 15.1988C10.7467 16.0292 11.8047 16.5948 12.9566 16.8239C14.1085 17.053 15.3024 16.9354 16.3875 16.486C17.4725 16.0365 18.3999 15.2755 19.0524 14.2989C19.7048 13.3224 20.0531 12.1744 20.0531 10.9999C20.0512 9.42565 19.425 7.91638 18.3118 6.80319C17.1986 5.69 15.6893 5.06378 14.1151 5.06189ZM14.1151 14.5628C13.4104 14.5628 12.7216 14.3538 12.1357 13.9623C11.5497 13.5708 11.0931 13.0144 10.8234 12.3634C10.5538 11.7124 10.4832 10.996 10.6207 10.3049C10.7582 9.61375 11.0975 8.97891 11.5958 8.48064C12.094 7.98237 12.7289 7.64304 13.42 7.50557C14.1111 7.3681 14.8275 7.43865 15.4785 7.70831C16.1295 7.97798 16.686 8.43463 17.0774 9.02054C17.4689 9.60644 17.6779 10.2953 17.6779 10.9999C17.6779 11.9449 17.3025 12.8511 16.6344 13.5192C15.9662 14.1874 15.06 14.5628 14.1151 14.5628Z" />
                </svg>
              ) : (
                <svg
                  className="fill-[#9e9e9e]"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M27.5564 10.9619C25.7202 7.98855 21.5433 3 14.2124 3C6.88151 3 2.70462 7.98855 0.868346 10.9619C0.300686 11.8748 0 12.9268 0 14C0 15.0732 0.300686 16.1252 0.868346 17.0381C2.70462 20.0115 6.88151 25 14.2124 25C21.5433 25 25.7202 20.0115 27.5564 17.0381C28.1241 16.1252 28.4248 15.0732 28.4248 14C28.4248 12.9268 28.1241 11.8748 27.5564 10.9619ZM25.5378 15.8057C23.9608 18.3553 20.3913 22.6458 14.2124 22.6458C8.03347 22.6458 4.46393 18.3553 2.88694 15.8057C2.54968 15.2631 2.37105 14.6378 2.37105 14C2.37105 13.3622 2.54968 12.7369 2.88694 12.1943C4.46393 9.64473 8.03347 5.3542 14.2124 5.3542C20.3913 5.3542 23.9608 9.64002 25.5378 12.1943C25.8751 12.7369 26.0537 13.3622 26.0537 14C26.0537 14.6378 25.8751 15.2631 25.5378 15.8057Z" />
                  <path d="M14.1151 8.06189C12.9406 8.06189 11.7926 8.41015 10.8161 9.06263C9.83954 9.71511 9.07845 10.6425 8.62901 11.7275C8.17957 12.8126 8.06198 14.0065 8.2911 15.1584C8.52022 16.3103 9.08577 17.3683 9.91622 18.1988C10.7467 19.0292 11.8047 19.5948 12.9566 19.8239C14.1085 20.053 15.3024 19.9354 16.3875 19.486C17.4725 19.0365 18.3999 18.2755 19.0524 17.2989C19.7048 16.3224 20.0531 15.1744 20.0531 13.9999C20.0512 12.4257 19.425 10.9164 18.3118 9.80319C17.1986 8.69 15.6893 8.06378 14.1151 8.06189ZM14.1151 17.5628C13.4104 17.5628 12.7216 17.3538 12.1357 16.9623C11.5497 16.5708 11.0931 16.0144 10.8234 15.3634C10.5538 14.7124 10.4832 13.996 10.6207 13.3049C10.7582 12.6137 11.0975 11.9789 11.5958 11.4806C12.094 10.9824 12.7289 10.643 13.42 10.5056C14.1111 10.3681 14.8275 10.4387 15.4785 10.7083C16.1295 10.978 16.686 11.4346 17.0774 12.0205C17.4689 12.6064 17.6779 13.2953 17.6779 13.9999C17.6779 14.9449 17.3025 15.8511 16.6344 16.5192C15.9662 17.1874 15.06 17.5628 14.1151 17.5628Z" />
                  <rect
                    x="21.802"
                    width="3"
                    height="32.5801"
                    rx="1.5"
                    transform="rotate(33.1211 21.802 0)"
                  />
                </svg>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="bg-orange-400 flex py-2 px-2 items-center justify-center rounded-lg text-white mt-8 cursor-pointer hover:bg-opacity-80"
          >
            <p>LOGIN</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
