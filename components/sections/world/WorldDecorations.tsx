"use client";

import React from "react";

// ============================================================================
// 1. ISOMETRIC STORYBOOK COTTAGE (True 3D Axonometric Projection)
// ============================================================================
export function CottageBuilding({
  x = 0,
  y = 0,
  isSelected = false,
  isNight = false,
}: {
  x?: number;
  y?: number;
  isSelected?: boolean;
  isNight?: boolean;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-300 ${
        isSelected
          ? "filter drop-shadow-[0_16px_30px_rgba(232,184,75,0.9)]"
          : "filter drop-shadow-[0_18px_32px_rgba(15,25,18,0.45)]"
      }`}
    >
      {/* 3D Diagonal Cast Shadow on Ground */}
      <polygon
        points="40,160 180,185 240,150 160,135 60,140"
        fill="#142416"
        opacity="0.45"
      />

      {/* Rugged Multi-Tone Fieldstone Chimney (Back Left) */}
      <g>
        {/* Chimney Left Face (Sunlit) */}
        <polygon points="45,35 62,45 62,125 45,115" fill="#7A6858" stroke="#3D3228" strokeWidth="1" />
        {/* Chimney Right Face (Shadow) */}
        <polygon points="62,45 74,38 74,118 62,125" fill="#5A4B3E" stroke="#3D3228" strokeWidth="1" />
        {/* Chimney Cap Stone */}
        <polygon points="42,33 62,45 78,36 58,24" fill="#9C8977" stroke="#3D3228" strokeWidth="1.2" />
        {/* Terracotta Flue Pot */}
        <polygon points="54,18 64,24 64,28 54,22" fill="#BA5E43" stroke="#7A3622" strokeWidth="1" />
        <polygon points="64,24 72,19 72,23 64,28" fill="#873F2B" stroke="#7A3622" strokeWidth="1" />

        {/* Chimney Stone Texture Blocks */}
        <polygon points="48,50 58,56 58,64 48,58" fill="#8C7969" />
        <polygon points="64,62 70,58 70,68 64,72" fill="#4B3D32" />
        <polygon points="50,75 60,81 60,89 50,83" fill="#8C7969" />
        <polygon points="63,90 71,85 71,94 63,99" fill="#4B3D32" />

        {/* Volumetric Animated Smoke Puffs */}
        <g className="animate-pulse opacity-80">
          <circle cx="64" cy="12" r="5" fill="#FAF5E8" opacity="0.75" />
          <circle cx="72" cy="0" r="7.5" fill="#FAF5E8" opacity="0.6" />
          <circle cx="84" cy="-14" r="11" fill="#FAF5E8" opacity="0.4" />
          <circle cx="98" cy="-30" r="15" fill="#FAF5E8" opacity="0.25" />
        </g>
      </g>

      {/* Main Cottage Ground Plinth & Ashlar Stone Foundation */}
      <polygon points="50,135 130,175 130,165 50,125" fill="#7A6B5C" stroke="#3A2E24" strokeWidth="1.2" />
      <polygon points="130,175 210,135 210,125 130,165" fill="#5E5144" stroke="#3A2E24" strokeWidth="1.2" />

      {/* Cottage Walls (Isometric 2-Point Perspective) */}
      {/* Left Wall Facade (Direct Warm Sunlight) */}
      <polygon points="50,80 130,125 130,165 50,125" fill="#FAF5E6" stroke="#3A2415" strokeWidth="1.8" />
      {/* Right Wall Facade (Diffused Ambient Shadow) */}
      <polygon points="130,125 210,80 210,125 130,165" fill="#DDD0BC" stroke="#3A2415" strokeWidth="1.8" />

      {/* Tudor Half-Timber Framing (Dark Aged Walnut #4A2E19) */}
      {/* Left wall studs & bracing */}
      <line x1="50" y1="80" x2="50" y2="125" stroke="#4A2E19" strokeWidth="4.5" />
      <line x1="130" y1="125" x2="130" y2="165" stroke="#4A2E19" strokeWidth="4.5" />
      <line x1="90" y1="102" x2="90" y2="145" stroke="#4A2E19" strokeWidth="4" />
      <line x1="50" y1="102" x2="130" y2="145" stroke="#4A2E19" strokeWidth="3.5" />
      <line x1="50" y1="80" x2="90" y2="145" stroke="#4A2E19" strokeWidth="3" />
      <line x1="90" y1="102" x2="130" y2="165" stroke="#4A2E19" strokeWidth="3" />

      {/* Right wall studs & bracing */}
      <line x1="210" y1="80" x2="210" y2="125" stroke="#382110" strokeWidth="4.5" />
      <line x1="170" y1="102" x2="170" y2="145" stroke="#382110" strokeWidth="4" />
      <line x1="130" y1="145" x2="210" y2="102" stroke="#382110" strokeWidth="3.5" />
      <line x1="130" y1="165" x2="170" y2="102" stroke="#382110" strokeWidth="3" />
      <line x1="170" y1="145" x2="210" y2="80" stroke="#382110" strokeWidth="3" />

      {/* Deep Storybook Gabled Roof (Terracotta & Cedar Shingles) */}
      {/* Overhang Shadow */}
      <polygon points="40,86 130,135 220,86 210,80 130,125 50,80" fill="#24140A" opacity="0.45" />

      {/* Left Roof Plane (Sunlit Ridge to Eave) */}
      <polygon points="130,12 40,84 130,132 175,70" fill="#D0684D" stroke="#381D0D" strokeWidth="1.8" />
      {/* Right Roof Plane (In Shaded Angle) */}
      <polygon points="175,70 130,132 220,84 175,22" fill="#9E462E" stroke="#381D0D" strokeWidth="1.8" />
      {/* Gable Apex Triangle */}
      <polygon points="130,12 175,70 130,132" fill="#B8543A" />

      {/* Textured Scalloped Shingle Rows */}
      <path
        d="M 60 74 L 140 118 M 80 58 L 152 98 M 100 42 L 162 78 M 116 26 L 170 58"
        stroke="#82321C"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 148 118 L 202 82 M 158 98 L 206 68 M 166 78 L 210 52"
        stroke="#6E2312"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Moss Patches Along Roof Ridge & Eaves */}
      <polygon points="126,10 134,14 178,72 172,68" fill="#5F8C52" />
      <ellipse cx="85" cy="72" rx="10" ry="4" fill="#6A9E5C" opacity="0.9" />
      <ellipse cx="180" cy="76" rx="9" ry="3.5" fill="#527D46" opacity="0.9" />

      {/* Arched Heavy Oak Front Door (Left Wall) */}
      <polygon points="98,150 120,161 120,132 98,121" fill="#5C3418" stroke="#2B1608" strokeWidth="2" />
      {/* Iron Strap Hinges */}
      <line x1="99" y1="126" x2="108" y2="131" stroke="#211005" strokeWidth="2.2" />
      <line x1="99" y1="144" x2="109" y2="149" stroke="#211005" strokeWidth="2.2" />
      {/* Brass Door Knob */}
      <circle cx="116" cy="147" r="1.8" fill="#E8B84B" />

      {/* Diamond-Leaded Bay Window with Warm Amber Glow (Left Wall) */}
      <polygon
        points="60,105 84,117 84,136 60,124"
        fill={isNight ? "#FFE07A" : "#FBF2DC"}
        stroke="#3A2111"
        strokeWidth="2"
      />
      {/* Leaded Diamond Grille */}
      <line x1="60" y1="114" x2="84" y2="127" stroke="#664422" strokeWidth="1" />
      <line x1="72" y1="105" x2="72" y2="136" stroke="#664422" strokeWidth="1.2" />
      {/* Flower Box Under Window with Blooming Roses */}
      <polygon points="58,124 86,138 86,143 58,129" fill="#542F15" stroke="#2B1608" strokeWidth="1.2" />
      <circle cx="64" cy="125" r="3.2" fill="#E84A65" />
      <circle cx="72" cy="129" r="3.5" fill="#F4ACB7" />
      <circle cx="80" cy="133" r="3.2" fill="#E84A65" />

      {/* Side Lattice Window (Right Wall in Shadow) */}
      <polygon
        points="148,142 178,126 178,108 148,124"
        fill={isNight ? "#FFDC73" : "#ECD8B4"}
        stroke="#2B1608"
        strokeWidth="2"
      />
      <line x1="163" y1="116" x2="163" y2="134" stroke="#4A2E19" strokeWidth="1.2" />

      {/* Firewood Stack along right wall */}
      <g>
        <polygon points="186,134 204,124 204,116 186,126" fill="#4A2E19" opacity="0.35" />
        <circle cx="190" cy="128" r="3" fill="#8C5835" stroke="#3A2111" strokeWidth="0.8" />
        <circle cx="196" cy="125" r="3.2" fill="#754829" stroke="#3A2111" strokeWidth="0.8" />
        <circle cx="202" cy="122" r="3" fill="#8C5835" stroke="#3A2111" strokeWidth="0.8" />
        <circle cx="193" cy="123" r="2.8" fill="#754829" stroke="#3A2111" strokeWidth="0.8" />
        <circle cx="199" cy="120" r="3" fill="#8C5835" stroke="#3A2111" strokeWidth="0.8" />
      </g>

      {/* Glowing Porch Lantern */}
      <g>
        <polygon points="122,126 126,128 126,136 122,134" fill={isNight ? "#FFEAA7" : "#E8B84B"} stroke="#3A2111" strokeWidth="1" />
        {isNight && (
          <circle cx="124" cy="132" r="18" fill="#FFEAA7" opacity="0.4" className="animate-pulse" />
        )}
      </g>
    </g>
  );
}

// ============================================================================
// 2. ISOMETRIC VICTORIAN GREENHOUSE CONSERVATORY (Faceted 3D Glass Pavilion)
// ============================================================================
export function GreenhouseBuilding({
  x = 0,
  y = 0,
  isSelected = false,
  isNight = false,
}: {
  x?: number;
  y?: number;
  isSelected?: boolean;
  isNight?: boolean;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-300 ${
        isSelected
          ? "filter drop-shadow-[0_16px_30px_rgba(232,184,75,0.9)]"
          : "filter drop-shadow-[0_18px_32px_rgba(15,25,18,0.45)]"
      }`}
    >
      {/* Ground Cast Shadow */}
      <ellipse cx="110" cy="165" rx="105" ry="30" fill="#142416" opacity="0.45" />

      {/* Terracotta Brick Foundation Plinth */}
      <polygon points="30,130 110,170 110,160 30,120" fill="#B85D3D" stroke="#682A17" strokeWidth="1.8" />
      <polygon points="110,170 190,130 190,120 110,160" fill="#943F24" stroke="#682A17" strokeWidth="1.8" />
      {/* Brick mortar course lines */}
      <line x1="30" y1="125" x2="110" y2="165" stroke="#541F10" strokeWidth="1" />
      <line x1="110" y1="165" x2="190" y2="125" stroke="#541F10" strokeWidth="1" />

      {/* Faceted Translucent Glass Walls */}
      {/* Left Front Glass Facade (Sunlit Aquamarine) */}
      <polygon
        points="32,75 110,115 110,160 32,120"
        fill={isNight ? "#1C3632" : "#D4ECE7"}
        fillOpacity={isNight ? 0.92 : 0.82}
        stroke="#274233"
        strokeWidth="2.5"
      />
      {/* Right Front Glass Facade (Shadowed) */}
      <polygon
        points="110,115 188,75 188,120 110,160"
        fill={isNight ? "#142926" : "#BFDFDA"}
        fillOpacity={isNight ? 0.92 : 0.82}
        stroke="#274233"
        strokeWidth="2.5"
      />

      {/* Lush Tropical Interior Flora Visible Through Glass */}
      <g opacity="0.88">
        {/* Giant Monstera Leaves & Fan Palms */}
        <path d="M 60 140 Q 45 105 65 90 Q 75 110 70 140" fill="#245930" />
        <path d="M 85 148 Q 70 100 88 85 Q 100 108 95 148" fill="#2D6E3C" />
        <path d="M 130 148 Q 145 95 132 82 Q 120 105 125 148" fill="#1F4D2A" />
        <path d="M 155 138 Q 170 105 152 92 Q 140 112 145 138" fill="#296336" />
        {/* Hanging Macrame Fern Baskets */}
        <ellipse cx="78" cy="88" rx="8" ry="4" fill="#6B4126" />
        <path d="M 78 84 L 78 68" stroke="#274233" strokeWidth="1.2" />
        <circle cx="78" cy="90" r="8" fill="#3D8F4E" opacity="0.85" />

        <ellipse cx="142" cy="88" rx="8" ry="4" fill="#6B4126" />
        <path d="M 142 84 L 142 68" stroke="#274233" strokeWidth="1.2" />
        <circle cx="142" cy="90" r="8" fill="#3D8F4E" opacity="0.85" />
      </g>

      {/* Arched Glass Entrance Portico (Center) */}
      <polygon points="94,152 126,168 126,122 94,106" fill={isNight ? "#2E524A" : "#E2F4F1"} stroke="#274233" strokeWidth="2.2" />
      <line x1="110" y1="114" x2="110" y2="160" stroke="#274233" strokeWidth="2" />
      {/* Brass handles */}
      <circle cx="107" cy="140" r="1.5" fill="#E8B84B" />
      <circle cx="113" cy="143" r="1.5" fill="#E8B84B" />

      {/* Victorian Wrought-Iron Astragals & Glass Ribs */}
      <line x1="58" y1="88" x2="58" y2="133" stroke="#274233" strokeWidth="2" />
      <line x1="84" y1="102" x2="84" y2="147" stroke="#274233" strokeWidth="2" />
      <line x1="136" y1="102" x2="136" y2="147" stroke="#274233" strokeWidth="2" />
      <line x1="162" y1="88" x2="162" y2="133" stroke="#274233" strokeWidth="2" />

      {/* Faceted Glass Mansard Roof */}
      <polygon points="110,24 32,75 110,115" fill={isNight ? "#1C3632" : "#DCEEEB"} stroke="#274233" strokeWidth="2.5" />
      <polygon points="110,24 110,115 188,75" fill={isNight ? "#142926" : "#BEDBD6"} stroke="#274233" strokeWidth="2.5" />
      {/* Glass Roof Struts */}
      <line x1="71" y1="50" x2="110" y2="115" stroke="#274233" strokeWidth="1.8" />
      <line x1="149" y1="50" x2="110" y2="115" stroke="#274233" strokeWidth="1.8" />

      {/* Verdigris Copper Cupola & Sprout Finial */}
      <polygon points="102,28 110,20 118,28 110,32" fill="#588C78" stroke="#274233" strokeWidth="1.8" />
      <line x1="110" y1="20" x2="110" y2="6" stroke="#274233" strokeWidth="2.5" />
      {/* Botanical Sprout Finial */}
      <path d="M 110 6 Q 102 0 106 -6 Q 114 -2 110 6" fill="#75BA84" />
      <path d="M 110 6 Q 118 0 114 -6 Q 106 -2 110 6" fill="#8CE09D" />

      {/* Entrance Terracotta Urns with Blooming Blue Hydrangeas */}
      <polygon points="80,150 90,155 90,165 80,160" fill="#BA5E43" stroke="#682A17" strokeWidth="1.2" />
      <circle cx="85" cy="148" r="8" fill="#6A8CE8" />
      <circle cx="85" cy="147" r="5" fill="#8FAAF5" />

      <polygon points="130,155 140,150 140,160 130,165" fill="#BA5E43" stroke="#682A17" strokeWidth="1.2" />
      <circle cx="135" cy="148" r="8" fill="#8B70B8" />

      {isNight && (
        <circle cx="110" cy="105" r="42" fill="#8AFFB5" opacity="0.25" className="animate-pulse" />
      )}
    </g>
  );
}

