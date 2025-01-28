import React from "react";
import { getConvertedDate } from "../../utils/utils";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

const ResumeItem = ({ item, onImageClick, onDownloadClick, onDeleteClick, ...props }) => {
  return (
    <div ClassName="flex flex-col md:flex-row" {...props}>
      <CardContainer>
        <CardBody className="relative group/card w-full h-auto ">
          <div className="flex flex-col md:flex-row gap-2">
            <CardItem
              translateZ="100"
              className="w-full max-w-[200px] h-[300px] object-cover border-2 rounded-xl 
          border-gray-100 cursor-pointer group-hover/card:shadow-xl md:flex-1 md:mr-5"
            >
              <img
                src={
                  item.resumeImage ||
                  item.coverImage ||
                  "/placeholder-image.png"
                }
                onClick={onImageClick}
                className="w-full h-full object-cover border-2 rounded-xl "
                alt="Resume Preview"
              />
            </CardItem>

            <div className="flex flex-col">
              <label className="text-xl bowlby text-primary">
                {item.jobTitle}
              </label>
              <p className="text-gray-500 text-[12px]">
                Updated {getConvertedDate(item.updatedAt)}
              </p>

              <div
                className="flex text-xl justify-center items-center self-start mt-3 cursor-pointer"
                onClick={onDownloadClick}
              >
                <img
                  src="./assets/icons/ic_download.svg"
                  alt="Download"
                  width={20}
                  height={20}
                />
                <p className="ml-3 hover:text-blue-500">Download PDF</p>
              </div>

              <div
                className="flex text-xl justify-center items-center self-start mt-3 cursor-pointer"
                onClick={onDeleteClick}
              >
                <img
                  src="./assets/icons/ic_delete.svg"
                  className="text-blue-300"
                  width={20}
                  height={20}
                  alt="Delete"
                />
                <p className="ml-3 hover:text-blue-500">Delete</p>
              </div>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </div>

    // <div className="flex flex-col md:flex-row" {...props}>

    //   <div className="flex flex-col">
    //     <label className="text-xl bowlby text-primary">{item.jobTitle}</label>
    //     <p className="text-gray-500 text-[12px]">
    //       Updated {getConvertedDate(item.updatedAt)}
    //     </p>

    //     <div
    //       className="flex text-xl justify-center items-center self-start mt-3 cursor-pointer"
    //       onClick={onDownloadClick}
    //     >
    //       <img
    //         src="./assets/icons/ic_download.svg"
    //         className="text-blue-300"
    //         width={20}
    //         height={20}
    //         alt="option download"
    //       />
    //       <p className="ml-3 hover:text-blue-500">Download PDF</p>
    //     </div>

    //     <div
    //       className="flex text-xl justify-center items-center self-start mt-3 cursor-pointer"
    //       onClick={onDeleteClick}
    //     >
    //       <img
    //         src="./assets/icons/ic_delete.svg"
    //         className="text-blue-300"
    //         width={20}
    //         height={20}
    //         alt="option download"
    //       />
    //       <p className="ml-3 hover:text-blue-500">Delete</p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ResumeItem;
