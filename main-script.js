
// ====== نظام التسجيل للموقع الدعائي - مركز العبير السوداني ======

// متغيرات النظام
let isSubmitting = false;
let swiperInstances = {};

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 بدء تحميل الموقع الدعائي...");
    
    // تحديث السنة في التذييل
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // إخفاء شاشة التحميل
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 2000);
    
    // إعداد التنقل
    setupNavigation();
    
    // إعداد سويبر للفريق
    setupTeamSwiper();
    
    // إعداد سويبر للآراء
    setupTestimonialsSwiper();
    
    // إعداد تبادل الخدمات
    setupServicesTabs();
    
    // إعداد تصفية الكورسات
    setupCoursesFilter();
    
    // إعداد الأسئلة الشائعة
    setupFAQ();
    
    // إعداد نموذج التسجيل
    setupRegistrationForm();
    
    // إعداد تحقق رقم الهاتف
    setupPhoneValidation();
    
    // إعداد زر العودة للأعلى
    setupBackToTop();
    
    // إعداد التمرير السلس
    setupSmoothScrolling();
    
    // إعداد المراقبة للعناصر عند الظهور
    setupIntersectionObserver();
    
    // اختبار اتصال Firebase
    setTimeout(testFirebaseConnection, 2000);
    
    console.log("✅ الموقع الدعائي جاهز");
});

// ====== إعداد التنقل ======
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.dropdown > .has-dropdown');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // إغلاق القائمة عند النقر على رابط
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('has-dropdown')) {
                    e.preventDefault();
                    const dropdown = link.parentElement;
                    dropdown.classList.toggle('active');
                } else {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // تغيير لون الشريط عند التمرير
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ====== إعداد سويبر للفريق ======
function setupTeamSwiper() {
    swiperInstances.team = new Swiper('.team-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
}

// ====== إعداد سويبر للآراء ======
function setupTestimonialsSwiper() {
    swiperInstances.testimonials = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        }
    });
}

// ====== إعداد تبادل الخدمات ======
function setupServicesTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة النشاط من جميع الأزرار
            tabBtns.forEach(b => b.classList.remove('active'));
            // إخفاء جميع المحتويات
            tabContents.forEach(content => content.classList.remove('active'));
            
            // إضافة النشاط للزر المحدد
            btn.classList.add('active');
            
            // عرض المحتوى المناسب
            const tabId = btn.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId + '-tab');
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// ====== إعداد تصفية الكورسات ======
function setupCoursesFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة النشاط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المحدد
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // تصفية الكورسات
            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'flex';
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ====== إعداد الأسئلة الشائعة ======
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // إغلاق جميع الأسئلة
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // فتح السؤال المحدد إذا لم يكن مفتوحاً
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ====== إعداد نموذج التسجيل ======
function setupRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        // جمع البيانات
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            countryCode: document.getElementById('countryCode').value,
            phone: document.getElementById('phone').value.trim(),
            educationLevel: document.getElementById('educationLevel').value,
            serviceInterest: document.getElementById('serviceInterest').value,
            message: document.getElementById('message').value.trim(),
            registrationDate: new Date().toISOString(),
            status: 'pending',
            contacted: false,
            source: 'موقع دعائي',
            timestamp: new Date().toISOString()
        };
        
        // التحقق من البيانات
        if (!validateFormData(formData)) {
            return;
        }
        
        // دمج رمز الدولة مع الرقم
        formData.fullPhone = formData.countryCode + ' ' + formData.phone;
        
        // إرسال البيانات
        await submitRegistration(formData);
    });
    
    // إضافة تحقق أثناء الكتابة
    addInputValidation();
}

