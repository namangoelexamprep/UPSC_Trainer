import { Topic, Place, UPSCTopicTheory, UPSCPlaceDossier } from '../types';

export const UPSC_COAL_THEORY: UPSCTopicTheory = {
  topicId: 'coal_fields',
  conceptTitle: 'Coal Resources of India: Geological Origin, Classification, Trade & Energy Transition',
  tagline: 'GS Paper 1 (Geography: Mineral Resources) & GS Paper 3 (Energy Security & Infrastructure)',
  definition:
    'Coal is a carbonaceous, combustible sedimentary rock formed over hundreds of millions of years by the thermochemical decomposition and compaction of ancient vegetal matter (ferns, lycopods, swamp trees) under severe lithostatic pressure and thermal gradients—a biochemical transformation known as "coalification".',
  coalificationStages: [
    {
      stage: 'Peat (Pre-Coal)',
      carbon: '< 40%',
      moisture: '> 60% (Very High)',
      calorific: '< 2,500 kcal/kg',
      notes: 'First stage of vegetal decay. Spongy, brownish-yellow, fibrous matter. Burns with dense smoke and leaves copious ash.',
      places: 'Nilgiri bogs, Sundarbans mangrove peat, Karewa bogs of Kashmir'
    },
    {
      stage: 'Lignite (Brown Coal)',
      carbon: '40% – 55%',
      moisture: '30% – 45%',
      calorific: '2,800 – 4,000 kcal/kg',
      notes: 'Intermediate stage between peat and sub-bituminous coal. Low heat content, prone to spontaneous combustion when dry.',
      places: 'Neyveli & Mannargudi (Tamil Nadu - 80% of India\'s lignite), Palana (Rajasthan), Nichahom (J&K)'
    },
    {
      stage: 'Bituminous (Black Coal)',
      carbon: '60% – 80%',
      moisture: '5% – 15%',
      calorific: '5,500 – 7,500 kcal/kg',
      notes: 'Commercial backbone of India\'s power and steel. Subdivided into Coking Coal (metallurgical for blast furnaces) and Non-Coking Coal (thermal power generation).',
      places: 'Jharia, Bokaro, Raniganj, Talcher, Korba, Singrauli (Gondwana basins)'
    },
    {
      stage: 'Anthracite (Hard Coal)',
      carbon: '85% – 95%',
      moisture: '< 5% (Very Low)',
      calorific: '> 8,000 kcal/kg',
      notes: 'Highest metamorphic grade. Jet black with sub-metallic luster, conchoidal fracture. Burns with smokeless blue flame and leaves virtually no ash.',
      places: 'Extremely scarce in India; restricted to Kalakot, Jangalgali, & Reasi (Jammu & Kashmir Tertiary fold belt)'
    }
  ],
  geologicalEpochs: [
    {
      name: 'Gondwana Coalfields (~98% of Indian Reserves)',
      share: '98% of total reserves & 99% of national coal production',
      agePeriod: 'Permian to Carboniferous (~250 to 300 million years old)',
      riftBasins: [
        'Damodar Valley (Jharkhand & West Bengal: Jharia, Raniganj, Bokaro, Karanpura)',
        'Son Valley (Madhya Pradesh & UP: Singrauli, Sohagpur, Umaria)',
        'Mahanadi & Brahmani Valley (Odisha & Chhattisgarh: Talcher, Ib Valley, Korba, Hasdeo)',
        'Pranhita-Godavari Valley (Telangana: Kothagudem, Bellampalli, Singareni)',
        'Wardha Valley (Maharashtra: Chandrapur, Ballarpur)',
        'Satpura Basin (Madhya Pradesh: Pench-Kanhan, Tawa)'
      ],
      characteristics:
        'Formed in down-faulted grabens / rift basins. Fluvio-lacustrine sedimentary deposition. Low in moisture and volatile sulfur (<0.7%), but very HIGH in abrasive in-situ mineral ash (35% to 50%) due to braided river washings.',
      distribution: 'Peninsular Craton (Jharkhand, Odisha, Chhattisgarh, West Bengal, MP, Telangana, Maharashtra)'
    },
    {
      name: 'Tertiary Coalfields (~2% of Indian Reserves)',
      share: 'Under 2% of total reserves',
      agePeriod: 'Eocene, Oligocene to Miocene (~15 to 60 million years old)',
      riftBasins: [
        'Assam: Makum, Nazira, Margherita, Jaipur',
        'Meghalaya: Cherrapunji, Jaintia & Garo Hills (notorious for hazardous rat-hole mining)',
        'Arunachal Pradesh: Namchik-Namphuk coalfield',
        'Nagaland: Borjan, Nazira belt',
        'Lignite Belts: Neyveli (Tamil Nadu), Palana (Rajasthan), Nichahom (Kashmir)'
      ],
      characteristics:
        'Associated with marine and estuarine coastal/extra-peninsular fold sequences. Low ash content (<10%), high calorific value, but HIGH in undesirable organic sulfur (2% to 7%), causing sulfur dioxide emissions and acid mine drainage.',
      distribution: 'Extra-Peninsular Himalayas, North-Eastern Hill tracts, Coastal Tamil Nadu & Rajasthan'
    }
  ],
  whyFoundThere: [
    {
      title: 'Tectonic Rifting & Graben Preservation',
      geologicalContext:
        'During the late Paleozoic era, extensive continental rifting occurred across the Gondwana landmass. Linear crustal depressions (graben troughs) subsided continuously.',
      tectonicProcess:
        'Dense Glossopteris flora and swamp forests accumulated in these subsiding troughs and were rapidly buried under river sediments, preventing atmospheric oxidation and weathering. This preserved the thick Gondwana coal seams inside fault valleys (Damodar, Mahanadi, Son, Godavari).'
    },
    {
      title: 'Peninsular Shield Stability vs. Himalayan Fold Shear',
      geologicalContext:
        'The Indian Peninsular Shield has remained tectonically stable since the Precambrian, preserving the horizontal stratification of Gondwana coal seams.',
      tectonicProcess:
        'Conversely, Tertiary coal in the Northeast and Kashmir was crushed, sheared, and folded by the intense tectonic collision between the Indian and Eurasian plates, making extraction technically treacherous.'
    }
  ],
  indiaStanding: {
    reservesRank: '5th Largest in the World (~361.4 Billion Tonnes proved/indicated/inferred)',
    reservesFigure: 'Top reserve states: 1st Odisha, 2nd Jharkhand, 3rd Chhattisgarh, 4th West Bengal, 5th Madhya Pradesh',
    productionRank: '2nd Largest Producer globally (surpassed 1 Billion Tonnes in FY 2023-24, behind only China)',
    productionFigure: 'Coal India Limited (CIL, Maharatna PSU) contributes ~80% of total domestic production',
    importVolume: '2nd Largest Coal Importer globally (~240 to 260 Million Tonnes annually)',
    importRationale: {
      coking:
        'India imports over 85% of its Prime Coking Coal requirement (~55 MT/yr) chiefly from Australia, USA, and Indonesia. Indian Gondwana coal has high ash content (35-50%) and low vitrinite caking index, which damages blast furnace refractories in steel plants. Blast furnaces require ash <10%.',
      thermal:
        'Coastal power plants in Gujarat, Maharashtra, Tamil Nadu, and Andhra Pradesh import Non-Coking Thermal Coal from Indonesia and South Africa because maritime ocean freight is cheaper than Indian Railways rail freight across 1,500+ km from inland eastern pitheads.'
    },
    sourceCountries: ['Australia (Coking Coal)', 'Indonesia (Thermal & Blending Coal)', 'South Africa', 'USA', 'Russia'],
    exportFootprint: 'Negligible exports (~1-2 MT) strictly to landlocked neighbors: Nepal, Bhutan, Bangladesh under bilateral friendship protocols.'
  },
  economicAndIndustrialUses: [
    {
      sector: 'Thermal Power Generation',
      sharePct: '~70% of India\'s total electricity',
      role: 'Base-load electricity provider to the national grid through Super Thermal Power Stations (NTPC, state gencos).',
      forwardBackwardLinkage:
        'Direct backward linkage to coal rakes of Indian Railways (generating >40% of railway freight revenue); forward linkage to all heavy manufacturing and domestic power.'
    },
    {
      sector: 'Iron & Steel Industry',
      sharePct: '~12% of domestic coal & ~85% imported coking coal',
      role: 'Reducing agent and fuel in blast furnaces to reduce hematite iron ore into molten pig iron.',
      forwardBackwardLinkage:
        'Vital metallurgical linkage centered in the Chhota Nagpur industrial cluster (Jamshedpur, Bokaro, Rourkela, Durgapur, Burnpur).'
    },
    {
      sector: 'Cement & Fertilizer',
      sharePct: '~8% of consumption',
      role: 'Calcination in rotary kilns (cement) and feedstock synthesis in coal-gasification urea plants (e.g., Talcher Fertilizer Project).',
      forwardBackwardLinkage:
        'Uses fly ash byproduct from power plants to manufacture Portland Pozzolana Cement (PPC), creating circular economy synergy.'
    }
  ],
  reformsAndPolicy: [
    {
      actPolicy: 'Mineral Laws (Amendment) Act & Commercial Coal Mining Auctions',
      year: '2020',
      keyProvision:
        'Abolished the end-use restriction (captive mining mandate) that existed since 1973 nationalization. Allowed 100% FDI under automatic route for commercial coal mining by private Indian and global entities.',
      impact: 'Ended CIL\'s statutory monopoly and opened revenue-sharing auctions to attract modern mechanized deep mining technology.'
    },
    {
      actPolicy: 'National Coal Gasification Mission',
      year: '2021',
      keyProvision:
        'Target to gasify 100 Million Tonnes of coal by 2030 to produce Syngas, Methanol, Dimethyl Ether, and Urea, with 20% concession on revenue share for gasified coal.',
      impact: 'Reduces carbon emissions compared to direct combustion and cuts India\'s import reliance on LNG and petrochemical feedstocks.'
    },
    {
      actPolicy: 'Fly Ash Utilization Rules (MoEFCC)',
      year: '2021',
      keyProvision:
        'Mandated 100% eco-friendly utilization of fly ash by thermal power plants within a 3 to 5-year compliance window for manufacturing bricks, cement, concrete, and road embankments.',
      impact: 'Addresses acute ash dyke breaches, heavy metal leaching, and airborne PM2.5 pollution across coal basins.'
    }
  ],
  environmentalIssues: [
    {
      topic: 'Subterranean Mine Fires in Jharia',
      details:
        'Over 70 uncontrolled underground coal seam fires have raged in Jharia since 1916 due to improper colonial mining practices, causing toxic fumes (CO, SO2, NOx), land subsidence, and displacing thousands of families.',
      governmentInitiative: 'Jharia Master Plan for resettlement of affected families to Belgaria township.'
    },
    {
      topic: 'Hasdeo Arand Forest Clearance Controversy',
      details:
        'Hasdeo Arand in Chhattisgarh is known as the "Lungs of Central India"—a contiguous dense Sal forest and vital elephant migration corridor sitting atop rich Gondwana coal seams (Parsa, Tara blocks).',
      governmentInitiative: 'Controversy balancing wildlife conservation, Tribal PESA rights, and energy security.'
    },
    {
      topic: 'Rat-Hole Mining in Meghalaya',
      details:
        'Hazardous manual extraction through narrow vertical shafts (3-4 ft wide) in Jaintia and Garo Hills, resulting in catastrophic floods, acid mine drainage contaminating Kopili river, and child labor exploitation.',
      governmentInitiative: 'National Green Tribunal (NGT) banned rat-hole mining in 2014; Supreme Court upheld strict regulation.'
    }
  ],
  prelimsTraps: [
    {
      statement: 'India possesses abundant prime coking coal and is self-sufficient for its steel industry.',
      isTrue: false,
      trapReason:
        'India imports over 85% of its prime coking coal needs from Australia and USA because domestic Gondwana coal has low caking index and high ash (>35%).',
      prelimsTip: 'Watch out for "self-sufficient" in UPSC prelims options—it is almost always false for coking coal!'
    },
    {
      statement: 'Anthracite coal deposits are widespread across the Gondwana basins of Jharkhand and Odisha.',
      isTrue: false,
      trapReason:
        'Anthracite is NOT found in Gondwana basins. In India, it is exclusively restricted to the Tertiary rocks of Jammu & Kashmir (Kalakot, Reasi). Gondwana coal is predominantly Bituminous.',
      prelimsTip: 'Gondwana = Bituminous (Black coal). Tertiary = Anthracite (J&K) + Lignite (Tamil Nadu/Rajasthan).'
    },
    {
      statement: 'Indian Gondwana coal is characterized by low sulfur but high mineral ash content.',
      isTrue: true,
      trapReason:
        'Gondwana coal was formed in freshwater fluvial basins, hence has very low sulfur (<0.7%) but high abrasive ash (35-50%). Tertiary coal has low ash but high sulfur.',
      prelimsTip: 'Memorize the inversion: Gondwana = Low Sulfur / High Ash; Tertiary = High Sulfur / Low Ash.'
    },
    {
      statement: 'Tamil Nadu holds the largest share of India\'s Lignite reserves.',
      isTrue: true,
      trapReason:
        'Tamil Nadu accounts for over 80% of total identified lignite reserves in India, centered around Neyveli and Mannargudi in Cuddalore district.',
      prelimsTip: 'Neyveli Lignite Corporation (NLC India) is a Navratna PSU operating under the Ministry of Coal.'
    }
  ]
};

