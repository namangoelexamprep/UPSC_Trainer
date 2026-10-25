export interface GeographyFact {
  id: string;
  category: 'MINERALS' | 'RIVERS' | 'PHYSICAL' | 'ECOLOGY' | 'PASSES' | 'HERITAGE';
  categoryLabel: string;
  emoji: string;
  headline: string;
  fact: string;
  upscTip: string;
  relatedTopicId?: string;
  relatedPlaceName?: string;
}

export const DID_YOU_KNOW_FACTS: GeographyFact[] = [
  {
    id: 'fact-1',
    category: 'MINERALS',
    categoryLabel: 'Coal & Energy Geology',
    emoji: '⛏️',
    headline: 'Gondwana Coal Accounts for ~98% of India’s Total Reserves',
    fact: 'Formed ~250 million years ago during the Permian period, Gondwana coal is strictly bituminous and concentrated in rift valley basins along peninsular rivers like Damodar, Son, Mahanadi, and Godavari.',
    upscTip: 'Prelims Trap: Gondwana coal contains High Ash (18–35%) and LOW Moisture, whereas Tertiary coal (Neyveli) has High Moisture (45–55%) and LOW Ash.',
    relatedTopicId: 'coal_fields',
    relatedPlaceName: 'Jharia'
  },
  {
    id: 'fact-2',
    category: 'RIVERS',
    categoryLabel: 'Drainage Systems',
    emoji: '🌊',
    headline: 'Damodar River is Known as the "Ruhr Valley of India"',
    fact: 'Flowing through Jharkhand and West Bengal, the Damodar Valley holds India’s richest industrial-coal belt (Jharia, Bokaro, Raniganj), serving integrated steel mills at Bokaro and Durgapur.',
    upscTip: 'Mains Tip: Damodar Valley Corporation (DVC), established in 1948, was India’s first multi-purpose river valley project modelled directly after the US Tennessee Valley Authority (TVA).',
    relatedTopicId: 'major_dams',
    relatedPlaceName: 'Raniganj'
  },
  {
    id: 'fact-3',
    category: 'MINERALS',
    categoryLabel: 'Tertiary Lignite',
    emoji: '🍂',
    headline: 'Neyveli in Tamil Nadu Holds Over 80% of India’s Lignite Reserves',
    fact: 'Unlike Gondwana coal, Neyveli lignite is geologically young (~15–20 million years old, Miocene epoch) formed in coastal mangrove swamps of the Cauvery basin.',
    upscTip: 'Engineering Fact: Neyveli open-cast mines sit on high-pressure artesian aquifers that require 24x7 groundwater depressurization pumping to prevent mine pit blowouts.',
    relatedTopicId: 'coal_fields',
    relatedPlaceName: 'Neyveli'
  },
  {
    id: 'fact-4',
    category: 'PASSES',
    categoryLabel: 'Himalayan Passes',
    emoji: '🏔️',
    headline: 'Zoji La Connects Srinagar Valley Directly to the Ladakh Plateau',
    fact: 'Situated at an altitude of 3,528 meters on National Highway 1 (NH-1) in the Zaskar Range, Zoji La experiences extreme snow accumulation during winter.',
    upscTip: 'Prelims Focus: The under-construction 14.15 km Zoji La Tunnel will become Asia’s longest bi-directional tunnel, ensuring all-weather strategic connectivity to Leh.',
    relatedTopicId: 'mountain_passes',
    relatedPlaceName: 'Zoji La'
  },
  {
    id: 'fact-5',
    category: 'ECOLOGY',
    categoryLabel: 'Wetlands & Ecology',
    emoji: '🌿',
    headline: 'Loktak Lake Hosts World’s Only Floating National Park (Keibul Lamjao)',
    fact: 'Located in Manipur, Loktak Lake is famous for phumdis—heterogeneous masses of vegetation, soil, and organic matter floating on the water surface.',
    upscTip: 'Species Alert: Keibul Lamjao National Park is the last natural refuge of the endangered Sangai deer (Manipur brow-antlered deer), also known as the dancing deer.',
    relatedTopicId: 'ramsar_sites',
    relatedPlaceName: 'Loktak Lake'
  },
  {
    id: 'fact-6',
    category: 'PHYSICAL',
    categoryLabel: 'Geomorphology & Rift Valleys',
    emoji: '⛰️',
    headline: 'Narmada and Tapi Flow Westward Due to Tectonic Fault Troughs',
    fact: 'While most peninsular rivers flow eastward into the Bay of Bengal along the tilted peninsular shield, Narmada and Tapi flow west into the Arabian Sea through linear rift valleys created during the Himalayan collision.',
    upscTip: 'Prelims Trap: West-flowing peninsular rivers form ESTUARIES at their mouths, whereas east-flowing rivers (Mahanadi, Godavari, Krishna, Cauvery) form DELTAS.',
    relatedTopicId: 'major_dams',
    relatedPlaceName: 'Sardar Sarovar'
  },
  {
    id: 'fact-7',
    category: 'MINERALS',
    categoryLabel: 'Metallic Iron Ore',
    emoji: '🏗️',
    headline: 'Bailadila in Chhattisgarh Produces High-Grade Hematite Iron Ore',
    fact: 'Bailadila (shaped like a "bull’s hump") in Dantewada district yields ultra-high grade hematite ore (>65% Fe content) mined by NMDC.',
    upscTip: 'Trade Link: Bailadila iron ore is transported via a 470-km slurry pipeline and railway line to the port of Visakhapatnam for export to Japan and South Korea.',
    relatedTopicId: 'iron_ore',
    relatedPlaceName: 'Bailadila'
  },
  {
    id: 'fact-8',
    category: 'HERITAGE',
    categoryLabel: 'Ancient Geography',
    emoji: '🏛️',
    headline: 'Lothal Featured the World’s Earliest Known Tidal Dockyard',
    fact: 'Located near the Gulf of Khambhat in Gujarat, the Harappan port of Lothal possessed an engineered brick basin connected to the old bed of the Bhogavo River.',
    upscTip: 'Trade Context: Harappan merchants exported carnelian beads, copper, and ivory from Lothal to Mesopotamian ports (referred to as Meluhha in cuneiform texts).',
    relatedTopicId: 'harappan_sites',
    relatedPlaceName: 'Lothal'
  }
];
