const defaultRooms = [
  {
    id: 1,
    name: "Quarto Standard",
    description: "Cama de casal, Wi-Fi e ar-condicionado",
    price: 180,
    image: "https://picsum.photos/300/200?random=101"
  },
  {
    id: 2,
    name: "Suíte Luxo",
    description: "Vista panorâmica, banheira e varanda",
    price: 320,
    image: "https://picsum.photos/300/200?random=102"
  }
];

const hotelsMock = [
  {
    id: 1,
    name: "Hotel Central Plaza",
    city: "São Paulo",
    pricePerNight: 320,
    image: "https://images.unsplash.com/photo-1501117716987-c8e2a1c49f3c",
    description: "Hotel confortável no centro da cidade.",
    rooms: defaultRooms
  },
  {
    id: 2,
    name: "Hotel Paulista Executive",
    city: "São Paulo",
    pricePerNight: 410,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Ideal para viagens de negócios.",
    rooms: defaultRooms
  },
  {
    id: 3,
    name: "Hotel Praia Azul",
    city: "Rio de Janeiro",
    pricePerNight: 450,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    description: "Vista para o mar e piscina.",
    rooms: defaultRooms
  },
  {
    id: 4,
    name: "Hotel Copacabana Palace",
    city: "Rio de Janeiro",
    pricePerNight: 980,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    description: "Hotel de luxo à beira-mar.",
    rooms: defaultRooms
  },
  {
    id: 5,
    name: "Hotel Serra Verde",
    city: "Campos do Jordão",
    pricePerNight: 280,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    description: "Clima de montanha e tranquilidade.",
    rooms: defaultRooms
  },
  {
    id: 6,
    name: "Hotel Alpino",
    city: "Campos do Jordão",
    pricePerNight: 360,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    description: "Arquitetura europeia e lareira.",
    rooms: defaultRooms
  },
  {
    id: 7,
    name: "Hotel Beira Lago",
    city: "Brasília",
    pricePerNight: 300,
    image: "https://images.unsplash.com/photo-1519821172141-b5d8f8f6f1b8",
    description: "Vista privilegiada do lago.",
    rooms: defaultRooms
  },
  {
    id: 8,
    name: "Hotel Capital Premium",
    city: "Brasília",
    pricePerNight: 420,
    image: "https://images.unsplash.com/photo-1560448075-bb4f6d0b6cfc",
    description: "Conforto e localização estratégica.",
    rooms: defaultRooms
  },
  {
    id: 9,
    name: "Hotel Sol Nascente",
    city: "Natal",
    pricePerNight: 390,
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659",
    description: "Pé na areia e café da manhã incluso.",
    rooms: defaultRooms
  },
  {
    id: 10,
    name: "Hotel Dunas Resort",
    city: "Natal",
    pricePerNight: 520,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Resort completo para famílias.",
    rooms: defaultRooms
  }
];

// gera automaticamente até 50 hotéis
for (let i = 11; i <= 50; i++) {
  hotelsMock.push({
    id: i,
    name: `Hotel Confort ${i}`,
    city: ["São Paulo", "Rio de Janeiro", "Curitiba", "Florianópolis", "Salvador"][i % 5],
    pricePerNight: 200 + i * 10,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Hotel confortável, ideal para lazer ou negócios.",
    rooms: [
      {
        id: 1,
        name: "Quarto Standard",
        description: "Cama de casal e Wi-Fi",
        price: 160 + i,
        image: `https://picsum.photos/300/200?random=${i}1`
      },
      {
        id: 2,
        name: "Suíte Luxo",
        description: "Mais espaço e conforto",
        price: 260 + i,
        image: `https://picsum.photos/300/200?random=${i}2`
      }
    ]
  });
}

export default hotelsMock;
