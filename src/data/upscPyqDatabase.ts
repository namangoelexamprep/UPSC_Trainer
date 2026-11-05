import { UPSCPYQuestion, PYQTheme, MainsDiagramTemplate } from '../types';

export const UPSC_PYQ_DATABASE: UPSCPYQuestion[] = [
  // -------------------------------------------------------------
  // 2024 - 2025 RECENT PRELIMS QUESTIONS
  // -------------------------------------------------------------
  {
    id: 'pyq-2024-01',
    year: 2024,
    exam: 'Civil Services Prelims',
    theme: 'MINERALS_ENERGY',
    themeLabel: 'Minerals & Strategic Resources',
    questionText: 'Consider the following statements regarding Titanium and Beach Sand Minerals in India:',
    statements: [
      '1. Ilmenite and rutile, abundantly available in certain coastal tracts of India, are rich sources of titanium.',
      '2. In India, titanium sponge is produced only by the private sector.',
      '3. Monazite is a radioactive mineral containing thorium and is found in the beach sands of Kerala, Odisha, and Tamil Nadu.'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '1 and 3 only' },
      { key: 'C', text: '2 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Statement 2 is incorrect because Titanium Sponge is produced by Midhani / ISRO / KMML in public sector.',
    eliminationTechnique: 'Look for extreme absolute words like "only by the private sector". Defense and aerospace titanium sponge production in India is heavily anchored by PSUs (MIDHANI in Hyderabad & KMML in Chavara, Kollam).',
    detailedExplanation: 'Ilmenite (FeTiO3) and rutile (TiO2) are the primary commercial minerals for titanium extraction. The heavy mineral sand deposits are extensively found along the coastal stretches of Chavara (Kerala), Manavalakurichi (Tamil Nadu), and Chatrapur (Odisha). Titanium Sponge Plant at KMML Chavara was set up in collaboration with ISRO/VSSC. Monazite is a phosphate mineral bearing thorium and rare earth elements (cerium, lanthanum).',
    prelimsTrapAlert: 'UPSC frequently introduces traps claiming strategic aerospace materials (like Titanium, Thorium, or Heavy Water) are exclusively handled by private industry.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Chavara Beach Sands', state: 'Kerala', lat: 8.995, lon: 76.536, note: 'KMML Titanium Sponge Plant & rich ilmenite-rutile deposits' },
      { placeName: 'Chatrapur Beach Sands', state: 'Odisha', lat: 19.355, lon: 84.992, note: 'IREL (India) Limited heavy minerals plant' },
      { placeName: 'Manavalakurichi', state: 'Tamil Nadu', lat: 8.134, lon: 77.305, note: 'Major monazite, zircon, and rutile placer deposit' }
    ]
  },
  {
    id: 'pyq-2024-02',
    year: 2024,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'River Drainage & Graben Basins',
    questionText: 'Consider the following rivers of Peninsular India:',
    statements: [
      '1. Vamsadhara',
      '2. Indravati',
      '3. Pranahita',
      '4. Pennar'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '3 and 4 only' },
      { key: 'D', text: '1, 2 and 4 only' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Which of the above are tributaries of the Godavari River? Answer is Indravati and Pranahita.',
    eliminationTechnique: 'Pennar flows independently into the Bay of Bengal between Krishna and Cauvery. Vamsadhara is an independent east-flowing river originating in the Eastern Ghats of Kalahandi (Odisha). Eliminate 1 and 4 immediately.',
    detailedExplanation: 'The Godavari is India\'s second longest river. Its major left-bank tributaries include the Pranahita (formed by the confluence of Wardha and Wainganga), Penganga, and Indravati (which originates in Dandakaranya, Kalahandi and forms the Chitrakote Falls in Bastar, Chhattisgarh). Vamsadhara is an independent interstate river between Odisha and Andhra Pradesh. Pennar flows through Karnataka and Andhra Pradesh.',
    prelimsTrapAlert: 'Do not confuse east-flowing independent rivers of the Coromandel/Northern Circars coast (Subarnarekha, Baitarani, Brahmani, Rushikulya, Vamsadhara, Nagavali, Pennar, Palar, Vaigai) with tributaries of the Big Three (Mahanadi, Godavari, Krishna).',
    difficulty: 'Direct Recall',
    associatedCoordinates: [
      { placeName: 'Indravati River Gorge', state: 'Chhattisgarh', lat: 19.201, lon: 81.712, note: 'Left-bank tributary flowing through Bastar & Chitrakote Falls' },
      { placeName: 'Kaleshwaram (Pranahita Confluence)', state: 'Telangana', lat: 18.815, lon: 79.907, note: 'Confluence of Pranahita with Godavari' },
      { placeName: 'Pennar River Estuary', state: 'Andhra Pradesh', lat: 14.582, lon: 80.145, note: 'Independent river basin emptying near Nellore' }
    ]
  },
  {
    id: 'pyq-2023-01',
    year: 2023,
    exam: 'Civil Services Prelims',
    theme: 'PROTECTED_AREAS',
    themeLabel: 'Protected Areas & Biospheres',
    questionText: 'Which one of the following protected areas is well-known for the conservation of a sub-species of the Indian swamp deer (Barasingha) that thrives well on hard ground and is exclusively graminivorous?',
    statements: [],
    options: [
      { key: 'A', text: 'Kanha National Park' },
      { key: 'B', text: 'Manas National Park' },
      { key: 'C', text: 'Mudumalai Wildlife Sanctuary' },
      { key: 'D', text: 'Tal Chhapar Wildlife Sanctuary' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Kanha is the sole home to the hard-ground Barasingha (Rucervus duvaucelii branderi), featured in Bhoorsingh the Barasingha.',
    eliminationTechnique: 'The keyword is "hard ground Barasingha" (Branderi sub-species). Northern swampy sub-species are found in Kaziranga/Dudhwa, but the hard-ground variety was revived exclusively in the Maikal hills sal forest of Kanha.',
    detailedExplanation: 'Kanha Tiger Reserve in Madhya Pradesh is world-famous for rescuing the hard-ground swamp deer from near-extinction (under 70 individuals in 1970 to over 800 today). Kanha became the first tiger reserve in India to officially introduce a mascot, "Bhoorsingh the Barasingha". The terrain comprises grasslands and open sal forests in the Satpura-Maikal range.',
    prelimsTrapAlert: 'Tal Chhapar in Chhapar (Churu, Rajasthan) is famous for Blackbucks, NOT Barasingha. Mudumalai is in the Nilgiri Biosphere, harboring Asian elephants and tigers, not swamp deer.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Kanha National Park', state: 'Madhya Pradesh', lat: 22.334, lon: 80.611, topicId: 'national_parks', note: 'Maikal Range, hard-ground Barasingha conservation habitat' },
      { placeName: 'Tal Chhapar Sanctuary', state: 'Rajasthan', lat: 27.801, lon: 74.433, note: 'Shekhawati region, saline depression for Blackbucks' },
      { placeName: 'Mudumalai Tiger Reserve', state: 'Tamil Nadu', lat: 11.562, lon: 76.534, topicId: 'tiger_reserves', note: 'Nilgiri tri-junction' }
    ]
  },
  {
    id: 'pyq-2023-02',
    year: 2023,
    exam: 'Civil Services Prelims',
    theme: 'PORTS_INFRA',
    themeLabel: 'Major Ports & Connectivity',
    questionText: 'Consider the following pairs of Ports and their special characteristics:',
    statements: [
      '1. Kamarajar Port (Ennore) : First major port in India registered as a corporate company',
      '2. Mundra Port : Largest privately owned port in India',
      '3. Visakhapatnam Port : Largest container port in India'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '1 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Pair 3 is incorrect because Jawaharlal Nehru Port (JNPT / Nhava Sheva) is India\'s largest container port.',
    eliminationTechnique: 'Visakhapatnam is India\'s deepest landlocked port and handles massive iron ore/bulk cargo, but JNPT (Navi Mumbai) handles over 50% of India\'s containerized cargo. Eliminate pair 3.',
    detailedExplanation: 'Kamarajar Port Limited (Ennore), situated on the Coromandel Coast north of Chennai, is the 12th major port of India and the first to be operated under the Companies Act rather than a port trust. Mundra Port in the Gulf of Kutch (Gujarat) is India\'s largest commercial private port operated by APSEZ. Jawaharlal Nehru Port Authority (JNPT Nhava Sheva) in Maharashtra is India\'s premier container gateway.',
    prelimsTrapAlert: 'Always verify "Largest Container Port" (JNPT) vs "Largest Commercial / Private Port" (Mundra) vs "Deepest Natural Port" (Visakhapatnam / Gangavaram) vs "Tidal Free Trade Port" (Deendayal / Kandla).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Kamarajar Port (Ennore)', state: 'Tamil Nadu', lat: 13.261, lon: 80.334, topicId: 'major_ports', note: 'First corporatized major port' },
      { placeName: 'Mundra Port', state: 'Gujarat', lat: 22.741, lon: 69.702, topicId: 'major_ports', note: 'Northern shore of Gulf of Kutch' },
      { placeName: 'Jawaharlal Nehru Port (JNPT)', state: 'Maharashtra', lat: 18.951, lon: 72.951, topicId: 'major_ports', note: 'Nhava Sheva, handles premier national container traffic' }
    ]
  },
  {
    id: 'pyq-2023-03',
    year: 2023,
    exam: 'Civil Services Prelims',
    theme: 'PLACES_IN_NEWS',
    themeLabel: 'Global & Domestic Conflict Regions',
    questionText: 'Consider the following pairs of regions often mentioned in news and the country they are located in:',
    statements: [
      '1. Donbas : Syria',
      '2. Tigray : Ethiopia',
      '3. Cabo Delgado : Mozambique',
      '4. Oromia : Nigeria'
    ],
    options: [
      { key: 'A', text: 'Only one pair is correctly matched' },
      { key: 'B', text: 'Only two pairs are correctly matched' },
      { key: 'C', text: 'Only three pairs are correctly matched' },
      { key: 'D', text: 'All four pairs are correctly matched' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Pairs 2 and 3 are correct. Donbas is in Ukraine (not Syria). Oromia is in Ethiopia (not Nigeria).',
    eliminationTechnique: 'Donbas (Donetsk + Luhansk) is the eastern coal basin of Ukraine. Tigray and Oromia are both ethnic federal regions in Ethiopia.',
    detailedExplanation: 'Donbas is the heavily contested industrial and coal-mining basin in eastern Ukraine. Tigray witnessed fierce warfare between the TPLF and Ethiopian federal troops in northern Ethiopia. Cabo Delgado is a gas-rich northern coastal province in Mozambique afflicted by insurgencies. Oromia is the largest regional state in Ethiopia, surrounding Addis Ababa.',
    prelimsTrapAlert: 'UPSC frequently pairs African conflict zones (Sahel, Tigray, Cabo Delgado, Darfur, Kivu) with mismatched nations.',
    difficulty: 'Challenging',
    associatedCoordinates: [
      { placeName: 'Donbas Basin', state: 'Eastern Europe (Ukraine)', lat: 48.015, lon: 37.802, note: 'Donets River coal basin' },
      { placeName: 'Tigray Region', state: 'Horn of Africa (Ethiopia)', lat: 14.032, lon: 38.316, note: 'Northern Ethiopian plateau' },
      { placeName: 'Cabo Delgado', state: 'East Africa (Mozambique)', lat: -12.333, lon: 39.316, note: 'Rovuma gas basin coast' }
    ]
  },
  {
    id: 'pyq-2022-01',
    year: 2022,
    exam: 'Civil Services Prelims',
    theme: 'MINERALS_ENERGY',
    themeLabel: 'Gondwana Coal & Mineral Belts',
    questionText: 'With reference to the coal reserves in India, consider the following statements:',
    statements: [
      '1. Gondwana coal is laminated, bituminous, and accounts for over 98% of the total coal reserves of India.',
      '2. Gondwana coal is completely moisture-free and has zero sulfur and ash content.',
      '3. Tertiary coals are found in Assam, Meghalaya, Arunachal Pradesh, and Nagaland and have high sulfur content.'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '1 and 3 only' },
      { key: 'C', text: '2 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Statement 2 is false. Indian Gondwana coal has notoriously high ash content (35% to 45%).',
    eliminationTechnique: 'Eliminate extreme claims: "completely moisture-free and has zero sulfur and ash". Indian coal is famous for high ash content, which is why Indian thermal power plants require coal washeries.',
    detailedExplanation: 'Gondwana coal was formed ~250 million years ago during the Permian epoch in downfaulted graben river valleys (Damodar, Son, Mahanadi, Godavari). It constitutes 98% of reserves. Due to drift origin (drift theory), Indian Gondwana coal contains high ash (35-45%) and low sulfur (0.5%). Conversely, Tertiary coal (~55 million years, Eocene-Oligocene) found in Makum (Assam), Nazira (Nagaland), and Meghalaya has low ash but very high sulfur (2-7%), producing sulfur dioxide during combustion.',
    prelimsTrapAlert: 'Gondwana coal = HIGH ASH, LOW SULFUR. Tertiary coal = LOW ASH, HIGH SULFUR. Remember this classic UPSC antithesis.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Jharia Coalfield', state: 'Jharkhand', lat: 23.742, lon: 86.415, topicId: 'coal_fields', note: 'Prime coking coal repository in Damodar Valley' },
      { placeName: 'Makum Coalfield', state: 'Assam', lat: 27.301, lon: 95.725, topicId: 'coal_fields', note: 'Tertiary high-sulfur coal' },
      { placeName: 'Raniganj Coalfield', state: 'West Bengal', lat: 23.619, lon: 87.127, topicId: 'coal_fields', note: 'Birthplace of Indian coal mining (1774)' }
    ]
  },
  {
    id: 'pyq-2022-02',
    year: 2022,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Himalayan & Peninsular Rivers',
    questionText: 'Consider the following pairs of rivers and the reservoirs / projects constructed on them:',
    statements: [
      '1. Ghataprabha : Malaprabha Reservoir',
      '2. Gandhi Sagar : Chambal River',
      '3. Indira Sagar : Narmada River',
      '4. Maithon : Damodar River'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '3 and 4 only' },
      { key: 'D', text: '2, 3 and 4' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Maithon is on the Barakar River (a tributary of Damodar), not on the Damodar main stem.',
    eliminationTechnique: 'Maithon Dam (DVC) was built on Barakar River (as was Tilaiya). Panchet Dam is on the Damodar main stem. Ghataprabha dam is Hidkal Dam. This eliminates 1 and 4.',
    detailedExplanation: 'Gandhi Sagar Dam in Mandsaur (Madhya Pradesh) is the first of the four major dams on the Chambal River (followed by Rana Pratap Sagar, Jawahar Sagar, and Kota Barrage). Indira Sagar in Khandwa (MP) is the flagship reservoir on the Narmada River. Maithon Dam in Dhanbad is on the Barakar River, famous for its underground powerhouse under the Damodar Valley Corporation (DVC).',
    prelimsTrapAlert: 'UPSC tests tributary vs main-stem precision: Barakar (Maithon, Tilaiya) vs Konar (Konar Dam) vs Damodar main stem (Panchet).',
    difficulty: 'High-Difficulty Trap',
    associatedCoordinates: [
      { placeName: 'Gandhi Sagar Dam', state: 'Madhya Pradesh', lat: 24.708, lon: 75.556, topicId: 'major_dams', note: 'Chambal River upstream reservoir' },
      { placeName: 'Indira Sagar Dam', state: 'Madhya Pradesh', lat: 22.284, lon: 76.471, topicId: 'major_dams', note: 'Key reservoir in Narmada Valley' },
      { placeName: 'Maithon Dam', state: 'Jharkhand', lat: 23.858, lon: 86.812, topicId: 'major_dams', note: 'Barakar River underground power plant' }
    ]
  },
  {
    id: 'pyq-2021-01',
    year: 2021,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Indus Water System',
    questionText: 'With reference to the Indus river system, of the following four rivers, three of them pour into one of them which joins the Indus direct. Among the following, which one is such river that joins the Indus direct?',
    statements: [],
    options: [
      { key: 'A', text: 'Chenab' },
      { key: 'B', text: 'Jhelum' },
      { key: 'C', text: 'Ravi' },
      { key: 'D', text: 'Sutlej' }
    ],
    correctOption: 'D',
    officialKeyNote: 'Chenab receives Jhelum and Ravi, then joins Sutlej. The united stream (Panjnad) meets Indus near Mithankot.',
    eliminationTechnique: 'Trace the downstream flow: Jhelum joins Chenab at Trimmu; Ravi joins Chenab at Sarai Sidhu; Beas joins Sutlej at Harike. Then Chenab meets Sutlej at Uch Sharif, and Sutlej/Panjnad flows directly to meet the Indus.',
    detailedExplanation: 'In the Punjab plains of Pakistan, Jhelum and Ravi discharge into the Chenab River. Meanwhile, the Beas meets the Sutlej at Harike in Indian Punjab. The Sutlej receives the Chenab (carrying Jhelum and Ravi waters) at Uch Sharif to form the Panjnad River, which traverses ~71 km before emptying directly into the Indus River near Mithankot.',
    prelimsTrapAlert: 'Many candidates debate between Chenab and Sutlej. Official answer key resolved Sutlej (or Panjnad stream of Sutlej) as the primary recipient conveying the collective discharge directly to the Indus.',
    difficulty: 'Challenging',
    associatedCoordinates: [
      { placeName: 'Harike Barrage Confluence', state: 'Punjab', lat: 31.148, lon: 74.981, topicId: 'ramsar_sites', note: 'Confluence of Beas and Sutlej rivers' },
      { placeName: 'Mithankot Confluence', state: 'Indus Valley', lat: 28.916, lon: 70.366, note: 'Panjnad discharge meets Indus' }
    ]
  },
  {
    id: 'pyq-2021-02',
    year: 2021,
    exam: 'Civil Services Prelims',
    theme: 'PROTECTED_AREAS',
    themeLabel: 'Biospheres & National Parks',
    questionText: 'Which one of the following is used in describing the area comprising Wayanad Wildlife Sanctuary, Mudumalai Tiger Reserve, Bandipur National Park, and Nagarhole National Park?',
    statements: [],
    options: [
      { key: 'A', text: 'Agasthyamala Biosphere Reserve' },
      { key: 'B', text: 'Nilgiri Biosphere Reserve' },
      { key: 'C', text: 'Seshachalam Biosphere Reserve' },
      { key: 'D', text: 'Pachmarhi Biosphere Reserve' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Nilgiri Biosphere Reserve was established in 1986 as India\'s first biosphere reserve under MAB.',
    eliminationTechnique: 'Wayanad (Kerala), Mudumalai (Tamil Nadu), Bandipur and Nagarhole (Karnataka) meet at the tri-junction of Western and Eastern Ghats in the Nilgiris.',
    detailedExplanation: 'The Nilgiri Biosphere Reserve spans 5,520 sq km across Karnataka, Kerala, and Tamil Nadu. It encompasses Nagarhole NP, Bandipur NP, Wayanad WLS, Mudumalai TR, Mukurthi NP, and Silent Valley NP. It holds the largest Asian Elephant population in Asia and is home to the endemic Nilgiri Tahr and Lion-tailed Macaque.',
    prelimsTrapAlert: 'Agasthyamala is located much further south (Shendurney, Peppara, Neyyar, KMTR) at the southern tip of the Western Ghats.',
    difficulty: 'Direct Recall',
    associatedCoordinates: [
      { placeName: 'Bandipur National Park', state: 'Karnataka', lat: 11.666, lon: 76.629, topicId: 'national_parks', note: 'Nilgiri Biosphere core' },
      { placeName: 'Wayanad Wildlife Sanctuary', state: 'Kerala', lat: 11.685, lon: 76.368, note: 'Elephant corridor connecting Bandipur and Mudumalai' },
      { placeName: 'Silent Valley National Park', state: 'Kerala', lat: 11.135, lon: 76.452, topicId: 'national_parks', note: 'Kunthi River pristine rainforest' }
    ]
  },
  {
    id: 'pyq-2020-01',
    year: 2020,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Himalayan Rivers & Wetlands',
    questionText: 'Consider the following pairs of lakes and river systems:',
    statements: [
      '1. Renuka Wetland : Giri River',
      '2. Rudrasagar Lake : Gumti River',
      '3. Sasthamkotta Lake : Kallada River'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '1 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Sasthamkotta Lake is fed by groundwater aquifers and rain; it is in the drainage basin of Kallada River, but has no surface inlets/outlets.',
    eliminationTechnique: 'Sasthamkotta is the largest freshwater lake in Kerala, located in Kollam district. It is an aquifer-fed spring lake with no direct river feeding into it.',
    detailedExplanation: 'Renuka Wetland in Sirmaur (Himachal Pradesh) is fed by the Giri River, a tributary of the Yamuna. Rudrasagar Lake in Sepahijala (Tripura) receives runoff from three perennial streams discharging into the Gumti River system. Sasthamkotta is classified as an aquifer-recharged freshwater basin without surface river inlets.',
    prelimsTrapAlert: 'UPSC tests the hydrological nature of Ramsar sites: oxbow lakes (Kabartal), tectonic basins (Wular), aquifer springs (Sasthamkotta), and river lagoons (Chilika).',
    difficulty: 'Challenging',
    associatedCoordinates: [
      { placeName: 'Renuka Wetland', state: 'Himachal Pradesh', lat: 30.605, lon: 77.452, topicId: 'ramsar_sites', note: 'Giri River valley, smallest Ramsar site in India' },
      { placeName: 'Rudrasagar Lake', state: 'Tripura', lat: 23.498, lon: 91.312, topicId: 'ramsar_sites', note: 'Neermahal Palace lake in Gumti drainage' },
      { placeName: 'Sasthamkotta Lake', state: 'Kerala', lat: 9.034, lon: 76.628, topicId: 'ramsar_sites', note: 'Queen of Lakes, freshwater aquifer' }
    ]
  },
  {
    id: 'pyq-2020-02',
    year: 2020,
    exam: 'Civil Services Prelims',
    theme: 'MOUNTAINS_PASSES',
    themeLabel: 'Glaciers & Mountain Ranges',
    questionText: 'Consider the following pairs of Glaciers and Rivers originating from them:',
    statements: [
      '1. Bandarpunch : Yamuna',
      '2. Bara Shigri : Chenab',
      '3. Milam : Mandakini',
      '4. Siachen : Nubra',
      '5. Zemu : Manas'
    ],
    options: [
      { key: 'A', text: '1, 2 and 4 only' },
      { key: 'B', text: '1, 3 and 4 only' },
      { key: 'C', text: '2 and 5 only' },
      { key: 'D', text: '3 and 5 only' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Milam glacier gives rise to Goriganga (not Mandakini, which originates from Chorabari). Zemu glacier gives rise to Teesta (not Manas).',
    eliminationTechnique: 'Zemu Glacier is in Sikkim on the eastern slopes of Kangchenjunga. It is the source of the Teesta River, while Manas flows from Bhutan. Eliminating 5 removes options C and D.',
    detailedExplanation: 'Bandarpunch glacier in the Garhwal Himalayas gives birth to Yamuna and Tons. Bara Shigri in Lahaul-Spiti feeds the Chandra River (which meets Bhaga at Tandi to form the Chenab). Siachen Glacier in the Karakoram range feeds the Nubra River (a tributary of the Shyok). Milam glacier in Pithoragarh feeds Goriganga. Zemu glacier in Sikkim feeds the Teesta River.',
    prelimsTrapAlert: 'Chorabari Glacier = Mandakini (Kedarnath). Milam Glacier = Goriganga / Sharda. Gangotri Glacier = Bhagirathi. Zemu Glacier = Teesta. Memorize this glacier-river matrix.',
    difficulty: 'Challenging',
    associatedCoordinates: [
      { placeName: 'Siachen Glacier / Nubra Valley', state: 'Ladakh', lat: 35.421, lon: 77.109, note: 'Longest glacier in Karakoram feeding Nubra-Shyok-Indus' },
      { placeName: 'Zemu Glacier', state: 'Sikkim', lat: 27.702, lon: 88.245, note: 'Feeds Teesta River near Kangchenjunga' },
      { placeName: 'Bara Shigri Glacier', state: 'Himachal Pradesh', lat: 32.285, lon: 77.625, note: 'Lahaul valley, feeds Chandra-Chenab' }
    ]
  },
  {
    id: 'pyq-2019-01',
    year: 2019,
    exam: 'Civil Services Prelims',
    theme: 'PLACES_IN_NEWS',
    themeLabel: 'Strategic Chokepoints & Seas',
    questionText: 'Which of the following is not a border state / country of the Caspian Sea?',
    statements: [],
    options: [
      { key: 'A', text: 'Armenia' },
      { key: 'B', text: 'Azerbaijan' },
      { key: 'C', text: 'Kazakhstan' },
      { key: 'D', text: 'Turkmenistan' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Armenia is landlocked in the South Caucasus between Georgia, Azerbaijan, Turkey, and Iran, without Caspian coastline.',
    eliminationTechnique: 'Use the famous UPSC Mnemonic "TARIK": Turkmenistan, Azerbaijan, Russia, Iran, Kazakhstan. Armenia is not part of TARIK.',
    detailedExplanation: 'The Caspian Sea, the world\'s largest enclosed inland body of water, is bordered by five littoral states: Turkmenistan, Azerbaijan, Russia, Iran, and Kazakhstan (TARIK). Armenia is a landlocked Caucasian nation separated from the Caspian by Azerbaijan and Iran.',
    prelimsTrapAlert: 'UPSC frequently substitutes Armenia or Uzbekistan for Azerbaijan or Turkmenistan in Caspian and Aral Sea questions.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Baku (Caspian Sea Coast)', state: 'Azerbaijan', lat: 40.409, lon: 49.867, note: 'Major port city on Caspian Sea' },
      { placeName: 'Yerevan', state: 'Armenia', lat: 40.179, lon: 44.499, note: 'Landlocked South Caucasus capital' }
    ]
  },
  {
    id: 'pyq-2019-02',
    year: 2019,
    exam: 'Civil Services Prelims',
    theme: 'PROTECTED_AREAS',
    themeLabel: 'Biosphere Reserves & Hill Ranges',
    questionText: 'Consider the following statements regarding the Agasthyamala Biosphere Reserve:',
    statements: [
      '1. It is located at the southernmost end of the Western Ghats straddling Kerala and Tamil Nadu.',
      '2. It encompasses the Neyyar, Peppara, and Shendurney Wildlife Sanctuaries as well as Kalakkad Mundanthurai Tiger Reserve.',
      '3. It is the traditional homeland of the indigenous Kani tribe.'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '1 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'D',
    officialKeyNote: 'All three statements are correct regarding the Agasthyamala Biosphere Reserve.',
    eliminationTechnique: 'Agasthyamala was inscribed in UNESCO MAB list in 2016. Its association with the Kani tribe (famous for the medicinal plant Arogyapacha / Jeevani) and KMTR is widely documented.',
    detailedExplanation: 'Agasthyamala Biosphere Reserve occupies the southern tip of the Western Ghats (Agasthya Malai peak 1,868 m). It includes Neyyar, Peppara, and Shendurney Wildlife Sanctuaries in Kerala and Kalakkad Mundanthurai Tiger Reserve in Tamil Nadu. The nomadic Kani tribal community resides in these forests and holds traditional knowledge of the medicinal herb Trichopus zeylanicus (Arogyapacha).',
    prelimsTrapAlert: 'Do not confuse Agasthyamala (southernmost Western Ghats) with Nilgiri (middle junction) or Seshachalam (Eastern Ghats of Andhra Pradesh).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Agasthyamalai Peak', state: 'Kerala - Tamil Nadu Border', lat: 8.616, lon: 77.247, topicId: 'biosphere_reserves', note: 'Agasthyamala Biosphere core peak' },
      { placeName: 'Kalakkad Mundanthurai (KMTR)', state: 'Tamil Nadu', lat: 8.665, lon: 77.316, topicId: 'tiger_reserves', note: 'Tirunelveli district, Southern tiger habitat' }
    ]
  },
  {
    id: 'pyq-2018-01',
    year: 2018,
    exam: 'Civil Services Prelims',
    theme: 'PHYSICAL_GEOLOGY',
    themeLabel: 'Physical Geography & Geomorphology',
    questionText: 'Which of the following has / have shrunk immensely / dried up in recent past due to human activities?',
    statements: [
      '1. Aral Sea',
      '2. Black Sea',
      '3. Lake Baikal'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3' },
      { key: 'C', text: '2 only' },
      { key: 'D', text: '1 and 3' }
    ],
    correctOption: 'A',
    officialKeyNote: 'The Aral Sea has famously lost over 90% of its volume due to Soviet diversion of Amu Darya and Syr Darya.',
    eliminationTechnique: 'The Black Sea has not dried up (it connects to the Mediterranean via the Bosphorus Strait). Lake Baikal is the world\'s deepest lake with immense volume. Only the Aral Sea suffered catastrophic shrinkage.',
    detailedExplanation: 'The Aral Sea, located between Kazakhstan and Uzbekistan, was once the fourth-largest lake in the world. Beginning in the 1960s, Soviet irrigation projects diverted the Amu Darya and Syr Darya rivers to irrigate cotton plantations in the desert, causing the Aral Sea to shrink into the Aralkum Desert.',
    prelimsTrapAlert: 'UPSC frequently questions water body desiccation: Aral Sea (Central Asia), Lake Chad (Sahel, Africa), Lake Urmia (Iran), and Dead Sea (Jordan Rift).',
    difficulty: 'Direct Recall',
    associatedCoordinates: [
      { placeName: 'Aral Sea (Former Basin)', state: 'Central Asia (Kazakhstan/Uzbekistan)', lat: 45.001, lon: 60.001, note: 'Amu Darya & Syr Darya diversions caused drying' }
    ]
  },
  {
    id: 'pyq-2017-01',
    year: 2017,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Teesta River Basin',
    questionText: 'With reference to the river Teesta, consider the following statements:',
    statements: [
      '1. The source of river Teesta is the same as that of Brahmaputra but it flows through Sikkim.',
      '2. River Rangeet originates in Sikkim and it is a tributary of river Teesta.',
      '3. River Teesta flows into the Bay of Bengal on the border of India and Bangladesh.'
    ],
    options: [
      { key: 'A', text: '1 and 3 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: '2 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Statement 1 is false (Brahmaputra originates near Mansarovar; Teesta from Tso Lhamo/Zemu in Sikkim). Statement 3 is false (Teesta joins Jamuna/Brahmaputra in Bangladesh, does NOT flow independently into Bay of Bengal).',
    eliminationTechnique: 'Teesta merges with the Brahmaputra (Jamuna) in northern Bangladesh at Teesta Barrage. It does not touch the Bay of Bengal directly. This eliminates statements 1 and 3 instantly.',
    detailedExplanation: 'The Teesta River originates from Tso Lhamo Lake (Cholamu) and Zemu Glacier in North Sikkim. Its largest tributary is the Rangeet River, which originates in West Sikkim and meets Teesta at Tribeni near Kalimpong. After traversing Sikkim and northern West Bengal (Jalpaiguri, Siliguri), Teesta enters Rangpur division in Bangladesh and joins the Jamuna (Brahmaputra) River.',
    prelimsTrapAlert: 'Remember river hierarchy: Teesta is a tributary of Jamuna (Brahmaputra); Barak is a tributary of Meghna; Yamuna is a tributary of Ganga.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Tso Lhamo Lake (Teesta Source)', state: 'Sikkim', lat: 27.994, lon: 88.751, note: 'Highest lake in India, source of Teesta' },
      { placeName: 'Rangeet-Teesta Confluence (Tribeni)', state: 'West Bengal', lat: 27.102, lon: 88.502, note: 'White water rafting hub in Darjeeling foothills' }
    ]
  },
  {
    id: 'pyq-2016-01',
    year: 2016,
    exam: 'Civil Services Prelims',
    theme: 'PROTECTED_AREAS',
    themeLabel: 'UNESCO World Heritage & Biospheres',
    questionText: 'Which of the following National Parks is unique in being a swamp with floating decomposed vegetation that supports a rich biodiversity and the endangered Sangai deer?',
    statements: [],
    options: [
      { key: 'A', text: 'Bhitarkanika National Park' },
      { key: 'B', text: 'Keibul Lamjao National Park' },
      { key: 'C', text: 'Keoladeo Ghana National Park' },
      { key: 'D', text: 'Sultanpur National Park' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Keibul Lamjao on Loktak Lake is the world\'s only floating national park, home to Eld\'s deer / Sangai.',
    eliminationTechnique: 'Floating decomposed vegetation = "Phumdis". This is the hallmark feature of Loktak Lake and Keibul Lamjao NP in Manipur.',
    detailedExplanation: 'Keibul Lamjao National Park in Bishnupur district, Manipur, is an integral part of Loktak Lake. It is celebrated as the world\'s only floating sanctuary, characterized by floating masses of organic matter, soil, and vegetation called "Phumdis". It is the last refuge of the critically endangered brow-antlered deer (Rucervus eldii eldii), locally known as the "Dancing Deer" or Sangai.',
    prelimsTrapAlert: 'Bhitarkanika (Odisha) = Saltwater crocodiles and mangroves. Keoladeo Ghana (Rajasthan) = Migratory birds and Siberian cranes. Keibul Lamjao (Manipur) = Floating phumdis and Sangai.',
    difficulty: 'Direct Recall',
    associatedCoordinates: [
      { placeName: 'Keibul Lamjao National Park', state: 'Manipur', lat: 24.502, lon: 93.856, topicId: 'national_parks', note: 'Loktak Lake floating phumdis & Sangai deer' },
      { placeName: 'Bhitarkanika Mangroves', state: 'Odisha', lat: 20.716, lon: 86.867, topicId: 'ramsar_sites', note: 'Brahmani-Baitarani delta estuarine crocodile habitat' }
    ]
  },
  {
    id: 'pyq-2015-01',
    year: 2015,
    exam: 'Civil Services Prelims',
    theme: 'MINERALS_ENERGY',
    themeLabel: 'Iron Ore, Bauxite & Mineral Clusters',
    questionText: 'Which one of the following pairs of mineral belts and states is not correctly matched?',
    statements: [],
    options: [
      { key: 'A', text: 'Bailadila : Chhattisgarh' },
      { key: 'B', text: 'Kudremukh : Karnataka' },
      { key: 'C', text: 'Koderma : Jharkhand' },
      { key: 'D', text: 'Khetri : Madhya Pradesh' }
    ],
    correctOption: 'D',
    officialKeyNote: 'Khetri Copper Belt is in Jhunjhunu district of Rajasthan, not Madhya Pradesh.',
    eliminationTechnique: 'Khetri (along with Singhbhum in Jharkhand and Malanjkhand in Balaghat, MP) is a premier copper mining complex, situated in Rajasthan (Aravalli range).',
    detailedExplanation: 'Bailadila in Dantewada (Chhattisgarh) possesses world-class high-grade hematite iron ore exported through Visakhapatnam. Kudremukh in Chikkamagaluru (Karnataka) contains magnetite iron ore deposits. Koderma (Jharkhand) is the famous mica capital of India. Khetri is located in the Jhunjhunu district of Rajasthan and hosts Hindustan Copper Limited (HCL).',
    prelimsTrapAlert: 'Copper centres: Khetri (Rajasthan), Malanjkhand (Madhya Pradesh), Ghatsila/Rakha (Jharkhand). Know their exact states.',
    difficulty: 'Direct Recall',
    associatedCoordinates: [
      { placeName: 'Khetri Copper Belt', state: 'Rajasthan', lat: 27.986, lon: 75.789, topicId: 'copper_mines', note: 'Aravalli Range copper mining complex' },
      { placeName: 'Bailadila Iron Ore Mines', state: 'Chhattisgarh', lat: 18.665, lon: 81.248, topicId: 'iron_ore', note: 'Dantewada super-high grade hematite' },
      { placeName: 'Kudremukh', state: 'Karnataka', lat: 13.216, lon: 75.251, topicId: 'iron_ore', note: 'Western Ghats magnetite ridge' }
    ]
  },
  {
    id: 'pyq-2014-01',
    year: 2014,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'River Confluences & Panch Prayag',
    questionText: 'Consider the following pairs of river confluences in the Alaknanda Basin (Panch Prayag):',
    statements: [
      '1. Vishnuprayag : Confluence of Alaknanda and Dhauliganga',
      '2. Nandaprayag : Confluence of Alaknanda and Mandakini',
      '3. Karnaprayag : Confluence of Alaknanda and Pindar River',
      '4. Rudraprayag : Confluence of Alaknanda and Nandakini'
    ],
    options: [
      { key: 'A', text: '1 and 3 only' },
      { key: 'B', text: '2 and 4 only' },
      { key: 'C', text: '1, 2 and 3 only' },
      { key: 'D', text: '1, 2, 3 and 4' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Nandaprayag is Alaknanda + Nandakini. Rudraprayag is Alaknanda + Mandakini.',
    eliminationTechnique: 'Remember the mnemonic for Panch Prayag downstream: Vishnu (Dhauli) → Nanda (Nandakini) → Karna (Pindar) → Rudra (Mandakini) → Deva (Bhagirathi). Pairs 2 and 4 swap Mandakini and Nandakini.',
    detailedExplanation: 'The Panch Prayag in Uttarakhand represents the holy confluences along the Alaknanda River: 1) Vishnuprayag (Alaknanda + Dhauliganga), 2) Nandaprayag (Alaknanda + Nandakini), 3) Karnaprayag (Alaknanda + Pindar), 4) Rudraprayag (Alaknanda + Mandakini), and 5) Devprayag (Alaknanda + Bhagirathi, officially originating the Ganga River).',
    prelimsTrapAlert: 'UPSC frequently swaps Mandakini (from Kedarnath) with Nandakini (from Nanda Devi).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Devprayag Confluence', state: 'Uttarakhand', lat: 30.145, lon: 78.599, note: 'Alaknanda meets Bhagirathi to form the Ganga' },
      { placeName: 'Rudraprayag Confluence', state: 'Uttarakhand', lat: 30.286, lon: 78.981, note: 'Alaknanda meets Mandakini' },
      { placeName: 'Karnaprayag Confluence', state: 'Uttarakhand', lat: 30.258, lon: 79.219, note: 'Alaknanda meets Pindar' },
      { placeName: 'Vishnuprayag Confluence', state: 'Uttarakhand', lat: 30.563, lon: 79.576, note: 'Alaknanda meets Dhauliganga' }
    ]
  },
  {
    id: 'pyq-2013-01',
    year: 2013,
    exam: 'Civil Services Prelims',
    theme: 'PROTECTED_AREAS',
    themeLabel: 'National Parks & Altitudinal Belts',
    questionText: 'Which one of the following National Parks has a climate that varies from tropical to subtropical, temperate and arctic?',
    statements: [],
    options: [
      { key: 'A', text: 'Khangchendzonga National Park' },
      { key: 'B', text: 'Nanda Devi National Park' },
      { key: 'C', text: 'Neora Valley National Park' },
      { key: 'D', text: 'Namdapha National Park' }
    ],
    correctOption: 'D',
    officialKeyNote: 'Namdapha in Changlang, Arunachal Pradesh spans 200 m to 4,571 m, displaying complete vertical zonation.',
    eliminationTechnique: 'Tropical climate requires low base altitude in humid northeastern valleys. Nanda Devi and Khangchendzonga start at much higher elevations and lack true tropical rainforests at their base.',
    detailedExplanation: 'Namdapha National Park in Changlang district of Arunachal Pradesh extends across an extraordinary elevation gradient from 200 metres in the Noa-Dihing river valley up to 4,571 metres at Daphabum peak. Consequently, its bio-climate encompasses lowland tropical evergreen rainforests, subtropical broadleaf forests, temperate coniferous forests, and alpine/arctic permafrost zones. It is the only park in the world harboring four pantherine species: Tiger, Leopard, Snow Leopard, and Clouded Leopard.',
    prelimsTrapAlert: 'Namdapha = Tropical to Arctic altitudinal sequence. Nanda Devi = Temperate to Alpine/Glacial (no tropical belt).',
    difficulty: 'Challenging',
    associatedCoordinates: [
      { placeName: 'Namdapha National Park', state: 'Arunachal Pradesh', lat: 27.498, lon: 96.386, topicId: 'national_parks', note: 'Changlang, four feline cats & tropical-to-arctic zonation' },
      { placeName: 'Nanda Devi National Park', state: 'Uttarakhand', lat: 30.428, lon: 79.967, topicId: 'biosphere_reserves', note: 'Rishi Ganga catchment alpine sanctuary' }
    ]
  },
  {
    id: 'pyq-2012-01',
    year: 2012,
    exam: 'Civil Services Prelims',
    theme: 'PHYSICAL_GEOLOGY',
    themeLabel: 'Rift Valleys & West-Flowing Rivers',
    questionText: 'The Narmada river flows to the west, while most other large peninsular rivers flow to the east. Why?',
    statements: [
      '1. It occupies a linear rift valley.',
      '2. It flows between the Vindhyas and the Satpuras.',
      '3. The land slopes to the west from Central India.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3' },
      { key: 'C', text: '1 and 2' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Statement 1 is the primary geomorphological explanation for west flow. Statement 3 is false because the Peninsular block general slope is southeast.',
    eliminationTechnique: 'Statement 3 is factually incorrect because the Deccan plateau tilts gently eastward towards the Bay of Bengal, which is why Godavari, Krishna, and Cauvery flow east. Eliminate 3, which removes B and D.',
    detailedExplanation: 'The Peninsular plateau as a whole possesses a regional tilt towards the east and southeast. However, the Narmada and Tapi do not follow this regional slope because they flow along structural fault lines (linear rift valleys / grabens formed during the Himalayan orogeny and post-Gondwana rifting). Statement 2 is a true statement of fact, but according to official UPSC key, the primary causal reason why it flows west despite the regional tilt is that it occupies an entrenched rift valley.',
    prelimsTrapAlert: 'Carefully distinguish between an "associated geological fact" and the "direct physical cause" in UPSC reasoning questions.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Narmada Rift Valley (Marble Rocks)', state: 'Madhya Pradesh', lat: 23.129, lon: 79.801, note: 'Bhedaghat gorge cut into marble canyon rift' },
      { placeName: 'Amarkantak Plateau', state: 'Madhya Pradesh', lat: 22.674, lon: 81.761, note: 'Maikal Hills origin of Narmada, Son, and Johilla' }
    ]
  },
  {
    id: 'pyq-2011-01',
    year: 2011,
    exam: 'Civil Services Prelims',
    theme: 'MOUNTAINS_PASSES',
    themeLabel: 'Himalayan Passes & Trans-Himalayan Routes',
    questionText: 'Between which of the following mountain ranges does the Indus River flow through in Ladakh?',
    statements: [],
    options: [
      { key: 'A', text: 'Pir Panjal and Great Himalaya' },
      { key: 'B', text: 'Zanskar and Ladakh Ranges' },
      { key: 'C', text: 'Ladakh and Karakoram Ranges' },
      { key: 'D', text: 'Dhauladhar and Zanskar Ranges' }
    ],
    correctOption: 'B',
    officialKeyNote: 'The Indus river flows northwest between the Zanskar range to the southwest and the Ladakh range to the northeast.',
    eliminationTechnique: 'Karakoram is north of the Ladakh range (the Shyok river flows between Ladakh and Karakoram). Pir Panjal is in Jammu & Kashmir / Himachal. Therefore, the Indus main valley lies between Zanskar and Ladakh.',
    detailedExplanation: 'Entering India near Demchok in southeastern Ladakh, the Indus River flows in a northwesterly direction along a structural synclinal trench sandwiched between the Zanskar Range to the south and the Ladakh Range to the north. At Leh, it receives the Zanskar River at Nimmu. Later, near Kargil and the Baltistan border, it cuts deep gorges through the Ladakh range before entering Pakistan.',
    prelimsTrapAlert: 'Memorize the north-to-south sequence of Trans-Himalayan ranges: Karakoram → Ladakh → Zanskar → Great Himalaya → Pir Panjal → Shivalik.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Nimmu Confluence (Indus & Zanskar)', state: 'Ladakh', lat: 34.195, lon: 77.342, note: 'Confluence between Zanskar and Ladakh ranges' },
      { placeName: 'Khardung La Pass', state: 'Ladakh', lat: 34.279, lon: 77.604, topicId: 'mountain_passes', note: 'Traverses the Ladakh Range into Shyok/Nubra' },
      { placeName: 'Fotu La Pass', state: 'Ladakh', lat: 34.288, lon: 76.719, topicId: 'mountain_passes', note: 'Highest point on Srinagar-Leh highway across Zanskar' }
    ]
  },
  {
    id: 'pyq-2023-01',
    year: 2023,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Tectonic Lakes & River Drainage',
    questionText: 'Consider the following statements:',
    statements: [
      '1. Jhelum River passes through Wular Lake.',
      '2. Krishna River directly feeds Kolleru Lake.',
      '3. Meandering of Gandak River formed Kanwar Lake.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '1 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'C',
    officialKeyNote: 'Statement 2 is incorrect because Kolleru Lake lies between the deltas of Godavari and Krishna and is fed by Tammileru and Budameru seasonal streams, not directly by Krishna main trunk.',
    eliminationTechnique: 'Kolleru is an inter-deltaic natural depression fed by seasonal rivulets (Budameru & Tammileru). The main Krishna flows south of Kolleru before debouching at Hamsaladeevi. Eliminate 2 immediately.',
    detailedExplanation: 'Wular Lake in Bandipora district of Jammu & Kashmir is one of the largest freshwater lakes in Asia, formed by tectonic activity and fed directly by the Jhelum River, which flows into it and exits near Baramulla. Kanwar Lake (Kabartal) in Begusarai, Bihar is Asia\'s largest freshwater oxbow lake, formed by the meandering channel of the Burhi Gandak river.',
    prelimsTrapAlert: 'UPSC tests whether aspirants know which seasonal streams feed deltaic lakes like Kolleru, Pulicat, and Chilika versus main trunk rivers.',
    difficulty: 'Challenging Prelims',
    associatedCoordinates: [
      { placeName: 'Wular Lake', state: 'Jammu & Kashmir', lat: 34.333, lon: 74.558, topicId: 'ramsar_sites', note: 'Largest freshwater lake on Jhelum River' },
      { placeName: 'Kanwar Lake (Kabartal)', state: 'Bihar', lat: 25.629, lon: 86.145, topicId: 'ramsar_sites', note: 'Largest freshwater oxbow lake formed by Burhi Gandak' },
      { placeName: 'Kolleru Lake', state: 'Andhra Pradesh', lat: 16.652, lon: 81.334, topicId: 'ramsar_sites', note: 'Inter-deltaic lake between Godavari and Krishna' }
    ]
  },
  {
    id: 'pyq-2023-02',
    year: 2023,
    exam: 'Civil Services Prelims',
    theme: 'MINERALS_ENERGY',
    themeLabel: 'Strategic Metals & Green Energy',
    questionText: 'With reference to the Indian economy, what are "Vanadium" and "Lithium" primarily celebrated for in recent geological discoveries?',
    statements: [
      '1. Significant reserves of Lithium were inferred in Salal-Haimana area of Reasi district in Jammu & Kashmir.',
      '2. Vanadium occurs in titaniferous magnetite ores in the Papum Pare and Depo areas of Arunachal Pradesh.',
      '3. Both metals are designated as Critical Minerals essential for EV batteries and defense manufacturing.'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '1, 2 and 3' },
      { key: 'D', text: '1 and 3 only' }
    ],
    correctOption: 'C',
    officialKeyNote: 'All statements are correct based on Geological Survey of India (GSI) exploration reports and the Ministry of Mines Critical Mineral list.',
    eliminationTechnique: 'Recognize the 2023 headline discoveries: GSI established 5.9 million tonnes of inferred lithium resources in Reasi (J&K) in bauxite-bearing limestone formations, and vanadium-bearing titaniferous magnetite in Arunachal Pradesh.',
    detailedExplanation: 'In February 2023, GSI established 5.9 million tonnes of inferred lithium resources (G4 stage) in Salal-Haimana, Reasi, Jammu & Kashmir. Vanadium was identified in the Palaeoproterozoic carbonaceous phyllite and titaniferous magnetite rocks of Depo and Tamun in Arunachal Pradesh. Both are classified among India\'s 30 Critical Minerals.',
    prelimsTrapAlert: 'Do not confuse hard-rock lithium deposits (spodumene/pegmatite in Mandya, Karnataka) with brine/bauxite-associated clay deposits in Reasi, J&K.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Salal Haimana Lithium Deposit', state: 'Jammu & Kashmir', lat: 33.142, lon: 74.821, note: '5.9 MT inferred Lithium resources discovered by GSI in Reasi' },
      { placeName: 'Depo Vanadium Prospect', state: 'Arunachal Pradesh', lat: 27.852, lon: 94.215, note: 'Titaniferous magnetite and phyllite vanadium prospect' }
    ]
  },
  {
    id: 'pyq-2022-01',
    year: 2022,
    exam: 'Civil Services Prelims',
    theme: 'PHYSICAL_GEOLOGY',
    themeLabel: 'Gorges, Canyons & Geomorphology',
    questionText: 'The Gandikota canyon of South India was created by which of the following rivers?',
    statements: [],
    options: [
      { key: 'A', text: 'Cauvery' },
      { key: 'B', text: 'Manjira' },
      { key: 'C', text: 'Pennar' },
      { key: 'D', text: 'Tungabhadra' }
    ],
    correctOption: 'C',
    officialKeyNote: 'Gandikota Canyon, known as the Grand Canyon of India, was formed by the Pennar River cutting through the Erramala hills.',
    eliminationTechnique: 'Gandikota is located in Kadapa district of Andhra Pradesh. The Cauvery flows far south through Karnataka and Tamil Nadu; Manjira is in Maharashtra, Karnataka, Telangana; Tungabhadra is in Bellary/Kurnool. Pennar flows through Kadapa.',
    detailedExplanation: 'Gandikota is a gorge formed by the river Pennar cutting through the Gandikota range of hills (part of Erramala) in YSR Kadapa district, Andhra Pradesh. The massive red sandstone cliffs resemble the Grand Canyon of Arizona. The 13th-century Gandikota Fort sits perched atop the gorge.',
    prelimsTrapAlert: 'Aspirants often confuse Pennar river landmarks (Gandikota gorge) with Krishna river gorges (Srisailam gorge).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Gandikota Canyon', state: 'Andhra Pradesh', lat: 14.815, lon: 78.286, note: 'Grand Canyon of India carved by Pennar River through Erramala' },
      { placeName: 'Mylavaram Dam', state: 'Andhra Pradesh', lat: 14.852, lon: 78.336, note: 'Pennar river barrage near Gandikota' }
    ]
  },
  {
    id: 'pyq-2022-02',
    year: 2022,
    exam: 'Civil Services Prelims',
    theme: 'MOUNTAINS_PASSES',
    themeLabel: 'Himalayan Peaks & Synthesis',
    questionText: 'Consider the following pairs of Peaks and Mountain Ranges:',
    statements: [
      '1. Namcha Barwa — Garhwal Himalaya',
      '2. Nanda Devi — Kumaon Himalaya',
      '3. Nokrek — Garo Hills'
    ],
    options: [
      { key: 'A', text: '1 and 2' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: '1 and 3' },
      { key: 'D', text: '2 and 3' }
    ],
    correctOption: 'D',
    officialKeyNote: 'Namcha Barwa is located in the eastern syntaxis of the Himalayas in Tibet/Arunachal border, not Garhwal.',
    eliminationTechnique: 'Namcha Barwa is the eastern anchor of the Great Himalayas where the Brahmaputra makes its sharp U-turn hairpin bend. It has zero relation to Garhwal (Uttarakhand). Eliminate 1, which leaves only D.',
    detailedExplanation: 'Namcha Barwa (7,782 m) is the easternmost anchor of the Great Himalayas, located around the great bend of the Yarlung Tsangpo/Siang in southeastern Tibet near Arunachal Pradesh. Nanda Devi (7,816 m) is located in the Chamoli/Kumaon-Garhwal Himalaya in Uttarakhand. Nokrek (1,412 m) is the highest peak of the Garo Hills in Meghalaya, home to Nokrek Biosphere Reserve and citrus gene sanctuaries.',
    prelimsTrapAlert: 'UPSC frequently pairs Western Himalayan peaks (Nanda Devi, Kamet, Trishul) with Eastern ranges (Namcha Barwa, Kangto, Saramati).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Nanda Devi Peak & Biosphere', state: 'Uttarakhand', lat: 30.375, lon: 79.971, topicId: 'biosphere_reserves', note: 'Second highest peak in India entirely within territory' },
      { placeName: 'Nokrek Biosphere Reserve', state: 'Meghalaya', lat: 25.495, lon: 90.312, topicId: 'biosphere_reserves', note: 'Highest peak of Garo Hills & Citrus gene sanctuary' },
      { placeName: 'Namcha Barwa Syntaxis', state: 'Arunachal Pradesh', lat: 29.629, lon: 95.055, note: 'Eastern Himalayan hairpin bend of Brahmaputra/Siang' }
    ]
  },
  {
    id: 'pyq-2021-01',
    year: 2021,
    exam: 'Civil Services Prelims',
    theme: 'PHYSICAL_GEOLOGY',
    themeLabel: 'Inland Drainage & Saline Playas',
    questionText: 'With reference to the saline lakes of India, "Didwana, Kuchaman, Sargol and Khatu" are names of:',
    statements: [],
    options: [
      { key: 'A', text: 'Glaciers' },
      { key: 'B', text: 'Mangrove areas' },
      { key: 'C', text: 'Ramsar sites' },
      { key: 'D', text: 'Saline lakes / Playas' }
    ],
    correctOption: 'D',
    officialKeyNote: 'Didwana, Kuchaman, Sargol, and Khatu are saline lake basins (playas) located in Rajasthan.',
    eliminationTechnique: 'Didwana and Kuchaman are famous towns in Nagaur district of Rajasthan, known for salt production from inland depressions (playas). None of them are glaciers or mangroves.',
    detailedExplanation: 'In the arid and semi-arid terrain of Rajasthan, inland drainage basins with high evaporation give rise to salt-encrusted playas or saline lakes. Beyond Sambhar Lake (largest inland saline lake), Didwana, Kuchaman, Pachpadra, Sargol, and Phalodi are prominent inland salt-producing depressions that hold sodium chloride and sodium sulphate deposits.',
    prelimsTrapAlert: 'Notice that while Sambhar is a Ramsar site, Didwana and Kuchaman are not Ramsar sites. Hence option C is a trap.',
    difficulty: 'Moderate Prelims',
    associatedCoordinates: [
      { placeName: 'Sambhar Salt Lake', state: 'Rajasthan', lat: 26.915, lon: 75.012, topicId: 'ramsar_sites', note: 'Largest inland saline wetland in India' },
      { placeName: 'Didwana Salt Lake', state: 'Rajasthan', lat: 27.401, lon: 74.575, note: 'Major inland sodium sulphate playa basin in Nagaur' },
      { placeName: 'Pachpadra Salt Basin', state: 'Rajasthan', lat: 25.925, lon: 72.245, note: 'High purity sodium chloride salt lake and refinery hub' }
    ]
  },
  {
    id: 'pyq-2020-01',
    year: 2020,
    exam: 'Civil Services Prelims',
    theme: 'MOUNTAINS_PASSES',
    themeLabel: 'Glaciers & Strategic Passes',
    questionText: 'Siachen Glacier is situated to the:',
    statements: [],
    options: [
      { key: 'A', text: 'East of Aksai Chin' },
      { key: 'B', text: 'East of Leh' },
      { key: 'C', text: 'North of Gilgit' },
      { key: 'D', text: 'North of Nubra Valley' }
    ],
    correctOption: 'D',
    officialKeyNote: 'The Siachen Glacier lies in the eastern Karakoram range immediately north of the Nubra Valley.',
    eliminationTechnique: 'Aksai Chin is located east of Siachen (so Siachen is west of Aksai Chin, eliminating A). Leh is to the south (eliminating B). Gilgit is to the west (eliminating C). Nubra Valley is fed directly by meltwaters of Siachen (Nubra River), hence Siachen is North of Nubra Valley.',
    detailedExplanation: 'The Siachen Glacier is located in the eastern Karakoram range in Ladakh, just north-northeast of the point NJ9842 where the Line of Control between India and Pakistan ends. At 76 km length, it is the second-longest non-polar glacier in the world. The meltwater of Siachen feeds the Nubra River, which flows south into the Shyok River (a tributary of the Indus).',
    prelimsTrapAlert: 'Always orient yourself spatially: Nubra Valley is south of Siachen Glacier; the Saltoro Ridge is west of Siachen; Aksai Chin is east.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Siachen Glacier (Indira Col)', state: 'Ladakh', lat: 35.421, lon: 77.108, note: 'World highest active military battlefield & Nubra origin' },
      { placeName: 'Diskit (Nubra Valley)', state: 'Ladakh', lat: 34.542, lon: 77.562, note: 'Nubra Valley administrative center south of Siachen' },
      { placeName: 'Khardung La Pass', state: 'Ladakh', lat: 34.279, lon: 77.604, topicId: 'mountain_passes', note: 'Gateway pass connecting Leh to Nubra and Siachen' }
    ]
  },
  {
    id: 'pyq-2020-02',
    year: 2020,
    exam: 'Civil Services Prelims',
    theme: 'ISLANDS_COASTAL',
    themeLabel: 'Volcanism & Indian Ocean Geography',
    questionText: 'Consider the following statements regarding Barren Island:',
    statements: [
      '1. Barren Island volcano is an active volcano located in the Indian territory.',
      '2. Barren Island lies about 140 km east of Great Nicobar.',
      '3. The last time the Barren Island volcano erupted was in 1991 and it has remained inactive since then.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3' },
      { key: 'C', text: '3 only' },
      { key: 'D', text: '1 and 3' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Statement 1 is correct. Statement 2 is incorrect (it lies east of Port Blair in the Andaman Sea, not Great Nicobar). Statement 3 is incorrect (it has erupted repeatedly, including in 2017 and 2018).',
    eliminationTechnique: 'Barren Island is famous for recent continuous eruptions (2017-2020), so statement 3 claiming it remained inactive since 1991 is completely false. Eliminate B, C, D.',
    detailedExplanation: 'Barren Island is an island located in the Andaman Sea, approximately 135 km northeast of Port Blair. It is the only confirmed active volcano in South Asia and along the volcanic arc extending from Sumatra to Myanmar. Narcondam Island, located further north, is a dormant volcanic island.',
    prelimsTrapAlert: 'Distinguish Barren Island (active volcano) from Narcondam Island (dormant volcano) and Lakshadweep (coral atolls).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Barren Island Volcano', state: 'Andaman & Nicobar Islands', lat: 12.278, lon: 93.858, note: 'Only confirmed active volcano in South Asia' },
      { placeName: 'Narcondam Island', state: 'Andaman & Nicobar Islands', lat: 13.433, lon: 94.283, note: 'Dormant volcanic island famous for Narcondam hornbill' }
    ]
  },
  {
    id: 'pyq-2019-01',
    year: 2019,
    exam: 'Civil Services Prelims',
    theme: 'ECOLOGY_PROTECTED',
    themeLabel: 'Biosphere Reserves & Protected Corridors',
    questionText: 'Which one of the following groups of protected areas is included in the Agasthyamala Biosphere Reserve?',
    statements: [],
    options: [
      { key: 'A', text: 'Neyyar, Peppara and Shendurney Wildlife Sanctuaries; and Kalakad Mundanthurai Tiger Reserve' },
      { key: 'B', text: 'Mudumalai, Sathyamangalam and Wayanad Wildlife Sanctuaries; and Silent Valley National Park' },
      { key: 'C', text: 'Kaundinya, Gundla Brahmeswaram and Papikonda Wildlife Sanctuaries; and Nagarjunasagar-Srisailam Tiger Reserve' },
      { key: 'D', text: 'Kawal, Pranahita and Siwaram Wildlife Sanctuaries; and Pakhal Wildlife Sanctuary' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Agasthyamala Biosphere Reserve straddles Kerala and Tamil Nadu, comprising Neyyar, Peppara, Shendurney WLS in Kerala and KMTR in Tamil Nadu.',
    eliminationTechnique: 'Option B is the Nilgiri Biosphere Reserve (Silent Valley, Wayanad, Mudumalai). Option C is in the Eastern Ghats of Andhra Pradesh (Nagarjunasagar-Srisailam). Option D is in Telangana (Godavari belt). Agasthyamala is in southernmost Western Ghats.',
    detailedExplanation: 'Agasthyamala Biosphere Reserve was established in 2001 and included in UNESCO\'s World Network of Biosphere Reserves in 2016. Straddling the border of Kerala (Thiruvananthapuram, Kollam, Pathanamthitta) and Tamil Nadu (Tirunelveli, Kanyakumari), it encompasses the Shendurney, Peppara, and Neyyar Wildlife Sanctuaries, together with the Kalakad Mundanthurai Tiger Reserve.',
    prelimsTrapAlert: 'Do not confuse Nilgiri Biosphere Reserve (Wayanad, Bandipur, Nagarhole, Mudumalai, Silent Valley) with Agasthyamala Biosphere Reserve further south.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Agasthyamala Peak', state: 'Kerala', lat: 8.618, lon: 77.248, topicId: 'biosphere_reserves', note: 'Highest peak of southernmost Western Ghats & Kanikkar tribal habitat' },
      { placeName: 'Kalakad Mundanthurai Tiger Reserve', state: 'Tamil Nadu', lat: 8.683, lon: 77.316, topicId: 'tiger_reserves', note: 'Eastern slope watershed of Agasthyamala in Tamil Nadu' }
    ]
  },
  {
    id: 'pyq-2019-02',
    year: 2019,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Reservoirs, States & Inter-State Rivers',
    questionText: 'Consider the following pairs of Reservoirs and States:',
    statements: [
      '1. Ghataprabha — Telangana',
      '2. Gandhi Sagar — Madhya Pradesh',
      '3. Indira Sagar — Andhra Pradesh',
      '4. Maithon — Chhattisgarh'
    ],
    options: [
      { key: 'A', text: '1 and 2' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: '2 and 3' },
      { key: 'D', text: '3 and 4' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Gandhi Sagar is located in Madhya Pradesh on Chambal River. Ghataprabha is in Karnataka. Indira Sagar is in Madhya Pradesh on Narmada. Maithon is in Jharkhand on Barakar.',
    eliminationTechnique: 'Maithon Dam is a cornerstone of the Damodar Valley Corporation (DVC) located in Dhanbad, Jharkhand (not Chhattisgarh). Ghataprabha is in Belagavi, Karnataka (not Telangana). Indira Sagar is on Narmada in Khandwa, MP (not AP). Only Gandhi Sagar is correct.',
    detailedExplanation: 'Gandhi Sagar Dam is one of the four major dams on the Chambal River located in Mandsaur and Neemuch districts of Madhya Pradesh. Indira Sagar Dam is a multipurpose key project on the Narmada River in Khandwa, MP. Maithon Dam on the Barakar River (Damodar tributary) is in Jharkhand. Ghataprabha Dam (Hidkal) is in Belagavi, Karnataka.',
    prelimsTrapAlert: 'Always verify which river a dam sits on: Gandhi Sagar (Chambal), Rana Pratap Sagar (Chambal), Indira Sagar (Narmada), Maithon (Barakar).',
    difficulty: 'Moderate Prelims',
    associatedCoordinates: [
      { placeName: 'Gandhi Sagar Dam', state: 'Madhya Pradesh', lat: 24.706, lon: 75.556, topicId: 'major_dams', note: 'Largest storage reservoir on Chambal River in Mandsaur' },
      { placeName: 'Maithon Dam (DVC)', state: 'Jharkhand', lat: 23.784, lon: 86.815, topicId: 'major_dams', note: 'DVC underground powerhouse dam on Barakar River' },
      { placeName: 'Indira Sagar Dam', state: 'Madhya Pradesh', lat: 22.285, lon: 76.471, topicId: 'major_dams', note: 'Largest reservoir capacity in India on Narmada River' }
    ]
  },
  {
    id: 'pyq-2018-01',
    year: 2018,
    exam: 'Civil Services Prelims',
    theme: 'ECOLOGY_PROTECTED',
    themeLabel: 'Tiger Reserves of Northeast India',
    questionText: 'In which one of the following States is Pakhui (Pakke) Wildlife Sanctuary / Tiger Reserve located?',
    statements: [],
    options: [
      { key: 'A', text: 'Arunachal Pradesh' },
      { key: 'B', text: 'Manipur' },
      { key: 'C', text: 'Meghalaya' },
      { key: 'D', text: 'Nagaland' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Pakhui (Pakke) Tiger Reserve is in the East Kameng district of Arunachal Pradesh.',
    eliminationTechnique: 'Pakke is famous for its Hornbill Nest Adoption Program and is located in the Himalayan foothills of East Kameng, Arunachal Pradesh.',
    detailedExplanation: 'Pakke Tiger Reserve (formerly Pakhui Tiger Reserve) lies in the foothills of the Eastern Himalayas in East Kameng district of Arunachal Pradesh. It is bounded by the Bhareli (Kameng) River in the west and north, and the Pakke River in the east. It is globally recognized for community-driven conservation of four species of hornbills with the Nyishi indigenous community.',
    prelimsTrapAlert: 'Do not confuse Pakke (Arunachal Pradesh) with Pakhal (Telangana) or Phawngpui (Mizoram).',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Pakke Tiger Reserve', state: 'Arunachal Pradesh', lat: 27.102, lon: 92.955, topicId: 'tiger_reserves', note: 'Nyishi community hornbill conservation hub in East Kameng' },
      { placeName: 'Namdapha National Park', state: 'Arunachal Pradesh', lat: 27.498, lon: 96.388, topicId: 'national_parks', note: 'Only park harboring four feline big cats: tiger, leopard, snow leopard, clouded leopard' }
    ]
  },
  {
    id: 'pyq-2017-01',
    year: 2017,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_DRAINAGE',
    themeLabel: 'Teesta River & Eastern Drainage',
    questionText: 'With reference to the river Teesta, consider the following statements:',
    statements: [
      '1. The source of river Teesta is the same as that of Brahmaputra but it flows through Sikkim.',
      '2. River Rangeet originates in Sikkim and it is a tributary of river Teesta.',
      '3. River Teesta flows into the Bay of Bengal on the border of India and Bangladesh.'
    ],
    options: [
      { key: 'A', text: '1 and 3 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: '2 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Statement 1 is false (Brahmaputra originates at Angsi glacier in Tibet; Teesta originates at Tso Lhamo/Pahunri glacier in Sikkim). Statement 3 is false (Teesta joins the Jamuna/Brahmaputra in Bangladesh, not directly into the Bay of Bengal). Only 2 is correct.',
    eliminationTechnique: 'Teesta does NOT flow directly into the Bay of Bengal; it merges with the Jamuna (Brahmaputra) at Teestamukh in northern Bangladesh. Eliminate 3. The source of Brahmaputra is Angsi Glacier near Mansarovar in western Tibet, while Teesta originates in North Sikkim. Eliminate 1.',
    detailedExplanation: 'The Teesta River originates from the Tso Lhamo lake and Pahunri glacier in North Sikkim. Flowing south through the Darjeeling and Kalimpong districts of West Bengal, it is joined by its largest tributary, the Rangeet River, near Teesta Bazaar. In Bangladesh, Teesta joins the Jamuna (Brahmaputra) River in Gaibandha district.',
    prelimsTrapAlert: 'UPSC frequently checks whether a river flows independently into the sea or merges into a larger trunk river system.',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Tso Lhamo Lake (Teesta Origin)', state: 'Sikkim', lat: 28.026, lon: 88.752, note: 'Highest lake in India (5,330 m) source of Teesta' },
      { placeName: 'Rangeet Confluence (Teesta Bazaar)', state: 'West Bengal', lat: 27.098, lon: 88.432, note: 'Turbulent confluence of Rangeet and Teesta' }
    ]
  },
  {
    id: 'pyq-2015-01',
    year: 2015,
    exam: 'Civil Services Prelims',
    theme: 'ISLANDS_COASTAL',
    themeLabel: 'Maritime Straits & Indian Ocean Geopolitics',
    questionText: 'Which one of the following pairs of islands is separated from each other by the "Ten Degree Channel"?',
    statements: [],
    options: [
      { key: 'A', text: 'Andaman and Nicobar' },
      { key: 'B', text: 'Nicobar and Sumatra' },
      { key: 'C', text: 'Maldives and Lakshadweep' },
      { key: 'D', text: 'Sumatra and Java' }
    ],
    correctOption: 'A',
    officialKeyNote: 'The 10° North latitude parallel passes through the Ten Degree Channel, separating Little Andaman from Car Nicobar.',
    eliminationTechnique: 'Remember the channel mnemonic: 8 Degree Channel separates Minicoy (India) from Maldives. 9 Degree Channel separates Minicoy from Lakshadweep main islands (Kalpeni/Suheli). 10 Degree Channel separates Andaman group from Nicobar group.',
    detailedExplanation: 'The Ten Degree Channel is a maritime strait approximately 150 km wide that separates Little Andaman (southernmost island of the Andaman group) from Car Nicobar (northernmost island of the Nicobar group) along the 10° N parallel. Great Nicobar is separated from Sumatra (Indonesia) by the Six Degree Channel (Great Channel).',
    prelimsTrapAlert: 'Keep the channels straight: 8°N = Maldives & Minicoy; 9°N = Minicoy & Lakshadweep; 10°N = Andaman & Nicobar; 6°N (Great Channel) = Indira Point & Sumatra.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Little Andaman (10 Degree Channel)', state: 'Andaman & Nicobar Islands', lat: 10.741, lon: 92.548, note: 'Northern edge of the Ten Degree Channel' },
      { placeName: 'Car Nicobar Island', state: 'Andaman & Nicobar Islands', lat: 9.172, lon: 92.775, note: 'Southern edge of the Ten Degree Channel' },
      { placeName: 'Indira Point (Great Nicobar)', state: 'Andaman & Nicobar Islands', lat: 6.753, lon: 93.829, note: 'Southernmost point of Indian territory, 140 km from Sumatra' }
    ]
  },
  {
    id: 'pyq-2014-01',
    year: 2014,
    exam: 'Civil Services Prelims',
    theme: 'ECOLOGY_PROTECTED',
    themeLabel: 'Highland Pastoralism & Mountain Ecology',
    questionText: 'With reference to the "Changpa" community of India, consider the following statements:',
    statements: [
      '1. They live mostly in the State of Uttarakhand.',
      '2. They rear the Pashmina goats that yield fine wool.',
      '3. They are kept under the Scheduled Tribes category.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Changpa are semi-nomadic pastoralists of the Changthang plateau of Ladakh, not Uttarakhand.',
    eliminationTechnique: 'Changpa live in the Changthang plateau of eastern Ladakh along the border with Tibet. They are not in Uttarakhand. Eliminate 1, leaving B as the only possible answer.',
    detailedExplanation: 'The Changpa (or Champa) are high-altitude semi-nomadic pastoralists inhabiting the Changthang plateau in southeastern Ladakh (around Tso Moriri and Nyoma). They rear the Changthangi (Pashmina) goat, which thrives at altitudes above 4,000 metres and produces the world\'s finest cashmere (pashm) fibers. In 2001, they were notified as a Scheduled Tribe in Jammu and Kashmir (now UT of Ladakh).',
    prelimsTrapAlert: 'Do not confuse Changpa (Ladakh) with Gujjars & Bakarwals (J&K/Himachal) or Bhotiyas / Gaddi (Uttarakhand & Himachal).',
    difficulty: 'Standard Prelims',
    associatedCoordinates: [
      { placeName: 'Tso Moriri Wetland', state: 'Ladakh', lat: 32.898, lon: 78.307, topicId: 'ramsar_sites', note: 'High altitude pastoral lake and Changpa homeland in Changthang' },
      { placeName: 'Hanle Dark Sky Reserve', state: 'Ladakh', lat: 32.776, lon: 78.964, note: 'Indian Astronomical Observatory & Changthang highland' }
    ]
  },
  {
    id: 'pyq-2013-01',
    year: 2013,
    exam: 'Civil Services Prelims',
    theme: 'ECOLOGY_PROTECTED',
    themeLabel: 'Floating Wetlands & Endemic Ungulates',
    questionText: 'Which of the following National Parks is unique in being a swamp with floating vegetation that supports a rich biodiversity?',
    statements: [],
    options: [
      { key: 'A', text: 'Bhitarkanika National Park' },
      { key: 'B', text: 'Keibul Lamjao National Park' },
      { key: 'C', text: 'Keoladeo Ghana National Park' },
      { key: 'D', text: 'Sultanpur National Park' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Keibul Lamjao National Park is the world only floating national park, located on Loktak Lake in Manipur.',
    eliminationTechnique: 'Floating mats of decomposing biomass and soil are called "phumdis". Keibul Lamjao on Loktak Lake in Bishnupur, Manipur is the sole habitat of the endangered brow-antlered deer (Sangai).',
    detailedExplanation: 'Keibul Lamjao National Park, covering 40 sq km in the southwestern part of Loktak Lake in Manipur, is the world\'s only floating national park. The park is distinguished by floating biomass islands locally termed "phumdis". It is the last natural refuge of the endangered Eld\'s deer subspecies, the Manipur brow-antlered deer (Rucervus eldii eldii) or Sangai (the dancing deer).',
    prelimsTrapAlert: 'Remember the ecological term: "Phumdis" = heterogenous mass of soil, vegetation, and organic matter floating on Loktak Lake.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Loktak Lake', state: 'Manipur', lat: 24.551, lon: 93.812, topicId: 'ramsar_sites', note: 'Largest freshwater lake in Northeast India under Montreux Record' },
      { placeName: 'Keibul Lamjao National Park', state: 'Manipur', lat: 24.502, lon: 93.855, topicId: 'national_parks', note: 'Only floating park on Earth & sole home of Sangai deer' }
    ]
  },
  {
    id: 'pyq-2011-02',
    year: 2011,
    exam: 'Civil Services Prelims',
    theme: 'MOUNTAINS_PASSES',
    themeLabel: 'Orography & Western-Eastern Ghats Junction',
    questionText: 'At which of the following mountain ranges do the Western Ghats and the Eastern Ghats meet?',
    statements: [],
    options: [
      { key: 'A', text: 'Annamalai Hills' },
      { key: 'B', text: 'Cardamom Hills' },
      { key: 'C', text: 'Nilgiri Hills' },
      { key: 'D', text: 'Shevaroy Hills' }
    ],
    correctOption: 'C',
    officialKeyNote: 'The Nilgiri Hills (Blue Mountains) form the structural knot where the Western Ghats and the Eastern Ghats converge.',
    eliminationTechnique: 'Annamalai and Cardamom Hills lie south of the Palghat Gap. Shevaroy Hills are located in the Eastern Ghats of Tamil Nadu. The physical bridge connecting Eastern and Western Ghats is the Nilgiri plateau (Doddabetta).',
    detailedExplanation: 'The Nilgiri Hills (literally "Blue Mountains") in western Tamil Nadu, bordering Kerala and Karnataka, constitute the topographic knot where the Sahyadris (Western Ghats) meet the disjointed ranges of the Eastern Ghats (via the Biligirirangana / Moyar gorge). Doddabetta (2,637 m) is the highest peak in the Nilgiris. South of the Nilgiris lies the Palghat Gap.',
    prelimsTrapAlert: 'Highest peak of Nilgiris = Doddabetta (2,637 m). Highest peak of South India / Western Ghats = Anamudi (2,695 m in Annamalai Hills). Do not mix the two!',
    difficulty: 'Fundamental Prelims',
    associatedCoordinates: [
      { placeName: 'Nilgiri Biosphere Reserve', state: 'Tamil Nadu', lat: 11.416, lon: 76.695, topicId: 'biosphere_reserves', note: 'First Biosphere Reserve of India (1986) at Ghats convergence' },
      { placeName: 'Doddabetta Peak', state: 'Tamil Nadu', lat: 11.401, lon: 76.736, note: 'Highest peak in Nilgiri Hills (2,637 m)' },
      { placeName: 'Palghat Gap', state: 'Kerala', lat: 10.786, lon: 76.654, topicId: 'mountain_passes', note: 'Major low mountain pass (30 km wide) separating Nilgiris from Annamalai' }
    ]
  },
  {
    id: 'pyq-2013-01',
    year: 2013,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_BASINS',
    themeLabel: 'Peninsular Graben Drainage: Narmada Rift Valley',
    questionText: 'The Narmada river flows to the west, while most other large peninsular rivers flow to the east. Why?\n1. It occupies a linear rift valley.\n2. It flows between the Vindhyas and the Satpuras.\n3. The land slopes to the west from Central India.\nSelect the correct answer using the codes given below:',
    statements: [
      '1. It occupies a linear rift valley.',
      '2. It flows between the Vindhyas and the Satpuras.',
      '3. The land slopes to the west from Central India.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3' },
      { key: 'C', text: '1 and 3' },
      { key: 'D', text: 'None of the above' }
    ],
    correctOption: 'A',
    officialKeyNote: 'The sole physical reason Narmada flows westward against the general eastward slope of Peninsular India is because it occupies a linear structural rift valley (trough/graben).',
    eliminationTechnique: 'Statement 3 is factually false: Peninsular India tilts/slopes eastwards, not westwards! Statement 2 is a geographical fact, but not the causal explanation of westward flow.',
    detailedExplanation: 'The Peninsular plateau exhibits a regional tilt from northwest to southeast (which is why Godavari, Krishna, Mahanadi, and Cauvery flow eastward into the Bay of Bengal). However, both Narmada and Tapi flow westward into the Arabian Sea because they flow through fault depressions (rift valleys or grabens) formed by tectonic rifting during the break-up of Gondwanaland. While Narmada does flow between the Vindhyan range (north) and Satpura range (south), that physical alignment is a consequence of the faulting, not the primary reason for westward gradient flow.',
    prelimsTrapAlert: 'Statement 2 is true in nature, but UPSC tests causal reason! Only Statement 1 explains WHY it flows west against the plateau tilt.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Amarkantak Plateau', state: 'Madhya Pradesh', lat: 22.674, lon: 81.756, note: 'Origin of Narmada, Son, and Johilla rivers' },
      { placeName: 'Dhuandhar Falls (Bhedaghat)', state: 'Madhya Pradesh', lat: 23.129, lon: 79.803, note: 'Narmada carving marble rock canyon' },
      { placeName: 'Sardar Sarovar Dam', state: 'Gujarat', lat: 21.831, lon: 73.748, note: 'Terminal mega-dam on Narmada before Gulf of Khambhat' }
    ]
  },
  {
    id: 'pyq-2013-02',
    year: 2013,
    exam: 'Civil Services Prelims',
    theme: 'RIVERS_BASINS',
    themeLabel: 'Teesta River Hydrography & River Capture',
    questionText: 'With reference to river Teesta, consider the following statements:\n1. The source of river Teesta is the same as that of the Brahmaputra but it flows through Sikkim.\n2. River Rangeet originates in Sikkim and it is a tributary of river Teesta.\n3. River Teesta flows into the Bay of Bengal on the border of India and Bangladesh.\nWhich of the statements given above is/are correct?',
    statements: [
      '1. The source of river Teesta is the same as that of the Brahmaputra but it flows through Sikkim.',
      '2. River Rangeet originates in Sikkim and it is a tributary of river Teesta.',
      '3. River Teesta flows into the Bay of Bengal on the border of India and Bangladesh.'
    ],
    options: [
      { key: 'A', text: '1 and 3 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: '2 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Statement 2 is correct. Teesta originates from Tso Lhamo lake / Teesta Khangse glacier in Sikkim, not Chemayungdung glacier (Brahmaputra source). Teesta joins Jamuna (Brahmaputra) in Bangladesh, not directly Bay of Bengal.',
    eliminationTechnique: 'Eliminate Statement 1: Teesta originates in Sikkim (Tso Lhamo/Kangchenjunga), while Brahmaputra originates in Tibet near Lake Manasarovar. Eliminate Statement 3: Teesta meets the Jamuna (Brahmaputra) inside Bangladesh at Fulchhari, not the Bay of Bengal.',
    detailedExplanation: 'River Teesta is known as the lifeline of Sikkim. It originates at Tso Lhamo Lake (elevation 5,330 m) fed by Teesta Khangse glacier in North Sikkim. River Rangeet (originating from Rathong glacier) is Teesta\'s largest tributary, joining it at Teesta Bazaar / Tribeni in Darjeeling district. Historically before the great flood of 1787, Teesta flowed south into the Ganga, but avulsed eastwards to join the Brahmaputra (Jamuna).',
    prelimsTrapAlert: 'Teesta does NOT enter the Bay of Bengal independently; it is a right-bank tributary of the Brahmaputra in Bangladesh.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Tso Lhamo Lake', state: 'Sikkim', lat: 27.994, lon: 88.751, note: 'Source of Teesta River at 5,330 m altitude' },
      { placeName: 'Rangeet-Teesta Confluence (Tribeni)', state: 'West Bengal', lat: 27.085, lon: 88.452, note: 'Major confluence zone in Darjeeling-Kalimpong hills' },
      { placeName: 'Teesta Barrage (Gajoldoba)', state: 'West Bengal', lat: 26.753, lon: 88.583, note: 'Key irrigation barrage in Jalpaiguri' }
    ]
  },
  {
    id: 'pyq-2014-01',
    year: 2014,
    exam: 'Civil Services Prelims',
    theme: 'MINERALS_ENERGY',
    themeLabel: 'Pastoral Tribes: Changpa of Changthang Plateau',
    questionText: 'With reference to the "Changpa" community of India, consider the following statements:\n1. They live mainly in the State of Uttarakhand.\n2. They rear the Pashmina goats that yield fine wool.\n3. They are kept in the category of Scheduled Tribes.\nWhich of the statements given above is/are correct?',
    statements: [
      '1. They live mainly in the State of Uttarakhand.',
      '2. They rear the Pashmina goats that yield fine wool.',
      '3. They are kept in the category of Scheduled Tribes.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3 only' },
      { key: 'C', text: '3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Changpa are semi-nomadic Tibetan pastoralists inhabiting the cold desert Changthang plateau of Ladakh (not Uttarakhand). They rear the Changthangi (Pashmina) goat.',
    eliminationTechnique: 'Eliminate Statement 1 immediately: Changpa live in the Changthang high-altitude plateau of Ladakh. This leaves (B) 2 and 3 only.',
    detailedExplanation: 'The Changpa are nomadic pastoralists who inhabit the harsh, high-altitude Changthang plateau of eastern Ladakh (>4,000 m). They live in yak-hair tents called "Rebo". They breed the world-renowned Changthangi goat (Capra hircus laniger), whose fine undercoat produces ultra-warm Pashmina (cashmere) wool. In 2001, the Changpa were granted Scheduled Tribe (ST) status in Jammu & Kashmir (now UT of Ladakh).',
    prelimsTrapAlert: 'Gaddi and Gujjar live in Himachal/J&K; Bhotiyas inhabit Uttarakhand; Changpa belong exclusively to Ladakh\'s Changthang.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Changthang Wildlife Sanctuary', state: 'Ladakh', lat: 33.585, lon: 78.683, topicId: 'wildlife_sanctuaries', note: 'High altitude plateau home of nomadic Changpa pastoralists' },
      { placeName: 'Tso Moriri Wetland', state: 'Ladakh', lat: 32.903, lon: 78.315, topicId: 'ramsar_sites', note: 'Breeding ground for Black-necked crane in Changthang' }
    ]
  },
  {
    id: 'pyq-2014-02',
    year: 2014,
    exam: 'Civil Services Prelims',
    theme: 'FORESTS_WILDLIFE',
    themeLabel: 'Biosphere Reserves: Agasthyamala Protected Complex',
    questionText: 'Consider the following pairs of Biosphere Reserves and their constituent protected areas:\nWhich one of the following encompasses the Shendurney, Peppara and Neyyar Wildlife Sanctuaries and the Kalakad Mundanthurai Tiger Reserve?',
    statements: [],
    options: [
      { key: 'A', text: 'Agasthyamala Biosphere Reserve' },
      { key: 'B', text: 'Nilgiri Biosphere Reserve' },
      { key: 'C', text: 'Great Nicobar Biosphere Reserve' },
      { key: 'D', text: 'Dehang-Debang Biosphere Reserve' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Agasthyamala Biosphere Reserve (Kerala and Tamil Nadu) encompasses Shendurney, Peppara, and Neyyar Wildlife Sanctuaries in Kerala, along with Kalakad Mundanthurai Tiger Reserve in Tamil Nadu.',
    eliminationTechnique: 'Kalakad Mundanthurai and Neyyar are situated at the southernmost tip of the Western Ghats (Agasthyamala peak), far south of Nilgiri.',
    detailedExplanation: 'Established in 2001 and included in UNESCO\'s World Network of Biosphere Reserves in 2016, Agasthyamala Biosphere Reserve straddles the southern Western Ghats across Kerala (Thiruvananthapuram and Kollam districts) and Tamil Nadu (Tirunelveli and Kanyakumari districts). It contains Agasthya Malai peak (1,868 m), the home of the indigenous Kanikaran tribe, and provides crucial corridors for Asian elephants.',
    prelimsTrapAlert: 'Do not confuse Agasthyamala (southernmost tip) with Nilgiri (junction of Kerala, Karnataka, and Tamil Nadu further north).',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Agasthyamala Peak', state: 'Kerala', lat: 8.616, lon: 77.246, topicId: 'biosphere_reserves', note: 'Agasthyamala Biosphere Reserve core zone (UNESCO WNBR)' },
      { placeName: 'Kalakad Mundanthurai Tiger Reserve', state: 'Tamil Nadu', lat: 8.683, lon: 77.316, topicId: 'tiger_reserves', note: 'Constituent sanctuary in Agasthyamala landscape' },
      { placeName: 'Neyyar Wildlife Sanctuary', state: 'Kerala', lat: 8.533, lon: 77.151, topicId: 'wildlife_sanctuaries', note: 'Crocodile rehabilitation and catchment area' }
    ]
  },
  {
    id: 'pyq-2015-01',
    year: 2015,
    exam: 'Civil Services Prelims',
    theme: 'GLACIERS_PEAKS',
    themeLabel: 'Himalayan Glaciology: Siachen Glacier Orientation',
    questionText: 'Siachen Glacier is situated to the:',
    statements: [],
    options: [
      { key: 'A', text: 'East of Aksai Chin' },
      { key: 'B', text: 'East of Leh' },
      { key: 'C', text: 'North of Gilgit' },
      { key: 'D', text: 'North of Nubra Valley' }
    ],
    correctOption: 'D',
    officialKeyNote: 'The Siachen Glacier lies in the eastern Karakoram range immediately North of the Nubra Valley.',
    eliminationTechnique: 'Aksai Chin lies east of Siachen (so Siachen cannot be East of Aksai Chin). Leh is south. Gilgit lies west of the Line of Control. Siachen sits directly north of Nubra valley.',
    detailedExplanation: 'Siachen Glacier is ~76 km long, making it the second-longest non-polar glacier in the world. It originates near Indira Col (5,764 m) in the Karakoram Range. Meltwater from the glacier feeds the Nubra River (locally known as the Yarma Chu), which flows southwards and merges with the Shyok River (a tributary of the Indus). Hence, Nubra Valley is situated directly south of Siachen, or equivalently, Siachen is situated North of Nubra Valley. India secured control of the entire glacier in 1984 under Operation Meghdoot.',
    prelimsTrapAlert: 'UPSC repeated this exact relative orientation question multiple times. Siachen = North of Nubra Valley, West of Aksai Chin, East of Saltoro Ridge.',
    difficulty: 'Fundamental Prelims',
    associatedCoordinates: [
      { placeName: 'Siachen Glacier Base Camp', state: 'Ladakh', lat: 35.166, lon: 77.203, topicId: 'glaciers', note: 'World highest operational military battlefield (Karakoram)' },
      { placeName: 'Nubra Valley (Diskit)', state: 'Ladakh', lat: 34.542, lon: 77.562, note: 'Cold desert sand dunes with double-humped Bactrian camels' },
      { placeName: 'Khardung La', state: 'Ladakh', lat: 34.278, lon: 77.604, topicId: 'mountain_passes', note: 'Gateway mountain pass between Leh and Nubra Valley' }
    ]
  },
  {
    id: 'pyq-2015-02',
    year: 2015,
    exam: 'Civil Services Prelims',
    theme: 'OCEANS_COASTS',
    themeLabel: 'Maritime Straits: Ten Degree Channel',
    questionText: 'Which one of the following pairs of islands is separated from each other by the "Ten Degree Channel"?',
    statements: [],
    options: [
      { key: 'A', text: 'Andaman and Nicobar' },
      { key: 'B', text: 'Nicobar and Sumatra' },
      { key: 'C', text: 'Maldives and Lakshadweep' },
      { key: 'D', text: 'Sumatra and Java' }
    ],
    correctOption: 'A',
    officialKeyNote: 'The Ten Degree Channel is a 150 km wide oceanic channel that separates the Andaman Islands (Little Andaman in the north) from the Nicobar Islands (Car Nicobar in the south) along the 10°N latitude.',
    eliminationTechnique: 'Maldives and Minicoy/Lakshadweep are separated by Eight Degree Channel. Nicobar and Sumatra are separated by the Great Channel (Six Degree Channel). Sunda Strait separates Sumatra and Java.',
    detailedExplanation: 'The 10°N latitude line passes directly between Little Andaman (the southernmost island of the Andaman group) and Car Nicobar (the northernmost island of the Nicobar group). It is known as the Ten Degree Channel and is an essential international commercial navigation passage connecting the Bay of Bengal to the Andaman Sea and Strait of Malacca.',
    prelimsTrapAlert: 'Memorize the channels: 8° Channel = Maldives & Minicoy; 9° Channel = Minicoy & main Lakshadweep; 10° Channel = Little Andaman & Car Nicobar; 6° (Great) Channel = Indira Point & Sumatra (Aceh).',
    difficulty: 'Fundamental Prelims',
    associatedCoordinates: [
      { placeName: 'Ten Degree Channel', state: 'Andaman and Nicobar Islands', lat: 10.001, lon: 92.502, note: '150 km wide sea channel separating Andaman from Nicobar' },
      { placeName: 'Little Andaman', state: 'Andaman and Nicobar Islands', lat: 10.716, lon: 92.516, note: 'Southernmost island of the Andaman archipelago' },
      { placeName: 'Car Nicobar', state: 'Andaman and Nicobar Islands', lat: 9.156, lon: 92.766, note: 'Northernmost island of the Nicobar group' }
    ]
  },
  {
    id: 'pyq-2016-01',
    year: 2016,
    exam: 'Civil Services Prelims',
    theme: 'FORESTS_WILDLIFE',
    themeLabel: 'Endemic Flora: Red Sanders (Pterocarpus santalinus)',
    questionText: 'With reference to "Red Sanders", sometimes seen in the news, consider the following statements:\n1. It is a tree species found in a part of South India.\n2. It is one of the most important trees in the tropical rain forest areas of South India.\nWhich of the statements given above is/are correct?',
    statements: [
      '1. It is a tree species found in a part of South India.',
      '2. It is one of the most important trees in the tropical rain forest areas of South India.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: 'Both 1 and 2' },
      { key: 'D', text: 'Neither 1 nor 2' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Statement 1 is correct. Red Sanders is endemic to the dry deciduous scrub forests of the Seshachalam and Veligonda hills in Rayalaseema (Eastern Ghats of Andhra Pradesh), NOT tropical rainforests.',
    eliminationTechnique: 'Statement 2 is false: Red Sanders (Rakta Chandan) grows in dry, rocky, arid deciduous thorn/dry deciduous forest tracts of Andhra Pradesh, not tropical rainforests.',
    detailedExplanation: 'Pterocarpus santalinus (Red Sanders or Yerra Chandanam) is a tree species endemic to a narrow distinct belt of the southern Eastern Ghats, predominantly in the Seshachalam Biosphere Reserve (Chittoor, Kadapa, Nellore, and Kurnool districts of Andhra Pradesh). It yields deep red, aromatic, heavy wood highly prized in East Asian traditional furniture, dyes, and medicinal preparations. It thrives on poor degraded soils with sparse rainfall (dry deciduous), not evergreen rainforest.',
    prelimsTrapAlert: 'Do not confuse White Sandalwood (Santalum album - found in Karnataka/TN) with Red Sanders (Pterocarpus santalinus - endemic exclusively to Andhra Pradesh\'s dry Eastern Ghats).',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Seshachalam Hills Biosphere Reserve', state: 'Andhra Pradesh', lat: 13.683, lon: 79.351, topicId: 'biosphere_reserves', note: 'Primary natural habitat of endemic Red Sanders trees' },
      { placeName: 'Tirumala Hills', state: 'Andhra Pradesh', lat: 13.678, lon: 79.349, note: 'Sacred hills in Eastern Ghats surrounded by Red Sanders forests' }
    ]
  },
  {
    id: 'pyq-2016-02',
    year: 2016,
    exam: 'Civil Services Prelims',
    theme: 'MOUNTAINS_PASSES',
    themeLabel: 'Himalayan Antecedence: Syntaxial Bends & Tsangpo Avulsion',
    questionText: 'Which of the following is/are the reason(s) for the Brahmaputra river taking a sharp U-turn near Namcha Barwa to enter India?\n1. Uplift of tertiary fold mountain ranges.\n2. Syntaxial bending of geologically youthful Himalayas.\n3. Differential erosion by heavy monsoon precipitation.\nSelect the correct answer using the code given below:',
    statements: [
      '1. Uplift of tertiary fold mountain ranges.',
      '2. Syntaxial bending of geologically youthful Himalayas.',
      '3. Differential erosion by heavy monsoon precipitation.'
    ],
    options: [
      { key: 'A', text: '1 and 2 only' },
      { key: 'B', text: '2 only' },
      { key: 'C', text: '1 and 3 only' },
      { key: 'D', text: '1, 2 and 3' }
    ],
    correctOption: 'B',
    officialKeyNote: 'The sharp knee-bend (hairpin U-turn) of the Yarlung Tsangpo / Brahmaputra around Namcha Barwa peak (7,782 m) is directly caused by the syntaxial bend of the youthful Himalayan mountain belt.',
    eliminationTechnique: 'Standard geomorphological consensus identifies tectonic syntaxial bending as the governing structural factor behind the hairpin turns of both the Indus (around Nanga Parbat in the west) and the Brahmaputra (around Namcha Barwa in the east).',
    detailedExplanation: 'The Himalayan orogen terminates in two sharp, acute hairpin syntaxes at its two ends: the Western Syntaxis around Nanga Parbat in Pakistan, where the Indus carves a deep gorge; and the Eastern Syntaxis around Namcha Barwa in Tibet/Arunachal border, where the Yarlung Tsangpo loops around the mountain massif to cut the Yarlung Tsangpo Grand Canyon (the deepest canyon on Earth) and enters India as the Siang / Dihang river. This structural syntaxial bending is driven by the northward indentation of the Assam wedge of the Indian cratonic plate into Eurasia.',
    prelimsTrapAlert: 'Both Indus (western syntaxis) and Brahmaputra (eastern syntaxis) exhibit knee-bends caused by Syntaxial Bending of the geologically young orogen.',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Namcha Barwa Peak', state: 'Arunachal Pradesh', lat: 29.633, lon: 95.056, note: 'Eastern anchor of the Himalayas (7,782 m) and Great Tsangpo Bend' },
      { placeName: 'Dihang-Dibang Biosphere Reserve', state: 'Arunachal Pradesh', lat: 28.552, lon: 95.831, topicId: 'biosphere_reserves', note: 'Eastern Himalayan ecological hotspot where Siang enters India' }
    ]
  },
  {
    id: 'pyq-2017-01',
    year: 2017,
    exam: 'Civil Services Prelims',
    theme: 'AGRICULTURE_SOILS',
    themeLabel: 'Mediterranean Biome & Winter Rainfall Mechanism',
    questionText: '"Climate is extreme, rainfall is scanty and the people used to be nomadic herders." The above statement best describes which of the following regions?',
    statements: [],
    options: [
      { key: 'A', text: 'African Savannah' },
      { key: 'B', text: 'Central Asian Steppe' },
      { key: 'C', text: 'North American Prairie' },
      { key: 'D', text: 'Siberian Tundra' }
    ],
    correctOption: 'B',
    officialKeyNote: 'Central Asian Steppe (Temperate Grassland) is characterized by continental extreme climate (burning summers, freezing winters), low rainfall, and historically nomadic pastoralist tribes (e.g., Kirghiz, Kazakhs, Mongols).',
    eliminationTechnique: 'African Savannah has a tropical wet-and-dry climate (not extreme continental). North American Prairies are mechanized wheat and cattle ranches, not nomadic herders. Siberian Tundra is permafrost polar moss/lichen terrain.',
    detailedExplanation: 'The temperate continental grasslands (Steppes) in the interior of Eurasia experience severe continentality due to distance from marine influence. Winters are bitterly cold with temperatures plummeting below -20°C, while summers are hot (>30°C). Annual precipitation is sparse (25–50 cm), sustaining short treeless grasses. Traditionally, nomadic pastoral communities (Kirghiz, Mongols, Kalmuks) engaged in transhumance across these endless plains.',
    prelimsTrapAlert: 'Notice keywords: "Nomadic herders" + "Extreme climate" + "Scanty rainfall" = Steppes (Central Asia).',
    difficulty: 'Fundamental Prelims',
    associatedCoordinates: [
      { placeName: 'Ladakh Cold Desert', state: 'Ladakh', lat: 34.152, lon: 77.577, note: 'Indian counterpart to Central Asian cold arid steppe biome' }
    ]
  },
  {
    id: 'pyq-2018-01',
    year: 2018,
    exam: 'Civil Services Prelims',
    theme: 'OCEANS_COASTS',
    themeLabel: 'Volcanology: Barren Island Active Volcano',
    questionText: 'Consider the following statements:\n1. The Barren Island volcano is an active volcano located in the Indian territory.\n2. Barren Island lies about 140 km east of Great Nicobar.\n3. The last time the Barren Island volcano erupted was in 1991 and it has remained inactive since then.\nWhich of the statements given above is/are correct?',
    statements: [
      '1. The Barren Island volcano is an active volcano located in the Indian territory.',
      '2. Barren Island lies about 140 km east of Great Nicobar.',
      '3. The last time the Barren Island volcano erupted was in 1991 and it has remained inactive since then.'
    ],
    options: [
      { key: 'A', text: '1 only' },
      { key: 'B', text: '2 and 3' },
      { key: 'C', text: '3 only' },
      { key: 'D', text: '1 and 3' }
    ],
    correctOption: 'A',
    officialKeyNote: 'Statement 1 is correct: Barren Island is the only confirmed active volcano in South Asia. Statement 2 is incorrect (it lies ~138 km northeast of Port Blair in the Andaman Sea, not Great Nicobar). Statement 3 is incorrect (it erupted multiple times recently in 2017, 2018, and 2020).',
    eliminationTechnique: 'Eliminate Statement 3: Barren Island was in national news for erupting actively in 2017. Eliminate Statement 2: It is part of the Andaman group east of Port Blair, not Great Nicobar. Leaves (A) 1 only.',
    detailedExplanation: 'Barren Island is situated in the Andaman Sea along the active volcanic arc associated with the subduction of the Indian Plate beneath the Burma microplate. It is the only confirmed active volcano in South Asia / India (Narcondam is dormant). It erupted in 1787, 1991, 1994, 2005, and as recently as 2017–2020 spewing ash and basaltic lava. It lies roughly 140 km north-east of Port Blair (South Andaman).',
    prelimsTrapAlert: 'Barren Island = ACTIVE. Narcondam Island = DORMANT / EXTINCT volcano. Know the exact spatial distinction!',
    difficulty: 'High-Yield Prelims',
    associatedCoordinates: [
      { placeName: 'Barren Island Volcano', state: 'Andaman and Nicobar Islands', lat: 12.278, lon: 93.858, note: 'South Asia\'s only active subduction stratovolcano' },
      { placeName: 'Narcondam Island', state: 'Andaman and Nicobar Islands', lat: 13.433, lon: 94.283, note: 'Dormant volcanic island home of endemic Narcondam hornbill' },
      { placeName: 'Port Blair (Sri Vijaya Puram)', state: 'Andaman and Nicobar Islands', lat: 11.623, lon: 92.726, note: 'Capital city ~140 km southwest of Barren Island' }
    ]
  }
];

