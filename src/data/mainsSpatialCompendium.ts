import { MainsModelAnswer } from '../types';

/**
 * UPSC Civil Services Mains (GS Paper 1 & GS Paper 3)
 * Comprehensive Geospatial Model Answers Compendium (2013 - 2024)
 * High-Scoring Topper Formats: Structuring with Headings, Value Addition Maps,
 * Government Policies (Gati Shakti, NITI Aayog), and Forward-Looking Conclusions.
 */

export const MAINS_MODEL_ANSWERS: MainsModelAnswer[] = [
  // -------------------------------------------------------------------------
  // QUESTION 1: CONTINENTAL DRIFT & GONDWANA MINERAL WEALTH
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2024-01',
    year: 2024,
    paper: 'GS Paper 1',
    topicTheme: 'Geomorphology & Mineral Distribution',
    question: 'How did the breakup of Gondwanaland shape the current physiography and strategic mineral endowment of Peninsular India? Illustrate with a sketch map.',
    wordLimit: 250,
    marks: 15,
    introduction: 'Peninsular India constitutes an ancient, stable shield (cratonic core) that formed part of the southern supercontinent Gondwanaland until its fragmentation began during the Late Jurassic epoch (~160–140 Ma). The northward transit of the Indian Plate over the Marion and Réunion hotspots, coupled with rifting and subsidence, fundamentally dictated India\'s structural grabens, drainage reversal, and immense mineral wealth.',
    coreBodyPoints: [
      {
        heading: '1. Rifting, Graben Sinking & Gondwana Coal Basins',
        points: [
          'Tectonic sag and graben down-faulting along ancient suture zones created linear sedimentary troughs (Damodar, Mahanadi, Son, and Pranhita-Godavari grabens).',
          'Prolific sedimentation and subsequent subsidence preserved dense Permo-Carboniferous swamp forests under massive sandstone overburden (~250 Ma), yielding over 98% of India\'s coal reserves (Jharia, Raniganj, Bokaro, Singrauli, Talcher).',
          'Absence of major post-Permian folding prevented regional metamorphism, preserving metallurgical prime coking and thermal bituminous ranks in Gondwana deposits.'
        ]
      },
      {
        heading: '2. Marion & Réunion Hotspot Transits: The Deccan Basaltic Trap',
        points: [
          'During the Cretaceous-Paleogene boundary (~65 Ma), the Indian plate traversed the Réunion mantle plume, triggering catastrophic flood basalt eruptions (Deccan Traps covering >500,000 km²).',
          'Extensive subaerial weathering of these tholeiitic basalts under tropical monsoon climates facilitated bauxitization and lateritization (Kolhapur, Ratnagiri, Belagavi, Amarkantak, and the Maikal Hills).',
          'Weathering of volcanic traps generated moisture-retentive Regur (black cotton soil), transforming western and central peninsular agriculture.'
        ]
      },
      {
        heading: '3. Western Ghats Escarpment & Drainage Reversal',
        points: [
          'The detachment of the Seychelles and Madagascar micro-plates (~88–65 Ma) caused crustal faulting along the western coastline, creating the steep Western Ghats (Sahyadri) fault-line scarp.',
          'Subsequent eastward tilting of the Peninsular block dictated the predominantly eastward drainage of major river systems (Godavari, Krishna, Cauvery, Mahanadi), while forcing Narmada and Tapi into linear structural rift valleys.'
        ]
      },
      {
        heading: '4. Ancient Archean-Proterozoic Mineral Belts',
        points: [
          'Pre-breakup cratonic sutures (Dharwar, Bastar, Singhbhum, Aravalli cratons) host world-class banded iron formations (BIFs) in Noamundi, Chiria, Bailadila, and Kudremukh.',
          'Copper-lead-zinc sulfidic mineralizations (Khetri, Malanjkhand) and pegmatitic mica belts (Koderma) represent deeply eroded roots of Precambrian mobile belts preserved across the Gondwanan shield.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw a V-shaped Peninsular India outline. Mark the 4 Radiating Gondwana Coal Grabens (Damodar, Son, Mahanadi, Godavari). Shade the Deccan Trap basaltic region in the northwest. Mark the Western Ghats fault scarp and eastward drainage arrows for Godavari and Krishna. Indicate Bailadila, Jharia, and Khetri nodes.',
    associatedCoordinates: [
      { placeName: 'Jharia Coalfield', state: 'Jharkhand', lat: 23.742, lon: 86.413, note: 'Primary coking coal basin in Damodar graben' },
      { placeName: 'Bailadila Iron Ore Belt', state: 'Chhattisgarh', lat: 18.665, lon: 81.242, note: 'High-grade hematite deposits in Bastar Craton' },
      { placeName: 'Amarkantak Bauxite Plateau', state: 'Madhya Pradesh', lat: 22.674, lon: 81.761, note: 'Lateritic bauxite cap on Deccan basalts' },
      { placeName: 'Singrauli Coal Basin', state: 'Madhya Pradesh', lat: 24.198, lon: 82.664, note: 'Thickest coal seam in Son graben' }
    ],
    governmentSchemesAndPolicies: [
      'National Mineral Exploration Policy (NMEP) for deep-seated & critical minerals',
      'Pradhan Mantri Khanij Kshetra Kalyan Yojana (PMKKKY) via District Mineral Foundations (DMF)',
      'Coal Mines (Special Provisions) Act and commercial captive block auctions'
    ],
    conclusion: 'The Gondwana heritage and post-rift tectonic evolution underpin India\'s self-reliance (Atmanirbharta) in core industrial metallurgy and energy security. Transitioning to sustainable exploration requires balancing mineral extraction with environmental integrity under the Forest Rights Act and UN SDG 12 (Responsible Consumption and Production).',
    syllabusKeywords: [
      'Gondwanaland',
      'Damodar Graben',
      'Deccan Traps',
      'Marion Hotspot',
      'Banded Iron Formation',
      'Fault Scarp',
      'Eastward Tilt',
      'Bauxitization'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 2: WESTERN GHATS ECOLOGICAL SENSITIVITY & WATER DIVIDE
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2023-01',
    year: 2023,
    paper: 'GS Paper 1',
    topicTheme: 'Biogeography & Environmental Governance',
    question: 'The Western Ghats act as the principal water tower and biodiversity repository of Peninsular India, yet they face severe ecological degradation. Critically analyze the challenges and examine the recommendations of the Gadgil and Kasturirangan committees.',
    wordLimit: 250,
    marks: 15,
    introduction: 'Stretching 1,600 km from the Tapi valley to Kanyakumari across six states, the Western Ghats (Sahyadris) represent one of the world\'s eight "hottest biodiversity hotspots" and a UNESCO World Heritage site. Functioning as the asymmetrical water divide of South India, they intercept the Arabian Sea branch of the southwest monsoon, recharging river basins that sustain over 245 million people.',
    coreBodyPoints: [
      {
        heading: '1. Strategic Ecological & Hydrological Significance',
        points: [
          'Orgraphic Lifeline: Intercepts maritime monsoon winds, precipitating up to 3,000–5,000 mm of annual rainfall that nourishes the headwaters of the Godavari, Krishna, Cauvery, Tungabhadra, Netravati, and Periyar rivers.',
          'Biodiversity & Endemism: Harbors >5,000 vascular plant species (over 30% endemic), key flagship fauna (Nilgiri Tahr, Lion-tailed Macaque, Asian Elephant), and vital shola-grassland hydrological sponges.'
        ]
      },
      {
        heading: '2. Drivers of Ecological Fragmentation',
        points: [
          'Linear Infrastructure & Quarrying: Unregulated stone quarrying, road widening, and railway cutting destabilize steep debris slopes, amplifying catastrophic landslides (e.g. Wayanad 2024, Pettimudi 2020, Kodagu 2018).',
          'Monoculture Plantations: Conversion of native evergreen shola forests into monoculture plantations (rubber, eucalyptus, tea, acacia) impairs soil moisture retention and elevates runoff velocity.',
          'Hydropower & Reservoir Inundation: Large storage dams disrupt riverine longitudinal connectivity, submerging pristine biodiversity valleys (e.g., historical Silent Valley movement).'
        ]
      },
      {
        heading: '3. Gadgil Committee (WGEEP, 2011) vs. Kasturirangan Committee (HLWG, 2013)',
        points: [
          'Ecological Zoning: Madhav Gadgil recommended declaring the ENTIRE Western Ghats (100%) as an Ecologically Sensitive Area (ESA), divided into ESZ-1, ESZ-2, and ESZ-3 with bottom-up democratic Gram Sabha clearance.',
          'Pragmatic Compromise: Dr. K. Kasturirangan scaled down the ESA boundary to ~37% (natural landscape), excluding human cultural landscapes (plantations, settlements), while banning red-category industries, mining, and thermal power.',
          'State Resistance: Both reports encountered political resistance from riparian states citing constraints on agricultural livelihoods, infrastructure development, and local land rights.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline of Peninsular India. Mark the continuous Western Ghats ridge from Gujarat to Kerala. Highlight the Palghat Gap, Thal Ghat, and Bhor Ghat. Sketch the origins of Godavari (Trimbakeshwar), Krishna (Mahabaleshwar), and Cauvery (Talakaveri) flowing eastward. Demarcate Nilgiri and Agasthyamala Biosphere Reserves.',
    associatedCoordinates: [
      { placeName: 'Talakaveri (Cauvery Origin)', state: 'Karnataka', lat: 12.385, lon: 75.489, note: 'Brahmagiri range origin of Cauvery River' },
      { placeName: 'Silent Valley National Park', state: 'Kerala', lat: 11.082, lon: 76.452, topicId: 'national_parks', note: 'Pristine rainforest saved from hydroelectric dam' },
      { placeName: 'Palghat Gap', state: 'Kerala', lat: 10.786, lon: 76.654, topicId: 'mountain_passes', note: '30 km structural break in southern Sahyadris' },
      { placeName: 'Wayanad Landslide Ridge', state: 'Kerala', lat: 11.583, lon: 76.134, note: 'High fragility slope affected by torrential cloudburst debris flows' }
    ],
    governmentSchemesAndPolicies: [
      'MoEFCC Draft Notification on Ecologically Sensitive Areas (ESA) in Western Ghats',
      'National Disaster Management Authority (NDMA) National Landslide Risk Management Strategy',
      'Compensatory Afforestation Fund Management and Planning Authority (CAMPA)'
    ],
    conclusion: 'Safeguarding the Western Ghats requires transcending bureaucratic boundaries through a dedicated Western Ghats Ecology Authority. Adopting Nature-based Solutions (NbS), strict enforcement of landslide zonation maps, and eco-compensation for indigenous dwellers are critical to preserving peninsular India\'s water security (UN SDG 6 and 15).',
    syllabusKeywords: [
      'Water Divide',
      'Shola-Grassland',
      'Ecologically Sensitive Area',
      'Gadgil Committee',
      'Kasturirangan Committee',
      'Orographic Rainfall',
      'Palghat Gap',
      'Slope Stability'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 3: RIVER INTERLINKING & THE NATIONAL PERSPECTIVE PLAN
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2023-02',
    year: 2023,
    paper: 'GS Paper 1 & 3',
    topicTheme: 'Hydrological Planning & Spatial Equity',
    question: 'Critically assess the spatial feasibility, economic viability, and ecological trade-offs of the National River Linking Project (NRLP) in India with special reference to the Ken-Betwa Link.',
    wordLimit: 250,
    marks: 15,
    introduction: 'Conceived under the National Water Development Agency (NWDA) in 1980, the National River Linking Project (NRLP) envisions the inter-basin transfer of water from "surplus" river basins to drought-prone "deficit" tracts. Comprising 30 links (14 Himalayan and 16 Peninsular components), it aims to transfer ~174 billion cubic metres of water, expand irrigation by 35 million hectares, and generate 34,000 MW of hydroelectric power.',
    coreBodyPoints: [
      {
        heading: '1. Spatial Rationale & Regional Water Equity',
        points: [
          'Addressing Spatial Mismatch: India receives 75% of its precipitation during just 4 monsoon months, with heavy geographic disparities (Brahmaputra basin holds 32% of runoff with 6% of land, while western/peninsular basins face acute aridity).',
          'Drought Mitigation: Channels water to chronologically drought-stricken regions like Bundelkhand, Marathwada, Rayalaseema, and Saurashtra.',
          'Flood Moderation: Regulates peak discharges in flood-prone basins (Ganga, Brahmaputra, Mahanadi, Kosi).'
        ]
      },
      {
        heading: '2. Case Study: The Ken-Betwa Link Project (KBLP)',
        points: [
          'Configuration: Involves constructing the Daudhan Dam on the Ken River and a 221 km canal to convey surplus water from the Ken basin to the Betwa basin in Bundelkhand (UP and MP).',
          'Benefits: Provides annual irrigation to 10.62 lakh hectares, drinking water to 62 lakh people, and 103 MW of hydropower.',
          'Ecological Concerns: Submerges ~6,017 hectares of forest land, including ~4,141 hectares inside the core and buffer of the Panna Tiger Reserve, fragmenting tiger breeding corridors.'
        ]
      },
      {
        heading: '3. Systemic Ecological & Geomorphological Risks',
        points: [
          'Questionable "Surplus" Concept: Terming a basin "surplus" overlooks ecological flow requirements (e-flows), estuarine salinity balance, and sediment replenishment in downstream deltas (e.g. mangrove starvation).',
          'Inter-State Federal Friction: Water is a State Subject (Entry 17, List II). Riparian states frequently dispute surplus calculations (e.g., Odisha on Mahanadi-Godavari, Karnataka-Tamil Nadu on Cauvery-Vaigai).',
          'Energy & Carbon Intensity: Pumping water across elevated ridges (e.g. Deccan water divide) requires massive electricity consumption, contradicting net-zero decarbonization goals.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline map of India. Plot the Ken-Betwa link across MP and UP with the Daudhan Dam. Mark the Panna Tiger Reserve boundary. Show the Godavari-Krishna link (Pattiseema canal) in Andhra Pradesh, and the proposed Mahanadi-Godavari and Par-Tapi-Narmada links.',
    associatedCoordinates: [
      { placeName: 'Daudhan Dam (Ken River)', state: 'Madhya Pradesh', lat: 24.622, lon: 79.886, note: 'Ken-Betwa link reservoir site inside Bundelkhand' },
      { placeName: 'Panna National Park & Tiger Reserve', state: 'Madhya Pradesh', lat: 24.724, lon: 80.002, topicId: 'tiger_reserves', note: 'Critical tiger breeding habitat affected by submergence' },
      { placeName: 'Pattiseema Lift Irrigation', state: 'Andhra Pradesh', lat: 17.152, lon: 81.603, note: 'Operational Godavari-Krishna inter-basin transfer canal' }
    ],
    governmentSchemesAndPolicies: [
      'National Water Policy (NWP) emphasizing demand-side water management',
      'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) - Har Khet Ko Pani',
      'Jal Jeevan Mission (JJM) for rural piped drinking water coverage'
    ],
    conclusion: 'Rather than solely relying on mega-infrastructure transfers, India must prioritize decentralized rainwater harvesting (Mission Amrit Sarovar), micro-irrigation (per drop more crop), and aquifer rejuvenation under the Atal Bhujal Yojana before executing irreversible ecological transformations.',
    syllabusKeywords: [
      'Inter-Basin Transfer',
      'Ken-Betwa Link',
      'Ecological Flows',
      'Panna Tiger Reserve',
      'Bundelkhand Aridity',
      'Pattiseema',
      'Deltaic Starvation',
      'Atal Bhujal Yojana'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 4: WEBERIAN LOCATION THEORY & INDIAN HEAVY INDUSTRIES
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2022-01',
    year: 2022,
    paper: 'GS Paper 1',
    topicTheme: 'Economic Geography & Industrial Location',
    question: 'Discuss the factors influencing the location of primary iron and steel industries in India. How has the spatial pattern shifted from raw-material proximity towards coastal and market-oriented sites?',
    wordLimit: 250,
    marks: 15,
    introduction: 'Under Alfred Weber\'s Theory of Industrial Location, the iron and steel industry is characterized as a "weight-losing, raw-material-oriented" heavy enterprise. Smelting 1 tonne of crude steel traditionally required ~1.5–2 tonnes of iron ore, 1.2–1.5 tonnes of coking coal, and 0.3 tonnes of limestone, yielding a high Material Index (>1) that historically clustered steel production near raw material deposits.',
    coreBodyPoints: [
      {
        heading: '1. Traditional Chota Nagpur Raw Material Heartland',
        points: [
          'Coking Coal Proximity: Jharia and Raniganj provided prime coking coal; iron ore was sourced from Noamundi and Gua (Singhbhum) and Gurumahisani (Mayurbhanj).',
          'Early Integrated Plants: TISCO at Jamshedpur (Subarnarekha water), IISCO at Burnpur, and public-sector nodes at Durgapur, Bokaro, and Rourkela congregated around the coal-iron ore nexus.'
        ]
      },
      {
        heading: '2. Factors Driving the Coastal & Market-Oriented Spatial Shift',
        points: [
          'Coking Coal Import Dependence: Depletion of domestic prime coking coal (high ash content >22%) forced Indian steelmakers to import high-grade coking coal from Australia and Indonesia.',
          'Coastal Location Advantages: Coastal plants minimize inland freight costs. Visakhapatnam Steel Plant (Rashtriya Ispat Nigam Ltd.) pioneered shore-based production; modern expansions at Essar/AMNS Hazira and JSW Jaigarh exploit deep-water ports.',
          'Export-Led Growth: Proximity to maritime trade lanes facilitates direct export of high-tensile hot-rolled coils to Southeast Asian and Middle Eastern markets.',
          'Adoption of Scrap-Based Mini-Steel Plants: Electric Arc Furnace (EAF) and Induction Furnace technologies rely on ferrous scrap and sponge iron rather than heavy coking coal, allowing plants to locate near urban consumption markets (Delhi-NCR, Pune, Chennai).'
        ]
      },
      {
        heading: '3. Infrastructure & Policy Enablers',
        points: [
          'Freight Equalization Policy Abolition (1992): Removed the artificial transport subsidy that previously neutralized eastern India\'s locational advantage.',
          'Dedicated Freight Corridors (DFCs): Fast-track heavy-haul logistics allow rapid movement of finished steel from inland plants to port terminals at JNPT and Mundra.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline map of India. Shade the Chota Nagpur Iron-Steel Triangle (Jamshedpur, Bokaro, Durgapur, Rourkela). Draw the transport arrows linking Australian imported coking coal to Visakhapatnam, Hazira, and Jaigarh. Mark secondary mini-steel hubs around NCR, Mumbai, and Chennai.',
    associatedCoordinates: [
      { placeName: 'Visakhapatnam Steel Plant (RINL)', state: 'Andhra Pradesh', lat: 17.632, lon: 83.181, note: 'India\'s premier shore-based integrated steel plant' },
      { placeName: 'Bokaro Steel City', state: 'Jharkhand', lat: 23.669, lon: 86.151, note: 'Heavy coal-oriented integrated steel plant on Damodar basin' },
      { placeName: 'Hazira Steel Complex (AM/NS)', state: 'Gujarat', lat: 21.121, lon: 72.658, note: 'Coastal gas and scrap-based deep-water mega steel hub' },
      { placeName: 'Jamshedpur (TATA Steel)', state: 'Jharkhand', lat: 22.804, lon: 86.202, note: 'Pioneer integrated plant established in 1907' }
    ],
    governmentSchemesAndPolicies: [
      'National Steel Policy 2017 aiming for 300 MT crude steel capacity by 2030',
      'Production Linked Incentive (PLI) Scheme for Specialty Steel',
      'PM Gati Shakti National Master Plan for multimodal heavy freight connectivity'
    ],
    conclusion: 'The spatial transition of the Indian steel sector from mineral-locked basins to coastal corridors reflects global structural trends. Combining coastal efficiency with green hydrogen Direct Reduced Iron (DRI) technology is vital to achieve India\'s Green Steel roadmap and decarbonization commitments by 2070.',
    syllabusKeywords: [
      'Weberian Theory',
      'Material Index',
      'Chota Nagpur Cluster',
      'Imported Coking Coal',
      'Shore-Based Plants',
      'Visakhapatnam',
      'Electric Arc Furnace',
      'Green Steel'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 5: HIMALAYAN GEOTECTONICS & NATURAL DISASTER VULNERABILITY
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2022-02',
    year: 2022,
    paper: 'GS Paper 1 & 3',
    topicTheme: 'Geomorphology & Disaster Management',
    question: 'The Himalayas are not merely a geographical barrier but a geodynamically unstable, fragile eco-zone prone to recurrent multi-hazard disasters. Analyze the geotectonic causes of Himalayan vulnerability and evaluate disaster risk reduction measures.',
    wordLimit: 250,
    marks: 15,
    introduction: 'The Himalayas represent the youngest and highest folded mountain chain on Earth, created by the ongoing continent-continent collision between the Indian and Eurasian tectonic plates. With the Indian Plate converging northward into Eurasia at ~40–50 mm/year, the region experiences continuous crustal shortening, intense strain accumulation, and severe seismicity, rendering it an acutely fragile multi-hazard ecological zone.',
    coreBodyPoints: [
      {
        heading: '1. Geotectonic & Structural Causes of Fragility',
        points: [
          'Major Active Fault Systems: Interspersed with major longitudinal tectonic boundary thrusts: Main Central Thrust (MCT), Main Boundary Thrust (MBT), and Himalayan Frontal Thrust (HFT), which lock immense elastic strain.',
          'Seismic Gap Hypotheses: Historical absence of mega-earthquakes (M > 8) in the Central Seismic Gap (Garhwal-Kumaon-Nepal) suggests massive pent-up tectonic energy awaiting release.',
          'Unconsolidated Lithology: Steep slopes composed of fractured sedimentary and metamorphic strata (shales, phyllites, schists) highly susceptible to shear failure upon saturation.'
        ]
      },
      {
        heading: '2. Compounding Anthropogenic & Climate Drivers',
        points: [
          'Glacial Lake Outburst Floods (GLOFs): Accelerated deglaciation forms proglacial moraine-dammed lakes (e.g. South Lhonak lake collapse in Sikkim 2023, Chamoli flash flood 2021).',
          'Intensive Hydropower Tunnelling: Blast-drilling and sub-surface headrace tunnelling induce slope destabilization, groundwater drainage, and catastrophic land subsidence (e.g. Joshimath 2023).',
          'Unregulated Urbanization: Unchecked construction over unconsolidated glacial scree and debris cones without stormwater drainage (Shimla, Dharamshala, Nainital).'
        ]
      },
      {
        heading: '3. Disaster Risk Reduction (DRR) & Strategic Interventions',
        points: [
          'Early Warning Systems: Deploying Automated Weather Stations (AWS) and radar water-level sensors on dangerous high-altitude glacial lakes (South Lhonak, Gepang Gath).',
          'Enforcing Eco-Sensitive Carrying Capacity: Regulating tourist footprints and construction under the National Mission for Sustaining the Himalayan Ecosystem (NMSHE).',
          'Eco-Engineering: Stabilizing road-cut slopes using bio-turfing, vetiver grass terraces, and wire-mesh rockfall catchments.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline of Northern India. Sketch the parallel structural thrusts from south to north: HFT -> MBT -> MCT -> Indus-Tsangpo Suture Zone (ITSZ). Mark key disaster nodes: Joshimath (subsidence), South Lhonak Lake (GLOF), Chamoli (Rishi Ganga avalanche), and the Central Seismic Gap.',
    associatedCoordinates: [
      { placeName: 'Joshimath Subsidence Town', state: 'Uttarakhand', lat: 30.556, lon: 79.566, note: 'Town built on ancient glacial moraine experiencing severe land subsidence' },
      { placeName: 'South Lhonak Glacial Lake', state: 'Sikkim', lat: 27.915, lon: 88.212, note: 'Moraine-dammed high altitude lake source of catastrophic 2023 GLOF' },
      { placeName: 'Chamoli (Tapovan Vishnugad)', state: 'Uttarakhand', lat: 30.495, lon: 79.625, note: 'Rongti rock-ice avalanche flash flood epicenter (2021)' },
      { placeName: 'Main Central Thrust (MCT)', state: 'Himachal Pradesh', lat: 31.625, lon: 77.854, note: 'Major tectonic shear zone separating Lesser and Higher Himalayas' }
    ],
    governmentSchemesAndPolicies: [
      'National Mission for Sustaining the Himalayan Ecosystem (NMSHE) under NAPCC',
      'Sendai Framework for Disaster Risk Reduction (2015-2030) Priority 1 & 4',
      'NDMA Guidelines on Management of Glacial Lake Outburst Floods (GLOFs)'
    ],
    conclusion: 'The Himalayas must be treated as a sensitive ecological sanctuary rather than an engineering frontier. Mandating comprehensive Cumulative Impact Assessments (CIAs) and prioritizing nature-inclusive infrastructure will ensure resilience against accelerating climate extremes.',
    syllabusKeywords: [
      'Continental Collision',
      'Main Central Thrust',
      'GLOF',
      'South Lhonak',
      'Joshimath Subsidence',
      'Central Seismic Gap',
      'Carrying Capacity',
      'Eco-Engineering'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 6: PORT-LED INDUSTRIALIZATION & THE SAGARMALA INITIATIVE
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2021-01',
    year: 2021,
    paper: 'GS Paper 1 & 3',
    topicTheme: 'Infrastructure & Spatial Connectivity',
    question: 'Examine the role of port-led industrialization under the Sagarmala Programme in revolutionizing India’s maritime economy and reducing logistics costs. What challenges impede coastal economic zones (CEZs)?',
    wordLimit: 250,
    marks: 15,
    introduction: 'India commands an extensive 7,516 km coastline, a strategic vantage across the Indian Ocean sea lanes of communication (SLOCs), and an Exclusive Economic Zone (EEZ) of over 2.3 million km². Launched in 2015, the Sagarmala Programme operationalizes "port-led industrialization" to lower domestic logistics costs (currently ~13–14% of GDP compared to 8–9% in developed economies) by optimizing coastal and inland shipping.',
    coreBodyPoints: [
      {
        heading: '1. Four Pillars of the Sagarmala Architecture',
        points: [
          'Port Modernization & New Ports: Developing deep-draft mega transshipment ports (Vadhavan in Maharashtra, Galathea Bay in Great Nicobar, Vizhinjam in Kerala) to eliminate reliance on foreign transshipment hubs (Colombo, Singapore).',
          'Port Connectivity: Expanding dedicated heavy-haul rail corridors, coastal expressways, and National Waterways (NW-1 Ganga, NW-2 Brahmaputra).',
          'Port-Led Industrialization: Establishing 14 Coastal Economic Zones (CEZs) integrating manufacturing clusters (refineries, petrochemicals, automotive) with maritime terminals.',
          'Coastal Community Development: Promoting marine fisheries, cold-chain processing, and maritime skill development centers.'
        ]
      },
      {
        heading: '2. Economic Transformation & Logistics Rationalization',
        points: [
          'Modal Shift Efficiency: Moving freight via coastal shipping costs approximately ₹0.20–0.25 per tonne-km compared to ₹1.40 by rail and ₹2.50 by road, substantially reducing carbon footprint.',
          'Global Value Chain (GVC) Integration: Proximity of Coastal Economic Units (CEUs) enables quick import of raw materials and immediate containerized export, boosting Indian manufacturing competitiveness.'
        ]
      },
      {
        heading: '3. Structural Challenges Confronting Coastal Development',
        points: [
          'Last-Mile Evacuation Bottlenecks: Congested hinterland rail-road corridors slow turnaround times compared to East Asian benchmarks.',
          'Customs & Cabotage Hurdles: Complex customs clearances and transshipment regulations hamper container feeder line operations.',
          'Coastal Environmental Sensitivity: Dredging and breakwater construction aggravate coastal erosion (e.g. Ennore, Chellanam) and endanger fragile mangrove-estuarine ecosystems under CRZ-2019 rules.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline map of peninsular India. Mark Major Ports: Deendayal (Kandla), JNPT, Vadhavan, Mormugao, Mangalore, Cochin, Vizhinjam, Tuticorin, Chennai, Visakhapatnam, Paradip, Haldia. Show the Western and Eastern DFCs connecting the industrial hinterland to ports. Sketch the Galathea Bay transshipment port in Great Nicobar.',
    associatedCoordinates: [
      { placeName: 'Vadhavan Mega Port', state: 'Maharashtra', lat: 19.992, lon: 72.684, note: 'Upcoming greenfield all-weather deep-draft container mega port' },
      { placeName: 'Vizhinjam International Seaport', state: 'Kerala', lat: 8.375, lon: 76.995, note: 'India\'s first automated deep-water container transshipment port' },
      { placeName: 'JNPT (Nhava Sheva)', state: 'Maharashtra', lat: 18.951, lon: 72.952, topicId: 'major_ports', note: 'Largest container port in India terminating the Western DFC' },
      { placeName: 'Paradip Port', state: 'Odisha', lat: 20.264, lon: 86.669, topicId: 'major_ports', note: 'Deep-water iron ore and coal bulk handling gateway on east coast' }
    ],
    governmentSchemesAndPolicies: [
      'National Logistics Policy (NLP) 2022 aiming to bring logistics costs below 10% of GDP',
      'Major Port Authorities Act 2021 granting operational autonomy',
      'Merchant Shipping Bill and inland vessels modernization schemes'
    ],
    conclusion: 'Port-led industrialization is central to unlocking India\'s ambition of a $5 trillion economy. Harmonizing Sagarmala infrastructure with Maritime India Vision 2030, digital port single-window portals (NLP Marine), and ecologically sensitive coastal zone management will cement India as the maritime linchpin of the Indo-Pacific.',
    syllabusKeywords: [
      'Sagarmala',
      'Port-Led Industrialization',
      'Coastal Economic Zones',
      'Logistics Cost',
      'Transshipment Hub',
      'Vizhinjam',
      'Vadhavan',
      'Maritime India Vision'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 7: MONSOON TELECONNECTIONS & CLIMATE CHANGE
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2021-02',
    year: 2021,
    paper: 'GS Paper 1',
    topicTheme: 'Climatology & Monsoon Dynamics',
    question: 'How do teleconnections like El Niño-Southern Oscillation (ENSO), Indian Ocean Dipole (IOD), and Madden-Julian Oscillation (MJO) influence the spatial and temporal variability of the Indian Summer Monsoon?',
    wordLimit: 250,
    marks: 15,
    introduction: 'The Indian Summer Monsoon (Southwest Monsoon) delivers over 75% of India\'s annual precipitation and dictates rainfed kharif agricultural yields. Far from being a localized land-sea thermal breeze, the monsoon is an intricate planetary-scale atmospheric engine driven by global teleconnections linking equatorial sea-surface temperatures (SSTs) across the Pacific and Indian Oceans to tropical convection over the subcontinent.',
    coreBodyPoints: [
      {
        heading: '1. El Niño-Southern Oscillation (ENSO) & the Walker Circulation',
        points: [
          'Walker Cell Disruption: During an El Niño event, warm SST anomalies in the central-eastern equatorial Pacific shift convective atmospheric updrafts eastward, weakening the Indo-Pacific Walker circulation.',
          'Subsidence over Subcontinent: Downward atmospheric descent (subsidence) over northern and central India suppresses cloud formation, resulting in delayed onset, erratic dry spells, and historical drought correlations (e.g. 2002, 2009, 2014, 2015).',
          'La Niña Teleconnection: Conversely, cooling in the eastern Pacific intensifies low-level Somali Jet winds, triggering above-normal rainfall, severe flooding, and heightened cyclone frequencies in the Bay of Bengal.'
        ]
      },
      {
        heading: '2. Indian Ocean Dipole (IOD) as the Regional Counter-Weight',
        points: [
          'Positive IOD (+IOD): Warmer-than-average SSTs in the western Indian Ocean (near the Arabian coast) and cooler SSTs in the eastern Indian Ocean near Sumatra create strong anomalous easterly winds.',
          'Mitigating El Niño: A strong Positive IOD pumps enormous moisture into the Arabian Sea branch, counter-balancing El Niño drying effects (as observed in 1997 and 2019 super-monsoon).',
          'Negative IOD (-IOD): Cool western waters suppress moisture flux, exacerbating monsoon deficits across central and northwest India.'
        ]
      },
      {
        heading: '3. Madden-Julian Oscillation (MJO): The Intra-Seasonal Pulse',
        points: [
          'Eastward Propagating Wave: A planetary-scale eastward-moving pulse of clouds, rainfall, and wind in the tropical atmosphere recurring every 30 to 60 days.',
          'Active vs. Break Spells: When the enhanced convective phase of MJO traverses the north Indian Ocean, it sparks vigorous monsoon surges and cloudburst episodes; its suppressed dry phase induces critical monsoon breaks.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw a schematic of the Indo-Pacific region. Show the descending branch of the Walker Cell over India during El Niño. Sketch the Positive IOD dipole arrows across the Arabian Sea and Bay of Bengal. Mark the Mascarene High and the low-level Findlater (Somali) Jet entering the west coast.',
    associatedCoordinates: [
      { placeName: 'Mascarene High (South Indian Ocean)', state: 'International / Offshore', lat: -20.000, lon: 60.000, note: 'High pressure cell pumping moisture into southwest monsoon' },
      { placeName: 'Somali Low-Level Jet (Findlater Jet)', state: 'Offshore Western Coast', lat: 12.000, lon: 65.000, note: 'Cross-equatorial atmospheric jet carrying Arabian Sea moisture' },
      { placeName: 'Tibetan Plateau Thermal Engine', state: 'Himalayan Border', lat: 31.000, lon: 88.000, note: 'High altitude sensible heating engine driving tropical easterly jet' }
    ],
    governmentSchemesAndPolicies: [
      'National Monsoon Mission (NMM) spearheaded by Ministry of Earth Sciences (MoES)',
      'Coupled Forecast System (CFS v2) high-resolution dynamical climate modeling',
      'Meghdoot and Damini mobile weather advisories for localized agromet services'
    ],
    conclusion: 'As anthropogenic warming accelerates ocean thermal stratification, extreme intra-seasonal fluctuations (concurrent droughts and urban cloudbursts) are intensifying. Modernizing Doppler Weather Radar networks and AI-powered climate models is paramount to safeguard Indian food and water security.',
    syllabusKeywords: [
      'Walker Circulation',
      'El Niño',
      'Positive IOD',
      'Madden-Julian Oscillation',
      'Somali Jet',
      'Mascarene High',
      'National Monsoon Mission',
      'Agromet Advisory'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 8: RENEWABLE ENERGY SPATIAL TRANSITION & GRID BALANCING
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2024-02',
    year: 2024,
    paper: 'GS Paper 1 & 3',
    topicTheme: 'Energy Geography & Decarbonization',
    question: 'Examine the geographical factors governing the spatial distribution of solar and wind energy projects in India. What infrastructural and environmental challenges impede the target of 500 GW non-fossil capacity by 2030?',
    wordLimit: 250,
    marks: 15,
    introduction: 'At COP26 in Glasgow, India pledged the "Panchamrit" targets, committing to install 500 GW of non-fossil electric capacity and fulfill 50% of energy requirements from renewables by 2030. India\'s geographic position between 8°4\'N and 37°6\'N affords over 300 clear sunny days annually, with solar insolation averaging 4–7 kWh/m²/day, alongside extensive wind regimes along the western and southern coastlines.',
    coreBodyPoints: [
      {
        heading: '1. Geographical Determinants of Solar Energy Clustering',
        points: [
          'High Direct Normal Irradiance (DNI): Western arid tracts of Rajasthan, Gujarat, and the Deccan rainshadow (Karnataka, Andhra Pradesh) experience minimal cloud cover and low humidity.',
          'Barren Land Availability: Ultra-mega solar parks require large contiguous land parcels (~4–5 acres per MW). Wastelands and barren salt flats in Bhadla (Phalodi, Rajasthan - 2,245 MW), Khavda (Kutch, Gujarat - 30 GW planned), and Pavagada (Tumakuru, Karnataka - 2,050 MW) minimize land acquisition friction.'
        ]
      },
      {
        heading: '2. Geographical Determinants of Wind Energy Belts',
        points: [
          'Orography & Coastal Funnelling: High-velocity winds funnelled through the Western Ghats mountain gaps (Palghat Gap, Shencottah Gap) and coastal gradients create wind power sweet spots in Muppandal (Tamil Nadu - largest wind farm cluster in India) and Jaisalmer (Rajasthan).',
          'Offshore Wind Frontiers: The Gulf of Khambhat (Gujarat) and Gulf of Mannar (Tamil Nadu) possess estimated offshore potential exceeding 70 GW, benefiting from stable, higher-velocity marine wind currents.'
        ]
      },
      {
        heading: '3. Spatial, Ecological & Grid Challenges',
        points: [
          'Grid Balancing & Duck Curve: High solar generation during peak noon hours mismatches evening domestic peak demand, requiring Battery Energy Storage Systems (BESS) and pumped storage hydro plants.',
          'Inter-Regional Transmission Loss: Huge distance between remote generation deserts (Thar, Kutch) and load consumption centers in north and east India demands massive Green Energy Corridors.',
          'Ecology & Biodiversity Collision: Overhead high-voltage transmission lines in Thar desert cause collision mortality for the critically endangered Great Indian Bustard (GIB), prompting Supreme Court underground cabling directives.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline map of India. Mark premier Ultra Mega Solar Parks: Bhadla (Rajasthan), Khavda (Gujarat), Pavagada (Karnataka), Rewa (MP). Mark premier Wind Clusters: Muppandal (Tamil Nadu) and Jaisalmer. Draw the Green Energy Corridor transmission line connecting Thar and Kutch to northern industrial grids.',
    associatedCoordinates: [
      { placeName: 'Bhadla Solar Park', state: 'Rajasthan', lat: 27.538, lon: 71.918, note: 'One of the world largest single-location operational solar parks (2,245 MW)' },
      { placeName: 'Khavda Renewable Energy Park', state: 'Gujarat', lat: 23.854, lon: 69.728, note: 'World largest hybrid solar-wind park under construction (30 GW)' },
      { placeName: 'Muppandal Wind Farm', state: 'Tamil Nadu', lat: 8.258, lon: 77.545, note: 'Largest operational onshore wind energy cluster utilizing Palghat winds' },
      { placeName: 'Pavagada Solar Park', state: 'Karnataka', lat: 14.101, lon: 77.283, note: '2,050 MW mega solar installation on semi-arid leased farm land' }
    ],
    governmentSchemesAndPolicies: [
      'National Green Hydrogen Mission aiming for 5 MMT production by 2030',
      'PM-KUSUM Scheme for solarization of agricultural pump sets',
      'Green Energy Open Access Rules and Production Linked Incentive (PLI) for Solar PV Modules'
    ],
    conclusion: 'Scaling India\'s renewable revolution requires harmonizing spatial planning with biodiversity safeguards. Integrating floating solar on major reservoirs, circular economy recycling of solar photovoltaic waste, and indigenous battery manufacturing will fulfill India\'s net-zero pledge by 2070.',
    syllabusKeywords: [
      'Bhadla Solar Park',
      'Muppandal Wind Cluster',
      'Palghat Wind Gap',
      'Great Indian Bustard',
      'Green Energy Corridor',
      'Duck Curve',
      'Battery Storage',
      'National Green Hydrogen Mission'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 9: URBAN FLOODING & THE SPONGE CITIES PARADIGM
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2023-03',
    year: 2023,
    paper: 'GS Paper 1 & 3',
    topicTheme: 'Urban Geography & Disaster Management',
    question: 'Urban flooding in Indian metropolitan cities is no longer a localized drainage failure but a recurring anthropogenically induced hydro-meteorological disaster. Evaluate the causes and propose a resilient "Sponge City" framework.',
    wordLimit: 250,
    marks: 15,
    introduction: 'In recent years, metropolitan centers across India—including Chennai (2015, 2023), Bengaluru (2022), Mumbai (2005, 2017), Delhi (2023), and Hyderabad (2020)—have experienced devastating urban inundations. While climate change amplifies short-duration intense precipitation (cloudburst-like downpours), the root vulnerability stems from rapid, unplanned urbanization that dismantles natural drainage topographies and natural wetlands.',
    coreBodyPoints: [
      {
        heading: '1. Anthropogenic Drivers of Urban Hydrological Collapse',
        points: [
          'Encroachment of Natural Wetlands: Urban water bodies acting as natural sponge flood basins have been reclaimed for real estate (e.g. Pallikaranai marsh in Chennai reduced by >80%, Bellandur and Varthur lakes in Bengaluru choked with sewage and construction debris).',
          'Concretization & Impermeability: Paved asphalt and concrete surfaces reduce natural infiltration to less than 10%, converting 90% of rainwater into torrential surface storm runoff (compared to 80% natural absorption in forested tracts).',
          'Destruction of Natural Stormwater Channels: Disconnecting traditional cascading tank systems (Eris in Tamil Nadu, Cheruvus in Telangana) and blocking natural nallahs prevent gravity drainage into river basins.'
        ]
      },
      {
        heading: '2. Climate Compounding: Sub-Hourly Cloudbursts',
        points: [
          'Urban Heat Island (UHI) Effect: Elevated surface temperatures in dense built-up cities trigger localized mesoscale convective storms, producing extreme precipitation exceeding 100 mm in a few hours, overwhelming outdated drainage designs designed for 12–20 mm/hr.'
        ]
      },
      {
        heading: '3. Blueprint for the "Sponge City" Framework in India',
        points: [
          'Permeable Pavements & Rain Gardens: Mandating pervious concrete in sidewalks, pedestrian plazas, and parking lots to recharge the local water table.',
          'Wetland Restoration & Bioswales: Demarcating buffer no-construction zones around river floodplains (e.g., Yamuna floodplains in Delhi, Cooum and Adyar in Chennai, Mithi in Mumbai).',
          'Decentralized Rainwater Harvesting: Enforcing mandatory building bye-laws for rooftop rainwater harvesting and storage cisterns to attenuate peak storm surges.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw schematic diagrams contrasting a "Concrete Urban Jungle (90% surface runoff, zero infiltration)" with a "Sponge City (permeable roads, retention lakes, bioswales, green roofs restoring 80% absorption)". Mark key flood-vulnerable cities: Mumbai (Mithi River), Chennai (Pallikaranai), Delhi (Yamuna Khadar), Bengaluru (Bellandur).',
    associatedCoordinates: [
      { placeName: 'Pallikaranai Marsh Reserve', state: 'Tamil Nadu', lat: 12.935, lon: 80.218, topicId: 'ramsar_sites', note: 'Critical flood-absorbing coastal freshwater wetland in south Chennai' },
      { placeName: 'Bellandur Lake Catchment', state: 'Karnataka', lat: 12.936, lon: 77.674, note: 'Largest urban lake in Bengaluru severely impacted by encroachment' },
      { placeName: 'Mithi River Basin', state: 'Maharashtra', lat: 19.065, lon: 72.865, note: 'Heavily encroached channel causing chronic Mumbai monsoon inundation' }
    ],
    governmentSchemesAndPolicies: [
      'AMRUT 2.0 focusing on rejuvenation of water bodies and storm water drainage',
      'National Disaster Management Authority (NDMA) Urban Flooding Management Guidelines',
      'Mission Amrit Sarovar constructing 75 water bodies in every district of India'
    ],
    conclusion: 'Urban planners must shift from an engineering paradigm of "evacuating stormwater through concrete canals" to an ecological paradigm of "living with water". Embracing nature-based solutions under the Sponge City paradigm will ensure urban climate resilience and water security.',
    syllabusKeywords: [
      'Urban Flooding',
      'Sponge City',
      'Pallikaranai Marsh',
      'Bellandur Lake',
      'Urban Heat Island',
      'Impermeable Surface',
      'AMRUT 2.0',
      'Bioswales'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 10: CRITICAL MINERALS & DEEP-SEA MINING IN THE INDO-PACIFIC
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2024-03',
    year: 2024,
    paper: 'GS Paper 1 & 3',
    topicTheme: 'Strategic Resources & Oceanography',
    question: 'Analyze the strategic and economic significance of Critical Minerals for India’s clean energy transition. Examine the exploration potential of Polymetallic Nodules in the Central Indian Ocean Basin under the Deep Ocean Mission.',
    wordLimit: 250,
    marks: 15,
    introduction: 'Critical Minerals—such as Lithium, Cobalt, Nickel, Copper, Rare Earth Elements (REEs), and Titanium—constitute the indispensable building blocks of the 21st-century green energy transition (EV batteries, wind turbine permanent magnets, solar PV, and defense electronics). In 2023, the Ministry of Mines officially classified 30 Critical Minerals, recognizing that import vulnerabilities threaten national economic security.',
    coreBodyPoints: [
      {
        heading: '1. Import Vulnerability & Supply Chain Geopolitics',
        points: [
          'Single-Source Dependence: India imports 100% of its Lithium (predominantly from Australia and the "Lithium Triangle" of Chile, Argentina, Bolivia via Chinese refining) and 100% of its Cobalt and Nickel.',
          'China\'s Dominance: China processes over 60–70% of global lithium and cobalt, and controls >90% of commercial rare earth magnet production, creating severe vulnerability to export embargoes.'
        ]
      },
      {
        heading: '2. Domestic Discoveries & Terrestrial Prospects',
        points: [
          'Reasi Inferred Lithium (J&K): GSI established 5.9 million tonnes of inferred lithium resources in the bauxite-bearing Salal-Haimana belt of Reasi.',
          'Mandya Pegmatites (Karnataka): Exploration by Atomic Minerals Directorate (AMD) revealed lithium mica deposits in Marlagalla.',
          'Vanadium in Arunachal Pradesh: Discovery of titaniferous magnetite and phyllite vanadium prospect in Depo and Tamun.'
        ]
      },
      {
        heading: '3. Deep Ocean Mission & Polymetallic Nodules (PMN)',
        points: [
          'ISA Pioneer Investor Status: Under the UN Convention on the Law of the Sea (UNCLOS), the International Seabed Authority (ISA) has allocated India an exploration area of 75,000 km² in the Central Indian Ocean Basin (CIOB).',
          'Enormous Resource Base: CIOB holds an estimated 380 million tonnes of polymetallic nodules containing ~4.7 million tonnes of Nickel, 4.29 million tonnes of Copper, 0.55 million tonnes of Cobalt, and 92 million tonnes of Manganese.',
          'Technological Frontiers (Samudrayaan): Developing the indigenously designed human submersible "Matsya 6000" capable of operating at 6,000-metre ocean depths for deep-sea resource mapping.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline map showing the Indian Ocean Basin. Demarcate India\'s 75,000 km² CIOB Polymetallic Nodule contract site south of the Equator. Mark terrestrial Critical Mineral sites: Reasi (Lithium), Khetri (Copper), Malanjkhand (Copper), Chavara (Titanium/Monazite), and Sukinda (Chromite/Nickel).',
    associatedCoordinates: [
      { placeName: 'Central Indian Ocean Basin (CIOB PMN Site)', state: 'International Seabed', lat: -12.000, lon: 75.000, note: '75,000 sq km ISA allocated polymetallic nodules exploration tract' },
      { placeName: 'Salal Haimana (Reasi)', state: 'Jammu & Kashmir', lat: 33.142, lon: 74.821, note: '5.9 MT inferred Lithium resources identified by GSI' },
      { placeName: 'Sukinda Valley (Chromite & Nickel)', state: 'Odisha', lat: 21.018, lon: 85.834, note: 'Largest chromite and lateritic nickel deposit in India' }
    ],
    governmentSchemesAndPolicies: [
      'Mines and Minerals (Development and Regulation) Amendment Act 2023 for auction of critical mineral blocks',
      'Deep Ocean Mission (DOM) under Ministry of Earth Sciences (MoES)',
      'Khanij Bidesh India Ltd. (KABIL) joint venture acquiring overseas lithium and cobalt assets'
    ],
    conclusion: 'Achieving mineral sovereignty requires a twin strategy: accelerating domestic exploration and deep-sea mining under the Deep Ocean Mission while forging resilient multilateral supply alliances (Mineral Security Partnership, Quad) to safeguard India\'s clean energy future.',
    syllabusKeywords: [
      'Critical Minerals',
      'Lithium Reasi',
      'Polymetallic Nodules',
      'Central Indian Ocean Basin',
      'Samudrayaan',
      'Matsya 6000',
      'KABIL',
      'Mineral Security Partnership'
    ]
  },

  // -------------------------------------------------------------------------
  // QUESTION 11: DESERTIFICATION & THE ARAVALLI GREEN WALL INITIATIVE
  // -------------------------------------------------------------------------
  {
    id: 'mains-ans-2023-04',
    year: 2023,
    paper: 'GS Paper 1',
    topicTheme: 'Biogeography & Land Degradation',
    question: 'The Aravalli Range acts as a vital ecological bulwark arresting the eastward expansion of the Thar Desert into the fertile Indo-Gangetic Plains. Evaluate the threats confronting this ancient relict mountain system and discuss the Aravalli Green Wall Project.',
    wordLimit: 250,
    marks: 15,
    introduction: 'The Aravalli Range, trending southwest to northeast for ~692 km from Gujarat through Rajasthan and Haryana to Delhi (Delhi Ridge), is one of the oldest fold mountain systems in the world, formed during the Proterozoic orogeny (~1.8–2.0 Ga). As a deeply eroded relict range, it forms the critical ecological water divide between the Indus drainage to the west and the Ganga drainage to the east.',
    coreBodyPoints: [
      {
        heading: '1. Strategic Ecological Bulwark Function',
        points: [
          'Arresting Desertification: Prevents the hot, dust-laden winds and sand dunes of the Thar Desert from encroaching eastward into the fertile agricultural heartlands of Haryana, western Uttar Pradesh, and the Indo-Gangetic Plains.',
          'Groundwater Recharge & Green Lungs: The fractured quartzitic ridges facilitate extensive subsurface aquifer replenishment, acting as the primary green lungs and carbon sink for the heavily polluted Delhi-NCR urban conglomerate.',
          'Biodiversity Corridor: Connects protected wildlife refuges across Rajasthan and Haryana (Sariska Tiger Reserve, Ranthambore, Asola Bhatti, and Mangar Bani sacred grove).'
        ]
      },
      {
        heading: '2. Severe Anthropogenic Pressures & Degradation',
        points: [
          'Illegal Mining & Quarrying: Unregulated stone quarrying for construction aggregates has flattened over 31 mountain gaps in Rajasthan and Haryana, allowing desert dust to blow unobstructed into the NCR.',
          'Urban Sprawl & Real Estate Encroachment: Destruction of natural drainage valleys in Gurugram, Faridabad, and Alwar causes severe groundwater depletion and monsoon urban flooding.'
        ]
      },
      {
        heading: '3. The Aravalli Green Wall Project (AGWP)',
        points: [
          'Green Buffer Corridor: Inspired by the African Union\'s Great Green Wall, the project plans a 5 km wide and 1,400 km long green ecological corridor along the Aravalli belt across four states (Gujarat, Rajasthan, Haryana, Delhi).',
          'Indigenous Afforestation: Planting native, drought-tolerant species (Khejri, Dhak, Rohida, Ber, Neem) to stabilize shifting sand dunes, revitalize degraded water bodies (Amrit Sarovars), and regenerate agro-pastoral biodiversity.'
        ]
      }
    ],
    mapDiagramStrategy: 'Draw an outline map of northwestern India. Plot the linear trend of the Aravalli Range from Himmatnagar (Gujarat) through Mount Abu (Guru Shikhar), Ajmer, Alwar to the Delhi Ridge. Show the Thar Desert on the west and the Indo-Gangetic Plain on the east. Demarcate the 5 km Aravalli Green Wall buffer corridor and Sariska Tiger Reserve.',
    associatedCoordinates: [
      { placeName: 'Guru Shikhar (Mount Abu)', state: 'Rajasthan', lat: 24.654, lon: 72.782, note: 'Highest peak of the ancient Aravalli Range (1,722 m)' },
      { placeName: 'Delhi Ridge (Northern Aravalli Terminus)', state: 'Delhi', lat: 28.613, lon: 77.209, note: 'Primary ecological green lungs and aquifer recharge zone for NCR' },
      { placeName: 'Sariska Tiger Reserve', state: 'Rajasthan', lat: 27.325, lon: 76.435, topicId: 'tiger_reserves', note: 'Deciduous scrub forest tiger habitat nestled within Aravallis' },
      { placeName: 'Mangar Bani Sacred Grove', state: 'Haryana', lat: 28.385, lon: 77.168, note: 'Dense natural climax forest preserved by local Gujjar communities' }
    ],
    governmentSchemesAndPolicies: [
      'Aravalli Green Wall Project (AGWP) launched under UNCCD COP14 Land Degradation Neutrality (LDN) target',
      'Supreme Court directives banning illegal mining in Aravalli Eco-Sensitive Zones',
      'Nagar Van Yojana expanding urban municipal forest green cover'
    ],
    conclusion: 'Protecting the Aravallis is not merely a localized conservation endeavor but a non-negotiable imperative to prevent northwestern India from turning into an uninhabitable dust bowl. Strict enforcement of zero-mining zones and participatory community forestry are essential to achieve Land Degradation Neutrality by 2030.',
    syllabusKeywords: [
      'Aravalli Range',
      'Aravalli Green Wall',
      'Desertification',
      'Delhi Ridge',
      'Sariska Tiger Reserve',
      'Relict Mountain',
      'Land Degradation Neutrality',
      'Mangar Bani'
    ]
  },
  {
    id: 'mains-gs1-inland-waterways',
    year: 2023,
    paper: 'GS Paper 1',
    topicTheme: 'Inland Water Transport & Multi-Modal Logistics',
    question: 'Examine the economic and environmental imperatives of developing Inland Water Transport (IWT) in India, with special reference to National Waterway 1 (NW-1) and National Waterway 2 (NW-2). What are the major ecological bottlenecks?',
    wordLimit: 250,
    marks: 15,
    introduction: 'Inland Water Transport (IWT) accounts for merely ~2% of India\'s domestic freight modal share (compared to >40% in the Netherlands and >8% in China). With 14,500 km of navigable waterways and 111 designated National Waterways under the National Waterways Act 2016, IWT represents the most fuel-efficient, cost-effective, and carbon-frugal mode of bulk transport.',
    coreBodyPoints: [
      {
        heading: '1. Economic & Logistical Imperatives',
        points: [
          'Freight Cost Reduction: Moving 1 tonne-km costs ~₹1.06 by waterways versus ₹1.41 by railways and ₹2.28 by highways, slashing national logistics costs from 13-14% of GDP down toward the global benchmark of 8%.',
          'Fuel Efficiency & Carbon Abatement: 1 litre of fuel moves 105 tonne-km on inland water compared to 85 tonne-km on rail and 24 tonne-km on road; reduces GHG emissions by 30-40% per tonne-km.',
          'Decongestion of Golden Quadrilateral Corridors: Offloads heavy over-dimensional cargo (ODC), steel coils, coal, and cement from choked trunk rail and road networks.'
        ]
      },
      {
        heading: '2. Spatial Progress: NW-1 (Ganga) & NW-2 (Brahmaputra)',
        points: [
          'National Waterway 1 (1,620 km, Prayagraj to Haldia): Upgraded under the World Bank-assisted Jal Marg Vikas Project (JMVP, ₹5,369 Cr) with 3 Multi-Modal Terminals at Varanasi (UP), Sahibganj (Jharkhand), and Haldia (WB), alongside a state-of-the-art navigational lock at Farakka Barrage.',
          'National Waterway 2 (891 km, Sadiya to Dhubri on Brahmaputra): Connects landlocked Northeast India to Kolkata and Haldia ports via the Indo-Bangladesh Protocol (IBP) Route, slashing cargo transit times around the Siliguri "Chicken\'s Neck" Corridor.'
        ]
      },
      {
        heading: '3. Acute Ecological Bottlenecks & Biodiversity Conflicts',
        points: [
          'Threat to Vikramshila Gangetic Dolphin Sanctuary: Capital and maintenance dredging to sustain a 3-metre Least Available Depth (LAD) generates intense underwater turbidity and noise, disrupting echolocation in the endangered Blind Gangetic River Dolphin (Platanista gangetica).',
          'Siltation & Low Lean-Season Discharge: Heavy Himalayan sediment loads cause rapid braiding and shoal formation; upstream irrigation diversions in Uttar Pradesh and Bihar leave insufficient dry-season flow for commercial barges.',
          'Salinization & Estuarine Disturbance: Dredging river mouths in the Sundarbans alters salinity gradients, impacting mangrove nurseries and Hilsa fish breeding migrations.'
        ]
      }
    ],
    mapDiagramStrategy: 'Outline map of Northern & Eastern India: Trace NW-1 from Prayagraj down to Haldia marking Varanasi, Sahibganj, and Farakka terminals; trace NW-2 along Brahmaputra from Sadiya to Dhubri, highlighting the Indo-Bangladesh Protocol route connecting through Dhaka/Sundarbans.',
    associatedCoordinates: [
      { placeName: 'Varanasi Multi-Modal Terminal', state: 'Uttar Pradesh', lat: 25.281, lon: 83.031, note: 'First inland multi-modal freight terminal under JMVP' },
      { placeName: 'Sahibganj Multi-Modal Terminal', state: 'Jharkhand', lat: 25.244, lon: 87.653, note: 'Second major multimodal river port on NW-1' },
      { placeName: 'Haldia Dock Complex', state: 'West Bengal', lat: 22.021, lon: 88.064, note: 'Deepwater gateway connecting inland river barges to ocean vessels' },
      { placeName: 'Dhubri River Port', state: 'Assam', lat: 26.021, lon: 89.974, note: 'Key border river terminal on NW-2 entering Bangladesh' }
    ],
    governmentSchemesAndPolicies: [
      'Jal Marg Vikas Project (JMVP) with World Bank financial assistance',
      'National Waterways Act 2016 declaring 111 National Waterways',
      'PM Gati Shakti National Master Plan for Multi-Modal Connectivity',
      'Arth Ganga model monetizing riparian economies and sustainable local freight'
    ],
    conclusion: 'Inland water transport is an ecological and economic imperative for resilient trade logistics. However, dredging and channel engineering must adopt strict "Eco-Dredging" protocols, acoustic silencers for marine vessels, and seasonal zoning around dolphin habitats to harmonize navigation with riverine conservation.',
    syllabusKeywords: [
      'Inland Waterways',
      'National Waterway 1 (NW-1)',
      'National Waterway 2 (NW-2)',
      'Jal Marg Vikas Project (JMVP)',
      'Indo-Bangladesh Protocol (IBP) Route',
      'Gangetic Dolphin (Platanista gangetica)',
      'Modal Shift',
      'Multi-Modal Terminal'
    ]
  },
  {
    id: 'mains-gs3-interlinking-rivers',
    year: 2022,
    paper: 'GS Paper 3',
    topicTheme: 'National River Linking Project (NRLP) & Water Security',
    question: 'The Inter-linking of Rivers (ILR) is hailed as a permanent panacea for India\'s recurrent flood-drought dichotomy. Critically assess the hydrological promises versus the socio-ecological risks of the Ken-Betwa River Link Project.',
    wordLimit: 250,
    marks: 15,
    introduction: 'The National Perspective Plan for Water Resources Development, conceived by the Ministry of Jal Shakti, envisages 30 river links (16 Peninsular and 14 Himalayan) to transfer 174 billion cubic metres of surplus monsoon runoff to deficit basins. The Ken-Betwa Link Project (KBLP, ₹44,605 Cr) is India\'s first flagship river-interlinking project under active implementation.',
    coreBodyPoints: [
      {
        heading: '1. Hydrological Promises & Regional Benefits',
        points: [
          'Relief for Bundelkhand: Will irrigate 10.6 lakh hectares of drought-prone parched agricultural land across 13 backward districts of Madhya Pradesh (Chhatarpur, Tikamgarh, Panna) and Uttar Pradesh (Banda, Mahoba, Jhansi).',
          'Drinking Water Security: Provides assured piped potable drinking water to 62 lakh rural residents suffering from perennial summer water distress.',
          'Clean Energy Generation: Harnesses 103 MW of run-of-the-river hydroelectric power and 27 MW of solar power generation along the canal command.'
        ]
      },
      {
        heading: '2. Severe Ecological Repercussions & Wildlife Submergence',
        points: [
          'Destruction of Panna Tiger Reserve (PTR): The proposed Daudhan Dam (77 metres high) and reservoir will submerge 9,000 hectares of prime dry deciduous forest, including ~4,141 hectares of the Core Critical Tiger Habitat of Panna Tiger Reserve.',
          'Submergence of Ken River Gharial Sanctuary: Disruption of seasonal scouring and sandbar deposition downriver of Daudhan dam imperils breeding habitats of the critically endangered Gharial (Gavialis gangeticus) and White-rumped Vulture cliffs.',
          'Deforestation & Carbon Sink Loss: Felling of an estimated 2.3 million trees in the fragile Bundelkhand scrub biome accelerates local microclimate desiccation.'
        ]
      },
      {
        heading: '3. Hydrological Ambiguities & Climate Uncertainty',
        points: [
          'Questionable "Surplus" Basin Classification: Ken and Betwa occupy adjacent sub-basins with nearly identical monsoon rainfall regimes; during severe drought years, both basins experience simultaneous water stress, rendering the "surplus" transfer concept hydrologically flawed.',
          'Inter-State Federal Friction: Tensions between UP and MP over water-sharing quotas during the non-monsoon rabi season demonstrate the complex hydro-politics of river diversion.'
        ]
      }
    ],
    mapDiagramStrategy: 'Sketch map of Central India: Plot the course of Ken River and Betwa River flowing north into Yamuna. Draw the Daudhan Dam reservoir and the 221-km Ken-Betwa Link Canal traversing east-to-west across Chhatarpur and Tikamgarh; mark the boundary of Panna Tiger Reserve submerged zone.',
    associatedCoordinates: [
      { placeName: 'Daudhan Dam Site', state: 'Madhya Pradesh', lat: 24.631, lon: 79.866, note: 'Main dam on Ken river creating submergence in Panna Tiger Reserve' },
      { placeName: 'Panna National Park & Tiger Reserve', state: 'Madhya Pradesh', lat: 24.721, lon: 80.199, topicId: 'tiger_reserves', note: 'Critical tiger reintroduction landscape facing forest submergence' },
      { placeName: 'Barwa Sagar & Betwa Confluence', state: 'Uttar Pradesh', lat: 25.362, lon: 78.734, note: 'Command terminal where link canal empties into Betwa river' }
    ],
    governmentSchemesAndPolicies: [
      'National River Linking Project (NRLP) under National Water Development Agency (NWDA)',
      'Ken-Betwa Link Project Authority (KBLPA)',
      'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY - Har Khet Ko Pani)',
      'Integrated Landscape Management Plan for Greater Panna Landscape'
    ],
    conclusion: 'While Ken-Betwa provides an engineering solution to Bundelkhand\'s agrarian destitution, river interlinking should remain an intervention of last resort. Priority must be accorded to decentralized rainwater harvesting, rejuvenation of Bundela-era traditional Chandela tanks, and micro-irrigation to secure water sovereignty without catastrophic wildlife displacement.',
    syllabusKeywords: [
      'Inter-Linking of Rivers (ILR)',
      'Ken-Betwa Link Project (KBLP)',
      'Panna Tiger Reserve',
      'Bundelkhand Water Crisis',
      'Daudhan Dam',
      'Surplus vs Deficit Basin',
      'Chandela Tanks',
      'National Water Development Agency (NWDA)'
    ]
  },
  {
    id: 'mains-gs1-semiconductor-ecosystem',
    year: 2024,
    paper: 'GS Paper 1',
    topicTheme: 'Location of High-Tech Industries & Critical Minerals',
    question: 'Discuss the locational factors governing the geography of semiconductor wafer fabrication units globally. In light of this, evaluate India\'s strategic push to establish semiconductor clusters.',
    wordLimit: 250,
    marks: 15,
    introduction: 'Semiconductors are the bedrock of the 4th Industrial Revolution, powering everything from smartphones and electric vehicles to artificial intelligence computing arrays and hypersonic missiles. Valued at >$600 billion, global chip fabrication is extraordinarily geographically concentrated, with Taiwan (TSMC ~60% advanced chips), South Korea (Samsung), and the USA dominating the value chain.',
    coreBodyPoints: [
      {
        heading: '1. Determinant Locational Factors for Semiconductor Fabs',
        points: [
          'Ultra-Pure Water (UPW) Availability: A standard mega-fab consumes 10 to 20 million litres of ultra-pure water daily to clean silicon wafers between lithographic etching steps.',
          'Flawless, Uninterrupted Power Supply: Even a microsecond power dip ruins thousands of wafer batches worth tens of millions of dollars; fabs require dedicated dual-source grid substations and industrial backup.',
          'Vibration-Free Bedrock & Seismic Stability: Extreme photolithography operations (EUV at 2-3 nanometres) require laser alignment down to sub-nanometre tolerances, demanding seismically quiet bedrock far from heavy railway corridors.',
          'Proximity to Hazardous Chemical & Gas Supply Chains: Fab clusters require immediate access to electronic-grade chemicals (hydrofluoric acid, sulfuric acid) and specialty noble gases (xenon, neon, argon, silane).'
        ]
      },
      {
        heading: '2. India\'s Strategic Semiconductor Clusters',
        points: [
          'Dholera Special Investment Region (SIR, Gujarat): Tata Electronics and Taiwan\'s PSMC establishing India\'s first commercial 28nm fab (₹91,000 Cr) leveraging Sabarmati water supply and dedicated green power transmission corridors.',
          'Sanand Cluster (Gujarat): Micron Technology\'s $2.75 billion and Murugappa/Renesas advanced assembly, testing, and packaging (ATMP / OSAT) plants.',
          'Mohali & Bengaluru R&D Anchors: Semi-Conductor Laboratory (SCL Mohali) providing legacy space-grade chipsets, while Bengaluru and Hyderabad house over 20% of the world\'s top chip design talent (VLSI / EDA).'
        ]
      },
      {
        heading: '3. Geostrategic Rationale & Vulnerabilities',
        points: [
          'Mitigating "Taiwan Strait Chokepoint": A conflict over Taiwan would paralyze global manufacturing; establishing domestic foundry capacity secures sovereign defence, telecom, and automotive resilience.',
          'Bottlenecks in India: High upfront capital expenditure ($10B+ per fab), lack of domestic supply chains for high-purity chemicals, and historical dependency on foreign ASML photolithography machines.'
        ]
      }
    ],
    mapDiagramStrategy: 'India map highlighting the nascent Semiconductor Corridor: Dholera SIR and Sanand in Gujarat (commercial fabs & OSAT), SCL Mohali in Punjab (strategic aerospace foundry), and Bengaluru-Hyderabad-Noida (fabless chip design & EDA cluster).',
    associatedCoordinates: [
      { placeName: 'Dholera SIR Mega Fab', state: 'Gujarat', lat: 22.253, lon: 72.195, note: 'Tata-PSMC 28nm semiconductor fabrication facility' },
      { placeName: 'Sanand ATMP Complex', state: 'Gujarat', lat: 22.986, lon: 72.381, note: 'Micron advanced semiconductor packaging and test unit' },
      { placeName: 'Semi-Conductor Laboratory (SCL)', state: 'Punjab', lat: 30.704, lon: 76.717, note: 'India\'s historic defence & space silicon foundry in Mohali' }
    ],
    governmentSchemesAndPolicies: [
      'India Semiconductor Mission (ISM) with ₹76,000 Crore ($10B) incentive outlays',
      'Modified Scheme for setting up of Semiconductor Fabs (50% fiscal support)',
      'Design Linked Incentive (DLI) Scheme for domestic chip IP startups',
      'Quad Semiconductor Supply Chain Initiative (India, US, Japan, Australia)'
    ],
    conclusion: 'Building a semiconductor ecosystem is a decadal marathon requiring sustained bipartisan capital and world-class utility reliability. By coupling its global dominance in chip design with foundational fabrication in Dholera and Sanand, India can transition from a technology consumer to an indispensable pillar of global silicon supply chains.',
    syllabusKeywords: [
      'Semiconductor Fabrication',
      'India Semiconductor Mission (ISM)',
      'Dholera Special Investment Region',
      'Ultra-Pure Water (UPW)',
      'ATMP / OSAT',
      'Taiwan Strait Vulnerability',
      'Location of High-Tech Industries',
      'Design Linked Incentive (DLI)'
    ]
  },
  {
    id: 'mains-gs1-lithium-white-gold',
    year: 2024,
    paper: 'GS Paper 1',
    topicTheme: 'Critical Minerals & Energy Transition Geography',
    question: 'The discovery of domestic lithium reserves has ignited hopes for India\'s green energy transition. Discuss the geological occurrence of lithium in India, its geoeconomic significance, and the ecological challenges of mining in eco-sensitive zones.',
    wordLimit: 250,
    marks: 15,
    introduction: 'Often dubbed "White Gold", Lithium is the foundational cathode element of lithium-ion batteries that power electric vehicles (EVs) and grid-scale renewable energy storage. The Geological Survey of India\'s (GSI) preliminary discovery of 5.9 million tonnes of inferred lithium resources (G3 stage) in the Salal-Haimana area of Reasi district (J&K) positions India as a potential heavyweight in global critical mineral geopolitics.',
    coreBodyPoints: [
      {
        heading: '1. Geological Occurrence & Typology in India',
        points: [
          'Hard-Rock Bauxite & Clay Associations: The Reasi (J&K) discovery occurs in bauxite-bearing horizons overlying Sirban limestone within the Sub-Himalayan Shivalik foothills, distinct from South American salt flats (Salar de Atacama).',
          'Pegmatite Hard-Rock Deposits: Pegmatite dykes of the Marlagalla-Allapatna area in Mandya district (Karnataka) and the Katghora block in Korba district (Chhattisgarh) host spodumene and lepidolite ores.',
          'Subsurface Saline Brines: High-altitude hypersaline lakes in the Ladakh Trans-Himalayas (Tso Kar, Puga geothermal springs) and Sambhar Lake in Rajasthan represent potential brine sources.'
        ]
      },
      {
        heading: '2. Geoeconomic Significance for Strategic Autonomy',
        points: [
          'Breaking China Import Monopoly: India currently imports 100% of its raw lithium and >70% of finished lithium-ion cells from China and Hong Kong. Domestic extraction insulates the EV industry against supply-chain weaponization.',
          'Propelling Net Zero 2070 & Panchamrit: Accelerates domestic manufacturing under the Production Linked Incentive (PLI) scheme for Advanced Chemistry Cell (ACC) Battery Storage (₹18,100 Cr).',
          'Export Diversification: Unlocks potential membership in the elite US-led Minerals Security Partnership (MSP).'
        ]
      },
      {
        heading: '3. Acute Ecological Challenges in Eco-Fragile Terrains',
        points: [
          'Himalayan Seismic Vulnerability: Reasi lies in Seismic Zone IV/V near the active Main Boundary Thrust (MBT); open-cast blasting and subsurface strip mining can destabilize fragile slopes, inducing catastrophic landslides into the Chenab river basin.',
          'Hydrological Contamination & Heavy Water Consumption: Extracting 1 tonne of lithium from hard-rock spodumene consumes over 2 million litres of water and releases hazardous acid leaching tailings, threatening downstream Himalayan spring water security.',
          'Displacement & Local Livelihoods: Balancing Gujjar-Bakerwal grazing rights with mega-industrial mineral concessions.'
        ]
      }
    ],
    mapDiagramStrategy: 'India map plotting lithium exploration nodes: Reasi (J&K) hard-rock sub-Himalayan block, Mandya (Karnataka) pegmatite belt, Katghora (Chhattisgarh), and Puga Valley / Tso Kar geothermal brine zones.',
    associatedCoordinates: [
      { placeName: 'Salal-Haimana Lithium Block', state: 'Jammu and Kashmir', lat: 33.082, lon: 74.832, note: '5.9 million tonnes inferred lithium resource in Reasi' },
      { placeName: 'Mandya Pegmatite Belt', state: 'Karnataka', lat: 12.523, lon: 76.897, note: 'Spodumene pegmatite deposit explored by AMD' },
      { placeName: 'Katghora Critical Mineral Block', state: 'Chhattisgarh', lat: 22.502, lon: 82.551, note: 'India\'s first commercially auctioned lithium mineral block' }
    ],
    governmentSchemesAndPolicies: [
      'Mines and Minerals (Development and Regulation) Amendment Act 2023 (de-listing 6 atomic minerals including lithium)',
      'National Critical Minerals Mission (NCMM)',
      'PLI Scheme for Advanced Chemistry Cell (ACC) Battery Storage',
      'KABIL (Khanij Bidesh India Ltd) joint-venture sourcing in Argentina and Australia'
    ],
    conclusion: 'Lithium sovereignty is vital for India\'s decarbonization and industrial future. However, mining in the young, tectonically active Himalayas cannot proceed on business-as-usual extraction paradigms. India must mandate closed-loop hydrometallurgical processing, zero-liquid discharge (ZLD), and aggressive lithium battery circular recycling to harmonize industrial ambitions with Himalayan ecology.',
    syllabusKeywords: [
      'Lithium (White Gold)',
      'Salal-Haimana Reasi Deposit',
      'Critical Minerals',
      'Energy Transition',
      'Advanced Chemistry Cell (ACC)',
      'Mines and Minerals Amendment Act 2023',
      'Panchamrit Targets',
      'Himalayan Seismicity'
    ]
  }
];

// Helper search and filter utilities
export function getMainsAnswersByPaper(paper: 'GS Paper 1' | 'GS Paper 3'): MainsModelAnswer[] {
  return MAINS_MODEL_ANSWERS.filter((a) => a.paper === paper || a.paper === 'GS Paper 1 & 3');
}

export function getMainsAnswersByTheme(theme: string): MainsModelAnswer[] {
  return MAINS_MODEL_ANSWERS.filter((a) => a.topicTheme.toLowerCase().includes(theme.toLowerCase()));
}

export function searchMainsAnswers(query: string): MainsModelAnswer[] {
  const q = query.trim().toLowerCase();
  if (!q) return MAINS_MODEL_ANSWERS;
  return MAINS_MODEL_ANSWERS.filter((a) =>
    a.question.toLowerCase().includes(q) ||
    a.topicTheme.toLowerCase().includes(q) ||
    a.syllabusKeywords.some((k) => k.toLowerCase().includes(q)) ||
    a.introduction.toLowerCase().includes(q)
  );
}
