export interface CalculationResult {
  weightPerMeter: number; // kg/m or kg/m²
  totalWeight: number; // kg
  error?: string;
}

export const TMT_IS1786_STANDARDS = [
  { dia: 8, weightPerMeter: 0.395 },
  { dia: 10, weightPerMeter: 0.617 },
  { dia: 12, weightPerMeter: 0.888 },
  { dia: 16, weightPerMeter: 1.580 },
  { dia: 20, weightPerMeter: 2.470 },
  { dia: 25, weightPerMeter: 3.850 },
  { dia: 28, weightPerMeter: 4.830 },
  { dia: 32, weightPerMeter: 6.310 },
];

export function calculateSheetPlate(thicknessMm: number, widthMm: number, lengthMm: number, pieces: number = 1): CalculationResult {
  if (thicknessMm <= 0 || widthMm <= 0 || lengthMm <= 0 || pieces <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions and pieces must be greater than 0" };
  }
  const singleWeight = thicknessMm * (widthMm / 1000) * (lengthMm / 1000) * 7.85;
  const totalWeight = singleWeight * pieces;
  return { weightPerMeter: Math.round(singleWeight * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateCircularPipe(outerDiaMm: number, thicknessMm: number, lengthM: number): CalculationResult {
  if (outerDiaMm <= 0 || thicknessMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  if (thicknessMm > outerDiaMm / 2) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Wall thickness cannot exceed half the outer diameter" };
  }
  const weightPerMeter = Math.PI * thicknessMm * (outerDiaMm - thicknessMm) * 0.00785;
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateSquareHSS(sideAm: number, thicknessMm: number, lengthM: number): CalculationResult {
  if (sideAm <= 0 || thicknessMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  if (thicknessMm >= sideAm / 2) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Thickness must be less than half of side dimension" };
  }
  // Formula from reference site: t * (0.0314 * a - 0.044877 * t)
  const weightPerMeter = thicknessMm * (0.0314 * sideAm - 0.044877 * thicknessMm);
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateRectangularHSS(sideAm: number, sideBm: number, thicknessMm: number, lengthM: number): CalculationResult {
  if (sideAm <= 0 || sideBm <= 0 || thicknessMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  if (thicknessMm >= sideAm / 2 || thicknessMm >= sideBm / 2) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Thickness must be less than half of outer dimensions" };
  }
  // Formula from reference site: t * (0.0157 * (a + b) - 0.044877 * t)
  const weightPerMeter = thicknessMm * (0.0157 * (sideAm + sideBm) - 0.044877 * thicknessMm);
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateRoundBar(diaMm: number, lengthM: number): CalculationResult {
  if (diaMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  const weightPerMeter = 0.00785 * (Math.PI / 4) * Math.pow(diaMm, 2);
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateSquareBar(sideAm: number, lengthM: number): CalculationResult {
  if (sideAm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  const weightPerMeter = 0.00785 * Math.pow(sideAm, 2);
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateFlatBar(widthMm: number, thicknessMm: number, lengthM: number): CalculationResult {
  if (widthMm <= 0 || thicknessMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  const weightPerMeter = 0.00785 * widthMm * thicknessMm;
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateEqualAngle(legAm: number, thicknessMm: number, lengthM: number): CalculationResult {
  if (legAm <= 0 || thicknessMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  if (thicknessMm >= legAm) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Thickness must be less than leg width" };
  }
  const weightPerMeter = 0.00785 * thicknessMm * (2 * legAm - thicknessMm);
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export function calculateUnequalAngle(legAm: number, legBm: number, thicknessMm: number, lengthM: number): CalculationResult {
  if (legAm <= 0 || legBm <= 0 || thicknessMm <= 0 || lengthM <= 0) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Dimensions must be greater than 0" };
  }
  if (thicknessMm >= legAm || thicknessMm >= legBm) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Thickness must be less than leg widths" };
  }
  const weightPerMeter = 0.00785 * thicknessMm * (legAm + legBm - thicknessMm);
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter: Math.round(weightPerMeter * 1000) / 1000, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export interface StandardProfile {
  name: string;
  weightPerMeter: number;
  h: number; // height mm
  b: number; // width mm
  s: number; // web thickness mm
  t: number; // flange thickness mm
}

export const GOST_CHANNELS: StandardProfile[] = [
  { name: "№ 6.5", weightPerMeter: 5.9, h: 65, b: 36, s: 4.4, t: 7.2 },
  { name: "№ 8", weightPerMeter: 7.03, h: 80, b: 40, s: 4.2, t: 7.4 },
  { name: "№ 10", weightPerMeter: 8.58, h: 100, b: 46, s: 4.3, t: 7.6 },
  { name: "№ 12", weightPerMeter: 10.22, h: 120, b: 52, s: 4.3, t: 7.9 },
  { name: "№ 14", weightPerMeter: 12.07, h: 140, b: 58, s: 4.4, t: 8.2 },
  { name: "№ 16", weightPerMeter: 13.83, h: 160, b: 64, s: 4.4, t: 8.5 },
  { name: "№ 18", weightPerMeter: 16.16, h: 180, b: 70, s: 4.5, t: 9.2 },
  { name: "№ 20", weightPerMeter: 18.41, h: 200, b: 76, s: 4.6, t: 9.6 },
  { name: "№ 22", weightPerMeter: 20.53, h: 220, b: 80, s: 4.6, t: 10 },
  { name: "№ 24", weightPerMeter: 23.7, h: 240, b: 90, s: 4.8, t: 10.6 },
  { name: "№ 27", weightPerMeter: 27.7, h: 270, b: 95, s: 6, t: 10.5 },
  { name: "№ 30", weightPerMeter: 32.09, h: 300, b: 100, s: 6.3, t: 11.4 }
];

export const UPN_CHANNELS: StandardProfile[] = [
  { name: "UPN 50 x 25", weightPerMeter: 3.86, h: 50, b: 25, s: 5, t: 6 },
  { name: "UPN 50", weightPerMeter: 5.59, h: 50, b: 38, s: 5, t: 7 },
  { name: "UPN 60", weightPerMeter: 5.07, h: 60, b: 30, s: 6, t: 6 },
  { name: "UPN 65", weightPerMeter: 7.09, h: 65, b: 42, s: 5.5, t: 7.5 },
  { name: "UPN 80", weightPerMeter: 8.64, h: 80, b: 45, s: 6, t: 8 },
  { name: "UPN 100", weightPerMeter: 10.6, h: 100, b: 50, s: 6, t: 8.5 },
  { name: "UPN 120", weightPerMeter: 13.4, h: 120, b: 55, s: 7, t: 9 },
  { name: "UPN 140", weightPerMeter: 16, h: 140, b: 60, s: 7, t: 10 },
  { name: "UPN 160", weightPerMeter: 18.8, h: 160, b: 65, s: 7.5, t: 10.5 },
  { name: "UPN 180", weightPerMeter: 22, h: 180, b: 70, s: 8, t: 11 },
  { name: "UPN 200", weightPerMeter: 25.3, h: 200, b: 75, s: 8.5, t: 11.5 },
  { name: "UPN 220", weightPerMeter: 29.4, h: 220, b: 80, s: 9, t: 12.5 },
  { name: "UPN 240", weightPerMeter: 33.2, h: 240, b: 85, s: 9.5, t: 13 },
  { name: "UPN 260", weightPerMeter: 37.9, h: 260, b: 90, s: 10, t: 14 },
  { name: "UPN 280", weightPerMeter: 41.8, h: 280, b: 95, s: 10, t: 15 },
  { name: "UPN 300", weightPerMeter: 46.2, h: 300, b: 100, s: 10, t: 16 },
  { name: "UPN 320", weightPerMeter: 59.5, h: 320, b: 100, s: 14, t: 17.5 },
  { name: "UPN 350", weightPerMeter: 60.6, h: 350, b: 100, s: 14, t: 16 },
  { name: "UPN 380", weightPerMeter: 63.1, h: 380, b: 102, s: 13.5, t: 16 },
  { name: "UPN 400", weightPerMeter: 71.8, h: 400, b: 110, s: 14, t: 18 }
];

export const IPN_BEAMS: StandardProfile[] = [
  { name: "IPN 80", weightPerMeter: 5.94, h: 80, b: 42, s: 3.9, t: 5.9 },
  { name: "IPN 100", weightPerMeter: 8.34, h: 100, b: 50, s: 4.5, t: 6.8 },
  { name: "IPN 120", weightPerMeter: 11.1, h: 120, b: 58, s: 5.1, t: 7.7 },
  { name: "IPN 140", weightPerMeter: 14.3, h: 140, b: 66, s: 5.7, t: 8.6 },
  { name: "IPN 160", weightPerMeter: 17.9, h: 160, b: 74, s: 6.3, t: 9.5 },
  { name: "IPN 180", weightPerMeter: 21.9, h: 180, b: 82, s: 6.9, t: 10.4 },
  { name: "IPN 200", weightPerMeter: 26.2, h: 200, b: 90, s: 7.5, t: 11.3 },
  { name: "IPN 220", weightPerMeter: 31.1, h: 220, b: 98, s: 8.1, t: 12.2 },
  { name: "IPN 240", weightPerMeter: 36.2, h: 240, b: 106, s: 8.7, t: 13.1 },
  { name: "IPN 260", weightPerMeter: 41.9, h: 260, b: 113, s: 9.4, t: 14.1 },
  { name: "IPN 280", weightPerMeter: 47.9, h: 280, b: 119, s: 10.1, t: 15.2 },
  { name: "IPN 300", weightPerMeter: 54.2, h: 300, b: 125, s: 10.8, t: 16.2 },
  { name: "IPN 320", weightPerMeter: 61, h: 320, b: 131, s: 11.5, t: 17.3 },
  { name: "IPN 340", weightPerMeter: 68, h: 340, b: 137, s: 12.2, t: 18.3 },
  { name: "IPN 360", weightPerMeter: 76.1, h: 360, b: 143, s: 13, t: 19.5 },
  { name: "IPN 380", weightPerMeter: 84, h: 380, b: 149, s: 13.7, t: 20.5 },
  { name: "IPN 400", weightPerMeter: 92.4, h: 400, b: 155, s: 14.4, t: 21.6 },
  { name: "IPN 450", weightPerMeter: 115, h: 450, b: 170, s: 16.2, t: 24.3 },
  { name: "IPN 500", weightPerMeter: 141, h: 500, b: 185, s: 18, t: 27 },
  { name: "IPN 550", weightPerMeter: 166, h: 550, b: 200, s: 19, t: 30 }
];

export const IPE_BEAMS: StandardProfile[] = [
  { name: "IPE 80", weightPerMeter: 6, h: 80, b: 46, s: 3.8, t: 5.2 },
  { name: "IPE 100", weightPerMeter: 8.1, h: 100, b: 55, s: 4.1, t: 5.7 },
  { name: "IPE 120", weightPerMeter: 10.4, h: 120, b: 64, s: 4.4, t: 6.3 },
  { name: "IPE 140", weightPerMeter: 12.9, h: 140, b: 73, s: 4.7, t: 6.9 },
  { name: "IPE 160", weightPerMeter: 15.8, h: 160, b: 82, s: 5, t: 7.4 },
  { name: "IPE 180", weightPerMeter: 18.8, h: 180, b: 91, s: 5.3, t: 8 },
  { name: "IPE 200", weightPerMeter: 22.4, h: 200, b: 100, s: 5.6, t: 8.5 },
  { name: "IPE 220", weightPerMeter: 26.2, h: 220, b: 110, s: 5.9, t: 9.2 },
  { name: "IPE 240", weightPerMeter: 30.7, h: 240, b: 120, s: 6.2, t: 9.8 },
  { name: "IPE 270", weightPerMeter: 36.1, h: 270, b: 135, s: 6.6, t: 10.2 },
  { name: "IPE 300", weightPerMeter: 42.2, h: 300, b: 150, s: 7.1, t: 10.7 },
  { name: "IPE 330", weightPerMeter: 49.1, h: 330, b: 160, s: 7.5, t: 11.5 },
  { name: "IPE 360", weightPerMeter: 57.1, h: 360, b: 170, s: 8, t: 12.7 },
  { name: "IPE 400", weightPerMeter: 66.3, h: 400, b: 180, s: 8.6, t: 13.5 },
  { name: "IPE 450", weightPerMeter: 77.6, h: 450, b: 190, s: 9.4, t: 14.6 },
  { name: "IPE 500", weightPerMeter: 90.7, h: 500, b: 200, s: 10.2, t: 16 },
  { name: "IPE 550", weightPerMeter: 106, h: 550, b: 210, s: 11.1, t: 17.2 },
  { name: "IPE 600", weightPerMeter: 122, h: 600, b: 220, s: 12, t: 19 }
];

export const HEA_BEAMS: StandardProfile[] = [
  { name: "HEA 100", weightPerMeter: 16.7, h: 96, b: 100, s: 5, t: 8 },
  { name: "HEA 120", weightPerMeter: 19.9, h: 114, b: 120, s: 5, t: 8 },
  { name: "HEA 140", weightPerMeter: 24.7, h: 133, b: 140, s: 5.5, t: 8.5 },
  { name: "HEA 160", weightPerMeter: 30.4, h: 152, b: 160, s: 6, t: 9 },
  { name: "HEA 180", weightPerMeter: 35.5, h: 171, b: 180, s: 6, t: 9.5 },
  { name: "HEA 200", weightPerMeter: 42.3, h: 190, b: 200, s: 6.5, t: 10 },
  { name: "HEA 220", weightPerMeter: 50.5, h: 210, b: 220, s: 7, t: 11 },
  { name: "HEA 240", weightPerMeter: 60.3, h: 230, b: 240, s: 7.5, t: 12 },
  { name: "HEA 260", weightPerMeter: 68.2, h: 250, b: 260, s: 7.5, t: 12.5 },
  { name: "HEA 280", weightPerMeter: 76.4, h: 270, b: 280, s: 8, t: 13 },
  { name: "HEA 300", weightPerMeter: 88.3, h: 290, b: 300, s: 8.5, t: 14 },
  { name: "HEA 320", weightPerMeter: 97.6, h: 310, b: 300, s: 9, t: 15.5 },
  { name: "HEA 340", weightPerMeter: 105, h: 330, b: 300, s: 9.5, t: 16.5 },
  { name: "HEA 360", weightPerMeter: 112, h: 350, b: 300, s: 10, t: 17.5 },
  { name: "HEA 400", weightPerMeter: 125, h: 390, b: 300, s: 11, t: 19 },
  { name: "HEA 450", weightPerMeter: 140, h: 440, b: 300, s: 11.5, t: 21 },
  { name: "HEA 500", weightPerMeter: 155, h: 490, b: 300, s: 12, t: 23 },
  { name: "HEA 550", weightPerMeter: 166, h: 540, b: 300, s: 12.5, t: 24 },
  { name: "HEA 600", weightPerMeter: 178, h: 590, b: 300, s: 13, t: 25 },
  { name: "HEA 650", weightPerMeter: 190, h: 640, b: 300, s: 13.5, t: 26 },
  { name: "HEA 700", weightPerMeter: 204, h: 690, b: 300, s: 14.5, t: 27 },
  { name: "HEA 800", weightPerMeter: 224, h: 790, b: 300, s: 15, t: 28 },
  { name: "HEA 900", weightPerMeter: 252, h: 890, b: 300, s: 16, t: 30 },
  { name: "HEA 1000", weightPerMeter: 272, h: 990, b: 300, s: 16.5, t: 31 }
];

export const HEB_BEAMS: StandardProfile[] = [
  { name: "HEB 100", weightPerMeter: 20.4, h: 100, b: 100, s: 6, t: 10 },
  { name: "HEB 120", weightPerMeter: 26.7, h: 120, b: 120, s: 6.5, t: 11 },
  { name: "HEB 140", weightPerMeter: 33.7, h: 140, b: 140, s: 7, t: 12 },
  { name: "HEB 160", weightPerMeter: 42.6, h: 160, b: 160, s: 8, t: 13 },
  { name: "HEB 180", weightPerMeter: 51.2, h: 180, b: 180, s: 8.5, t: 14 },
  { name: "HEB 200", weightPerMeter: 61.3, h: 200, b: 200, s: 9, t: 15 },
  { name: "HEB 220", weightPerMeter: 71.5, h: 220, b: 220, s: 9.5, t: 16 },
  { name: "HEB 240", weightPerMeter: 83.2, h: 240, b: 240, s: 10, t: 17 },
  { name: "HEB 260", weightPerMeter: 93, h: 260, b: 260, s: 10, t: 17.5 },
  { name: "HEB 280", weightPerMeter: 103, h: 280, b: 280, s: 10.5, t: 18 },
  { name: "HEB 300", weightPerMeter: 117, h: 300, b: 300, s: 11, t: 19 },
  { name: "HEB 320", weightPerMeter: 127, h: 320, b: 300, s: 11.5, t: 20.5 },
  { name: "HEB 340", weightPerMeter: 134, h: 340, b: 300, s: 12, t: 21.5 },
  { name: "HEB 360", weightPerMeter: 142, h: 360, b: 300, s: 12.5, t: 22.5 },
  { name: "HEB 400", weightPerMeter: 155, h: 400, b: 300, s: 13.5, t: 24 },
  { name: "HEB 450", weightPerMeter: 171, h: 450, b: 300, s: 14, t: 26 },
  { name: "HEB 500", weightPerMeter: 187, h: 500, b: 300, s: 14.5, t: 28 },
  { name: "HEB 550", weightPerMeter: 199, h: 550, b: 300, s: 15, t: 29 },
  { name: "HEB 600", weightPerMeter: 212, h: 600, b: 300, s: 15.5, t: 30 },
  { name: "HEB 650", weightPerMeter: 225, h: 650, b: 300, s: 16, t: 31 },
  { name: "HEB 700", weightPerMeter: 241, h: 700, b: 300, s: 17, t: 32 },
  { name: "HEB 800", weightPerMeter: 262, h: 800, b: 300, s: 17.5, t: 33 },
  { name: "HEB 900", weightPerMeter: 291, h: 900, b: 300, s: 18.5, t: 35 },
  { name: "HEB 1000", weightPerMeter: 314, h: 1000, b: 300, s: 19, t: 36 }
];

export function calculateProfileLookup(profileType: string, profileName: string, lengthM: number): CalculationResult {
  let list: StandardProfile[] = [];
  if (profileType === "gost-channel") list = GOST_CHANNELS;
  else if (profileType === "upn-channel") list = UPN_CHANNELS;
  else if (profileType === "ipn-beam") list = IPN_BEAMS;
  else if (profileType === "ipe-beam") list = IPE_BEAMS;
  else if (profileType === "hea-beam") list = HEA_BEAMS;
  else if (profileType === "heb-beam") list = HEB_BEAMS;

  const match = list.find((p) => p.name === profileName);
  if (!match) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Profile not found" };
  }
  if (lengthM <= 0) {
    return { weightPerMeter: match.weightPerMeter, totalWeight: 0, error: "Length must be greater than 0" };
  }
  const totalWeight = match.weightPerMeter * lengthM;
  return { weightPerMeter: match.weightPerMeter, totalWeight: Math.round(totalWeight * 100) / 100 };
}

export const EQUAL_ANGLES_DATA: Record<string, Record<string, number>> = {
  "20": { "3": 0.88, "4": 1.15 },
  "25": { "3": 1.12, "4": 1.45 },
  "30": { "3": 1.36, "4": 1.78, "5": 2.18 },
  "35": { "3": 1.6, "4": 2.09, "5": 2.57 },
  "40": { "3": 1.85, "4": 2.42, "5": 2.97 },
  "45": { "3": 2.08, "4": 2.74, "5": 3.38 },
  "50": { "3": 2.32, "4": 3.06, "5": 3.77, "6": 4.47, "7": 5.15 },
  "55": { "4": 3.38, "5": 4.18, "6": 4.95 },
  "60": { "4": 3.7, "5": 4.57, "6": 5.42, "7": 6.26, "8": 7.09 },
  "63": { "4": 3.9, "5": 4.81, "6": 5.72, "7": 6.61, "8": 7.48 },
  "65": { "5": 4.97, "6": 5.91, "7": 6.83, "8": 7.73 },
  "70": { "5": 5.38, "6": 6.38, "7": 7.38, "8": 8.37 },
  "75": { "5": 5.8, "6": 6.85, "7": 7.94, "8": 8.99, "9": 10.07 },
  "80": { "6": 7.34, "7": 8.51, "8": 9.63, "9": 10.8, "10": 11.9 },
  "90": { "6": 8.33, "7": 9.61, "8": 10.9, "9": 12.2, "10": 13.4 },
  "100": { "7": 10.79, "8": 12.2, "9": 13.6, "10": 15, "12": 17.8 },
  "110": { "7": 11.89, "8": 13.5, "9": 15, "10": 16.6, "12": 19.7 },
  "120": { "8": 14.7, "9": 16.5, "10": 18.2, "12": 21.6, "13": 23.3 },
  "125": { "8": 15.46, "9": 17.3, "10": 19.1 },
  "130": { "8": 15.99, "9": 17.9, "10": 19.79, "12": 23.6, "13": 25.37, "14": 27.2, "15": 29 },
  "140": { "9": 19.41, "10": 21.45, "12": 25.5, "13": 27.5 },
  "150": { "10": 23, "12": 27.3, "13": 29.5, "14": 31.6, "15": 33.8, "16": 35.9, "18": 40.1, "20": 44.2 },
  "160": { "10": 24.67, "12": 29.35, "13": 31.6, "14": 34.2, "15": 36.2, "16": 38.52, "18": 43, "20": 47.4 },
  "180": { "12": 33.12, "13": 35.7, "14": 38.3, "15": 40.9, "16": 43.5, "18": 48.6, "20": 53.7 },
  "200": { "14": 42.8, "15": 45.6, "16": 48.5, "18": 54.3, "20": 59.9 }
};

export const UNEQUAL_ANGLES_DATA: Record<string, Record<string, number>> = {
  "30x20": { "3": 1.12, "4": 1.46 },
  "40x20": { "3": 1.35, "4": 1.77 },
  "40x25": { "4": 1.93 },
  "45x30": { "3": 1.72, "4": 2.25, "5": 2.77 },
  "50x30": { "4": 2.41, "5": 2.96 },
  "60x30": { "5": 3.36 },
  "60x40": { "5": 3.76, "6": 4.46, "7": 5.14 },
  "60x50": { "5": 4.15, "6": 4.93, "8": 6.43, "10": 7.88 },
  "65x50": { "5": 4.35 },
  "70x50": { "6": 5.41 },
  "75x50": { "5": 4.74, "6": 5.65, "8": 7.39, "9": 8.23, "10": 9.05 },
  "75x55": { "5": 4.95, "7": 6.8, "9": 8.59 },
  "75x60": { "5": 5.14, "6": 6.11, "8": 8.01, "10": 9.85 },
  "80x40": { "6": 5.41, "8": 7.07, "10": 8.67 },
  "80x60": { "7": 7.36 },
  "90x60": { "6": 6.82, "8": 8.96, "10": 11.04 },
  "90x75": { "6": 7.55, "8": 9.93, "10": 12.23 },
  "100x50": { "6": 6.84, "8": 8.97, "10": 11.1, "12": 13.06 },
  "100x65": { "7": 8.77, "8": 9.94, "9": 11.1, "10": 12.3 },
  "100x75": { "6": 8.04, "7": 9.32, "8": 10.6, "9": 11.8, "10": 13, "12": 15.4 },
  "100x90": { "6": 8.77, "8": 11.53, "10": 14.23, "12": 16.87 },
  "120x80": { "8": 12.2, "10": 15, "12": 17.8 },
  "125x75": { "8": 12.2, "10": 15, "12": 17.8 },
  "125x80": { "8": 12.58, "10": 15.47, "12": 18.34, "15": 22.47 },
  "125x90": { "8": 13.12, "10": 16.21, "12": 19.24, "15": 23.65 },
  "130x65": { "8": 11.9, "10": 14.6, "12": 17.3 },
  "130x75": { "8": 12.47, "10": 15.41, "12": 18.28, "15": 22.47 },
  "130x90": { "10": 16.6, "12": 19.7 },
  "150x75": { "9": 15.4, "10": 17, "12": 20.2, "15": 24.8 },
  "150x90": { "10": 18.2, "12": 21.6, "15": 26.6 },
  "150x100": { "10": 19, "12": 22.5 },
  "180x90": { "10": 20.6, "12": 24.5 },
  "200x100": { "10": 23, "12": 27.3, "15": 33.75 },
  "200x150": { "12": 32, "15": 39.6 }
};

export function calculateAnglesLookup(angleType: "equal-angle" | "unequal-angle", size: string, thickness: string, lengthM: number): CalculationResult {
  const db = angleType === "equal-angle" ? EQUAL_ANGLES_DATA : UNEQUAL_ANGLES_DATA;
  const sizeData = db[size];
  if (!sizeData) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Size not found" };
  }
  const weightPerMeter = sizeData[thickness];
  if (weightPerMeter === undefined) {
    return { weightPerMeter: 0, totalWeight: 0, error: "Thickness not found for this size" };
  }
  if (lengthM <= 0) {
    return { weightPerMeter, totalWeight: 0, error: "Length must be greater than 0" };
  }
  const totalWeight = weightPerMeter * lengthM;
  return { weightPerMeter, totalWeight: Math.round(totalWeight * 100) / 100 };
}
