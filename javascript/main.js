// main.js
// بيانات المنتجات
const menProducts = [
{
  "id": 1,
  "img": "img\/1.png",
  "name": "هوجو بوص",
  "descript": "ليمون، نعناع، فلفل وردي",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 },
 {
  "id": 2,
  "img": "img\/2.png",
  "name": "هوجو بوص",
  "descript": "زنجبيل، ليمون، أخشاب الأرز",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 },
 {
  "id": 3,
  "img": "img\/3.png",
  "name": "لاكوست",
  "descript": "ريحان، فلفل وردي، كاشمير",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 },
 {
  "id": 4,
  "img": "img\/4.png",
  "name": "تيد لابيدوس",
  "descript": "عسل، لافندر، تبغ",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 }
];
const womenProducts = [
{
  "id": 1,
  "img": "img\/1.png",
  "name": "أزارو (Azzaro)",
  "descript": "زهر البرتقال، كراميل، فانيليا",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 },
 {
  "id": 2,
  "img": "img\/2.png",
  "name": "ماري كوانت",
  "descript": "كلاسيكي، بودري، أخشاب",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 },
 {
  "id": 3,
  "img": "img\/3.png",
  "name": "طبيعي",
  "descript": "زيت زهرة الياسمين النقي",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 },
 {
  "id": 4,
  "img": "img\/4.png",
  "name": "شرقي",
  "descript": "زهري هادئ، مسك",
  "price": 1200,
  "badge": "%20 خصم",
  "badge2": "الاعلي مبيعا"
 }
];
const unisexProducts = [
{
        "id": 1,
        "img": "img\/1.png",
        "name": "شرقي",
        "descript": "قطن، نظافة، مسك أبيض",
        "price": 1200,
        "badge": "%20 خصم",
        "badge2": "الاعلي مبيعا"
    },
    {
        "id": 2,
        "img": "img\/2.png",
        "name": "طبيعي",
        "descript": "جوز هند استوائي",
        "price": 1200,
        "badge": "%20 خصم",
        "badge2": "الاعلي مبيعا"
    },
    {
        "id": 3,
        "img": "img\/3.png",
        "name": "شرقي مصري",
        "descript": "عود، بخور، عنبر",
        "price": 1200,
        "badge": "%20 خصم",
        "badge2": "الاعلي مبيعا"
    },
    {
        "id": 4,
        "img": "img\/4.png",
        "name": "شرقي",
        "descript": "مسك غزال، عنبر دافئ",
        "price": 1200,
        "badge": "%20 خصم",
        "badge2": "الاعلي مبيعا"
    }
];

// عوامل الزيادة
const sizeAdd = { "30 مل": 0, "50 مل": 2500, "100 مل": 6000 };
const shapeAdd = { "زجاجة كلاسيكية (مربعة)": 0, "زجاجة عصرية (دائرية)": 1500, "زجاجة أنيقة (بيضاوية)": 2500 };
const concAdd = { "70% كحول / 30% عطر": 0, "50% كحول / 50% عطر": 2000, "40% كحول / 60% عطر": 4000 };

// متغيرات المودال
let currentCustomProduct = null;
let currentStep = 1;
let selectedSize = null, selectedShape = null, selectedConc = null;
let activeModal = null;

// === صور حقيقية ===
const sizeImages = {
    "30 مل": "img/per_30_ml.jpg",
    "50 مل": "img/per_50_ml.jpg",
    "100 مل": "img/per_100_ml.jpg"
};
const shapeImages = {
    "زجاجة كلاسيكية (مربعة)": "img/style1.png",
    "زجاجة عصرية (دائرية)": "img/style2.png",
    "زجاجة أنيقة (بيضاوية)": "img/style3.png"
};
const concImages = {
    "70% كحول / 30% عطر": "https://images.pexels.com/photos/1394188/pexels-photo-1394188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    "50% كحول / 50% عطر": "https://images.pexels.com/photos/1394188/pexels-photo-1394188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    "40% كحول / 60% عطر": "https://images.pexels.com/photos/1394188/pexels-photo-1394188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
}
function getSafeImageUrl(type, key) {
    if (type === 'size') return sizeImages[key] || "https://placehold.co/150x150?text=Perfume";
    if (type === 'shape') return shapeImages[key] || "https://placehold.co/150x150?text=Bottle";
    if (type === 'conc') return concImages[key] || "https://placehold.co/150x150?text=Concentration";
    return "https://placehold.co/150x150?text=Image";
}

