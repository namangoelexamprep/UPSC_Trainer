import { GeomorphologicalProvince } from '../types';

/**
 * Comprehensive Geomorphological & Physiographic Provinces Database
 * Grounded in Geological Survey of India (GSI) and NCERT / D.N. Wadia Classical Classifications.
 * Essential for UPSC Prelims Match-the-Following and Mains GS1 Physiography Questions.
 */

export const GEOMORPHOLOGICAL_PROVINCES: GeomorphologicalProvince[] = [
  // -------------------------------------------------------------------------
  // 1. PENINSULAR SHIELD & CRATONIC CORES
  // -------------------------------------------------------------------------
  {
    id: 'geo-peninsular-shield',
    name: 'Peninsular Shield (Ancient Gondwanan Core)',
    division: 'Peninsular Plateau',
    geologicalAge: 'Archaean to Proterozoic (>2.5 to 3.8 Billion Years)',
    rockSystems: [
      'Archaean Gneisses and Granulites (Bengal Gneiss, Bundelkhand Gneiss, Nilgiri Charnockite)',
      'Dharwar Folded Metasedimentary System (Schists, Banded Iron Formations, Quartzites)',
      'Cuddapah & Vindhyan Unconformable Sedimentary Basins (Sandstones, Shales, Limestones)',
      'Gondwana Graben Sediments (Sandstones, Shales, Coal Seams)',
      'Deccan Basaltic Traps (Tholeiitic flood basalts)'
    ],
    subDivisions: [
      'Central Highlands (Malwa, Bundelkhand, Baghelkhand)',
      'Chota Nagpur Plateau (Ranchi, Hazaribagh, Rajmahal Hills)',
      'Deccan Plateau (Maharashtra, Karnataka, Telangana)',
      'Eastern Plateau (Dandakaranya, Garhjat Hills, Bastar)',
      'Northeastern Outlier (Shillong / Meghalaya Plateau & Karbi Anglong)'
    ],
    highestPeak: {
      name: 'Anamudi Peak (Annamalai Hills)',
      elevationMeters: 2695,
      lat: 10.171,
      lon: 77.064
    },
    majorDrainageBasins: [
      'Mahanadi Basin',
      'Godavari Basin (Trimbakeshwar to Rajahmundry)',
      'Krishna Basin (Mahabaleshwar to Hamsaladeevi)',
      'Cauvery Basin (Talakaveri to Poompuhar)',
      'Narmada Graben (Amarkantak to Gulf of Khambhat)',
      'Tapi Trench (Betul to Surat)'
    ],
    economicMinerals: [
      'Iron Ore (Hematite & Magnetite in Singhbhum, Bailadila, Bellary-Sandur)',
      'Bauxite (Amarkantak, Panchpatmali, Kolhapur)',
      'Chromite (Sukinda Valley in Jajpur, Odisha)',
      'Manganese (Balaghat, Nagpur, Keonjhar)',
      'Coal (Gondwana grabens: Jharia, Raniganj, Singrauli, Talcher, Singareni)',
      'Uranium (Jaduguda, Narwapahar, Tummalapalle)',
      'Rare Earths & Thorium (Monazite beach sands of Chavara & Manavalakurichi)'
    ],
    prelimsHighYieldFacts: [
      'The Peninsular shield is one of the oldest, most rigid, and stable landmasses on Earth, largely devoid of major orogenic folding since the Cambrian period.',
      'The Meghalaya (Shillong) Plateau and Karbi Anglong are geological extensions of the Peninsular block, detached by the Garo-Rajmahal Gap (Malda Fault) created during normal faulting.',
      'The Deccan Traps were erupted ~65 million years ago as the Indian subcontinent moved northward over the Réunion hotspot mantle plume.',
      'Dharwar rock system (2500–1800 Ma) is India\'s foremost economically rich rock system, hosting primary iron, gold (Kolar, Hutti), manganese, and copper.'
    ],
    mainsSignificance: 'Underpins India\'s heavy metallurgy, mineral self-sufficiency, and agricultural productivity in the black cotton soil (Regur) belt. Its fault systems control water availability and inter-state river basin federal dynamics.'
  },

  // -------------------------------------------------------------------------
  // 2. THE EXTRA-PENINSULAR HIMALAYAN MOUNTAIN SYSTEM
  // -------------------------------------------------------------------------
  {
    id: 'geo-himalayan-system',
    name: 'Extra-Peninsular Himalayan Orogenic Belt',
    division: 'Himalayan Mountain System',
    geologicalAge: 'Tertiary to Quaternary (Cenozoic Orogeny ~50 to 2 Ma, ongoing)',
    rockSystems: [
      'Tethyan Sedimentary Zone (Fossiliferous Paleozoic-Mesozoic limestones and shales)',
      'Higher Himalayan Crystalline Core (Precambrian high-grade gneisses and migmatites)',
      'Lesser Himalayan Sedimentary Zone (Proterozoic quartzites, stromatolitic carbonates, slates)',
      'Sub-Himalayan Shivalik Molasse (Neogene to Pleistocene fluvial sandstones and conglomerates)'
    ],
    subDivisions: [
      'Trans-Himalaya (Karakoram, Ladakh, Kailash, Zanskar Ranges)',
      'Great Himalaya (Himadri - continuous ice-capped crest)',
      'Lesser Himalaya (Himachal / Middle Himalaya - Pir Panjal, Dhauladhar, Mussoorie, Nag Tibba, Mahabharat)',
      'Outer Himalaya (Shivalik Hills - duns and longitudinal strike valleys)',
      'Eastern Hills / Purvanchal (Patkai Bum, Naga Hills, Manipur Hills, Mizo/Lushai Hills)'
    ],
    highestPeak: {
      name: 'Kangchenjunga (Sikkim Himalaya)',
      elevationMeters: 8586,
      lat: 27.702,
      lon: 88.147
    },
    majorDrainageBasins: [
      'Indus System (Indus, Jhelum, Chenab, Ravi, Beas, Sutlej)',
      'Ganga System (Bhagirathi, Alaknanda, Yamuna, Ghaghara, Gandak, Kosi)',
      'Brahmaputra System (Yarlung Tsangpo / Siang, Dibang, Lohit, Subansiri, Teesta)'
    ],
    economicMinerals: [
      'Limestone (Dehradun, Himachal Pradesh)',
      'Magnesite & Talc (Almora, Pithoragarh)',
      'Lithium (Salal-Haimana in Reasi, J&K)',
      'Gypsum (Ramban, J&K)',
      'Hydroelectric Potential (60% of India\'s total untapped potential)'
    ],
    prelimsHighYieldFacts: [
      'The Himalayas were born out of the compression and uplift of sediments deposited in the Tethys Geosyncline between the Angaraland (Eurasia) and Gondwanaland.',
      'Four principal longitudinal thrust fault zones separate the ranges: Indus-Tsangpo Suture Zone (ITSZ), Main Central Thrust (MCT), Main Boundary Thrust (MBT), and Main Frontal Thrust (MFT / HFT).',
      'Rivers like Indus, Sutlej, and Brahmaputra are "antecedent rivers" — they existed prior to the Himalayan uplift and maintained their courses by cutting deep V-shaped gorges through the rising ranges.',
      'Karewa formations in the Kashmir Valley are lacustrine deposits of Pleistocene age famous for saffron (Zafran) cultivation.'
    ],
    mainsSignificance: 'Functions as the climatic climatic barrier protecting India from Siberian blizzards, anchors the southwest monsoon, acts as the "Third Pole" freshwater tower, and presents acute disaster vulnerabilities (seismicity, landslides, GLOFs).'
  },

  // -------------------------------------------------------------------------
  // 3. INDO-GANGETIC-BRAHMAPUTRA ALLUVIAL TROUGH
  // -------------------------------------------------------------------------
  {
    id: 'geo-indo-gangetic-plain',
    name: 'Indo-Gangetic-Brahmaputra Foredeep Basin',
    division: 'Indo-Gangetic Plain',
    geologicalAge: 'Pleistocene to Holocene (Quaternary ~2 Ma to Present)',
    rockSystems: [
      'Unconsolidated Quaternary Alluvium (Gravel, sand, silt, and clay)',
      'Bhabar Gravel Beds (Porous alluvial fan deposits along Shivalik foot)',
      'Terai Marshy Belt (Zone of re-emerging subsurface springs and dense biomass)',
      'Bhangar (Older, calcareous alluvium with kankar nodules above floodplains)',
      'Khadar / Bet (Newer, highly fertile silt deposited by annual floodwaters)'
    ],
    subDivisions: [
      'Punjab-Haryana Plain (Ravi, Beas, Sutlej, Ghaggar interfluves / doabs)',
      'Upper Ganga Plain (Rohilkhand & Doab between Ganga and Yamuna)',
      'Middle Ganga Plain (Awadh, Mithila, Magadh - oxbow lakes & chaurs)',
      'Lower Ganga Plain & Bengal Delta (Sundarbans tidal flats and estuaries)',
      'Brahmaputra Valley (Assam Rampur trough bounded by Himalayas and Shillong plateau)'
    ],
    highestPeak: {
      name: 'Delhi Ridge (Northern spur of Aravalli Range)',
      elevationMeters: 318,
      lat: 28.613,
      lon: 77.209
    },
    majorDrainageBasins: [
      'Indus Eastern Tributaries (Sutlej, Beas, Ravi)',
      'Ganga Main Stem & Himalayan / Peninsular Tributaries (Yamuna, Chambal, Son, Ghaghara, Gandak, Kosi)',
      'Brahmaputra Trunk River & Island Chutes (Majuli river island)'
    ],
    economicMinerals: [
      'Rich alluvial topsoil (high organic & mineral fertility)',
      'Groundwater aquifers (deep multi-layered Gangetic artesian reservoirs)',
      'Brick clays, building sand, and gravel aggregates'
    ],
    prelimsHighYieldFacts: [
      'Geologically, the Indo-Gangetic trough is an "asymmetrical foredeep" formed by the down-warping of the northern peninsular crust beneath the thrust load of the rising Himalayas.',
      'Maximum sediment thickness exceeds 2,000 to 8,000 metres in the foredeep trough.',
      'Bhabar is 8–16 km wide where mountain torrents deposit coarse boulders and disappear underground; in the Terai immediately south, these streams re-emerge creating marshy, malarial tracts.',
      'Majuli in Assam is one of the world\'s largest inhabited freshwater river islands, formed by the bifurcating channels of the Brahmaputra and Subansiri.'
    ],
    mainsSignificance: 'Granary of India sustaining over 40% of the national population. Ground zero of the Green Revolution, currently confronting acute groundwater depletion, soil salinization (reh/kallar), and climate-induced flood-drought whiplash.'
  },

  // -------------------------------------------------------------------------
  // 4. COASTAL PLAINS & LITTORAL STRIPS
  // -------------------------------------------------------------------------
  {
    id: 'geo-coastal-plains',
    name: 'Indian Coastal Plains & Continental Margins',
    division: 'Coastal Plains',
    geologicalAge: 'Cretaceous to Holocene (Faulting, marine transgression & sedimentation)',
    rockSystems: [
      'Recent Marine & Alluvial Sediments (Estuarine muds, beach sands, deltaic silts)',
      'Tertiary Limestone & Sandstone Beds (Quilon and Warkalli formations in Kerala)',
      'Laterite Caps on coastal headlands',
      'Heavy Mineral Sand Placers (Ilmenite, rutile, zircon, monazite placers)'
    ],
    subDivisions: [
      'Western Coastal Plain: Kathiawar, Konkan (Maharashtra/Goa), Kannad/Karavali (Karnataka), Malabar (Kerala)',
      'Eastern Coastal Plain: Utkal Coast (Odisha), Andhra Coast / Northern Circars, Coromandel Coast (Tamil Nadu)'
    ],
    highestPeak: {
      name: 'Vedaranyam / Agasthyamala coastal foothill spurs',
      elevationMeters: 450,
      lat: 8.524,
      lon: 77.102
    },
    majorDrainageBasins: [
      'Short, high-velocity west-flowing rivers forming estuaries (Zuari, Mandovi, Sharavathi, Netravati, Periyar, Bharathappuzha)',
      'Long, mature east-flowing rivers forming vast deltas (Mahanadi, Godavari, Krishna, Cauvery)'
    ],
    economicMinerals: [
      'Beach Sand Minerals (Monazite, Ilmenite, Rutile, Sillimanite, Garnet)',
      'Petroleum & Natural Gas (KG-D6 Basin, Mumbai High, Cambay Basin, Ravva field)',
      'Marine Salt (Rann of Kutch, Tuticorin, Sambhar, Marakkanam)',
      'Silica Sands (Chavara, Alappuzha)'
    ],
    prelimsHighYieldFacts: [
      'The Western Coastal Plain is predominantly a coast of "submergence" (except Malabar which shows emergence), resulting in a narrow strip with natural deep-water ports (Mumbai, Marmagao, Cochin).',
      'The Eastern Coastal Plain is a broad coast of "emergence" characterized by wide continental shelves, barrier spits, lagoons (Chilika, Pulicat), and large delta fans, necessitating artificial ports (Chennai, Ennore).',
      'Kayals (backwaters) and Teris (coastal red sand dunes) are characteristic geomorphological landmarks of the Malabar and Coromandel coasts respectively.',
      'Chilika Lake in Odisha is the largest brackish water coastal lagoon in Asia, separated from the Bay of Bengal by a 60 km sand spit.'
    ],
    mainsSignificance: 'Critical to the Blue Economy, maritime trade under Sagarmala, energy security (offshore oil & gas), and climate resilience against tropical cyclones and coastal erosion.'
  },

  // -------------------------------------------------------------------------
  // 5. THE GREAT INDIAN DESERT (THAR DESERT)
  // -------------------------------------------------------------------------
  {
    id: 'geo-thar-desert',
    name: 'Great Indian Desert (Marusthali & Bagar)',
    division: 'Great Indian Desert',
    geologicalAge: 'Mesozoic to Quaternary (Arid geomorphic cycle & wind-blown sand)',
    rockSystems: [
      'Quaternary Aeolian Sand Dunes (Barchans, Longitudinal seifs, Transverse dunes)',
      'Mesozoic Marine Sandstones (Jaisalmer Jurassics hosting fossil wood)',
      'Tertiary Lignite & Fuller\'s Earth (Eocene Palana formation in Bikaner)',
      'Precambrian Basement (Malani Rhyolites and Erinpura Granites)'
    ],
    subDivisions: [
      'Marusthali (Real Desert: Extreme shifting dunes / dhrians & rocky hamada)',
      'Rajasthan Bagar (Semi-arid transitional steppe with seasonal streams)',
      'Rohi Tract (Fertile flood plains watered by seasonal streams in Ganganagar)'
    ],
    highestPeak: {
      name: 'Guru Shikhar (Mount Abu - Aravalli southern node)',
      elevationMeters: 1722,
      lat: 24.654,
      lon: 72.782
    },
    majorDrainageBasins: [
      'Luni River Basin (Originates near Ajmer, flows into the Rann of Kutch)',
      'Inland Playa Depressions (Sambhar, Didwana, Pachpadra, Kuchaman, Lunkaransar)',
      'Indira Gandhi Canal Command (Canalized water from Harike Barrage on Sutlej & Beas)'
    ],
    economicMinerals: [
      'Crude Oil & Natural Gas (Barmer-Sanchore basin: Mangala, Bhagyam, Aishwarya)',
      'Lignite (Palana, Barsingsar in Bikaner; Kapurdi in Barmer)',
      'Gypsum (Nagaur, Bikaner, Jaisalmer - over 90% of India\'s supply)',
      'Marble & Dimensional Stone (Makrana white marble, Jaisalmer yellow limestone)'
    ],
    prelimsHighYieldFacts: [
      'Geologically, the Thar Desert is a continuation of the Peninsular plateau, as evidenced by fossilized marine deposits at Akal Wood Fossil Park near Jaisalmer dating to the Jurassic period (~180 Ma).',
      'The Luni River is the only significant integrated river system in the desert, flowing southwesterly for 495 km before losing itself in the salt flats of the Rann of Kutch; its water is sweet up to Balotra and turns brackish downstream.',
      'Barchans are crescent-shaped shifting sand dunes whose convex arc faces the prevailing wind direction; they dominate the western borders near Jaisalmer and Bikaner.',
      'Bhadla Solar Park in Phalodi district of Rajasthan is one of the world\'s largest single-location solar power installations (>2,245 MW).'
    ],
    mainsSignificance: 'Exemplifies desertification challenges, solar and wind renewable frontiers, and the spatial transformation induced by canal irrigation (Indira Gandhi Nahar Pariyojana).'
  },

  // -------------------------------------------------------------------------
  // 6. ISLAND ARCHIPELAGOES: ANDAMAN & NICOBAR AND LAKSHADWEEP
  // -------------------------------------------------------------------------
  {
    id: 'geo-island-groups',
    name: 'Indian Island Archipelagoes',
    division: 'Islands',
    geologicalAge: 'Cretaceous-Tertiary to Recent (Volcanic arc & Coral reef atolls)',
    rockSystems: [
      'Andaman & Nicobar: Ophiolite suite, radiolarian cherts, volcanic agglomerates, and uplifted tertiary flysch sediments',
      'Lakshadweep: Biogenic coral limestone and reef debris built upon the Chagos-Laccadive submarine volcanic ridge'
    ],
    subDivisions: [
      'Great Andaman (North, Middle, South Andaman & Baratang)',
      'Little Andaman (Separated by Duncan Passage)',
      'Nicobar Group (Car Nicobar, Nancowry, Great Nicobar)',
      'Lakshadweep Amindivi Group (Amini, Chetlat, Kiltan, Kadmat, Bitra)',
      'Lakshadweep Cannanore Group (Kavaratti, Andrott, Agatti, Kalpeni)',
      'Minicoy Island (Southernmost, separated by Nine Degree Channel)'
    ],
    highestPeak: {
      name: 'Saddle Peak (North Andaman)',
      elevationMeters: 732,
      lat: 13.162,
      lon: 93.011
    },
    majorDrainageBasins: [
      'Kalpong River (Only major river in Andaman & Nicobar on North Andaman)',
      'Galathea and Alexandra Rivers (Great Nicobar Biosphere Reserve)'
    ],
    economicMinerals: [
      'Strategic Hydrocarbon Potential in Andaman Forearc Basin',
      'High-grade coral lime and guano phosphate',
      'Polymetallic nodules in adjacent central Indian Ocean floor'
    ],
    prelimsHighYieldFacts: [
      'Andaman and Nicobar Islands represent the subaerial peaks of a submerged Tertiary mountain arc that extends southward from the Arakan Yoma of Myanmar to Sumatra.',
      'Barren Island is the only confirmed active volcano in South Asia; Narcondam Island is a dormant volcanic cone.',
      'Great Nicobar is India\'s southernmost land boundary; Indira Point (6°45\' N) lies only ~140 km from the northern tip of Sumatra (Indonesia) across the Six Degree Channel.',
      'Lakshadweep islands are true coral atolls resting on a submarine ridge; the islands are entirely flat with maximum elevation not exceeding 5 metres above mean sea level.'
    ],
    mainsSignificance: 'Anchors India\'s Indo-Pacific maritime security, Exclusive Economic Zone (EEZ) rights, and strategic project nodes (Galathea Bay transshipment port) under the Great Nicobar Development Plan.'
  },

  // -------------------------------------------------------------------------
  // 7. WESTERN GHATS (SAHYADRI OROGENIC ESCARPMENT)
  // -------------------------------------------------------------------------
  {
    id: 'geo-western-ghats-sahyadri',
    name: 'Western Ghats (Sahyadri Faulted Escarpment)',
    division: 'Peninsular Plateau',
    geologicalAge: 'Late Cretaceous to Early Eocene (~65 Ma rifting & Western margin downfaulting)',
    rockSystems: [
      'Deccan Tholeiitic Basalts (Northern Sahyadri from Tapi to Belgaum)',
      'Precambrian Dharwar Schists & Banded Iron Formations (Central Sahyadri)',
      'Charnockites and Khondalite High-Grade Metamorphic Complexes (Southern Sahyadri / Nilgiri-Annamalai knot)'
    ],
    subDivisions: [
      'Northern Sahyadri (Tapi to Goa - horizontal basaltic lava sheets, steep scarp facing Arabian Sea)',
      'Central Sahyadri (Goa to Nilgiris - dense evergreen forests, Bababudan & Kudremukh iron ridges)',
      'Southern Sahyadri (South of Palghat Gap - Annamalai, Palani, Cardamom Hills & Agasthyamala)'
    ],
    highestPeak: {
      name: 'Anamudi Peak (Annamalai Range)',
      elevationMeters: 2695,
      lat: 10.171,
      lon: 77.064
    },
    majorDrainageBasins: [
      'Eastward Atlantic-style continental drainage: Godavari, Krishna, Bhima, Tungabhadra, Cauvery',
      'Westward torrential escarpment cascades: Sharavathi (Jog Falls), Zuari, Mandovi, Periyar, Pamba'
    ],
    economicMinerals: [
      'Hematite & Magnetite Iron Ore (Bababudan, Kudremukh, Goa)',
      'Bauxite caps (Kolhapur, Ratnagiri, Belgaum)',
      'Dimension Granites and Charnockite building stones',
      'Hydroelectric Potential (Koyna, Idukki, Sharavathi, Kalinadi)'
    ],
    prelimsHighYieldFacts: [
      'Geologically, the Western Ghats are not true folded mountains; they represent the faulted, uplifted western edge (horst/escarpment) of the Peninsular plateau created when Madagascar rifted away ~88 Ma.',
      'Major structural passes (Ghats) through the escarpment: Thal Ghat (Mumbai to Nashik/Kolkata), Bhor Ghat (Mumbai to Pune/Chennai), Palghat Gap (Kerala to Coimbatore/Tamil Nadu), and Shencottah Gap (Kollam to Madurai).',
      'The Western Ghats form one of the 8 "Hottest Biodiversity Hotspots" in the world, with over 30% of all plant, fish, and amphibian species being endemic.',
      'The Palghat Gap (30 km wide) is an ancient tectonic shear zone that breaches the continuous mountain wall between the Nilgiris and Annamalai hills.'
    ],
    mainsSignificance: 'Acts as the primary orographic barrier that extracts moisture from the Southwest Monsoon. The Gadgil and Kasturirangan reports underscore the acute tension between ecological preservation and linear infrastructure development.'
  },

  // -------------------------------------------------------------------------
  // 8. EASTERN GHATS DISSECTED TECTONIC RELICTS
  // -------------------------------------------------------------------------
  {
    id: 'geo-eastern-ghats-corridor',
    name: 'Eastern Ghats (Dissected Relict Mountain Belt)',
    division: 'Peninsular Plateau',
    geologicalAge: 'Proterozoic (~1.6 to 1.0 Billion Years - Grenville-age orogeny)',
    rockSystems: [
      'Khondalite Suite (Garnet-sillimanite schists and gneisses)',
      'Charnockites (Hypersthene-bearing granulites forming resistant massifs)',
      'Alkaline intrusive complexes and anorthosites'
    ],
    subDivisions: [
      'Northern Eastern Ghats (Similipal, Garhjat Hills, Mahendragiri, Malayagiri in Odisha)',
      'Central Eastern Ghats (Palkonda, Velikonda, Nallamala, Erramala in Andhra Pradesh)',
      'Southern Eastern Ghats (Javadi, Shevaroy, Panchaimalai, Sirumalai in Tamil Nadu)'
    ],
    highestPeak: {
      name: 'Arma Konda / Jindhagada Peak (Araku Valley, Andhra Pradesh)',
      elevationMeters: 1680,
      lat: 18.228,
      lon: 82.721
    },
    majorDrainageBasins: [
      'Dissected transversally by Mahanadi, Godavari, Krishna, Penna, and Cauvery',
      'Local radial streams: Vamsadhara, Nagavali, Sarada'
    ],
    economicMinerals: [
      'Bauxite (World-class lateritic caps: Panchpatmali, Pottangi, Baphlimali in Odisha)',
      'Manganese (Srikakulam, Koraput)',
      'Chromite (Eastern Ghats mobile belt)',
      'Dimension Granites (Galaxy Black Granite of Ongole)'
    ],
    prelimsHighYieldFacts: [
      'The Eastern Ghats are ancient relict fold mountains that are highly fragmented and disjointed compared to the continuous Western Ghats, worn down by millions of years of fluvial denudation.',
      'Jindhagada / Arma Konda (1,680 m) in Andhra Pradesh is the highest peak of the Eastern Ghats, surpassing Mahendragiri (1,501 m) in Odisha.',
      'Seshachalam Hills in the southern Eastern Ghats are the exclusive global habitat for the endangered and endemic Red Sanders (Pterocarpus santalinus) tree species.',
      'The Eastern Ghats converge with the Western Ghats at the Biligirirangana Hills and Nilgiri plateau.'
    ],
    mainsSignificance: 'Hosts critical tribal populations (Chenchus, Kondhs, Saoras) and bauxite-aluminium industrial corridors. Severely threatened by slash-and-burn podu cultivation, quarrying, and forest fragmentation.'
  },

  // -------------------------------------------------------------------------
  // 9. ARAVALLI RELICT OROGENIC FOLD SYSTEM
  // -------------------------------------------------------------------------
  {
    id: 'geo-aravalli-orogen',
    name: 'Aravalli Relict Orogenic Fold System',
    division: 'Peninsular Plateau',
    geologicalAge: 'Precambrian (~1.8 to 2.5 Billion Years - Oldest surviving fold belt in India)',
    rockSystems: [
      'Delhi Supergroup (Quartzites, phyllites, calc-silicates, schists)',
      'Aravalli Supergroup (Metasedimentary conglomerates, dolomitic limestones, phyllites)',
      'Banded Gneissic Complex (BGC - Archaean basement >3.0 Ga)',
      'Malani Igneous Suite (Volcanic felsic rhyolites and granitic plutons)'
    ],
    subDivisions: [
      'North-Eastern Aravalli (Delhi Ridge, Mewat hills, Khetri copper belt)',
      'Central Aravalli (Ajmer-Sambhar pass and Merwara hills)',
      'South-Western Aravalli (Mewar plateau, Bhorat plateau, Mount Abu granitic inselberg)'
    ],
    highestPeak: {
      name: 'Guru Shikhar (Mount Abu Massif)',
      elevationMeters: 1722,
      lat: 24.654,
      lon: 72.782
    },
    majorDrainageBasins: [
      'West-flowing into Arabian Sea / Rann: Luni, Sabarmati, Banas (West)',
      'East-flowing into Yamuna/Ganga: Banas (East), Berach, Sahibi'
    ],
    economicMinerals: [
      'Lead-Zinc-Silver (Zawar, Rampura-Agucha, Rajpura-Dariba - India\'s premier reserves)',
      'Copper (Khetri Copper Complex in Jhunjhunu, Chandmari)',
      'Marble & Building Stones (Makrana white marble, Rajnagar marble, Kotah stone)',
      'Rock Phosphate (Jhamarkotra near Udaipur)'
    ],
    prelimsHighYieldFacts: [
      'The Aravalli Range is one of the oldest geological mountain chains on Earth, originating during the Proterozoic Aravalli-Delhi orogeny.',
      'It acts as the great continental divide between the Indus river system (via Luni/Arabian Sea) and the Ganga-Yamuna river system (via Chambal/Bay of Bengal).',
      'The Aravallis serve as a vital ecological green wall preventing the eastward march of the Thar Desert into Haryana, Rajasthan, and Delhi-NCR.',
      'Mount Abu is a detached granitic batholith (inselberg) separated from the main Aravalli ridge by the valley of the West Banas river.'
    ],
    mainsSignificance: 'Shields the National Capital Region (NCR) from arid sandstorms and dust fronts. Unregulated mining and the destruction of the green barrier have caused severe ecological degradation and groundwater depletion.'
  },

  // -------------------------------------------------------------------------
  // 10. CHOTA NAGPUR MINERAL CRATON & DAMODAR GRABEN
  // -------------------------------------------------------------------------
  {
    id: 'geo-chota-nagpur-core',
    name: 'Chota Nagpur Craton & Gondwana Coalfields',
    division: 'Peninsular Plateau',
    geologicalAge: 'Archaean basement with Permian-Carboniferous Gondwana sediment infill (~300 Ma)',
    rockSystems: [
      'Chotanagpur Granite Gneiss Complex (CGGC)',
      'Singhbhum Iron Ore Group (Banded Hematite Jasper / Quartzite)',
      'Gondwana Sedimentary Formations (Damuda Series: Barakar, Raniganj, Karharbari coal measures)'
    ],
    subDivisions: [
      'Ranchi Plateau (Highest peneplain with western high-level bauxite "Pat lands" like Netarhat)',
      'Hazaribagh Plateau (Divided into Upper and Lower Hazaribagh/Koderma mica belt)',
      'Damodar Rift Valley (Downfaulted Gondwana graben separating Ranchi and Hazaribagh plateaus)',
      'Rajmahal Hills (Jurassic basaltic volcanic flows at the northeastern edge)'
    ],
    highestPeak: {
      name: 'Parasnath Peak (Shikharji, Giridih)',
      elevationMeters: 1366,
      lat: 23.962,
      lon: 86.136
    },
    majorDrainageBasins: [
      'Damodar River ("Sorrow of Bengal" before DVC multi-purpose dams)',
      'Subarnarekha River (Carries gold dust; originates at Nagri near Ranchi)',
      'Barakar, North Koel, South Koel, and Brahmani headwaters'
    ],
    economicMinerals: [
      'Prime Coking & Non-Coking Coal (Jharia, Raniganj, Bokaro, North Karanpura)',
      'Hematite Iron Ore (Noamundi, Gua, Kiriburu in West Singhbhum)',
      'Uranium (Jaduguda, Bhatin, Turamdih operated by UCIL)',
      'Copper (Mosabani, Rakha, Ghatsila along the Singhbhum Shear Zone)',
      'Mica (Koderma plateau - formerly world capital of ruby sheet mica)'
    ],
    prelimsHighYieldFacts: [
      'Termed the "Ruhr of India" because of its immense concentration of metallurgical coking coal and high-grade hematite iron ore within close proximity.',
      'The "Pat lands" of western Ranchi/Gumla/Lohardaga are flat-topped mesas capped with thick bauxite deposits formed by tropical weathering of basalt and granite.',
      'Parasnath Peak (1,366 m) is the holiest pilgrimage site for Jains, where 20 of the 24 Tirthankaras attained Nirvana (Moksha).',
      'The Damodar Valley Corporation (DVC), established in 1948, was India\'s first multipurpose river valley project, modeled on the Tennessee Valley Authority (TVA) of the USA.'
    ],
    mainsSignificance: 'Anchors India\'s heavy industrial base (Jamshedpur, Bokaro, Durgapur, Rourkela, Asansol). Central to the "Resource Curse / Paradox of Plenty" discourse in Indian economic development.'
  },

  // -------------------------------------------------------------------------
  // 11. TRANS-HIMALAYAN & TIBETAN BORDERLAND
  // -------------------------------------------------------------------------
  {
    id: 'geo-trans-himalaya',
    name: 'Trans-Himalayan Tectonic Zone',
    division: 'Himalayan Mountain System',
    geologicalAge: 'Cretaceous to Early Tertiary (Pre-collisional island arc & volcanic basement)',
    rockSystems: [
      'Ladakh Granitic Batholith (Calc-alkaline subduction pluton)',
      'Indus Suture Zone Ophiolites (Oceanic crust obducted during plate collision)',
      'Karakoram Metamorphic Complex and fossiliferous Tethyan limestones'
    ],
    subDivisions: [
      'Karakoram Range (Hosts K2 / Godwin Austen, Gasherbrum, Siachen and Baltoro glaciers)',
      'Ladakh Range (Leh valley divide traversed by Khardung La pass)',
      'Zanskar Range (Separates Ladakh from Kashmir and Spiti valleys)',
      'Kailash Range (Sacred pilgrimage node in southwestern Tibet)'
    ],
    highestPeak: {
      name: 'K2 (Godwin Austen, Karakoram Range)',
      elevationMeters: 8611,
      lat: 35.881,
      lon: 76.513
    },
    majorDrainageBasins: [
      'Indus Trunk River (Flows northwest in longitudinal structural depression between Ladakh and Zanskar)',
      'Shyok River ("River of Death") and Nubra River',
      'Zanskar River (Famous for winter frozen-river Chadar Trek)'
    ],
    economicMinerals: [
      'Geothermal Energy (Puga Valley and Chumathang in eastern Ladakh)',
      'Borax and Sulphur deposits (Puga Valley)',
      'Lithium brine and salt encrustations in high-altitude endorheic lakes (Tso Kar)'
    ],
    prelimsHighYieldFacts: [
      'The Trans-Himalayas lie in the extreme rainshadow of the Greater Himalayas, receiving less than 10 cm of precipitation annually, creating a high-altitude "cold desert".',
      'The Indus-Tsangpo Suture Zone (ITSZ) marks the exact collision boundary where the Indian Plate was welded to the Eurasian Plate.',
      'Siachen Glacier in the Karakoram is 76 km long, feeding the Nubra river which joins the Shyok before merging into the Indus.',
      'High-altitude hypersaline and brackish endorheic lakes: Pangong Tso (straddling India-China border) and Tso Moriri (Ramsar Wetland Site).'
    ],
    mainsSignificance: 'Geostrategic hinge between India, Pakistan, and China (Aksai Chin, Siachen, Line of Actual Control). Ground zero for renewable solar potential and cold-climate high-altitude tourism infrastructure.'
  },

  // -------------------------------------------------------------------------
  // 12. PURVANCHAL (EASTERN FOLD MOUNTAIN BELT)
  // -------------------------------------------------------------------------
  {
    id: 'geo-purvanchal-syntax',
    name: 'Purvanchal (Eastern Fold Mountain Belt)',
    division: 'Himalayan Mountain System',
    geologicalAge: 'Tertiary (~35 to 15 Ma - Eastward extrusion and Indo-Burma subduction)',
    rockSystems: [
      'Disang Series (Eocene splintery dark grey shales with sandstones)',
      'Barail Series (Oligocene sandstones hosting coal measures in Upper Assam)',
      'Tipam & Surma Series (Miocene fluvial sandstones and hydrocarbon reservoirs)'
    ],
    subDivisions: [
      'Patkai Bum (Arunachal Pradesh - Myanmar border)',
      'Naga Hills (Sarapati / Saramati peak)',
      'Manipur Hills (Enclosing the central Imphal lacustrine valley and Loktak lake)',
      'Mizo / Lushai Hills (Characterized by parallel synclines and anticlines forming ridges and valleys)'
    ],
    highestPeak: {
      name: 'Mount Saramati (Naga Hills)',
      elevationMeters: 3841,
      lat: 25.742,
      lon: 95.032
    },
    majorDrainageBasins: [
      'Chindwin-Irrawaddy Basin (Barak, Manipur river tributaries)',
      'Brahmaputra Basin (Buri Dihing, Dhansiri, Dikhow)',
      'Barak River Basin (Lifeline of Cachar and Surma valleys)'
    ],
    economicMinerals: [
      'Petroleum & Natural Gas (Digboi, Naharkatiya, Moran-Hugrijan, Geleki)',
      'Tertiary Coal (Makum coalfield with high sulfur and volatile matter)',
      'Limestone (Naga Hills and Manipur)'
    ],
    prelimsHighYieldFacts: [
      'Purvanchal ranges trend generally from north to south, formed by the eastward subduction of the Indian Plate beneath the Burma microplate.',
      'Mizoram is geomorphologically known as the "Molasses Basin" because it is constructed of unconsolidated, soft, and friable Tertiary sedimentary deposits.',
      'Keibul Lamjao National Park on Loktak Lake in Manipur is the world\'s only floating national park, home to the endangered Sangai brow-antlered deer.',
      'Mount Saramati (3,841 m) on the Nagaland-Myanmar border is the highest peak in the Purvanchal range.'
    ],
    mainsSignificance: 'Key to India\'s "Act East Policy", Kaladan Multi-Modal Transit Transport Project, and Asian Trilateral Highway. Highlights the challenges of insurgent border terrains, slash-and-burn jhum cultivation, and cross-border connectivity.'
  }
];

// Helper functions
export function getProvinceById(id: string): GeomorphologicalProvince | undefined {
  return GEOMORPHOLOGICAL_PROVINCES.find((p) => p.id === id);
}

export function getAllProvinces(): GeomorphologicalProvince[] {
  return GEOMORPHOLOGICAL_PROVINCES;
}
