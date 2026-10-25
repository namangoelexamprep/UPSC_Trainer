export interface RiverFeature {
  id: string;
  name: string;
  category: 'Himalayan' | 'Peninsular' | 'Coal Basin Graben';
  color: string;
  strokeWidth: number;
  points: [number, number][]; // [lon, lat]
  labelPos: [number, number];
  upscSignificance: string;
}

export interface PhysiographicZone {
  id: string;
  name: string;
  type: 'Mountain' | 'Plateau' | 'Desert' | 'Plains' | 'Ghats';
  fillColor: string;
  strokeColor: string;
  polygon: [number, number][]; // [lon, lat]
  labelPos: [number, number];
  notes: string;
}

export interface InfrastructureOverlay {
  id: string;
  name: string;
  type: 'DFC' | 'PIPELINE' | 'WATERWAY' | 'HIGHWAY';
  color: string;
  strokeWidth?: number;
  strokeDash?: string;
  points: [number, number][]; // [lon, lat]
  labelPos: [number, number];
  keyHubs: { name: string; lon: number; lat: number }[];
  upscSignificance: string;
}

/**
 * 1. Physical Geography: Major Indian Rivers & Basins
 * Accurately traced based on Survey of India / GSI coordinates.
 */
export const MAJOR_RIVERS: RiverFeature[] = [
  {
    id: 'damodar',
    name: 'Damodar River',
    category: 'Coal Basin Graben',
    color: '#0284C7',
    strokeWidth: 3.5,
    points: [
      [84.9, 23.65],
      [85.5, 23.75],
      [85.95, 23.78], // Bokaro
      [86.41, 23.74], // Jharia
      [87.12, 23.62], // Raniganj
      [87.5, 23.2],
      [87.85, 22.8],
      [88.1, 22.3]   // Meets Hooghly
    ],
    labelPos: [86.7, 23.85],
    upscSignificance: 'The Ruhr Valley of India: Anchors Gondwana coking coalfields (Jharia, Bokaro, Raniganj) and DVC dams.'
  },
  {
    id: 'ganga',
    name: 'Ganga',
    category: 'Himalayan',
    color: '#0369A1',
    strokeWidth: 4,
    points: [
      [78.6, 30.15], // Devprayag
      [78.16, 29.95], // Haridwar
      [79.8, 28.1],
      [80.35, 26.46], // Kanpur
      [81.85, 25.43], // Prayagraj
      [83.0, 25.3],   // Varanasi
      [85.14, 25.6],  // Patna
      [87.9, 24.8],   // Farakka Barrage
      [88.35, 22.57]  // Hooghly Kolkata
    ],
    labelPos: [82.5, 26.1],
    upscSignificance: 'India’s longest national river (2,525 km); anchors NW-1 and the Indo-Gangetic alluvial wheat-rice belt.'
  },
  {
    id: 'yamuna',
    name: 'Yamuna',
    category: 'Himalayan',
    color: '#0284C7',
    strokeWidth: 2.8,
    points: [
      [78.45, 31.01], // Yamunotri
      [77.2, 28.61],  // Delhi
      [77.7, 27.5],   // Mathura
      [78.0, 27.18],  // Agra
      [81.85, 25.43]  // Confluence at Triveni Sangam Prayagraj
    ],
    labelPos: [78.2, 28.0],
    upscSignificance: 'Major right-bank tributary of Ganga; passes through Taj Trapezium Zone and National Capital Region.'
  },
  {
    id: 'brahmaputra',
    name: 'Brahmaputra',
    category: 'Himalayan',
    color: '#0284C7',
    strokeWidth: 4.5,
    points: [
      [95.3, 28.1], // Sadiya (Arunachal/Assam border)
      [94.9, 27.5], // Dibrugarh (near Digboi/Makum)
      [91.7, 26.2], // Guwahati
      [90.0, 26.0], // Dhubri
      [89.7, 25.2]  // Turn into Bangladesh (Jamuna)
    ],
    labelPos: [93.2, 26.8],
    upscSignificance: 'Braided river carrying massive silt load; anchors Majuli (world’s largest river island) and Kaziranga floodplains.'
  },
  {
    id: 'indus',
    name: 'Indus & Tributaries',
    category: 'Himalayan',
    color: '#0284C7',
    strokeWidth: 3.2,
    points: [
      [79.0, 32.5],
      [77.5, 34.1], // Leh / Ladakh
      [76.0, 34.9],
      [74.5, 35.5]
    ],
    labelPos: [76.8, 34.6],
    upscSignificance: 'Antecedent trans-Himalayan drainage governed by the 1960 Indus Waters Treaty (IWT) brokered by the World Bank.'
  },
  {
    id: 'narmada',
    name: 'Narmada',
    category: 'Peninsular',
    color: '#0284C7',
    strokeWidth: 3.2,
    points: [
      [81.75, 22.67], // Amarkantak
      [79.95, 23.16], // Jabalpur (Marble Rocks)
      [77.0, 22.3],
      [75.5, 22.0],
      [73.7, 21.8],   // Sardar Sarovar Dam
      [72.6, 21.65]   // Gulf of Khambhat
    ],
    labelPos: [76.5, 22.5],
    upscSignificance: 'Flows westwards in a fault rift valley between Vindhya and Satpura ranges; does not form a delta, forms an estuary.'
  },
  {
    id: 'tapi',
    name: 'Tapi (Tapti)',
    category: 'Peninsular',
    color: '#0284C7',
    strokeWidth: 2.5,
    points: [
      [78.2, 21.8], // Multai (Betul, MP)
      [76.2, 21.3],
      [74.5, 21.2],
      [73.1, 21.2], // Ukai Dam / Kakrapar Nuclear Plant
      [72.7, 21.1]  // Surat / Arabian Sea
    ],
    labelPos: [75.2, 21.5],
    upscSignificance: 'Twin rift-valley river to Narmada; powers Ukai multipurpose dam and Kakrapar 700 MWe nuclear reactors.'
  },
  {
    id: 'mahanadi',
    name: 'Mahanadi & Ib',
    category: 'Peninsular',
    color: '#0284C7',
    strokeWidth: 3.5,
    points: [
      [81.9, 20.6], // Sihawa (Dhamtari, Chhattisgarh)
      [82.6, 21.5],
      [83.8, 21.5], // Confluence with Ib river & Hirakud Dam
      [84.8, 20.9],
      [85.8, 20.4], // Cuttack
      [86.7, 20.3]  // Paradip Delta into Bay of Bengal
    ],
    labelPos: [84.2, 21.1],
    upscSignificance: 'Drains Chhattisgarh basin and Odisha; holds Hirakud Dam (longest earthen dam in the world) and Talcher coal basin.'
  },
  {
    id: 'godavari',
    name: 'Godavari (Dakshin Ganga)',
    category: 'Peninsular',
    color: '#0284C7',
    strokeWidth: 3.5,
    points: [
      [73.5, 19.9], // Trimbakeshwar (Nashik, Western Ghats)
      [76.5, 19.0],
      [78.5, 18.9],
      [79.8, 18.8], // Pranhita confluence (near Singareni / Kothagudem)
      [81.8, 17.0], // Rajahmundry
      [82.3, 16.7]  // Bay of Bengal
    ],
    labelPos: [77.8, 19.4],
    upscSignificance: 'Peninsular India’s longest river (1,465 km); drains the Pranhita-Godavari Gondwana graben and Krishna-Godavari (KG) gas basin.'
  },
  {
    id: 'krishna',
    name: 'Krishna',
    category: 'Peninsular',
    color: '#0284C7',
    strokeWidth: 3.2,
    points: [
      [73.7, 17.9], // Mahabaleshwar (Maharashtra)
      [76.0, 16.5],
      [77.3, 16.3], // Confluence with Tungabhadra
      [79.3, 16.5], // Nagarjuna Sagar Dam
      [80.6, 16.5], // Vijayawada
      [81.0, 15.8]  // Andhra Delta
    ],
    labelPos: [77.5, 17.0],
    upscSignificance: 'Second largest east-flowing peninsular river; major river water dispute between Maharashtra, Karnataka, Telangana, and AP.'
  },
  {
    id: 'cauvery',
    name: 'Cauvery (Kaveri)',
    category: 'Peninsular',
    color: '#0284C7',
    strokeWidth: 3,
    points: [
      [75.5, 12.4], // Talakaveri (Kodagu, Western Ghats)
      [76.5, 12.3], // Krishnarajasagara Dam (KRS)
      [77.7, 11.8], // Mettur Dam
      [78.7, 10.8], // Tiruchirappalli
      [79.8, 11.2]  // Thanjavur Granary Delta / Poompuhar
    ],
    labelPos: [77.6, 11.3],
    upscSignificance: 'Perennial peninsular river receiving both SW and retreating NE monsoons; delta basin is rich in Tertiary lignite (Neyveli).'
  }
];

