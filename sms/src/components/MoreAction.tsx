import { DeleteButton, EditButton } from "./buttons/Buttons";

const MoreAction = () => {
  return (
    <div className="relative">
      <div className="flex flex-col gap-2">
        <EditButton />

        <DeleteButton />
      </div>
    </div>
  );
};

export default MoreAction;