export const UPSC_COAL_RIDDLES: Record<string, UPSCPlaceDossier> = {
  Jharia: {
    placeName: 'Jharia',
    topicId: 'coal_fields',
    state: 'Jharkhand',
    lat: 23.742,
    lon: 86.413,
    category: 'Coking Coal',
    geologicalBasin: 'Damodar Valley Graben (Dhanbad District)',
    whoAmIRiddle:
      'I am India’s only storehouse of prime coking coal indispensable for blast furnace steel production, but raging subterranean mine fires have burned across my seams since 1916. Guess who am I?',
    hint1: 'Geological Clue: I am located in the Damodar river valley within Dhanbad district, often hailed as the Coal Capital of India.',
    hint2: 'Administrative Clue: My rehabilitation and fire-fighting are governed by the landmark Jharia Action Plan / Belgaria Township scheme.',
    fact1Core: 'Sole Storehouse of Prime Coking Coal: Jharia holds nearly all of India\'s high-grade metallurgical coking coal seams.',
    fact2MapSpatial:
      'Situated in eastern Jharkhand just south of Dhanbad city, Jharia anchors the Damodar Valley industrial axis alongside Bokaro and Raniganj.',
    fact3MainsAdvanced:
      'Mains Analysis: Jharia exemplifies the resource curse—century-old underground coal fires emit deadly CO and SO2, cause land subsidence, and necessitate multi-crore resettlement of indigenous communities while steel mills still import Australian coal to blend with Jharia\'s high-ash output.',
    upscRelevanceTag: 'High-Yield UPSC Prelims & Mains (GS1 Mineral Resources & GS3 Disaster Risk)',
    distractors: ['Bokaro', 'Raniganj', 'Talcher']
  },
  Raniganj: {
    placeName: 'Raniganj',
    topicId: 'coal_fields',
    state: 'West Bengal',
    lat: 23.619,
    lon: 87.129,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Damodar Valley Graben (Paschim Bardhaman District)',
    whoAmIRiddle:
      'I am the historic birthplace of commercial coal mining in India, where British East India Company officers John Summer and Suetonius Heatly first extracted coal in 1774. Guess who am I?',
    hint1: 'Geological Clue: I lie on the eastern extremity of the Damodar river valley in West Bengal, bordering Asansol and Durgapur.',
    hint2: 'Resource Clue: My coal is high-volatile non-coking bituminous, widely harnessed for thermal power generation and Coal Bed Methane (CBM).',
    fact1Core: 'Birthplace of Indian Mining (1774): Raniganj pioneered India\'s industrial revolution and commercial coal extraction.',
    fact2MapSpatial:
      'Located in Paschim Bardhaman district, West Bengal, it forms the eastern anchor of India\'s "Ruhr Valley" alongside Durgapur steel city.',
    fact3MainsAdvanced:
      'Mains & Energy Transition: Raniganj is India\'s premier commercial Coal Bed Methane (CBM) production block (operated by Essar & Great Eastern Energy), turning dangerous mine methane into clean city gas.',
    upscRelevanceTag: 'UPSC History & Economic Geography Benchmark',
    distractors: ['Jharia', 'Bokaro', 'Singrauli']
  },
  Bokaro: {
    placeName: 'Bokaro',
    topicId: 'coal_fields',
    state: 'Jharkhand',
    lat: 23.784,
    lon: 85.962,
    category: 'Coking Coal',
    geologicalBasin: 'Upper Damodar Valley (Bokaro District)',
    whoAmIRiddle:
      'I am a premier medium-coking coal basin divided into East and West fields, feeding both Bokaro Steel Plant and Rourkela Steel Plant with vital washery coal. Guess who am I?',
    hint1: 'Geological Clue: I am situated in Jharkhand along the Bokaro river, a major left-bank tributary of the Damodar.',
    hint2: 'Infrastructure Clue: I host the historic Kargali Coal Washery—once one of the largest coal washeries in Asia.',
    fact1Core: 'Medium Coking Coal Hub: Key feedstock provider for public sector steel plants in the Chhota Nagpur industrial crescent.',
    fact2MapSpatial:
      'Located west of Jharia along the Damodar corridor in Jharkhand, Bokaro forms the bridge between Ranchi and Dhanbad.',
    fact3MainsAdvanced:
      'Industrial Linkage: Bokaro illustrates Weber’s Industrial Location Theory—the Soviet-assisted Bokaro Steel Plant was positioned here to minimize transportation ton-kilometers for heavy raw materials (coal from Bokaro/Jharia, iron ore from Kiriburu).',
    upscRelevanceTag: 'GS1 Industrial Geography & Metallurgy',
    distractors: ['Giridih', 'Korba', 'Talcher']
  },
  Talcher: {
    placeName: 'Talcher',
    topicId: 'coal_fields',
    state: 'Odisha',
    lat: 20.95,
    lon: 85.216,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Brahmani River Basin (Angul District)',
    whoAmIRiddle:
      'I hold the single largest geological coal reserve in India and am home to India\'s flagship first-ever Coal-Gasification based Urea fertilizer plant. Guess who am I?',
    hint1: 'Geological Clue: I am situated along the Brahmani river valley in Angul district of Odisha, operated by Mahanadi Coalfields (MCL).',
    hint2: 'Policy Clue: The revival of Talcher Fertilizers Limited (TFL) is a cornerstone of the National Coal Gasification Mission.',
    fact1Core: 'Largest Geological Coal Reserves in India: Talcher in Odisha holds immense power-grade thermal coal reserves.',
    fact2MapSpatial:
      'Positioned in central Odisha along the Brahmani river, Talcher provides rail and coastal sea coal logistics feeding southern power grids.',
    fact3MainsAdvanced:
      'Mains Technology Linkage: Talcher Fertilizer Project (TFL) uses surface coal gasification to produce synthesis gas (syngas) for urea production, slashing India\'s LNG fertilizer subsidy bill.',
    upscRelevanceTag: 'GS3 Science & Technology + Fertilizer Self-Sufficiency',
    distractors: ['Ib Valley', 'Korba', 'Singrauli']
  },
  Singrauli: {
    placeName: 'Singrauli',
    topicId: 'coal_fields',
    state: 'Madhya Pradesh',
    lat: 24.199,
    lon: 82.664,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Son River Basin / Rihand Reservoir (MP-UP Border)',
    whoAmIRiddle:
      'I am officially acclaimed as the "Energy Capital of India", boasting the extraordinary Purewa coal seam—one of the thickest open-cast coal seams in the world (~132m). Guess who am I?',
    hint1: 'Geological Clue: I straddle the border between Singrauli district in Madhya Pradesh and Sonbhadra district in Uttar Pradesh.',
    hint2: 'Infrastructure Clue: My massive open-cast mines directly feed a ring of mega pithead thermal stations surrounding the Govind Ballabh Pant Sagar (Rihand Dam).',
    fact1Core: 'Energy Capital of India & Purewa Seam: Host to India\'s thickest coal seam and NTPC\'s flagship Singrauli Super Thermal Power Station.',
    fact2MapSpatial:
      'Located in northeastern Madhya Pradesh, its proximity to the Rihand reservoir provides cooling water and pithead mine conveyor belts.',
    fact3MainsAdvanced:
      'Mains Environmental Angle: Singrauli is classified by CPCB as a Critically Polluted Area (CEPI) due to fly ash dyke collapses, mercury contamination in water bodies, and heavy air emissions from concentrated thermal plants.',
    upscRelevanceTag: 'GS1 Energy Geography & GS3 Environmental Pollution',
    distractors: ['Sohagpur', 'Korba', 'Chandrapur']
  },
  Korba: {
    placeName: 'Korba',
    topicId: 'coal_fields',
    state: 'Chhattisgarh',
    lat: 22.359,
    lon: 82.684,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Hasdeo River Valley (Hasdeo-Arand Basin)',
    whoAmIRiddle:
      'I sit in the Hasdeo river basin powering massive pithead super thermal plants and the Bharat Aluminium Company (BALCO) smelter in Chhattisgarh. Guess who am I?',
    hint1: 'Geological Clue: I am operated by South Eastern Coalfields Limited (SECL), one of India\'s largest coal-producing subsidiaries.',
    hint2: 'Ecological Clue: My northern catchment connects to the ecologically fragile Hasdeo Arand biodiversity forest corridor.',
    fact1Core: 'Thermal & Aluminium Powerhouse: Major open-cast power-grade coalfield in Chhattisgarh supporting BALCO and NTPC Korba.',
    fact2MapSpatial:
      'Located in northern central Chhattisgarh along the Hasdeo river, a vital northern tributary of the Mahanadi.',
    fact3MainsAdvanced:
      'Mains Conservation Debate: The expansion of mining blocks in the Hasdeo Arand basin sparks intense debate over tribal rights under PESA / Forest Rights Act 2006, Lemru Elephant Reserve corridor protection, and national coal demand.',
    upscRelevanceTag: 'GS2 Tribal Rights / PESA & GS3 Biodiversity',
    distractors: ['Singrauli', 'Ib Valley', 'Talcher']
  },
  Neyveli: {
    placeName: 'Neyveli',
    topicId: 'coal_fields',
    state: 'Tamil Nadu',
    lat: 11.536,
    lon: 79.486,
    category: 'Lignite',
    geologicalBasin: 'Cauvery Coastal Basin (Cuddalore District)',
    whoAmIRiddle:
      'I am the largest open-cast brown coal / lignite deposit in South Asia, managed by a Navratna PSU that overcomes high-pressure artesian aquifers to fuel southern India. Guess who am I?',
    hint1: 'Geological Clue: I belong to the Tertiary epoch (not Gondwana) and am situated in Cuddalore district of Tamil Nadu.',
    hint2: 'Corporate Clue: I am operated by NLC India Limited (formerly Neyveli Lignite Corporation), a pioneer in pithead lignite thermal power.',
    fact1Core: 'South Asia\'s Largest Lignite Field: Accounts for over 80% of India\'s identified commercial brown coal extraction.',
    fact2MapSpatial:
      'Located near the Coromandel coast in Tamil Nadu, Neyveli provides thermal base-load power for Tamil Nadu, Kerala, Karnataka, and Puducherry.',
    fact3MainsAdvanced:
      'Hydro-Geology & Mining: Neyveli mining requires continuous depressurization of underlying artesian aquifers to prevent mine floor blow-outs, exemplifying complex geotechnical engineering in mining geography.',
    upscRelevanceTag: 'UPSC Prelims Favorite (Tertiary Lignite in South India)',
    distractors: ['Palana', 'Nichahom', 'Kothagudem']
  },
  Palana: {
    placeName: 'Palana',
    topicId: 'coal_fields',
    state: 'Rajasthan',
    lat: 27.842,
    lon: 73.268,
    category: 'Lignite',
    geologicalBasin: 'Bikaner-Nagaur Basin (Thar Desert)',
    whoAmIRiddle:
      'I am a famous Tertiary lignite deposit buried beneath the Thar desert sands in Bikaner district of Rajasthan. Guess who am I?',
    hint1: 'Geological Clue: I represent Eocene age brown coal formation in western Rajasthan.',
    hint2: 'Economic Clue: My lignite is utilized by the Barsingsar thermal power project operated by NLC.',
    fact1Core: 'Premier Rajasthan Lignite Deposit: Proves presence of ancient coastal/estuarine swamps in present-day Thar desert.',
    fact2MapSpatial:
      'Located 25 km south of Bikaner city in northwest Rajasthan, Palana is connected via the North-Western Railway grid.',
    fact3MainsAdvanced:
      'Geological Evolution: Palana\'s lignite demonstrates the transgressive marine regressions of the Tethys sea during the Eocene period before aridification created the Thar desert.',
    upscRelevanceTag: 'GS1 Desert Geology & Tertiary Deposits',
    distractors: ['Neyveli', 'Nichahom', 'Makum']
  },
  Makum: {
    placeName: 'Makum',
    topicId: 'coal_fields',
    state: 'Assam',
    lat: 27.3,
    lon: 95.75,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Dihing-Patkai Belt (Tinsukia District, Upper Assam)',
    whoAmIRiddle:
      'I am an Upper Assam Tertiary coalfield located near Margherita, renowned for coal with exceptionally low ash (<5%) but unusually high organic sulfur (3% to 5%). Guess who am I?',
    hint1: 'Geological Clue: I lie in the outer foothills of the Patkai range bordering Arunachal Pradesh, near the historic Digboi oil belt.',
    hint2: 'Ecological Clue: My mines neighbor the Dehing Patkai National Park, known as the "Amazon of the East".',
    fact1Core: 'Upper Assam Tertiary Coalfield: Low-ash, high-volatile bituminous/sub-bituminous coal with distinctive high sulfur content.',
    fact2MapSpatial:
      'Located in Tinsukia district, Assam, it lies at the tri-junction of Assam, Arunachal Pradesh, and the Dihing river.',
    fact3MainsAdvanced:
      'Acid Mine Drainage & Ecology: Oxidation of iron pyrite (FeS2) in Makum\'s high-sulfur coal produces sulfuric acid runoff, threatening the fragile biodiversity of the Dehing Patkai rainforest corridor.',
    upscRelevanceTag: 'GS3 Environmental Chemistry & Protected Areas',
    distractors: ['Raniganj', 'Jharia', 'Nichahom']
  },
  Nichahom: {
    placeName: 'Nichahom',
    topicId: 'coal_fields',
    state: 'Jammu & Kashmir',
    lat: 34.36,
    lon: 74.15,
    category: 'Lignite',
    geologicalBasin: 'Karewa Formation (Handwara / Kupwara District)',
    whoAmIRiddle:
      'I am a unique lignite repository nestled inside the lacustrine Karewa deposits of the Kashmir Valley in Kupwara district. Guess who am I?',
    hint1: 'Geological Clue: I was formed in the Plio-Pleistocene lacustrine (lake-bed) sediments famous for Saffron cultivation.',
    hint2: 'Administrative Clue: I am located in the Handwara area of North Kashmir.',
    fact1Core: 'Karewa Lignite Deposit: Demonstrates the geological uplift of the Pir Panjal range trapping ancient lake sediments.',
    fact2MapSpatial:
      'Located in Kupwara district, North Kashmir, northwest of Srinagar.',
    fact3MainsAdvanced:
      'UPSC Karewa Significance: Karewas are lacustrine deposits of clay, silt, and lignite interbedded with glacial till; vital for Zafran (saffron) cultivation (GI tag) and Quaternary climate research.',
    upscRelevanceTag: 'GS1 Geomorphology (Karewa Formations)',
    distractors: ['Palana', 'Kalakot', 'Makum']
  },
  Kothagudem: {
    placeName: 'Kothagudem',
    topicId: 'coal_fields',
    state: 'Telangana',
    lat: 17.551,
    lon: 80.618,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Pranhita-Godavari Valley (Bhadradri Kothagudem District)',
    whoAmIRiddle:
      'I am the headquarters and anchor coalfield of Singareni Collieries Company Limited (SCCL)—the only government coal company jointly owned by a state government and the Centre. Guess who am I?',
    hint1: 'Geological Clue: I am situated in the Pranhita-Godavari Gondwana graben basin in southern India.',
    hint2: 'Corporate Clue: SCCL operates under 51% ownership by Telangana and 49% by the Union Ministry of Coal.',
    fact1Core: 'Singareni Headquarters: Southern India\'s primary Gondwana thermal coal supplier for Telangana, AP, and Karnataka.',
    fact2MapSpatial:
      'Located in Bhadradri Kothagudem district, Telangana, near the Godavari river basin.',
    fact3MainsAdvanced:
      'Federal Cooperative Mining: SCCL\'s 51:49 state-centre partnership model is unique in Indian mineral governance, ensuring localized revenue retention while contributing to national thermal energy grids.',
    upscRelevanceTag: 'GS2 Federalism & Public Sector Governance',
    distractors: ['Chandrapur', 'Korba', 'Singrauli']
  },
  Chandrapur: {
    placeName: 'Chandrapur',
    topicId: 'coal_fields',
    state: 'Maharashtra',
    lat: 19.961,
    lon: 79.296,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Wardha Valley Graben (Chandrapur District, Vidarbha)',
    whoAmIRiddle:
      'I am the premier coalfield of Maharashtra\'s Wardha Valley, powering the Chandrapur Super Thermal Power Station in the tiger heartland of Tadoba. Guess who am I?',
    hint1: 'Geological Clue: I am operated by Western Coalfields Limited (WCL) in eastern Vidarbha.',
    hint2: 'Wildlife Clue: My mining belts directly border the buffer zone of the famous Tadoba Andhari Tiger Reserve.',
    fact1Core: 'Wardha Valley Mining Anchor: Powers Maharashtra\'s largest thermal power generating station (CSTPS, 2920 MW).',
    fact2MapSpatial:
      'Located at the confluence of the Erai and Zarpat rivers in eastern Maharashtra.',
    fact3MainsAdvanced:
      'Man-Animal Conflict & Mining: Chandrapur exemplifies the acute clash between industrial mining and wildlife corridors, with dispersing tiger populations navigating active open-cast coal pits and railway sidings.',
    upscRelevanceTag: 'GS3 Ecology vs. Infrastructure & Tiger Corridors',
    distractors: ['Kothagudem', 'Singrauli', 'Korba']
  },
  'Ib Valley': {
    placeName: 'Ib Valley',
    topicId: 'coal_fields',
    state: 'Odisha',
    lat: 21.834,
    lon: 83.921,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Mahanadi-Ib River Basin (Jharsuguda District)',
    whoAmIRiddle:
      'I am an open-cast powerhouse named after a major tributary of the Mahanadi river, situated in the industrial hub of Jharsuguda. Guess who am I?',
    hint1: 'Geological Clue: I form the northwestern continuation of the Talcher Gondwana coal formation in western Odisha.',
    hint2: 'Infrastructure Clue: I feed huge pithead power plants and aluminum smelters (Vedanta) in Jharsuguda.',
    fact1Core: 'Mahanadi Basin Thermal Engine: High-capacity open-cast mining operated by Mahanadi Coalfields Limited (MCL).',
    fact2MapSpatial:
      'Located in Jharsuguda and Sambalpur districts of western Odisha, adjacent to the Hirakud reservoir catchment.',
    fact3MainsAdvanced:
      'Industrial Cluster Dynamics: Ib Valley demonstrates raw-material oriented manufacturing where bauxite from the Eastern Ghats and thermal power from Ib coal converge to create massive aluminum smelter economies of scale.',
    upscRelevanceTag: 'GS1 Weber Location Model & Smelter Metallurgy',
    distractors: ['Talcher', 'Korba', 'Bokaro']
  },
  Giridih: {
    placeName: 'Giridih',
    topicId: 'coal_fields',
    state: 'Jharkhand',
    lat: 24.186,
    lon: 86.305,
    category: 'Coking Coal',
    geologicalBasin: 'Barakar Formation (Giridih District)',
    whoAmIRiddle:
      'I am an aristocratic small coalfield celebrated in Indian mining history for possessing the legendary Karharbari seam—one of the purest metallurgical coking coal seams in the world. Guess who am I?',
    hint1: 'Geological Clue: I lie isolated north of the Damodar valley near the sacred Parasnath Hills (Shikharji).',
    hint2: 'Quality Clue: My Karharbari coal possessed less than 9% ash and very low phosphorus, making it historic prime coking coal.',
    fact1Core: 'Legendary Karharbari Seam: Benchmark of high-purity coking coal in India\'s early mining history.',
    fact2MapSpatial:
      'Located in central-eastern Jharkhand, north of Dhanbad and east of Hazaribagh.',
    fact3MainsAdvanced:
      'Exhaustion of High-Grade Seams: Giridih\'s near-depletion highlights the urgent need in Indian geography for deep beneficiation and coal washeries to treat lower-grade seams rather than high-grading easy deposits.',
    upscRelevanceTag: 'GS1 Resource Depletion & Conservation',
    distractors: ['Bokaro', 'Jharia', 'Raniganj']
  },
  'North Karanpura': {
    placeName: 'North Karanpura',
    topicId: 'coal_fields',
    state: 'Jharkhand',
    lat: 23.85,
    lon: 85.1,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Upper Damodar Valley (Chatra / Hazaribagh District)',
    whoAmIRiddle:
      'I host India\'s very first Supercritical Super Thermal Power Plant equipped with Air-Cooled Condensers (ACC) to drastically reduce water consumption. Guess who am I?',
    hint1: 'Geological Clue: I occupy the upper catchment of the Damodar river in Chatra and Ranchi districts.',
    hint2: 'Technological Clue: NTPC’s North Karanpura plant is a landmark in water-conserving green thermal energy.',
    fact1Core: 'First Air-Cooled Condenser Plant: Pioneers water-saving technology in India\'s water-stressed coal belt.',
    fact2MapSpatial:
      'Located in north-central Jharkhand, west of Bokaro and Ramgarh coalfields.',
    fact3MainsAdvanced:
      'Water-Energy Nexus: Standard thermal power plants consume massive water for cooling towers. North Karanpura\'s air-cooled condensers slash water footprint by ~70%, showing the path forward for sustainable inland thermal power.',
    upscRelevanceTag: 'GS3 Climate Resilient Infrastructure & Technology',
    distractors: ['Bokaro', 'Jharia', 'Singrauli']
  },
  Sohagpur: {
    placeName: 'Sohagpur',
    topicId: 'coal_fields',
    state: 'Madhya Pradesh',
    lat: 23.31,
    lon: 81.36,
    category: 'Non-Coking Coal',
    geologicalBasin: 'Son River Valley (Shahdol District)',
    whoAmIRiddle:
      'I am the largest coalfield in Madhya Pradesh\'s Son Valley, operated by SECL and known for high-pressure Coal Bed Methane extraction. Guess who am I?',
    hint1: 'Geological Clue: I am situated in Shahdol and Anuppur districts near the Maikal hills and Amarkantak plateau.',
    hint2: 'Energy Clue: Reliance Industries operates major commercial CBM gas blocks across my coal seams.',
    fact1Core: 'Largest Coalfield in Son Valley: Prime non-coking coal basin fueling central Indian thermal grids and CBM production.',
    fact2MapSpatial:
      'Located in eastern Madhya Pradesh near the source of the Son and Narmada rivers.',
    fact3MainsAdvanced:
      'Unconventional Hydrocarbons: CBM extraction in Sohagpur recovers methane trapped in coal seams prior to mining, mitigating mine explosion hazards while providing cleaner natural gas.',
    upscRelevanceTag: 'GS3 Unconventional Energy Resources (CBM)',
    distractors: ['Singrauli', 'Korba', 'Chandrapur']
  }
};

