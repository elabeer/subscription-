// إعدادات Firebase للموقع الدعائي فقط
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC2FBTkfWv5giLMAm2K4Dz4QYNk-bOBg3w",
    authDomain: "el-abeer.firebaseapp.com",
    databaseURL: "https://el-abeer-default-rtdb.firebaseio.com",
    projectId: "el-abeer",
    storageBucket: "el-abeer.firebasestorage.app",
    messagingSenderId: "608687235735",
    appId: "1:608687235735:web:4f12a76e8483872bcd7fd2",
    measurementId: "G-BD6LM7NXS6"
};

// متغيرات النظام
let firebaseApp = null;
let database = null;
let isFirebaseInitialized = false;
let isConnected = false;

// تهيئة Firebase
function initializeFirebase() {
    try {
        console.log("🚀 جاري تهيئة Firebase...");
        
        if (typeof firebase === 'undefined') {
            throw new Error('Firebase SDK غير محمل');
        }
        
        if (firebase.apps.length > 0) {
            firebaseApp = firebase.apps[0];
            console.log("⚡ استخدام تطبيق Firebase موجود");
        } else {
            firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
            console.log("✅ تم تهيئة Firebase بنجاح");
        }
        
        database = firebase.database();
        isFirebaseInitialized = true;
        
        setupConnectionListener();
        
        console.log("🎉 Firebase جاهز للاستخدام");
        return true;
        
    } catch (error) {
        console.error("❌ خطأ في تهيئة Firebase:", error);
        return false;
    }
}

// إعداد مستمع الاتصال
function setupConnectionListener() {
    if (!database) return;
    
    database.ref('.info/connected').on('value', (snapshot) => {
        isConnected = snapshot.val() === true;
        
        if (isConnected) {
            console.log("✅ متصل بـ Firebase");
        } else {
            console.log("❌ فقدان الاتصال بـ Firebase");
        }
    });
}

// اختبار الاتصال
async function testFirebaseConnection() {
    if (!database) return false;
    
    try {
        const testRef = database.ref('connection_test/' + Date.now());
        await testRef.set({
            test: true,
            timestamp: new Date().toISOString()
        });
        
        console.log("✅ اتصال Firebase يعمل");
        return true;
        
    } catch (error) {
        console.error("❌ فشل اختبار الاتصال:", error);
        return false;
    }
}

// تهيئة Firebase عند تحميل الصفحة
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeFirebase();
        
        // اختبار الاتصال بعد 2 ثانية
        setTimeout(() => {
            if (isFirebaseInitialized) {
                testFirebaseConnection();
            }
        }, 2000);
    });
}