// عرض المنتجات في شبكة
function renderProductGrid(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = products.map(p => `
         <div class="card fade-up" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}">
            <span class="badge-left">${p.badge}</span>
            <div class="img"><img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/200x200?text=Misk'"></div>
            <div class="content">
                <div class="info">
                    ${p.name}
                </div>
                <div class="descript">
                    ${p.descript}
                </div>
                <div class="price">
                ${p.price.toLocaleString()}
                 جنيه
                </div>
            </div>
        </div>
    `).join('');
    document.querySelectorAll(`#${containerId} .card`).forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.closest('.badge-left') || e.target.closest('.badge-right')) return;
            const name = card.getAttribute('data-name');
            const price = parseInt(card.getAttribute('data-price'));
            openCustomizeModal({ name, basePrice: price });
        });
    });
}

// فتح مودال التخصيص
function openCustomizeModal(product) {
    currentCustomProduct = product;
    selectedSize = null; selectedShape = null; selectedConc = null;
    currentStep = 1;
    if (!activeModal) {
        activeModal = document.createElement('div');
        activeModal.className = 'customize-modal';
        activeModal.id = 'customizeModal';
        activeModal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header"><h3>تخصيص العطر</h3><button class="close-modal" id="closeCustomModal"><i class="fas fa-times"></i></button></div>
                <div class="product-preview" id="customModalPreview"></div>
                <div id="customModalStepContent"></div>
                <button class="back-step" id="customBackBtn" style="display: none;"><i class="fas fa-arrow-right"></i> العودة للخطوة السابقة </button>
            </div>
        `;
        document.body.appendChild(activeModal);
        document.getElementById('closeCustomModal').addEventListener('click', () => activeModal.classList.remove('active'));
        document.getElementById('customBackBtn').addEventListener('click', () => {
            if (currentStep === 2) { currentStep = 1; renderModalStep(); }
            else if (currentStep === 3) { currentStep = 2; renderModalStep(); }
        });
    }
    renderModalStep();
    activeModal.classList.add('active');
}

function computeCurrentPrice() {
    if (!currentCustomProduct) return 0;
    let add = (selectedSize ? sizeAdd[selectedSize] : 0) + (selectedShape ? shapeAdd[selectedShape] : 0) + (selectedConc ? concAdd[selectedConc] : 0);
    return currentCustomProduct.basePrice + add;
}

function renderModalStep() {
    if (!currentCustomProduct) return;
    const preview = document.getElementById('customModalPreview');
    const stepDiv = document.getElementById('customModalStepContent');
    const backBtn = document.getElementById('customBackBtn');
    const priceNow = computeCurrentPrice();
    preview.innerHTML = `<div style="font-weight:bold;">🧴 ${currentCustomProduct.name}</div><div>السعر الأساسي: ${currentCustomProduct.basePrice.toLocaleString()} جنيه</div><div class="current-price-badge">💰 السعر الحالي: ${priceNow.toLocaleString()} جنيه</div>`;
    
    if (currentStep === 1) {
        stepDiv.innerHTML = `
            <div class="step-title">📏 اختر حجم الزجاجة</div>
            <div class="option-group">
                <div class="option-image" data-size="30 مل"><img src="${getSafeImageUrl('size', '30 مل')}" alt="30 مل"><span>30 مل (بدون زيادة)</span></div>
                <div class="option-image" data-size="50 مل"><img src="${getSafeImageUrl('size', '50 مل')}" alt="50 مل"><span>50 مل + ${sizeAdd["50 مل"]} جنيه</span></div>
                <div class="option-image" data-size="100 مل"><img src="${getSafeImageUrl('size', '100 مل')}" alt="100 مل"><span>100 مل + ${sizeAdd["100 مل"]} جنيه</span></div>
            </div>
        `;
        backBtn.style.display = 'none';
        document.querySelectorAll('.option-image').forEach(div => {
            div.addEventListener('click', () => {
                selectedSize = div.getAttribute('data-size');
                currentStep = 2;
                renderModalStep();
            });
        });
    } else if (currentStep === 2) {
        stepDiv.innerHTML = `
            <div class="step-title">🏺 اختر شكل الزجاجة</div>
            <div class="option-group">
                <div class="option-image" data-shape="زجاجة كلاسيكية (مربعة)"><img src="${getSafeImageUrl('shape', 'زجاجة كلاسيكية (مربعة)')}" alt="كلاسيكية"><span>كلاسيكية (بدون)</span></div>
                <div class="option-image" data-shape="زجاجة عصرية (دائرية)"><img src="${getSafeImageUrl('shape', 'زجاجة عصرية (دائرية)')}" alt="عصرية"><span>عصرية + ${shapeAdd["زجاجة عصرية (دائرية)"]} جنيه</span></div>
                <div class="option-image" data-shape="زجاجة أنيقة (بيضاوية)"><img src="${getSafeImageUrl('shape', 'زجاجة أنيقة (بيضاوية)')}" alt="أنيقة"><span>أنيقة + ${shapeAdd["زجاجة أنيقة (بيضاوية)"]} جنيه</span></div>
            </div>
        `;
        backBtn.style.display = 'flex';
        document.querySelectorAll('.option-image').forEach(div => {
            div.addEventListener('click', () => {
                selectedShape = div.getAttribute('data-shape');
                currentStep = 3;
                renderModalStep();
            });
        });
    } else if (currentStep === 3) {
        stepDiv.innerHTML = `
            <div class="step-title">⚖️ اختر نسبة الكحول / التركيز</div>
            <div class="option-group">
                <div class="option-image" data-conc="70% كحول / 30% عطر"><img src="${getSafeImageUrl('conc', '70% كحول / 30% عطر')}" alt="70/30"><span>70/30 (بدون)</span></div>
                <div class="option-image" data-conc="50% كحول / 50% عطر"><img src="${getSafeImageUrl('conc', '50% كحول / 50% عطر')}" alt="50/50"><span>50/50 + ${concAdd["50% كحول / 50% عطر"]} جنيه</span></div>
                <div class="option-image" data-conc="40% كحول / 60% عطر"><img src="${getSafeImageUrl('conc', '40% كحول / 60% عطر')}" alt="40/60"><span>40/60 + ${concAdd["40% كحول / 60% عطر"]} جنيه</span></div>
            </div>
            <hr><div style="text-align:center; margin-top:10px;">🔔 اضغط على الخيار لإضافة المنتج إلى السلة</div>
        `;
        backBtn.style.display = 'flex';
        document.querySelectorAll('.option-image').forEach(div => {
            div.addEventListener('click', () => {
                selectedConc = div.getAttribute('data-conc');
                const finalPrice = computeCurrentPrice();
                const product = {
                    productName: currentCustomProduct.name,
                    size: selectedSize,
                    shape: selectedShape,
                    concentration: selectedConc,
                    price: finalPrice
                };
                addToCart(product);
                activeModal.classList.remove('active');
            });
        });
    }
}

// الطلب الخاص
document.getElementById('addCustomToCart')?.addEventListener('click', () => {
    const name = document.getElementById('customName').value.trim();
    if (!name) { alert("الرجاء إدخال اسم العطر"); return; }
    const size = document.getElementById('customSize').value.trim() || "غير محدد";
    const shape = document.getElementById('customShape').value.trim() || "غير محدد";
    const conc = document.getElementById('customConc').value.trim() || "غير محدد";
    const product = {
        productName: name,
        size: size,
        shape: shape,
        concentration: conc,
        price: 0,
        isCustom: true
    };
    addToCart(product);
    document.getElementById('customName').value = '';
    document.getElementById('customSize').value = '';
    document.getElementById('customShape').value = '';
    document.getElementById('customConc').value = '';
});

// إرسال الطلب عبر واتساب
document.getElementById('checkoutWhatsappBtn')?.addEventListener('click', () => {
    const cart = getCart();
    if (cart.length === 0) { alert("السلة فارغة"); return; }
    let phone = document.getElementById('whatsappNumber').value.trim();
    if (!phone) phone = "201098626918";
    let cleaned = phone.replace(/[^0-9+]/g, '');
    if (!cleaned.startsWith('+')) { if (cleaned.startsWith('0')) cleaned = '20' + cleaned.substring(1); if (!cleaned.startsWith('20')) cleaned = '20' + cleaned; cleaned = '+' + cleaned; }
    let message = `🛍️ *طلب جديد من Misk*%0a%0a`;
    cart.forEach((item, idx) => {
        message += `✨ ${idx+1}- *${item.productName}*%0a   📦 الحجم: ${item.size}%0a   🍾 الشكل: ${item.shape}%0a   ⚖️ التركيز: ${item.concentration}%0a   💰 السعر: ${item.price === 0 ? 'يتم الاتفاق عليه' : item.price.toLocaleString() + ' جنيه'}%0a%0a`;
    });
    const total = cart.reduce((s,i)=> s + (i.price || 0), 0);
    message += `💰 *الإجمالي الكلي: ${total === 0 ? 'سيتم تحديده' : total.toLocaleString() + ' جنيه'}*%0a`;
    window.open(`https://wa.me/${cleaned}?text=${message}`, '_blank');
});

