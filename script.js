// خريطة تحويل الأحرف من الإنجليزية إلى العربية
const englishToArabicMap = {
    'a': 'ش', 'b': 'لا', 'c': 'ؤ', 'd': 'ي', 'e': 'ث', 'f': 'ب', 'g': 'ل',
    'h': 'ا', 'i': 'ه', 'j': 'ت', 'k': 'ن', 'l': 'م', 'm': 'ة', 'n': 'ى',
    'o': 'خ', 'p': 'ح', 'q': 'ض', 'r': 'ق', 's': 'س', 't': 'ف', 'u': 'ع',
    'v': 'ر', 'w': 'ص', 'x': 'ء', 'y': 'غ', 'z': 'ئ', ';': 'ك', ',': 'و',
    '.': 'ز', ']': 'د', '[': 'ج', "'": 'ط', ' ': ' '
};

// خريطة تحويل الأحرف من العربية إلى الإنجليزية
const arabicToEnglishMap = Object.fromEntries(
    Object.entries(englishToArabicMap).map(([eng, ar]) => [ar, eng])
);

// دالة لتحويل النص من الإنجليزية إلى العربية
function convertToArabic(text) {
    return text.split('').map(char => englishToArabicMap[char] || char).join('');
}

// دالة لتحويل النص من العربية إلى الإنجليزية
function convertToEnglish(text) {
    return text.split('').map(char => arabicToEnglishMap[char] || char).join('');
}

// دالة لتحديد لغة النص
function isArabic(text) {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text);
}

// التعامل مع اختصار Ctrl + Space
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault(); // منع السلوك الافتراضي

        // الحصول على الحقل الذي يحتوي على التركيز
        const focusedElement = document.activeElement;
        
        // التحقق إذا كان الحقل هو إدخال نصي (input, textarea)
        if (focusedElement.tagName === 'TEXTAREA' || focusedElement.tagName === 'INPUT') {
            const currentText = focusedElement.value;

            // تحديد اللغة الحالية وتحويل النص
            const convertedText = isArabic(currentText)
                ? convertToEnglish(currentText)  // إذا كان النص عربياً حوّله إلى إنجليزي
                : convertToArabic(currentText);  // إذا كان النص إنجليزياً حوّله إلى عربي

            focusedElement.value = convertedText;
        }
    }
});
