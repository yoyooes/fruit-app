export function computeRipeness(adcValue, model) {
  if (!model) return { stage: "Unknown", percent: 0, tip: "" };

  const { adc_min, adc_max } = model;
  const clamped = Math.max(adc_min, Math.min(adcValue, adc_max));
  const percent = Math.round(((clamped - adc_min) / (adc_max - adc_min)) * 100);

  // ตัวอย่างแบ่งช่วงคร่าวๆ: 0–33 ดิบ, 34–66 กำลังสุก, 67–100 สุกพร้อมกิน
  let stage = "Raw";
  if (percent >= 67) stage = "Ripe";
  else if (percent >= 34) stage = "Ripening";

  let tip = "";
  if (stage === "Raw") tip = "ยังไม่แนะนำให้กิน รออีกหน่อย";
  if (stage === "Ripening") tip = "กำลังดีสำหรับรออีก 1–2 วัน หรือทำขนม";
  if (stage === "Ripe") tip = "พร้อมกินที่สุด ภายใน 1 วัน";

  return { stage, percent, tip };
}