/**
 * 2. Major Physiographic Zones of India (Relief & Geological Provinces)
 */
export const PHYSIOGRAPHIC_ZONES: PhysiographicZone[] = [
  {
    id: 'himalayas',
    name: 'Himalayan Orogenic Belt',
    type: 'Mountain',
    fillColor: 'rgba(120, 80, 40, 0.12)',
    strokeColor: '#8D6E63',
    polygon: [
      [73.5, 36.5],
      [77.0, 35.5],
      [80.5, 30.5],
      [88.5, 27.5],
      [97.0, 28.5],
      [95.5, 27.0],
      [88.0, 26.5],
      [80.0, 29.5],
      [74.0, 33.0]
    ],
    labelPos: [81.5, 31.8],
    notes: 'Young fold mountain belt resulting from Indian-Eurasian plate collision; tertiary folding and seismic hazard zone V.'
  },
  {
    id: 'indogangetic',
    name: 'Indo-Gangetic-Brahmaputra Plains',
    type: 'Plains',
    fillColor: 'rgba(46, 125, 50, 0.10)',
    strokeColor: '#4CAF50',
    polygon: [
      [74.5, 31.0],
      [77.5, 29.5],
      [85.0, 26.5],
      [90.0, 25.5],
      [88.5, 22.5],
      [83.0, 24.5],
      [77.0, 27.0],
      [73.5, 28.5]
    ],
    labelPos: [80.5, 27.2],
    notes: 'Deep foredeep alluvial basin filled with Pleistocene to Recent sediments; heartland of intensive agriculture.'
  },
  {
    id: 'chhotanagpur',
    name: 'Chhota Nagpur Mineral Heartland',
    type: 'Plateau',
    fillColor: 'rgba(230, 81, 0, 0.14)',
    strokeColor: '#E65100',
    polygon: [
      [84.0, 24.5],
      [87.0, 24.5],
      [87.5, 22.5],
      [84.5, 22.5]
    ],
    labelPos: [85.8, 23.4],
    notes: 'Ruhr of India: Precambrian crystalline craton bisected by Damodar Gondwana graben (Jharia, Bokaro, Singhbhum iron ore).'
  },
  {
    id: 'western_ghats',
    name: 'Western Ghats (Sahyadri)',
    type: 'Ghats',
    fillColor: 'rgba(30, 136, 229, 0.12)',
    strokeColor: '#1976D2',
    polygon: [
      [73.2, 20.8],
      [74.0, 18.0],
      [75.0, 14.5],
      [76.8, 10.0],
      [77.5, 8.4],
      [77.2, 8.4],
      [76.0, 10.5],
      [74.0, 15.0],
      [73.0, 18.5]
    ],
    labelPos: [74.5, 15.5],
    notes: 'UNESCO World Natural Heritage bio-diversity hotspot; fault-scarp escarpment blocking SW monsoon winds.'
  },
  {
    id: 'thar_desert',
    name: 'Thar Desert (Marusthali)',
    type: 'Desert',
    fillColor: 'rgba(255, 179, 0, 0.15)',
    strokeColor: '#FFA000',
    polygon: [
      [70.0, 28.0],
      [73.0, 28.5],
      [73.5, 26.0],
      [71.0, 24.5],
      [69.5, 26.0]
    ],
    labelPos: [71.5, 26.8],
    notes: 'Arid sandy desert concealing underlying Mesozoic-Tertiary marine sediments with Palana lignite and Barmer crude oil.'
  }
];

