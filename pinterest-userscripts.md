# سكربتات المستخدم (Userscripts) الخاصة بـ Pinterest

> مجموعة مرتّبة حسب الشهرة، مع الوصف والحالة والروابط.
> تاريخ الجمع: 21 أكتوبر 2026.

## كيف قُرئت الأرقام

- **الشهرة** = مجموع التثبيتات المعلنة على Greasy Fork وOpenUserJS للنسخة نفسها، مع ذكر نجوم GitHub عند وجود مستودع.
- الأرقام التراكمية تفضّل السكربتات القديمة: سكربت من 2016 قد يكون له تثبيتات أكثر من سكربت 2026 أفضل منه بكثير.
- لذلك أضفت لكل سكربت **آخر تحديث**؛ هو المؤشر الأصدق على أنه لا يزال يعمل بعد تغييرات Pinterest.
- عدد كبير من التثبيتات لا يعني أن السكربت يعمل اليوم. Pinterest يغيّر بنية الصفحة باستمرار، وسكربت لم يُحدَّث منذ سنوات غالبًا معطّل جزئيًا أو كليًا.
- استثنيت السكربتات العامة (مثل All-in-One Video Downloader وPrivacy Redirector) لأنها تدعم Pinterest كموقع إضافي فقط وليست مخصصة له.

---

## 1. Browse your interests without registration — Lazza
**الشهرة:** ‎75,868 تثبيت على Greasy Fork (+ نسخة مطابقة على OpenUserJS بـ ‎6,506) — الأكثر تثبيتًا بين سكربتات Pinterest المخصصة.
**ما يفعله:** يخفي النوافذ المنبثقة التي تطالب بالتسجيل، ويفكّ قفل التمرير، ويعيد توجيه الصفحة الرئيسية إلى صفحة بحث حتى تستطيع التصفح بدون حساب.
**الحالة:** آخر تحديث 2022-01-04 (الإصدار 2.4، حجمه 1.74 KB فقط). التقييمات: 15 إيجابي / 4 متوسط / 8 سلبي — أي أن نسبة الشكوى منه عالية نسبيًا لأنه قديم.
**الرابط:** https://greasyfork.org/en/scripts/438053-browse-your-interests-without-registration

## 2. Pinterest — Open Original Image — valacar
**الشهرة:** ‎10,252 على Greasy Fork + ‎5,448 على OpenUserJS ≈ ‎15,700. التقييمات: 34 / 0 / 3.
**ما يفعله:** ضع المؤشر على أي Pin واضغط `z` فيُفتح أكبر نسخة أصلية من الصورة في تبويب جديد؛ و`Shift+z` يفتحها في الخلفية. يعمل أيضًا داخل صفحة الـ close-up.
**الحالة:** آخر تحديث 2021 على Greasy Fork (الإصدار 0.3.0 على OpenUserJS يعود إلى 2019). يعتمد على قراءة بيانات الصورة من DOM، لذا هو أكثر عرضة للتعطل من السكربتات التي تستدعي واجهة Pinterest الداخلية.
**الرابط:** https://greasyfork.org/en/scripts/370410-pinterest-open-original-image

## 3. Pinterest Plus — TiLied
**الشهرة:** ‎13,009 تثبيت، والتقييمات 30 / 0 / 1 — من أعلى السكربتات تقييمًا.
**ما يفعله:** يضيف زر «Full size» على الصورة: نقرة = تكبير الصورة بعرضها الكامل، نقرة وسط = فتح الصورة الأصلية في تبويب جديد، نقرة يمين = تثبيت وضع العرض الكامل.
**الحالة:** آخر تحديث 2025-03-08 (الإصدار 0.7.02). المؤلف نفسه ينصح في وصف السكربت باستخدام Image Max URL كبديل أقوى وأشمل: https://github.com/qsniyg/maxurl
**الرابط:** https://greasyfork.org/en/scripts/30839-pinterest-plus

