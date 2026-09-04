import UpcomingSessionItem from "./UpcomingSessionItem";

const UpcomingSessions = () => (
  <div className="app-card p-6 animate-slide-up delay-250">
    <h3 className="font-bold text-text-main text-sm mb-4">
      Upcoming Sessions
    </h3>

    <div
      className="
        space-y-3 
        text-xs 
        max-h-[300px] 
        overflow-y-auto 
        pr-2
        upcoming-sessions-scroll
      "
    >
      <UpcomingSessionItem
        title="Morning Flow"
        date="02 SEPT"
        time="07:00 am – 08:00 am"
        booked={5}
        total={10}
      />

      <UpcomingSessionItem
        title="Hatha Yoga Basics"
        date="02 SEPT"
        time="09:00 am – 10:00 am"
        booked={8}
        total={10}
      />

      <UpcomingSessionItem
        title="Hatha Yoga Basics"
        date="02 SEPT"
        time="11:00 am – 12:00 pm"
        booked={10}
        total={10}
      />

      <UpcomingSessionItem
        title="Hatha Yoga Basics"
        date="02 SEPT"
        time="04:00 pm – 05:00 pm"
        booked={0}
        total={10}
      />

      <UpcomingSessionItem
        title="Hatha Yoga Basics"
        date="02 SEPT"
        time="06:00 pm – 07:00 pm"
        booked={2}
        total={10}
      />

      <UpcomingSessionItem
        title="Power Vinyasa"
        date="03 SEPT"
        time="07:00 am – 08:00 am"
        booked={8}
        total={10}
      />

      <UpcomingSessionItem
        title="Power Vinyasa"
        date="03 SEPT"
        time="09:00 am – 10:00 am"
        booked={10}
        total={10}
      />
    </div>
  </div>
);

export default UpcomingSessions;