// ============================================================================
// 3. ISOMETRIC SCHOLAR LIBRARY (2.5D Jetty Bookhouse & Glowing Bay Window)
// ============================================================================
export function LibraryBuilding({
  x = 0,
  y = 0,
  isSelected = false,
  isNight = false,
}: {
  x?: number;
  y?: number;
  isSelected?: boolean;
  isNight?: boolean;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-300 ${
        isSelected
          ? "filter drop-shadow-[0_16px_30px_rgba(232,184,75,0.9)]"
          : "filter drop-shadow-[0_18px_32px_rgba(15,25,18,0.45)]"
      }`}
    >
      {/* Ground Shadow */}
      <polygon points="40,160 180,185 240,150 160,135 60,140" fill="#142416" opacity="0.45" />

      {/* Ground Floor: Ancient Ashlar Limestone Masonry */}
      <polygon points="50,95 125,135 125,168 50,128" fill="#9C9283" stroke="#4F463B" strokeWidth="1.8" />
      <polygon points="125,135 200,95 200,128 125,168" fill="#7D7467" stroke="#4F463B" strokeWidth="1.8" />
      {/* Ashlar Masonry Joints */}
      <line x1="50" y1="106" x2="125" y2="146" stroke="#5E564A" strokeWidth="1.2" />
      <line x1="50" y1="117" x2="125" y2="157" stroke="#5E564A" strokeWidth="1.2" />
      <line x1="125" y1="146" x2="200" y2="106" stroke="#5E564A" strokeWidth="1.2" />
      <line x1="125" y1="157" x2="200" y2="117" stroke="#5E564A" strokeWidth="1.2" />

      {/* Upper Floor Jetty (Overhanging Timber-Framed Story) */}
      {/* Overhang Shadow */}
      <polygon points="42,98 125,142 208,98 200,95 125,135 50,95" fill="#24180F" opacity="0.4" />
      {/* Jetty Left Face (Sunlit Plaster & Timber) */}
      <polygon points="42,50 125,95 125,138 42,93" fill="#FAF4E8" stroke="#3D291C" strokeWidth="2" />
      {/* Jetty Right Face (Shadowed) */}
      <polygon points="125,95 208,50 208,93 125,138" fill="#D8CEBD" stroke="#3D291C" strokeWidth="2" />

      {/* Carved Jetty Support Brackets */}
      <polygon points="50,93 58,97 54,105" fill="#4A2E19" />
      <polygon points="85,112 93,116 89,124" fill="#4A2E19" />
      <polygon points="120,131 128,135 124,143" fill="#4A2E19" />
      <polygon points="160,116 168,112 164,124" fill="#4A2E19" />
      <polygon points="195,97 203,93 199,105" fill="#4A2E19" />

      {/* Timber Studs on Jetty */}
      <line x1="42" y1="50" x2="42" y2="93" stroke="#4A2E19" strokeWidth="4" />
      <line x1="125" y1="95" x2="125" y2="138" stroke="#4A2E19" strokeWidth="4.5" />
      <line x1="208" y1="50" x2="208" y2="93" stroke="#382110" strokeWidth="4" />
      <line x1="84" y1="73" x2="84" y2="116" stroke="#4A2E19" strokeWidth="3.5" />
      <line x1="166" y1="73" x2="166" y2="116" stroke="#382110" strokeWidth="3.5" />

      {/* Weathered Slate Mansard Roof */}
      <polygon points="125,8 34,54 125,102 170,42" fill="#586E75" stroke="#251A12" strokeWidth="1.8" />
      <polygon points="170,42 125,102 216,54 170,14" fill="#405359" stroke="#251A12" strokeWidth="1.8" />
      {/* Slate Course Lines */}
      <path
        d="M 52 45 L 134 89 M 70 33 L 144 73 M 90 21 L 154 57"
        stroke="#2E3C40"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 144 89 L 198 59 M 154 73 L 202 47"
        stroke="#253236"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Gabled Slate Dormer Window */}
      <polygon points="100,26 88,40 112,40" fill="#754829" stroke="#3D2413" strokeWidth="1.5" />
      <polygon points="88,40 112,40 112,54 88,54" fill={isNight ? "#FFEAA7" : "#FAF2DA"} stroke="#3D2413" strokeWidth="1.5" />

      {/* Arched Stone Doorway (Left Ground Floor) */}
      <polygon points="62,118 84,130 84,158 62,146" fill="#573117" stroke="#2D180A" strokeWidth="2.2" />
      <circle cx="73" cy="140" r="2.8" fill="none" stroke="#D4A373" strokeWidth="1.2" />

      {/* Projecting Bookshelf Bay Window with Warm Amber Glow (Left Wall) */}
      <polygon
        points="94,135 122,150 122,125 94,110"
        fill={isNight ? "#FFECA8" : "#FBF3DE"}
        stroke="#3D2413"
        strokeWidth="2.5"
      />
      {/* Multi-Colored Leatherbound Books in Bay Window */}
      <rect x="98" y="118" width="4.5" height="15" rx="1" fill="#C94736" />
      <rect x="103.5" y="121" width="5.5" height="17" rx="1" fill="#2E6641" />
      <rect x="110" y="124" width="4.5" height="14" rx="1" fill="#B98B32" />
      <rect x="115.5" y="127" width="4.5" height="16" rx="1" fill="#4B3B6B" />

      {/* Hanging Carved Wooden Open-Book Signboard */}
      <g>
        <line x1="42" y1="75" x2="26" y2="67" stroke="#2B1B10" strokeWidth="2.5" />
        <line x1="28" y1="68" x2="28" y2="76" stroke="#2B1B10" strokeWidth="1.8" />
        <line x1="36" y1="72" x2="36" y2="80" stroke="#2B1B10" strokeWidth="1.8" />
        <polygon points="20,74 44,86 44,106 20,94" fill="#D4A373" stroke="#4A2E19" strokeWidth="1.8" />
        {/* Open Book Glyph */}
        <path
          d="M 26 84 Q 32 81 38 84 M 26 89 Q 32 86 38 89 M 32 82 L 32 91"
          stroke="#4A2E19"
          strokeWidth="1.5"
          fill="none"
        />
      </g>

      {/* Climbing Purple Wisteria Vine on Stone Wall */}
      <path
        d="M 52 148 Q 48 125 54 110 Q 58 98 52 85"
        stroke="#4F7A46"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="53" cy="118" r="3" fill="#9B7CC4" />
      <circle cx="55" cy="125" r="2.5" fill="#B49CD6" />
      <circle cx="51" cy="102" r="3" fill="#9B7CC4" />
      <circle cx="50" cy="109" r="2.5" fill="#B49CD6" />
    </g>
  );
}

// ============================================================================
// 4. ISOMETRIC INVENTOR'S WORKSHOP (Timber Siding, Waterwheel & Blueprint Shed)
// ============================================================================
export function WorkshopBuilding({
  x = 0,
  y = 0,
  isSelected = false,
  isNight = false,
}: {
  x?: number;
  y?: number;
  isSelected?: boolean;
  isNight?: boolean;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-300 ${
        isSelected
          ? "filter drop-shadow-[0_16px_30px_rgba(232,184,75,0.9)]"
          : "filter drop-shadow-[0_18px_32px_rgba(15,25,18,0.45)]"
      }`}
    >
      {/* Ground Cast Shadow */}
      <polygon points="30,165 170,190 230,155 150,140 50,145" fill="#142416" opacity="0.45" />

      {/* Main Workshop Building: Rich Cedar Clapboard Siding */}
      {/* Left Wall Facade (Sunlit Cedar) */}
      <polygon points="40,85 120,125 120,165 40,125" fill="#875334" stroke="#452714" strokeWidth="2.2" />
      {/* Right Wall Facade (Shadowed) */}
      <polygon points="120,125 190,90 190,130 120,165" fill="#6B3E23" stroke="#452714" strokeWidth="2.2" />

      {/* Horizontal Weatherboard Planks */}
      <line x1="40" y1="95" x2="120" y2="135" stroke="#542F17" strokeWidth="1.5" />
      <line x1="40" y1="105" x2="120" y2="145" stroke="#542F17" strokeWidth="1.5" />
      <line x1="40" y1="115" x2="120" y2="155" stroke="#542F17" strokeWidth="1.5" />
      <line x1="120" y1="135" x2="190" y2="100" stroke="#472613" strokeWidth="1.5" />
      <line x1="120" y1="145" x2="190" y2="110" stroke="#472613" strokeWidth="1.5" />
      <line x1="120" y1="155" x2="190" y2="120" stroke="#472613" strokeWidth="1.5" />

      {/* Asymmetric Corrugated Tin Roof with Skylights */}
      <polygon points="120,28 32,82 120,128 155,70" fill="#6A7A6E" stroke="#2D1C10" strokeWidth="2" />
      <polygon points="155,70 120,128 198,88 160,30" fill="#4E5C52" stroke="#2D1C10" strokeWidth="2" />

      {/* Glass Skylight on Roof */}
      <polygon points="76,68 104,82 104,70 76,56" fill={isNight ? "#FFEAA7" : "#D4E8E4"} stroke="#2D1C10" strokeWidth="1.5" />

      {/* Brass Rooster Weather-Vane on Roof Ridge */}
      <g>
        <line x1="120" y1="28" x2="120" y2="14" stroke="#87651C" strokeWidth="2" />
        <ellipse cx="120" cy="12" rx="4" ry="2.5" fill="#E8B84B" />
        <polygon points="117,12 113,10 117,8" fill="#E8B84B" />
        <path d="M 122 11 Q 126 6 124 12" stroke="#E8B84B" strokeWidth="1.5" fill="none" />
      </g>

      {/* Interlocking Brass Clockwork Gears Emblem */}
      <g>
        <circle cx="80" cy="105" r="10" fill="#E8B84B" stroke="#87651C" strokeWidth="1.8" />
        <circle cx="80" cy="105" r="4" fill="#875334" />
        <circle cx="94" cy="98" r="6" fill="#C29230" stroke="#735212" strokeWidth="1.5" />
      </g>

      {/* Double Sliding Barn Doors with Cross-Bracing */}
      <polygon points="65,115 105,135 105,158 65,138" fill="#522D16" stroke="#2B160A" strokeWidth="2" />
      <line x1="65" y1="115" x2="105" y2="158" stroke="#2B160A" strokeWidth="1.8" />
      <line x1="105" y1="135" x2="65" y2="138" stroke="#2B160A" strokeWidth="1.8" />
      <line x1="85" y1="125" x2="85" y2="148" stroke="#2B160A" strokeWidth="2" />

      {/* Attached Open Lean-To Tool Shed (Right Side) */}
      <polygon points="190,90 225,108 225,148 190,130" fill="#FAF4E8" opacity="0.12" />
      <line x1="188" y1="90" x2="227" y2="110" stroke="#452714" strokeWidth="4" strokeLinecap="round" />
      <line x1="225" y1="110" x2="225" y2="150" stroke="#452714" strokeWidth="3.2" />

      {/* Outdoor Inventor's Workbench with Blueprint & Tools */}
      <polygon points="192,122 222,137 222,143 192,128" fill="#693C20" stroke="#381D0C" strokeWidth="1.8" />
      <line x1="196" y1="128" x2="196" y2="150" stroke="#381D0C" strokeWidth="2.5" />
      <line x1="218" y1="139" x2="218" y2="154" stroke="#381D0C" strokeWidth="2.5" />
      {/* Unrolled Blueprint Scroll */}
      <polygon points="196,120 216,130 216,134 196,124" fill="#C5DDE8" stroke="#356680" strokeWidth="1" />
    </g>
  );
}

