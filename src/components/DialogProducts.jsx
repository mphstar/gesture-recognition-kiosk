import React, { useContext, useEffect, useRef, useState } from "react";

import { MdFileOpen } from "react-icons/md";
import Swal from "sweetalert2";
import { mutate } from "swr";
import AdminContext from "../utils/AdminContext";
import UrlServer from "../utils/urlServer";

const DialogProducts = ({ option }) => {
  const {
    DialogShow,
    SetDialog,
    url,
    refreshPage,
    dataSelected,
    SetDataSelected,
    category
  } = useContext(AdminContext);

  const [Name, SetName] = useState("");
  const [Description, SetDescription] = useState("");
  const [Price, SetPrice] = useState("");
  const [Image, SetImage] = useState();
  const [PreviewImage, SetPreview] = useState();
  const [Id, SetId] = useState();
  const [oldImage, SetOldImage] = useState()

  useEffect(() => {
    if (dataSelected) {
      SetName(dataSelected.name);
      SetDescription(dataSelected.description);
      SetPrice(dataSelected.price);
      SetId(dataSelected.id);

      SetOldImage(dataSelected.image)

      SetPreview(`${UrlServer}/uploads/${dataSelected.image}`);
    }
  }, [dataSelected]);

  const handleClose = () => {
    resetForm();
    SetDialog(false);
  };

  const resetForm = () => {
    SetName("");
    SetDescription("");
    SetPrice("");
    SetImage(undefined);
    SetPreview(undefined);

    SetId(undefined)
    SetOldImage(undefined)

    SetDataSelected(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("category", category)
    formData.append("name", Name);
    formData.append("description", Description);
    formData.append("price", Price);
    formData.append("id", Id);
    formData.append("image", Image);

    if(option == "Update"){
      formData.append("filename_old", oldImage)
    }

    var error = "";

    if (Name == "") {
      error = "Name field is required";
    } else if (Description == "") {
      error = "Description field is required";
    } else if (Price == "") {
      error = "Price field is required";
    }

    if (option == "Add") {
      if (!Image) {
        error = "Image field is required";
      }
    }

    if (error != "") {
      Swal.fire("Information", error, "error");
    } else {
      Swal.fire({
        title: "Question?",
        text: `Are you sure to ${option} Data?`,
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

          const result = await fetch(
            option == "Add"
              ? `${UrlServer}/api/product/create`
              : `${UrlServer}/api/product/update`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (result.ok) {
            Swal.fire("Success", `${option} Data Success`, "success").then(
              () => {
                mutate(url);
                refreshPage();
                resetForm();
                handleClose();
              }
            );
          } else {
            Swal.fire("Failed", `${option} Data Failed`, "error").then(() => {
              mutate(url);
              refreshPage();
              resetForm();
              handleClose();
            });
          }
        }
      });
    }
  };
  return (
    <>
      <div
        onClick={handleClose}
        className={`h-screen w-screen fixed bg-black ${
          DialogShow
            ? "opacity-30 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } duration-300 ease-in-out z-[200]`}
      ></div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div
          className={`flex flex-col w-[90%] h-[90%] max-w-[500px] ${
            DialogShow ? "scale-100" : "scale-0"
          } duration-300 ease-in-out fixed bg-white z-[201] right-[50%] top-[50%] translate-x-[50%] -translate-y-[50%] rounded-lg`}
        >
          <div className="flex w-full py-6 px-6 flex-row justify-between items-center border-b-[2px]">
            <h1 className="font-semibold">{option} Data</h1>
            <div
              onClick={handleClose}
              className="flex px-2 bg-red-600 h-fit w-fit text-white rounded-md"
            >
              <p>x</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 px-6 py-6 overflow-y-auto">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => {
                  SetName(e.target.value);
                }}
                className="outline-none px-4 py-2 border-[2px] rounded-md"
                type="text"
                name="name"
                id="name"
                value={Name}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="outline-none px-4 py-2 border-[2px] rounded-md h-[150px]"
                type="text"
                name="description"
                id="description"
                value={Description}
                onChange={(e) => {
                  SetDescription(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <input
                className="outline-none px-4 py-2 border-[2px] rounded-md"
                type="text"
                name="price"
                id="price"
                value={Price}
                onChange={(e) => {
                  SetPrice(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Image</label>
              <div className="bg-white w-full h-[200px] border-[2px] rounded-md flex flex-col overflow-hidden relative justify-center items-center">
                <input
                  onChange={(e) => {
                    const data = e.target.files[0];
                    const extensionName = data.name
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (
                      extensionName == "jpg" ||
                      extensionName == "png" ||
                      extensionName == "jpeg"
                    ) {
                      SetImage(data);

                      const objectURL = URL.createObjectURL(data);
                      SetPreview(objectURL);

                      console.log(e.target.files[0]);
                    } else {
                      alert("error");
                    }
                  }}
                  accept=".png, .jpg, .jpeg"
                  name="image"
                  className="h-full w-full absolute opacity-0"
                  type="file"
                />
                <div
                  className={`flex-col gap-2 items-center ${
                    PreviewImage ? "hidden" : "flex"
                  }`}
                >
                  <div className="h-12 w-12">
                    <MdFileOpen className="w-full h-full" />
                  </div>
                  <p>Select image</p>
                </div>
                <div
                  className={`w-full h-full absolute p-4 ${
                    PreviewImage ? "visible" : "invisible"
                  } pointer-events-none`}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={PreviewImage ? PreviewImage : "#"}
                    alt="preview"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-6 py-4 mb-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 cursor-default w-full py-3 px-4 text-white justify-center items-center rounded-md"
            >
              <p className="text-center">{option}</p>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default DialogProducts;
