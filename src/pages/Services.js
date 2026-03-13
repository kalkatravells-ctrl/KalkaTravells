function Services() {
  const services = [
    {
      title: "Local Taxi Service",
      icon: "🚖",
      desc: "Comfortable and affordable local taxi services for daily travel.",
    },
    {
      title: "Outstation Trips",
      icon: "🛣",
      desc: "Safe and reliable outstation trips with experienced drivers.",
    },
    {
      title: "Tour Packages",
      icon: "🏔",
      desc: "Customized Himachal and North India tour packages.",
    },
    {
      title: "Tempo Traveller",
      icon: "🚐",
      desc: "Spacious tempo travellers for family & group tours.",
    },
    {
      title: "Airport Pickup & Drop",
      icon: "✈️",
      desc: "On-time airport pickup and drop services.",
    },
    {
      title: "24x7 Service",
      icon: "🕒",
      desc: "Round-the-clock availability for your travel needs.",
    },
  ];

  return (
    <div className="container">
      <h2 className="heading">Our Services</h2>
      <p className="subheading">
        Reliable • Comfortable • Affordable Travel Solutions
      </p>

      <div className="grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
