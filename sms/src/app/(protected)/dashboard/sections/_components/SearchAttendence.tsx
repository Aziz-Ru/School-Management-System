import FormSelect from "@/components/Forms/FormSelect";
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
    </div>
  );
};

export default SearchAttendence;
