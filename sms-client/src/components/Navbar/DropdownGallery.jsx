import DownArrow from "../svg/DownArrow";

const DropdownGallery = () => {
  return (
    <li className="px-4 py-2">
      <div className=" flex gap-2 items-center">
        School
        <DownArrow isOpen={false} />
      </div>
      <ul className="px-4 md:px-0 mt-2 flex flex-col gap-2">
        <li>Principal</li>
        <li>Governing Body</li>
        <li>Commitee</li>
        <li>Official staff</li>
      </ul>
    </li>
  );
};

export default DropdownGallery;