// ====== التحقق من بيانات النموذج ======
function validateFormData(data) {
    // إعادة تعيين الأخطاء
    clearErrors();
    
    let isValid = true;
    
    // التحقق من الاسم
    if (!data.fullName || data.fullName.length < 3) {
        showError('fullName', 'الاسم يجب أن يكون 3 أحرف على الأقل');
        isValid = false;
    } else if (data.fullName.length > 100) {
        showError('fullName', 'الاسم طويل جداً (الحد الأقصى 100 حرف)');
        isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('email', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // التحقق من الدولة
    if (!data.countryCode) {
        showError('countryCode', 'يرجى اختيار الدولة');
        isValid = false;
    }
    
    // التحقق من رقم الهاتف
    if (!validatePhoneNumber(data.countryCode, data.phone)) {
        showError('phone', 'رقم الهاتف غير صحيح لهذه الدولة');
        isValid = false;
    }
    
    // التحقق من المستوى التعليمي
    if (!data.educationLevel) {
        showError('educationLevel', 'يرجى اختيار المستوى التعليمي');
        isValid = false;
    }
    
    // التحقق من الخدمة المطلوبة
    if (!data.serviceInterest) {
        showError('serviceInterest', 'يرجى اختيار الخدمة المطلوبة');
        isValid = false;
    }
    
    // التحقق من الرسالة
    if (data.message && data.message.length > 500) {
        showError('message', 'الرسالة طويلة جداً (الحد الأقصى 500 حرف)');
        isValid = false;
    }
    
    // التحقق من الموافقة على الشروط
    const agreeTerms = document.getElementById('agreeTerms');
    if (!agreeTerms.checked) {
        alert('يرجى الموافقة على الشروط والأحكام للمتابعة');
        isValid = false;
    }
    
    return isValid;
}

// ====== إعداد تحقق رقم الهاتف ======
function setupPhoneValidation() {
    const countrySelect = document.getElementById('countryCode');
    const phoneInput = document.getElementById('phone');
    
    if (!countrySelect || !phoneInput) return;
    
    // تحديث التلميح عند تغيير الدولة
    countrySelect.addEventListener('change', function() {
        updatePhoneHint(this.value);
    });
    
    // تحقق أثناء الكتابة
    phoneInput.addEventListener('input', function() {
        const countryCode = countrySelect.value;
        const phone = this.value.trim();
        
        if (phone && countryCode) {
            if (validatePhoneNumber(countryCode, phone)) {
                showSuccess('phone', '✓ رقم صحيح');
            } else {
                showError('phone', 'رقم غير صحيح');
            }
        } else {
            clearFieldStatus('phone');
        }
    });
    
    // تحديث التلميح الأولي
    if (countrySelect.value) {
        updatePhoneHint(countrySelect.value);
    }
}

// ====== تحديث تلميح رقم الهاتف ======
function updatePhoneHint(countryCode) {
    const hints = {
        '+249': 'تنسيق سوداني: 9XXXXXXXX',
        '+966': 'تنسيق سعودي: 5XXXXXXXX',
        '+971': 'تنسيق إماراتي: 5XXXXXXXX',
        '+20': 'تنسيق مصري: 1XXXXXXXXX',
        '+962': 'تنسيق أردني: 7XXXXXXXX',
        '+973': 'تنسيق بحريني: 3XXXXXXXX',
        '+974': 'تنسيق قطري: 3XXXXXXXX',
        '+968': 'تنسيق عماني: 9XXXXXXXX',
        '+965': 'تنسيق كويتي: 5XXXXXXXX',
        '+213': 'تنسيق جزائري: 5XXXXXXXX',
        '+212': 'تنسيق مغربي: 6XXXXXXXX',
        '+216': 'تنسيق تونسي: 2XXXXXXXX',
        '+218': 'تنسيق ليبي: 9XXXXXXXX',
        '+967': 'تنسيق يمني: 7XXXXXXXX',
        '+961': 'تنسيق لبناني: 3XXXXXXXX',
        '+963': 'تنسيق سوري: 9XXXXXXXX',
        '+964': 'تنسيق عراقي: 7XXXXXXXX',
        '+970': 'تنسيق فلسطيني: 5XXXXXXXX'
    };
    
    const phoneHint = document.getElementById('phoneHint');
    if (phoneHint) {
        phoneHint.textContent = hints[countryCode] || 'أدخل رقم الهاتف الصحيح';
    }
}

// ====== تحقق من صحة رقم الهاتف حسب الدولة ======
function validatePhoneNumber(countryCode, phone) {
    const phoneStr = phone.toString().trim();
    if (!phoneStr) return false;
    
    // أنماط التحقق لكل دولة
    const patterns = {
        '+249': /^9[0-9]{8}$/,          // السودان
        '+966': /^5[0-9]{8}$/,          // السعودية
        '+971': /^5[0-9]{8}$/,          // الإمارات
        '+20': /^1[0-9]{9}$/,           // مصر
        '+962': /^7[0-9]{8}$/,          // الأردن
        '+973': /^3[0-9]{7}$/,          // البحرين
        '+974': /^3[0-9]{7}$/,          // قطر
        '+968': /^9[0-9]{7}$/,          // عمان
        '+965': /^[569][0-9]{7}$/,      // الكويت
        '+213': /^5[0-9]{8}$/,          // الجزائر
        '+212': /^6[0-9]{8}$/,          // المغرب
        '+216': /^[2459][0-9]{7}$/,     // تونس
        '+218': /^9[0-9]{8}$/,          // ليبيا
        '+967': /^7[0-9]{8}$/,          // اليمن
        '+961': /^[37][0-9]{7}$/,       // لبنان
        '+963': /^9[0-9]{8}$/,          // سوريا
        '+964': /^7[0-9]{9}$/,          // العراق
        '+970': /^5[0-9]{7}$/           // فلسطين
    };
    
    const pattern = patterns[countryCode];
    if (!pattern) return true; // إذا لم تكن الدولة معروفة، تقبل الرقم
    
    return pattern.test(phoneStr);
}

// ====== إرسال التسجيل ======
async function submitRegistration(formData) {
    isSubmitting = true;
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-content');
    const btnLoader = document.getElementById('btnLoader');
    
    // عرض التحميل
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    submitBtn.disabled = true;
    
    // إخفاء أي رسائل سابقة
    hideAllMessages();
    
    try {
        let savedId = null;
        let retryCount = 0;
        
        // المحاولة 1: Firebase
        while (retryCount < 3 && !savedId) {
            try {
                savedId = await saveToFirebase(formData);
                break;
            } catch (error) {
                retryCount++;
                console.log(`🔄 إعادة المحاولة ${retryCount}/3`);
                
                if (retryCount === 3) {
                    throw error;
                }
                
                // الانتظار قبل إعادة المحاولة
                await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
            }
        }
        
        // إذا نجح الحفظ في Firebase
        if (savedId) {
            showSuccessMessage(savedId);
            document.getElementById('registrationForm').reset();
            clearErrors();
            
            // إعادة تعيين الموافقة
            document.getElementById('agreeTerms').checked = false;
        }
        
    } catch (error) {
        console.error("❌ فشل حفظ البيانات:", error);
        
        // المحاولة 2: الحفظ المحلي
        try {
            const localId = await saveToLocalStorage(formData);
            showWarningMessage(localId, 'تم حفظ بياناتك محلياً وسيتم مزامنتها لاحقاً');
            document.getElementById('registrationForm').reset();
            clearErrors();
            
            // إعادة تعيين الموافقة
            document.getElementById('agreeTerms').checked = false;
        } catch (localError) {
            console.error("❌ فشل الحفظ المحلي:", localError);
            showErrorMessage('حدث خطأ في حفظ البيانات. يرجى المحاولة مرة أخرى أو الاتصال بنا.');
        }
        
    } finally {
        // إعادة تعيين الزر
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        isSubmitting = false;
    }
}

// ====== حفظ في Firebase ======
async function saveToFirebase(formData) {
    if (!database) {
        throw new Error('Firebase غير متاح');
    }
    
    const subscriberId = 'SD_REG_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8).toUpperCase();
    formData.id = subscriberId;
    
    await database.ref('subscribers/' + subscriberId).set(formData);
    
    console.log('✅ تم الحفظ في Firebase:', subscriberId);
    return subscriberId;
}

// ====== حفظ في localStorage ======
async function saveToLocalStorage(formData) {
    return new Promise((resolve, reject) => {
        try {
            const subscriberId = 'LOCAL_REG_' + Date.now();
            formData.id = subscriberId;
            formData.localSaved = true;
            formData.localSaveDate = new Date().toISOString();
            
            let localData = JSON.parse(localStorage.getItem('elabeer_subscribers') || '[]');
            localData.push(formData);
            
            // حفظ فقط آخر 100 تسجيل
            if (localData.length > 100) {
                localData = localData.slice(-100);
            }
            
            localStorage.setItem('elabeer_subscribers', JSON.stringify(localData));
            
            console.log('💾 تم الحفظ محلياً:', subscriberId);
            resolve(subscriberId);
            
        } catch (error) {
            reject(error);
        }
    });
}

// ====== إضافة تحقق أثناء الكتابة ======
function addInputValidation() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value;
            // السماح فقط بالأرقام
            value = value.replace(/\D/g, '');
            
            // التحقق من طول الرقم
            if (value.length > 15) {
                value = value.substring(0, 15);
            }
            
            e.target.value = value;
        });
    }
    
    const nameInput = document.getElementById('fullName');
    if (nameInput) {
        nameInput.addEventListener('input', function(e) {
            // السماح فقط بالحروف العربية والفراغات
            let value = e.target.value;
            value = value.replace(/[^ء-ي\s]/g, '');
            
            // التحقق من الطول
            if (value.length > 100) {
                value = value.substring(0, 100);
            }
            
            e.target.value = value;
        });
    }
    
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                showError('email', 'صيغة البريد الإلكتروني غير صحيحة');
            } else if (email) {
                showSuccess('email', '✓ صيغة صحيحة');
            }
        });
    }
    
    const messageInput = document.getElementById('message');
    if (messageInput) {
        const charCount = document.createElement('div');
        charCount.className = 'char-count';
        charCount.style.fontSize = '0.9rem';
        charCount.style.color = 'var(--gray-color)';
        charCount.style.marginTop = '5px';
        charCount.style.textAlign = 'left';
        messageInput.parentNode.appendChild(charCount);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = `${length}/500 حرف`;
            
            if (length > 500) {
                charCount.style.color = 'var(--danger-color)';
            } else {
                charCount.style.color = 'var(--gray-color)';
            }
        });
    }
}