## 4. Pinterest.com Backup Original Files — cuzi
**الشهرة:** ‎2,406 على Greasy Fork + ‎8,993 على OpenUserJS ≈ ‎11,400، والتقييمات 23 / 0 / 1.
**ما يفعله:** يضيف زر تنزيل على رأس كل Board؛ تمرّر حتى آخر صورة ثم تضغطه فينزّل كل صور اللوحة بنسخها الأصلية ويجمعها في ملف ZIP واحد. الصور التي فشل تنزيلها تُضاف كصور مصغّرة داخل مجلد `error_thumbnails`.
**الحالة:** آخر تحديث 2025-03-04 (الإصدار 19.0.4). من أفضل الخيارات إن كان هدفك أرشفة لوحاتك.
**الرابط:** https://greasyfork.org/en/scripts/15914-pinterest-com-backup-original-files

## 5. Pinterest — Remove Unwanted Pins — valacar
**الشهرة:** ‎7,190 تثبيت على OpenUserJS.
**ما يفعله:** يخفي الـ Pins المدفوعة، ومنتجات التسوق، و«Ideas for you»، و«Topics for you»، و«Searches to try»، و«Fresh ideas».
**الحالة:** آخر تحديث 2019 (0.8.5). يعترف المؤلف بأن المحذوف يترك فراغًا أبيض، وأن السكربت غير قابل للضبط، وأنه لا يعمل جيدًا مع Greasemonkey. وصف السكربت نفسه يحتوي بديلًا بفلاتر uBlock Origin إن أردت حلًا أنظف.
**الرابط:** https://openuserjs.org/scripts/valacar/Pinterest_-_Remove_Unwanted_Pins

## 6. Pinterest registration popup killer — mugen25
**الشهرة:** ‎5,807 تثبيت، تقييمات 10 / 0 / 1.
**ما يفعله:** يتصفح Pinterest بدون تسجيل، ويزيل أيضًا شريط ملفات تعريف الارتباط.
**الحالة:** آخر تحديث 2016 — قديم جدًا، ومن المرجح أن الجزء الخاص بالنافذة المنبثقة لم يعد مطابقًا لواجهة Pinterest الحالية.
**الرابط:** https://greasyfork.org/en/scripts/21468-pinterest-registration-popup-killer

## 7. Pinterest with no registration modal popup — Jesús González
**الشهرة:** ‎4,828 تثبيت، تقييمات 12 / 0 / 1.
**ما يفعله:** يزيل نافذة «سجّل الآن» التي تحجب المحتوى، ويسمح بالتصفح بدون حساب.
**الحالة:** آخر تحديث 2019. نفس ملاحظة القديم: بسيط وقد يعمل أو لا يعمل حسب نسخة الواجهة.
**الرابط:** https://greasyfork.org/en/scripts/382612-pinterest-with-no-registration-modal-popup

## 8. Pinterest — Save Original Image — 风灏 (haofong)
**الشهرة:** ‎2,222 تثبيت، وله نسخة شقيقة «Open Original Image and Save» بـ ‎1,970 تثبيتًا.
**ما يفعله:** يحفظ الصورة الأصلية (الأكبر) بالضغط على `z` أثناء المرور على Pin — أي أنه يجمع بين الفتح والحفظ بدل الفتح فقط.
**الحالة:** آخر تحديث 2019. توجد نسخة مُصلحة له باسم «FIX Pinterest — Save Original Image» تعمل على Chrome.
**الرابط:** https://greasyfork.org/en/scripts/387050-pinterest-save-original-image

## 9. Use Pinterest Raw Image — jcunews
**الشهرة:** ‎2,050 تثبيت.
**ما يفعله:** يعيد كتابة روابط كل صور Pinterest إلى النسخة الخام/الأصلية أو أكبر نسخة متاحة — بدون أزرار إضافية، فقط جودة أعلى في كل مكان.
**الحالة:** آخر تحديث 2019، لكن فكرته بسيطة (تعديل مسار الرابط إلى `/originals/`) وما زالت هي الأساس الذي تبني عليه سكربتات 2026 مثل Pinterest Power Menu.
**الرابط:** https://greasyfork.org/en/scripts/389707-use-pinterest-raw-image

