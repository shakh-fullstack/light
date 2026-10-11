const flashBtn = document.querySelector("#flashBtn");
let videoTrack = null;
let isTorchOn = false;

// 1. Kameraga ulanish va chiroqni boshqarish funksiyasi
async function setupFlashlight() {
  try {
    // Telefonning orqa cámarasini so'raymiz
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    // Kamera oqimidan video trekni (track) olamiz
    videoTrack = stream.getVideoTracks()[0];

    // Qurilma chiroqni (torch) qo'llab-quvvatlashini tekshiramiz
    const capabilities = videoTrack.getCapabilities();
    if (!capabilities.torch) {
      alert(
        "Sizning qurilmangizda yoki brauzeringizda chiroqni boshqarib bo'lmaydi.",
      );
      return;
    }
  } catch (error) {
    console.error("Kameraga ruxsat berilmadi yoki xatolik yuz berdi:", error);
  }
}

// Sahifa ochilishi bilan kamerani sozlab qo'yamiz
setupFlashlight();

// 2. Tugmani bosganda chiroqni yoqish/o'chirish
flashBtn.addEventListener("click", async () => {
  if (!videoTrack) {
    alert("Kamera ishga tushmadi!");
    return;
  }

  try {
    isTorchOn = !isTorchOn; // Holatini o'zgartiramiz (yoqiq <-> o'chiq)

    // Chiroqni yoqish yoki o'chirish buyrug'i
    await videoTrack.applyConstraints({
      advanced: [{ torch: isTorchOn }],
    });

    // Tugma matnini o'zgartirib qo'yamiz
    flashBtn.textContent = isTorchOn ? "Chiroqni o'chirish" : "Chiroqni yoqish";
  } catch (error) {
    console.error("Chiroqni yoqib bo'lmadi:", error);
  }
});
