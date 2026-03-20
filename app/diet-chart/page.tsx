"use client";
import Header from "../components/Header";

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

export default function DietPlanPage() {
  return (
    <>
    
    <Header />
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-green-600">
          Weight Loss Diet Plan
        </h1>
        <p className="text-gray-500 mt-2">
          Follow strictly for best results
        </p>
      </div>

      {/* STEP 1 */}
      <SectionCard title="📸 Step 1: Starting Point">
        <p>Take a clear photo of your weight while standing on the weighing machine.</p>
        <p className="mt-2">📅 Track: Weekly once (or twice daily if needed)</p>
      </SectionCard>

      {/* BREAKFAST */}
      <MealCard
        title="🌅 Breakfast (7:00 AM – 8:00 AM)"
        highlight="Only our Weight Loss Mix"
        warning="Do NOT eat any other food"
      />

      {/* LUNCH */}
      <SectionCard title="🍛 Lunch (12:00 PM – 1:30 PM)">
        <ul className="list-disc ml-5 space-y-1">
          <li>Rice: 150–200 grams</li>
          <li>Dal: Required</li>
          <li>Vegetables: Any 2 varieties</li>
        </ul>

        <p className="mt-3 font-semibold text-green-600">Protein (Choose ONE):</p>
        <ul className="list-disc ml-5">
          <li>Paneer</li>
          <li>Tofu</li>
          <li>Broccoli</li>
          <li>Soya chunks</li>
        </ul>

        <p className="mt-3 font-semibold text-blue-600">Optional Protein:</p>
        <ul className="list-disc ml-5">
          <li>2–3 egg whites</li>
          <li>250g chicken breast</li>
          <li>4–5 fish pieces</li>
        </ul>
      </SectionCard>

      {/* SNACK */}
      <SectionCard title="☕ Evening Snack (3:30 PM – 4:30 PM)">
        <p className="font-semibold">Choose ANY ONE option:</p>

        <div className="mt-3 space-y-3">
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Option 1:</p>
            <p>200g popcorn OR puffed rice</p>
            <p className="text-red-500 text-sm">No butter / salt / masala</p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Option 2:</p>
            <p>Fruits (50–100g only)</p>
            <p className="text-sm text-gray-500">
              Apple, Watermelon, Pineapple, Grapes, Orange, Guava, Papaya
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Option 3:</p>
            <p>50g peanuts (fried or boiled)</p>
          </div>
        </div>
      </SectionCard>

      {/* DINNER */}
      <MealCard
        title="🌙 Dinner (6:00 PM – 7:00 PM)"
        highlight="Only our Weight Loss Mix"
        warning="No other foods allowed"
      />

      {/* WATER */}
      <SectionCard title="💧 Water Intake">
        <p>Drink 1 litre for every 20 kg body weight</p>
        <p className="mt-2">Example: 80kg → 4 litres/day</p>
        <p className="text-sm text-gray-500 mt-2">
          Drink slowly (sip by sip), not fast
        </p>
      </SectionCard>

      {/* SLEEP */}
      <SectionCard title="😴 Sleep Routine">
        <p>Sleep Time: 10:00 PM – 11:00 PM</p>
        <p>Duration: 6–8 hours (Compulsory)</p>
      </SectionCard>

      {/* DOs */}
      <SectionCard title="✅ DO’s">
        <ul className="list-disc ml-5 space-y-1 text-green-700">
          <li>Follow meal timings strictly</li>
          <li>Drink enough water</li>
          <li>Black tea/coffee without sugar</li>
          <li>Sleep properly</li>
          <li>Stay consistent</li>
        </ul>
      </SectionCard>

      {/* DONTs */}
      <SectionCard title="❌ DON’Ts">
        <ul className="list-disc ml-5 space-y-1 text-red-600">
          <li>Sugar</li>
          <li>Soft drinks</li>
          <li>Ice cream</li>
          <li>Bakery items</li>
          <li>Junk food</li>
          <li>Fried & processed food</li>
          <li>Late-night eating</li>
        </ul>
      </SectionCard>

      {/* VIDEOS */}
      <SectionCard title="🎥 Reference Videos">
        <div className="space-y-2 text-blue-600 underline">
          <a href="https://youtu.be/QPlAdDCRmfw?si=wBpxzDbHiJ1kVY8K" target="_blank">
            Weight Loss Mix
          </a>
          </div>
          <div className="space-y-2  max-sm:mt-2 text-blue-600 underline">
             <a href="https://www.instagram.com/reel/DJwYpzWTftO/?igsh=NmozMGljM3czOW91" target="_blank">
                Feel Fresh Tea
            </a>
          </div>
            <div className="space-y-4 max-sm:mt-2  text-blue-600 underline">
            <a href="https://www.instagram.com/reel/DMKUc1sR0nh/?igsh=cW9zMW5najdpMWY0" target="_blank">
                Asvara Preparation
            </a>
          </div>
      </SectionCard>
    </div>
 </>
  );
}