// ============================================================================
// 5. ISOMETRIC GARDEN MAILBOX & SIGNPOST
// ============================================================================
export function MailboxObject({
  x = 0,
  y = 0,
  isSelected = false,
}: {
  x?: number;
  y?: number;
  isSelected?: boolean;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-300 ${
        isSelected
          ? "filter drop-shadow-[0_10px_20px_rgba(232,184,75,0.95)]"
          : "filter drop-shadow-[0_12px_18px_rgba(20,30,20,0.35)]"
      }`}
    >
      <ellipse cx="35" cy="85" rx="32" ry="10" fill="#142416" opacity="0.4" />
      {/* Weathered Post */}
      <rect x="28" y="24" width="9" height="62" rx="2" fill="#754829" stroke="#452714" strokeWidth="2.2" />
      {/* Morning Glory Vine */}
      <path d="M 28 80 Q 34 68 37 54 Q 32 40 28 26" stroke="#4F7A46" strokeWidth="2.2" fill="none" />
      <circle cx="29" cy="65" r="2.8" fill="#62A872" />
      <circle cx="36" cy="48" r="2.8" fill="#62A872" />
      <circle cx="31" cy="36" r="3" fill="#6B8AE8" />

      {/* Curved Mailbox Box */}
      <path
        d="M 14 18 Q 14 2 32 2 Q 50 2 50 18 L 50 36 L 14 36 Z"
        fill="#FAF5E8"
        stroke="#452714"
        strokeWidth="2.5"
      />
      {/* Letter Peeking out with Red Wax Seal */}
      <rect x="20" y="16" width="24" height="6" rx="1" fill="#EAE2CE" stroke="#452714" strokeWidth="1" />
      <polygon points="23,16 32,21 41,16" fill="#FFF" stroke="#452714" strokeWidth="1" />
      <circle cx="32" cy="19.5" r="2" fill="#C94736" />

      {/* Raised Brass Red Flag */}
      <rect x="49" y="8" width="3.5" height="22" fill="#754829" />
      <polygon points="52.5,8 68,14 52.5,20" fill="#D05545" stroke="#942E20" strokeWidth="1.2" />

      {/* Perched Mountain Bluebird */}
      <g>
        <ellipse cx="33" cy="-2" rx="6" ry="4" fill="#4B85A8" />
        <circle cx="37" cy="-4" r="3.5" fill="#62A0C7" />
        <polygon points="40,-4 44,-3 40,-2" fill="#E8B84B" />
        <circle cx="38" cy="-5" r="0.9" fill="#1A1A1A" />
      </g>

      {/* Handcrafted Fingerboard Directional Signs */}
      <g transform="translate(10, 48)">
        <polygon points="0,0 16,0 20,4 16,8 0,8" fill="#D4A373" stroke="#452714" strokeWidth="1.2" />
        <polygon points="36,10 20,10 16,14 20,18 36,18" fill="#D4A373" stroke="#452714" strokeWidth="1.2" />
      </g>
    </g>
  );
}

// ============================================================================
// 6. ISOMETRIC SECLUDED SPRING POND & SLEEPING CALICO FAMILIAR
// ============================================================================
export function PondDiorama({
  x = 0,
  y = 0,
  isSelected = false,
  isNight = false,
}: {
  x?: number;
  y?: number;
  isSelected?: boolean;
  isNight?: boolean;
}) {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`transition-all duration-300 ${
        isSelected
          ? "filter drop-shadow-[0_16px_30px_rgba(232,184,75,0.9)]"
          : "filter drop-shadow-[0_14px_24px_rgba(15,25,18,0.38)]"
      }`}
    >
      {/* Outer Pond Bank Shadow */}
      <ellipse cx="160" cy="100" rx="165" ry="85" fill="#142416" opacity="0.45" />

      {/* Layered Mossy River Boulder Basin Rim */}
      <path
        d="M 20 85 C 15 50, 70 20, 150 18 C 230 16, 305 45, 300 85 C 295 130, 240 165, 160 168 C 80 170, 25 125, 20 85 Z"
        fill="#7A6F62"
        stroke="#4F4539"
        strokeWidth="3.5"
      />
      <path
        d="M 28 85 C 24 55, 75 28, 150 26 C 225 24, 295 50, 290 85 C 285 124, 235 158, 160 160 C 85 162, 32 120, 28 85 Z"
        fill="#55734E"
      />

      {/* Crystal Clear Spring Water Fill (Shallow Margin) */}
      <path
        d="M 34 85 C 30 58, 78 34, 150 32 C 222 30, 286 54, 282 85 C 278 120, 228 152, 160 154 C 92 156, 38 116, 34 85 Z"
        fill={isNight ? "#203A3E" : "#51858A"}
      />
      {/* Deep Spring Center (Darker Emerald Depth) */}
      <path
        d="M 65 85 C 62 64, 98 46, 150 45 C 202 44, 250 62, 246 85 C 242 110, 206 134, 155 135 C 104 136, 68 108, 65 85 Z"
        fill={isNight ? "#142629" : "#326166"}
        opacity="0.9"
      />

      {/* Swimming Orange & White Koi Fish */}
      <g>
        {/* Koi 1 */}
        <path d="M 120 75 Q 135 70 145 74 Q 135 80 120 75" fill="#E86A38" />
        <circle cx="123" cy="74.5" r="1.5" fill="#FFF" />
        <path d="M 145 74 L 152 70 L 150 78 Z" fill="#E86A38" opacity="0.8" />

        {/* Koi 2 */}
        <path d="M 170 95 Q 185 92 195 96 Q 185 102 170 95" fill="#FAF5E8" />
        <circle cx="178" cy="95" r="2.5" fill="#E84A38" />
        <path d="M 195 96 L 202 92 L 200 100 Z" fill="#FAF5E8" opacity="0.8" />
      </g>

      {/* Translucent Caustic Water Ripples */}
      <g stroke={isNight ? "#4D7F85" : "#A8D8DD"} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M 80 72 Q 130 64 175 72" />
        <path d="M 120 90 Q 165 82 205 90" />
        <path d="M 95 110 Q 145 102 185 110" />
      </g>

      {/* Floating Water Lily Pads with Notch Cuts & Blooming Lotuses */}
      <g>
        <path d="M 85 65 A 16 10 0 1 1 80 72 L 85 68 Z" fill="#2C6937" stroke="#1A4523" strokeWidth="1.5" />
        <circle cx="82" cy="62" r="5.5" fill="#F4ACB7" />
        <circle cx="82" cy="61" r="3.2" fill="#FFE5EC" />
        <circle cx="82" cy="61" r="1.5" fill="#E8B84B" />

        <path d="M 205 105 A 18 11 0 1 1 200 114 L 205 109 Z" fill="#357D43" stroke="#1A4523" strokeWidth="1.5" />
        <circle cx="202" cy="102" r="6" fill="#F4ACB7" />
        <circle cx="202" cy="101" r="3.5" fill="#FFE5EC" />
        <circle cx="202" cy="101" r="1.5" fill="#E8B84B" />

        <path d="M 140 128 A 15 9 0 1 1 135 135 L 140 131 Z" fill="#2C6937" stroke="#1A4523" strokeWidth="1.5" />
      </g>

      {/* The Sleeping Calico Cat on Flat Warm River Boulder */}
      <ellipse cx="50" cy="115" rx="25" ry="16" fill="#8C8172" stroke="#544B3F" strokeWidth="2" />
      <g>
        <ellipse cx="52" cy="112" rx="14" ry="9" fill="#FAF5E8" stroke="#7A6046" strokeWidth="1.5" />
        <path d="M 45 106 Q 50 106 49 114 Q 44 113 45 106" fill="#D0684D" />
        <path d="M 54 111 Q 60 109 58 116 Q 53 115 54 111" fill="#3D2E24" />
        <path d="M 62 116 Q 66 119 64 123" stroke="#D0684D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <polygon points="38,106 42,102 42,108" fill="#D0684D" />
        <polygon points="44,104 48,101 47,107" fill="#3D2E24" />
      </g>

      {/* Clustered Cattails / Bulrushes along Bank */}
      <g stroke="#3E6B46" strokeWidth="2.2" fill="none">
        <line x1="270" y1="65" x2="272" y2="28" />
        <line x1="279" y1="68" x2="284" y2="22" />
        <line x1="288" y1="72" x2="292" y2="34" />
      </g>
      <rect x="270.5" y="28" width="3.5" height="15" rx="1.8" fill="#5E381E" />
      <rect x="282.5" y="22" width="3.5" height="17" rx="1.8" fill="#5E381E" />
      <rect x="290.5" y="34" width="3.5" height="14" rx="1.8" fill="#5E381E" />
    </g>
  );
}

// ============================================================================
// 7. VOLUMETRIC ISOMETRIC NATURE ASSETS
// ============================================================================

export function OakTree({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="70" cy="155" rx="65" ry="20" fill="#142416" opacity="0.4" />
      {/* Twisted Trunk & Roots */}
      <path
        d="M 52 155 C 56 125 50 100 44 80 C 60 84 76 84 92 80 C 86 100 80 125 84 155 Z"
        fill="#5E3E26"
        stroke="#3A2414"
        strokeWidth="2.5"
      />
      <path d="M 52 155 Q 38 158 32 162" stroke="#3A2414" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 84 155 Q 98 158 106 162" stroke="#3A2414" strokeWidth="3.5" strokeLinecap="round" />

      {/* Volumetric Layered Cloud Foliage */}
      <circle cx="40" cy="65" r="36" fill="#24472A" />
      <circle cx="95" cy="65" r="36" fill="#24472A" />
      <circle cx="68" cy="42" r="42" fill="#24472A" />

      <circle cx="48" cy="56" r="32" fill="#3D7045" />
      <circle cx="88" cy="56" r="32" fill="#3D7045" />
      <circle cx="68" cy="36" r="35" fill="#488051" />

      <circle cx="42" cy="45" r="22" fill="#62A36B" opacity="0.9" />
      <circle cx="80" cy="42" r="20" fill="#62A36B" opacity="0.9" />
      <circle cx="66" cy="24" r="24" fill="#78BA82" opacity="0.95" />
    </g>
  );
}

export function PineTree({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="32" cy="125" rx="28" ry="9" fill="#142416" opacity="0.38" />
      <rect x="29" y="92" width="7" height="34" rx="2" fill="#4F331F" stroke="#301E11" strokeWidth="1.5" />
      <polygon points="32,60 4,100 60,100" fill="#1E3E28" stroke="#122619" strokeWidth="2" />
      <polygon points="32,60 32,100 60,100" fill="#16301F" />
      <polygon points="32,38 10,72 54,72" fill="#275034" stroke="#122619" strokeWidth="2" />
      <polygon points="32,38 32,72 54,72" fill="#1F3F29" />
      <polygon points="32,12 16,46 48,46" fill="#346844" stroke="#122619" strokeWidth="2" />
      <polygon points="32,12 32,46 48,46" fill="#295436" />
    </g>
  );
}

export function AppleTree({ x = 0, y = 0, scale = 1 }: { x?: number; y?: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <ellipse cx="55" cy="135" rx="46" ry="14" fill="#142416" opacity="0.35" />
      <path
        d="M 46 135 C 50 110 44 95 40 75 C 52 78 62 78 70 75 C 66 95 62 110 64 135 Z"
        fill="#5E3E26"
        stroke="#3A2414"
        strokeWidth="2.2"
      />
      <circle cx="34" cy="55" r="26" fill="#3F6B45" />
      <circle cx="74" cy="55" r="26" fill="#3F6B45" />
      <circle cx="54" cy="38" r="30" fill="#528559" />

      <circle cx="38" cy="45" r="3.5" fill="#F4ACB7" />
      <circle cx="48" cy="32" r="3.5" fill="#FFE5EC" />
      <circle cx="68" cy="40" r="3.5" fill="#F4ACB7" />
      <circle cx="34" cy="62" r="3.2" fill="#D04242" />
      <circle cx="56" cy="58" r="3.2" fill="#D04242" />
      <circle cx="66" cy="66" r="3.2" fill="#D04242" />
    </g>
  );
}

export function VegetablePatch({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon points="0,20 40,0 80,20 40,40" fill="#4A3423" stroke="#2B1D12" strokeWidth="1.8" />
      {/* Cabbages */}
      <circle cx="20" cy="15" r="5" fill="#4D8F5A" stroke="#2D5E37" strokeWidth="1" />
      <circle cx="40" cy="12" r="5.5" fill="#4D8F5A" stroke="#2D5E37" strokeWidth="1" />
      <circle cx="60" cy="15" r="5" fill="#4D8F5A" stroke="#2D5E37" strokeWidth="1" />
      {/* Carrots */}
      <circle cx="25" cy="26" r="4" fill="#3D7D4A" />
      <circle cx="25" cy="25" r="1.8" fill="#E87635" />
      <circle cx="45" cy="24" r="4" fill="#3D7D4A" />
      <circle cx="45" cy="23" r="1.8" fill="#E87635" />
      <circle cx="65" cy="26" r="4" fill="#3D7D4A" />
      <circle cx="65" cy="25" r="1.8" fill="#E87635" />
    </g>
  );
}

export function LavenderHedge({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="14" cy="10" r="9" fill="#3E6B47" />
      <circle cx="30" cy="8" r="10" fill="#4B7E55" />
      <circle cx="46" cy="10" r="9" fill="#3E6B47" />
      <line x1="12" y1="10" x2="12" y2="0" stroke="#7A5EA8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="8" x2="20" y2="-2" stroke="#8E72BD" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="28" y1="6" x2="28" y2="-4" stroke="#7A5EA8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="36" y1="8" x2="36" y2="-2" stroke="#8E72BD" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="10" x2="44" y2="0" stroke="#7A5EA8" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

export function WildflowerCluster({ x = 0, y = 0, color = "#F4ACB7" }: { x?: number; y?: number; color?: string }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle cx="12" cy="10" r="8" fill="#4B7A52" />
      <circle cx="26" cy="10" r="8" fill="#4B7A52" />
      <circle cx="19" cy="6" r="9" fill="#5A8F62" />
      <circle cx="12" cy="7" r="3" fill={color} />
      <circle cx="26" cy="8" r="3" fill={color} />
      <circle cx="19" cy="3" r="3.5" fill={color} />
    </g>
  );
}

export function MushroomGrove({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x="18" y="10" width="5" height="14" rx="2" fill="#FAF5E8" stroke="#D1C3AB" strokeWidth="1" />
      <path d="M 6 12 Q 20 -2 34 12 Z" fill="#D05545" stroke="#942E20" strokeWidth="1.8" />
      <circle cx="12" cy="7" r="1.8" fill="#FAF5E8" />
      <circle cx="21" cy="5" r="2.2" fill="#FAF5E8" />
      <circle cx="28" cy="9" r="1.5" fill="#FAF5E8" />
      <rect x="6" y="14" width="3.5" height="10" rx="1.5" fill="#FAF5E8" />
      <path d="M 0 16 Q 8 6 16 16 Z" fill="#E8B84B" stroke="#A87E1F" strokeWidth="1.2" />
    </g>
  );
}

export function GardenBench({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="28" cy="24" rx="28" ry="7" fill="#142416" opacity="0.32" />
      <path d="M 8 14 L 8 24 M 48 14 L 48 24 M 16 14 L 16 24 M 40 14 L 40 24" stroke="#2B1D12" strokeWidth="3" strokeLinecap="round" />
      <rect x="4" y="11" width="48" height="4.5" rx="1.5" fill="#754829" stroke="#3D2413" strokeWidth="1.5" />
      <rect x="4" y="3" width="48" height="4.5" rx="1.5" fill="#754829" stroke="#3D2413" strokeWidth="1.5" />
      <rect x="4" y="7.5" width="48" height="2" rx="1" fill="#5E381E" />
    </g>
  );
}

export function StoneLantern({ x = 0, y = 0, isNight = false }: { x?: number; y?: number; isNight?: boolean }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <ellipse cx="14" cy="40" rx="16" ry="6" fill="#142416" opacity="0.35" />
      <rect x="7" y="34" width="14" height="6" rx="2" fill="#8C8172" stroke="#544B3F" strokeWidth="1.5" />
      <rect x="11" y="24" width="6" height="11" rx="1" fill="#9C9182" stroke="#544B3F" strokeWidth="1.2" />
      <rect x="7" y="13" width="14" height="11" rx="2" fill={isNight ? "#FFEAA7" : "#F6EBD5"} stroke="#544B3F" strokeWidth="1.8" />
      {isNight && <circle cx="14" cy="18" r="18" fill="#FFEAA7" opacity="0.4" className="animate-pulse" />}
      <polygon points="14,4 0,13 28,13" fill="#786E60" stroke="#453D32" strokeWidth="1.8" />
      <circle cx="14" cy="3" r="2.5" fill="#9C9182" stroke="#453D32" strokeWidth="1" />
    </g>
  );
}

export function RusticFence({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1="0" y1="9" x2="65" y2="9" stroke="#664126" strokeWidth="3" strokeLinecap="round" />
      <line x1="0" y1="19" x2="65" y2="19" stroke="#664126" strokeWidth="3" strokeLinecap="round" />
      <rect x="4" y="2" width="6" height="24" rx="2" fill="#7A4D2E" stroke="#3D2413" strokeWidth="1.5" />
      <rect x="30" y="2" width="6" height="24" rx="2" fill="#7A4D2E" stroke="#3D2413" strokeWidth="1.5" />
      <rect x="56" y="2" width="6" height="24" rx="2" fill="#7A4D2E" stroke="#3D2413" strokeWidth="1.5" />
    </g>
  );
}
