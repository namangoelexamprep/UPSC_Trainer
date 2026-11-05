/**
 * UPSC Civil Services Examination - Mains General Studies Paper 1 (Geography)
 * 10-Year Archive & Structured Syllabus Compendium (2014 - 2024)
 * Complete with official UPSC questions, sub-theme tags, model value-addition,
 * and spatial diagram blueprints.
 */

export interface MainsGS1QuestionItem {
  id: string;
  year: number;
  questionNumber: number;
  marks: 10 | 15;
  wordLimit: 150 | 250;
  syllabusSection:
    | 'Geomorphology & Geodynamics'
    | 'Climatology & Oceanography'
    | 'Biogeography & Environmental Geography'
    | 'Economic Geography & Resources'
    | 'Human & Urban Geography'
    | 'Location of Industries';
  subTheme: string;
  officialQuestion: string;
  introductoryAngle: string;
  keyStructuralArguments: string[];
  mandatoryDiagram: string;
  topperTrapAvoidance: string;
  recommendedKeywords: string[];
}

export const UPSC_MAINS_GS1_ARCHIVE: MainsGS1QuestionItem[] = [
  // -------------------------------------------------------------------------
  // 2024 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2024-q1',
    year: 2024,
    questionNumber: 1,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Plate Tectonics & Volcanism',
    officialQuestion: 'How does the theory of plate tectonics explain the mechanism of volcanism and earthquake occurrence along the Pacific Ring of Fire? Illustrate.',
    introductoryAngle: 'The Pacific Ring of Fire (Circum-Pacific Belt) is a 40,000 km horse-shoe shaped seismically active zone accounting for >75% of world active volcanoes and ~90% of global earthquakes, governed by subduction along destructive plate boundaries.',
    keyStructuralArguments: [
      'Subduction & Flux Melting: Pacific Plate subducting beneath North American, Eurasian, and Indo-Australian plates introduces hydrous minerals into the asthenosphere, lowering rock melting point to form explosive andesitic/dacitic composite volcanoes.',
      'Megathrust Earthquakes: Stick-slip frictional locking along the subduction contact builds immense elastic strain, releasing catastrophically in shallow-to-deep Wadati-Benioff zone earthquakes (e.g. 2011 Tohoku M9.1).',
      'Oceanic Trench & Island Arc Systems: Marianas Trench, Aleutian Arc, and Kuril-Kamchatka trenches represent surface morphotectonic expressions of converging oceanic-continental lithosphere.'
    ],
    mandatoryDiagram: 'Circum-Pacific subduction cross-section: Subducting oceanic plate, Wadati-Benioff earthquake zone dots, ascending magma diapirs, volcanic island arc, and oceanic trench.',
    topperTrapAvoidance: 'Do not omit the role of water/volatiles in flux melting; volcanism along subduction zones is primarily caused by hydrous fluxing rather than simple decompression.',
    recommendedKeywords: ['Wadati-Benioff Zone', 'Flux Melting', 'Andesitic Volcanism', 'Megathrust Fault', 'Oceanic Trench', 'Circum-Pacific Belt']
  },
  {
    id: 'mains-gs1-2024-q2',
    year: 2024,
    questionNumber: 2,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Location of Industries',
    subTheme: 'Critical Minerals & Geopolitics',
    officialQuestion: 'Account for the present-day geographical concentration of the lithium-ion battery manufacturing industry. What are the constraints in expanding this industry in India?',
    introductoryAngle: 'The lithium-ion battery value chain is hyper-concentrated in East Asia, with China controlling >75% of cell manufacturing and 80% of cathode refining, driven by early state subsidies, supply chain clustering, and mineral locking in South America and Africa.',
    keyStructuralArguments: [
      'Raw Material Sourcing Monopolies: Spatially constrained upstream supply: Lithium Triangle (Chile, Argentina, Bolivia), Australia (hard-rock spodumene), and DRC (Cobalt >70%), with chemical refining consolidated in coastal Chinese hubs (Hunan, Jiangsu).',
      'Ecosystem & Scale Economics: Gigafactories demand collocated component supply chains (anodes from synthetic graphite, separators, electrolyte salts) and uninterrupted high-voltage green energy.',
      'Constraints Confronting India: 100% initial import reliance on processed precursor salts, nascent commercialization of Reasi deposits, capital-intensive capex, and limited domestic battery recycling infrastructure.'
    ],
    mandatoryDiagram: 'Global supply chain flow diagram: Upstream extraction (Australia/Chile/DRC) -> Midstream processing (China) -> Downstream cell fabrication -> Electric mobility consumption centers (Europe, US, India).',
    topperTrapAvoidance: 'Distinguish between upstream mining of raw lithium ore and midstream chemical refining (battery-grade lithium hydroxide/carbonate), where the real geopolitical bottleneck lies.',
    recommendedKeywords: ['Gigafactory', 'Cathode Precursor', 'Lithium Triangle', 'PLI Advanced Chemistry Cell', 'Reasi Inferred Deposit', 'Urban Mining']
  },
  {
    id: 'mains-gs1-2024-q3',
    year: 2024,
    questionNumber: 3,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'Marine Heatwaves & Coral Bleaching',
    officialQuestion: 'What are Marine Heatwaves? Discuss their genesis and evaluate their socio-ecological consequences on coastal fisheries and coral reef ecosystems with special reference to India.',
    introductoryAngle: 'Marine Heatwaves (MHWs) are prolonged periods of anomalously high sea surface temperatures (>90th percentile threshold relative to baseline for at least 5 consecutive days), exacerbated by climate change and altered ocean-atmosphere circulations.',
    keyStructuralArguments: [
      'Genesis Mechanisms: Weakened surface winds suppressing evaporative ocean cooling, persistent atmospheric high-pressure heat domes, and suppressed vertical upwelling of deep nutrient-rich waters during positive IOD or El Niño years.',
      'Coral Reef Mortality: Thermal stress induces expulsion of symbiotic zooxanthellae dinoflagellates, triggering mass bleaching and structural collapse in Gulf of Mannar, Andaman Islands, and Lakshadweep.',
      'Fish Migration & Pelagic Disruption: Shifts commercial fish stocks (oil sardine, mackerel) poleward into cooler depths, crippling traditional small-scale artisanal fishermen and causing massive coastal socioeconomic distress.'
    ],
    mandatoryDiagram: 'Map of North Indian Ocean: Demarcate Gulf of Kutch, Lakshadweep, Gulf of Mannar, and Andaman Sea with marine heatwave anomaly contours and bleached reef icons.',
    topperTrapAvoidance: 'Do not confuse regular seasonal warming with a formally classified Marine Heatwave; explicitly mention duration (>= 5 days) and the 90th percentile temperature threshold.',
    recommendedKeywords: ['Zooxanthellae Expulsion', 'Gulf of Mannar', 'Atmospheric Heat Dome', 'Thermal Stratification', 'Sardinella longiceps', 'Artisanal Fisheries']
  },

  // -------------------------------------------------------------------------
  // 2023 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2023-q1',
    year: 2023,
    questionNumber: 4,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Economic Geography & Resources',
    subTheme: 'Groundwater Crisis & Depletion',
    officialQuestion: 'Why is the world facing an acute water crisis? How has groundwater overexploitation exacerbated this challenge in northwestern India?',
    introductoryAngle: 'While water covers ~71% of Earth\'s surface, only 2.5% is freshwater, of which less than 1% is accessible in aquifers, lakes, and rivers. Increasing anthropogenic abstraction driven by tubewell revolutions and climate extremes has tipped groundwater tables into negative recharge deficits.',
    keyStructuralArguments: [
      'Global Drivers: Population expansion, water-intensive livestock diets, industrial pollution, and transboundary river basin tensions (Nile, Indus, Tigris-Euphrates).',
      'Northwestern India Crisis: Punjab, Haryana, and western UP extract >150% of annual replenishable groundwater (Stage of Extraction > 100%), spurred by free agricultural electricity subsidies and procurement incentives for water-thirsty paddy.',
      'Socio-Ecological Repercussions: Progressive lowering of water table (>0.5 m/year), aquifer drying, arsenic and fluoride mobilization, and soil salinization (reh/kallar).'
    ],
    mandatoryDiagram: 'Diagram of Aquifer Overexploitation: Perched water table vs cone of depression under submersible tubewell; regional map of Punjab-Haryana-Rajasthan groundwater critical zones.',
    topperTrapAvoidance: 'Connect the groundwater crisis explicitly to cropping patterns (paddy-wheat monoculture) and energy policies (unmetered agricultural power) rather than solely blaming rainfall deficits.',
    recommendedKeywords: ['Cone of Depression', 'Stage of Extraction', 'Paddy-Wheat Monoculture', 'Arsenic Mobilization', 'Atal Bhujal Yojana', 'Jal Shakti Abhiyan']
  },
  {
    id: 'mains-gs1-2023-q2',
    year: 2023,
    questionNumber: 5,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Fjord Coastlines & Glacial Geomorphology',
    officialQuestion: 'What are Fjords and how are they formed? Why are they ecologically significant and where are they primarily distributed globally?',
    introductoryAngle: 'A fjord is a long, narrow, deep inlet of the sea flanked by steep mountainous cliffs, created by the marine submergence of a glaciated U-shaped valley with a characteristic shallow rock sill at its mouth.',
    keyStructuralArguments: [
      'Formation Process: Quaternary alpine and continental glaciers carved deep U-shaped valleys below sea level; post-glacial sea level rise (Flandrian transgression) drowned these troughs.',
      'Ecological Significance: Cold-water deep basins serve as vital blue carbon sinks, sheltered nursery habitats for cold-water corals, and productive salmon fisheries.',
      'Global Distribution: High-latitude coasts subjected to Pleistocene glaciation (Norway, western coast of Canada/Alaska, southern Chile, New Zealand South Island, Greenland).'
    ],
    mandatoryDiagram: 'Cross-section of a Fjord: Submerged U-shaped trough, hanging valley tributary waterfall, steep glaciated cliff walls, and shallow threshold rock sill at mouth.',
    topperTrapAvoidance: 'Always emphasize the presence of the "rock sill" (threshold) at the fjord mouth created by terminal glacial moraines, which distinguishes fjords from drowned river valleys (rias).',
    recommendedKeywords: ['Flandrian Transgression', 'U-Shaped Trough', 'Rock Sill Threshold', 'Blue Carbon Sink', 'Hanging Valley', 'Pleistocene Glaciation']
  },
  {
    id: 'mains-gs1-2023-q3',
    year: 2023,
    questionNumber: 6,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Human & Urban Geography',
    subTheme: 'Urban Heat Island & Microclimate',
    officialQuestion: 'Explain the formation of Urban Heat Islands (UHIs). How can urban morphology and spatial planning be redesigned to mitigate thermal stress in expanding Indian cities?',
    introductoryAngle: 'An Urban Heat Island (UHI) is a microclimatic metropolitan phenomenon where urban and suburban areas experience significantly higher surface and ambient air temperatures (typically 3–8°C higher) compared to surrounding rural peripheries.',
    keyStructuralArguments: [
      'Thermal Mass & Albedo: Low-albedo asphalt, bitumen, and dark roofs absorb shortwave solar radiation during the day and re-radiate it slowly as longwave thermal infrared heat at night.',
      'Urban Canyon Geometry: Tall multi-storey concrete buildings reduce sky view factor (SVF), trapping multiple reflected heat rays and impeding natural horizontal wind ventilation.',
      'Anthropogenic Heat Emission: Massive exhaust from split air-conditioners, vehicular internal combustion engines, and industrial factories.',
      'Mitigation Blueprints: Cool roofs (high solar reflectance index paint), urban bioswales and vertical green facades, expanding tree canopy cover to >=30%, and orienting street layouts along prevailing breeze corridors.'
    ],
    mandatoryDiagram: 'Urban Heat Island Temperature Bell Profile: Plot temperature on Y-axis across Rural -> Suburban -> Commercial Downtown (Peak) -> Urban Residential -> Rural.',
    topperTrapAvoidance: 'Highlight that UHIs not only cause discomfort but drastically exacerbate nocturnal thermal stress, heat-related cardiovascular mortality, and secondary ground-level ozone smog.',
    recommendedKeywords: ['Sky View Factor (SVF)', 'Solar Reflectance Index (SRI)', 'Urban Canyon', 'Low Albedo Surface', 'Cool Roof Policy', 'Ground-Level Ozone']
  },

  // -------------------------------------------------------------------------
  // 2022 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2022-q1',
    year: 2022,
    questionNumber: 7,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'Tropospheric Jet Streams',
    officialQuestion: 'What are Jet Streams? How do they influence the onset and withdrawal of the Southwest Monsoon in India?',
    introductoryAngle: 'Jet streams are narrow ribbons of fast-flowing, meandering westerly and easterly winds circulating in the upper troposphere (9–12 km altitude) with velocities frequently exceeding 150–300 km/h, driven by horizontal temperature and pressure gradients.',
    keyStructuralArguments: [
      'Subtropical Westerly Jet (STWJ) & Monsoon Onset: During winter and pre-monsoon, the STWJ bifurcates around the Tibetan plateau, with its southern branch flowing south of the Himalayas over the Gangetic plain, capping convection. Its sudden northward jump across the Tibetan plateau in late May/early June triggers a dramatic surface pressure drop, initiating the "Burst of the Monsoon".',
      'Tropical Easterly Jet (TEJ): Intense summer radiative sensible heating of the high Tibetan plateau creates upper-tropospheric anticyclogenesis, expelling the Tropical Easterly Jet (TEJ) south of 15°N towards the Arabian Sea, reinforcing the surface southwest monsoon airflow.',
      'Monsoon Withdrawal: In late September, cooling of the Tibetan landmass weakens the TEJ, allowing the Subtropical Westerly Jet to return south of the Himalayas, ushering in the retreating monsoon.'
    ],
    mandatoryDiagram: 'Dual-phase diagram: (A) Winter/Pre-monsoon: STWJ bifurcating around Tibet with southern branch blocking monsoon. (B) Peak Summer: STWJ shifted north of Tibet, TEJ established over Peninsular India.',
    topperTrapAvoidance: 'Clarify the distinction between the Subtropical Westerly Jet Stream (which must depart north of the Himalayas) and the Tropical Easterly Jet Stream (which arrives over Peninsular India to sustain the monsoon).',
    recommendedKeywords: ['Subtropical Westerly Jet', 'Tropical Easterly Jet', 'Tibetan Anticyclone', 'Burst of Monsoon', 'Bifurcation around Tibet', 'Thermal Upper Trough']
  },
  {
    id: 'mains-gs1-2022-q2',
    year: 2022,
    questionNumber: 8,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Location of Industries',
    subTheme: 'Footloose Industries & Electronics',
    officialQuestion: 'Examine the geographical factors underlying the location of "Footloose Industries" with special reference to semiconductor and electronics manufacturing in India.',
    introductoryAngle: 'Footloose industries are light, high-value manufacturing enterprises that are not tied to raw material sites or market peripheries (Material Index ~1), as their inputs and outputs are compact, non-weight-losing, and easily transportable without substantial freight cost penalties.',
    keyStructuralArguments: [
      'Critical Locational Determinants: High-speed air connectivity (air-freight hubs for ultra-clean microchips), reliable uninterrupted electricity supply, abundant ultra-pure water (UPW) reserves, and proximity to high-density software engineering talent pools.',
      'Spatial Clusters in India: Bengaluru, Hyderabad, Chennai (Sriperumbudur), and Noida-Greater Noida have emerged as premier electronics manufacturing hubs due to synergistic technology clusters.',
      'Semiconductor Fabrication (Fab) Geography: Dholera SIR (Gujarat) and Sanand (Micron packaging hub) were selected due to massive flat land availability, uninterrupted water canals (Narmada), port access, and direct fiscal subsidies under the India Semiconductor Mission (ISM).'
    ],
    mandatoryDiagram: 'India map highlighting Electronics and Semiconductor nodes: Dholera/Sanand (Gujarat), Noida (UP), Sriperumbudur (Tamil Nadu), Bengaluru (Karnataka), Hyderabad (Telangana).',
    topperTrapAvoidance: 'Do not treat electronics assembly (SMT) and true semiconductor wafer fabrication (Fab) as identical; Fabs require extreme seismic stability and millions of litres of daily Ultra-Pure Water.',
    recommendedKeywords: ['Material Index ~1', 'Ultra-Pure Water (UPW)', 'India Semiconductor Mission', 'Agglomeration Economies', 'Cleanroom Standards', 'Dholera SIR']
  },

  // -------------------------------------------------------------------------
  // 2021 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2021-q1',
    year: 2021,
    questionNumber: 9,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Geothermal Energy & Plate Boundaries',
    officialQuestion: 'Explain the geographical distribution of geothermal energy resources in India. What are the technological and economic impediments in harnessing geothermal power?',
    introductoryAngle: 'Geothermal energy is clean, baseload heat energy generated from Earth\'s radioactive core and sub-surface magma chambers, manifesting on the surface as thermal hot springs, geysers, and fumaroles along active tectonic faults.',
    keyStructuralArguments: [
      'Geographical Provinces in India (GSI classification): (1) Himalayan Geothermal Belt (Puga & Chhumathang in Ladakh, Manikaran in Parbati valley, Tattapani); (2) SONATA Lineament (Narmada-Tapi-Son rift zone); (3) West Coast Geothermal Province (Rajapur, Unhavre); (4) Bakreswar-Sohna belt.',
      'Impediments in Harnessing: High upfront exploration drilling capital, corrosive mineral-rich thermal fluids damaging turbine piping, remoteness of high-enthalpy fields (Puga at 4,400 m altitude), and low geothermal enthalpy (<120–150°C) across most peninsular sites requiring binary-cycle power plants.'
    ],
    mandatoryDiagram: 'India outline map plotting the 5 Geothermal Provinces: Puga Valley (Ladakh), Manikaran (HP), Tattapani (Chhattisgarh), West Coast (Maharashtra), and Bakreswar (WB).',
    topperTrapAvoidance: 'Aspirants often confuse high-enthalpy volcanic geothermal fields (like Iceland/New Zealand) with India\'s medium-to-low enthalpy non-volcanic fracture zones; explicitly state that India lacks active volcanic geothermal fields (except Barren Island).',
    recommendedKeywords: ['Puga Valley', 'SONATA Lineament', 'Binary-Cycle Plant', 'High Enthalpy vs Low Enthalpy', 'Manikaran', 'Baseload Green Power']
  },
  {
    id: 'mains-gs1-2021-q2',
    year: 2021,
    questionNumber: 10,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Biogeography & Environmental Geography',
    subTheme: 'Cryosphere & Glacial Retreat',
    officialQuestion: 'How does the melting of Arctic sea ice impact the global weather systems and specifically the Indian monsoon circulation? Discuss.',
    introductoryAngle: 'The Arctic is warming at nearly four times the global rate—a phenomenon termed "Arctic Amplification". The unprecedented loss of multi-year sea ice disrupts the polar vortex, weakens the circumpolar jet stream, and triggers far-reaching atmospheric teleconnections impacting the Indian summer monsoon.',
    keyStructuralArguments: [
      'Arctic Amplification & Polar Jet Meandering: Diminished temperature gradient between the Arctic and the mid-latitudes slows the circumpolar polar jet stream, creating high-amplitude, stalled Rossby waves that lock atmospheric weather systems in place.',
      'Teleconnection with Indian Monsoon: Studies by the National Centre for Polar and Ocean Research (NCPOR) show that Arctic sea-ice loss in the Barents-Kara seas perturbs mid-latitude geopotential heights, causing anomalous planetary wave propagation that deepens monsoon breaks or triggers extreme cloudburst pulses.',
      'Sea Level Rise & Coastal Vulnerability: Accelerated melting of Greenland ice sheets injects meltwater, accelerating sea level rise threatening Indian megacities (Mumbai, Kolkata, Chennai).'
    ],
    mandatoryDiagram: 'Teleconnection schematic: Arctic Amplification -> Decreased latitudinal temperature gradient -> Wavy meandering Rossby Jet Stream -> Perturbed monsoon trough over India.',
    topperTrapAvoidance: 'Cite India\'s Arctic research presence (Himadri research station in Ny-Ålesund, Svalbard and the IndARC underwater observatory) to demonstrate empirical awareness.',
    recommendedKeywords: ['Arctic Amplification', 'Rossby Waves', 'Polar Jet Stream', 'Barents-Kara Sea', 'NCPOR', 'Himadri Station', 'Monsoon Break Spells']
  },

  // -------------------------------------------------------------------------
  // 2020 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2020-q1',
    year: 2020,
    questionNumber: 11,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Circum-Pacific vs Alpine-Himalayan Volcanism',
    officialQuestion: 'Discuss the geophysical characteristics of Circum-Pacific and Mid-Atlantic volcanic zones. How do their magma chemistries and eruption types differ?',
    introductoryAngle: 'Volcanism along the Circum-Pacific Belt is primarily subduction-driven (convergent margin), whereas Mid-Atlantic volcanism is seafloor-spreading-driven (divergent constructive boundary), creating stark contrasts in lithosphere rheology and magma viscosity.',
    keyStructuralArguments: [
      'Circum-Pacific Belt (Destructive Plate Boundary): Subducting oceanic slabs undergo partial melting under water-rich fluxing, yielding intermediate-to-acidic andesitic and rhyolitic magmas (high silica >60%, high viscosity, trapped gases), causing catastrophic explosive eruptions (e.g. Pinatubo, Mount St. Helens, Krakatoa).',
      'Mid-Atlantic Ridge (Constructive Divergent Boundary): Decompression melting of the ascending asthenosphere generates basic basaltic magma (low silica ~45-50%, low viscosity, high fluidity), resulting in non-explosive, effusive fissure eruptions and pillow lavas.',
      'Morphological Disparity: Steep composite stratovolcanoes with caldera collapses dominate the Pacific rim; submarine ridges and volcanic rift islands (Iceland) dominate the Atlantic.'
    ],
    mandatoryDiagram: 'Side-by-side cross section: (A) Subduction zone composite volcano with viscous magma chamber. (B) Divergent mid-ocean ridge with central rift valley and quiet basaltic upwelling.',
    topperTrapAvoidance: 'Clearly correlate magma silica percentage with viscosity and explosivity; silica content determines whether eruption is explosive (andesite) or effusive (basalt).',
    recommendedKeywords: ['Andesitic Magma', 'Basaltic Fissure', 'Silica Content', 'Flux Melting vs Decompression', 'Pillow Lava', 'Mid-Atlantic Ridge']
  },
  {
    id: 'mains-gs1-2020-q2',
    year: 2020,
    questionNumber: 12,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Economic Geography & Resources',
    subTheme: 'Continental Shelf & Marine Resources',
    officialQuestion: 'The continental shelf of India holds strategic hydrocarbon, placer mineral, and blue economy resources. Critically evaluate the prospects and environmental hazards of continental shelf exploitation.',
    introductoryAngle: 'The continental shelf is the shallow, gently sloping seaward extension of the continental landmass (<200 m depth). India possesses an expansive continental shelf of ~468,000 km² and an Exclusive Economic Zone (EEZ) of 2.37 million km² hosting critical offshore resources.',
    keyStructuralArguments: [
      'Hydrocarbon Wealth: Deep sedimentary basins on the western shelf (Mumbai High, Bassein, Cambay Basin) and eastern shelf (Krishna-Godavari Deepwater Basin, Cauvery offshore) produce the majority of India\'s domestic crude oil and natural gas.',
      'Placer Minerals & Heavy Sands: Littoral and shelf bottom sands contain valuable heavy placer minerals (ilmenite, rutile, zircon, monazite, sillimanite) along the Kerala-Tamil Nadu (Chavara, Manavalakurichi) and Odisha (Chatrapur) coastlines.',
      'Blue Economy & Mariculture: Vast shallow neritic zones support major demersal fisheries, seaweed mariculture, and potential offshore wind installations (Gulf of Khambhat & Gulf of Mannar).',
      'Environmental Hazards: Risk of catastrophic blowout oil spills, seismic airgun testing deafening cetaceans (dolphins and baleen whales), seafloor sediment dredging choking benthic habitats, and coastal erosion.'
    ],
    mandatoryDiagram: 'Cross-section of Continental Margin: Continental Shelf (<200 m) -> Shelf Break -> Continental Slope -> Continental Rise -> Abyssal Plain. Annotate offshore drilling platform and placer sediment deposit.',
    topperTrapAvoidance: 'Distinguish between the wide western continental shelf (up to 300 km off Mumbai High) and the narrow eastern continental shelf (30–60 km), which affects resource accessibility.',
    recommendedKeywords: ['Mumbai High', 'KG-D6 Basin', 'Heavy Placer Sands', 'Neritic Zone', 'Demersal Fisheries', 'Benthic Smothering']
  },
  {
    id: 'mains-gs1-2020-q3',
    year: 2020,
    questionNumber: 13,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Human & Urban Geography',
    subTheme: 'Inter-State River Water Disputes',
    officialQuestion: 'Inter-state river water disputes in India are a manifestation of growing regional water scarcity, asymmetric federalism, and changing hydro-climatic regimes. Analyze with reference to Cauvery and Krishna disputes.',
    introductoryAngle: 'Water is a state subject under Entry 17, List II (subject to Entry 56, List I on inter-state rivers). With rising agricultural irrigation demand, rapid urbanization, and erratic monsoon precipitation, peninsular river basins have transformed into zero-sum inter-state hydro-political battlegrounds.',
    keyStructuralArguments: [
      'Cauvery River Basin Dynamics: Conflict between upper-riparian Karnataka (demanding water for Cauvery basin irrigation and Bengaluru drinking needs) and lower-riparian Tamil Nadu (protecting the ancient Cauvery delta samba paddy crops). Deficit-sharing during distress monsoon years remains the primary flashpoint.',
      'Krishna River Basin Friction: Dispute between Maharashtra, Karnataka, Telangana, and Andhra Pradesh over water allocation for mega-projects (Almatti Dam height increase, Srisailam and Nagarjunasagar storage, Kaleshwaram Lift Irrigation).',
      'Institutional Weaknesses: Ad-hoc water dispute tribunals under Article 262 and Inter-State River Water Disputes Act 1956 suffer from protracted litigations lasting decades without real-time data-sharing.',
      'Way Forward: Establish river-basin organizations (RBOs) with statutory autonomy, install telemetry-based automated discharge sensors, and shift cropping patterns away from water-thirsty sugarcane and summer paddy.'
    ],
    mandatoryDiagram: 'Map of South India: Trace the courses of Krishna and Cauvery rivers. Mark key riparian friction nodes: Almatti Dam, Srisailam Dam, Mettur Dam, and the Cauvery Delta.',
    topperTrapAvoidance: 'Do not present it as a purely legal dispute; emphasize the geographic realities of the rainshadow zone (Vidarbha/Rayalaseema) versus deltaic irrigation dependencies.',
    recommendedKeywords: ['Cauvery Management Authority', 'Almatti Dam', 'Distress Sharing Formula', 'Article 262', 'Kaleshwaram Lift Irrigation', 'River Basin Organization']
  },

  // -------------------------------------------------------------------------
  // 2019 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2019-q1',
    year: 2019,
    questionNumber: 14,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Biogeography & Environmental Geography',
    subTheme: 'Mangrove Ecosystems & Coastal Protection',
    officialQuestion: 'Discuss the causes of depletion of mangroves in coastal India and explain their importance in maintaining coastal ecology and storm protection.',
    introductoryAngle: 'Mangroves are specialized, salt-tolerant (halophytic) inter-tidal forested ecosystems occupying tropical and subtropical sheltered coastlines, estuaries, and deltas, covering ~4,992 km² in India (0.15% of national geographical area).',
    keyStructuralArguments: [
      'Ecological Roles: (1) Bio-Shield Protection: Dense prop-roots and pneumatophores attenuate up to 66% of wave energy during tropical cyclones and storm surges (e.g. Sundarbans sheltering Kolkata during Amphan 2020); (2) Blue Carbon Storage: Sequester carbon up to 4–5 times faster than terrestrial tropical forests; (3) Nursery for marine fish, tiger prawns, and mud crabs.',
      'Drivers of Depletion: Uncontrolled commercial aquaculture (shrimp ponds in Andhra Pradesh and Tamil Nadu), port infrastructure construction and dredging, upstream river diversion reducing freshwater-silt inflows (increasing estuarine hypersalinity), and domestic sewage discharge.'
    ],
    mandatoryDiagram: 'Zonation of Mangrove Coast: Red Mangrove (Rhizophora prop roots in intertidal zone) -> Black Mangrove (Avicennia pneumatophores) -> White Mangrove -> Terrestrial forest.',
    topperTrapAvoidance: 'Mention specific Indian mangrove hubs beyond Sundarbans: Bhitarkanika (Odisha), Pichavaram (Tamil Nadu), Coringa (Andhra Pradesh), and Gulf of Kutch (Gujarat).',
    recommendedKeywords: ['Halophytes', 'Pneumatophores', 'Pichavaram', 'Bhitarkanika', 'Blue Carbon', 'Wave Energy Attenuation', 'Aquaculture Encroachment']
  },
  {
    id: 'mains-gs1-2019-q2',
    year: 2019,
    questionNumber: 15,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'Ocean Currents & Global Climate Equilibrium',
    officialQuestion: 'How do ocean currents and water masses influence the global climate and commercial fishing grounds? Illustrate with examples.',
    introductoryAngle: 'Ocean currents are continuous, directed horizontal movements of seawater driven by planetary winds (Trade winds, Westerlies), Coriolis force, and thermohaline density gradients, functioning as the global climate thermostat by redistributing solar heat poleward.',
    keyStructuralArguments: [
      'Thermal Regulation: Warm currents (Gulf Stream, Kuroshio) transport equatorial heat to high-latitude coasts, keeping ports ice-free (e.g. Murmansk in Russia kept open year-round by the North Atlantic Drift). Cold currents (California, Peru/Humboldt, Canaries, Benguela) cool tropical coastlines and induce atmospheric subsidence, creating major coastal deserts (Atacama, Namib, Mojave).',
      'Commercial Fishing Ground Genesis: Where warm and cold currents converge (e.g., Gulf Stream meets cold Labrador Current over Grand Banks of Newfoundland; Kuroshio meets Oyashio off Hokkaido, Japan), strong vertical mixing and dense plankton blooms generate the world\'s richest pelagic fishing grounds.',
      'Upwelling Coastal Zones: Cold upwelling currents (Peruvian Coast, California) bring nutrient-rich nitrates and phosphates from ocean depths, supporting massive anchovy fisheries.'
    ],
    mandatoryDiagram: 'World Ocean Current Map: Plot Gulf Stream converging with Labrador Current at Grand Banks; Kuroshio converging with Oyashio off Japan; Peru Current and adjacent Atacama desert.',
    topperTrapAvoidance: 'Always mention the navigational hazard of dense fog formed at warm-cold convergence zones (advection fog over Grand Banks), which accompanies the rich fishing grounds.',
    recommendedKeywords: ['North Atlantic Drift', 'Grand Banks', 'Thermohaline Circulation', 'Kuroshio-Oyashio', 'Upwelling', 'Advection Fog', 'Atacama Desert']
  },
  {
    id: 'mains-gs1-2019-q3',
    year: 2019,
    questionNumber: 16,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Economic Geography & Resources',
    subTheme: 'Petroleum Refineries & Spatial Decoupling',
    officialQuestion: 'Petroleum refineries in India are no longer tied to oil-well heads but are increasingly located near coastal and market centers. Examine the factors responsible for this spatial shift.',
    introductoryAngle: 'Unlike crude oil extraction which is geologically restricted to sedimentary basins, petroleum refining is a capital-intensive manufacturing industry. Over 85% of India\'s crude oil is imported, causing the industry to decouple completely from domestic oilfields and relocate to coastal deep-water ports and inland consumption pipelines.',
    keyStructuralArguments: [
      'Shift Towards Coastal Ports: (1) Heavy Import Reliance: Handling imported crude from Middle East, West Africa, and Russia; coastal refineries (Jamnagar - Reliance, Vadinar - Nayara, Kochi, Mangalore, Paradip) minimize inland crude freight; (2) Export-Led Refining Hub: Jamnagar functions as the world\'s largest refining complex (>1.24 mbpd), importing crude and exporting high-value Euro-VI petrol and aviation turbine fuel (ATF); (3) Deep-Draft Single Point Moorings (SPMs) accommodate Very Large Crude Carriers (VLCCs).',
      'Shift Towards Inland Market Hubs: Refineries located at Mathura, Panipat, Bina, and Bhatinda cater to high-density diesel and petrol consumption markets in the Gangetic plain, connected to coastal terminals via cross-country crude oil pipelines (e.g. Mundra-Panipat, Salaya-Mathura pipelines).'
    ],
    mandatoryDiagram: 'India map plotting coastal refineries (Jamnagar, Vadinar, Mumbai, Kochi, Mangalore, Paradip, Haldia) and inland pipeline-fed refineries (Panipat, Mathura, Bina, Barauni) with connecting pipeline routes.',
    topperTrapAvoidance: 'Cite the difference between weight-losing raw-material industries (like sugar/iron ore) and refining, where crude oil undergoes cracking without significant loss in mass, making product transport via pipeline flexible.',
    recommendedKeywords: ['Jamnagar Mega Refinery', 'Single Point Mooring (SPM)', 'Crude Oil Pipeline', 'Import Dependency', 'Euro-VI Fuels', 'Panipat Refinery']
  },

  // -------------------------------------------------------------------------
  // 2018 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2018-q1',
    year: 2018,
    questionNumber: 17,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Landslides in Himalayas vs Western Ghats',
    officialQuestion: 'Differentiate the causes of landslides in the Western Ghats and the Himalayas. Why do catastrophic debris flows recur in both regions?',
    introductoryAngle: 'While both mountain systems experience severe slope instability and mass wasting during the monsoon season, their underlying geodynamic triggers, lithology, and morphotectonic profiles diverge significantly.',
    keyStructuralArguments: [
      'Himalayan Landslides (Tectonic & Geodynamic Dominance): Tectonically active young fold mountains undergoing continuous crustal uplift; sheared and fractured sedimentary/metamorphic strata; steep vertical relief; triggered by tectonic earthquakes, glacial melt, cloudbursts, and heavy blast-drilling for highways and tunnels.',
      'Western Ghats Landslides (Climatic & Regolith Dominance): Geologically stable, rigid Precambrian shield fault-scarp; weathered laterite and thick saprolite regolith capping granite-gneiss basement; triggered by intense, prolonged orographic rainfall (>3000 mm) saturating the soil overburden, exacerbated by deforestation, slope toe-cutting for roads, and monoculture plantations (tea/rubber).',
      'Common Threat: Both regions suffer from human toe-excavation of hill slopes, absence of slope drainage, and climate change-induced torrential rainfall bursts.'
    ],
    mandatoryDiagram: 'Comparative Cross-Section: (A) Himalayas: Folded thrust fault (MCT), shattered rock strata, seismic trigger. (B) Western Ghats: Ancient basalt/gneiss bedrock, saturated laterite regolith slip plane.',
    topperTrapAvoidance: 'Do not attribute Western Ghats landslides to earthquakes; seismicity is negligible in Western Ghats compared to the active thrust faults of the Himalayas.',
    recommendedKeywords: ['Tectonic Uplift', 'Lateritic Regolith', 'Shear Failure', 'Slope Toe-Cutting', 'Saprolite', 'Cloudburst', 'Debris Flow']
  },
  {
    id: 'mains-gs1-2018-q2',
    year: 2018,
    questionNumber: 18,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Biogeography & Environmental Geography',
    subTheme: 'Coral Reef Bleaching & Ocean Acidification',
    officialQuestion: 'Assess the impact of global warming on coral reef ecosystems. What are the specific threats faced by the coral reefs of the Indian Ocean?',
    introductoryAngle: 'Coral reefs are biodiverse, biogenic calcium carbonate (CaCO3) structures built by colonies of anthozoan polyps living in obligate endosymbiosis with photosynthetic microalgae (zooxanthellae). Referred to as the "rainforests of the ocean", they cover <0.1% of ocean floor but sustain >25% of all marine species.',
    keyStructuralArguments: [
      'Impact of Global Warming (Bleaching Mechanism): Elevated sea surface temperatures (1–2°C above summer maximums) cause metabolic breakdown in zooxanthellae, releasing reactive oxygen species (ROS). The coral polyp expels the microalgae, losing its pigmentation and primary energy source, resulting in starvation and disease.',
      'Ocean Acidification: Rising atmospheric CO2 absorbed by oceans reduces seawater pH and carbonate ion concentration ([CO3^2-]), drastically impairing the calcification rates required to build aragonite skeletons.',
      'Specific Threats to Indian Ocean Reefs: (1) Gulf of Mannar: Destructive bottom-trawling, seaweed harvesting, and sedimentation from port dredging; (2) Lakshadweep: Recurrent El Niño warming episodes (1998, 2010, 2016, 2024); (3) Gulf of Kutch: Industrial chemical effluents from coastal refineries and salt manufacturing.'
    ],
    mandatoryDiagram: 'Symbiotic Cycle Diagram: Healthy Coral (Polyps + Zooxanthellae exchanging sugars & nutrients) -> Thermal Stress -> Zooxanthellae Expulsion -> Bleached White Skeleton -> Mortality.',
    topperTrapAvoidance: 'Highlight that while bleached corals are severely stressed, they are not immediately dead; if ocean temperatures normalize within weeks, zooxanthellae can re-colonize the polyp.',
    recommendedKeywords: ['Zooxanthellae', 'Ocean Acidification', 'Aragonite Saturation', 'Gulf of Mannar', 'Bottom-Trawling', 'Thermal Bleaching', 'Reactive Oxygen Species']
  },

  // -------------------------------------------------------------------------
  // 2017 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2017-q1',
    year: 2017,
    questionNumber: 19,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'Spatial Salinity Distribution in Oceans',
    officialQuestion: 'Account for the variation in salinity levels between the Arabian Sea and the Bay of Bengal.',
    introductoryAngle: 'Salinity is the total concentration of dissolved mineral salts in seawater (global average ~35 parts per thousand, ‰). Despite occupying the same tropical latitude (8°N to 25°N), the Arabian Sea and the Bay of Bengal exhibit stark salinity contrasts.',
    keyStructuralArguments: [
      'Arabian Sea High Salinity (>36–37‰): High evaporation exceeding precipitation under hot dry winds blowing from surrounding deserts (Thar, Arabian Peninsula); minimal riverine discharge (only Narmada, Tapi, and short Western Ghats rivulets); saline water influx from the Persian Gulf and Red Sea.',
      'Bay of Bengal Low Salinity (<30–33‰): Huge freshwater discharge from major perennial river systems (Ganga, Brahmaputra, Mahanadi, Godavari, Krishna, Irrawaddy) diluting surface waters; enclosed embayment receiving copious monsoon rainfall (>2000–3000 mm); restricted surface water mixing.'
    ],
    mandatoryDiagram: 'Comparative map of Northern Indian Ocean: Mark Arabian Sea (36-37‰, arrows showing high evaporation and Persian Gulf inflow) vs Bay of Bengal (<30-33‰, massive arrows showing Ganga-Brahmaputra freshwater inflow).',
    topperTrapAvoidance: 'Note that the salinity difference is most pronounced in the top 100 metres; below the halocline, deep ocean salinity differences become minimal.',
    recommendedKeywords: ['Halocline', 'Freshwater Influx', 'Evaporation-Precipitation Ratio', 'Persian Gulf Saline Water', 'Ganga-Brahmaputra Runoff', '35 parts per thousand']
  },
  {
    id: 'mains-gs1-2017-q2',
    year: 2017,
    questionNumber: 20,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'Tropical Cyclones: Bay of Bengal vs Arabian Sea',
    officialQuestion: 'Why does the Bay of Bengal generate significantly more tropical cyclones than the Arabian Sea? How is climate change altering this historic frequency pattern?',
    introductoryAngle: 'Historically, the Bay of Bengal has generated ~80% of North Indian Ocean tropical cyclones (a ratio of 4:1 compared to the Arabian Sea), earning it the reputation of the most cyclone-hazardous basin in South Asia.',
    keyStructuralArguments: [
      'Historic Causes for Bay of Bengal Dominance: (1) Higher Sea Surface Temperatures (SSTs > 28°C maintained year-round); (2) Low Vertical Wind Shear; (3) Influx of Remnant Typhoons from the South China Sea across the Malay Peninsula; (4) Shallow, semi-enclosed concave bathymetry amplifying storm surges (e.g. 1999 Odisha Super Cyclone).',
      'Historic Causes for Arabian Sea Inactivity: Cold ocean upwelling along the western coast driven by the Somali Current, strong dry vertical wind shear from the African desert, and cooler SSTs (<27°C).',
      'Recent Climate-Induced Paradigm Shift: Rapid warming of the Arabian Sea (warming at ~0.14°C/decade) is dramatically narrowing the thermal gap, causing a 52% surge in Arabian Sea cyclones (e.g., Cyclone Tauktae 2021, Biparjoy 2023, Nisarga 2020) and rapid intensification cycles.'
    ],
    mandatoryDiagram: 'Comparative storm track diagram: Bay of Bengal (concave basin, remnant Pacific typhoons, storm surge amplification) vs Arabian Sea (warming trend, Somali upwelling barrier breaking down, Biparjoy track).',
    topperTrapAvoidance: 'Explicitly explain the concept of "Rapid Intensification" (cyclone jumping multiple categories in 24 hours), which has become common in the Arabian Sea due to high Ocean Heat Content.',
    recommendedKeywords: ['Coriolis Force', 'Ocean Heat Content (OHC)', 'Somali Upwelling', 'Rapid Intensification', 'Cyclone Biparjoy', 'Vertical Wind Shear', 'Storm Surge']
  },

  // -------------------------------------------------------------------------
  // 2016 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2016-q1',
    year: 2016,
    questionNumber: 1,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'Hot Deserts of Northern Hemisphere (20°-30°N)',
    officialQuestion: 'Major hot deserts in the northern hemisphere are located between 20-30 degree north and on the western sides of continents. Why?',
    introductoryAngle: 'Subtropical hot deserts (Sahara, Arabian, Thar, Mojave, Sonoran) are clustered in the 20°–30°N latitude belt on western continental margins due to the convergence of planetary pressure belts, trade wind directions, and ocean circulation.',
    keyStructuralArguments: [
      'Subtropical High-Pressure Belt (Horse Latitudes): Descending dry limbs of the atmospheric Hadley Cell produce anticyclonic adiabatic warming, inhibiting vertical cloud convection and rain formation.',
      'Off-shore Northeast Trade Winds: In the tropical belt, winds blow from northeast to southwest (east to west). By the time trade winds reach western continental margins, they have shed moisture over eastern and central landmasses, turning dry and desiccating.',
      'Cold Ocean Currents along Western Coasts: Canary Current (off Sahara), California Current (off Mojave/Sonoran), and West Australian Current desiccate coastal air, create thermal temperature inversions, and suppress precipitation.'
    ],
    mandatoryDiagram: 'World Map sketch showing 20°-30°N belt: Mark Sahara, Mojave, Thar deserts on western margins with off-shore trade wind arrows and cold currents (Canary, California) creating coastal fog but zero rain.',
    topperTrapAvoidance: 'Always mention all three pillars: Hadley cell subsiding air, offshore trade winds, and cold coastal upwelling currents. Leaving out cold currents is the common student lapse.',
    recommendedKeywords: ['Hadley Cell Subsidence', 'Subtropical Anticyclone', 'Offshore Trade Winds', 'Desiccating Winds', 'Cold Ocean Currents', 'Canary Current', 'Thermal Inversion']
  },
  {
    id: 'mains-gs1-2016-q2',
    year: 2016,
    questionNumber: 2,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Geosynclines and Himalayan Orogeny',
    officialQuestion: 'In what characteristics can the Himalayas be termed as a geosyncline? Explain the origin of the Himalayas with special reference to plate tectonics.',
    introductoryAngle: 'The Himalayas represent the youngest, highest tertiary fold mountain system on Earth, having evolved through the closing of the shallow sedimentary Tethys Geosyncline during the continent-continent collision of the Indo-Australian and Eurasian tectonic plates.',
    keyStructuralArguments: [
      'Himalayas as a Geosynclinal Origin (Kober & Suess): The marine sedimentary strata forming the Tibetan Tethyan Himalayas contain fossiliferous limestone, ammonites (shaligram), and marine trilobites, proving deposition in the intervening Tethys marine trough between Angaraland and Gondwanaland.',
      'Plate Tectonics Convergence: Initiated ~50–55 Ma when the northward-drifting Indian Plate collided with the stationary Eurasian Plate, crumpling and buckling the Tethyan sediments into parallel fold ranges.',
      'Structural Zonation & Boundary Thrusts: Progressive southward propagation created three longitudinal thrust faults: Main Central Thrust (MCT - Greater vs Lesser Himalayas), Main Boundary Thrust (MBT - Lesser vs Shiwaliks), and Himalayan Frontal Thrust (HFT - Shiwaliks vs Indo-Gangetic Plains).',
      'Ongoing Seismotectonics: Continuous northward convergence (~4-5 cm/yr) stores immense elastic strain, creating an active seismic gap vulnerable to future high-magnitude earthquakes.'
    ],
    mandatoryDiagram: 'Plate tectonic cross-section of Himalaya: Indian Shield, Indo-Gangetic alluvium, HFT, Shiwalik Range, MBT, Pir Panjal/Lesser Himalayas, MCT, Greater Himalayas, Indus-Tsangpo Suture Zone (ITSZ), and Tibetan Plateau.',
    topperTrapAvoidance: 'Distinguish between Kober\'s classical geosynclinal theory (sediment compression between rigid forelands) and modern Plate Tectonics (continental collision and lithospheric underthrusting).',
    recommendedKeywords: ['Tethys Geosyncline', 'Indus-Tsangpo Suture Zone (ITSZ)', 'Main Central Thrust (MCT)', 'Main Boundary Thrust (MBT)', 'Himalayan Frontal Thrust (HFT)', 'Continent-Continent Collision', 'Underthrusting']
  },
  {
    id: 'mains-gs1-2016-q3',
    year: 2016,
    questionNumber: 3,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Economic Geography & Resources',
    subTheme: 'South China Sea: Geopolitics & Energy Geographies',
    officialQuestion: 'The South China Sea has assumed great geopolitical and geostrategic significance in recent times. Critically examine.',
    introductoryAngle: 'The South China Sea (SCS) is a marginal sea of the western Pacific spanning 3.5 million km², serving as the jugular vein of Indo-Pacific trade and a contested theater of hydrocarbon riches, maritime boundaries, and great-power rivalry.',
    keyStructuralArguments: [
      'Global Chokepoints & Trade Lifelines: Over one-third of global maritime shipping ($3.4 trillion annually) and 80% of crude oil supplies destined for Japan, South Korea, and China transit the Strait of Malacca and SCS sealanes.',
      'Subsea Hydrocarbon & Mineral Riches: US EIA estimates 11 billion barrels of oil and 190 trillion cubic feet of natural gas reserves beneath seabed shoals, alongside polymetallic nodules and abundant fishery stocks feeding 300 million coastal residents.',
      'Territorial Overlaps & Nine-Dash Line: China\'s expansive historic claims clash with the EEZs of Vietnam, the Philippines, Malaysia, Brunei, and Taiwan, defying the 2016 Permanent Court of Arbitration (PCA) ruling under UNCLOS.',
      'Militarization of Artificial Features: Land reclamation at Fiery Cross, Subi, and Mischief Reefs (Spratlys) with dual-use military airstrips, radars, and naval pens establishes anti-access/area-denial (A2/AD) capabilities.',
      'Strategic Implications for India: ~55% of India\'s external trade transits SCS; ONGC Videsh holds exploration stakes in Vietnam\'s offshore blocks (Block 128); underpinning India\'s "Act East" policy and SAGAR vision.'
    ],
    mandatoryDiagram: 'South China Sea Strategic Map: Depict 9-Dash Line, Spratly & Paracel Islands, Scarborough Shoal, Malacca Strait entry chokepoint, and claimant littoral EEZs.',
    topperTrapAvoidance: 'Balance the answer between physical/economic resources (oil, fish, trade lanes) and strategic power dynamics (freedom of navigation FONOPs, UNCLOS compliance, India\'s Act East stakes).',
    recommendedKeywords: ['Nine-Dash Line', 'UNCLOS 1982', 'Spratly Islands', 'Paracel Islands', 'Strait of Malacca', 'Exclusive Economic Zone (EEZ)', 'ONGC Videsh Block 128', 'Freedom of Navigation']
  },

  // -------------------------------------------------------------------------
  // 2015 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2015-q1',
    year: 2015,
    questionNumber: 4,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Climatology & Oceanography',
    subTheme: 'ENSO, Walker Cell & Indian Summer Monsoon',
    officialQuestion: 'How far do you agree that the behaviour of the Indian Monsoon has been erratic due to El Niño and La Niña? Explain with spatial impact.',
    introductoryAngle: 'The Indian Summer Monsoon (Southwest Monsoon) delivers >75% of India\'s annual rainfall, modulated by ocean-atmosphere coupled systems including the El Niño Southern Oscillation (ENSO), Indian Ocean Dipole (IOD), and Madden-Julian Oscillation (MJO).',
    keyStructuralArguments: [
      'El Niño Mechanism (Warm Phase): Abnormal warming of central and eastern equatorial Pacific weakens the Walker Circulation and shifts the rising limb eastward, displacing the tropical easterly jet and causing atmospheric subsidence over the Indian subcontinent, triggering droughts (e.g. 2002, 2009, 2015, 2023).',
      'La Niña Mechanism (Cool Phase): Unusually cold Pacific SSTs reinforce strong ascending air over the maritime continent and India, often causing surplus rainfall, intensified monsoon depressions, and widespread flooding (e.g. 2010, 2020).',
      'Non-Linear & Non-Deterministic Nature: El Niño does not universally equal drought; ~40% of El Niño years did not cause all-India drought (e.g. 1997 Super El Niño was cushioned by a strongly positive Indian Ocean Dipole).',
      'Spatial Rainfall Asymmetry: Central India, Northwest India (Punjab, Rajasthan), and the rainshadow Deccan plateau suffer the highest precipitation deficit during El Niño, while northeast India frequently experiences anomalous excess rainfall.'
    ],
    mandatoryDiagram: 'Walker Circulation Shift diagram: Normal/La Niña (Ascending limb over Western Pacific/India, descending limb over Peru) vs El Niño (Warm pool displaced eastwards, descending air and anticyclonic dry cap over India).',
    topperTrapAvoidance: 'Emphasize that ENSO is not the sole controller; always mention mitigating/aggravating factors like Positive Indian Ocean Dipole (IOD) and Eurasian snow cover.',
    recommendedKeywords: ['Walker Circulation', 'Southern Oscillation Index (SOI)', 'Indian Ocean Dipole (IOD)', 'Equatorial Sea Surface Temperature', 'Subsidence Limb', 'Tropical Easterly Jet']
  },
  {
    id: 'mains-gs1-2015-q2',
    year: 2015,
    questionNumber: 5,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Location of Industries',
    subTheme: 'Iron and Steel Industry: Global & Indian Location Dynamics',
    officialQuestion: 'Explain the factors responsible for the location of the iron and steel industry in the world, with special reference to India.',
    introductoryAngle: 'The iron and steel industry is a classical "heavy, weight-losing" raw-material oriented metallurgical industry governed by Alfred Weber\'s Principle of Material Index (MI > 1), historically tied to proximate iron ore and coking coal deposits.',
    keyStructuralArguments: [
      'Raw Material Proximity (Historical Phase): Smelting 1 tonne of pig iron requires ~1.6 tonnes of iron ore, ~0.7 tonnes of coking coal, and ~0.2 tonnes of limestone. Hence early clusters anchored on coalfields (Ruhr Basin in Germany, Pittsburgh in USA, Donbas in Ukraine) or iron ore ranges (Chota Nagpur Plateau: Jamshedpur, Bokaro, Rourkela, Bhilai).',
      'Market & Scrap Re-Orientation (Mini-Steel Plants): Electric arc furnaces using steel scrap and sponge iron locate near large urban industrial markets (e.g., western India, Tokyo-Yokohama in Japan) to eliminate freight logistics on heavy finished products.',
      'Coastal & Transshipment Nodes: Exhaustion of domestic coking coal and high-grade ores in developed nations shifted production to deep-water ports relying on imported Australian/Brazilian ores (e.g., Rotterdam in Europe, Kobe/Osaka in Japan, Visakhapatnam and Paradip in India).',
      'Technological Decoupling: Shift from Blast Furnace-Basic Oxygen Furnace (BF-BOF) to Green Hydrogen Direct Reduced Iron (DRI) is further freeing modern plants from coal-basin geographic determinism.'
    ],
    mandatoryDiagram: 'India Map showing Iron & Steel clusters: Chota Nagpur raw-material belt (TISCO, Bokaro, Durgapur, Rourkela), coastal hubs (Vizag, Salem, Vijayanagar), and market-based mini-steel zones.',
    topperTrapAvoidance: 'Do not just list Indian steel plants; clearly trace the evolutionary shift from coalfields/ore-heads to coastal ports and scrap-based market locations.',
    recommendedKeywords: ['Material Index (MI > 1)', 'Weber\'s Industrial Location Theory', 'Coking Coal Dependency', 'Chota Nagpur Mineral Belt', 'Tidewater Steel Plants', 'Electric Arc Furnace', 'Visakhapatnam Steel Plant']
  },
  {
    id: 'mains-gs1-2015-q3',
    year: 2015,
    questionNumber: 6,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Biogeography & Environmental Geography',
    subTheme: 'Marine Hypoxia & Dead Zones',
    officialQuestion: 'What are the consequences of the spreading of "Dead Zones" in marine ecosystems? Identify vulnerable regions in Indian coastal waters.',
    introductoryAngle: 'Marine dead zones are hypoxic ocean regions where dissolved oxygen falls below 2 milligrams per litre (mg/L), rendering benthic and pelagic waters unable to sustain marine animal life.',
    keyStructuralArguments: [
      'Eutrophication Cascade: Agricultural runoff rich in nitrogenous (urea) and phosphatic fertilizers triggers massive algal blooms; decomposing organic matter consumes dissolved oxygen, creating vast anoxic subsurface waters.',
      'Ecological Consequences: Mass fish die-offs, collapse of coral reef calcification, alteration of benthic food webs, and emission of potent greenhouse gases like nitrous oxide (N₂O) and toxic hydrogen sulfide (H₂S).',
      'Vulnerable Indian Waters: The Northern Bay of Bengal is prone to oxygen minimum zones (OMZs) due to heavy nutrient delivery from the Ganga-Brahmaputra basin; parts of the eastern Arabian Sea coastline off Kerala and Goa suffer seasonal upwelling hypoxia during the post-monsoon period.'
    ],
    mandatoryDiagram: 'Eutrophication cycle schematic: Agricultural fertilizer runoff → Microalgae bloom → Algae death & sinking → Aerobic bacterial decomposition → Dissolved Oxygen depletion (<2 mg/L) → Marine Dead Zone.',
    topperTrapAvoidance: 'Clarify that hypoxia can occur naturally through coastal upwelling, but anthropogenic agricultural runoff and industrial effluents vastly accelerate and expand dead zones.',
    recommendedKeywords: ['Hypoxia (<2 mg/L Dissolved Oxygen)', 'Eutrophication', 'Oxygen Minimum Zone (OMZ)', 'Benthic Suffocation', 'Ganga-Brahmaputra Nutrient Flux', 'Coastal Upwelling']
  },

  // -------------------------------------------------------------------------
  // 2014 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2014-q1',
    year: 2014,
    questionNumber: 7,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Economic Geography & Resources',
    subTheme: 'Blue Economy: Indian Ocean Hydrocarbons & Seabed Minerals',
    officialQuestion: 'Critically evaluate the resource potentials of the Indian Ocean for India\'s maritime economy and blue development.',
    introductoryAngle: 'With an expansive coastline of 7,516 km and an Exclusive Economic Zone (EEZ) encompassing 2.37 million km², the Indian Ocean represents a pivotal strategic frontier for India\'s long-term energy security, mineral independence, and Blue Economy.',
    keyStructuralArguments: [
      'Deep-Sea Polymetallic Nodules & Sulphides: India holds exclusive exploration rights from the International Seabed Authority (ISA) over 75,000 km² in the Central Indian Ocean Basin (CIOB) containing nickel, copper, cobalt, and rare earths, bolstered by the Deep Ocean Mission (Samudrayaan / MATSYA 6000).',
      'Offshore Energy & Gas Hydrates: Offshore basins (Mumbai High, Bassein, Krishna-Godavari deepwater KG-D6, Cauvery basin) supply major domestic hydrocarbon output; National Gas Hydrate Program (NGHP) estimates immense methane hydrate reserves in deep sediments.',
      'Marine Fisheries & Mariculture: Indian Ocean marine fisheries support >4 million coastal fisherfolk and yield $8+ billion in seafood exports, though near-shore waters suffer from bottom-trawling overexploitation.',
      'Ocean Renewable Energy: High potential for Off-shore Wind Energy (Gulf of Khambhat, Mannar), Tidal Energy (Gulf of Kutch 7,000 MW), and Ocean Thermal Energy Conversion (OTEC, Lakshadweep/Kavaratti).',
      'Sustainable Blue Governance: Balancing resource harvesting with environmental protection under SDG 14 (Life Below Water), coastal zoning (CRZ), and Marine Protected Areas (MPAs).'
    ],
    mandatoryDiagram: 'India EEZ & Resource map: Highlight Central Indian Ocean Basin nodule zone, KG Basin and Mumbai High offshore gas fields, Gulf of Kutch tidal hub, and deep-sea exploration blocks.',
    topperTrapAvoidance: 'Include institutional initiatives like the Deep Ocean Mission, Sagarmala port-led development, and ISA licenses to elevate your answer beyond general geography.',
    recommendedKeywords: ['Polymetallic Nodules', 'Central Indian Ocean Basin (CIOB)', 'Deep Ocean Mission (MATSYA 6000)', 'Methane Hydrates', 'Exclusive Economic Zone', 'SDG 14', 'International Seabed Authority']
  },
  {
    id: 'mains-gs1-2014-q2',
    year: 2014,
    questionNumber: 8,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Economic Geography & Resources',
    subTheme: 'Green Revolution: Spatial Concentration & Ecological Repercussions',
    officialQuestion: 'Why did the Green Revolution in India remain confined to the north-western region? What were its ecological and geographical repercussions?',
    introductoryAngle: 'Launched in the mid-1960s to overcome chronic food deficits and "ship-to-mouth" PL-480 dependency, the Green Revolution spearheaded by Norman Borlaug and M.S. Swaminathan transformed India into a food-surplus nation, but remained geographically hyper-concentrated.',
    keyStructuralArguments: [
      'Determinants of NW Regional Concentration: (1) Assured Canal & Tubewell Irrigation (Bhakra Nangal network in Punjab-Haryana, Western Yamuna Canal); (2) Consolidation of land holdings (chakbandi) creating large contiguous operational plots; (3) Sturdy agrarian infrastructure, cooperative credit societies, and robust Mandi networks; (4) Enterprising farming communities receptive to mechanized capital-intensive inputs.',
      'Groundwater Depletion & Water Table Collapse: Over-extraction through millions of electric tubewells (incentivized by free agricultural power) plunged water tables into the "Over-Exploited / Dark" zone across Punjab and Haryana.',
      'Soil Salinization & Micronutrient Exhaustion: Excessive canal watering in poorly drained alluvial tracts induced waterlogging and capillary-action salinization (reh/kallar); lopsided NPK ratio (distorted by urea subsidies) starved soils of zinc, sulfur, and boron.',
      'Pest Monoculture & Air Pollution: Monoculture of paddy-wheat crop rotation replaced biodiverse millets and pulses, causing pest resistance and triggering post-harvest crop residue burning (stubble smog over Indo-Gangetic Plains).'
    ],
    mandatoryDiagram: 'North-West Green Revolution Impact Map: Punjab-Haryana-Western UP triangle marked with canal networks, groundwater depletion zones, and seasonal crop residue smoke trajectory toward Delhi-NCR.',
    topperTrapAvoidance: 'Do not ignore the structural institutional causes (land reforms, consolidation, APMC Mandi infrastructure) that made NW India uniquely prepared to absorb the HYV technological package.',
    recommendedKeywords: ['HYV Seeds', 'Bhakra Nangal Canal Network', 'Capillary Salinization (Kallar)', 'Dark Zones', 'Paddy-Wheat Monoculture', 'NPK Distortion', 'Stubble Smog']
  },
  {
    id: 'mains-gs1-2014-q3',
    year: 2014,
    questionNumber: 9,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Geomorphology & Geodynamics',
    subTheme: 'Genesis of Island Arcs: Indonesia and Philippines',
    officialQuestion: 'Explain the formation of thousands of islands in the Indonesian and Philippines archipelagos.',
    introductoryAngle: 'The Indonesian and Philippine archipelagos comprise over 17,000 and 7,000 islands respectively, forming the world\'s most extensive island arc and trench systems along convergent active plate boundaries.',
    keyStructuralArguments: [
      'Oceanic-Oceanic & Oceanic-Continental Convergence: Indonesian Archipelago (Sunda Arc) formed where the dense oceanic Indo-Australian Plate subducts beneath the continental Sunda microplate along the Sunda (Java) Trench.',
      'Philippines Arc Genesis: Formed by complex two-way subduction: the Philippine Sea Plate subducting along the Philippine Trench in the east, and the Eurasian Plate subducting along the Manila Trench in the west.',
      'Volcanic Arc Accretion: Partial melting of the sinking oceanic slab generates basaltic to andesitic magma that ascends through fractures, building submarine volcanoes that emerge above sea level as volcanic island chains (e.g. Krakatoa, Merapi, Pinatubo).',
      'Accretionary Wedges & Coral Atoll Capping: Scraped trench sediments compress into tectonic mélanges (accretionary wedges), later colonised by tropical fringing and barrier coral reefs, augmenting land area.'
    ],
    mandatoryDiagram: 'Subduction Island Arc Cross-Section: Sinking oceanic lithosphere, deep trench (Java/Manila), Benioff zone, magma diapirs, volcanic island arc, and back-arc basin.',
    topperTrapAvoidance: 'Highlight that Indonesia is primarily an oceanic-continental convergent margin (Indo-Australia subducting under Sunda shelf), while the Philippines represents complex intra-oceanic convergent systems.',
    recommendedKeywords: ['Island Arc', 'Sunda Subduction Trench', 'Philippine Sea Plate', 'Accretionary Wedge', 'Andesitic Volcanism', 'Wadati-Benioff Zone', 'Ring of Fire']
  },

  // -------------------------------------------------------------------------
  // 2013 MAINS GS PAPER 1
  // -------------------------------------------------------------------------
  {
    id: 'mains-gs1-2013-q1',
    year: 2013,
    questionNumber: 10,
    marks: 15,
    wordLimit: 250,
    syllabusSection: 'Biogeography & Environmental Geography',
    subTheme: 'Western Ghats Ecology: Gadgil vs Kasturirangan Discourse',
    officialQuestion: 'Bring out the distribution of the Western Ghats and examine the ecological vulnerabilities highlighted by the Gadgil and Kasturirangan Committee reports.',
    introductoryAngle: 'The Western Ghats (Sahyadris) form an unbroken 1,600 km mountain escarpment stretching from the Tapi river valley in Gujarat to Kanyakumari in Tamil Nadu, recognized as one of the world\'s 36 global biodiversity hotspots.',
    keyStructuralArguments: [
      'Spatial Distribution & Ecological Keystone: Spanning six states (Gujarat, Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu) across 160,000 km², it functions as the hydrological water tower of peninsular India, originating Godavari, Krishna, and Cauvery rivers.',
      'Severe Ecological Vulnerabilities: Unregulated open-cast iron ore mining (Goa, Kudremukh), monotypic plantation monoculture (rubber, eucalyptus, tea), reckless quarrying and construction on steep slopes triggering lethal landslides (e.g. Wayanad 2024, Malin 2014).',
      'Madhav Gadgil Report (WGEEP, 2011): Advocated classifying 100% of the Western Ghats into three Ecologically Sensitive Zones (ESZ 1, 2, 3); recommended total ban on mining, thermal power plants, and large dams in ESZ 1, with decentralized Gram Sabha governance.',
      'Kasturirangan Committee (HLWG, 2013): Watered down protection by dividing the Western Ghats into Cultural Landscape (58%, human settlements/plantations) and Natural Landscape (42%); designated only 37% as Ecologically Sensitive Area (ESA), permitting regulated development.',
      'Path Forward: Urgent notification of ecologically sensitive zones without political dilution, combining community livelihoods with science-backed watershed conservation.'
    ],
    mandatoryDiagram: 'Western Ghats Map: Mark 6 states extent, major passes (Thal Ghat, Bhor Ghat, Palghat Gap), vulnerable mining clusters (Goa, Bellary-Kudremukh), and Gadgil vs Kasturirangan ESA demarcation line.',
    topperTrapAvoidance: 'Explicitly contrast Gadgil\'s ecocentric, bottom-up Gram Sabha framework with Kasturirangan\'s technocratic, compromised 37% ESA division.',
    recommendedKeywords: ['Sahyadri Hotspot', 'Ecologically Sensitive Zones (ESZ)', 'WGEEP (Gadgil)', 'HLWG (Kasturirangan)', 'Slope Instability', 'Hydrological Water Tower', 'Endemism']
  },
  {
    id: 'mains-gs1-2013-q2',
    year: 2013,
    questionNumber: 11,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Human & Urban Geography',
    subTheme: 'Urban Heat Island (UHI) Effect in Indian Megacities',
    officialQuestion: 'What do you understand by the phenomenon of "Urban Heat Island" (UHI)? Discuss its causes and spatial consequences in Indian metropolitan cities.',
    introductoryAngle: 'An Urban Heat Island (UHI) is a microclimatic anomaly wherein metropolitan core areas experience significantly elevated surface and ambient temperatures (typically 3°C to 10°C higher) compared to surrounding rural peripheries.',
    keyStructuralArguments: [
      'Core Physical Causes: (1) Low Albedo & High Thermal Mass: Extensive asphalt, concrete, and dark masonry absorbing incoming solar radiation and releasing trapped heat slowly at night; (2) Urban Canyon Effect: Tall skyscrapers trapping reflected heat and impeding wind dissipation; (3) Loss of Vegetative Evapotranspiration: Rampant concretization of urban wetlands and green lungs (e.g. Bengaluru lake depletion).',
      'Anthropogenic Heat Flux: Concentrated heat exhaust from air-conditioning condenser units, internal combustion vehicles, and industrial generators.',
      'Spatial & Health Consequences in India: Intensified heatwave mortality in Delhi, Ahmedabad, and Hyderabad; elevated nocturnal temperatures preventing biological rest; formation of urban thermal domes trapping ozone and particulate smog (PM2.5).'
    ],
    mandatoryDiagram: 'Urban Heat Island Temperature Profile curve: Dip in rural areas, rising sharply over commercial core/high-rise urban center, dropping over suburban parklands, and tapering off into rural countryside.',
    topperTrapAvoidance: 'Emphasize the nocturnal dimension: UHIs are often most pronounced at night when concrete and asphalt re-radiate stored sensible heat into the lower atmosphere.',
    recommendedKeywords: ['Low Surface Albedo', 'Sensible Heat Flux', 'Evapotranspirative Cooling', 'Urban Canyon Effect', 'Anthropogenic Heat Rejection', 'Microclimate Distortion']
  },
  {
    id: 'mains-gs1-2013-q3',
    year: 2013,
    questionNumber: 12,
    marks: 10,
    wordLimit: 150,
    syllabusSection: 'Location of Industries',
    subTheme: 'Petroleum Refining Industry Location in India',
    officialQuestion: 'Analyze the factors influencing the location of the petroleum refining industry in India.',
    introductoryAngle: 'Petroleum refining is a pure weight-gaining / non-weight-losing processing industry (Material Index ≈ 1). Modern refinery location in India is dictated by raw crude access, port logistics, pipeline economics, and inland consumption centers.',
    keyStructuralArguments: [
      'Crude Source Orientation (Historical Phase): Initial refineries were situated at the well-head oilfields in Assam (Digboi 1901, Guwahati, Bongaigaon) to minimize crude transportation before pipeline technology matured.',
      'Coastal & Port Orientation (Import Dominance): India imports >85% of its crude oil requirements; locating mega-refineries at deepwater ports minimizes turnaround time and freight transshipment costs (e.g. Reliance Jamnagar - world\'s largest refining complex, Nayara Vadinar, Kochi, Mangalore, Visakhapatnam, Paradip).',
      'Market & Inland Pipeline Orientation: Refined products (petrol, diesel, aviation fuel, LPG) are more volatile, dangerous, and expensive to transport than bulk crude. Hence inland refineries locate directly adjacent to heavy consumption markets, fed by subterranean crude pipelines (e.g., Mathura, Panipat, Barauni, Bina, Bhatinda).',
      'Petrochemical Integration: Modern complexes integrate downstream petrochemical units producing polymers, synthetic fibers, and aromatics adjacent to ports and industrial corridors.'
    ],
    mandatoryDiagram: 'India Map showing crude oil pipelines and refineries: Crude import ports (Jamnagar, Vadinar, Kochi, Paradip) connecting via pipelines to inland market refineries (Mathura, Panipat, Bina, Barauni).',
    topperTrapAvoidance: 'Do not categorize petroleum refining as raw-material weight-losing; it is a weight-neutral process where pipeline transport makes market-side location highly advantageous.',
    recommendedKeywords: ['Material Index ≈ 1', 'Crude Import Dependency (>85%)', 'Jamnagar Deepwater Complex', 'Crude Pipelines (Salaya-Mathura)', 'Market-Based Location', 'Petrochemical Forward Linkages']
  }
];


// Helper functions for lookup
export function getMainsGS1QuestionsBySection(section: string): MainsGS1QuestionItem[] {
  return UPSC_MAINS_GS1_ARCHIVE.filter((q) => q.syllabusSection.toLowerCase().includes(section.toLowerCase()));
}

export function searchMainsGS1Questions(query: string): MainsGS1QuestionItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return UPSC_MAINS_GS1_ARCHIVE;
  return UPSC_MAINS_GS1_ARCHIVE.filter((item) =>
    item.officialQuestion.toLowerCase().includes(q) ||
    item.subTheme.toLowerCase().includes(q) ||
    item.syllabusSection.toLowerCase().includes(q) ||
    item.recommendedKeywords.some((k) => k.toLowerCase().includes(q))
  );
}