// القائمة المنسدلة (الهامبرغر)
const burger = document.querySelector(".burger-icon");
const headerMenu = document.querySelector("header ul");
if (burger && headerMenu) {
    burger.addEventListener("click", () => headerMenu.classList.toggle("show"));
    document.addEventListener("click", (e) => { if (!headerMenu.contains(e.target) && !burger.contains(e.target)) headerMenu.classList.remove("show"); });
}

// تحميل المنتجات وتهيئة السلة
renderProductGrid('menProducts', menProducts);
renderProductGrid('womenProducts', womenProducts);
renderProductGrid('unisexProducts', unisexProducts);
initCart(); 

// scroll bar - حل نهائي وآمن
const scroller = document.querySelector('.scroller');
if (scroller) {
    function updateScroller() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const maxScroll = scrollHeight - clientHeight;
        
        if (maxScroll > 0) {
            const percent = (scrollTop / maxScroll) * 100;
            scroller.style.width = percent + '%';
            scroller.style.display = 'block';
        } else {
            scroller.style.width = '0%';
            scroller.style.display = 'none';
        }
    }

    window.addEventListener('scroll', updateScroller);
    window.addEventListener('resize', updateScroller);
    
    // مراقبة التغييرات في DOM (مثل إضافة المنتجات لاحقاً)
    const observer = new MutationObserver(updateScroller);
    observer.observe(document.body, { childList: true, subtree: true });
    
    updateScroller(); // تنفيذ أولي
}