## 10. Declutter Pinterest — August4067
**الشهرة:** ‎1,840 تثبيت، تقييمات 5 / 1 / 1.
**ما يفعله:** يزيل الـ Pins المروّجة، ومحتوى التسوق («Shop the look»، أزرار الشراء، بانرات المتجر)، و«Popular on Pinterest»، ونافذة الترقية للتنزيل، ونافذة مانع الإعلانات. ويسمح بإخفاء أيقونات التنقل (Updates / Explore / Messages) وإزالة النقطة الحمراء.
**الحالة:** آخر تحديث 2026-10-15 — من أنشط السكربتات في القائمة وأكثرها ملاءمة للواجهة الحالية.
**الرابط:** https://greasyfork.org/en/scripts/512469-declutter-pinterest

## 11. Pinterest Power Menu — Angel2mp3
**الشهرة:** ‎1,473 تثبيت على Greasy Fork + ‎87 نجمة على GitHub، تقييمات 7 / 1 / 0. وصفه يقول إنه مُدرج في قائمة FMHY.
**ما يفعله:** حزمة شاملة: جودة أصلية للصور، إصلاح زر التنزيل، تنزيل صور وفيديو من صفحة الـ Pin، تنزيل لوحة كاملة، بحث عكسي بالصورة، ترجمة النصوص الظاهرة، تشغيل GIF عند المرور، إخفاء الفيديوهات، أدوات declutter، وفلتر لمحتوى الذكاء الاصطناعي بثلاث درجات صرامة، وإخفاء بالكلمات المفتاحية أو برقم الـ Pin.
**الحالة:** آخر تحديث 2026-07-09 (v1.4.x). هو الأقرب لكونه «كل شيء في سكربت واحد» اليوم، والمؤلف يذكر أنه بُني على أفكار Use Pinterest Raw Image وDeclutter Pinterest.
**الرابط:** https://greasyfork.org/en/scripts/568835-pinterest-power-menu

## 12. Pinterest Login Wall Bypasser (Fix Pagina Vuota & Click) — bebop80
**الشهرة:** ‎1,415 تثبيت.
**ما يفعله:** يتجاوز جدار تسجيل الدخول، ويجبر الـ feed على التحميل، ويعيد تفعيل النقر والتمرير — مكتوب لمعالجة مشكلة «الصفحة الفارغة» التي صارت شائعة.
**الحالة:** آخر تحديث 2026-03-18، والوصف بالإيطالية.
**الرابط:** https://greasyfork.org/en/scripts/570181-pinterest-login-wall-bypasser-fix-pagina-vuota-click

## 13. Pinterest Cleanser — intrepidOlivia
**الشهرة:** ‎1,354 تثبيت على OpenUserJS.
**ما يفعله:** يزيل المنشورات المروّجة فقط، بتحديث صريح يتوافق مع بنية DOM في يونيو 2025. يترك مساحة بيضاء مكان المحذوف.
**الحالة:** آخر تحديث يونيو 2025.
**الرابط:** https://openuserjs.org/scripts/intrepidOlivia/Pinterest_Cleanser

## 14. Pinterest Add-Ons — CreamCheese
**الشهرة:** ‎1,146 تثبيت، تقييمات 8 / 0 / 0.
**ما يفعله:** يغيّر شكل Pinterest وطريقة نشر العناصر (تخصيص بصري + تحسين تدفق النشر).
**الحالة:** آخر تحديث 2016 — قديم، والوصف عام جدًا. في القائمة لأنه من أوائل سكربتات «تحسين الواجهة» ولأن تقييمه إيجابي بالكامل.
**الرابط:** https://greasyfork.org/en/scripts/7275-pinterest-add-ons

