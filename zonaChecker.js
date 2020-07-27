

let zonaChecker = (cp) => {

   //z1
   if ((cp >= 1000) && (cp <= 1893)) { return  1}
   else if ((cp === 1924) || (cp === 2752) || (cp === 2760) || (cp === 2814) || (cp === 2930) || (cp === 2931) || (cp === 2935) || (cp === 2953) ) {  return 1}
  
   //z2 -rest of bsas, cordoba, entre rios, la pampa, santa fe.
   //Cordoba
   if (cp === 2400) {return 2}; if (cp === 2550) {return 2}; if (cp === 2580) {return 2}; if (cp === 2670) {return 2};
   if (cp === 5000) {return 2}; if (cp === 5111) {return 2}; if (cp === 5127) {return 2}; if (cp === 5166) {return 2};
   if (cp === 5186) {return 2}; if (cp === 5191) {return 2 }; if (cp === 2500) {return 2 }; if (cp === 5203 ) {return 2}; 
   if (cp === 5209) {return 2}; if (cp === 5236) {return 2}; if (cp === 5248) {return 2}; if (cp === 5280) {return 2};
   if (cp === 5291) {return 2}; if (cp === 5295) {return 2}; if (cp === 5870) {return 2}; if (cp === 5891) {return 2}; 
   if (cp === 5900) {return 2}; if (cp === 5960) {return 2}; if (cp === 5980) {return 2};if (cp === 6120) {return 2}; if (cp === 6275) {return 2};

   //Santa fe
   if ((cp >= 2000) & (cp <=2300)) {return 2}
   if ((cp >= 2520) & (cp <=3000)) {return 2}
   //Entre Rios
   if ((cp >= 2820) & (cp <=2840)) {return 2}
   if ((cp >= 3100) & (cp <=3280)) {return 2}
   //La Pampa
   if ((cp >= 6200) & (cp <=6221)) {return 2}
   if ((cp >= 6387) & (cp <=8200)) {return 2}

   //z3 - Catamarca,Chaco,Corrientes,Formosa,laRioja,Mendoza,Misiones,Neuquen,RioNegro,SanJuan,SanLuis,SdelEstero,Tucuman.
   //Camtamarca
   if ((cp >= 4700) & (cp <=4750)) {return 3}
   //Chaco
   if ((cp >= 3500) & (cp <=3541)) {return 3}
   if ((cp >= 3700) & (cp <=3743)) {return 3}
   //Corrientes
   if ((cp >= 3400) & (cp <=3485)) {return 3}
   //Formosa
   if ((cp >= 3600) & (cp <=3636)) {return 3}
   //La Rioja
   if ((cp >= 5300) & (cp <=5386)) {return 3}
   //Mendoza
   if ((cp >= 5500 ) & (cp <= 5620)) {return 3}
   //Misiones
   if ((cp >= 3300) & (cp <= 3384)) {return 3}
   //Neuquen
   if ((cp >= 8300) & (cp <= 8407)) {return 3}
   //Rio Negro
   if ((cp >= 8400) & (cp <= 8536)) {return 3}
   //San Juan
   if ((cp >= 5400) & (cp <= 5467)) {return 3}
   //SanLuis
   if ((cp >= 5700) & (cp <= 5883)) {return 3}
   //Santiago del Estero
   if ((cp >= 2354) & (cp <= 2357)) {return 3}
   if ((cp >= 3740) & (cp <= 3763)) {return 3}
   if ((cp >= 4184) & (cp <= 4354)) {return 3}
   //Tucuman
   if ((cp >= 4000) & (cp <= 4178)) {return 3}

   //z4 - Chubut, Jujuy, Salta, Santa Cruz, Tierra del Fuego.
   //Chubut
   if ((cp >= 9000) & (cp <= 9220)) {return 4}
   //Jujuy
   if ((cp >= 4500 ) & (cp <= 4514)) {return 4}
   if ((cp >= 4600) & (cp <= 4655)) {return 4}
   // Salta
   if ((cp >= 4400) & (cp <= 4651)) {return 4}
   // Santa Cruz
   if ((cp >= 9300) & (cp <= 9407)) {return 4}
   //Tierra del Fuego
   if ((cp === 9410) || (cp === 9420)) {return 4}

   else return 2
 }

module.exports = zonaChecker