// ====== إعداد زر العودة للأعلى ======
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====== إعداد التمرير السلس ======
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // إغلاق القائمة التنقل على الهواتف
                const navMenu = document.getElementById('navMenu');
                const navToggle = document.getElementById('navToggle');
                if (navMenu && navToggle) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ====== إعداد المراقبة للعناصر عند الظهور ======
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .feature-card, .testimonial-card, ' +
        '.course-card, .team-card, .about-content, ' +
        '.trust-badge, .stat-item'
    );
    
    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
}

// ====== اختبار اتصال Firebase ======
async function testFirebaseConnection() {
    if (!database) {
        console.warn("⚠️ Firebase غير مهيأ لاختبار الاتصال");
        return;
    }
    
    try {
        // اختبار بسيط للاتصال
        const testRef = database.ref('connection_test');
        await testRef.set({
            test: true,
            timestamp: new Date().toISOString(),
            from: 'ad_site',
            version: '2.0'
        });
        
        console.log("✅ اتصال Firebase يعمل");
        
        // تنظيف بعد 5 ثواني
        setTimeout(() => {
            testRef.remove();
        }, 5000);
        
    } catch (error) {
        console.warn("⚠️ Firebase غير متصل:", error.message);
    }
}

// ====== دوال عرض الرسائل ======
function showSuccessMessage(subscriberId) {
    const successMessage = document.getElementById('successMessage');
    const registrationId = document.getElementById('registrationId');
    
    if (successMessage && registrationId) {
        registrationId.textContent = subscriberId;
        successMessage.classList.add('show');
        
        // إرسال إشعار
        showNotification('تم التسجيل بنجاح!', 'success');
        
        // إخفاء تلقائي بعد 10 ثواني
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 10000);
    }
}