// -------------------------------------------------------------
// MAINS GS PAPER 1 DIAGRAM CHALLENGES & SKETCH PAD TEMPLATES
// -------------------------------------------------------------
export const MAINS_DIAGRAM_TEMPLATES: MainsDiagramTemplate[] = [
  {
    id: 'mains-diag-01',
    title: 'Peninsular India Drainage & Major River Graben Basins',
    paper: 'GS Paper 1',
    theme: 'Physical Geography & Drainage',
    difficulty: 'Intermediate (1 min)',
    prompt: 'Sketch a quick outline of Peninsular India. Mark the Western Ghats water divide and plot the courses of Narmada, Tapi, Godavari, Krishna, and Cauvery along with their deltas.',
    recommendedTimeSeconds: 75,
    keyChecklistItems: [
      'West-flowing Narmada and Tapi in linear rift valleys into Arabian Sea',
      'Continuous Western Ghats crest acting as principal water divide',
      'East-flowing Godavari, Krishna, Cauvery forming fertile delta fans',
      'Indicate general eastward tilt of Deccan plateau'
    ],
    modelDiagramDescription: 'V-shaped Peninsular shield outline with hatched Western Ghats ridge along west coast. Narmada and Tapi flowing into Gulf of Khambhat. Godavari originating at Trimbakeshwar flowing east to Rajahmundry. Krishna originating at Mahabaleshwar to Vijayawada. Cauvery from Talakaveri to Poompuhar.',
    referencePoints: [
      { name: 'Narmada Estuary', x: 260, y: 440, label: 'Narmada (Rift Valley)' },
      { name: 'Tapi Estuary', x: 265, y: 465, label: 'Tapi (Satpura Trench)' },
      { name: 'Godavari Delta', x: 680, y: 550, label: 'Godavari (Trimbak to Rajahmundry)' },
      { name: 'Krishna Delta', x: 660, y: 640, label: 'Krishna (Mahabaleshwar)' },
      { name: 'Cauvery Delta', x: 580, y: 830, label: 'Cauvery (Talakaveri to Bay of Bengal)' },
      { name: 'Western Ghats Water Divide', x: 320, y: 600, label: 'Asymmetrical Water Divide' }
    ]
  },
  {
    id: 'mains-diag-02',
    title: 'Major Gondwana Coal Graben Belts & Tertiary Deposits',
    paper: 'GS Paper 1',
    theme: 'Economic Geography & Mineral Distribution',
    difficulty: 'Advanced (2 mins)',
    prompt: 'Draw Peninsular India and mark the 4 primary Gondwana coal-bearing river grabens (Damodar, Son, Mahanadi, Godavari) along with Tertiary lignite in Neyveli and Assam.',
    recommendedTimeSeconds: 90,
    keyChecklistItems: [
      'Damodar Valley (Jharia, Raniganj, Bokaro)',
      'Son Valley (Singrauli thick seam)',
      'Mahanadi / Brahmani Valley (Talcher, Ib Valley)',
      'Pranhita-Godavari Valley (Singareni / Kothagudem)',
      'Neyveli Tertiary lignite basin in Tamil Nadu'
    ],
    modelDiagramDescription: 'Peninsular map highlighting the Chota Nagpur heartland and radiating graben valleys where Gondwana sedimentation occurred ~250 Ma, plus coastal and northeastern Tertiary coal deposits.',
    referencePoints: [
      { name: 'Damodar Graben', x: 740, y: 430, label: 'Damodar (Jharia - Sole Prime Coking)' },
      { name: 'Son Valley', x: 620, y: 390, label: 'Singrauli (Son Graben)' },
      { name: 'Mahanadi Graben', x: 690, y: 490, label: 'Talcher (Mahanadi Graben)' },
      { name: 'Godavari Graben', x: 550, y: 580, label: 'Singareni (Godavari Valley)' },
      { name: 'Neyveli Lignite', x: 560, y: 800, label: 'Neyveli (Tertiary Lignite)' }
    ]
  },
  {
    id: 'mains-diag-03',
    title: 'Trans-Himalayan & Himalayan Structural Zones & Passes',
    paper: 'GS Paper 1',
    theme: 'Geotectonics & Strategic Geography',
    difficulty: 'Intermediate (1.5 mins)',
    prompt: 'Sketch northern India from Jammu & Kashmir to Ladakh. Mark Karakoram, Ladakh, Zanskar, Great Himalaya, and Pir Panjal with strategic passes (Zoji La, Khardung La, Shipki La).',
    recommendedTimeSeconds: 90,
    keyChecklistItems: [
      'Parallel sequence: Karakoram -> Ladakh -> Zanskar -> Great Himalaya -> Pir Panjal',
      'Indus River flowing northwest between Ladakh and Zanskar',
      'Strategic passes: Zoji La (Srinagar to Leh), Khardung La (Leh to Nubra), Shipki La (Sutlej gorge)',
      'Indus Suture Zone (ISZ) continental collision boundary'
    ],
    modelDiagramDescription: 'Curved arc of mountain bands across Ladakh, J&K, and Himachal. Indus shown flowing through the syncline. Passes marked with saddles across ridges.',
    referencePoints: [
      { name: 'Karakoram Range', x: 380, y: 130, label: 'Karakoram (K2 & Siachen)' },
      { name: 'Khardung La Pass', x: 410, y: 160, label: 'Khardung La (Gateway to Nubra)' },
      { name: 'Zoji La Pass', x: 350, y: 190, label: 'Zoji La (Great Himalaya Saddle)' },
      { name: 'Pir Panjal Range', x: 340, y: 220, label: 'Pir Panjal (Kashmir Basin Boundary)' },
      { name: 'Shipki La Pass', x: 440, y: 240, label: 'Shipki La (Sutlej Entry into India)' }
    ]
  },
  {
    id: 'mains-diag-04',
    title: 'Dedicated Freight Corridors (Western & Eastern DFCs)',
    paper: 'GS Paper 1 & 3',
    theme: 'Infrastructure, Logistics & Spatial Planning',
    difficulty: 'Easy (1 min)',
    prompt: 'Draw the Golden Quadrilateral / DFC network of India connecting Dadri, JNPT, Ludhiana, and Dankuni.',
    recommendedTimeSeconds: 60,
    keyChecklistItems: [
      'Western DFC from Dadri (UP) through Rajasthan & Gujarat to JNPT Mumbai',
      'Eastern DFC from Sahnewal (Ludhiana) through UP, Bihar to Dankuni (Kolkata)',
      'Junction / Interchange node at Dadri',
      'Major ports connected: Mundra, Kandla, JNPT'
    ],
    modelDiagramDescription: 'Two golden lines originating from the Indo-Gangetic and Punjab industrial zones converging at Dadri and connecting western maritime ports with eastern coal and steel basins.',
    referencePoints: [
      { name: 'Dadri Hub', x: 440, y: 300, label: 'Dadri (Interchange Node)' },
      { name: 'JNPT Terminal', x: 280, y: 560, label: 'JNPT (Western DFC Terminal)' },
      { name: 'Dankuni Terminal', x: 790, y: 450, label: 'Dankuni (Eastern DFC Terminal)' },
      { name: 'Ludhiana Origin', x: 370, y: 230, label: 'Sahnewal / Ludhiana' }
    ]
  },
  {
    id: 'mains-diag-05',
    title: 'Iron Ore Belts & Integrated Steel Plants of India',
    paper: 'GS Paper 1 & 3',
    theme: 'Heavy Industries & Weberian Location Theory',
    difficulty: 'Advanced (2 mins)',
    prompt: 'Sketch Peninsular India and plot the 4 major Iron Ore Belts (Odisha-Jharkhand, Durg-Bastar-Chandrapur, Bellary-Chitradurga, Goa-Ratnagiri) and corresponding steel clusters (Bhilai, Rourkela, Bokaro, Jamshedpur, Vijayanagar, Visakhapatnam).',
    recommendedTimeSeconds: 90,
    keyChecklistItems: [
      'Chota Nagpur raw material orientation (Jamshedpur, Bokaro, Durgapur, Rourkela)',
      'Central Indian belt: Bailadila hematite feeding Visakhapatnam steel via pipeline',
      'Southern belt: Kudremukh/Sandur hematite feeding Vijayanagar & Salem',
      'Coastal steel plant: Visakhapatnam (market + export access)'
    ],
    modelDiagramDescription: 'Peninsular outline highlighting iron ore polygons and coal triangle. Markers for 6 public & private sector integrated steel plants demonstrating transport cost minimization.',
    referencePoints: [
      { name: 'Bokaro Steel', x: 730, y: 420, label: 'Bokaro (Coal-Steel Node)' },
      { name: 'Jamshedpur TISCO', x: 745, y: 445, label: 'Jamshedpur (Subarnarekha)' },
      { name: 'Rourkela Steel', x: 710, y: 460, label: 'Rourkela (Brahmani River)' },
      { name: 'Bhilai Steel', x: 620, y: 480, label: 'Bhilai (Durg-Bastar Ore)' },
      { name: 'Visakhapatnam Steel', x: 690, y: 570, label: 'Vizag (Coastal Shore Plant)' },
      { name: 'Vijayanagar Steel', x: 420, y: 660, label: 'Vijayanagar (Bellary-Hospet)' }
    ]
  },
  {
    id: 'mains-diag-06',
    title: 'Mangrove Ecosystems & Coral Reefs of India',
    paper: 'GS Paper 1 & 3',
    theme: 'Biogeography & Coastal Ecology',
    difficulty: 'Intermediate (1.5 mins)',
    prompt: 'Sketch the coastline of India. Mark the 4 major Coral Reef zones (Gulf of Kutch, Lakshadweep, Gulf of Mannar, Andaman & Nicobar) and 3 premier Mangrove ecosystems (Sundarbans, Bhitarkanika, Pichavaram).',
    recommendedTimeSeconds: 80,
    keyChecklistItems: [
      'Sundarbans (world largest halophytic delta mangrove)',
      'Bhitarkanika (saltwater crocodile and Olive Ridley nesting)',
      'Pichavaram (dense avicennia-rhizophora estuarine mangrove)',
      'Four coral provinces: Atoll (Lakshadweep), Fringing/Barrier (Andaman & Nicobar, Gulf of Mannar, Gulf of Kutch)'
    ],
    modelDiagramDescription: 'Indian coastline with green patches at deltas (Sundarbans, Mahanadi, Cauvery) and cyan reef circles in Gulf of Mannar, Kutch, Lakshadweep, and Andaman Sea.',
    referencePoints: [
      { name: 'Sundarbans Delta', x: 810, y: 460, label: 'Sundarbans (Royal Bengal Tiger)' },
      { name: 'Bhitarkanika Mangroves', x: 740, y: 490, label: 'Bhitarkanika (Gahirmatha Turtles)' },
      { name: 'Pichavaram Mangroves', x: 570, y: 790, label: 'Pichavaram (Cauvery Delta)' },
      { name: 'Gulf of Kutch Reefs', x: 190, y: 410, label: 'Gulf of Kutch (Marine NP)' },
      { name: 'Gulf of Mannar Reefs', x: 540, y: 850, label: 'Gulf of Mannar (Dugong Habitat)' },
      { name: 'Lakshadweep Atolls', x: 310, y: 790, label: 'Lakshadweep (Only Coral Atolls)' }
    ]
  }
];


// Helper functions for lookup & statistics
export function getPyqsForPlace(placeName: string): UPSCPYQuestion[] {
  const query = placeName.trim().toLowerCase();
  return UPSC_PYQ_DATABASE.filter((q) =>
    q.associatedCoordinates.some((coord) =>
      coord.placeName.toLowerCase().includes(query) ||
      query.includes(coord.placeName.toLowerCase())
    ) ||
    q.questionText.toLowerCase().includes(query) ||
    q.detailedExplanation.toLowerCase().includes(query)
  );
}

export function getPyqsByTheme(theme: PYQTheme): UPSCPYQuestion[] {
  if (theme === 'ALL') return UPSC_PYQ_DATABASE;
  return UPSC_PYQ_DATABASE.filter((q) => q.theme === theme);
}

export function getPyqsByYear(year: number): UPSCPYQuestion[] {
  return UPSC_PYQ_DATABASE.filter((q) => q.year === year);
}