/**
 * 3. Major Infrastructure Overlays: Dedicated Freight Corridors (DFC), Gas Grid, & Waterways
 */
export const INFRASTRUCTURE_OVERLAYS: InfrastructureOverlay[] = [
  {
    id: 'edfc',
    name: 'Eastern Dedicated Freight Corridor (EDFC)',
    type: 'DFC',
    color: '#D97706', // Amber gold
    strokeWidth: 4,
    points: [
      [75.85, 30.9], // Ludhiana (Punjab)
      [76.8, 29.9],  // Ambala
      [77.7, 28.2],  // Khurja (UP)
      [80.3, 26.4],  // Kanpur
      [83.1, 25.2],  // Mughalsarai (Pt. DD Upadhyaya)
      [84.4, 24.8],  // Sonnagar (Bihar)
      [88.3, 22.7]   // Dankuni (Kolkata, WB)
    ],
    labelPos: [81.5, 26.0],
    keyHubs: [
      { name: 'Ludhiana', lon: 75.85, lat: 30.9 },
      { name: 'Khurja Hub', lon: 77.7, lat: 28.2 },
      { name: 'Kanpur', lon: 80.3, lat: 26.4 },
      { name: 'Dankuni', lon: 88.3, lat: 22.7 }
    ],
    upscSignificance: 'Dedicated electrified double-track freight railway (1,875 km) moving heavy coal from eastern mines to northern power plants.'
  },
  {
    id: 'wdfc',
    name: 'Western Dedicated Freight Corridor (WDFC)',
    type: 'DFC',
    color: '#2563EB', // Royal blue
    strokeWidth: 4,
    points: [
      [77.55, 28.53], // Dadri (UP)
      [76.6, 28.2],   // Rewari (Haryana)
      [75.7, 26.9],   // Phulera / Jaipur (Rajasthan)
      [72.4, 24.2],   // Palanpur (Gujarat)
      [73.2, 22.3],   // Vadodara
      [72.9, 18.9]    // JNPT (Navi Mumbai)
    ],
    labelPos: [74.5, 24.8],
    keyHubs: [
      { name: 'Dadri Hub', lon: 77.55, lat: 28.53 },
      { name: 'Rewari', lon: 76.6, lat: 28.2 },
      { name: 'Vadodara', lon: 73.2, lat: 22.3 },
      { name: 'JNPT Port', lon: 72.9, lat: 18.9 }
    ],
    upscSignificance: 'High-axle-load double-stack container freight corridor (1,506 km) connecting Delhi-NCR to Gujarat & JNPT maritime ports.'
  },
  {
    id: 'hvj_pipeline',
    name: 'National Gas Grid (HVJ & Urja Ganga)',
    type: 'PIPELINE',
    color: '#DC2626', // Red
    strokeDash: '6,4',
    strokeWidth: 3.2,
    points: [
      [72.8, 21.1], // Hazira (Gujarat Coast)
      [77.3, 24.2], // Vijaipur (Guna, MP)
      [81.6, 26.6], // Jagdishpur (UP)
      [83.0, 25.3], // Varanasi
      [85.9, 23.8], // Bokaro Steel City
      [87.9, 22.0]  // Haldia / Dhamra Port
    ],
    labelPos: [78.5, 24.8],
    keyHubs: [
      { name: 'Hazira', lon: 72.8, lat: 21.1 },
      { name: 'Vijaipur', lon: 77.3, lat: 24.2 },
      { name: 'Jagdishpur', lon: 81.6, lat: 26.6 },
      { name: 'Bokaro', lon: 85.9, lat: 23.8 }
    ],
    upscSignificance: 'Pivotal natural gas arterial pipeline network connecting western LNG ports and domestic CBM to fertilizer and city gas distribution.'
  },
  {
    id: 'nw1_waterway',
    name: 'National Waterway 1 (NW-1 Ganga)',
    type: 'WATERWAY',
    color: '#0D9488', // Teal
    strokeDash: '8,4',
    strokeWidth: 3.5,
    points: [
      [81.85, 25.43], // Prayagraj
      [83.0, 25.3],   // Varanasi Multi-Modal Terminal
      [85.14, 25.6],  // Patna (Gaighat Terminal)
      [87.5, 25.0],   // Sahibganj Multi-Modal Terminal
      [88.35, 22.57], // Kolkata
      [88.08, 22.05]  // Haldia Port
    ],
    labelPos: [85.5, 25.0],
    keyHubs: [
      { name: 'Prayagraj', lon: 81.85, lat: 25.43 },
      { name: 'Varanasi MMT', lon: 83.0, lat: 25.3 },
      { name: 'Sahibganj MMT', lon: 87.5, lat: 25.0 },
      { name: 'Haldia', lon: 88.08, lat: 22.05 }
    ],
    upscSignificance: 'Inland Waterways Authority of India (IWAI) flagship (1,620 km) developed under World Bank assisted Jal Marg Vikas Project.'
  }
];

