import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from "react";

function Calendar() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('Calender Events')) || []    
    setEvents(storedEvents)
  }, [])
  
  // Add availability or meeting
  const handleDateSelect = (selectInfo) => {

    const title = prompt("Enter event title or availability:");
    if (title) {
      const newEvent = { id: Date.now(), title, start: selectInfo.startStr, status: "available" };
      const newEvents = [...events, newEvent]
      setEvents(newEvents);
      localStorage.setItem('Calender Events', JSON.stringify(newEvents))
    }

  };

  // Accept or decline meetings
  const handleEventClick = (clickInfo) => {
    const action = prompt("Type 'accept' or 'decline':");
    if (action === "accept") {
      setEvents(events.map(ev =>
        String(ev.id) === clickInfo.event.id
          ? { ...ev, status: "confirmed" }
          : ev
      ));
    } else if (action === "decline") {
      const filteredEvent = events.filter(ev => String(ev.id) !== clickInfo.event.id);
      setEvents(filteredEvent)
      localStorage.setItem('Calender Events', JSON.stringify(filteredEvent))
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">

        <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-semibold text-center mb-6">
            Meeting & Availability Calendar
          </h2>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            editable={true}
            events={events}
            select={handleDateSelect}
            eventClick={handleEventClick}
            height="auto"


            eventContent={(eventInfo) => (
              <div
                className={`px-2 py-1 rounded text-sm text-white
            ${eventInfo.event.extendedProps.status === "available"
                    ? "bg-blue-500"
                    : "bg-green-500"
                  }`}
              >
                {eventInfo.event.title}
              </div>
            )}
          />

        </div>

      </div>
    </>
  );
}

export default Calendar;