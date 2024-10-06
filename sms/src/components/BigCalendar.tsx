"use client";
import { calendarEvents } from "@/lib/data";
import moment from "moment";
import { useState } from "react";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en", {
  week: {
    dow: 6,
  },
});
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WEEK);
  const handleCHangeView = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <div className="w-full h-full">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        view={view}
        onView={handleCHangeView}
        views={["week", "day"]}
        min={new Date(2025, 1, 0, 8, 0, 0)}
        max={new Date(2025, 1, 0, 17, 0, 0)}
        style={{ height: "70%" }}
      />
    </div>
  );
};

export default BigCalendar;