/**
 * Universal fallback generator for other topics (Oil/Gas, Iron/Steel, Ports, etc.)
 * so the UPSC Teaching & Detective Testing system operates on ALL topics!
 */
export function getTopicTheory(topicId: string, topic?: Topic): UPSCTopicTheory {
  if (topicId === 'coal_fields') {
    return UPSC_COAL_THEORY;
  }

  // Generate a specialized UPSC theory framework for other topics
  const title = topic?.title || 'UPSC Geography Master Dossier';
  return {
    topicId,
    conceptTitle: `${title}: Distribution, Strategic Significance, Economy & Prelims Focus`,
    tagline: 'GS Paper 1 (Geography: Resources & Industries) & GS Paper 3 (Economic Development)',
    definition: `${title} represent vital strategic nodes in Indian economic geography, physical geomorphology, and environmental governance tested extensively in UPSC Prelims and Mains.`,
    whyFoundThere: [
      {
        title: 'Geological & Tectonic Determinism',
        geologicalContext:
          'Resource distribution in India is fundamentally governed by Precambrian cratonic shields, Gondwana rift grabens, and Tertiary fold belts.',
        tectonicProcess:
          'Spatial concentration reflects ancient magmatic intrusions, marine transgressive sedimentary basins, or coastal geomorphology.'
      },
      {
        title: 'Weberian Industrial Agglomeration & Infrastructure',
        geologicalContext:
          'Raw material weight-losing properties and bulk transport logistics determine nodal site selection.',
        tectonicProcess:
          'Proximity to perennial water sources, dedicated freight corridors (DFC), and deep-draft natural harbors dictates viability.'
      }
    ],
    indiaStanding: {
      reservesRank: 'Top Tier in South Asia & Globally Significant',
      reservesFigure: 'Formulated in five-year national mineral and energy policy blueprints.',
      productionRank: 'Self-sufficiency drive under Atmanirbhar Bharat & Make in India',
      productionFigure: 'Administered under respective Union Ministries and regulatory boards.',
      importVolume: 'Strategic balance between domestic exploration and international trade corridors.',
      importRationale: {
        coking: 'Specialized high-grade inputs imported where domestic geological reserves have qualitative constraints.',
        thermal: 'Balanced with regional grid stability, port logistics, and supply chain diversification.'
      },
      sourceCountries: ['Key bilateral partners across Indo-Pacific, Gulf, and Quad allies'],
      exportFootprint: 'Value-added manufactured exports and regional bilateral agreements with neighboring nations.'
    },
    economicAndIndustrialUses: [
      {
        sector: 'Core Infrastructure & Manufacturing',
        sharePct: 'Major Share',
        role: 'Backbone of national industrialization, capital goods, and employment generation.',
        forwardBackwardLinkage: 'Integrated with Indian Railways, National Highways, and National Logistics Policy (NLP).'
      }
    ],
    reformsAndPolicy: [
      {
        actPolicy: 'National Sectoral Reform & Infrastructure Pipeline (NIP)',
        year: '2020-Present',
        keyProvision: 'Modernization, digitizing mineral concessions, and promoting ease of doing business.',
        impact: 'Attracting private capital and cutting regulatory turnaround times.'
      }
    ],
    environmentalIssues: [
      {
        topic: 'Sustainable Development & Ecological Balance',
        details: 'Balancing extraction economics with biodiversity preservation and indigenous forest rights.',
        governmentInitiative: 'Strict Environmental Impact Assessment (EIA) notifications and Compensatory Afforestation (CAMPA).'
      }
    ],
    prelimsTraps: [
      {
        statement: `All ${topic?.noun || 'locations'} in India are concentrated exclusively in peninsular states.`,
        isTrue: false,
        trapReason: 'UPSC frequently uses absolute qualifiers like "all" or "exclusively". Significant occurrences exist in extra-peninsular regions.',
        prelimsTip: 'Scrutinize extreme words like "all", "solely", and "exclusively" in Prelims options.'
      },
      {
        statement: 'India depends on critical maritime sea lanes for key energy and mineral inputs.',
        isTrue: true,
        trapReason: 'India imports significant energy resources via Straits of Malacca and Strait of Hormuz.',
        prelimsTip: 'Geopolitical choke points are a favorite recurring theme in UPSC Prelims.'
      }
    ]
  };
}

