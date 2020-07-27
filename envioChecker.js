
const envioChecker = (zona, weight, tipoEnvio) => {

    let pesoTotal = weight

    if (tipoEnvio === 'sucursal') {

        if (zona === 1) {
          if (pesoTotal < 0.5) {return(180.26)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(184)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(200)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(202)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(209)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(260)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(361)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(373)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(429)}
        }
        if (zona === 2) {
          if (pesoTotal < 0.5) {return(212.26)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(229)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(269)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(298)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(371)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(482)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(631)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(787)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(942)}
        }
        if (zona === 3) {
          if (pesoTotal < 0.5) {return(215)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(233)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(271)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(314)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(381)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(502)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(674)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(863)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(1039)}
        }
        if (zona === 4) {
          if (pesoTotal < 0.5) {return(220)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(244)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(294)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(343)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(390)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(602)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(825)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(1048)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(1271)}
        }
      }
  
      if (tipoEnvio === 'domicilio') {
  
        if (zona === 1) {
          if (pesoTotal < 0.5) {return(271)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(319)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(321)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(323)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(326)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(359)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(465)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(481)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(511)}
        }
        if (zona === 2) {
          if (pesoTotal < 0.5) {return(296)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(345)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(355)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(375)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(445)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(503)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(681)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(809)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(961)}
        }
        if (zona === 3) {
          if (pesoTotal < 0.5) {return(297)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(346)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(357)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(390)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(459)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(556)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(709)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(901)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(1077)}
        }
        if (zona === 4) {
          if (pesoTotal < 0.5) {return(298)}
          if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {return(349)}
          if ((pesoTotal >= 1) && (pesoTotal < 2)) {return(377)}
          if ((pesoTotal >= 2) && (pesoTotal < 3)) {return(416)}
          if ((pesoTotal >= 3) && (pesoTotal < 5)) {return(507)}
          if ((pesoTotal >= 5) && (pesoTotal < 10)) {return(647)}
          if ((pesoTotal >= 10) && (pesoTotal < 15)) {return(871)}
          if ((pesoTotal >= 15) && (pesoTotal < 20)) {return(1109)}
          if ((pesoTotal >= 20) && (pesoTotal < 25)) {return(1440)}
        }
      }

      return 

} 

module.exports = envioChecker;