function showWarningMessage(subscriberId, message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorMessage && errorText) {
        errorText.innerHTML = `${message}<br><small>رقم التسجيل: ${subscriberId}</small>`;
        errorMessage.classList.add('show');
        
        // إرسال إشعار
        showNotification('تم الحفظ محلياً', 'warning');
        
        // إخفاء تلقائي بعد 10 ثواني
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 10000);
    }
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorMessage && errorText) {
        errorText.textContent = message;
        errorMessage.classList.add('show');
        
        // إرسال إشعار
        showNotification('حدث خطأ!', 'error');
        
        // إخفاء تلقائي بعد 5 ثواني
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
}

function hideSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.classList.remove('show');
    }
}

function hideErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.classList.remove('show');
    }
}

function hideAllMessages() {
    hideSuccessMessage();
    hideErrorMessage();
}

// ====== دوال التحقق والعرض ======
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('error');
        field.classList.remove('success');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        // إضافة تأثير اهتزاز
        field.style.animation = 'shake 0.5s';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }
}

function showSuccess(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.add('success');
        field.classList.remove('error');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
}

function clearFieldStatus(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.remove('error', 'success');
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
}

function clearErrors() {
    const fields = ['fullName', 'email', 'countryCode', 'phone', 'educationLevel', 'serviceInterest', 'message'];
    fields.forEach(fieldId => clearFieldStatus(fieldId));
}