export function getPlaceDossier(place: Place, topic: Topic): UPSCPlaceDossier {
  // If we have a hand-crafted riddle in UPSC_COAL_RIDDLES, use it
  if (topic.id === 'coal_fields' && UPSC_COAL_RIDDLES[place.name]) {
    return UPSC_COAL_RIDDLES[place.name];
  }

  // Get 3 random distractors from same topic
  const otherPlaces = topic.places.filter((p) => p.name !== place.name);
  const shuffledOthers = [...otherPlaces].sort(() => 0.5 - Math.random());
  const distractors = shuffledOthers.slice(0, 3).map((p) => p.name);

  const maskedFact = place.fact.replace(new RegExp(place.name, 'gi'), '...');

  return {
    placeName: place.name,
    topicId: topic.id,
    state: place.state || 'India',
    lat: place.lat,
    lon: place.lon,
    category: place.category,
    geologicalBasin: `${place.state || 'Strategic Zone'} (${place.category})`,
    whoAmIRiddle: `Consider the following statements regarding a prominent ${topic.noun} in India:
• Located in the ${place.state || 'Peninsular/Extra-Peninsular'} region, classified under the "${place.category}" zone.
• Key syllabus landmark: "${maskedFact}"
Which one of the following sites is described in the statements above?`,
    hint1: `Geographical Clue: Situated in ${place.state || 'India'} at coordinates approximately ~${place.lat.toFixed(1)}°N, ~${place.lon.toFixed(1)}°E.`,
    hint2: `Category & UPSC Clue: Classified under "${place.category}" within the ${topic.title} syllabus module.`,
    fact1Core: place.fact,
    fact2MapSpatial: `Situated in ${place.state}, ${place.name} is a key geographical reference point in ${topic.title}.`,
    fact3MainsAdvanced: `Mains Perspective: ${place.name} exemplifies spatial resource distribution in ${place.state}, linking local physical geography with national development and infrastructure priorities.`,
    upscRelevanceTag: 'Core UPSC Prelims Landmark',
    distractors: distractors.length >= 3 ? distractors : ['Site A', 'Site B', 'Site C']
  };
}
