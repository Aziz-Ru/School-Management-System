import FormSelect from "@/components/Forms/FormSelect";
import Icon from "@/components/LucidIcon";
import { Button } from "@/components/ui/button";

const SearchAttendence = () => {
  return (
    <div className="flex justify-between items-center">
      <form className="flex items-center gap-4">
        <FormSelect
          name={"month"}
          label={""}
          options={[
            "JANUARY",
            "FEBRUARY",
            "MARCH",
            "APRIL",
            "MAY",
            "JUNE",
            "JULY",
            "AUGUST",
            "SEPTEMBER",
            "OCTOBER",
            "NOVEMBER",
            "DECEMBER",
          ]}
        />
        <Button type="submit">Search</Button>
      </form>
      <Button className="bg-sky-200 hover:bg-sky-300">
        <Icon name="Plus" size={18} />
      </Button>
    </div>
  );
};

export default SearchAttendence;
