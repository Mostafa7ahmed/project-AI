const questions = [
  {
    id: 1,
    text: "ما هي المهارات الأساسية المطلوبة للنجاح في مجال إدارة المشاريع؟",
    type: "radio",
    options: [
      "التخطيط فقط",
      "إدارة الوقت فقط",
      "التواصل فقط",
      "التخطيط، الوقت، التواصل، حل المشكلات"
    ]
  },
  {
    id: 2,
    text: "ما هي أفضل طريقة لتحسين مهارات التواصل في بيئة العمل؟",
    type: "radio",
    options: [
      "المشاركة في ورش عمل",
      "ممارسة التحدث أمام الجمهور",
      "الاستماع بفعالية",
      "جميع ما سبق"
    ]
  },
  {
    id: 3,
    text: "كيف يمكن قياس فعالية استراتيجيات التسويق الرقمي؟",
    type: "radio",
    options: [
      "عدد المتابعين فقط",
      "نسبة النقر للظهور",
      "العائد على الاستثمار",
      "كل ما سبق"
    ]
  }
];

let currentIndex = 0;

const totalQuestions = questions.length;
const container = document.getElementById("question-container");
const currentStep = document.getElementById("current-step");
const totalSteps = document.getElementById("total-steps");
const totalQ = document.getElementById("total-questions");
const progressFill = document.getElementById("progress-fill");

function renderQuestion(index) {
  const q = questions[index];
  currentStep.textContent = index + 1;
  totalSteps.textContent = totalQuestions;
  totalQ.textContent = totalQuestions;

  const options = q.options.map((opt, i) => `
    <label class="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition mb-2">
      <input type="radio" name="q${q.id}" value="${i}">
      <div>
        <p class="text-gray-800">${opt}</p>
      </div>
    </label>
  `).join("");

  container.innerHTML = `
    <div class="mb-4">
      <div class="flex items-center gap-2 mb-2">
        <span class="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-medium">${index + 1}</span>
        <h2 class="text-xl font-medium text-gray-900">السؤال ${index + 1}</h2>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <p class="text-gray-800 text-lg mb-2">${q.text}</p>
        <p class="text-gray-500 text-sm">اختر إجابة واحدة</p>
      </div>
    </div>
    <div class="space-y-3">${options}</div>
  `;

  // Update progress
  const progress = ((index + 1) / totalQuestions) * 100;
  progressFill.style.width = `${progress}%`;
}

// Event listeners
document.getElementById("next-btn").addEventListener("click", () => {
  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion(currentIndex);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  renderQuestion(currentIndex);
});