// ====== دالة إنشاء الإشعارات ======
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // إضافة أنيميشن
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // إغلاق الإشعار
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // إزالة تلقائية بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ====== إضافة أنيميشن الهز ======
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        border-right: 4px solid;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-color: var(--success-color);
    }
    
    .notification-warning {
        border-color: var(--warning-color);
    }
    
    .notification-error {
        border-color: var(--danger-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-grow: 1;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification-success .notification-content i {
        color: var(--success-color);
    }
    
    .notification-warning .notification-content i {
        color: var(--warning-color);
    }
    
    .notification-error .notification-content i {
        color: var(--danger-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-color);
        cursor: pointer;
        font-size: 1rem;
        padding: 5px;
    }
    
    .notification-close:hover {
        color: var(--dark-color);
    }
    
    .char-count {
        font-size: 0.9rem;
        color: var(--gray-color);
        margin-top: 5px;
        text-align: left;
    }
`;
document.head.appendChild(style);

// ====== دالة مساعدة للتحقق من رقم الهاتف السوداني ======
function isValidSudanesePhone(phone) {
    // تنسيق رقم سوداني: 9XXXXXXXX
    const sudaneseRegex = /^9[0-9]{8}$/;
    return sudaneseRegex.test(phone);
}

// ====== دالة مساعدة لتنسيق التاريخ ======
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ====== مراقبة اتصال الإنترنت ======
window.addEventListener('online', () => {
    console.log("🌐 اتصال الإنترنت عاد");
    showNotification('تم استعادة الاتصال بالإنترنت', 'success');
    
    // محاولة مزامنة البيانات المحلية مع Firebase
    syncLocalDataWithFirebase();
    
    // إعادة تهيئة Firebase
    if (typeof initializeFirebase === 'function') {
        initializeFirebase();
    }
});

window.addEventListener('offline', () => {
    console.log("❌ فقدان اتصال الإنترنت");
    showNotification('تم فقدان الاتصال بالإنترنت', 'warning');
});

// ====== مزامنة البيانات المحلية مع Firebase ======
async function syncLocalDataWithFirebase() {
    try {
        const localData = JSON.parse(localStorage.getItem('elabeer_subscribers') || '[]');
        if (localData.length === 0 || !database) return;
        
        console.log(`🔄 محاولة مزامنة ${localData.length} تسجيل محلي مع Firebase`);
        
        for (const data of localData) {
            if (data.localSaved && !data.synced) {
                try {
                    await database.ref('subscribers/' + data.id).set(data);
                    data.synced = true;
                    data.syncDate = new Date().toISOString();
                    console.log(`✅ تمت مزامنة التسجيل: ${data.id}`);
                } catch (error) {
                    console.error(`❌ فشل مزامنة التسجيل ${data.id}:`, error);
                }
            }
        }
        
        // حفظ البيانات المحدثة
        localStorage.setItem('elabeer_subscribers', JSON.stringify(localData));
        
    } catch (error) {
        console.error('❌ خطأ في مزامنة البيانات:', error);
    }
}

// ====== تهيئة Firebase من الملف المنفصل ======
setTimeout(() => {
    if (typeof initializeFirebase === 'function') {
        initializeFirebase();
    }
    
    // محاولة مزامنة البيانات عند التحميل
    setTimeout(syncLocalDataWithFirebase, 5000);
}, 1000);

// ====== تحسين أداء الصور ======
function setupImageOptimization() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // إضافة تحميل كسول للصور
        img.loading = 'lazy';
        
        // إضافة نص بديل إذا لم يكن موجوداً
        if (!img.alt) {
            img.alt = 'مركز العبير السوداني';
        }
    });
}

// تهيئة تحسين الصور
setupImageOptimization();