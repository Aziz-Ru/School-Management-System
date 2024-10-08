import { Button } from "@/components/ui/button";
interface Props {
  (): () => {};
}
export function AddButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} className="bg-blue-600 hover:bg-blue-400">
      Add
    </Button>
  );
}

export function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} className="bg-red-600 hover:bg-red-400">
      Delete
    </Button>
  );
}

export function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button onClick={onClick} className="bg-sky-600 hover:bg-sky-400">
      Edit
    </Button>
  );
}

export function FilterButton() {
  return <Button className="bg-purple-600 hover:bg-purple-400">Filter</Button>;
}

export function DetailsButton() {
  return <Button className="bg-orange-600 hover:bg-orange-400">Details</Button>;
}
