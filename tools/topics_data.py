"""Source dataset of 16 UPSC Map Topics for UPSC Map Trainer.
Contains accurate coordinates, states, categories, exam-relevant facts,
and handwritten MCQs for UPSC Prelims preparation.
Place format: (name, lat, lon, state, category, fact)
"""

TOPICS = [
    {
        "id": "coal_fields",
        "title": "Coal & Lignite Fields",
        "emoji": "⛏️",
        "color": "#475569",
        "syllabus": "GS1 · Geography · Mineral Resources",
        "noun": "coalfield",
        "blurb": "Gondwana coal basins and tertiary lignite deposits across India.",
        "categories": ["Coking Coal", "Non-Coking Coal", "Lignite"],
        "places": [
            ("Jharia", 23.742, 86.413, "Jharkhand", "Coking Coal", "India's sole storehouse of prime coking coal; famous for chronic underground mine fires in the Damodar Valley."),
            ("Bokaro", 23.784, 85.962, "Jharkhand", "Coking Coal", "Vital medium-coking coal source feeding Bokaro and Rourkela steel plants in Damodar Valley."),
            ("Raniganj", 23.619, 87.129, "West Bengal", "Non-Coking Coal", "India's oldest commercial coalfield opened in 1774; non-coking coal with high volatile matter."),
            ("Talcher", 20.950, 85.216, "Odisha", "Non-Coking Coal", "Massive thermal non-coking coal reserve along the Brahmani river valley supporting NTPC plants."),
            ("Korba", 22.359, 82.684, "Chhattisgarh", "Non-Coking Coal", "Key Hasdeo river basin field powering the Korba super thermal power station and BALCO."),
            ("Singrauli", 24.199, 82.664, "Madhya Pradesh", "Non-Coking Coal", "Son river valley field known as India's Energy Capital; thickest coal seam in India (Purewa)."),
            ("Neyveli", 11.536, 79.486, "Tamil Nadu", "Lignite", "Largest open-cast brown coal / lignite deposit in India operated by NLC India in Cuddalore district."),
            ("Palana", 27.842, 73.268, "Rajasthan", "Lignite", "Tertiary lignite basin in Bikaner district utilized for thermal power generation."),
            ("North Karanpura", 23.850, 85.100, "Jharkhand", "Non-Coking Coal", "Major coalfield in Upper Damodar basin with extensive pithead power generation."),
            ("Kothagudem", 17.551, 80.618, "Telangana", "Non-Coking Coal", "Anchor field of Singareni Collieries (SCCL) in the Pranhita-Godavari valley."),
            ("Chandrapur", 19.961, 79.296, "Maharashtra", "Non-Coking Coal", "Wardha valley coalfield sustaining Western Coalfields Ltd (WCL) thermal supply."),
            ("Ib Valley", 21.834, 83.921, "Odisha", "Non-Coking Coal", "Part of the Mahanadi basin coalfields with extensive open-cast power-grade coal extraction."),
            ("Makum", 27.300, 95.750, "Assam", "Non-Coking Coal", "Tertiary coalfield in upper Assam known for high-sulphur, low-ash metallurgical coal."),
            ("Nichahom", 34.360, 74.150, "Jammu & Kashmir", "Lignite", "Karewa formation lignite deposit located in Kupwara district of Kashmir valley."),
            ("Giridih", 24.186, 86.305, "Jharkhand", "Coking Coal", "High-grade metallurgical coal repository, home to the historic Karharbari seam."),
            ("Sohagpur", 23.310, 81.360, "Madhya Pradesh", "Non-Coking Coal", "Major coal belt in Son valley basin operated by South Eastern Coalfields Limited.")
        ],
        "questions": [
            ("Which river valley hosts the prominent coalfields of Jharia, Bokaro and Raniganj?", "Damodar Valley", ["Son Valley", "Mahanadi Valley", "Godavari Valley"], "The Damodar Valley is renowned as the Ruhr of India and holds India's richest Gondwana coal deposits."),
            ("Which type of coal has the highest carbon content and lowest moisture?", "Anthracite", ["Bituminous", "Lignite", "Peat"], "Anthracite has >85% carbon content; found in small quantities in Jammu & Kashmir (Reasi)."),
            ("Which Indian state holds the largest reserves of Lignite (brown coal)?", "Tamil Nadu", ["Rajasthan", "Gujarat", "West Bengal"], "Tamil Nadu accounts for over 80% of India's identified lignite resources, centered around Neyveli."),
            ("The Singareni Collieries Company Limited (SCCL) operates primarily in which river basin?", "Pranhita-Godavari Valley", ["Damodar Valley", "Narmada Valley", "Brahmani Valley"], "SCCL operates in the Godavari Valley coalfield in Telangana.")
        ]
    },
    {
        "id": "oil_gas_fields",
        "title": "Oil & Gas Fields",
        "emoji": "🛢️",
        "color": "#D97706",
        "syllabus": "GS1 · Geography · Energy Resources",
        "noun": "oil/gas field",
        "blurb": "Major onshore basins and continental shelf offshore hydrocarbon reserves.",
        "categories": ["Onshore Oil/Gas", "Offshore Oil/Gas"],
        "places": [
            ("Digboi", 27.380, 95.630, "Assam", "Onshore Oil/Gas", "Oldest continuously operating oilfield and refinery in Asia, discovered in 1889."),
            ("Naharkatiya", 27.280, 95.330, "Assam", "Onshore Oil/Gas", "First post-independence oil discovery in India (1953) along Burhi Dihing river."),
            ("Bombay High", 19.416, 71.333, "", "Offshore Oil/Gas", "India's most prolific offshore oilfield on the continental shelf discovered in 1974, operated with Sagar Samrat."),
            ("Bassein", 19.300, 72.100, "", "Offshore Oil/Gas", "Giant offshore natural gas field located south of Bombay High in the Arabian Sea."),
            ("Ankleshwar", 21.626, 73.015, "Gujarat", "Onshore Oil/Gas", "Pivotal onshore Cambay basin discovery described by Jawaharlal Nehru as the 'Fountain of Prosperity'."),
            ("Kalol", 23.238, 72.496, "Gujarat", "Onshore Oil/Gas", "Major North Cambay basin field producing heavy paraffinic crude oil near Ahmedabad."),
            ("Mehsana", 23.588, 72.369, "Gujarat", "Onshore Oil/Gas", "Prolific heavy-oil producing onshore asset of ONGC with cyclic steam stimulation."),
            ("Mangala (Barmer)", 25.819, 71.280, "Rajasthan", "Onshore Oil/Gas", "Largest onshore oil discovery in India in over two decades, located in Thar desert (Cairn)."),
            ("Ravva Field", 16.480, 82.320, "Andhra Pradesh", "Offshore Oil/Gas", "Key offshore oil and natural gas production asset in the Krishna-Godavari (KG) shallow offshore."),
            ("Moran-Hugrijan", 27.180, 94.930, "Assam", "Onshore Oil/Gas", "Upper Assam basin oilfield feeding the Barauni and Bongaigaon pipeline grid."),
            ("Cambay (Lunej)", 22.313, 72.619, "Gujarat", "Onshore Oil/Gas", "First oil discovery by ONGC in Gujarat (1958) validating structural traps in Tertiary sediments."),
            ("Narimanam", 10.820, 79.740, "Tamil Nadu", "Onshore Oil/Gas", "Important hydrocarbon producing onshore field in the Cauvery sedimentary basin.")
        ],
        "questions": [
            ("The 'Sagar Samrat' drillship is historically associated with which iconic offshore field?", "Bombay High", ["Ravva Field", "Bassein Field", "Panna-Mukta"], "Sagar Samrat drilled the discovery well in Bombay High in February 1974."),
            ("Where was the first commercially successful oil well drilled in India?", "Digboi, Assam", ["Ankleshwar, Gujarat", "Naharkatiya, Assam", "Barmer, Rajasthan"], "The first oil well was drilled in Digboi in 1889, leading to Asia's first oil refinery."),
            ("Which sedimentary basin hosts the deepwater gas fields of KG-D6?", "Krishna-Godavari Basin", ["Cauvery Basin", "Mahanadi Basin", "Cambay Basin"], "KG-D6 is located in the Krishna-Godavari deepwater basin off the coast of Andhra Pradesh.")
        ]
    },
    {
        "id": "oil_refineries",
        "title": "Oil Refineries",
        "emoji": "🏭",
        "color": "#B45309",
        "syllabus": "GS1 · Geography · Industrial Location",
        "noun": "refinery",
        "blurb": "Coastal and inland petroleum refining centers of strategic importance.",
        "categories": ["PSU", "Private", "Joint Venture"],
        "places": [
            ("Jamnagar", 22.470, 70.057, "Gujarat", "Private", "World's largest grassroots refining complex owned by Reliance Industries (export-oriented)."),
            ("Vadinar", 22.442, 69.712, "Gujarat", "Private", "Second-largest single-site refinery in India operated by Nayara Energy in Gulf of Kutch."),
            ("Digboi", 27.382, 95.632, "Assam", "PSU", "Asia's oldest operating oil refinery commissioned in 1901 by Assam Oil Company."),
            ("Barauni", 25.460, 85.960, "Bihar", "PSU", "Constructed with Soviet and Romanian assistance in 1964; fed by pipeline from Assam and Paradip."),
            ("Mathura", 27.420, 77.680, "Uttar Pradesh", "PSU", "Inland refinery equipped with sulfur scrubbers to protect the marble of the Taj Mahal."),
            ("Haldia", 22.060, 88.080, "West Bengal", "PSU", "Port-based coastal refinery producing specialized lubricating base oils and fuels."),
            ("Paradip", 20.316, 86.611, "Odisha", "PSU", "Modern deep-conversion coastal refinery of Indian Oil with an integrated polypropylene unit."),
            ("Visakhapatnam", 17.690, 83.270, "Andhra Pradesh", "PSU", "East coast refinery of HPCL handling imported high-sulfur crude crudes."),
            ("Kochi", 9.950, 76.360, "Kerala", "PSU", "Largest public sector refinery in India (BPCL) situated near the Vembanad backwaters."),
            ("Mangalore", 12.980, 74.830, "Karnataka", "PSU", "MRPL coastal refinery situated near New Mangalore Port with single point mooring."),
            ("Bina", 24.180, 78.180, "Madhya Pradesh", "PSU", "Originally built as a JV with Oman Oil (BORL), now fully integrated with BPCL."),
            ("Guru Gobind Singh (Bhatinda)", 30.130, 74.930, "Punjab", "Joint Venture", "HPCL-Mittal Energy Limited (HMEL) inland refinery linked to Mundra port via crude pipeline."),
            ("Panipat", 29.460, 76.920, "Haryana", "PSU", "Major north Indian petrochemical refinery hub meeting agrarian north fuel demand."),
            ("Numaligarh", 26.580, 93.740, "Assam", "PSU", "Established under the historic 1985 Assam Accord, nicknamed the 'Accord Refinery'."),
            ("Bongaigaon", 26.500, 90.540, "Assam", "PSU", "Integrated refinery and petrochemical complex in lower Assam."),
            ("Tatipaka", 16.510, 81.870, "Andhra Pradesh", "PSU", "Mini refinery operated by ONGC processing local Krishna-Godavari condensate.")
        ],
        "questions": [
            ("Why is the location of the Mathura refinery considered ecologically sensitive?", "Proximity to the Taj Mahal", ["Proximity to Ranthambore NP", "Location on an earthquake fault line", "Sinking water table of Yamuna"], "Mathura refinery emissions (SO2) created acid rain concerns regarding marble cancer at the Taj Mahal."),
            ("Which refinery was established as a direct outcome of the 1985 Assam Accord?", "Numaligarh Refinery", ["Digboi Refinery", "Bongaigaon Refinery", "Guwahati Refinery"], "Numaligarh Refinery was set up in accordance with Commitments made in the Assam Accord of 1985."),
            ("Which coastal facility houses the world's largest petroleum refining complex?", "Jamnagar, Gujarat", ["Vadinar, Gujarat", "Paradip, Odisha", "Ulsan, South Korea"], "Reliance Industries' Jamnagar complex possesses an aggregate capacity exceeding 1.24 million bpd.")
        ]
    },
    {
        "id": "iron_steel_plants",
        "title": "Iron & Steel Plants",
        "emoji": "🏗️",
        "color": "#475569",
        "syllabus": "GS1 · Geography · Heavy Industries",
        "noun": "steel plant",
        "blurb": "Integrated public and private steel manufacturing hubs and alloy centers.",
        "categories": ["Integrated PSU", "Private / Modern", "Alloy / Specialized"],
        "places": [
            ("Jamshedpur (TISCO)", 22.804, 86.202, "Jharkhand", "Private / Modern", "India's first private integrated steel plant founded by Jamsetji Tata in 1907 at Sakchi."),
            ("Bhilai", 21.210, 81.380, "Chhattisgarh", "Integrated PSU", "Flagship SAIL plant built with Soviet collaboration; prime producer of railway rails."),
            ("Rourkela", 22.220, 84.850, "Odisha", "Integrated PSU", "First public sector integrated steel plant built with German (Krupp-Demag) assistance; uses LD converter."),
            ("Durgapur", 23.520, 87.310, "West Bengal", "Integrated PSU", "SAIL plant built with British collaboration on the Damodar river bank."),
            ("Bokaro", 23.669, 86.151, "Jharkhand", "Integrated PSU", "Built with Soviet assistance in 1964; uses coal from Jharia and iron ore from Kiriburu."),
            ("Visakhapatnam (RINL)", 17.620, 83.210, "Andhra Pradesh", "Integrated PSU", "India's only shore-based integrated public sector steel plant, having a natural deep harbor."),
            ("Salem Steel Plant", 11.660, 78.140, "Tamil Nadu", "Alloy / Specialized", "Specialized SAIL facility producing world-class stainless steel utilizing local Kanjamalai iron ore."),
            ("Bhadravati (VISL)", 13.840, 75.700, "Karnataka", "Alloy / Specialized", "Founded by Sir M. Visvesvaraya as Mysore Iron Works in 1923; uses charcoal initially due to lack of coal."),
            ("Burnpur (IISCO)", 23.670, 86.940, "West Bengal", "Integrated PSU", "One of India's oldest integrated steel facilities, located on the Damodar river near Asansol."),
            ("Vijayanagar (JSW)", 15.170, 76.650, "Karnataka", "Private / Modern", "JSW Steel flagship plant at Toranagallu utilizing rich Bellary-Hospet hematite ore."),
            ("Hazira", 21.140, 72.640, "Gujarat", "Private / Modern", "AM/NS India coastal steel plant using direct reduced iron (DRI) on the Gulf of Khambhat."),
            ("Angul", 20.840, 85.100, "Odisha", "Private / Modern", "Jindal Steel and Power mega complex with India's first coal gasification-based DRI plant."),
            ("Kalinganagar", 20.950, 86.020, "Odisha", "Private / Modern", "Rapidly expanding modern steel cluster of Tata Steel in Jajpur district near Daitari mines.")
        ],
        "questions": [
            ("Which foreign nation provided technical assistance for the establishment of Rourkela Steel Plant?", "Germany", ["Soviet Union", "United Kingdom", "United States"], "Rourkela Steel Plant was built in 1959 in collaboration with German firms Krupp and Demag."),
            ("Which is the only shore-based integrated steel plant in India?", "Visakhapatnam Steel Plant (RINL)", ["Paradip Steel Plant", "Haldia Plant", "Hazira Plant"], "Rashtriya Ispat Nigam Limited (RINL) in Visakhapatnam is India's only shore-based integrated steel plant."),
            ("Why did the Bhadravati steel plant initially utilize charcoal rather than coking coal?", "Absence of proximate coalfields in South India", ["Charcoal produces zero sulfur", "Mandate from the British Raj", "Local iron ore required lower heat"], "South India lacks Gondwana coking coal; Sir M. Visvesvaraya utilized charcoal from local Bababudan forests.")
        ]
    },
    {
        "id": "minerals_mines",
        "title": "Mineral Belts & Mines",
        "emoji": "💎",
        "color": "#0D9488",
        "syllabus": "GS1 · Geography · Non-Ferrous & Strategic Minerals",
        "noun": "mine / deposit",
        "blurb": "Strategic deposits of iron ore, copper, bauxite, uranium, gold and rare earths.",
        "categories": ["Iron Ore", "Bauxite", "Copper", "Mica & Rare Earth", "Gold & Strategic", "Zinc & Lead"],
        "places": [
            ("Kudremukh", 13.210, 75.250, "Karnataka", "Iron Ore", "Horse-face shaped peak with high-grade magnetite; mining ceased due to ecological impact on Western Ghats."),
            ("Bailadila", 18.720, 81.280, "Chhattisgarh", "Iron Ore", "World-class high-grade hematite deposits (bullock hump shaped hills), exported to Japan via Vizag port."),
            ("Noamundi", 22.150, 85.530, "Jharkhand", "Iron Ore", "Premier hematite iron ore mine in West Singhbhum feeding Tata Steel since 1925."),
            ("Panchpatmali", 18.840, 83.020, "Odisha", "Bauxite", "Largest bauxite deposit in Asia located in Koraput district, mined by NALCO for Damanjodi."),
            ("Lohardaga", 23.430, 84.680, "Jharkhand", "Bauxite", "Historic bauxite mining hub of the Chota Nagpur plateau feeding Hindalco at Renukoot."),
            ("Khetri", 27.980, 75.780, "Rajasthan", "Copper", "Hindustan Copper Limited (HCL) belt in the Aravallis mined since Harappan times."),
            ("Malanjkhand", 22.010, 80.710, "Madhya Pradesh", "Copper", "Largest copper ore open-pit mine in India, located in Balaghat district."),
            ("Koderma", 24.460, 85.590, "Jharkhand", "Mica & Rare Earth", "Historic 'Mica Capital of the World', known for premium ruby mica (muscovite)."),
            ("Hutti", 16.200, 76.650, "Karnataka", "Gold & Strategic", "Only operating active primary gold mine in India today, located in Raichur district."),
            ("Kolar Gold Fields (KGF)", 12.960, 78.270, "Karnataka", "Gold & Strategic", "One of world's deepest historic gold mines in champion lode, ceased operations in 2001."),
            ("Zawar", 24.350, 73.710, "Rajasthan", "Zinc & Lead", "Ancient zinc smelting site (carbon-14 dated to 12th century AD) operated by Hindustan Zinc."),
            ("Jaduguda", 22.650, 86.350, "Jharkhand", "Mica & Rare Earth", "First uranium mine of India opened in 1967 in Singhbhum thrust belt (UCIL)."),
            ("Tummalapalle", 14.320, 78.250, "Andhra Pradesh", "Mica & Rare Earth", "One of world's largest uranium reserves hosted in Vempalle dolomites of Cuddapah basin."),
            ("Chavara", 9.000, 76.530, "Kerala", "Mica & Rare Earth", "Coastal placer mineral deposit rich in ilmenite, rutile, zircon and monazite sands."),
            ("Balaghat", 21.810, 80.180, "Madhya Pradesh", "Mica & Rare Earth", "Accounts for ~80% of India's manganese production (Bharweli underground mine)."),
            ("Sukinda", 21.030, 85.800, "Odisha", "Iron Ore", "Houses 95% of India's chromite deposits in Jajpur district, crucial for stainless steel.")
        ],
        "questions": [
            ("Which mine in the Cuddapah basin of Andhra Pradesh is estimated to host one of the world's largest uranium deposits?", "Tummalapalle", ["Jaduguda", "Domiasiat", "Turamdih"], "Tummalapalle in YSR Kadapa district was confirmed by DAE to possess exceptionally large uranium reserves."),
            ("What strategic mineral is primarily extracted from the coastal beach sands of Chavara and Manavalakurichi?", "Monazite (Thorium source)", ["Bauxite", "Chromite", "Pitchblende"], "Monazite beach placers contain thorium, the cornerstone of Stage 3 of India's Nuclear Energy Programme."),
            ("Kudremukh iron ore deposit in Karnataka is famous for which grade of ore?", "Magnetite", ["Hematite", "Limonite", "Siderite"], "Kudremukh contains massive low-grade magnetite deposits enriched through beneficiation and piped as slurry to Mangalore.")
        ]
    },
    {
        "id": "major_ports",
        "title": "Major Ports of India",
        "emoji": "⚓",
        "color": "#0284C7",
        "syllabus": "GS1/GS3 · Infrastructure · Shipping",
        "noun": "port",
        "blurb": "Central government major ports and newly approved deep-draft landlord ports.",
        "categories": ["West Coast Port", "East Coast Port", "Major Landlord / New"],
        "places": [
            ("Deendayal (Kandla)", 23.003, 70.218, "Gujarat", "West Coast Port", "Tidal port built in the 1950s after loss of Karachi to Pakistan; operates a major SEZ."),
            ("Mumbai Port", 18.940, 72.840, "Maharashtra", "West Coast Port", "India's premier natural deepwater harbor, historically the gateway of Indian oceanic trade."),
            ("Jawaharlal Nehru Port (JNPT)", 18.950, 72.950, "Maharashtra", "West Coast Port", "First 100% landlord major port in India and the busiest container handling gateway."),
            ("Mormugao", 15.410, 73.800, "Goa", "West Coast Port", "Natural harbor at the mouth of the Zuari river, premier port for iron ore exports."),
            ("New Mangalore", 12.920, 74.810, "Karnataka", "West Coast Port", "All-weather deep-water port handling Kudremukh iron ore pellets and POL imports."),
            ("Cochin Port", 9.960, 76.270, "Kerala", "West Coast Port", "Natural port situated on Willingdon and Vallarpadam islands in the Vembanad lake."),
            ("V.O. Chidambaranar (Tuticorin)", 8.750, 78.180, "Tamil Nadu", "East Coast Port", "Artificial deep-sea port in Gulf of Mannar handling thermal coal and Sri Lanka feeder traffic."),
            ("Chennai Port", 13.080, 80.290, "Tamil Nadu", "East Coast Port", "Second-oldest major port of India (artificial harbor opened in 1881), major car export hub."),
            ("Kamarajar (Ennore)", 13.260, 80.330, "Tamil Nadu", "East Coast Port", "India's first corporate major port (publicly corporatized under Companies Act)."),
            ("Visakhapatnam Port", 17.680, 83.290, "Andhra Pradesh", "East Coast Port", "Landlocked natural harbor protected by the Dolphin's Nose hill, deepest inner harbor."),
            ("Paradip Port", 20.260, 86.670, "Odisha", "East Coast Port", "Deep-draft port at the mouth of the Mahanadi river handling bulk iron ore and coking coal."),
            ("Kolkata & Haldia", 22.540, 88.310, "West Bengal", "East Coast Port", "Only riverine major port in India, located on the tidal Hooghly river with diamond harbor."),
            ("Vadhavan", 19.980, 72.700, "Maharashtra", "Major Landlord / New", "All-weather deep-draft mega greenfield port approved in Palghar district with 20m draft.")
        ],
        "questions": [
            ("Which is the only riverine major port in India?", "Syama Prasad Mookerjee Port (Kolkata)", ["Paradip Port", "Cochin Port", "Mormugao Port"], "Kolkata Port is located 203 km inland on the tidal Hooghly river system."),
            ("Why was Kandla Port (Deendayal Port) developed after 1947?", "To compensate for the loss of Karachi port to Pakistan", ["To export Singrauli coal", "Exclusively for crude oil import", "To establish a naval submarine base"], "Partition gave Karachi port to Pakistan, necessitating a western deep gateway to serve Punjab, Rajasthan and Gujarat."),
            ("Which major port in India was corporatized first as a public company?", "Kamarajar Port (Ennore)", ["JNPT", "Chennai Port", "Deendayal Port"], "Kamarajar Port (Ennore) was originally incorporated under the Companies Act, 1956.")
        ]
    },
    {
        "id": "nuclear_power",
        "title": "Nuclear Power Sites",
        "emoji": "⚛️",
        "color": "#7C3AED",
        "syllabus": "GS3 · Science & Tech · Nuclear Energy",
        "noun": "nuclear plant",
        "blurb": "Operating commercial reactors, fast breeders, and proposed mega parks.",
        "categories": ["Operational NPP", "Under Construction", "Proposed / Planned"],
        "places": [
            ("Tarapur", 19.830, 72.660, "Maharashtra", "Operational NPP", "India's first commercial nuclear power station (1969), utilizing Boiling Water Reactors (BWR)."),
            ("Rawatbhata (RAPS)", 24.870, 75.590, "Rajasthan", "Operational NPP", "First pressurized heavy water reactor (PHWR) in India, built in collaboration with Canada."),
            ("Kudankulam", 8.169, 77.712, "Tamil Nadu", "Operational NPP", "India's highest capacity NPP, featuring Russian VVER-1000 pressurized water reactors."),
            ("Kalpakkam (MAPS & PFBR)", 12.560, 80.170, "Tamil Nadu", "Operational NPP", "Indigenously designed PHWR and the site of India's Prototype Fast Breeder Reactor (500 MWe)."),
            ("Kaiga", 14.860, 74.430, "Karnataka", "Operational NPP", "Located amidst Western Ghats on Kali river; holds world record for 962 days of continuous operation."),
            ("Kakrapar", 21.240, 73.350, "Gujarat", "Operational NPP", "Site of India's first indigenously designed 700 MWe commercial PHWR reactor (KAPP-3)."),
            ("Narora", 28.160, 78.410, "Uttar Pradesh", "Operational NPP", "Located on the banks of Ganga in Uttar Pradesh; engineered for Seismic Zone IV."),
            ("Gorakhpur (GHAVP)", 29.450, 75.670, "Haryana", "Under Construction", "First nuclear power plant in Haryana (Fatehabad district), utilizing water from Bhakra canal."),
            ("Jaitapur", 16.590, 73.320, "Maharashtra", "Proposed / Planned", "Proposed 9900 MWe mega nuclear park with French EPR reactors in Ratnagiri district."),
            ("Kovvada", 18.210, 83.970, "Andhra Pradesh", "Proposed / Planned", "Proposed AP1000 pressurized water reactor complex in Srikakulam district (US collaboration)."),
            ("Chutka", 22.840, 80.200, "Madhya Pradesh", "Proposed / Planned", "Proposed 2x700 MWe indigenous PHWR project in Mandla district on the Narmada river."),
            ("Mahi Banswara", 23.550, 74.450, "Rajasthan", "Proposed / Planned", "Approved fleet-mode indigenous 4x700 MWe PHWR nuclear project in southern Rajasthan.")
        ],
        "questions": [
            ("Which nuclear reactor in India set a global record for continuous uninterrupted operation of 962 days?", "Kaiga Generating Station Unit-1", ["Tarapur Unit-1", "Kudankulam Unit-2", "Rawatbhata Unit-5"], "Kaiga Unit-1 operated continuously for 962 days before being safely shut down for planned maintenance."),
            ("Which type of reactor is installed at the Kudankulam Nuclear Power Plant?", "VVER Pressurized Water Reactor", ["Boiling Water Reactor (BWR)", "CANDU Reactor", "Gas Cooled Fast Reactor"], "Kudankulam features Russian-supplied VVER-1000 light water reactors cooled and moderated by light water."),
            ("Where is India's 500 MWe Prototype Fast Breeder Reactor (PFBR) located?", "Kalpakkam, Tamil Nadu", ["Kaiga, Karnataka", "Kakrapar, Gujarat", "Rawatbhata, Rajasthan"], "The PFBR is situated at the Indira Gandhi Centre for Atomic Research (IGCAR) complex at Kalpakkam.")
        ]
    },
    {
        "id": "dams_barrages",
        "title": "Dams & Barrages",
        "emoji": "🌊",
        "color": "#2563EB",
        "syllabus": "GS1 · Geography · Water Resources & River Systems",
        "noun": "dam / barrage",
        "blurb": "Architectural marvels across India's peninsular and Himalayan river systems.",
        "categories": ["Gravity Dam", "Earthfill / Embankment", "Barrage / Diversion"],
        "places": [
            ("Tehri Dam", 30.378, 78.480, "Uttarakhand", "Earthfill / Embankment", "Highest dam in India (260.5 m) rock-and-earth fill embankment on Bhagirathi river."),
            ("Bhakra Dam", 31.410, 76.430, "Himachal Pradesh", "Gravity Dam", "Iconic concrete gravity dam on the Satluj river forming the Gobind Sagar reservoir."),
            ("Sardar Sarovar Dam", 21.830, 73.740, "Gujarat", "Gravity Dam", "Terminal concrete gravity dam on Narmada river supporting the Statue of Unity downstream."),
            ("Hirakud Dam", 21.520, 83.870, "Odisha", "Earthfill / Embankment", "Longest earthen dam in the world (25.8 km total length) built across Mahanadi river."),
            ("Nagarjuna Sagar", 16.570, 79.310, "Telangana", "Gravity Dam", "World's largest masonry dam built across Krishna river between Nalgonda and Guntur."),
            ("Idukki Dam", 9.850, 76.970, "Kerala", "Gravity Dam", "Concrete double-curvature parabolic thin arch dam between Kuravan and Kurathi hills on Periyar."),
            ("Koyna Dam", 17.390, 73.740, "Maharashtra", "Gravity Dam", "Rubble-concrete dam on Koyna river, notorious for the 1967 reservoir-triggered earthquake."),
            ("Farakka Barrage", 24.800, 87.930, "West Bengal", "Barrage / Diversion", "Barrage diverting 40,000 cusecs of Ganga water into the Bhagirathi-Hooghly to flush Kolkata port."),
            ("Pong Dam", 31.970, 75.950, "Himachal Pradesh", "Earthfill / Embankment", "Highest earth-fill dam in India on the Beas river forming Maharana Pratap Sagar Ramsar site."),
            ("Mullaperiyar Dam", 9.530, 77.140, "Kerala", "Gravity Dam", "Masonry gravity dam located in Kerala on Periyar river but leased and operated by Tamil Nadu."),
            ("Almatti Dam", 16.330, 75.890, "Karnataka", "Gravity Dam", "Main reservoir of the Upper Krishna Project generating hydroelectric power in Bijapur district."),
            ("Gandhi Sagar", 24.700, 75.520, "Madhya Pradesh", "Gravity Dam", "First of the four major dams built on the Chambal river under the Chambal Valley Project."),
            ("Indira Sagar", 22.280, 74.980, "Madhya Pradesh", "Gravity Dam", "Key mother dam on Narmada river with the largest reservoir capacity in India (12.22 billion m3).")
        ],
        "questions": [
            ("The Idukki Dam in Kerala across the Periyar river is notable for which structural design?", "Double-curvature parabolic arch dam", ["Rockfill embankment", "Buttress dam", "Wooden crib dam"], "Idukki is one of the highest arch dams in Asia, constructed between two granite hills without spillways."),
            ("Why was the Farakka Barrage constructed across the Ganga river in West Bengal?", "To preserve and flush the Port of Kolkata from siltation", ["To irrigate dry districts of Purulia", "To produce nuclear cooling water", "To divert water to Bangladesh"], "Farakka Barrage diverts water into the Bhagirathi-Hooghly system to maintain draft at Kolkata port."),
            ("Which dam holds the title of the longest earthen dam in the world?", "Hirakud Dam", ["Tehri Dam", "Bhakra Dam", "Nagarjuna Sagar"], "Hirakud Dam across the Mahanadi has an overall dyke length extending over 25.8 km.")
        ]
    },
    {
        "id": "national_parks",
        "title": "National Parks & Tiger Reserves",
        "emoji": "🐅",
        "color": "#16A34A",
        "syllabus": "GS3 · Environment · Wildlife Conservation",
        "noun": "national park / reserve",
        "blurb": "Prime habitats of the Royal Bengal Tiger, Asiatic Lion, and endemic fauna.",
        "categories": ["Tiger Reserve", "National Park", "Elephant & Rhino Reserve"],
        "places": [
            ("Jim Corbett", 29.530, 78.770, "Uttarakhand", "Tiger Reserve", "India's first national park (1936, Hailey NP) and birthplace of Project Tiger in 1973 on Ramganga river."),
            ("Kaziranga", 26.570, 93.170, "Assam", "Elephant & Rhino Reserve", "UNESCO World Heritage site harboring two-thirds of world's great one-horned rhinoceros."),
            ("Keoladeo Ghana", 27.160, 77.520, "Rajasthan", "National Park", "UNESCO site and Ramsar wetland famous for wintering Siberian cranes; Montreux Record site."),
            ("Ranthambore", 26.010, 76.500, "Rajasthan", "Tiger Reserve", "Junction of Aravalli and Vindhya ranges with historic 10th century fort inside."),
            ("Sundarbans", 21.940, 88.890, "West Bengal", "Tiger Reserve", "World's largest mangrove delta, habitat of swimming tigers adapting to saline tides."),
            ("Gir National Park", 21.120, 70.800, "Gujarat", "National Park", "Only surviving natural sanctuary of the Asiatic Lion (Panthera leo persica) in Kathiawar peninsula."),
            ("Bandipur", 11.660, 76.620, "Karnataka", "Tiger Reserve", "Part of the Nilgiri Biosphere Reserve, contiguous with Mudumalai, Wayanad and Nagarhole."),
            ("Periyar", 9.460, 77.140, "Kerala", "Elephant & Rhino Reserve", "Cardamom hills sanctuary surrounding Periyar lake, notable for Asian elephants and tigers."),
            ("Kanha", 22.330, 80.610, "Madhya Pradesh", "Tiger Reserve", "Revived the hard-ground swamp deer (Barasingha - Mascot Bhoorsingh) from brink of extinction."),
            ("Hemis", 34.000, 77.200, "Ladakh", "National Park", "India's largest national park (>4400 sq km), renowned high-altitude home of the elusive Snow Leopard."),
            ("Silent Valley", 11.080, 76.430, "Kerala", "National Park", "Tropical evergreen rainforest in Kundali hills saved from hydel project; home to Lion-tailed Macaque."),
            ("Namdapha", 27.490, 96.380, "Arunachal Pradesh", "Tiger Reserve", "Only park with 4 big cats: Tiger, Leopard, Snow Leopard, and Clouded Leopard (Mishmi hills)."),
            ("Desert National Park", 26.910, 70.900, "Rajasthan", "National Park", "Thar desert ecosystem and critical breeding ground of the Critically Endangered Great Indian Bustard."),
            ("Simlipal", 21.860, 86.340, "Odisha", "Tiger Reserve", "Mayurbhanj biosphere reserve famous for unique melanistic (pseudo-melanistic black) tigers."),
            ("Nokrek", 25.490, 90.310, "Meghalaya", "National Park", "Garo Hills core biosphere reserve protecting gene sanctuary for wild Citrus indica.")
        ],
        "questions": [
            ("Which Indian national park is the only place in the world harboring four pantherine big cat species?", "Namdapha National Park", ["Kaziranga", "Jim Corbett", "Kanha National Park"], "Namdapha in Arunachal Pradesh hosts Tiger, Leopard, Snow Leopard and Clouded Leopard across altitudinal zones."),
            ("The 'Bhoorsingh the Barasingha' is the official mascot of which national park?", "Kanha National Park", ["Ranthambore", "Bandhavgarh", "Pench National Park"], "Kanha was the first tiger reserve in India to officially introduce a mascot to raise conservation awareness."),
            ("Which river flows through the heart of Jim Corbett National Park?", "Ramganga", ["Ganga", "Alaknanda", "Kosi"], "The Ramganga river and its tributaries form the central catchment of Corbett.")
        ]
    },
    {
        "id": "biosphere_reserves",
        "title": "Biosphere Reserves",
        "emoji": "🌿",
        "color": "#059669",
        "syllabus": "GS3 · Environment · MAB Programme",
        "noun": "biosphere reserve",
        "blurb": "UNESCO Man and the Biosphere (MAB) reserves and representative ecosystems.",
        "categories": ["UNESCO WNBR Recognized", "National Biosphere Reserve"],
        "places": [
            ("Nilgiri", 11.550, 76.500, "Tamil Nadu", "UNESCO WNBR Recognized", "First biosphere reserve designated in India (1986); tri-junction of TN, Kerala and Karnataka."),
            ("Nanda Devi", 30.400, 79.800, "Uttarakhand", "UNESCO WNBR Recognized", "Himalayan reserve encompassing Rishi Ganga gorge and Valley of Flowers National Park."),
            ("Gulf of Mannar", 9.150, 79.200, "Tamil Nadu", "UNESCO WNBR Recognized", "Southeast Asia's first marine biosphere reserve, sanctuary for the vulnerable Dugong (sea cow)."),
            ("Sundarbans", 21.800, 88.900, "West Bengal", "UNESCO WNBR Recognized", "Tidal mangrove ecosystem in the Ganges-Brahmaputra delta, tiger conservation zone."),
            ("Nokrek", 25.480, 90.320, "Meghalaya", "UNESCO WNBR Recognized", "Core zone in Garo Hills preserving wild progenitor species of modern citrus fruits."),
            ("Pachmarhi", 22.460, 78.430, "Madhya Pradesh", "UNESCO WNBR Recognized", "Satpura Range ecosystem featuring deep ravines, Sal forests, and endemic Indian Giant Squirrel."),
            ("Simlipal", 21.850, 86.350, "Odisha", "UNESCO WNBR Recognized", "Red silk cotton tree haven in Mayurbhanj, home to Santhal tribes and elephant corridors."),
            ("Achanakmar-Amarkantak", 22.650, 81.750, "Chhattisgarh", "UNESCO WNBR Recognized", "Maikal hills junction of Vindhyas and Satpuras, watershed source of Narmada, Son and Johilla."),
            ("Great Nicobar", 7.000, 93.800, "Andaman & Nicobar Islands", "UNESCO WNBR Recognized", "Southernmost biosphere reserve, home to Shompen indigenous people and Nicobar Megapode."),
            ("Agasthyamala", 8.610, 77.240, "Kerala", "UNESCO WNBR Recognized", "Western Ghats biome in Kerala and TN, traditional homeland of the Kani tribal community."),
            ("Khangchendzonga", 27.700, 88.200, "Sikkim", "UNESCO WNBR Recognized", "High-altitude Himalayan biome containing Zemu glacier and sacred Tibetan Buddhist sites."),
            ("Panna", 24.720, 80.200, "Madhya Pradesh", "UNESCO WNBR Recognized", "Vindhyan belt reserve on Ken river; successfully reintroduced tigers after local extirpation."),
            ("Cold Desert", 32.100, 77.900, "Himachal Pradesh", "National Biosphere Reserve", "Trans-Himalayan cold desert including Pin Valley National Park and Kibber Wildlife Sanctuary."),
            ("Dehang-Dibang", 28.500, 95.000, "Arunachal Pradesh", "National Biosphere Reserve", "Eastern Himalayan reserve encompassing Siang and Dibang river valleys with Takin."),
            ("Great Rann of Kutch", 23.800, 70.000, "Gujarat", "National Biosphere Reserve", "Largest biosphere reserve in India by area, famous for seasonal salt desert and Indian Wild Ass.")
        ],
        "questions": [
            ("Which was the first Biosphere Reserve to be designated in India under the UNESCO MAB framework?", "Nilgiri Biosphere Reserve", ["Sundarbans", "Gulf of Mannar", "Nanda Devi"], "Nilgiri was established in 1986 and was the first in India to be inducted into the World Network of Biosphere Reserves in 2000."),
            ("Which Indian biosphere reserve is home to the primitive hunter-gatherer Shompen tribe?", "Great Nicobar Biosphere Reserve", ["Little Andaman", "Gulf of Mannar", "Simlipal"], "The Shompen are an indigenous Particularly Vulnerable Tribal Group (PVTG) native to Great Nicobar Island."),
            ("The Ken-Betwa river linking project intersects which tiger reserve and biosphere reserve?", "Panna Biosphere Reserve", ["Bandhavgarh", "Kanha", "Achanakmar"], "The Daudhan dam of Ken-Betwa link submerges portions of the core habitat of Panna Tiger Reserve.")
        ]
    },
    {
        "id": "ramsar_wetlands",
        "title": "Ramsar Wetlands",
        "emoji": "🪷",
        "color": "#0891B2",
        "syllabus": "GS3 · Environment · Wetland Ecology",
        "noun": "Ramsar wetland",
        "blurb": "Wetlands of international importance under the Ramsar Convention.",
        "categories": ["Coastal Wetland", "Inland Lake Wetland", "High Altitude Wetland"],
        "places": [
            ("Chilika Lake", 19.700, 85.300, "Odisha", "Coastal Wetland", "First Indian Ramsar site (1981); Asia's largest brackish lagoon hosting Irrawaddy dolphins."),
            ("Keoladeo Ghana", 27.160, 77.520, "Rajasthan", "Inland Lake Wetland", "Man-made wetland on Gambhir and Banganga rivers; Montreux Record site."),
            ("Loktak Lake", 24.550, 93.800, "Manipur", "Inland Lake Wetland", "Pumdi-rich freshwater lake; hosts world's only floating national park (Keibul Lamjao)."),
            ("Wular Lake", 34.330, 74.580, "Jammu & Kashmir", "Inland Lake Wetland", "One of Asia's largest freshwater lakes formed by tectonic activity on the Jhelum river."),
            ("Sambhar Lake", 26.900, 75.000, "Rajasthan", "Inland Lake Wetland", "India's largest inland saline lake; key wintering area for tens of thousands of flamingos."),
            ("Vembanad-Kol", 9.600, 76.400, "Kerala", "Coastal Wetland", "Longest lake in India (96 km), fed by 10 rivers; hosts the Nehru Trophy Snake Boat Race."),
            ("Renuka Lake", 30.600, 77.450, "Himachal Pradesh", "Inland Lake Wetland", "Smallest Ramsar wetland in India (area ~0.2 sq km) dedicated to Goddess Renuka."),
            ("Tsomoriri", 32.900, 78.300, "Ladakh", "High Altitude Wetland", "Brackish trans-Himalayan lake at 4595m altitude, breeding ground of Black-necked Crane."),
            ("Bhoj Wetland", 23.250, 77.350, "Madhya Pradesh", "Inland Lake Wetland", "Consists of Upper Lake (Bada Talab constructed by Raja Bhoj) and Lower Lake."),
            ("Deepor Beel", 26.130, 91.660, "Assam", "Inland Lake Wetland", "Perennial freshwater lake and former channel of the Brahmaputra near Guwahati."),
            ("Kolleru Lake", 16.650, 81.330, "Andhra Pradesh", "Inland Lake Wetland", "Located between Krishna and Godavari deltas; fed by Tammileru and Budameru streams."),
            ("Point Calimere", 10.300, 79.850, "Tamil Nadu", "Coastal Wetland", "Coastal tip of Cauvery delta with saline swamps, mangroves, and flamingos."),
            ("Harike Wetland", 31.150, 74.950, "Punjab", "Inland Lake Wetland", "Deep freshwater wetland created at the confluence of the Beas and Satluj rivers (Indira Gandhi Canal origin)."),
            ("Bhitarkanika Mangroves", 20.720, 86.860, "Odisha", "Coastal Wetland", "Second largest mangrove ecosystem in India; prime breeding ground of Saltwater Crocodiles and Olive Ridley turtles.")
        ],
        "questions": [
            ("Which two Indian Ramsar wetlands are currently listed on the Montreux Record?", "Keoladeo National Park & Loktak Lake", ["Chilika Lake & Wular Lake", "Sambhar Lake & Vembanad", "Harike & Bhoj"], "The Montreux Record highlights wetlands where ecological character changes have occurred or are likely. Chilika was removed from the list after successful restoration."),
            ("The Indira Gandhi Canal (Rajasthan Canal) originates from which Ramsar wetland?", "Harike Wetland", ["Sambhar Lake", "Pong Dam", "Ropar Wetland"], "The canal originates from the Harike Barrage at the confluence of the Satluj and Beas rivers in Punjab."),
            ("The unique floating heterogeneous biomass known as 'Phumdis' is characteristic of which wetland?", "Loktak Lake", ["Wular Lake", "Deepor Beel", "Rudrasagar Lake"], "Phumdis are floating masses of soil, vegetation and organic matter exclusive to Loktak Lake in Manipur.")
        ]
    },
    {
        "id": "unesco_heritage",
        "title": "UNESCO World Heritage Sites",
        "emoji": "🏛️",
        "color": "#CA8A04",
        "syllabus": "GS1 · Art & Culture · Monuments & Heritage",
        "noun": "heritage site",
        "blurb": "Monuments, architectural masterpieces, and pristine natural biomes.",
        "categories": ["Cultural Site", "Natural Site", "Mixed Site"],
        "places": [
            ("Ajanta Caves", 20.552, 75.703, "Maharashtra", "Cultural Site", "29 rock-cut Buddhist cave monuments in Waghora gorge renowned for mural paintings."),
            ("Ellora Caves", 20.026, 75.179, "Maharashtra", "Cultural Site", "Monumental rock-cut temples (Buddhist, Hindu, Jain) featuring the monolithic Kailasa temple (Cave 16)."),
            ("Taj Mahal", 27.175, 78.042, "Uttar Pradesh", "Cultural Site", "White marble mausoleum commissioned in 1632 by Mughal Emperor Shah Jahan on Yamuna bank."),
            ("Hampi", 15.335, 76.460, "Karnataka", "Cultural Site", "Ruins of the magnificent capital city of the Vijayanagara Empire on the Tungabhadra river."),
            ("Khajuraho", 24.831, 79.919, "Madhya Pradesh", "Cultural Site", "Group of Nagara-style Hindu and Jain temples built between 950-1050 AD by the Chandela dynasty."),
            ("Sun Temple Konark", 19.887, 86.094, "Odisha", "Cultural Site", "Colossal 13th-century chariot of Surya with 24 carved wheels built by King Narasimhadeva I."),
            ("Group of Monuments at Mahabalipuram", 12.626, 80.192, "Tamil Nadu", "Cultural Site", "Pallava sanctuary of monolithic rathas, bas-relief 'Descent of the Ganga', and the Shore Temple."),
            ("Fatehpur Sikri", 27.094, 77.667, "Uttar Pradesh", "Cultural Site", "Short-lived capital of Emperor Akbar featuring the monumental Buland Darwaza and Panch Mahal."),
            ("Khangchendzonga National Park", 27.660, 88.180, "Sikkim", "Mixed Site", "India's first and only 'Mixed' World Heritage site (recognized for natural beauty and sacred Beyul cultural traditions)."),
            ("Dholavira", 23.886, 70.213, "Gujarat", "Cultural Site", "Harappan city in Khadir Bet island with sophisticated multistage water reservoirs and stadium."),
            ("Kakatiya Rudreshwara (Ramappa)", 18.261, 79.943, "Telangana", "Cultural Site", "Medieval Kakatiya Shiva temple built using lightweight floating porous bricks on a sandbox foundation."),
            ("Santiniketan", 23.680, 87.680, "West Bengal", "Cultural Site", "Residential school and university established in 1901 by Nobel laureate Rabindranath Tagore."),
            ("Sacred Ensembles of the Hoysalas", 13.160, 75.860, "Karnataka", "Cultural Site", "Stellate (star-shaped) chloritic schist temples of Belur, Halebid, and Somanathapura (12th-13th century).")
        ],
        "questions": [
            ("Which is the only site in India inscribed under UNESCO's 'Mixed' heritage category?", "Khangchendzonga National Park", ["Western Ghats", "Manas Wildlife Sanctuary", "Nanda Devi"], "Khangchendzonga was inscribed in 2016 for its exceptional ecological biodiversity and sacred cultural landscape in Sikkimese Buddhism."),
            ("What engineering ingenuity distinguishes the construction of the Ramappa Temple in Telangana?", "Sandbox foundation and floating lightweight bricks", ["Interlocking copper clamps", "Mortar made of crushed sea shells", "Monolithic carving out of basalt rock"], "Ramappa temple's roof superstructure utilizes lightweight clay bricks that float on water, resting on sandbox foundations that absorb seismic shock."),
            ("The megalithic stone chariot at Vijaya Vittala temple is an iconic symbol of which UNESCO site?", "Hampi", ["Pattadakal", "Mahabalipuram", "Khajuraho"], "The stone chariot at Hampi is dedicated to Garuda within the Vittala temple complex.")
        ]
    },
    {
        "id": "lakes_lagoons",
        "title": "Lakes & Lagoons of India",
        "emoji": "💧",
        "color": "#0284C7",
        "syllabus": "GS1 · Geography · Geomorphology & Drainage",
        "noun": "lake / lagoon",
        "blurb": "Crater, tectonic, glacial, and coastal water bodies across physiographic zones.",
        "categories": ["Tectonic / Fluvial Lake", "Lagoon / Coastal Lake", "Crater / Endorheic Lake", "Glacial / High Altitude"],
        "places": [
            ("Lonar Lake", 19.976, 76.507, "Maharashtra", "Crater / Endorheic Lake", "Geo-heritage hyper-velocity impact crater formed in Deccan basalt 50,000 years ago; saline-alkaline water."),
            ("Pulicat Lake", 13.670, 80.200, "Andhra Pradesh", "Lagoon / Coastal Lake", "Second largest brackish lagoon in India, separated from the Bay of Bengal by Sriharikota barrier island."),
            ("Chilika Lake", 19.720, 85.320, "Odisha", "Lagoon / Coastal Lake", "Largest brackish water lagoon in India; fed by Daya river, open to Bay of Bengal via channel."),
            ("Loktak Lake", 24.550, 93.790, "Manipur", "Tectonic / Fluvial Lake", "Largest natural freshwater lake in Northeast India, famed for round floating phumdi masses."),
            ("Wular Lake", 34.350, 74.550, "Jammu & Kashmir", "Tectonic / Fluvial Lake", "Largest freshwater lake in India formed by tectonic activity on the Jhelum river basin."),
            ("Dal Lake", 34.110, 74.870, "Jammu & Kashmir", "Tectonic / Fluvial Lake", "Urban lake in Srinagar renowned for houseboats, shikaras, and floating vegetable gardens (Radh)."),
            ("Pangong Tso", 33.750, 78.900, "Ladakh", "Crater / Endorheic Lake", "World's highest saltwater lake (4350m); endorheic lake extending from Ladakh into Tibet."),
            ("Sambhar Lake", 26.920, 75.020, "Rajasthan", "Crater / Endorheic Lake", "Shallow saline playa fed by Mendha, Runpangarh, Khari and Khandel rivers in the Aravallis."),
            ("Tso Kar", 33.300, 78.000, "Ladakh", "Crater / Endorheic Lake", "Fluctuating white hypersaline lake known for extensive efflorescence of borax and salt deposits."),
            ("Vembanad Lake", 9.600, 76.380, "Kerala", "Lagoon / Coastal Lake", "Spans three Kerala districts; famous for Thanneermukkom saltwater barrage separating sweet and saltwater."),
            ("Sasthamkotta Lake", 9.040, 76.630, "Kerala", "Tectonic / Fluvial Lake", "Queen of Lakes in Kollam; largest freshwater lake in Kerala containing larva of Chaoborus insects."),
            ("Hussain Sagar", 17.424, 78.474, "Telangana", "Tectonic / Fluvial Lake", "Heart-shaped artificial lake built in 1563 by Ibrahim Qutb Shah on a Musi river tributary."),
            ("Jaisamand Lake (Dhebar)", 24.240, 74.000, "Rajasthan", "Tectonic / Fluvial Lake", "Historic artificial freshwater lake built by Maharana Jai Singh in 1685 across the Gomati river."),
            ("Chandra Taal", 32.480, 77.620, "Himachal Pradesh", "Glacial / High Altitude", "Crescent-shaped high-altitude lake in Spiti valley situated at the source of Chandra river.")
        ],
        "questions": [
            ("Which unique geological lake in India was created by a meteorite collision in basaltic bedrock?", "Lonar Lake", ["Wular Lake", "Chandra Taal", "Sambhar Lake"], "Lonar in Buldhana district of Maharashtra is the world's only known hyper-velocity impact crater in basaltic rock."),
            ("The Thanneermukkom Bund was constructed in which major water body to regulate saltwater intrusion?", "Vembanad Lake", ["Pulicat Lake", "Chilika Lake", "Ashtamudi Lake"], "The Thanneermukkom salt water barrier divides Vembanad into a freshwater southern half and brackish northern half."),
            ("Which barrier island separates the Pulicat brackish lagoon from the Bay of Bengal?", "Sriharikota Island", ["Wheeler (Abdul Kalam) Island", "Willingdon Island", "Hope Island"], "Sriharikota barrier island shelters Pulicat lake and houses ISRO's Satish Dhawan Space Centre.")
        ]
    },
    {
        "id": "mountain_passes",
        "title": "Mountain Passes",
        "emoji": "🏔️",
        "color": "#64748B",
        "syllabus": "GS1 · Physical Geography · Himalayan Orogeny",
        "noun": "pass",
        "blurb": "Strategic mountain gateways across the Himalayas and the Western Ghats.",
        "categories": ["Western Himalaya / Ladakh", "Central / Himachal-Uttarakhand", "Eastern / Northeast", "Peninsular Ghats"],
        "places": [
            ("Zoji La", 34.280, 75.500, "Ladakh", "Western Himalaya / Ladakh", "High mountain pass on Great Himalayas connecting Srinagar with Kargil and Leh on NH-1."),
            ("Khardung La", 34.279, 77.605, "Ladakh", "Western Himalaya / Ladakh", "Pass across the Ladakh Range forming the gateway to Shyok and Nubra valleys and Siachen Glacier."),
            ("Banihal Pass", 33.510, 75.190, "Jammu & Kashmir", "Western Himalaya / Ladakh", "Pir Panjal pass pierced by Jawahar Tunnel connecting Jammu plain with Kashmir Valley."),
            ("Rohtang Pass", 32.370, 77.240, "Himachal Pradesh", "Central / Himachal-Uttarakhand", "Pir Panjal pass connecting Kullu Valley with Lahaul and Spiti; bypassed by the Atal Tunnel."),
            ("Shipki La", 31.810, 78.750, "Himachal Pradesh", "Central / Himachal-Uttarakhand", "Indo-China border pass through which the Satluj river enters India from Tibet."),
            ("Lipulekh Pass", 30.230, 80.930, "Uttarakhand", "Central / Himachal-Uttarakhand", "Tri-junction pass between India, Nepal and Tibet; historic pilgrimage route to Kailash-Mansarovar."),
            ("Mana Pass", 31.060, 79.420, "Uttarakhand", "Central / Himachal-Uttarakhand", "High pass in Zaskar Range near Badrinath; highest motorable roadway pass in the world."),
            ("Niti Pass", 30.960, 79.880, "Uttarakhand", "Central / Himachal-Uttarakhand", "Connects Uttarakhand with Tibet through Dhauli Ganga valley in Nanda Devi Biosphere."),
            ("Nathu La", 27.386, 88.831, "Sikkim", "Eastern / Northeast", "Historic Silk Road pass connecting Sikkim with Tibet's Chumbi Valley, reopened for trade in 2006."),
            ("Jelep La", 27.360, 88.880, "Sikkim", "Eastern / Northeast", "Pass leading directly through the Chumbi Valley linking Kalimpong and Lhasa."),
            ("Bomdi La", 27.260, 92.420, "Arunachal Pradesh", "Eastern / Northeast", "Connects Tezpur in Assam with Tawang in northwestern Arunachal Pradesh."),
            ("Diphu Pass", 28.180, 97.400, "Arunachal Pradesh", "Eastern / Northeast", "Tri-junction pass between India, China, and Myanmar on the McMahon Line."),
            ("Pangsau Pass", 27.250, 96.150, "Arunachal Pradesh", "Eastern / Northeast", "Patkai Hills pass on India-Myanmar border crossed by the World War II Stilwell (Ledo) Road."),
            ("Bhor Ghat", 18.780, 73.360, "Maharashtra", "Peninsular Ghats", "Western Ghats mountain pass connecting Mumbai with Pune on the Deccan plateau."),
            ("Thal Ghat (Kasara)", 19.700, 73.490, "Maharashtra", "Peninsular Ghats", "Pass connecting Mumbai with Nashik and northern India via Central Railway and NH-3."),
            ("Palakkad Gap", 10.780, 76.650, "Kerala", "Peninsular Ghats", "Major 30-km natural tectonic break in the Western Ghats between Nilgiri Hills and Anaimalai Hills.")
        ],
        "questions": [
            ("Through which Himalayan mountain pass does the Satluj River enter Indian territory from Tibet?", "Shipki La", ["Nathu La", "Lipulekh", "Rohtang Pass"], "The Satluj cuts through the Zaskar range and enters Kinnaur district of Himachal Pradesh at Shipki La."),
            ("Which mountain pass links the Kashmir Valley with the Jammu plains through the Pir Panjal range?", "Banihal Pass", ["Zoji La", "Khardung La", "Burzil Pass"], "Banihal Pass connects Jammu with Srinagar; the historic Jawahar Tunnel and the new Banihal-Qazigund railway tunnel traverse it."),
            ("The Palakkad Gap in the Western Ghats provides transport connectivity between which two regions?", "Kerala and Tamil Nadu", ["Maharashtra and Goa", "Karnataka and Kerala", "Andhra Pradesh and Odisha"], "The Palakkad Gap is a low mountain pass linking Palakkad in Kerala with Coimbatore in Tamil Nadu.")
        ]
    },
    {
        "id": "mountain_peaks",
        "title": "Mountain Peaks of India",
        "emoji": "⛰️",
        "color": "#334155",
        "syllabus": "GS1 · Geography · Physiography",
        "noun": "peak",
        "blurb": "Highest summits of the Himalayas, Karakoram, Purvanchal and Peninsular ranges.",
        "categories": ["Himalayas / Karakoram", "Peninsular India", "Northeast & Islands"],
        "places": [
            ("Kangchenjunga", 27.702, 88.147, "Sikkim", "Himalayas / Karakoram", "World's 3rd highest peak (8,586 m) located on the border between Sikkim and Nepal."),
            ("Nanda Devi", 30.375, 79.970, "Uttarakhand", "Himalayas / Karakoram", "Highest mountain peak situated entirely within undisputed Indian territory (7,816 m)."),
            ("Kamet", 30.920, 79.570, "Uttarakhand", "Himalayas / Karakoram", "Second highest peak in Garhwal Himalayas (7,756 m) located in Chamoli district."),
            ("Saltoro Kangri", 35.250, 77.050, "Ladakh", "Himalayas / Karakoram", "High peak of the Saltoro Range (7,742 m) towering over the Siachen Glacier area."),
            ("Anamudi", 10.170, 77.060, "Kerala", "Peninsular India", "Highest peak in South India and the Western Ghats (2,695 m), located in Eravikulam National Park."),
            ("Doddabetta", 11.400, 76.730, "Tamil Nadu", "Peninsular India", "Highest summit of the Nilgiri Hills (2,637 m) near Ooty junction of Eastern and Western Ghats."),
            ("Guru Shikhar", 24.650, 72.780, "Rajasthan", "Peninsular India", "Highest point of the ancient Aravalli Range (1,722 m) located on Mount Abu."),
            ("Dhupgarh", 22.450, 78.370, "Madhya Pradesh", "Peninsular India", "Highest point of the Satpura Range and Madhya Pradesh (1,350 m) near Pachmarhi."),
            ("Kalsubai", 19.600, 73.710, "Maharashtra", "Peninsular India", "Highest peak in Maharashtra (1,646 m) in the Sahyadri range of Western Ghats."),
            ("Arma Konda (Jindhagada)", 18.230, 82.900, "Andhra Pradesh", "Peninsular India", "Highest mountain peak of the Eastern Ghats range (1,690 m) in Araku valley."),
            ("Mahendragiri", 18.960, 84.360, "Odisha", "Peninsular India", "Prominent mythological peak in Gajapati district (1,501 m) in the Eastern Ghats."),
            ("Saramati", 25.740, 95.030, "Nagaland", "Northeast & Islands", "Highest peak of the Purvanchal Hills (3,841 m) on the India-Myanmar border."),
            ("Phawngpui (Blue Mountain)", 22.630, 93.050, "Mizoram", "Northeast & Islands", "Highest peak in Mizoram (2,157 m) revered by the Lai community."),
            ("Saddle Peak", 13.160, 93.010, "Andaman & Nicobar Islands", "Northeast & Islands", "Highest point of the Andaman and Nicobar archipelago (732 m) in North Andaman Island.")
        ],
        "questions": [
            ("Which is the highest mountain peak located entirely within undisputed Indian borders?", "Nanda Devi", ["Kangchenjunga", "K2 (Godwin Austen)", "Kamet"], "Kangchenjunga straddles the Nepal-India border and K2 lies in Pakistan-occupied Kashmir; Nanda Devi (7,816 m) is entirely in Uttarakhand."),
            ("Which peak is recognized as the highest point in the entire Peninsular South India?", "Anamudi", ["Doddabetta", "Agasthyamala", "Mullayanagiri"], "Anamudi (2,695 m) in the Anaimalai Hills of Kerala is the highest summit south of the Himalayas."),
            ("Guru Shikhar on Mount Abu marks the highest culmination of which mountain system?", "Aravalli Range", ["Vindhya Range", "Satpura Range", "Western Ghats"], "Guru Shikhar (1,722 m) is the highest elevation of the fold mountain Aravalli system.")
        ]
    },
    {
        "id": "ancient_sites",
        "title": "Harappan & Ashokan Sites",
        "emoji": "🏺",
        "color": "#9A3412",
        "syllabus": "GS1 · Ancient Indian History · Archaeology",
        "noun": "ancient site",
        "blurb": "Indus Valley civilization cities and Mauryan edicts, stupas, and pillars.",
        "categories": ["Harappan Civilization", "Ashokan Inscription / Pillar", "Early Historical Site"],
        "places": [
            ("Dholavira", 23.886, 70.213, "Gujarat", "Harappan Civilization", "Tripartite Harappan city in Rann of Kutch with stone masonry, cascade reservoirs, and a 10-letter signboard."),
            ("Lothal", 22.520, 72.250, "Gujarat", "Harappan Civilization", "Tidal dockyard port town on Bhogavo river with bead-making factory and terracotta sealings."),
            ("Kalibangan", 29.470, 74.130, "Rajasthan", "Harappan Civilization", "Site on dried Ghaggar river showing earliest ploughed agricultural field and fire altars."),
            ("Rakhigarhi", 29.280, 76.110, "Haryana", "Harappan Civilization", "Largest Harappan metropolis in India (Dhrishadvati basin) with genetic ancient DNA excavations."),
            ("Banawali", 29.620, 75.380, "Haryana", "Harappan Civilization", "Exhibited radial street planning, terracotta model of a plough, and high proportion of barley."),
            ("Ropar (Rupnagar)", 30.970, 76.530, "Punjab", "Harappan Civilization", "First site excavated in post-independence India; burial showing human skeleton with pet dog."),
            ("Alamgirpur", 28.840, 77.480, "Uttar Pradesh", "Harappan Civilization", "Easternmost boundary site of the Indus Valley Civilization located on the Hindon river in Meerut."),
            ("Sarnath", 25.380, 83.020, "Uttar Pradesh", "Ashokan Inscription / Pillar", "Site of Buddha's first sermon (Dharmachakrapravartana); home of Ashoka's Lion Capital (National Emblem)."),
            ("Sanchi", 23.480, 77.740, "Madhya Pradesh", "Ashokan Inscription / Pillar", "Great Stupa commissioned by Ashoka with carved toranas (gateways) depicting Jataka tales."),
            ("Dhauli", 20.190, 85.850, "Odisha", "Ashokan Inscription / Pillar", "Site of the bloody Kalinga War on the Daya river; rock edict surmounted by the forepart of an elephant."),
            ("Jaugada", 19.530, 84.830, "Odisha", "Ashokan Inscription / Pillar", "Fortified Mauryan provincial center in Ganjam containing Ashoka's Separate Kalinga Edicts."),
            ("Maski", 15.960, 76.660, "Karnataka", "Ashokan Inscription / Pillar", "Minor Rock Edict site in Raichur where Emperor Ashoka is explicitly identified by his personal name."),
            ("Junagadh (Girnar)", 21.520, 70.460, "Gujarat", "Ashokan Inscription / Pillar", "Rock carrying 14 Major Edicts of Ashoka, alongside later inscriptions of Rudradaman and Skandagupta (Sudarshana Lake)."),
            ("Kaushambi", 25.330, 81.380, "Uttar Pradesh", "Early Historical Site", "Capital of Vatsa Mahajanapada on the Yamuna; source of the Ashokan schism pillar relocated to Allahabad Fort.")
        ],
        "questions": [
            ("At which archaeological site was an Ashokan Minor Rock Edict found confirming the name 'Asoka' alongside 'Devanampriya'?", "Maski", ["Sarnath", "Dhauli", "Girnar"], "Until Maski was discovered in 1915, inscriptions only used the title 'Devanampriya Priyadarsi'; Maski explicitly named 'Devanampriya Asoka'."),
            ("The presence of a sophisticated stepped tidal dockyard is the defining feature of which Harappan port city?", "Lothal", ["Dholavira", "Surkotada", "Kalibangan"], "Lothal in Gujarat features a massive burnt-brick tidal basin identified as a dockyard connected to the Gulf of Khambhat."),
            ("The rock inscription at Junagadh is famous for recounting the historic construction and repair of which reservoir?", "Sudarshana Lake", ["Bhojtal", "Dhebar Lake", "Pushkar Lake"], "Junagadh rock contains inscriptions of Ashoka, Saka ruler Rudradaman I, and Gupta emperor Skandagupta concerning the Sudarshana lake bund repairs.")
        ]
    }
]
