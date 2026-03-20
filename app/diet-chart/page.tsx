"use client";

import { useState } from "react";
import Header from "../components/Header";

/* ================= TRANSLATIONS ================= */

const content = {
  en: {
    title: "Weight Loss Diet Plan",
    subtitle: "Follow strictly for best results",

    step1Title: "📸 Step 1: Starting Point",
    step1Desc:
      "Take a clear photo of your weight while standing on the weighing machine.",
    track: "Track: Weekly once (or twice daily if needed)",

    breakfast: "🌅 Breakfast (7:00 AM – 8:00 AM)",
    onlyMix: "Only our Weight Loss Mix",
    noFood: "Do NOT eat any other food",

    lunch: "🍛 Lunch (12:00 PM – 1:30 PM)",
    rice: "Rice: 150–200 grams",
    dal: "Dal: Required",
    veg: "Vegetables: Any 2 varieties",
    protein: "Protein (Choose ONE):",
    optionalProtein: "Optional Protein:",
    proteinsList: ["Paneer", "Tofu", "Broccoli", "Soya chunks"],
    optionalList: [
      "2–3 egg whites",
      "250g chicken breast",
      "4–5 fish pieces",
    ],

    snack: "☕ Evening Snack (3:30 PM – 4:30 PM)",
    chooseOne: "Choose ANY ONE option:",
    snack1: "200g popcorn OR puffed rice",
    snackNote: "No butter / salt / masala",
    snack2: "Fruits (50–100g only)",
    fruits:
      "Apple, Watermelon, Pineapple, Grapes, Orange, Guava, Papaya",
    snack3: "50g peanuts (fried or boiled)",

    dinner: "🌙 Dinner (6:00 PM – 7:00 PM)",
    noFoodDinner: "No other foods allowed",

    water: "💧 Water Intake",
    waterDesc: "Drink 1 litre for every 20 kg body weight",
    waterExample: "Example: 80kg → 4 litres/day",
    waterNote: "Drink slowly (sip by sip), not fast",

    sleep: "😴 Sleep Routine",
    sleepTime: "Sleep Time: 10:00 PM – 11:00 PM",
    sleepDuration: "Duration: 6–8 hours (Compulsory)",

    dos: "✅ DO’s",
    dosList: [
      "Follow meal timings strictly",
      "Drink enough water",
      "Black tea/coffee without sugar",
      "Sleep properly",
      "Stay consistent",
    ],

    donts: "❌ DON’Ts",
    dontsList: [
      "Sugar",
      "Soft drinks",
      "Ice cream",
      "Bakery items",
      "Junk food",
      "Fried & processed food",
      "Late-night eating",
    ],

    videos: "🎥 Reference Videos",
  },

  ta: {
    title: "எடை குறைக்கும் உணவு திட்டம்",
    subtitle: "சிறந்த விளைவுகளுக்காக கட்டாயம் பின்பற்றவும்",

    step1Title: "📸 படி 1: ஆரம்ப நிலை",
    step1Desc:
      "எடைக்கருவியில் நின்று உங்கள் எடையை தெளிவாக படம் எடுக்கவும்.",
    track: "பதிவு: வாரத்திற்கு ஒரு முறை (அல்லது தினமும் இருமுறை)",

    breakfast: "🌅 காலை உணவு (7:00 AM – 8:00 AM)",
    onlyMix: "எங்கள் Weight Loss Mix மட்டும்",
    noFood: "வேறு எந்த உணவும் சாப்பிடக்கூடாது",

    lunch: "🍛 மதிய உணவு (12:00 PM – 1:30 PM)",
    rice: "அரிசி: 150–200 கிராம்",
    dal: "பருப்பு: அவசியம்",
    veg: "காய்கறி: ஏதேனும் 2 வகைகள்",
    protein: "புரதம் (ஒன்று தேர்வு செய்யவும்):",
    optionalProtein: "விருப்ப புரதம்:",
    proteinsList: ["பனீர்", "டோஃபு", "ப்ரோக்கோலி", "சோயா துண்டுகள்"],
    optionalList: [
      "2–3 முட்டை வெள்ளை",
      "250g கோழி மார்பு",
      "4–5 மீன் துண்டுகள்",
    ],

    snack: "☕ மாலை சிற்றுண்டி (3:30 PM – 4:30 PM)",
    chooseOne: "ஏதேனும் ஒன்றை தேர்வு செய்யவும்:",
    snack1: "200g பொப்ப்கார்ன் அல்லது பொரி",
    snackNote: "வெண்ணெய் / உப்பு / மசாலா வேண்டாம்",
    snack2: "பழங்கள் (50–100g மட்டும்)",
    fruits:
      "ஆப்பிள், தர்பூசணி, அன்னாசி, திராட்சை, ஆரஞ்சு, கொய்யா, பப்பாளி",
    snack3: "50g வேர்க்கடலை",

    dinner: "🌙 இரவு உணவு (6:00 PM – 7:00 PM)",
    noFoodDinner: "வேறு உணவு வேண்டாம்",

    water: "💧 தண்ணீர்",
    waterDesc: "ஒவ்வொரு 20 kg உடல் எடைக்கும் 1 லிட்டர் தண்ணீர் குடிக்கவும்",
    waterExample: "உதாரணம்: 80kg → 4 லிட்டர்",
    waterNote: "மெதுவாக குடிக்கவும்",

    sleep: "😴 தூக்கம்",
    sleepTime: "தூங்கும் நேரம்: 10:00 PM – 11:00 PM",
    sleepDuration: "6–8 மணி நேரம் அவசியம்",

    dos: "✅ செய்யவேண்டியது",
    dosList: [
      "உணவு நேரத்தை பின்பற்றவும்",
      "போதுமான தண்ணீர் குடிக்கவும்",
      "சர்க்கரை இல்லாத காபி/டீ",
      "சரியாக தூங்கவும்",
      "தொடர்ச்சியாக இருக்கவும்",
    ],

    donts: "❌ தவிர்க்க வேண்டியது",
    dontsList: [
      "சர்க்கரை",
      "கூல்டிரிங்க்ஸ்",
      "ஐஸ் க்ரீம்",
      "பேக்கரி உணவு",
      "ஜங்க் உணவு",
      "வறுத்த உணவு",
      "இரவு நேர உணவு",
    ],

    videos: "🎥 வீடியோக்கள்",
  },
};

