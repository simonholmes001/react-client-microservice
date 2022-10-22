import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-xl font-light text-white";

const Section = () => {
  const [leftfilename, setLeftfilename] = useState("");
  const [leftresult, setLeftresult] = useState("");

  const [rightfilename, setRightfilename] = useState("");
  const [rightresult, setRightresult] = useState("");

  useEffect(() => {
    socket.on("sendingMessage", (arg) => {
      const data = JSON.stringify(arg);
      const data2 = JSON.parse(data);
      console.log(`RESULT_1 : ${data2.result1}`);
      console.log(`FILENAME_1 : ${data2.filename1}`);
      setLeftfilename(data2.filename1);
      setLeftresult(data2.result1);
      setRightfilename(data2.filename2);
      setRightresult(data2.result2);
    });
  }, []);

 
  const leftImageUrl = `http://localhost:8000/getImage?input=${leftfilename}`;
  const rightImageUrl = `http://localhost:8000/getImage?input=${rightfilename}`;

  const [leftImg, setLeftimg] = useState();
  const [rightImg, setRightimg] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(leftImageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setLeftimg(imageObjectURL);
    };
    fetchImage();
  }, [leftImageUrl]);

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(rightImageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setRightimg(imageObjectURL);
    };
    fetchImage();
  }, [rightImageUrl]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex md:flex-rox flex-col justify-between md:p-20">
        <div className="flex flex-col justy-start md:mr-10 md:mt-10 lg:-mt-5">
          <div className="w-4/5 ml-40 grid grid-cols-2">
            <div className="grid grid-rows-2 justify-between text-left text-2xl tracking-[0.1rem] text-white font-light">
              <h1 className="font-semibold p-2 text-left">
                Filename: &nbsp; {leftfilename}
              </h1>
              <h1 className="font-semibold p-2 text-left">
                Result: &nbsp; {leftresult}
              </h1>
              <img
                src={leftImg}
                alt="pic here"
                className="text-white flex flex-1 justify-center items-center ml-10 mr-40 mb-40 mt-5"
                width="400"
                height="400"
              />
            </div>
            <div className="grid grid-rows-2 justify-between text-left text-2xl tracking-[0.1rem] text-white font-light">
              <h1 className="font-semibold p-2 text-left">
                Filename: &nbsp; {rightfilename}
              </h1>
              <h1 className="font-semibold p-2 text-left">
                Result: &nbsp; {rightresult}
              </h1>
              <img
                src={rightImg}
                alt="pic here"
                className="text-white flex flex-1 justify-center items-center ml-10 mr-40 mb-40 mt-5"
                width="400"
                height="400"
              />
            </div>
          </div>

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

export default Section;