## 15. Pinterest no ads — Roman Yudin
**الشهرة:** ‎1,119 تثبيت.
**ما يفعله:** إزالة الـ Pins المروّجة، لا شيء آخر — سكربت صغير بمسؤولية واحدة.
**الحالة:** آخر تحديث 2019.
**الرابط:** https://greasyfork.org/en/scripts/379452-pinterest-no-ads

## 16. Pinterest Full — ShrekBytes
**الشهرة:** ‎1,119 تثبيت + ‎16 نجمة على GitHub + منشور على r/userscripts بـ 33 نقطة.
**ما يفعله:** يضيف زرّي View وDownload: معرض بملء الشاشة مع صور مصغّرة، وتنزيل النسخة الأصلية بدون حساب، ودعم Story Pins متعددة الصفحات، واختصارات لوحة المفاتيح (أسهم، Esc، D) وإيماءات السحب على الجوال.
**الحالة:** آخر تحديث 2026-07-02. مبني على عمل TiLied (Pinterest Plus)، ويحتاج «Desktop Mode» على متصفح الجوال.
**الرابط:** https://greasyfork.org/en/scripts/546432-pinterest-full

## 17. Pinterest Palooza — ifugu
**الشهرة:** ‎1,097 تثبيت، تقييمات 12 / 0 / 0.
**ما يفعله:** نقرة على صورة الـ Pin تنقلك مباشرة إلى الموقع المصدر بدل صفحة Pinterest.
**الحالة:** آخر تحديث 2016. فكرة بسيطة وواضحة، لكنها تعتمد على سلوك Pinterest القديم في النقر.
**الرابط:** https://greasyfork.org/en/scripts/3075-pinterest-palooza

## 18. Pinterest Slideshow — French Bond
**الشهرة:** ‎934 تثبيت، تقييمات 5 / 0 / 1. وله نسخة مُعدّلة (fork) باسم dvirzxc بـ ‎59 تثبيتًا.
**ما يفعله:** عرض شرائح على أي صفحة Pinterest، بتصميم بسيط: `Ctrl+Space` للبدء، والأسهم للتنقل، وفاصل 5 ثوانٍ بين الشرائح.
**الحالة:** آخر تحديث 2023-11-26.
**الرابط:** https://greasyfork.org/en/scripts/24116-pinterest-slideshow

## 19. Sorry, Pinterest — Anton Kononov
**الشهرة:** ‎925 تثبيت.
**ما يفعله:** إخفاء نوافذ مطالبة تسجيل الدخول — الاسم نفسه تعليق ساخر على سياسة Pinterest.
**الحالة:** آخر تحديث 2016. بسيط جدًا وقد يكون معطّلًا.
**الرابط:** https://greasyfork.org/en/scripts/25940-sorry-pinterest

## 20. Pinterest — Dark Theme — ayaMorita
**الشهرة:** ‎880 تثبيت على OpenUserJS.
**ما يفعله:** ثيم داكن كامل لـ Pinterest.
**الحالة:** آخر تحديث ديسمبر 2024. بديله الأحدث والأكثر تخصيصًا هو Pinterest Dark Mode 2.3 على Greasy Fork (‎442 تثبيتًا، آخر تحديث 2026-01) وPinterest Dark Mode Toggle (AMOLED).
**الرابط:** https://openuserjs.org/scripts/ayaMorita/Pinterest

---

## سكربتات لم تدخل العشرين الأولى لكنها تستحق النظر

