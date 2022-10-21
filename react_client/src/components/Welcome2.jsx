import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-xl font-light text-white";

const Welcome2 = () => {
  const [filename, setFilename] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    socket.on("sendingMessage", (arg) => {
      const data = JSON.stringify(arg);
      const data2 = JSON.parse(data);
      console.log(`RESULT : ${data2.result}`);
      console.log(`FILENAME : ${data2.filename}`);
      setFilename(data2.filename);
      setResult(data2.result);
    });
  }, []);

  const imageUrl = `http://localhost:8000/getImage?input=${filename}`;

  const [img, setImg] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    };
    fetchImage();
  }, [imageUrl]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-rox flex-col justify-between md:p-20">
        <div className="flex flex-col justy-start md:mr-10 md:mt-10 lg:-mt-5">
          <div className="justify-between flex flex-col text-left text-2xl lg:-ml-20 md:ml-0 mb-5 tracking-[0.1rem] text-white font-light md:w-9/12 w-11/12">
            <h1 className="font-semibold p-2 text-left">
              Filename: &nbsp; {filename}
            </h1>
            <h1 className="font-semibold p-2 text-left">
              Result: &nbsp; {result}
            </h1>
          </div>

          <img
            src={img}
            alt="pic here"
            className="text-white flex flex-1 justify-center items-center ml-40 mr-40 mb-40 mt-5"
            width="600"
            height="600"
          />

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-15">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Powered</div>
            <div className={`${commonStyles}`}>by</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>AI Solutions</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>AIVI-ng</div>
            <div className={`${commonStyles}`}></div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Interface</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome2;