/* ================= PAGE ================= */

export default function DietPlanPage() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const t = content[lang];

  return (
    <>
     <Header />
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

      {/* Language Toggle */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1 rounded ${
            lang === "en" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("ta")}
          className={`px-3 py-1 rounded ${
            lang === "ta" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
        >
          தமிழ்
        </button>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          {t.title}
        </h1>
        <p className="text-gray-500 mt-2">{t.subtitle}</p>
      </div>

      <SectionCard title={t.step1Title}>
        <p>{t.step1Desc}</p>
        <p className="mt-2">📅 {t.track}</p>
      </SectionCard>

      <MealCard title={t.breakfast} highlight={t.onlyMix} warning={t.noFood} />

      <SectionCard title={t.lunch}>
        <ul className="list-disc ml-5 space-y-1">
          <li>{t.rice}</li>
          <li>{t.dal}</li>
          <li>{t.veg}</li>
        </ul>

        <p className="mt-3 font-semibold text-green-600">{t.protein}</p>
        <ul className="list-disc ml-5">
          {t.proteinsList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="mt-3 font-semibold text-blue-600">
          {t.optionalProtein}
        </p>
        <ul className="list-disc ml-5">
          {t.optionalList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={t.snack}>
        <p className="font-semibold">{t.chooseOne}</p>

        <div className="mt-3 space-y-3">
          <div className="bg-gray-50 p-3 rounded">
            <p>{t.snack1}</p>
            <p className="text-red-500 text-sm">{t.snackNote}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p>{t.snack2}</p>
            <p className="text-sm text-gray-500">{t.fruits}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p>{t.snack3}</p>
          </div>
        </div>
      </SectionCard>

      <MealCard title={t.dinner} highlight={t.onlyMix} warning={t.noFoodDinner} />

      <SectionCard title={t.water}>
        <p>{t.waterDesc}</p>
        <p className="mt-2">{t.waterExample}</p>
        <p className="text-sm text-gray-500 mt-2">{t.waterNote}</p>
      </SectionCard>

      <SectionCard title={t.sleep}>
        <p>{t.sleepTime}</p>
        <p>{t.sleepDuration}</p>
      </SectionCard>

      <SectionCard title={t.dos}>
        <ul className="list-disc ml-5 text-green-700">
          {t.dosList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={t.donts}>
        <ul className="list-disc ml-5 text-red-600">
          {t.dontsList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={t.videos}>
        <div className="space-y-2 text-blue-600 underline">
          <a href="https://youtu.be/QPlAdDCRmfw" target="_blank">
            YouTube
          </a>
          <a href="https://www.instagram.com/reel/DJwYpzWTftO/" target="_blank">
            Instagram 1
          </a>
        </div>
      </SectionCard>

    </div>
    </>
  );
}

/* ================= COMPONENTS ================= */

function SectionCard({ title, children }: any) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <div className="text-gray-700 text-sm">{children}</div>
    </div>
  );
}

function MealCard({ title, highlight, warning }: any) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <p className="text-green-700 font-medium">{highlight}</p>
      <p className="text-red-500 text-sm mt-1">❌ {warning}</p>
    </div>
  );
}