- **Pinterest Nag Killer** (RyanGittins): ‎20,441 تثبيتًا على OpenUserJS — رقم ضخم تاريخيًا، لكن المستودع على GitHub موسوم `[DEPRECATED]` والسكربت من 2014، فلا أنصح به. https://greasyfork.org/en/scripts/5347-pinterest-nag-killer
- **Promoted pins remover** (amlette): ‎871 تثبيتًا، آخر تحديث 2025-08-23 — أحدث من كثير من السكربتات الأعلى منه تثبيتًا. https://greasyfork.org/en/scripts/418205-promoted-pins-remover
- **Pinterest — Remove "Picked For You" Completely** (Lance Olenik): ‎817 تثبيتًا، من 2015. https://greasyfork.org/en/scripts/11167-pinterest-remove-picked-for-you-completely
- **Pinterest magic** (velzevur): ‎626 تثبيتًا، يرتّب صفحات Pinterest حسب عدد الـ repins. https://openuserjs.org/scripts/velzevur/Pinterest_magic
- **Pinterest++** (Zker67): ‎512 تثبيتًا + 4 نجوم. أيقونتان صغيرتان على كل بطاقة (تنزيل الأصل + حالة الحفظ الرسمية)، ونسخة حديثة (يونيو 2026) من فكرة Pinterest Plus. https://greasyfork.org/en/scripts/577702-pinterest
- **Filter AI on Pinterest** (FilterScripts): ‎420 تثبيتًا، يفلتر محتوى الذكاء الاصطناعي من استجابات الـ API بكاش دائم. https://greasyfork.org/en/scripts/537280-filter-ai-on-pinterest
- **Faster Repinning on Pinterest** (Greg Schwartz): ‎407 على Greasy Fork + ‎357 على OpenUserJS، يقلّل نقرات إعادة النشر (2014). https://greasyfork.org/en/scripts/6710-faster-repinning-on-pinterest
- **Pinterest Low-RAM Optimizer** (MoriNo23): ‎163 تثبيتًا، آخر تحديث 2026-08-10 — يقلّل استهلاك الذاكرة عبر lazy-loading واستبدال الصور خارج الشاشة. مفيد للأجهزة الضعيفة. https://greasyfork.org/en/scripts/570603-pinterest-low-ram-optimizer
- **Pinterest Gallery Suite & Downloader** (Shawn Parker): ‎136 تثبيتًا، أحدث سكربت شامل في القائمة (2026-09-29): عرض شرائح سينمائي، تنزيل `/originals/`، ZIP دفعي، أسماء ملفات ذكية، 9 ثيمات. https://greasyfork.org/en/scripts/590634-pinterest-gallery-suite-downloader
- **Pinterest Reimagined** (ximbicajr12): ‎62 تثبيتًا، أعاد بناء أفكار Plus + Raw Image + Declutter في سكربت واحد بلا jQuery وبأداء أفضل. https://greasyfork.org/en/scripts/588133-pinterest-reimagined
- **#PINNING** (samyk): ‎18 نجمة على GitHub، سكربت Tampermonkey لتحسين تجربة سطح المكتب: اختصارات S للحفظ، L للإعجاب، V لزيارة المصدر، Enter للتوسيع، وأسهم للتنقل. https://github.com/samyk/pinning

---

## أي واحد تختار؟ (حسب الحاجة)

- **جودة أصلية + تنزيل سريع:** Pinterest Power Menu (شامل) أو Pinterest Full (بسيط ومباشر).
- **أرشفة لوحة كاملة في ZIP:** Pinterest.com Backup Original Files.
- **تنظيف الواجهة من الإعلانات والتسوق:** Declutter Pinterest (الأحدث) أو Pinterest Cleanser.
- **تصفح بدون حساب:** Browse your interests without registration، وإن لم يعمل فـ Login Wall Bypasser.
- **إضافة خفيفة جدًا (سطر واحد من JS):** Use Pinterest Raw Image.
- **مشاهدة كسلايدشو:** Pinterest Slideshow.
- **ثيم داكن:** Pinterest Dark Mode 2.3.

## المصادر

- فهرس Greasy Fork لسكربتات pinterest.com (مرتّب حسب التثبيتات، ومرّات حسب التقييمات والتحديث): https://greasyfork.org/en/scripts/by-site/pinterest.com?sort=total_installs
- فهرس OpenUserJS: https://openuserjs.org/?q=pinterest
- بحث GitHub عن مستودعات Pinterest userscript مرتّبة بالنجوم: https://github.com/search?q=pinterest+userscript&type=repositories&s=stars
- صفحات كل سكربت المذكورة أعلاه (الأرقام مأخوذة منها مباشرة في 21 أكتوبر 2026).