// إظهار العناصر عند التمرير (Intersection Observer)
const observerOptions = {
    threshold: 0.2,  // نسبة ظهور العنصر قبل تشغيل التأثير (0.2 = 20%)
    rootMargin: "0px 0px -50px 0px" // ضبط بسيط لتأخير أو تقديم التأثير
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // يمكنك إلغاء المراقبة بعد الإظهار لتحسين الأداء:
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// بعد تحميل المنتجات، ابحث عن كل العناصر التي تحمل كلاس 'fade-up' وراقبها
function observeFadeElements() {
    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

// نفذ المراقبة أول مرة، وأيضاً عند إضافة منتجات ديناميكياً (مثل عبر التخصيص)
observeFadeElements();

// في حال إضافة عناصر جديدة بعد تحميل الصفحة (مثل فلاتر أو تحميل المزيد)
// يمكن استدعاء observeFadeElements() مرة أخرى
// مراقبة التغييرات على class السلة باستخدام MutationObserver
const cartSidebar = document.getElementById('cartSidebar');
if (cartSidebar) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                handleCartSidebarState();
            }
        });
    });
    observer.observe(cartSidebar, { attributes: true });
    // استدعاء أولي لتطبيق الحالة في حال كانت السلة مفتوحة بالفعل
    handleCartSidebarState();
}

// تأكد من إغلاق السلة عند النقر على overlay وإعادة الحالة
const cartOverlay = document.getElementById('cartOverlay');
if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
        // عند إغلاق السلة، سيتم إزالة class open، والمُراقب سيتولى الباقي
    });
}
const closeCartBtn = document.getElementById('closeCartBtn');
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        // نفس الشيء، التغيير في class سيعيد الحالة
    });
}
