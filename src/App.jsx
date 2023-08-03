import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="flex flex-col px-4 w-full lg:w-[70%] h-full py-4">
        <Header />
        <div className="flex w-full h-full flex-col lg:flex-row">
          <div
            id="content-tab"
            className="w-full h-fit lg:w-fit px-4 py-4 lg:h-full mt-4 flex gap-2 justify-center flex-row lg:flex-col"
          >
            <div className="w-24 h-24 rounded-[35%] border-[2px] border-gray-300"></div>
            <div className="flex flex-col w-24 h-24 rounded-[35%] border-[2px] border-green-500 p-2">
              <div className="w-full h-full bg-green-200 rounded-full overflow-hidden flex flex-col items-center justify-center px-4">
                <div className="h-6 w-6 bg-gray-300"></div>
                <p className="line-clamp-1 font-semibold">Burger</p>
              </div>
            </div>
            <div className="w-24 h-24 rounded-[35%] border-[2px] border-gray-300"></div>
          </div>
          <div className="flex flex-grow bg-yellow-300">
            <h1 className="font-bold text-3xl">Burger</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow h-full p-4">
        <div className="flex bg-white w-full h-full rounded-2xl drop-shadow-lg"></div>
      </div>
    </div>
  );
}

export default App;