export interface CoalBasinFeature {
  id: string;
  name: string;
  type: 'Gondwana Coking' | 'Gondwana Non-Coking' | 'Tertiary Lignite';
  color: string;
  strokeColor: string;
  polygon: [number, number][]; // [lon, lat]
  labelPos: [number, number];
  notes: string;
}

/**
 * 4. Gondwana Coal Basins & Tertiary Lignite Overlays
 */
export const COAL_BASINS: CoalBasinFeature[] = [
  {
    id: 'damodar_coal',
    name: 'Damodar Gondwana Rift Basin (Jharia-Raniganj-Bokaro)',
    type: 'Gondwana Coking',
    color: 'rgba(217, 119, 6, 0.22)',
    strokeColor: '#D97706',
    polygon: [
      [84.5, 24.1],
      [87.3, 23.9],
      [87.4, 23.4],
      [84.6, 23.5]
    ],
    labelPos: [86.0, 23.7],
    notes: 'The Ruhr of India: Prime metallurgical coking coal seams in Permian Barakar & Raniganj formations (BCCL & ECL).'
  },
  {
    id: 'godavari_coal',
    name: 'Pranhita-Godavari Coal Rift (Singareni-Kothagudem-Ramagundam)',
    type: 'Gondwana Non-Coking',
    color: 'rgba(71, 85, 105, 0.25)',
    strokeColor: '#334155',
    polygon: [
      [78.8, 19.8],
      [80.8, 17.8],
      [80.2, 17.2],
      [78.4, 19.2]
    ],
    labelPos: [79.6, 18.2],
    notes: 'Singareni Collieries (SCCL) belt in Telangana feeding NTPC Ramagundam, Kothagudem, and Kakatiya thermal power stations.'
  },
  {
    id: 'mahanadi_son_coal',
    name: 'Son-Mahanadi Coal Basin (Talcher-Singrauli-Korba)',
    type: 'Gondwana Non-Coking',
    color: 'rgba(234, 88, 12, 0.20)',
    strokeColor: '#EA580C',
    polygon: [
      [81.5, 24.5],
      [85.8, 21.8],
      [85.2, 20.6],
      [81.8, 22.0]
    ],
    labelPos: [83.5, 22.5],
    notes: 'Massive thermal power non-coking reserves across MP, Chhattisgarh & Odisha powering NTPC mega-plants.'
  },
  {
    id: 'neyveli_lignite',
    name: 'Neyveli Tertiary Lignite Basin (Cuddalore, TN)',
    type: 'Tertiary Lignite',
    color: 'rgba(120, 53, 15, 0.25)',
    strokeColor: '#78350F',
    polygon: [
      [79.2, 11.8],
      [79.8, 11.8],
      [79.8, 11.2],
      [79.2, 11.2]
    ],
    labelPos: [79.5, 11.5],
    notes: 'South Asia’s largest brown coal deposit (>80% of Indian lignite) operated by NLC India with pithead thermal stations.'
  },
  {
    id: 'palana_lignite',
    name: 'Palana-Barmer Tertiary Lignite Belt (Rajasthan)',
    type: 'Tertiary Lignite',
    color: 'rgba(180, 83, 9, 0.20)',
    strokeColor: '#B45309',
    polygon: [
      [71.0, 28.2],
      [73.8, 28.2],
      [73.8, 25.5],
      [71.0, 25.5]
    ],
    labelPos: [72.5, 27.2],
    notes: 'Eocene-Miocene lignite deposits in Bikaner & Barmer utilized for desert thermal power.'
  }
];

