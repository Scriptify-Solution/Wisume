import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="mx-[30px] h-[80%] bg-white rounded-lg p-2 max-w-lg flex justify-center relative items-center">
        <button
          className="z-50 bg-gray-300 p-2 rounded-md w-[40px] h-[40px] absolute top-[-20px] right-[-20px] text-gray-700 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
