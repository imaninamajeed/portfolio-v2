import styles from "./hero-portrait.module.css";

/**
 * Original hand-built SVG portrait (no third-party art).
 * Night scene in the dark theme, day scene in the light theme: the scene colours are
 * CSS variables in hero-portrait.module.css, so no JS or second SVG is needed.
 */
export function HeroPortrait() {
  return (
    <svg
      className={styles.art}
      viewBox="0 0 480 480"
      role="img"
      aria-label="Illustrated portrait of Imanina, with long dark hair and a pink top, coding on a laptop at night beside a city skyline window"
    >
      <defs>
        <pattern id="pt-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path className={styles.gridLine} d="M24 0H0V24" fill="none" />
        </pattern>
        <radialGradient id="pt-room" cx="50%" cy="78%" r="70%">
          <stop offset="0" className={styles.room1} />
          <stop offset=".45" className={styles.room2} />
          <stop offset="1" className={styles.room3} />
        </radialGradient>
        <radialGradient id="pt-screenlight" cx="50%" cy="100%" r="80%">
          <stop offset="0" stopColor="#C8FF3D" stopOpacity=".55" />
          <stop offset=".6" stopColor="#7CE7FF" stopOpacity=".12" />
          <stop offset="1" stopColor="#7CE7FF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pt-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3A4256" />
          <stop offset="1" stopColor="#232937" />
        </linearGradient>
        <linearGradient id="pt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={styles.sky1} />
          <stop offset="1" className={styles.sky2} />
        </linearGradient>
        <radialGradient id="pt-back" cx="50%" cy="50%" r="50%">
          <stop offset="0" className={styles.back} stopOpacity=".28" />
          <stop offset=".6" className={styles.back} stopOpacity=".07" />
          <stop offset="1" className={styles.back} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pt-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6D8" stopOpacity=".7" />
          <stop offset="1" stopColor="#FFF6D8" stopOpacity="0" />
        </linearGradient>
        <clipPath id="pt-face">
          <ellipse cx="240" cy="200" rx="56" ry="62" />
        </clipPath>
        <clipPath id="pt-win">
          <rect x="44" y="84" width="148" height="112" rx="8" />
        </clipPath>
        <filter id="pt-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Room */}
      <rect width="480" height="480" fill="url(#pt-room)" />
      <rect width="480" height="480" fill="url(#pt-grid)" />

      {/* Window with night skyline */}
      <rect x="44" y="84" width="148" height="112" rx="8" fill="url(#pt-sky)" />
      <g clipPath="url(#pt-win)">
        {/* Night: crescent moon */}
        <g className={styles.night}>
          <circle cx="160" cy="110" r="10" fill="#EEF1F5" opacity=".85" />
          <circle cx="155" cy="106" r="9" fill="#141E36" />
        </g>
        {/* Day: sun and clouds */}
        <g className={styles.day}>
          <circle cx="160" cy="108" r="17" fill="#FFE29A" opacity=".45" />
          <circle cx="160" cy="108" r="10" fill="#FFD25E" />
          <g fill="#FFFFFF" opacity=".9">
            <ellipse cx="82" cy="110" rx="16" ry="6" />
            <ellipse cx="92" cy="105" rx="10" ry="7" />
            <ellipse cx="128" cy="126" rx="12" ry="4.5" />
          </g>
        </g>
        <g className={styles.city}>
          <rect x="44" y="150" width="26" height="50" />
          <rect x="72" y="128" width="20" height="72" />
          <rect x="94" y="142" width="28" height="58" />
          <rect x="124" y="120" width="18" height="80" />
          <rect x="144" y="146" width="24" height="54" />
          <rect x="170" y="134" width="22" height="66" />
        </g>
        <g className={styles.lights}>
        <g fill="#C8FF3D">
          <rect x="78" y="136" width="3" height="3">
            <animate attributeName="opacity" values="1;.2;1" dur="3.2s" repeatCount="indefinite" />
          </rect>
          <rect x="84" y="150" width="3" height="3" />
          <rect x="128" y="130" width="3" height="3" />
          <rect x="134" y="160" width="3" height="3">
            <animate attributeName="opacity" values=".2;1;.2" dur="4.1s" repeatCount="indefinite" />
          </rect>
          <rect x="176" y="146" width="3" height="3" />
        </g>
        <g fill="#7CE7FF">
          <rect x="100" y="152" width="3" height="3" />
          <rect x="108" y="168" width="3" height="3">
            <animate attributeName="opacity" values="1;.3;1" dur="2.6s" repeatCount="indefinite" />
          </rect>
          <rect x="150" y="158" width="3" height="3" />
          <rect x="52" y="162" width="3" height="3" />
          <rect x="182" y="172" width="3" height="3" />
        </g>
        </g>
      </g>
      <rect className={styles.frame} x="44" y="84" width="148" height="112" rx="8" fill="none" strokeWidth="3" />
      <path className={styles.frame} d="M118 84V196M44 140H192" strokeWidth="2" />

      {/* Day: sunbeam falling into the room */}
      <path className={styles.beam} d="M46 196 L190 196 L310 448 L150 448 Z" fill="url(#pt-beam)" />

      {/* Shelf with books and plant */}
      <path className={styles.frame} d="M330 150H446" strokeWidth="4" strokeLinecap="round" />
      <rect x="340" y="116" width="10" height="32" rx="2" fill="#B6A4FF" />
      <rect x="352" y="122" width="10" height="26" rx="2" fill="#7CE7FF" opacity=".8" />
      <rect x="364" y="112" width="9" height="36" rx="2" fill="#3A4256" />
      <path d="M376 146 L388 118 L396 121 L384 148 Z" fill="#C8FF3D" opacity=".85" />
      <rect x="410" y="128" width="26" height="20" rx="4" fill="#2A3245" />
      <path d="M423 128 C410 110 404 100 408 92 C418 100 422 112 423 128 C424 112 430 98 440 94 C442 106 434 118 423 128" fill="#7FCF45" />

      {/* Backlight */}
      <circle cx="240" cy="230" r="170" fill="url(#pt-back)" />

      {/* Hair (back) */}
      <path
        d="M174 196 C166 122 214 108 240 108 C268 108 316 122 306 196 C312 258 322 316 334 362 C304 378 272 364 262 334 L218 334 C208 364 176 378 146 362 C158 316 168 258 174 196 Z"
        fill="#2A2433"
        stroke="#7CE7FF"
        strokeOpacity=".45"
        strokeWidth="2"
      />

      {/* Body */}
      <path d="M110 480 C114 362 164 304 240 298 C316 304 366 362 370 480 Z" fill="#D9A3A0" stroke="#C8FF3D" strokeOpacity=".35" strokeWidth="2" />
      <path d="M184 320 C198 372 206 426 208 480 M296 320 C282 372 274 426 272 480" stroke="#C48A88" strokeWidth="3" fill="none" />
      <rect x="222" y="250" width="36" height="58" rx="14" fill="#C9967A" />
      <path d="M214 300 Q240 326 266 300 L260 296 Q240 312 220 296 Z" fill="#E9BFA0" />

      {/* Head */}
      <ellipse cx="240" cy="200" rx="56" ry="62" fill="#E9BFA0" />
      <g clipPath="url(#pt-face)" className={styles.glow}>
        <ellipse cx="240" cy="270" rx="90" ry="70" fill="url(#pt-screenlight)">
          <animate attributeName="opacity" values=".7;1;.75;.9;.7" dur="5s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* Face */}
      <path d="M205 190 Q216 184 228 189 M252 189 Q264 184 275 190" stroke="#17141D" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <g fill="#1B1620">
        <ellipse cx="217" cy="212" rx="6" ry="7">
          <animate attributeName="ry" values="7;7;.6;7" keyTimes="0;.93;.96;1" dur="5.5s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="263" cy="212" rx="6" ry="7">
          <animate attributeName="ry" values="7;7;.6;7" keyTimes="0;.93;.96;1" dur="5.5s" repeatCount="indefinite" />
        </ellipse>
      </g>
      <circle cx="219" cy="209.5" r="1.8" fill="#FFFFFF" />
      <circle cx="265" cy="209.5" r="1.8" fill="#FFFFFF" />
      <path d="M240 218 Q236 228 242 230" stroke="#C9967A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M228 241 Q240 251 252 241" stroke="#A9564F" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <ellipse cx="204" cy="230" rx="9" ry="5" fill="#F08E8E" opacity=".35" />
      <ellipse cx="276" cy="230" rx="9" ry="5" fill="#F08E8E" opacity=".35" />

      {/* Hair (front) */}
      <path d="M254 126 C222 124 190 138 183 178 C180 206 184 238 191 272 C192 242 196 214 207 194 C220 172 238 154 254 140 Z" fill="#2A2433" />
      <path d="M254 126 C280 126 302 146 299 188 C298 226 294 254 288 276 C288 246 286 214 280 194 C274 170 264 150 254 140 Z" fill="#2A2433" />
      <path d="M252 130 L254 142" stroke="#3E3548" strokeWidth="2" strokeLinecap="round" />
      <path d="M186 192 C178 222 182 256 194 278 C188 248 190 220 198 198 Z" fill="#2A2433" />
      <path d="M294 192 C302 222 298 256 286 278 C292 248 290 220 282 198 Z" fill="#2A2433" />
      <path d="M206 158 C220 142 236 134 248 132" stroke="#5A5068" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Headphones */}
      <path d="M180 200 C174 112 306 112 300 200" stroke="#2C3345" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M180 200 C174 112 306 112 300 200" stroke="#7CE7FF" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".45" />
      <rect x="166" y="186" width="24" height="46" rx="11" fill="#232937" stroke="#7CE7FF" strokeWidth="2" />
      <rect x="290" y="186" width="24" height="46" rx="11" fill="#232937" stroke="#7CE7FF" strokeWidth="2" />
      <circle cx="302" cy="222" r="2.5" fill="#C8FF3D">
        <animate attributeName="opacity" values="1;.2;1" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Laptop (back of lid, facing us) */}
      <ellipse cx="240" cy="330" rx="120" ry="40" fill="#C8FF3D" opacity=".12" filter="url(#pt-soft)" />
      <rect x="146" y="318" width="188" height="122" rx="12" fill="url(#pt-lid)" />
      <rect x="146" y="318" width="188" height="122" rx="12" fill="none" stroke="#4A5368" strokeWidth="1.5" />
      <g transform="translate(240 378)">
        <polygon points="-15,-26 15,-26 30,0 15,26 -15,26 -30,0" fill="#C8FF3D" />
        <text className={styles.mono} y="6.5" textAnchor="middle">
          IM
        </text>
      </g>
      <rect x="124" y="438" width="232" height="12" rx="5" fill="#4A5368" />

      {/* Desk */}
      <rect className={styles.desk} x="0" y="448" width="480" height="32" />
      <path className={styles.frame} d="M0 448H480" strokeWidth="2" />

      {/* Mug with steam */}
      <rect x="364" y="404" width="36" height="44" rx="6" fill="#B6A4FF" />
      <path d="M400 414 h6 a9 9 0 0 1 0 18 h-6" stroke="#B6A4FF" strokeWidth="5" fill="none" />
      <rect x="372" y="418" width="20" height="4" rx="2" fill="#090B10" opacity=".25" />
      <g className={styles.steam} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".5">
        <path d="M374 396 C368 386 380 380 374 368">
          <animate attributeName="opacity" values="0;.7;0" dur="3s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 6;0 -8" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M388 396 C382 386 394 380 388 368">
          <animate attributeName="opacity" values="0;.7;0" dur="3s" begin="1.5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 6;0 -8" dur="3s" begin="1.5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}
