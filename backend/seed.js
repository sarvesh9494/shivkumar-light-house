import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true
});

const products = [
  // Fans
  { name: "Crompton Ceiling Fan", category: "Fans", price: 1200, description: "High-speed ceiling fan for living rooms.", image: "/images/fan1.jpg" },
  { name: "Orient Table Fan", category: "Fans", price: 950, description: "Table fan with oscillation feature.", image: "/images/fan2.jpg" },
  { name: "Havells Wall Fan", category: "Fans", price: 1100, description: "Wall-mounted fan for compact spaces.", image: "/images/fan3.jpg" },
  { name: "Bajaj Pedestal Fan", category: "Fans", price: 1300, description: "Adjustable height pedestal fan.", image: "/images/fan4.jpg" },
  { name: "Usha Exhaust Fan", category: "Fans", price: 700, description: "Exhaust fan for kitchens & bathrooms.", image: "/images/fan5.jpg" },

  // Bulbs
  { name: "Philips LED Bulb 9W", category: "Bulbs", price: 150, description: "Energy saving bright LED bulb.", image: "/images/bulb1.jpg" },
  { name: "Syska LED Bulb 12W", category: "Bulbs", price: 180, description: "Long life LED bulb.", image: "/images/bulb2.jpg" },
  { name: "Wipro Smart Bulb", category: "Bulbs", price: 700, description: "WiFi enabled color changing bulb.", image: "/images/bulb3.jpg" },
  { name: "Eveready CFL Bulb", category: "Bulbs", price: 100, description: "Cost-effective CFL lighting.", image: "/images/bulb4.jpg" },
  { name: "Halonix LED Bulb 7W", category: "Bulbs", price: 90, description: "Standard LED bulb for daily use.", image: "/images/bulb5.jpg" },

  // Switches
  { name: "Anchor Modular Switch", category: "Switches", price: 25, description: "Durable modular switch.", image: "/images/switch1.jpg" },
  { name: "GM Two-way Switch", category: "Switches", price: 30, description: "Two-way switch for staircases.", image: "/images/switch2.jpg" },
  { name: "Havells Bell Push", category: "Switches", price: 35, description: "Door bell push switch.", image: "/images/switch3.jpg" },
  { name: "Legrand Dimmer Switch", category: "Switches", price: 150, description: "Dimmer for light control.", image: "/images/switch4.jpg" },
  { name: "Cona Power Socket", category: "Switches", price: 45, description: "Standard 3-pin socket.", image: "/images/switch5.jpg" },

  // Wires
  { name: "Finolex Copper Wire 90m", category: "Wires", price: 1150, description: "High quality copper wiring.", image: "/images/wire1.jpg" },
  { name: "Polycab House Wire", category: "Wires", price: 950, description: "PVC insulated wire.", image: "/images/wire2.jpg" },
  { name: "Havells FR Wire", category: "Wires", price: 1250, description: "Flame retardant house wire.", image: "/images/wire3.jpg" },
  { name: "KEI Single Core Wire", category: "Wires", price: 700, description: "For lighting & power circuits.", image: "/images/wire4.jpg" },
  { name: "RR Kabel Wire Roll", category: "Wires", price: 1600, description: "Flexible copper wiring.", image: "/images/wire5.jpg" },

  // Inverters
  { name: "Luminous 900VA Inverter", category: "Inverters", price: 4500, description: "Home UPS for power backup.", image: "/images/inverter1.jpg" },
  { name: "Microtek Inverter", category: "Inverters", price: 4200, description: "Reliable inverter for homes.", image: "/images/inverter2.jpg" },
  { name: "Exide Inverter", category: "Inverters", price: 4800, description: "Inverter with LCD display.", image: "/images/inverter3.jpg" },
  { name: "Amaron Pure Sinewave", category: "Inverters", price: 5200, description: "Smooth output inverter.", image: "/images/inverter4.jpg" },
  { name: "V-Guard Inverter", category: "Inverters", price: 4000, description: "Compact & efficient inverter.", image: "/images/inverter5.jpg" },

  // Table Fans
  { name: "Crompton Table Fan", category: "Table Fans", price: 950, description: "Oscillating table fan.", image: "/images/tablefan1.jpg" },
  { name: "Bajaj Table Fan", category: "Table Fans", price: 890, description: "Silent table fan.", image: "/images/tablefan2.jpg" },
  { name: "Orient Desk Fan", category: "Table Fans", price: 980, description: "Compact table fan.", image: "/images/tablefan3.jpg" },
  { name: "Usha Table Fan", category: "Table Fans", price: 1000, description: "3 speed table fan.", image: "/images/tablefan4.jpg" },
  { name: "Khaitan Table Fan", category: "Table Fans", price: 920, description: "Sturdy & stylish.", image: "/images/tablefan5.jpg" },

  // MCBs
  { name: "Havells 10A MCB", category: "MCBs", price: 150, description: "Miniature circuit breaker.", image: "/images/mcb1.jpg" },
  { name: "Legrand MCB", category: "MCBs", price: 170, description: "Single pole MCB.", image: "/images/mcb2.jpg" },
  { name: "Schneider Electric MCB", category: "MCBs", price: 180, description: "High quality MCB.", image: "/images/mcb3.jpg" },
  { name: "Anchor MCB", category: "MCBs", price: 160, description: "Durable circuit protection.", image: "/images/mcb4.jpg" },
  { name: "Siemens MCB", category: "MCBs", price: 190, description: "Reliable protection device.", image: "/images/mcb5.jpg" },

  // Mixers
  { name: "Philips Mixer Grinder", category: "Mixers", price: 2400, description: "750W powerful motor.", image: "/images/mixer1.jpg" },
  { name: "Bajaj Mixer", category: "Mixers", price: 2200, description: "Stainless steel jars.", image: "/images/mixer2.jpg" },
  { name: "Prestige Mixer", category: "Mixers", price: 2500, description: "Durable & efficient.", image: "/images/mixer3.jpg" },
  { name: "Butterfly Mixer", category: "Mixers", price: 2300, description: "Multiple speed settings.", image: "/images/mixer4.jpg" },
  { name: "Havells Mixer", category: "Mixers", price: 2600, description: "Long lasting performance.", image: "/images/mixer5.jpg" },

  // Geysers
  { name: "Bajaj 15L Geyser", category: "Geysers", price: 4800, description: "Storage water heater.", image: "/images/geyser1.jpg" },
  { name: "AO Smith Geyser", category: "Geysers", price: 5200, description: "Energy efficient geyser.", image: "/images/geyser2.jpg" },
  { name: "Havells Instant Geyser", category: "Geysers", price: 4000, description: "Quick heating.", image: "/images/geyser3.jpg" },
  { name: "Crompton Geyser", category: "Geysers", price: 4500, description: "Durable build.", image: "/images/geyser4.jpg" },
  { name: "V-Guard Geyser", category: "Geysers", price: 4700, description: "Safe & reliable.", image: "/images/geyser5.jpg" },

  // Tubelights
  { name: "Philips LED Tubelight", category: "Tubelights", price: 350, description: "Bright & energy efficient.", image: "/images/tubelight1.jpg" },
  { name: "Syska LED Tubelight", category: "Tubelights", price: 320, description: "Long life LED tubelight.", image: "/images/tubelight2.jpg" },
  { name: "Wipro LED Tubelight", category: "Tubelights", price: 340, description: "Cool white lighting.", image: "/images/tubelight3.jpg" },
  { name: "Eveready LED Tubelight", category: "Tubelights", price: 300, description: "Cost-effective solution.", image: "/images/tubelight4.jpg" },
  { name: "Halonix LED Tubelight", category: "Tubelights", price: 330, description: "High lumen output.", image: "/images/tubelight5.jpg" },
];

async function seed() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Seeded database with products.");
  process.exit();
}

seed();
