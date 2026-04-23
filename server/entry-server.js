import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createContext, useState, useCallback, useEffect, useContext, useRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate, Link, useParams, Navigate, Routes, Route } from "react-router-dom";
import { Calendar, X, Menu, Phone, Mail, Check, Copy, BatteryLow, Brain, Moon, HeartPulse, TrendingUp, FlaskConical, Stethoscope, BarChart3, FileSearch, ClipboardCheck, ShieldCheck, Crosshair, GraduationCap, Award, BookOpen, ArrowLeft, ArrowRight, ExternalLink, Star, Clock, ChevronDown, Video, AlertCircle, CheckCircle, ClipboardList, MessageSquarePlus, Send, Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { createClient } from "@supabase/supabase-js";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
const translations = {
  pl: {
    nav: {
      symptoms: "Objawy",
      services: "Usługi",
      process: "Proces",
      doctor: "Lekarz",
      faq: "FAQ",
      contact: "Kontakt",
      call: "Umów wizytę",
      blog: "Blog"
    },
    hero: {
      badge: "Konsultacje lekarskie · Diagnostyka · Terapia",
      title: "Chroniczne zmęczenie, brak energii, obniżone libido?",
      description: "To może być niedobór testosteronu. Zdalna konsultacja lekarska — wygodnie, z dowolnego miejsca.",
      cta: "Umów konsultację lekarską",
      doctorName: "lek. Marta Treblińska",
      perk1: "Bez poczekalni i ryzyka zakażenia",
      perk2: "Z dowolnego miejsca w Polsce",
      perk3: "Indywidualny termin wizyty"
    },
    symptoms: {
      title: "Kiedy warto rozważyć konsultację lekarską?",
      subtitle: "Rozpoznajesz któreś z tych objawów? Mogą mieć wiele przyczyn — niedobór testosteronu jest jedną z nich. Konsultacja lekarska pomoże wyjaśnić, co się dzieje.",
      fatigue: "Chroniczne zmęczenie i brak energii",
      fatigueDesc: "Budzisz się zmęczony, choć przespałeś całą noc.",
      brain: "Mgła w głowie",
      brainDesc: "Trudniej się skupić, zebrać do działania, skończyć rzeczy.",
      sleep: "Problemy ze snem i regeneracją",
      sleepDesc: "Sen nie daje odpoczynku, ciało wolniej dochodzi do siebie.",
      libido: "Spadek libido",
      libidoDesc: "Mniejsza ochota na seks lub coś, co wcześniej przychodziło naturalnie.",
      weight: "Przyrost tłuszczu mimo starań",
      weightDesc: "Zmienia się sylwetka, choć tryb życia taki sam.",
      hormones: "Nieprawidłowe wyniki badań hormonalnych",
      hormonesDesc: "Masz wyniki, ale nie wiesz, co z nimi zrobić."
    },
    services: {
      title: "Co obejmuje konsultacja?",
      sniperTag: "Terapia snajperska",
      sniperDesc: "Szukamy dokładnej przyczyny, nie tłumimy objawów",
      diagnostics: "Diagnostyka zaburzeń hormonalnych",
      diagnosticsDesc: "Oceniamy stan hormonalny i identyfikujemy ewentualne nieprawidłowości",
      hormoneLevel: "Ocena poziomu hormonów",
      hormoneLevelDesc: "Sprawdzamy testosteron całkowity, wolny, SHBG i inne kluczowe parametry",
      interpretation: "Interpretacja wyników",
      interpretationDesc: "Wyjaśniamy, co oznaczają wyniki i jakie masz opcje dalszego postępowania",
      qualification: "Kwalifikacja do leczenia",
      qualificationDesc: "Oceniamy, czy i jaka terapia jest dla Ciebie wskazana",
      therapy: "Prowadzenie terapii",
      therapyDesc: "Prowadzimy leczenie zgodnie ze standardami medycyny opartej na dowodach",
      monitoring: "Monitorowanie leczenia",
      monitoringDesc: "Regularne kontrole zapewniające skuteczność i bezpieczeństwo terapii"
    },
    process: {
      title: "Jak wygląda proces diagnostyczny?",
      subtitle: "Proces diagnostyczny obejmuje kilka etapów, które pozwalają na rzetelną ocenę stanu zdrowia pacjenta.",
      step1: "Konsultacja lekarska",
      step1Desc: "Szczegółowy wywiad medyczny i analiza objawów",
      step2: "Badania laboratoryjne",
      step2Desc: "Zlecenie odpowiednich badań hormonalnych",
      step3: "Omówienie wyników",
      step3Desc: "Interpretacja wyników i wyjaśnienie dalszych kroków",
      step4: "Dalsze postępowanie",
      step4Desc: "Ustalenie planu leczenia, jeśli istnieją wskazania medyczne",
      disclaimer: "Leczenie wdrażane jest wyłącznie w przypadku istnienia wskazań medycznych.",
      patientNote: "Regularne wizyty kontrolne i terminowe wykonywanie zleconych badań są nieodłącznym elementem bezpiecznej terapii. Pacjent aktywnie uczestniczy w tym procesie — lekarz zapewnia opiekę, a terminowość kontroli leży po stronie pacjenta."
    },
    trtInfo: {
      title: "Leczenie niedoboru testosteronu",
      p1: "Terapia zastępcza testosteronem (TRT) jest jedną z metod leczenia stosowaną u pacjentów z potwierdzonym niedoborem testosteronu.",
      p2: "Każdy przypadek wymaga indywidualnej oceny lekarskiej, odpowiedniej diagnostyki oraz regularnej kontroli w trakcie leczenia.",
      disclaimer: "Decyzja o wdrożeniu leczenia podejmowana jest wyłącznie przez lekarza po przeprowadzeniu pełnej diagnostyki i analizy wyników badań."
    },
    doctor: {
      title: "Lekarz prowadzący",
      name: "lek. Marta Treblińska",
      education: "Lekarz medycyny, Warszawski Uniwersytet Medyczny",
      harvard: "Testosterone Therapy and Sexual Dysfunction — Harvard Medical School",
      experience: "Wieloletnie doświadczenie w diagnostyce i leczeniu zaburzeń hormonalnych u mężczyzn",
      ebm: "Precyzyjne szukanie przyczyny, nie leczenie objawów — oparte na medycynie opartej na dowodach (EBM)",
      alfa: "Certyfikat TRT Master Practitioner u dr n. med. Marty Mazur — Projekt Alfa"
    },
    faq: {
      title: "Najczęściej zadawane pytania",
      q1: "Czy niski testosteron zawsze wymaga leczenia?",
      a1: "Nie. Spadek poziomu testosteronu z wiekiem jest naturalny i nie zawsze wymaga interwencji farmakologicznej. Decyzja o leczeniu zależy od nasilenia objawów, wyników badań oraz indywidualnej oceny lekarskiej.",
      q2: "Jakie badania należy wykonać przed konsultacją?",
      a2: "Przed konsultacją zalecane jest wykonanie podstawowego panelu hormonalnego, obejmującego m.in. testosteron całkowity, wolny, SHBG, LH, FSH, estradiol oraz prolaktynę. Szczegółowy zakres badań zostanie ustalony podczas wizyty.",
      q3: "Jak wygląda kontrola w trakcie leczenia?",
      a3: "Pacjent objęty leczeniem jest regularnie monitorowany. Kontrole obejmują badania laboratoryjne (m.in. morfologia, hematokryt, profil lipidowy, PSA) oraz wizyty kontrolne, których częstotliwość ustala lekarz.",
      q4: "Czy konsultacja odbywa się stacjonarnie czy online?",
      a4: "Konsultacje odbywają się wyłącznie w formie zdalnej (teleporada) — wygodnie, z dowolnego miejsca. Termin wizyty ustalany jest indywidualnie.",
      q5: "Czy terapia hormonalna jest bezpieczna?",
      a5: "Każda terapia niesie ze sobą potencjalne korzyści i ryzyka. Bezpieczeństwo leczenia zależy od prawidłowej kwalifikacji, odpowiedniego dawkowania oraz regularnego monitorowania pacjenta przez lekarza."
    },
    contact: {
      title: "Umów konsultację",
      subtitle: "Konsultacja lekarska jest pierwszym krokiem do diagnostyki i ewentualnego leczenia zaburzeń hormonalnych.",
      phone: "Telefon",
      email: "E-mail",
      consultForm: "Forma konsultacji",
      consultFormValue: "Zdalnie — wygodnie, z dowolnego miejsca",
      remoteNote: "Bez dojazdu i kolejek — indywidualny termin.",
      schedule: "Terminy",
      scheduleValue: "Indywidualnie dostosowane do pacjenta",
      firstConsultation: "Pierwsza konsultacja",
      firstConsultationDesc: "Skontaktuj się telefonicznie lub mailowo, aby umówić wizytę. Podczas rejestracji otrzymasz informacje o badaniach, które warto wykonać przed konsultacją.",
      callNow: "Zadzwoń teraz",
      priceNote: "Pierwsza konsultacja (60 min) — 799 zł",
      priceFollowUp: "Wizyta kontrolna (30 min) — 449 zł"
    },
    footer: {
      entityInfo: "Informacje o podmiocie",
      practice: "Indywidualna Praktyka Lekarska Marta Treblińska",
      address: "ul. Duboisa 1/21, Ostrów Mazowiecki",
      doctorName: "lek. Marta Treblińska",
      remote: "Konsultacje zdalne",
      legalInfo: "Informacje prawne",
      privacy: "Polityka prywatności (RODO)",
      terms: "Regulamin",
      disclaimer: "Materiały zamieszczone na niniejszej stronie internetowej mają charakter wyłącznie informacyjny i nie stanowią reklamy usług medycznych w rozumieniu obowiązujących przepisów prawa. Treści nie zastępują porady lekarskiej. Decyzję o leczeniu podejmuje lekarz po badaniu i analizie wyników.",
      copyright: "Indywidualna Praktyka Lekarska Marta Treblińska. Wszelkie prawa zastrzeżone."
    },
    cookie: {
      text: "Ta strona korzysta z plików cookies w celu zapewnienia prawidłowego działania serwisu. Korzystając ze strony wyrażasz zgodę na ich użycie zgodnie z",
      privacyLink: "Polityką prywatności",
      reject: "Odrzuć",
      accept: "Akceptuję"
    },
    feedback: {
      button: "Feedback",
      title: "Zgłoś błąd lub sugestię",
      subtitle: "Pomóż nam ulepszyć stronę — zgłoś błąd lub podziel się pomysłem. Aby umówić wizytę, skorzystaj z formularza kontaktowego.",
      messageLabel: "Wiadomość",
      messagePlaceholder: "Opisz problem lub podziel się pomysłem...",
      emailLabel: "E-mail",
      emailOptional: "(opcjonalnie)",
      emailPlaceholder: "twoj@email.pl",
      emailHint: "Zostaw adres e-mail, jeśli chcesz, abyśmy mogli się z Tobą skontaktować.",
      submit: "Wyślij",
      successTitle: "Wysłane!",
      successDesc: "Dziękujemy za zgłoszenie.",
      error: "Coś poszło nie tak. Spróbuj ponownie."
    },
    adam: {
      bannerTitle: "Sprawdź, czy możesz mieć niedobór testosteronu",
      bannerDesc: "Wypełnij ankietę ADAM — 10 pytań, ok. 2 minuty, natychmiastowy wynik",
      bannerCta: "Wypełnij ankietę",
      title: "Ankieta ADAM",
      questionLabel: "Pytanie",
      yes: "Tak",
      no: "Nie",
      q1: "Czy odczuwasz zmniejszenie popędu seksualnego (libido)?",
      q2: "Czy odczuwasz brak energii?",
      q3: "Czy odczuwasz zmniejszenie siły lub wytrzymałości fizycznej?",
      q4: "Czy zmniejszył się Twój wzrost?",
      q5: "Czy odczuwasz zmniejszenie 'radości życia'?",
      q6: "Czy jesteś smutny lub rozdrażniony?",
      q7: "Czy Twoje erekcje są słabsze?",
      q8: "Czy pogorszyła się Twoja sprawność podczas aktywności fizycznej?",
      q9: "Czy zasypiasz po kolacji?",
      q10: "Czy Twoja wydajność w pracy lub codziennych czynnościach pogorszyła się?",
      positiveTitle: "Wynik sugeruje możliwy niedobór testosteronu",
      positiveText: "Twoje odpowiedzi wskazują na objawy mogące świadczyć o niedoborze androgenów. Wynik ankiety ADAM nie jest diagnozą — potwierdzenie wymaga konsultacji lekarskiej i badań.",
      negativeTitle: "Wynik nie wskazuje na niedobór testosteronu",
      negativeText: "Twoje odpowiedzi nie spełniają kryteriów pozytywnego wyniku ankiety ADAM. Jeśli mimo to odczuwasz niepokojące objawy, warto omówić je z lekarzem.",
      ctaConsult: "Umów konsultację lekarską",
      close: "Zamknij",
      disclaimer: "Ankieta ADAM jest narzędziem przesiewowym i nie zastępuje diagnozy lekarskiej."
    }
  },
  en: {
    nav: {
      symptoms: "Symptoms",
      services: "Services",
      process: "Process",
      doctor: "Doctor",
      faq: "FAQ",
      contact: "Contact",
      call: "Book a visit",
      blog: "Blog"
    },
    hero: {
      badge: "Medical consultations · Diagnostics · Therapy",
      title: "Chronic fatigue, low energy, decreased libido?",
      description: "This may be testosterone deficiency. Remote medical consultation — convenient, from anywhere.",
      cta: "Book a consultation",
      doctorName: "Marta Treblińska, MD",
      perk1: "No waiting room, no infection risk",
      perk2: "From anywhere in Poland",
      perk3: "Individual appointment time"
    },
    symptoms: {
      title: "When should you consider a medical consultation?",
      subtitle: "Do you recognize any of these symptoms? They can have many causes — testosterone deficiency is one of them. A medical consultation will help clarify what is happening.",
      fatigue: "Chronic fatigue and low energy",
      fatigueDesc: "You wake up tired, even after a full night's sleep.",
      brain: "Brain fog",
      brainDesc: "Hard to focus, get started, or follow through on things.",
      sleep: "Sleep and recovery problems",
      sleepDesc: "Sleep doesn't feel restful, your body takes longer to recover.",
      libido: "Decreased libido",
      libidoDesc: "Less interest in sex, or something that used to come naturally has changed.",
      weight: "Weight gain despite effort",
      weightDesc: "Your body composition is changing even though your lifestyle hasn't.",
      hormones: "Abnormal hormonal test results",
      hormonesDesc: "You have results but don't know what to make of them."
    },
    services: {
      title: "What does a consultation cover?",
      sniperTag: "Precision therapy",
      sniperDesc: "We target the root cause — not the symptoms",
      diagnostics: "Hormonal disorder diagnostics",
      diagnosticsDesc: "We assess your hormonal status and identify any abnormalities",
      hormoneLevel: "Hormone level assessment",
      hormoneLevelDesc: "We check total and free testosterone, SHBG and other key parameters",
      interpretation: "Results interpretation",
      interpretationDesc: "We explain what your results mean and what your options are",
      qualification: "Treatment qualification",
      qualificationDesc: "We assess whether and what therapy is indicated for you",
      therapy: "Therapy management",
      therapyDesc: "We manage treatment in accordance with evidence-based medicine standards",
      monitoring: "Treatment monitoring",
      monitoringDesc: "Regular check-ups ensuring the effectiveness and safety of therapy"
    },
    process: {
      title: "How does the diagnostic process work?",
      subtitle: "The diagnostic process includes several stages that allow for a thorough assessment of the patient's health.",
      step1: "Medical consultation",
      step1Desc: "Detailed medical interview and symptom analysis",
      step2: "Laboratory tests",
      step2Desc: "Ordering appropriate hormonal tests",
      step3: "Results discussion",
      step3Desc: "Interpretation of results and explanation of next steps",
      step4: "Further management",
      step4Desc: "Establishing a treatment plan if medical indications exist",
      disclaimer: "Treatment is implemented only when medical indications exist.",
      patientNote: "Regular follow-up visits and timely completion of ordered tests are an essential part of safe therapy. The patient plays an active role in this process — the physician provides care, while responsibility for attending scheduled check-ups lies with the patient."
    },
    trtInfo: {
      title: "Testosterone deficiency treatment",
      p1: "Testosterone replacement therapy (TRT) is one of the treatment methods used in patients with confirmed testosterone deficiency.",
      p2: "Each case requires individual medical assessment, appropriate diagnostics, and regular monitoring during treatment.",
      disclaimer: "The decision to implement treatment is made solely by a physician after completing full diagnostics and analyzing test results."
    },
    doctor: {
      title: "Attending physician",
      name: "Marta Treblińska, MD",
      education: "Doctor of Medicine, Medical University of Warsaw",
      harvard: "Testosterone Therapy and Sexual Dysfunction — Harvard Medical School",
      experience: "Years of experience in diagnosing and treating hormonal disorders in men",
      ebm: "Precise root-cause diagnosis, not symptom treatment — evidence-based medicine (EBM)",
      alfa: "TRT Master Practitioner certificate — Dr. Marta Mazur, Projekt Alfa"
    },
    faq: {
      title: "Frequently asked questions",
      q1: "Does low testosterone always require treatment?",
      a1: "No. A decline in testosterone levels with age is natural and does not always require pharmacological intervention. The decision to treat depends on symptom severity, test results, and individual medical assessment.",
      q2: "What tests should be done before the consultation?",
      a2: "Before the consultation, it is recommended to perform a basic hormonal panel, including total testosterone, free testosterone, SHBG, LH, FSH, estradiol, and prolactin. The detailed scope of tests will be determined during the visit.",
      q3: "What does monitoring look like during treatment?",
      a3: "Patients undergoing treatment are regularly monitored. Check-ups include laboratory tests (including blood count, hematocrit, lipid profile, PSA) and follow-up visits, the frequency of which is determined by the physician.",
      q4: "Is the consultation in-person or online?",
      a4: "Consultations are conducted exclusively remotely (teleconsultation) — conveniently, from anywhere. The appointment time is arranged individually.",
      q5: "Is hormonal therapy safe?",
      a5: "Every therapy carries potential benefits and risks. Treatment safety depends on proper qualification, appropriate dosing, and regular patient monitoring by a physician."
    },
    contact: {
      title: "Book a consultation",
      subtitle: "A medical consultation is the first step toward diagnosing and potentially treating hormonal disorders.",
      phone: "Phone",
      email: "E-mail",
      consultForm: "Consultation format",
      consultFormValue: "Remote — conveniently, from anywhere",
      remoteNote: "No commute, no waiting room — individual appointment.",
      schedule: "Appointments",
      scheduleValue: "Individually tailored to the patient",
      firstConsultation: "First consultation",
      firstConsultationDesc: "Contact us by phone or email to schedule a visit. During registration, you will receive information about tests worth doing before the consultation.",
      callNow: "Call now",
      priceNote: "First consultation (60 min) — 799 PLN",
      priceFollowUp: "Follow-up visit (30 min) — 449 PLN"
    },
    footer: {
      entityInfo: "Entity information",
      practice: "Individual Medical Practice Marta Treblińska",
      address: "ul. Duboisa 1/21, Ostrów Mazowiecki, Poland",
      doctorName: "Marta Treblińska, MD",
      remote: "Remote consultations",
      legalInfo: "Legal information",
      privacy: "Privacy Policy (GDPR)",
      terms: "Terms of Service",
      disclaimer: "The materials published on this website are for informational purposes only and do not constitute advertising of medical services under applicable law. The content does not replace medical advice. Treatment decisions are made by a physician after examination and analysis of results.",
      copyright: "Individual Medical Practice Marta Treblińska, MD. All rights reserved."
    },
    cookie: {
      text: "This website uses cookies to ensure proper functioning. By using the site, you consent to their use in accordance with the",
      privacyLink: "Privacy Policy",
      reject: "Reject",
      accept: "Accept"
    },
    feedback: {
      button: "Feedback",
      title: "Report a bug or suggestion",
      subtitle: "Help us improve the website — report an issue or share an idea. To book an appointment, please use the contact form.",
      messageLabel: "Message",
      messagePlaceholder: "Describe an issue or share an idea...",
      emailLabel: "E-mail",
      emailOptional: "(optional)",
      emailPlaceholder: "your@email.com",
      emailHint: "Leave your e-mail if you'd like us to get back to you.",
      submit: "Submit",
      successTitle: "Submitted!",
      successDesc: "Thank you for your feedback.",
      error: "Something went wrong. Please try again."
    },
    adam: {
      bannerTitle: "Check if you may have testosterone deficiency",
      bannerDesc: "Complete the ADAM questionnaire — 10 questions, ~2 minutes, instant result",
      bannerCta: "Take the questionnaire",
      title: "ADAM Questionnaire",
      questionLabel: "Question",
      yes: "Yes",
      no: "No",
      q1: "Do you have a decrease in libido (sex drive)?",
      q2: "Do you have a lack of energy?",
      q3: "Do you have a decrease in strength and/or endurance?",
      q4: "Have you lost height?",
      q5: "Have you noticed a decreased enjoyment of life?",
      q6: "Are you sad and/or grumpy?",
      q7: "Are your erections less strong?",
      q8: "Have you noticed a recent deterioration in your ability to play sports?",
      q9: "Are you falling asleep after dinner?",
      q10: "Has there been a recent deterioration in your work performance?",
      positiveTitle: "Result suggests possible testosterone deficiency",
      positiveText: "Your answers indicate symptoms that may be associated with androgen deficiency. The ADAM questionnaire result is not a diagnosis — confirmation requires a medical consultation and laboratory tests.",
      negativeTitle: "Result does not indicate testosterone deficiency",
      negativeText: "Your answers do not meet the criteria for a positive ADAM questionnaire result. If you still experience concerning symptoms, it is worth discussing them with a doctor.",
      ctaConsult: "Book a medical consultation",
      close: "Close",
      disclaimer: "The ADAM questionnaire is a screening tool and does not replace a medical diagnosis."
    }
  },
  de: {
    nav: {
      symptoms: "Symptome",
      services: "Leistungen",
      process: "Ablauf",
      doctor: "Ärztin",
      faq: "FAQ",
      contact: "Kontakt",
      call: "Termin buchen",
      blog: "Blog"
    },
    hero: {
      badge: "Ärztliche Beratung · Diagnostik · Therapie",
      title: "Chronische Müdigkeit, Energiemangel, verminderte Libido?",
      description: "Das könnte ein Testosteronmangel sein. Ärztliche Fernberatung — bequem, von überall.",
      cta: "Beratung vereinbaren",
      doctorName: "Dr. med. Marta Treblińska",
      perk1: "Kein Wartezimmer, kein Ansteckungsrisiko",
      perk2: "Von überall aus Polen",
      perk3: "Individueller Terminvorschlag"
    },
    symptoms: {
      title: "Wann sollten Sie eine ärztliche Beratung in Betracht ziehen?",
      subtitle: "Erkennen Sie sich in einem dieser Symptome wieder? Sie können viele Ursachen haben — Testosteronmangel ist eine davon. Eine ärztliche Beratung schafft Klarheit.",
      fatigue: "Chronische Müdigkeit und Energiemangel",
      fatigueDesc: "Sie wachen müde auf, obwohl Sie die ganze Nacht geschlafen haben.",
      brain: "Gehirnnebel",
      brainDesc: "Schwer, sich zu konzentrieren, anzufangen oder Dinge zu Ende zu bringen.",
      sleep: "Schlaf- und Erholungsprobleme",
      sleepDesc: "Der Schlaf fühlt sich nicht erholsam an, der Körper erholt sich langsamer.",
      libido: "Verminderte Libido",
      libidoDesc: "Weniger Lust auf Sex oder etwas, das früher selbstverständlich war, hat sich verändert.",
      weight: "Gewichtszunahme trotz Bemühungen",
      weightDesc: "Die Körperzusammensetzung verändert sich, obwohl der Lebensstil gleich geblieben ist.",
      hormones: "Auffällige Hormonwerte",
      hormonesDesc: "Sie haben Ergebnisse, wissen aber nicht, was Sie damit anfangen sollen."
    },
    services: {
      title: "Was beinhaltet eine Beratung?",
      sniperTag: "Präzisionstherapie",
      sniperDesc: "Wir treffen die Ursache — nicht die Symptome",
      diagnostics: "Diagnostik hormoneller Störungen",
      diagnosticsDesc: "Wir beurteilen Ihren Hormonstatus und identifizieren mögliche Auffälligkeiten",
      hormoneLevel: "Bestimmung des Hormonspiegels",
      hormoneLevelDesc: "Wir überprüfen Gesamttestosteron, freies Testosteron, SHBG und weitere Schlüsselwerte",
      interpretation: "Befundbesprechung",
      interpretationDesc: "Wir erläutern, was Ihre Ergebnisse bedeuten und welche Optionen Sie haben",
      qualification: "Therapiequalifikation",
      qualificationDesc: "Wir beurteilen, ob und welche Therapie für Sie in Frage kommt",
      therapy: "Therapieführung",
      therapyDesc: "Wir führen die Behandlung nach den aktuellen Leitlinien evidenzbasierter Medizin durch",
      monitoring: "Therapieüberwachung",
      monitoringDesc: "Regelmäßige Kontrolluntersuchungen zur Sicherstellung von Wirksamkeit und Verträglichkeit"
    },
    process: {
      title: "Wie läuft der diagnostische Prozess ab?",
      subtitle: "Der diagnostische Prozess umfasst mehrere Schritte, die eine gründliche Beurteilung des Gesundheitszustands ermöglichen.",
      step1: "Ärztliche Beratung",
      step1Desc: "Ausführliche Anamnese und Symptomanalyse",
      step2: "Laboruntersuchungen",
      step2Desc: "Anordnung entsprechender Hormonuntersuchungen",
      step3: "Befundbesprechung",
      step3Desc: "Interpretation der Ergebnisse und Erläuterung der nächsten Schritte",
      step4: "Weiteres Vorgehen",
      step4Desc: "Erstellung eines Behandlungsplans bei medizinischer Indikation",
      disclaimer: "Eine Behandlung wird nur bei Vorliegen medizinischer Indikationen eingeleitet.",
      patientNote: "Regelmäßige Kontrolltermine und die zeitgerechte Durchführung angeordneter Untersuchungen sind ein wesentlicher Bestandteil einer sicheren Therapie. Der Patient trägt aktiv zu diesem Prozess bei — die Ärztin sorgt für die medizinische Betreuung, die Wahrnehmung der Kontrolltermine liegt in der Verantwortung des Patienten."
    },
    trtInfo: {
      title: "Behandlung des Testosteronmangels",
      p1: "Die Testosteronersatztherapie (TRT) ist eine Behandlungsmethode für Patienten mit bestätigtem Testosteronmangel.",
      p2: "Jeder Fall erfordert eine individuelle ärztliche Bewertung, entsprechende Diagnostik und regelmäßige Kontrolle während der Behandlung.",
      disclaimer: "Die Entscheidung über die Einleitung einer Behandlung trifft ausschließlich der Arzt nach vollständiger Diagnostik und Analyse der Untersuchungsergebnisse."
    },
    doctor: {
      title: "Behandelnde Ärztin",
      name: "Dr. med. Marta Treblińska",
      education: "Ärztin, Medizinische Universität Warschau",
      harvard: "Testosterone Therapy and Sexual Dysfunction — Harvard Medical School",
      experience: "Langjährige Erfahrung in der Diagnostik und Behandlung hormoneller Störungen bei Männern",
      ebm: "Präzise Ursachendiagnostik statt Symptombehandlung — evidenzbasierte Medizin (EBM)",
      alfa: "TRT Master Practitioner Zertifikat — Dr. med. Marta Mazur, Projekt Alfa"
    },
    faq: {
      title: "Häufig gestellte Fragen",
      q1: "Erfordert ein niedriger Testosteronspiegel immer eine Behandlung?",
      a1: "Nein. Ein Rückgang des Testosteronspiegels mit dem Alter ist natürlich und erfordert nicht immer eine pharmakologische Intervention. Die Behandlungsentscheidung hängt von der Schwere der Symptome, den Untersuchungsergebnissen und der individuellen ärztlichen Bewertung ab.",
      q2: "Welche Untersuchungen sollten vor der Beratung durchgeführt werden?",
      a2: "Vor der Beratung wird empfohlen, ein grundlegendes Hormonpanel durchzuführen, einschließlich Gesamttestosteron, freies Testosteron, SHBG, LH, FSH, Östradiol und Prolaktin. Der genaue Umfang der Untersuchungen wird während des Termins festgelegt.",
      q3: "Wie sieht die Kontrolle während der Behandlung aus?",
      a3: "Patienten unter Behandlung werden regelmäßig überwacht. Die Kontrollen umfassen Laboruntersuchungen (u.a. Blutbild, Hämatokrit, Lipidprofil, PSA) und Kontrolltermine, deren Häufigkeit vom Arzt festgelegt wird.",
      q4: "Findet die Beratung persönlich oder online statt?",
      a4: "Beratungen finden ausschließlich in Fernform (Telekonsultation) statt — bequem, von überall aus. Der Termin wird individuell vereinbart.",
      q5: "Ist die Hormontherapie sicher?",
      a5: "Jede Therapie birgt potenzielle Vorteile und Risiken. Die Behandlungssicherheit hängt von der richtigen Qualifikation, der angemessenen Dosierung und der regelmäßigen Überwachung des Patienten durch den Arzt ab."
    },
    contact: {
      title: "Beratung vereinbaren",
      subtitle: "Eine ärztliche Beratung ist der erste Schritt zur Diagnostik und gegebenenfalls zur Behandlung hormoneller Störungen.",
      phone: "Telefon",
      email: "E-Mail",
      consultForm: "Beratungsform",
      consultFormValue: "Fernberatung — bequem, von überall",
      remoteNote: "Kein Anfahrtsweg, kein Wartezimmer — individueller Termin.",
      schedule: "Termine",
      scheduleValue: "Individuell auf den Patienten abgestimmt",
      firstConsultation: "Erstberatung",
      firstConsultationDesc: "Nehmen Sie telefonisch oder per E-Mail Kontakt auf, um einen Termin zu vereinbaren. Bei der Anmeldung erhalten Sie Hinweise zu empfohlenen Voruntersuchungen.",
      callNow: "Jetzt anrufen",
      priceNote: "Erstberatung (60 Min.) — 799 PLN",
      priceFollowUp: "Kontrolltermin (30 Min.) — 449 PLN"
    },
    footer: {
      entityInfo: "Angaben zur Praxis",
      practice: "Einzelärztliche Praxis Marta Treblińska",
      address: "ul. Duboisa 1/21, Ostrów Mazowiecki, Polen",
      doctorName: "Dr. med. Marta Treblińska",
      remote: "Fernkonsultationen",
      legalInfo: "Rechtliche Informationen",
      privacy: "Datenschutzrichtlinie (DSGVO)",
      terms: "Nutzungsbedingungen",
      disclaimer: "Die auf dieser Website veröffentlichten Materialien dienen ausschließlich zu Informationszwecken und stellen keine Werbung für medizinische Leistungen dar. Die Inhalte ersetzen keine ärztliche Beratung. Behandlungsentscheidungen werden vom Arzt nach Untersuchung und Analyse der Ergebnisse getroffen.",
      copyright: "Einzelärztliche Praxis Marta Treblińska. Alle Rechte vorbehalten."
    },
    cookie: {
      text: "Diese Website verwendet Cookies, um die ordnungsgemäße Funktion sicherzustellen. Durch die Nutzung der Seite stimmen Sie deren Verwendung gemäß der",
      privacyLink: "Datenschutzrichtlinie",
      reject: "Ablehnen",
      accept: "Akzeptieren"
    },
    feedback: {
      button: "Feedback",
      title: "Fehler oder Vorschlag melden",
      subtitle: "Helfen Sie uns, die Website zu verbessern — melden Sie ein Problem oder teilen Sie eine Idee. Für Terminvereinbarungen nutzen Sie bitte das Kontaktformular.",
      messageLabel: "Nachricht",
      messagePlaceholder: "Problem beschreiben oder Idee teilen...",
      emailLabel: "E-Mail",
      emailOptional: "(optional)",
      emailPlaceholder: "ihre@email.de",
      emailHint: "Hinterlassen Sie Ihre E-Mail-Adresse, wenn wir Sie kontaktieren sollen.",
      submit: "Senden",
      successTitle: "Gesendet!",
      successDesc: "Danke für Ihr Feedback.",
      error: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
    },
    adam: {
      bannerTitle: "Prüfen Sie, ob Sie einen Testosteronmangel haben könnten",
      bannerDesc: "Füllen Sie den ADAM-Fragebogen aus — 10 Fragen, ca. 2 Minuten, sofortiges Ergebnis",
      bannerCta: "Fragebogen ausfüllen",
      title: "ADAM-Fragebogen",
      questionLabel: "Frage",
      yes: "Ja",
      no: "Nein",
      q1: "Haben Sie eine Abnahme des Sexualtriebs (Libido) bemerkt?",
      q2: "Leiden Sie unter Energiemangel?",
      q3: "Haben Sie eine Abnahme von Kraft und/oder Ausdauer bemerkt?",
      q4: "Sind Sie kleiner geworden?",
      q5: "Haben Sie eine verminderte Lebensfreude bemerkt?",
      q6: "Sind Sie traurig und/oder reizbar?",
      q7: "Sind Ihre Erektionen weniger stark?",
      q8: "Hat sich Ihre sportliche Leistungsfähigkeit zuletzt verschlechtert?",
      q9: "Schlafen Sie nach dem Abendessen ein?",
      q10: "Hat sich Ihre Arbeitsleistung zuletzt verschlechtert?",
      positiveTitle: "Ergebnis deutet auf möglichen Testosteronmangel hin",
      positiveText: "Ihre Antworten weisen auf Symptome hin, die mit einem Androgendefizit zusammenhängen können. Das ADAM-Ergebnis ist keine Diagnose — eine Bestätigung erfordert eine ärztliche Beratung und Laboruntersuchungen.",
      negativeTitle: "Ergebnis weist nicht auf Testosteronmangel hin",
      negativeText: "Ihre Antworten erfüllen nicht die Kriterien für ein positives ADAM-Ergebnis. Wenn Sie dennoch beunruhigende Symptome haben, sollten Sie diese mit einem Arzt besprechen.",
      ctaConsult: "Beratung vereinbaren",
      close: "Schließen",
      disclaimer: "Der ADAM-Fragebogen ist ein Screening-Instrument und ersetzt keine ärztliche Diagnose."
    }
  }
};
const g = globalThis;
if (!g.__LanguageContext) {
  g.__LanguageContext = createContext(null);
}
const LanguageContext = g.__LanguageContext;
const SUPPORTED_LOCALES = ["pl", "en", "de"];
const isSSR = typeof window === "undefined";
function getLocaleFromPath(url) {
  const path = url || (isSSR ? "/" : window.location.pathname);
  const match = path.match(/^\/(en|de)(\/|$)/);
  return match ? match[1] : null;
}
function LanguageProvider({ children, ssrUrl }) {
  const [locale, setLocaleState] = useState(() => {
    const pathLocale = getLocaleFromPath(ssrUrl);
    if (pathLocale) return pathLocale;
    if (!isSSR) {
      const stored = localStorage.getItem("locale");
      if (stored && SUPPORTED_LOCALES.includes(stored)) return stored;
    }
    return "pl";
  });
  const setLocale = useCallback((newLocale) => {
    setLocaleState(newLocale);
    if (isSSR) return;
    localStorage.setItem("locale", newLocale);
    const path = window.location.pathname;
    const cleanPath = path.replace(/^\/(en|de)/, "") || "/";
    const newPath = newLocale === "pl" ? cleanPath : `/${newLocale}${cleanPath === "/" ? "" : cleanPath}`;
    window.history.replaceState(null, "", newPath);
    document.documentElement.lang = newLocale;
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const t = translations[locale];
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value: { locale, setLocale, t }, children });
}
function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground hover:bg-primary/85 shadow-lg text-base font-medium",
        "hero-outline": "border-2 border-hero-foreground/30 text-hero-foreground hover:bg-hero-foreground/10 text-base font-medium"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const FlagPL = () => /* @__PURE__ */ jsx("svg", { viewBox: "0 0 640 480", className: "w-5 h-3.5 rounded-[2px] shadow-sm border border-border/30", children: /* @__PURE__ */ jsxs("g", { fillRule: "evenodd", children: [
  /* @__PURE__ */ jsx("path", { fill: "#fff", d: "M640 480H0V0h640z" }),
  /* @__PURE__ */ jsx("path", { fill: "#dc143c", d: "M640 480H0V240h640z" })
] }) });
const FlagGB = () => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-5 h-3.5 rounded-[2px] shadow-sm border border-border/30", children: [
  /* @__PURE__ */ jsx("path", { fill: "#012169", d: "M0 0h640v480H0z" }),
  /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" }),
  /* @__PURE__ */ jsx("path", { fill: "#C8102E", d: "m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z" }),
  /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "M241 0v480h160V0H241zM0 160v160h640V160H0z" }),
  /* @__PURE__ */ jsx("path", { fill: "#C8102E", d: "M0 193v96h640v-96H0zM273 0v480h96V0h-96z" })
] });
const FlagDE = () => /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-5 h-3.5 rounded-[2px] shadow-sm border border-border/30", children: [
  /* @__PURE__ */ jsx("path", { fill: "#ffce00", d: "M0 320h640v160H0z" }),
  /* @__PURE__ */ jsx("path", { d: "M0 0h640v160H0z" }),
  /* @__PURE__ */ jsx("path", { fill: "#d00", d: "M0 160h640v160H0z" })
] });
const flagComponents = { pl: FlagPL, en: FlagGB, de: FlagDE };
const localeLabels = { pl: "Polski", en: "English", de: "Deutsch" };
const localeLabelShort = { pl: "PL", en: "EN", de: "DE" };
const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const homePaths = ["/", "/en", "/de"];
  const isHome = homePaths.includes(location.pathname);
  const links = [
    { label: t.nav.symptoms, href: "#objawy" },
    { label: t.nav.services, href: "#uslugi" },
    { label: t.nav.process, href: "#proces" },
    { label: t.nav.doctor, href: "#lekarz" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#kontakt" }
  ];
  const scrollTo = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    if (isHome) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
    setOpen(false);
  }, [isHome, navigate]);
  const Flag = flagComponents[locale];
  return /* @__PURE__ */ jsxs("nav", { className: "sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-5xl flex items-center justify-between h-16", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          onClick: (e) => {
            if (window.location.pathname === "/" || window.location.pathname === `/${locale === "pl" ? "" : locale}`) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          },
          className: "font-serif text-lg text-foreground",
          children: t.hero.doctorName
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
        links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, onClick: (e) => scrollTo(e, l.href), className: "text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer", children: l.label }, l.href)),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/blog",
            onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
            className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: t.nav.blog
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setLangOpen(!langOpen),
              className: "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted",
              children: [
                /* @__PURE__ */ jsx(Flag, {}),
                /* @__PURE__ */ jsx("span", { children: localeLabelShort[locale] })
              ]
            }
          ),
          langOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setLangOpen(false) }),
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[140px]", children: ["pl", "en", "de"].map((l) => {
              const LFlag = flagComponents[l];
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    setLocale(l);
                    setLangOpen(false);
                  },
                  className: `w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-muted transition-colors ${l === locale ? "text-foreground font-medium bg-muted/50" : "text-muted-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsx(LFlag, {}),
                    /* @__PURE__ */ jsx("span", { children: localeLabels[l] })
                  ]
                },
                l
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "#kontakt", onClick: (e) => scrollTo(e, "#kontakt"), children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 mr-1.5" }),
          t.nav.call
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 md:hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLangOpen(!langOpen),
              className: "p-2 text-foreground",
              children: /* @__PURE__ */ jsx(Flag, {})
            }
          ),
          langOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-40", onClick: () => setLangOpen(false) }),
            /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-1 z-50 bg-card border border-border rounded-lg shadow-lg py-1 min-w-[140px]", children: ["pl", "en", "de"].map((l) => {
              const LFlag = flagComponents[l];
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    setLocale(l);
                    setLangOpen(false);
                  },
                  className: `w-full text-left px-3 py-2 text-sm flex items-center gap-2.5 hover:bg-muted transition-colors ${l === locale ? "text-foreground font-medium bg-muted/50" : "text-muted-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsx(LFlag, {}),
                    /* @__PURE__ */ jsx("span", { children: localeLabels[l] })
                  ]
                },
                l
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "p-2 text-foreground", onClick: () => setOpen(!open), "aria-label": "Menu", children: open ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" }) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxs("div", { className: "md:hidden bg-card border-b border-border px-6 pb-4 space-y-2", children: [
      links.map((l) => /* @__PURE__ */ jsx("a", { href: l.href, onClick: (e) => scrollTo(e, l.href), className: "block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer", children: l.label }, l.href)),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/blog",
          onClick: () => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          className: "block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
          children: t.nav.blog
        }
      ),
      /* @__PURE__ */ jsx(Button, { size: "sm", className: "w-full mt-2", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "#kontakt", onClick: (e) => scrollTo(e, "#kontakt"), children: [
        /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 mr-1.5" }),
        t.nav.call
      ] }) })
    ] })
  ] });
};
const EMAIL$1 = "treblinskamarta@zdrowiehormonalne.pl";
const HeroSection = () => {
  const { t, locale } = useLanguage();
  const phoneDisplay = locale === "pl" ? "572 565 887" : "+48 572 565 887";
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL$1);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxs("section", { className: "bg-hero text-hero-foreground relative overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.03]", style: { backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` } }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-20 md:py-32 relative z-10 max-w-4xl text-center animate-fade-in", children: [
      /* @__PURE__ */ jsx("p", { className: "inline-block text-sm uppercase tracking-[0.2em] text-hero-foreground font-semibold mb-6 px-4 py-2 rounded-full bg-hero-foreground/10 border border-hero-foreground/20", children: t.hero.badge }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-hero-foreground", children: t.hero.title }),
      /* @__PURE__ */ jsx("p", { className: "text-lg md:text-xl text-hero-foreground max-w-2xl mx-auto mb-10 leading-relaxed", children: t.hero.description }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center mb-12", children: [
        /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", className: "h-13 px-8", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "#kontakt", children: t.hero.cta }) }),
        /* @__PURE__ */ jsx(Button, { variant: "hero-outline", size: "lg", className: "h-13 px-8", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-1" }),
          phoneDisplay
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-hero-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("a", { href: `mailto:${EMAIL$1}`, className: "flex items-center gap-2 hover:text-hero-foreground/90 transition-colors", children: [
            /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
            EMAIL$1
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: handleCopy, className: "p-1 rounded hover:bg-hero-foreground/10 transition-colors", title: "Copy email", children: copied ? /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5" }) })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "·" }),
        /* @__PURE__ */ jsx("span", { children: t.hero.doctorName })
      ] })
    ] })
  ] });
};
const ScrollReveal = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`,
      children
    }
  );
};
const SymptomsSection = () => {
  const { t } = useLanguage();
  const symptoms = [
    { icon: BatteryLow, label: t.symptoms.fatigue, desc: t.symptoms.fatigueDesc },
    { icon: Brain, label: t.symptoms.brain, desc: t.symptoms.brainDesc },
    { icon: Moon, label: t.symptoms.sleep, desc: t.symptoms.sleepDesc },
    { icon: HeartPulse, label: t.symptoms.libido, desc: t.symptoms.libidoDesc },
    { icon: TrendingUp, label: t.symptoms.weight, desc: t.symptoms.weightDesc },
    { icon: FlaskConical, label: t.symptoms.hormones, desc: t.symptoms.hormonesDesc }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-4", children: t.symptoms.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center mb-14 max-w-2xl mx-auto", children: t.symptoms.subtitle })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: symptoms.map((s, i) => /* @__PURE__ */ jsx(ScrollReveal, { delay: i * 100, children: /* @__PURE__ */ jsxs("div", { className: "group flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center text-teal-mid group-hover:scale-110 transition-transform mb-4 flex-shrink-0", children: /* @__PURE__ */ jsx(s.icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground font-semibold leading-snug mb-2", children: s.label }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: s.desc })
    ] }) }, i)) })
  ] }) });
};
const ServicesSection = () => {
  const { t } = useLanguage();
  const services = [
    { icon: Stethoscope, title: t.services.diagnostics, desc: t.services.diagnosticsDesc },
    { icon: BarChart3, title: t.services.hormoneLevel, desc: t.services.hormoneLevelDesc },
    { icon: FileSearch, title: t.services.interpretation, desc: t.services.interpretationDesc },
    { icon: ClipboardCheck, title: t.services.qualification, desc: t.services.qualificationDesc },
    { icon: HeartPulse, title: t.services.therapy, desc: t.services.therapyDesc },
    { icon: ShieldCheck, title: t.services.monitoring, desc: t.services.monitoringDesc }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-section-alt", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-5xl", children: [
    /* @__PURE__ */ jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-5", children: t.services.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mb-14", children: [
        /* @__PURE__ */ jsx(Crosshair, { className: "w-4 h-4 text-teal-mid" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-teal-mid tracking-wide uppercase", children: t.services.sniperTag }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "— ",
          t.services.sniperDesc
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: services.map((s, i) => /* @__PURE__ */ jsx(ScrollReveal, { delay: i * 80, children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 mx-auto rounded-full bg-teal-light flex items-center justify-center text-teal-mid mb-5", children: /* @__PURE__ */ jsx(s.icon, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "font-sans font-semibold text-foreground mb-2", children: s.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: s.desc })
    ] }) }, i)) })
  ] }) });
};
const ProcessSection = () => {
  const { t } = useLanguage();
  const steps = [
    { num: "01", title: t.process.step1, desc: t.process.step1Desc },
    { num: "02", title: t.process.step2, desc: t.process.step2Desc },
    { num: "03", title: t.process.step3, desc: t.process.step3Desc },
    { num: "04", title: t.process.step4, desc: t.process.step4Desc }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-4", children: t.process.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center mb-14 max-w-2xl mx-auto", children: t.process.subtitle })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute left-[2.25rem] top-8 bottom-8 w-px bg-border" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-8", children: steps.map((s, i) => /* @__PURE__ */ jsx(ScrollReveal, { delay: i * 150, children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[4rem,1fr] items-start gap-4 md:grid-cols-[4.5rem,1fr] md:gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "relative z-10 flex h-16 w-16 items-center justify-center self-start rounded-xl bg-hero font-serif text-xl text-hero-foreground md:h-[4.5rem] md:w-[4.5rem] md:rounded-2xl", children: s.num }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 pt-1 md:pt-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-sans text-lg font-semibold leading-tight text-foreground", children: s.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-muted-foreground", children: s.desc })
        ] })
      ] }) }, i)) })
    ] }),
    /* @__PURE__ */ jsx(ScrollReveal, { delay: 600, children: /* @__PURE__ */ jsxs("div", { className: "mt-12 border-t border-border pt-8 space-y-3", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground italic", children: t.process.disclaimer }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground", children: t.process.patientNote })
    ] }) })
  ] }) });
};
const TrtInfoSection = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-section-alt", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
    /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-8", children: t.trtInfo.title }) }),
    /* @__PURE__ */ jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-5 sm:p-8 md:p-12 border border-border shadow-sm", children: [
      /* @__PURE__ */ jsx("p", { className: "text-foreground leading-relaxed mb-6", children: t.trtInfo.p1 }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground leading-relaxed mb-6", children: t.trtInfo.p2 }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground border-t border-border pt-6 italic", children: t.trtInfo.disclaimer })
    ] }) })
  ] }) });
};
const DoctorSection = () => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState(null);
  const certificates = [
    { webp: "/images/cert-harvard.webp", jpg: "/images/cert-harvard.jpg", alt: "Harvard Medical School Certificate" },
    { webp: "/images/cert-trt-master.webp", jpg: "/images/cert-trt-master.jpg", alt: "TRT Master Practitioner Certificate" },
    { webp: "/images/cert-dr-marcin-madziarski.webp", jpg: "/images/cert-dr-marcin-madziarski.jpg", alt: "Kurs TrT - od teorii do praktyki klinicznej" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-background", id: "lekarz", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
      /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-14", children: t.doctor.title }) }),
      /* @__PURE__ */ jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center gap-10 md:gap-14", children: [
        /* @__PURE__ */ jsx("div", { className: "w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-hero flex-shrink-0 flex items-center justify-center text-hero-foreground font-serif text-5xl", children: "MT" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-foreground mb-2", children: t.doctor.name }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-muted-foreground", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.education })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.harvard })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.alfa })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.experience })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.ebm })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(ScrollReveal, { delay: 300, children: /* @__PURE__ */ jsx("div", { className: "mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6", children: certificates.map((cert) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setLightbox(cert.webp),
          className: "group rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow cursor-zoom-in",
          children: /* @__PURE__ */ jsxs("picture", { children: [
            /* @__PURE__ */ jsx("source", { srcSet: cert.webp, type: "image/webp" }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: cert.jpg,
                alt: cert.alt,
                className: "w-full h-auto object-contain",
                loading: "lazy"
              }
            )
          ] })
        },
        cert.webp
      )) }) })
    ] }) }),
    lightbox && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out",
        onClick: () => setLightbox(null),
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src: lightbox,
            alt: "Certificate",
            className: "max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          }
        )
      }
    )
  ] });
};
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = React.forwardRef(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const onSelect = React.useCallback((api2) => {
      if (!api2) {
        return;
      }
      setCanScrollPrev(api2.canScrollPrev());
      setCanScrollNext(api2.canScrollNext());
    }, []);
    const scrollPrev = React.useCallback(() => {
      api == null ? void 0 : api.scrollPrev();
    }, [api]);
    const scrollNext = React.useCallback(() => {
      api == null ? void 0 : api.scrollNext();
    }, [api]);
    const handleKeyDown = React.useCallback(
      (event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );
    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }
      setApi(api);
    }, [api, setApi]);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api == null ? void 0 : api.off("select", onSelect);
      };
    }, [api, onSelect]);
    return /* @__PURE__ */ jsx(
      CarouselContext.Provider,
      {
        value: {
          carouselRef,
          api,
          opts,
          orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            onKeyDownCapture: handleKeyDown,
            className: cn("relative", className),
            role: "region",
            "aria-roledescription": "carousel",
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
const CarouselContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = React.forwardRef(
  ({ className, variant = "outline", size = "icon", onClick, ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: (e) => {
          scrollPrev();
          onClick == null ? void 0 : onClick(e);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = React.forwardRef(
  ({ className, variant = "outline", size = "icon", onClick, ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: (e) => {
          scrollNext();
          onClick == null ? void 0 : onClick(e);
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const reviews = [
  { name: "Grzegorz", text: "Chapeau bas. Realne zainteresowanie pacjentem, godzinna konsultacja minęła mi jak 2 minuty. Pani Marta wszystko dokładnie wytłumaczyła, zero sztampy, a przy tym profesjonalizm." },
  { name: "Jacek", text: "Wizyta przebiegła bardzo szczegółowo i dokładnie, jestem bardzo zadowolony z przebiegu konsultacji i profesjonalizmu pani doktor." },
  { name: "AS", text: "Bardzo empatyczna i ciepła osoba, wywiad szczegółowy, czuję się zaopiekowany :)" },
  { name: "Mirosław", text: "Pani Marto pełen profesjonalizm i zaangażowanie, serdecznie dziękuję" },
  { name: "Grzegorz", text: "Bardzo konkretny lekarz, dokładny wywiad, pytania w punkt, Pani Marta wie jak poprowadzić rozmowę, dokładne zalecenia 10/10" },
  { name: "Kacper", text: "Będę polecał, szczere 5 gwiazdek" }
];
const MEDFILE_URL = "https://www.medfile.pl/marta-treblinska-2/specjalista/ostrow-mazowiecki/";
const Stars = () => /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-yellow-400 text-yellow-400" }, i)) });
const ReviewsSection = () => {
  const { locale } = useLanguage();
  const timerRef = useRef();
  const plugin = useRef(Autoplay({ delay: 4e3, stopOnInteraction: false, stopOnMouseEnter: true }));
  const handleArrowClick = useCallback(() => {
    const autoplay = plugin.current;
    autoplay.stop();
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => autoplay.play(), 5e3);
  }, []);
  const title = locale === "en" ? "Patient Reviews" : locale === "de" ? "Patientenbewertungen" : "Opinie pacjentów";
  const allReviews = locale === "en" ? "See all reviews" : locale === "de" ? "Alle Bewertungen" : "Zobacz wszystkie opinie";
  const verified = locale === "en" ? "Verified visit" : locale === "de" ? "Verifizierter Besuch" : "Weryfikacja wizyty";
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
    /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-3 font-display", children: title }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2 mb-2", children: /* @__PURE__ */ jsx(Stars, {}) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-2", children: locale === "en" ? "Verified patient reviews" : locale === "de" ? "Verifizierte Patientenbewertungen" : "Zweryfikowane opinie pacjentów" }),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: MEDFILE_URL,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-1.5 text-sm text-primary hover:underline",
          children: [
            allReviews,
            /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx(ScrollReveal, { delay: 150, children: /* @__PURE__ */ jsxs(
      Carousel,
      {
        opts: { align: "start", loop: true },
        plugins: [plugin.current],
        className: "w-full",
        children: [
          /* @__PURE__ */ jsx(CarouselContent, { className: "-ml-4", children: reviews.map((review, idx) => /* @__PURE__ */ jsx(CarouselItem, { className: "pl-4 md:basis-1/2 lg:basis-1/3", children: /* @__PURE__ */ jsxs("div", { className: "h-full rounded-xl border border-border bg-card p-6 flex flex-col", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsx("div", { className: "h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm", children: review.name[0] }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground text-sm", children: review.name }) })
            ] }),
            /* @__PURE__ */ jsx(Stars, {}),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1 mb-3", children: verified }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-foreground/80 leading-relaxed flex-1", children: [
              '"',
              review.text,
              '"'
            ] })
          ] }) }, idx)) }),
          /* @__PURE__ */ jsx(CarouselPrevious, { className: "-left-4 md:-left-6 bg-card border-border", onClick: handleArrowClick }),
          /* @__PURE__ */ jsx(CarouselNext, { className: "-right-4 md:-right-6 bg-card border-border", onClick: handleArrowClick })
        ]
      }
    ) })
  ] }) });
};
const blogPosts = [
  {
    slug: "trt-a-uklad-krazenia",
    title: "Testosteron a serce — czy TRT jest bezpieczna dla układu krążenia?",
    metaDescription: "Czy terapia zastępcza testosteronem (TRT) jest bezpieczna dla serca? Przegląd aktualnych badań i wytycznych dotyczących TRT a chorób układu krążenia.",
    date: "2026-03-20",
    readingTime: 7,
    excerpt: "Bezpieczeństwo sercowo-naczyniowe TRT to jeden z najczęściej zadawanych pytań pacjentów. Przez lata temat był kontrowersyjny — dziś dysponujemy znacznie lepszymi danymi.",
    content: [
      {
        heading: "Skąd wzięły się obawy o serce?",
        paragraphs: [
          "Kontrowersje wokół TRT i układu krążenia nasilił się po 2010 roku, gdy kilka badań sugerowało zwiększone ryzyko zawału i udaru u mężczyzn stosujących terapię testosteronem. Część z tych badań miała jednak poważne wady metodologiczne — m.in. zbyt krótki czas obserwacji, niejednorodne grupy pacjentów czy brak kontroli kluczowych czynników ryzyka.",
          "Od tego czasu przeprowadzono wiele lepiej zaprojektowanych badań, w tym randomizowane kontrolowane próby kliniczne, które dają znacznie bardziej wiarygodny obraz sytuacji."
        ]
      },
      {
        heading: "Co mówią aktualne dane naukowe?",
        paragraphs: [
          "Przełomowym badaniem była opublikowana w 2023 roku próba TRAVERSE — największe jak dotąd randomizowane badanie oceniające bezpieczeństwo sercowo-naczyniowe TRT u mężczyzn z hipogonadyzmem i podwyższonym ryzykiem sercowo-naczyniowym. Wyniki nie wykazały istotnego wzrostu ryzyka poważnych zdarzeń sercowych (MACE) w grupie leczonej testosteronem w porównaniu z placebo.",
          "Co więcej, wiele badań obserwacyjnych sugeruje, że nieleczony niedobór testosteronu sam w sobie jest czynnikiem ryzyka chorób układu krążenia — ze względu na niekorzystny wpływ na profil lipidowy, insulinooporność, tkankę tłuszczową trzewną i stan zapalny."
        ]
      },
      {
        heading: "Kiedy TRT wymaga szczególnej ostrożności?",
        paragraphs: [
          "Mimo korzystnych wyników dużych badań, TRT wymaga indywidualnej oceny ryzyka. Szczególnej uwagi wymagają pacjenci z niedawno przebytym zawałem lub udarem, ciężką niewydolnością serca, niekontrolowanym nadciśnieniem lub bardzo wysokim wyjściowym hematokrytem.",
          "Kluczowe jest też regularne monitorowanie podczas terapii — hematokryt (testosteron stymuluje erytropoezę, co może zwiększać lepkość krwi), ciśnienie tętnicze i profil lipidowy. Prawidłowo prowadzona terapia z odpowiednim monitorowaniem znacznie minimalizuje potencjalne ryzyko."
        ]
      },
      {
        heading: "Podsumowanie",
        paragraphs: [
          "Aktualne dane naukowe nie potwierdzają zwiększonego ryzyka sercowo-naczyniowego u właściwie zakwalifikowanych pacjentów leczonych TRT pod nadzorem lekarskim. Jak zawsze, decyzja o terapii powinna uwzględniać indywidualny profil ryzyka każdego pacjenta — i to właśnie jest rola lekarza prowadzącego."
        ]
      }
    ]
  },
  {
    slug: "telemedycyna-konsultacja-hormonalna",
    title: "Telemedycyna w endokrynologii — jak wygląda zdalna konsultacja hormonalna?",
    metaDescription: "Zdalna konsultacja hormonalna — co to jest teleporada, jak się przygotować, jakie badania warto mieć i czego możesz się spodziewać podczas wizyty online.",
    date: "2026-01-08",
    readingTime: 5,
    excerpt: "Konsultacja zdalna stała się standardem dla wielu specjalności medycznych. W przypadku zaburzeń hormonalnych teleporada sprawdza się wyjątkowo dobrze — dowiedz się, jak wygląda i jak się do niej przygotować.",
    content: [
      {
        heading: "Czy endokrynologia nadaje się do telemedycyny?",
        paragraphs: [
          "Diagnostyka i leczenie zaburzeń hormonalnych opiera się w dużej mierze na wynikach badań laboratoryjnych i wywiadzie medycznym — a obie te rzeczy doskonale sprawdzają się w formie zdalnej. W przeciwieństwie do niektórych specjalności wymagających badania fizykalnego (np. ortopedia, chirurgia), większość konsultacji endokrynologicznych nie wymaga bezpośredniego kontaktu fizycznego.",
          "W praktyce oznacza to, że pacjent może umówić się, przygotować wyniki badań, odbyć rozmowę z lekarzem przez telefon lub wideo i otrzymać zalecenia — nie wychodząc z domu."
        ]
      },
      {
        heading: "Jak się przygotować do zdalnej konsultacji hormonalnej?",
        paragraphs: [
          "Dobre przygotowanie znacząco podnosi jakość konsultacji. Warto przed wizytą: zebrać wszystkie posiadane wyniki badań laboratoryjnych (szczególnie hormonalnych — z ostatnich 1–2 lat), przygotować listę przyjmowanych leków i suplementów, zapisać objawy, które chcesz omówić — jak długo trwają, jak bardzo nasilone, co im towarzyszy.",
          "Jeśli nie masz jeszcze żadnych badań, lekarz może je zlecić podczas konsultacji — a wyniki omówić na kolejnej wizycie. Czasem warto wykonać wstępny panel hormonalny (testosteron całkowity, SHBG, LH, FSH, estradiol, prolaktyna) przed pierwszą wizytą, żeby rozmowa była od razu bardziej konkretna."
        ]
      },
      {
        heading: "Co dzieje się podczas wizyty?",
        paragraphs: [
          "Konsultacja zazwyczaj trwa 60 minut i obejmuje: szczegółowy wywiad medyczny (objawy, historia chorób, tryb życia), omówienie wyników badań (jeśli są dostępne), wyjaśnienie możliwych przyczyn dolegliwości, przedstawienie opcji diagnostycznych lub terapeutycznych, ustalenie dalszego planu działania.",
          "Na koniec pacjent otrzymuje zalecenia — co do badań, ewentualnego leczenia, stylu życia lub dalszej diagnostyki. Recepty na leki (jeśli są wskazane) mogą być wystawione w formie e-recepty."
        ]
      }
    ]
  },
  {
    slug: "shbg-co-to-jest",
    title: "SHBG — czym jest i jak wpływa na poziom aktywnego testosteronu?",
    metaDescription: "SHBG (globulina wiążąca hormony płciowe) to kluczowy parametr w ocenie gospodarki hormonalnej mężczyzny. Dowiedz się, czym jest, co na nią wpływa i dlaczego jest ważna.",
    date: "2025-10-15",
    readingTime: 6,
    excerpt: 'Mężczyźni często przychodzą na konsultację z wynikiem testosteronu "w normie", ale z wyraźnymi objawami niedoboru. Częstą przyczyną tej rozbieżności jest właśnie SHBG — białko, które decyduje, ile testosteronu jest faktycznie dostępne dla organizmu.',
    content: [
      {
        heading: "Co to jest SHBG?",
        paragraphs: [
          "SHBG (Sex Hormone-Binding Globulin) to białko produkowane głównie w wątrobie, które wiąże hormony płciowe — testosteron i estradiol — transportując je we krwi. Testosteron związany z SHBG jest biologicznie nieaktywny, co oznacza, że nie może wnikać do komórek i wywoływać efektów fizjologicznych.",
          "Tylko testosteron wolny (ok. 1–3% całości) oraz luźno związany z albuminą (ok. 30–50%) jest aktywny biologicznie. Dlatego wysoki poziom SHBG może prowadzić do objawów niedoboru testosteronu nawet przy prawidłowym wyniku testosteronu całkowitego."
        ]
      },
      {
        heading: "Co powoduje wzrost SHBG?",
        paragraphs: [
          "Poziom SHBG rośnie wraz z wiekiem — to jeden z powodów, dla których starsi mężczyźni mogą odczuwać objawy niedoboru testosteronu mimo formalnie prawidłowego wyniku całkowitego. Inne czynniki podwyższające SHBG to: niedoczynność tarczycy, choroby wątroby (marskość), stosowanie niektórych leków (m.in. fenytoiny, tyroksyny w nadmiarze), nadmierna chudość lub anoreksja, a także estrogeny.",
          "Z kolei czynniki obniżające SHBG to: otyłość (szczególnie brzuszna), insulinooporność i cukrzyca typu 2, niedoczynność tarczycy (paradoksalnie — zależy od stopnia zaawansowania), kortykosteroidy oraz wysokie stężenia androgenów."
        ]
      },
      {
        heading: "Jak SHBG jest uwzględniane w diagnostyce?",
        paragraphs: [
          "Znając poziom SHBG i testosteronu całkowitego, lekarz może wyliczyć testosteron wolny metodą matematyczną (kalkulator Vermeulena) — bez konieczności dodatkowego, kosztownego badania bezpośredniego. Ta wartość wyliczona często lepiej koreluje z objawami niż sam testosteron całkowity.",
          "Dlatego badanie SHBG jest standardową częścią panelu hormonalnego przy podejrzeniu niedoboru testosteronu — bez niego interpretacja wyników jest niekompletna."
        ]
      }
    ]
  },
  {
    slug: "testosteron-a-nastoj-depresja",
    title: "Testosteron a nastrój i depresja u mężczyzn",
    metaDescription: "Jak niedobór testosteronu wpływa na nastrój, motywację i zdrowie psychiczne mężczyzn? Związek między androgenami a depresją, drażliwością i pogorszeniem funkcji poznawczych.",
    date: "2025-08-02",
    readingTime: 6,
    excerpt: "Niedobór testosteronu to nie tylko zmęczenie i obniżone libido. Jego wpływ na psychikę bywa równie istotny — i często bywa mylony z depresją lub wypaleniem zawodowym.",
    content: [
      {
        heading: "Testosteron a mózg",
        paragraphs: [
          "Testosteron działa nie tylko na mięśnie, kości i funkcje seksualne. Receptory androgenowe znajdują się również w strukturach mózgu odpowiedzialnych za nastrój, motywację i funkcje poznawcze — m.in. w układzie limbicznym, hipokampie i korze przedczołowej.",
          "Badania obrazowe wykazały, że niedobór testosteronu wiąże się ze zmniejszoną aktywnością obszarów mózgu powiązanych z motywacją i nagrodą. To może częściowo wyjaśniać charakterystyczne dla hipogonadyzmu uczucie braku chęci do działania, apatii i zobojętnienia."
        ]
      },
      {
        heading: "Objawy psychiczne niedoboru testosteronu",
        paragraphs: [
          'Mężczyźni z potwierdzonym niedoborem testosteronu często zgłaszają: obniżony nastrój lub uczucie przygnębienia, drażliwość i zwiększoną reaktywność emocjonalną, trudności z koncentracją i pamięcią, zmniejszoną motywację, zainteresowania i zdolność do odczuwania przyjemności (anhedonia), a także ogólne poczucie, że "coś jest nie tak", mimo braku konkretnej przyczyny.',
          "Symptomy te mogą łatwo zostać zinterpretowane jako depresja, wypalenie zawodowe lub kryzys wieku średniego — co sprawia, że wielu mężczyzn przez lata nie otrzymuje właściwej diagnostyki hormonalnej."
        ]
      },
      {
        heading: "Czy TRT pomaga na depresję?",
        paragraphs: [
          "Odpowiedź jest niuansowana. U mężczyzn z potwierdzonym hipogonadyzmem i towarzyszącymi objawami psychicznymi, normalizacja testosteronu często przynosi wyraźną poprawę nastroju, energii i motywacji. Nie jest to jednak antydepresant i nie zastąpi leczenia psychiatrycznego w klinicznej depresji.",
          "Ważne: depresja i niedobór testosteronu mogą współistnieć i wzajemnie się nasilać. Dlatego przy objawach depresyjnych u mężczyzn warto przeprowadzić diagnostykę hormonalną — i traktować ją jako uzupełnienie, nie alternatywę, dla oceny psychiatrycznej."
        ]
      }
    ]
  },
  {
    slug: "stres-kortyzol-testosteron",
    title: "Jak stres obniża testosteron — kortyzol a androgeny",
    metaDescription: "Przewlekły stres przez kortyzol hamuje produkcję testosteronu. Dowiedz się, jaki jest mechanizm tego działania i co można zrobić, żeby go ograniczyć.",
    date: "2025-05-18",
    readingTime: 5,
    excerpt: "Kortyzol i testosteron to hormony, które wzajemnie się wykluczają. Przewlekły stres może istotnie obniżać poziom testosteronu — i to niezależnie od wieku czy stylu życia.",
    content: [
      {
        heading: "Mechanizm: kortyzol kontra testosteron",
        paragraphs: [
          "Kortyzol, zwany hormonem stresu, i testosteron są produkowane z tego samego prekursora — cholesterolu. W warunkach przewlekłego stresu oś HPA (podwzgórze-przysadka-nadnercza) jest stale aktywowana, co kieruje zasoby organizmu na produkcję kortyzolu kosztem produkcji androgenów.",
          "Kortyzol bezpośrednio hamuje oś HPG (podwzgórze-przysadka-gonady) odpowiedzialną za produkcję testosteronu — obniżając wydzielanie GnRH, LH i FSH. To tzw. stres-induced hypogonadism — zjawisko dobrze udokumentowane w literaturze medycznej."
        ]
      },
      {
        heading: "Przewlekły stres a wyniki badań",
        paragraphs: [
          "Mężczyźni w stanach przewlekłego stresu (przepracowanie, wypalenie zawodowe, chroniczny niedobór snu) mogą mieć wyniki badań wskazujące na niedobór testosteronu — nawet jeśli wcześniej były one prawidłowe. Co ważne, sam stres może być przyczyną niskiego wyniku, bez żadnej patologii jąder czy przysadki.",
          "To właśnie dlatego przy interpretacji wyników badań hormonalnych lekarz powinien uwzględnić kontekst życiowy pacjenta. Wynik wykonany w trakcie intensywnego okresu stresowego może nie odzwierciedlać faktycznego, stabilnego poziomu testosteronu."
        ]
      },
      {
        heading: "Co można zrobić?",
        paragraphs: [
          "Redukcja stresu ma bezpośrednie przełożenie na poziom androgenów. Skuteczne strategie obejmują: regularną aktywność fizyczną (umiarkowaną, nie wyczynową), odpowiednią ilość snu (7–9 godzin), techniki relaksacyjne (mindfulness, ćwiczenia oddechowe), ograniczenie alkoholu i kofeiny w nadmiarze oraz psychoterapię lub coaching przy wypaleniu zawodowym.",
          "Jeśli mimo redukcji stresu poziom testosteronu pozostaje niski przy obecnych objawach, warto przeprowadzić pełną diagnostykę hormonalną i omówić wyniki z lekarzem."
        ]
      }
    ]
  },
  {
    slug: "testosteron-a-sen",
    title: "Testosteron a jakość snu — nocna produkcja hormonów",
    metaDescription: "Testosteron produkowany jest głównie podczas snu. Dowiedz się, jak niedobór snu wpływa na poziom testosteronu i jakie objawy może powodować bezdech senny.",
    date: "2025-03-05",
    readingTime: 5,
    excerpt: "Większość dziennej puli testosteronu produkowana jest w nocy — podczas faz głębokiego snu. Przewlekły niedobór snu i zaburzenia snu mogą istotnie obniżyć poziom testosteronu nawet u młodych, zdrowych mężczyzn.",
    content: [
      {
        heading: "Nocna produkcja testosteronu",
        paragraphs: [
          "Testosteron wykazuje wyraźny rytm dobowy ściśle powiązany z cyklem snu. Szczyt produkcji przypada na fazy głębokiego snu (NREM) we wczesnych godzinach nocnych. Poranne stężenie testosteronu — będące podstawą diagnostyki laboratoryjnej — odzwierciedla właśnie efekt nocnej produkcji.",
          "Badanie opublikowane w JAMA wykazało, że u zdrowych młodych mężczyzn (wiek 24 lat) ograniczenie snu do 5 godzin przez tydzień obniżyło poziom testosteronu o 10–15% — co odpowiada procesowi starzenia o 10–15 lat. To wyraźny sygnał, że sen jest jednym z podstawowych filarów zdrowej gospodarki hormonalnej."
        ]
      },
      {
        heading: "Bezdech senny a testosteron",
        paragraphs: [
          "Obturacyjny bezdech senny (OBS) to zaburzenie, w którym drogi oddechowe zamykają się podczas snu, powodując przerwy w oddychaniu, mikroprzebudzenia i fragmentację snu. Jest szczególnie powszechny u mężczyzn z otyłością i po 40-tce.",
          "OBS istotnie zaburza architekturę snu, co bezpośrednio przekłada się na obniżenie poziomu testosteronu. Co ciekawe, zależność jest dwukierunkowa — niski testosteron sprzyja odkładaniu tkanki tłuszczowej (co nasila bezdech), a bezdech obniża testosteron (co nasila objawy niedoboru). U pacjentów z podejrzeniem bezdechu warto przeprowadzić badanie polisomnograficzne przed podjęciem decyzji o TRT."
        ]
      },
      {
        heading: "Praktyczne wnioski",
        paragraphs: [
          "Jeśli masz objawy niedoboru testosteronu i jednocześnie śpisz mało lub źle — priorytetem jest poprawa jakości snu. Często wystarczą zmiany higieniczne: stałe godziny snu, eliminacja ekranów przed snem, ciemna i chłodna sypialnia, ograniczenie alkoholu (który mimo że ułatwia zasypianie, fragmentuje sen głęboki).",
          "Wykonanie badań laboratoryjnych po kilku tygodniach dobrego snu może dać zupełnie inne wyniki niż te wykonane w szczycie zmęczenia. Lekarz uwzględni jakość snu jako jeden z kluczowych czynników przy interpretacji wyników hormonalnych."
        ]
      }
    ]
  },
  {
    slug: "przewlekle-zmeczenie-hormony-mezczyzna",
    title: "Przewlekłe zmęczenie u mężczyzn — kiedy sprawdzić hormony?",
    metaDescription: "Chroniczne zmęczenie i brak energii u mężczyzn po 35-tce mogą mieć wiele przyczyn. Dowiedz się, kiedy warto sprawdzić poziom testosteronu i innych hormonów.",
    date: "2025-01-10",
    readingTime: 5,
    excerpt: "Zmęczenie to jeden z najczęstszych powodów wizyt u lekarza. U mężczyzn po 35-tce, gdy zmęczenie jest przewlekłe i nie ma wyraźnej przyczyny, warto sprawdzić gospodarkę hormonalną.",
    content: [
      {
        heading: 'Zmęczenie, które nie mija — kiedy to nie jest "tylko stres"?',
        paragraphs: [
          "Krótkotrwałe zmęczenie po intensywnym czasie, niedoborze snu czy trudnym projekcie jest normalne. Problem pojawia się, gdy zmęczenie jest przewlekłe — trwa tygodniami lub miesiącami, nie ustępuje po wypoczynku i wyraźnie obniża jakość codziennego funkcjonowania.",
          'Takie zmęczenie może mieć wiele przyczyn: anemię, niedobory witamin (B12, D, żelazo), niedoczynność tarczycy, depresję, bezdech senny, przewlekłe infekcje lub zaburzenia hormonalne, w tym niedobór testosteronu. Dlatego "samo przejdzie" to rzadko właściwa strategia.'
        ]
      },
      {
        heading: "Jak hormony wpływają na energię?",
        paragraphs: [
          "Testosteron ma bezpośredni wpływ na metabolizm energetyczny, produkcję czerwonych krwinek, nastrój i motywację. Jego niedobór często objawia się właśnie przewlekłym zmęczeniem i brakiem chęci do działania — nawet u mężczyzn, którzy wcześniej byli aktywni i pełni energii.",
          "Hormony tarczycy (T3 i T4) regulują tempo metabolizmu. Niedoczynność tarczycy — stosunkowo powszechna, często nierozpoznana — może powodować silne zmęczenie, przyrost masy ciała, wypadanie włosów i uczucie zimna. Hormony tarczycy i testosteron wzajemnie na siebie wpływają, dlatego zaburzenie jednej osi hormonalnej może wtórnie zaburzać inną."
        ]
      },
      {
        heading: "Inne możliwe przyczyny, których nie warto pomijać",
        paragraphs: [
          "Przed skupieniem się wyłącznie na testosteronie warto wykluczyć inne powszechne przyczyny: niedobór witaminy D (bardzo częsty, szczególnie w Polsce w miesiącach zimowych), niedobór witaminy B12 lub żelaza, niedoczynność tarczycy (TSH), zespół bezdechu sennego (szczególnie przy otyłości lub głośnym chrapaniu), depresja lub stany lękowe.",
          "Dobry lekarz nie zawęża diagnostyki od razu do hormonów płciowych — spojrzy na całość i zdecyduje, jakie badania mają sens w konkretnym przypadku."
        ]
      },
      {
        heading: "Kiedy warto umówić się na konsultację?",
        paragraphs: [
          "Warto rozważyć wizytę, gdy zmęczenie trwa ponad 4–6 tygodni bez wyraźnej przyczyny, towarzyszy mu gorsza koncentracja, obniżone libido lub pogorszenie nastroju, masz ponad 35 lat i zauważasz stopniowe obniżanie się wydolności i energii.",
          "Konsultacja zdalna pozwala omówić objawy i ustalić plan diagnostyczny bez wychodzenia z domu. Na podstawie wywiadu lekarz zadecyduje, jakie badania przeprowadzić w pierwszej kolejności."
        ]
      }
    ]
  },
  {
    slug: "niskie-libido-mezczyzna-testosteron",
    title: "Niskie libido u mężczyzn — kiedy winny jest testosteron?",
    metaDescription: "Obniżone libido u mężczyzn może mieć wiele przyczyn. Dowiedz się, kiedy warto sprawdzić testosteron, jakie badania wykonać i jak wygląda diagnostyka.",
    date: "2024-12-15",
    readingTime: 5,
    excerpt: "Obniżone libido to temat, o którym mężczyźni rzadko mówią głośno — a problem dotyczy znacznie więcej osób niż mogłoby się wydawać. Czasem przyczyną są hormony, ale nie zawsze.",
    content: [
      {
        heading: "Jak powszechny jest problem?",
        paragraphs: [
          'Szacunki wskazują, że obniżone libido dotyczy 15–25% dorosłych mężczyzn, a częstość rośnie z wiekiem. Mimo to jest to temat, z którym pacjenci rzadko trafiają do lekarza — często z powodu wstydu lub przekonania, że "tak po prostu jest".',
          "Warto wiedzieć, że obniżone libido to objaw, a nie diagnoza. Oznacza, że coś w organizmie lub psychice nie działa optymalnie — i zazwyczaj da się to zmienić."
        ]
      },
      {
        heading: "Możliwe przyczyny obniżonego libido",
        paragraphs: [
          "Przyczyny mogą być bardzo zróżnicowane i często nakładają się na siebie. Hormonalne: niedobór testosteronu (najczęstszy hormonalny powód), zbyt wysoki poziom prolaktyny, zaburzenia tarczycy, podwyższony poziom estradiolu. Psychologiczne: przewlekły stres, przepracowanie, depresja lub stany lękowe, konflikty w związku, niedobór snu. Lekowe: wiele leków (antydepresanty SSRI, beta-blokery, leki na nadciśnienie) może obniżać libido jako efekt uboczny.",
          "Przed podjęciem diagnostyki hormonalnej warto zastanowić się, czy obniżenie libido koreluje z innymi zmianami w życiu (nowa praca, stres, zmiana leków) lub pojawiło się stopniowo i bez wyraźnej przyczyny."
        ]
      },
      {
        heading: "Kiedy testosteron może być przyczyną?",
        paragraphs: [
          "Testosteron ma istotny wpływ na libido u mężczyzn. Hormonalna przyczyna jest bardziej prawdopodobna, gdy obniżeniu libido towarzyszą inne objawy (zmęczenie, gorsze samopoczucie, zmiany w sylwetce), problem narasta stopniowo i nie jest wyraźnie związany z czynnikami psychospołecznymi, a mężczyzna ma ponad 35–40 lat.",
          "Diagnostyka hormonalna jest stosunkowo prosta i nieinwazyjna — wymaga pobrania krwi rano. To dobry punkt wyjścia do zrozumienia, co się dzieje z organizmem."
        ]
      },
      {
        heading: "Jak wygląda diagnostyka?",
        paragraphs: [
          "Pierwszym krokiem jest konsultacja lekarska — lekarz przeprowadzi wywiad i zdecyduje, jakie badania są wskazane. Standardowo zlecany jest panel hormonalny: testosteron całkowity i wolny, SHBG, LH, FSH, estradiol, prolaktyna.",
          "Na podstawie wyników i obrazu klinicznego lekarz oceni, czy przyczyna jest hormonalna i czy istnieje wskazanie do leczenia. Jeśli testosteron jest prawidłowy, dalsze poszukiwanie przyczyny może obejmować inne aspekty — psychologiczne, kardiologiczne lub naczyniowe."
        ]
      }
    ]
  },
  {
    slug: "trt-co-to-jest",
    title: "Terapia zastępcza testosteronem (TRT) — co to jest i dla kogo jest wskazana?",
    metaDescription: "Czym jest terapia zastępcza testosteronem (TRT), komu może być pomocna, jak przebiega leczenie i jak wygląda monitorowanie? Kompleksowe wyjaśnienie.",
    date: "2024-12-05",
    readingTime: 8,
    excerpt: "TRT to metoda leczenia potwierdzonego niedoboru testosteronu, nie suplement dla sportowców. Dowiedz się, kto może skorzystać, jak przebiega leczenie i co powinno Cię zainteresować przed podjęciem decyzji.",
    content: [
      {
        heading: "Czym jest TRT?",
        paragraphs: [
          "Terapia zastępcza testosteronem (TRT, ang. Testosterone Replacement Therapy) to leczenie farmakologiczne stosowane u mężczyzn z potwierdzonym klinicznie i laboratoryjnie niedoborem testosteronu. Jej celem jest przywrócenie poziomu testosteronu do wartości fizjologicznych — nie wywindowanie go ponad normę.",
          "TRT jest leczeniem medycznym, przepisywanym i nadzorowanym przez lekarza. To nie jest suplementacja stosowana przez zdrowych mężczyzn w celach poprawy sylwetki czy zwiększenia siły — taki cel różni się od medycznie wskazanej TRT i wymaga oddzielnej rozmowy."
        ]
      },
      {
        heading: "Wskazania do TRT — kiedy leczenie jest rozważane?",
        paragraphs: [
          "Warunkiem rozważenia TRT jest obecność dwóch elementów jednocześnie: objawów klinicznych sugerujących niedobór testosteronu (zmęczenie, obniżone libido, gorsze samopoczucie psychiczne, zmiany w składzie ciała) oraz potwierdzenia laboratoryjnego — niskiego poziomu testosteronu w co najmniej dwóch porannych badaniach krwi.",
          "Sam niski wynik bez objawów, ani same objawy bez niskiego wyniku — nie są standardowym wskazaniem do TRT. Decyzja o leczeniu zawsze wymaga indywidualnej oceny lekarskiej i wykluczenia innych przyczyn dolegliwości."
        ]
      },
      {
        heading: "Formy podawania testosteronu",
        paragraphs: [
          "Testosteron można podawać na kilka sposobów, a wybór zależy od indywidualnych preferencji pacjenta, stylu życia i wskazań klinicznych: żele lub maści stosowane codziennie na skórę (wchłanianie przezskórne), iniekcje domięśniowe lub podskórne.",
          "Każda forma ma swoje zalety i ograniczenia. Lekarz pomoże dobrać metodę najlepiej pasującą do Twojej sytuacji i trybu życia."
        ]
      },
      {
        heading: "Jak przebiega leczenie?",
        paragraphs: [
          "Leczenie TRT nie zaczyna się od razu po pierwszej wizycie. Standardowy proces wygląda następująco: pierwsza konsultacja (wywiad, omówienie objawów, ewentualne zlecenie badań), omówienie wyników i podjęcie decyzji o kwalifikacji, dobór metody i formy leczenia, a następnie regularne wizyty kontrolne z badaniami laboratoryjnymi.",
          "Efekty terapii są stopniowe. Poprawa samopoczucia, libido czy poziomu energii może być odczuwalna po kilku tygodniach do kilku miesięcy. Zmiany w składzie ciała pojawiają się zazwyczaj po 3–6 miesiącach regularnego leczenia."
        ]
      },
      {
        heading: "Monitorowanie i bezpieczeństwo",
        paragraphs: [
          "Leczenie TRT wymaga regularnego monitorowania. Wizyty kontrolne z badaniami obejmują zazwyczaj: poziom testosteronu, hematokryt i morfologię krwi (testosteron stymuluje produkcję czerwonych krwinek), PSA (u pacjentów powyżej 40–45 lat), profil lipidowy i inne parametry zależnie od indywidualnej sytuacji.",
          "Prawidłowo prowadzona TRT przy odpowiednich wskazaniach i regularnym monitorowaniu jest uznawana za bezpieczne leczenie. Jak każda terapia, wiąże się jednak z możliwymi działaniami niepożądanymi, które lekarz omówi indywidualnie przed rozpoczęciem leczenia."
        ]
      },
      {
        heading: "TRT a płodność",
        paragraphs: [
          "Ważna informacja dla mężczyzn planujących ojcostwo: TRT hamuje własną produkcję testosteronu i spermatogenezę. Stosowanie TRT może prowadzić do przejściowego lub długotrwałego zmniejszenia płodności. Jeśli planujesz mieć dzieci, koniecznie poinformuj o tym lekarza przed rozpoczęciem leczenia — istnieją alternatywne metody, które nie mają tego efektu."
        ]
      }
    ]
  },
  {
    slug: "jak-zbadac-poziom-testosteronu",
    title: "Jak zbadać poziom testosteronu? Panel hormonalny — badania, normy i interpretacja",
    metaDescription: "Kompletny przewodnik po badaniach poziomu testosteronu: które parametry sprawdzić, kiedy pobrać krew, jak czytać wyniki i co oznaczają odchylenia od normy.",
    date: "2024-11-28",
    readingTime: 7,
    excerpt: 'Wykonanie badania "testosteron" to dopiero początek. Żeby rzetelnie ocenić gospodarkę hormonalną mężczyzny, potrzebny jest szerszy panel badań. Dowiedz się, co powinien obejmować i jak go prawidłowo zinterpretować.',
    content: [
      {
        heading: 'Dlaczego samo "testosteron całkowity" to za mało?',
        paragraphs: [
          "Testosteron całkowity to najczęściej zlecany parametr, ale daje niepełny obraz. Około 44–65% testosteronu we krwi jest trwale związane z SHBG (globuliną wiążącą hormony płciowe) i biologicznie nieaktywne. Dodatkowe 30–54% jest luźno związane z albuminą. Tylko 1–3% testosteronu krąży w formie wolnej i jest bezpośrednio aktywne biologicznie.",
          'Oznacza to, że mężczyzna z "normalnym" testosteronem całkowitym może mieć niedobór testosteronu wolnego — i odwrotnie. Pełna ocena wymaga uwzględnienia SHBG i ewentualnie wyliczenia lub bezpośredniego pomiaru testosteronu wolnego.'
        ]
      },
      {
        heading: "Rekomendowany panel hormonalny",
        paragraphs: [
          "Podstawowe badania przy podejrzeniu niedoboru testosteronu obejmują: testosteron całkowity (T total) — kluczowy parametr wyjściowy; SHBG — niezbędne do interpretacji poziomu testosteronu wolnego; LH i FSH — pozwalają ocenić, czy problem leży w jądrach (hipogonadyzm pierwotny) czy w przysadce (hipogonadyzm wtórny); estradiol (E2) — nadmiar może nasilać objawy niedoboru T; prolaktyna — wysoki poziom hamuje produkcję testosteronu.",
          "Uzupełniająco mogą być zlecone: morfologia krwi (hematokryt), PSA (u mężczyzn powyżej 40–45 r.ż.), profil lipidowy, TSH (tarczyca) oraz glukoza na czczo. Pełny zakres badań lekarz ustala indywidualnie na podstawie wywiadu."
        ]
      },
      {
        heading: "Kiedy i jak pobrać krew?",
        paragraphs: [
          "Pora pobrania ma kluczowe znaczenie. Testosteron wykazuje wyraźny rytm dobowy — jego poziom jest najwyższy między 7:00 a 10:00 rano i stopniowo spada przez resztę dnia. Badanie wykonane po południu może dać wynik nawet 20–30% niższy niż poranne.",
          "Praktyczne zalecenia: pobierz krew między 7:00 a 11:00, na czczo lub po lekkim śniadaniu (bez tłustych posiłków), unikaj intensywnego wysiłku fizycznego poprzedniego dnia i alkoholu przez 24–48 godzin. Jeśli wynik jest graniczny, lekarz może zalecić powtórzenie badania."
        ]
      },
      {
        heading: "Normy i jak je interpretować",
        paragraphs: [
          "Normy laboratoryjne dla testosteronu całkowitego u dorosłych mężczyzn zazwyczaj wynoszą 8–35 nmol/L (230–1000 ng/dL), ale zakresy referencyjne mogą różnić się między laboratoriami. Wiele towarzystw medycznych wskazuje, że objawy niedoboru mogą pojawić się już przy wartościach poniżej 12 nmol/L, nawet jeśli formalnie mieszczą się w normie.",
          'Wynik "w normie" nie wyklucza objawowego niedoboru testosteronu, a wynik "poniżej normy" nie automatycznie oznacza konieczności leczenia. Interpretacja zawsze wymaga klinicznego kontekstu.'
        ]
      }
    ]
  },
  {
    slug: "objawy-niskiego-testosteronu-po-40",
    title: "Objawy niskiego testosteronu u mężczyzn po 40-tce — kiedy warto się zbadać?",
    metaDescription: "Dowiedz się, jakie objawy mogą świadczyć o niedoborze testosteronu u mężczyzn po 40-ce i kiedy warto wykonać podstawowy panel hormonalny.",
    date: "2024-11-15",
    readingTime: 6,
    excerpt: "Po czterdziestce wiele mężczyzn zauważa stopniowe zmiany — mniejszą energię, gorszy sen, spadek motywacji. Część z tych objawów może być związana z naturalnym obniżaniem się poziomu testosteronu.",
    content: [
      {
        heading: "Dlaczego testosteron spada po 40-tce?",
        paragraphs: [
          "Poziom testosteronu u mężczyzn osiąga szczyt około 25–30 roku życia, a następnie zaczyna stopniowo maleć — szacunkowo o 1–2% rocznie po 35-tce. To naturalne zjawisko fizjologiczne, określane jako andropauza lub ADAM (Androgen Deficiency in the Aging Male). Nie dotyczy jednak wszystkich mężczyzn w jednakowym stopniu.",
          "Istotną rolę odgrywają też czynniki stylu życia: przewlekły stres, niedobór snu, nadwaga (zwłaszcza otyłość brzuszna), brak aktywności fizycznej oraz niektóre schorzenia przewlekłe. W związku z tym objawy niedoboru testosteronu mogą pojawić się znacznie wcześniej niż wynikałoby to tylko z wieku."
        ]
      },
      {
        heading: "Charakterystyczne objawy niedoboru testosteronu",
        paragraphs: [
          "Objawy niedoboru testosteronu bywają niespecyficzne — mogą imitować wiele innych stanów. Najczęściej zgłaszane przez pacjentów dolegliwości to przewlekłe zmęczenie i brak energii, obniżone libido, gorsze samopoczucie psychiczne, zmiany w składzie ciała (wzrost tkanki tłuszczowej, utrata masy mięśniowej) oraz zaburzenia snu.",
          "Ważne: żaden z tych objawów nie jest specyficzny wyłącznie dla niedoboru testosteronu. Mogą być wywołane przez stres, depresję, choroby tarczycy lub inne stany zdrowotne. Dlatego samodzielne diagnozowanie na podstawie objawów jest niewystarczające — konieczna jest diagnostyka laboratoryjna."
        ]
      },
      {
        heading: "Jakie badania wykonać na pierwszym kroku?",
        paragraphs: [
          "Przed wizytą lekarską lub w jej trakcie zazwyczaj zlecany jest podstawowy panel hormonalny, obejmujący: testosteron całkowity (T), SHBG, LH i FSH, estradiol (E2) oraz prolaktyna. Krew do badań hormonalnych należy pobierać rano (między 7:00 a 11:00), na czczo lub po lekkim śniadaniu.",
          "Interpretacja wyników powinna zawsze odbywać się w kontekście objawów i przy udziale lekarza. Sam wynik w normie laboratoryjnej nie wyklucza objawowego niedoboru testosteronu — normy są szerokie i mogą nie odzwierciedlać optymalnego poziomu dla konkretnego pacjenta."
        ]
      }
    ]
  },
  {
    slug: "testosteron-sklad-ciala",
    title: "Testosteron a skład ciała — tkanka tłuszczowa, masa mięśniowa i metabolizm",
    metaDescription: "Jak testosteron wpływa na skład ciała mężczyzny? Związek między androgenami a tkanką tłuszczową, masą mięśniową i insulinoopornością.",
    date: "2024-08-22",
    readingTime: 6,
    excerpt: "Testosteron ma kluczowy wpływ na skład ciała mężczyzny. Jego niedobór sprzyja odkładaniu tłuszczu trzewnego i utracie masy mięśniowej — co z kolei nasila niedobór, tworząc błędne koło.",
    content: [
      {
        heading: "Testosteron a tkanka tłuszczowa",
        paragraphs: [
          "Testosteron hamuje lipolizę (odkładanie tłuszczu) i stymuluje jego spalanie. Jego niedobór sprzyja odkładaniu tkanki tłuszczowej — szczególnie trzewnej (brzusznej), która jest metabolicznie aktywna i produkuje estrogeny, co dodatkowo obniża testosteron. To mechanizm błędnego koła.",
          "Otyłość trzewna jest jednym z najsilniejszych predyktorów niskiego testosteronu u mężczyzn. Badania pokazują, że każde 10 kg nadmasy ciała wiąże się z obniżeniem testosteronu o ok. 10%. Dlatego redukcja masy ciała często prowadzi do samoistnej normalizacji poziomu testosteronu — bez konieczności farmakoterapii."
        ]
      },
      {
        heading: "Testosteron a masa mięśniowa",
        paragraphs: [
          "Testosteron jest jednym z głównych anabolicznych hormonów w organizmie mężczyzny. Stymuluje syntezę białek mięśniowych, sprzyja regeneracji po wysiłku i wspiera hipertrofię mięśniową. Jego niedobór objawia się stopniową utratą masy i siły mięśniowej — nawet u mężczyzn regularnie trenujących.",
          "Mężczyźni z hipogonadyzmem często skarżą się na brak efektów treningowych mimo regularnych ćwiczeń i odpowiedniej diety. To typowy sygnał, że warto sprawdzić poziom androgenów."
        ]
      },
      {
        heading: "Testosteron a insulinooporność",
        paragraphs: [
          "Niski testosteron i insulinooporność są silnie powiązane. Testosteron poprawia wrażliwość tkanek na insulinę i metabolizm glukozy. Jego niedobór sprzyja rozwojowi insulinooporności i cukrzycy typu 2 — a te z kolei dalej obniżają testosteron.",
          "U mężczyzn z otyłością, insulinoopornością lub cukrzycą typu 2 badanie poziomu testosteronu powinno być standardową częścią oceny metabolicznej. Leczenie niedoboru testosteronu może istotnie poprawiać parametry metaboliczne."
        ]
      }
    ]
  },
  {
    slug: "hipogonadyzm-u-mezczyzn",
    title: "Hipogonadyzm u mężczyzn — czym jest i jak się objawia?",
    metaDescription: "Hipogonadyzm to stan niedoboru testosteronu z powodu zaburzeń na poziomie jąder lub przysadki. Dowiedz się, czym różni się hipogonadyzm pierwotny od wtórnego i jak go diagnozować.",
    date: "2024-05-10",
    readingTime: 6,
    excerpt: "Hipogonadyzm to medyczna nazwa niedoboru testosteronu. Może mieć różne przyczyny i różne oblicza — a prawidłowe rozróżnienie między jego typami jest kluczowe dla doboru odpowiedniego leczenia.",
    content: [
      {
        heading: "Czym jest hipogonadyzm?",
        paragraphs: [
          "Hipogonadyzm to stan, w którym gonady (jądra u mężczyzn) produkują niewystarczającą ilość testosteronu i/lub spermy. W zależności od miejsca, w którym doszło do zaburzenia, wyróżniamy hipogonadyzm pierwotny i wtórny.",
          'Hipogonadyzm pierwotny (hipergonadotropowy) — zaburzenie leży w samych jądrach. Przysadka "widzi" niski testosteron i reaguje wzrostem LH i FSH, ale jądra nie odpowiadają odpowiednio na ten sygnał. Przyczyny: wrodzone (np. zespół Klinefeltera), nabyte (uraz, infekcja, chemioterapia, napromienianie).'
        ]
      },
      {
        heading: "Hipogonadyzm wtórny (hipogonadotropowy)",
        paragraphs: [
          "W hipogonadyzmie wtórnym problem leży w przysadce lub podwzgórzu — strukturach mózgu regulujących produkcję testosteronu. LH i FSH są niskie lub prawidłowe mimo niskiego testosteronu. Przyczyny: guzy lub urazy przysadki, hiperprolaktynemia, stosowanie steroidów anabolicznych lub opioidów, otyłość, przewlekłe choroby ogólnoustrojowe.",
          "Rozróżnienie między typem pierwotnym a wtórnym jest kliniczne istotne — inne są przyczyny, inne postępowanie diagnostyczne i inne opcje terapeutyczne. Dlatego sam wynik testosteronu nie wystarczy — konieczne są LH i FSH."
        ]
      },
      {
        heading: "Hipogonadyzm późnego początku (LOH)",
        paragraphs: [
          "Osobną kategorią jest hipogonadyzm późnego początku (Late-Onset Hypogonadism, LOH) — nabyty niedobór testosteronu związany z wiekiem, otyłością i chorobami przewlekłymi. To najczęstszy rodzaj hipogonadyzmu u mężczyzn po 40-tce. Nie jest chorobą samą w sobie, lecz zespołem objawów wynikającym z kumulacji wielu czynników.",
          "Diagnostyka LOH wymaga zarówno wyników laboratoryjnych (testosteron, LH, FSH), jak i oceny objawów klinicznych. Sama liczba na wyniku nie przesądza o wskazaniach do leczenia."
        ]
      }
    ]
  },
  {
    slug: "trt-a-plodnosc",
    title: "Testosteron a płodność — czy TRT wyklucza możliwość ojcostwa?",
    metaDescription: "TRT hamuje własną produkcję testosteronu i spermatogenezę. Dowiedz się, jak TRT wpływa na płodność i jakie są opcje dla mężczyzn planujących ojcostwo.",
    date: "2024-02-14",
    readingTime: 5,
    excerpt: "Jednym z najczęstszych pytań pacjentów rozważających TRT jest wpływ terapii na płodność. To ważny temat, który koniecznie należy omówić z lekarzem przed podjęciem decyzji o leczeniu.",
    content: [
      {
        heading: "Jak TRT wpływa na produkcję nasienia?",
        paragraphs: [
          "Testosteron podawany z zewnątrz (egzogenny) hamuje oś HPG — podwzgórze przestaje wydzielać GnRH, a przysadka obniża produkcję LH i FSH. Ponieważ to właśnie LH stymuluje komórki Leydiga do produkcji testosteronu wewnątrzjądrowego (niezbędnego do spermatogenezy), a FSH stymuluje bezpośrednio dojrzewanie plemników — efektem jest znaczące obniżenie lub zahamowanie produkcji nasienia.",
          "Badania pokazują, że u większości mężczyzn stosujących TRT dochodzi do oligospermii (znacznego zmniejszenia liczby plemników) lub azoospermii (całkowitego braku plemników w nasieniu) w ciągu kilku miesięcy od rozpoczęcia terapii."
        ]
      },
      {
        heading: "Czy ten efekt jest odwracalny?",
        paragraphs: [
          "U większości mężczyzn spermatogeneza powraca po odstawieniu TRT — ale może to zająć od kilku miesięcy do nawet 2 lat, a powrót nie jest gwarantowany. Czynniki wpływające na szanse powrotu to: wiek pacjenta, czas stosowania TRT, wyjściowa funkcja jąder i inne czynniki indywidualne.",
          "Jeśli planowanie ojcostwa jest w horyzoncie czasowym, warto rozważyć zabezpieczenie nasienia (kriokonserwację) przed rozpoczęciem TRT lub alternatywne metody leczenia niedoboru testosteronu, które nie hamują spermatogenezy."
        ]
      },
      {
        heading: "Alternatywy dla mężczyzn planujących ojcostwo",
        paragraphs: [
          "Dla mężczyzn z hipogonadyzmem wtórnym planujących ojcostwo istnieje alternatywa — gonadotropiny (hCG, FSH) lub selektywne modulatory receptora estrogenowego (klomifen). Te leki stymulują własną produkcję testosteronu i nie hamują spermatogenezy.",
          "Decyzja o wyborze metody powinna być podjęta wspólnie z lekarzem po dokładnym omówieniu planów prokreacyjnych, wyników badań i rodzaju hipogonadyzmu."
        ]
      }
    ]
  },
  {
    slug: "hormony-a-wypadanie-wlosow",
    title: "Hormony a wypadanie włosów u mężczyzn — czy testosteron łysi?",
    metaDescription: "Wypadanie włosów u mężczyzn jest związane z DHT, pochodną testosteronu. Dowiedz się, jak hormony wpływają na łysienie androgenowe i co można zrobić.",
    date: "2023-11-03",
    readingTime: 5,
    excerpt: "Łysienie androgenowe to najczęstszy typ wypadania włosów u mężczyzn. Wbrew powszechnemu przekonaniu, to nie sam testosteron jest odpowiedzialny — a DHT, jego aktywna pochodna.",
    content: [
      {
        heading: "DHT — główny sprawca łysienia androgenowego",
        paragraphs: [
          "Dihydrotestosteron (DHT) to metabolit testosteronu powstający pod wpływem enzymu 5-alfa-reduktazy. DHT wiąże się z receptorami androgenowymi w mieszkach włosowych ze znacznie większym powinowactwem niż testosteron — i u genetycznie predysponowanych mężczyzn powoduje ich miniaturyzację, co prowadzi do stopniowego wypadania włosów.",
          'Kluczowe słowo to "genetycznie predysponowanych" — nie każdy mężczyzna z wysokim DHT łysieje. Łysienie androgenowe wymaga zarówno obecności DHT, jak i dziedzicznej wrażliwości mieszków włosowych na jego działanie.'
        ]
      },
      {
        heading: "Czy TRT nasila łysienie?",
        paragraphs: [
          "U mężczyzn z genetyczną predyspozycją do łysienia androgenowego, TRT może przyspieszyć ten proces — poprzez zwiększenie dostępności androgenów, w tym substratów do konwersji do DHT. Nie jest to efekt pewny ani nieuchronny, ale warto być tego świadomym.",
          "Jeśli masz wyraźną historię rodzinną łysienia i obawiasz się tego efektu, warto omówić to z lekarzem przed rozpoczęciem TRT. Dostępne są opcje minimalizujące konwersję do DHT."
        ]
      },
      {
        heading: "Inne hormonalne przyczyny wypadania włosów",
        paragraphs: [
          "Nie tylko androgeny wpływają na włosy. Niedoczynność tarczycy jest klasyczną przyczyną uogólnionego wypadania włosów (telogen effluvium) — zazwyczaj rozlanego, nie w typowym wzorze łysienia androgenowego. Badanie TSH jest standardowym elementem diagnostyki przy wypadaniu włosów.",
          "Niedobór żelaza, cynku, witaminy D i biotyny też może powodować wypadanie włosów. Diagnostyka powinna być kompleksowa, bo przyczyny często nakładają się."
        ]
      }
    ]
  },
  {
    slug: "cwiczenia-a-testosteron",
    title: "Aktywność fizyczna a testosteron — jakie ćwiczenia wspierają gospodarkę hormonalną?",
    metaDescription: "Regularna aktywność fizyczna może naturalnie podnieść poziom testosteronu. Dowiedz się, które ćwiczenia są najbardziej efektywne i jak unikać przetrenowania.",
    date: "2023-07-19",
    readingTime: 5,
    excerpt: "Ćwiczenia to jeden z najsilniejszych naturalnych stymulatorów testosteronu. Ale nie każdy trening działa tak samo — a przetrenowanie może efekt odwrócić.",
    content: [
      {
        heading: "Dlaczego ćwiczenia podnoszą testosteron?",
        paragraphs: [
          "Aktywność fizyczna — szczególnie ćwiczenia siłowe i interwałowe — stymuluje wydzielanie LH i bezpośrednio pobudza komórki Leydiga do produkcji testosteronu. Efekt jest natychmiastowy (wzrost testosteronu po treningu) i długoterminowy (wyższy baseline u osób regularnie ćwiczących).",
          "Mechanizmy są wielokierunkowe: redukcja tkanki tłuszczowej trzewnej (która aromatyzuje testosteron do estrogenów), poprawa wrażliwości na insulinę, redukcja kortyzolu przy umiarkowanej intensywności, wzrost masy mięśniowej."
        ]
      },
      {
        heading: "Które ćwiczenia są najskuteczniejsze?",
        paragraphs: [
          "Trening siłowy z dużymi ciężarami angażujący duże grupy mięśniowe (przysiady, martwy ciąg, wyciskanie) daje największy krótkoterminowy wzrost testosteronu. Trening interwałowy wysokiej intensywności (HIIT) jest równie skuteczny w krótszym czasie. Sporty wytrzymałościowe (długodystansowe bieganie, kolarstwo) mogą przy nadmiarze obniżać testosteron.",
          "Kluczowa jest regularność i umiarkowanie. Optymalny schemat to 3–5 sesji tygodniowo z odpowiednią regeneracją. Zbyt intensywny trening bez regeneracji (przetrenowanie) podnosi kortyzol i obniża testosteron."
        ]
      },
      {
        heading: "Aktywność jako uzupełnienie, nie zamiennik diagnostyki",
        paragraphs: [
          "Regularna aktywność fizyczna, zdrowa dieta i dobry sen mogą naturalnie podnosić testosteron — ale mają swoje limity. Przy potwierdzonym hipogonadyzmie zmiany stylu życia zazwyczaj nie są wystarczające i wymagają uzupełnienia leczeniem medycznym.",
          "Jeśli mimo regularnych ćwiczeń i zdrowego trybu życia odczuwasz objawy niedoboru testosteronu, warto wykonać badania i skonsultować się z lekarzem."
        ]
      }
    ]
  },
  {
    slug: "testosteron-a-insulinoopornosc",
    title: "Testosteron a insulinooporność i cukrzyca typu 2 u mężczyzn",
    metaDescription: "Niedobór testosteronu i insulinooporność są silnie powiązane. Dowiedz się, jak hormony androgenowe wpływają na metabolizm glukozy i ryzyko cukrzycy.",
    date: "2023-03-08",
    readingTime: 6,
    excerpt: "Mężczyźni z cukrzycą typu 2 mają istotnie częściej niedobór testosteronu niż populacja ogólna — i odwrotnie. Ten związek jest dwukierunkowy i ma ważne implikacje kliniczne.",
    content: [
      {
        heading: "Związek między testosteronem a insulinoopornością",
        paragraphs: [
          "Testosteron poprawia wrażliwość tkanek na insulinę poprzez kilka mechanizmów: zwiększa wychwyt glukozy przez mięśnie, redukuje tkankę tłuszczową trzewną (która wydziela cytokiny prozapalne nasilające insulinooporność), poprawia funkcję komórek beta trzustki.",
          "Dlatego mężczyźni z niskim testosteronem mają statystycznie wyższe ryzyko insulinooporności i cukrzycy typu 2. Zależność jest też odwrotna: otyłość i insulinooporność obniżają testosteron poprzez wzrost aromatyzacji, przewlekły stan zapalny i zaburzenie osi HPG."
        ]
      },
      {
        heading: "Dane epidemiologiczne",
        paragraphs: [
          "Badania pokazują, że u mężczyzn z cukrzycą typu 2 niedobór testosteronu (definiowany jako testosteron poniżej 10–12 nmol/L) występuje u ok. 25–40% pacjentów — znacznie częściej niż w populacji ogólnej. Odwrotnie, mężczyźni z hipogonadyzmem mają 2–3-krotnie wyższe ryzyko rozwoju cukrzycy.",
          "Co ważne, normalizacja testosteronu w ramach TRT u mężczyzn z potwierdzonym hipogonadyzmem wiąże się z poprawą parametrów metabolicznych — obniżeniem glikemii na czczo, HbA1c, insuliny i zmniejszeniem tkanki tłuszczowej trzewnej."
        ]
      },
      {
        heading: "Praktyczne implikacje",
        paragraphs: [
          "U mężczyzn z cukrzycą typu 2, nadwagą/otyłością lub insulinoopornością badanie poziomu testosteronu powinno być rutynowe — szczególnie jeśli towarzyszą im objawy sugerujące niedobór androgenów.",
          "Leczenie niedoboru testosteronu w tej grupie może przynieść korzyści zarówno hormonalne, jak i metaboliczne. Oczywiście wymaga odpowiedniej kwalifikacji i regularnego monitorowania."
        ]
      }
    ]
  },
  {
    slug: "dieta-a-testosteron",
    title: "Dieta a testosteron — co jeść, żeby wspierać gospodarkę hormonalną?",
    metaDescription: "Dowiedz się, jak dieta wpływa na poziom testosteronu. Które składniki odżywcze są kluczowe dla produkcji androgenów i czego unikać.",
    date: "2022-12-01",
    readingTime: 6,
    excerpt: "Dieta nie zastąpi leczenia medycznego przy potwierdzonym hipogonadyzmie — ale może istotnie wspierać naturalną produkcję testosteronu i ogólną gospodarkę hormonalną.",
    content: [
      {
        heading: "Kluczowe składniki odżywcze dla produkcji testosteronu",
        paragraphs: [
          "Testosteron syntetyzowany jest z cholesterolu, dlatego diety bardzo niskotłuszczowe mogą niekorzystnie wpływać na jego produkcję. Zdrowe tłuszcze — jednonienasycone (oliwa z oliwek, awokado) i nasycone (w umiarkowanych ilościach) — są substratem dla steroidogenezy.",
          "Cynk jest kofaktorem enzymów biorących udział w syntezie testosteronu. Jego niedobór jest jedną z częstszych niedoborowych przyczyn niskiego testosteronu. Bogate źródła cynku to ostrygi, wołowina, nasiona dyni i rośliny strączkowe. Witamina D działa jak hormon i wpływa na receptory androgenowe. Niedobór witaminy D (bardzo powszechny w Polsce) jest powiązany z niższym testosteronem — suplementacja może przynieść korzyści."
        ]
      },
      {
        heading: "Czego unikać?",
        paragraphs: [
          "Nadmiar alkoholu obniża testosteron wielotorowo — hamuje syntezę w jądrach, nasila aromatyzację do estrogenów i obciąża wątrobę (która metabolizuje hormony). Przewlekłe, obfite spożycie alkoholu jest jednym z silniejszych czynników obniżających testosteron.",
          "Dieta wysokoprzetworzona, bogata w cukry proste i tłuszcze trans, sprzyja otyłości, insulinooporności i stanowi zapalnemu — wszystkie te czynniki pośrednio obniżają testosteron. Diety ekstremalnie niskokaloryczne (głodówki) powodują wtórne obniżenie testosteronu przez mechanizm ochrony energetycznej."
        ]
      },
      {
        heading: "Realistyczne oczekiwania",
        paragraphs: [
          "Wpływ diety na testosteron jest realny, ale ograniczony. Korekta niedoborów (cynku, witaminy D, magnezu) może poprawić poziom hormonów, ale u mężczyzn z potwierdzonym hipogonadyzmem sama zmiana diety nie zastąpi leczenia medycznego.",
          "Dobra dieta, aktywność fizyczna i odpowiedni sen tworzą fundament zdrowej gospodarki hormonalnej — i są ważnym uzupełnieniem diagnostyki oraz ewentualnego leczenia farmakologicznego."
        ]
      }
    ]
  },
  {
    slug: "testosteron-a-tarczyca",
    title: "Testosteron a tarczyca — jak te hormony wzajemnie na siebie wpływają?",
    metaDescription: "Oś androgenów i oś tarczycowa są ze sobą powiązane. Dowiedz się, jak niedoczynność i nadczynność tarczycy wpływają na testosteron i dlaczego oba układy warto oceniać łącznie.",
    date: "2022-09-15",
    readingTime: 5,
    excerpt: "Mężczyźni z zaburzeniami tarczycy często mają jednocześnie zaburzenia hormonów płciowych — i odwrotnie. Zrozumienie tej zależności jest ważne dla prawidłowej diagnostyki.",
    content: [
      {
        heading: "Jak tarczyca wpływa na testosteron?",
        paragraphs: [
          "Hormony tarczycy (T3 i T4) wpływają na produkcję testosteronu na kilku poziomach. Bezpośrednio stymulują komórki Leydiga w jądrach. Regulują produkcję SHBG w wątrobie — nadczynność tarczycy zwiększa SHBG (co obniża wolny testosteron), niedoczynność może ją obniżać.",
          "Niedoczynność tarczycy, poprzez spowolnienie metabolizmu i wzrost masy ciała, pośrednio nasila aromatyzację testosteronu do estrogenów. Efektem może być względny niedobór androgenów przy prawidłowym testosteronie całkowitym."
        ]
      },
      {
        heading: "Objawy nakładające się — jak je rozróżnić?",
        paragraphs: [
          "Niedoczynność tarczycy i niedobór testosteronu mają wiele wspólnych objawów: zmęczenie, przyrost masy ciała, obniżony nastrój, pogorszenie pamięci i koncentracji, wypadanie włosów. To sprawia, że bez badań laboratoryjnych trudno je od siebie odróżnić.",
          "W praktyce oznacza to, że diagnostyka przy objawach ogólnego pogorszenia samopoczucia powinna obejmować zarówno TSH (tarczyca), jak i panel hormonalny (testosteron, SHBG, LH, FSH). Skupienie się wyłącznie na jednej osi może prowadzić do przeoczenia współistniejącego problemu."
        ]
      },
      {
        heading: "Jak leczyć, gdy oba problemy współistnieją?",
        paragraphs: [
          "Gdy stwierdzone są równocześnie niedoczynność tarczycy i niedobór testosteronu, zazwyczaj zaleca się najpierw wyrównanie funkcji tarczycy i obserwację przez kilka miesięcy. Normalizacja TSH często poprawia też poziom testosteronu — bo usuwa jeden z czynników go obniżających.",
          "Jeśli mimo prawidłowego TSH testosteron nadal pozostaje niski przy objawach — wtedy rozważa się dalszą diagnostykę i ewentualne leczenie niedoboru androgenów."
        ]
      }
    ]
  },
  {
    slug: "hipogonadyzm-pierwotny-wtorny-roznice",
    title: "Hipogonadyzm pierwotny i wtórny — na czym polegają różnice?",
    metaDescription: "Hipogonadyzm pierwotny i wtórny różnią się przyczyną, wynikami badań i leczeniem. Dowiedz się, co oznaczają poziomy LH i FSH w diagnostyce niedoboru testosteronu.",
    date: "2022-05-20",
    readingTime: 5,
    excerpt: "Sam niski testosteron w wynikach to nie cała historia. To, czy LH i FSH są wysokie, niskie czy prawidłowe, mówi lekarzowi, gdzie leży problem — i ma bezpośredni wpływ na wybór leczenia.",
    content: [
      {
        heading: "LH i FSH jako klucz diagnostyczny",
        paragraphs: [
          "LH (hormon luteinizujący) i FSH (hormon folikulotropowy) to hormony przysadki, które regulują produkcję testosteronu i spermy w jądrach. Ich pomiar przy niskim testosteronie jest kluczowy, bo wskazuje, gdzie w osi hormonalnej leży problem.",
          'Jeśli LH i FSH są wysokie przy niskim testosteronie — przysadka "krzyczy" do jąder, ale jądra nie odpowiadają. To hipogonadyzm pierwotny — problem leży w jądrach. Jeśli LH i FSH są niskie lub prawidłowe mimo niskiego testosteronu — sygnał z przysadki jest niewystarczający. To hipogonadyzm wtórny — problem leży w przysadce lub podwzgórzu.'
        ]
      },
      {
        heading: "Przyczyny hipogonadyzmu pierwotnego",
        paragraphs: [
          "Wrodzone: zespół Klinefeltera (dodatkowy chromosom X — XXY), kryptorchizm (niezstąpione jądra), wrodzone zaburzenia steroidogenezy. Nabyte: zapalenie jąder (np. po śwince), urazy, chemioterapia lub radioterapia, skręt jądra, zaburzenia autoimmunologiczne.",
          "W hipogonadyzmie pierwotnym TRT jest często jedyną opcją przywrócenia fizjologicznych poziomów testosteronu, bo jądra nie są w stanie samodzielnie produkować wystarczającej ilości hormonu."
        ]
      },
      {
        heading: "Przyczyny hipogonadyzmu wtórnego",
        paragraphs: [
          "Wrodzone: izolowany niedobór gonadotropin (zespół Kalmanna — z anosmią), inne rzadkie choroby genetyczne. Nabyte: guzy lub urazy przysadki, hyperprolaktynemia, stosowanie steroidów anabolicznych lub opioidów (najczęstsze nabyte przyczyny!), otyłość, przewlekłe choroby, stres, niedobór snu.",
          "W hipogonadyzmie wtórnym, w zależności od przyczyny, może być możliwe leczenie przyczynowe (np. usunięcie gruczolaka przysadki, odstawienie steroidów anabolicznych) lub zastosowanie gonadotropin (hCG) zamiast TRT — co szczególnie istotne u mężczyzn chcących zachować płodność."
        ]
      }
    ]
  },
  {
    slug: "prolaktyna-u-mezczyzn",
    title: "Prolaktyna u mężczyzn — kiedy warto ją zbadać i co oznacza wysoki wynik?",
    metaDescription: "Wysoka prolaktyna u mężczyzn może powodować obniżone libido, ginekomastię i zaburzenia erekcji. Dowiedz się, kiedy badać prolaktynę i co oznacza hiperprolaktynemia.",
    date: "2021-11-22",
    readingTime: 5,
    excerpt: "Prolaktyna to hormon kojarzony głównie z kobietami i laktacją. Tymczasem u mężczyzn jej podwyższony poziom może być przyczyną poważnych zaburzeń hormonalnych — i często pozostaje nierozpoznany.",
    content: [
      {
        heading: "Czym jest prolaktyna i jaką rolę pełni u mężczyzn?",
        paragraphs: [
          "Prolaktyna (PRL) to hormon produkowany przez przysadkę mózgową. U kobiet reguluje laktację — stąd jej popularne skojarzenia. U mężczyzn pełni mniej oczywistą rolę, ale jej nadmiar ma wyraźne konsekwencje: hamuje wydzielanie GnRH z podwzgórza, co przekłada się na obniżenie LH, FSH i w efekcie testosteronu.",
          "Hiperprolaktynemia (podwyższona prolaktyna) u mężczyzn jest stosunkowo częstym, a jednocześnie często pomijanym zaburzeniem hormonalnym. Szacuje się, że dotyczy ok. 0,1–0,4% populacji ogólnej, ale znacznie częściej mężczyzn z objawami niedoboru testosteronu."
        ]
      },
      {
        heading: "Objawy podwyższonej prolaktyny u mężczyzn",
        paragraphs: [
          "Hiperprolaktynemia może dawać objawy podobne do niedoboru testosteronu, bo często jest jego przyczyną. Najczęstsze to: obniżone libido i zaburzenia erekcji, niepłodność (zaburzenia spermatogenezy), ginekomastia (powiększenie gruczołów piersiowych), mlekotok (rzadko u mężczyzn), bóle głowy i zaburzenia widzenia (przy guzie przysadki), ogólne osłabienie i zmęczenie.",
          "Kluczowe jest to, że przy hiperprolaktynemii leczenie niedoboru testosteronu bez usunięcia przyczyny (wysokiej prolaktyny) będzie nieskuteczne lub niedostateczne. Dlatego prolaktyna powinna być standardowym elementem diagnostyki przy objawach niedoboru androgenów."
        ]
      },
      {
        heading: "Przyczyny podwyższonej prolaktyny",
        paragraphs: [
          "Najczęstszą przyczyną hiperprolaktynemii jest gruczolak przysadki wydzielający prolaktynę (prolaktynoma) — zazwyczaj łagodny guz. Inne przyczyny to: leki (szczególnie neuroleptyki, metoklopramid, domperidon, niektóre antydepresanty), niedoczynność tarczycy, choroby nerek lub wątroby, stres i intensywny wysiłek fizyczny (przejściowy wzrost).",
          "Ważna uwaga praktyczna: prolaktynę należy badać w spokojnych warunkach, bez poprzedzającego stresu czy wysiłku. Lekkie podniesienie wyniku może być artefaktem — przy wątpliwościach bada się tzw. prolaktynę makro lub powtarza badanie."
        ]
      }
    ]
  },
  {
    slug: "estradiol-u-mezczyzn",
    title: "Estradiol u mężczyzn — czy mężczyźni potrzebują estrogenów?",
    metaDescription: "Estradiol u mężczyzn pełni ważną rolę, ale jego nadmiar może nasilać objawy niedoboru testosteronu. Dowiedz się, jaka jest norma estradiolu u mężczyzn i kiedy zbadać jego poziom.",
    date: "2021-08-11",
    readingTime: 5,
    excerpt: "Estrogeny to hormony kojarzone wyłącznie z kobietami. Tymczasem estradiol odgrywa istotną rolę również w organizmie mężczyzny — problem zaczyna się, gdy jest go za dużo lub za mało.",
    content: [
      {
        heading: "Skąd pochodzi estradiol u mężczyzn?",
        paragraphs: [
          "Mężczyźni produkują estradiol głównie w procesie aromatyzacji — testosteron jest przekształcany w estradiol przez enzym aromatazę, obecny przede wszystkim w tkance tłuszczowej, wątrobie i mięśniach. Im więcej tkanki tłuszczowej (szczególnie trzewnej), tym intensywniejsza aromatyzacja i wyższy poziom estradiolu.",
          "Niewielka część estradiolu pochodzi bezpośrednio z jąder. U zdrowego mężczyzny poziom estradiolu wynosi zwykle 20–40 pg/mL (70–150 pmol/L), choć zakresy referencyjne różnią się między laboratoriami."
        ]
      },
      {
        heading: "Jaką rolę pełni estradiol u mężczyzn?",
        paragraphs: [
          'Estradiol u mężczyzn nie jest "zbędny" — pełni szereg ważnych funkcji: chroni kości przed osteoporozą (receptory estrogenowe są obecne w tkance kostnej), wpływa na funkcje poznawcze i nastrój, uczestniczy w regulacji libido (zbyt niski estradiol obniża libido podobnie jak zbyt niski testosteron), reguluje gospodarkę lipidową.',
          "Problem pojawia się zarówno przy zbyt wysokim, jak i zbyt niskim poziomie estradiolu. Kluczowe jest zachowanie właściwej proporcji testosteronu do estradiolu."
        ]
      },
      {
        heading: "Objawy nadmiaru estradiolu u mężczyzn",
        paragraphs: [
          "Podwyższony estradiol może nasilać objawy podobne do niedoboru testosteronu: zmęczenie, obniżone libido, wahania nastroju, trudności z utratą tkanki tłuszczowej, problemy z erekcją. Dodatkowo może powodować ginekomastię (powiększenie gruczołów piersiowych) i retencję wody.",
          "Dlatego estradiol jest standardowym elementem panelu hormonalnego — jego wynik interpretowany łącznie z testosteronem daje pełniejszy obraz gospodarki androgenowej. Lekarz oceni proporcje i zdecyduje, czy wynik wymaga interwencji."
        ]
      }
    ]
  },
  {
    slug: "pierwsze-badania-hormonalne",
    title: "Pierwsze kroki w diagnostyce hormonalnej — od czego zacząć?",
    metaDescription: "Nie wiesz od czego zacząć diagnostykę hormonalną? Dowiedz się, jakie badania wykonać w pierwszej kolejności, jak się przygotować i co zrobić z wynikami.",
    date: "2021-05-04",
    readingTime: 4,
    excerpt: "Wiele osób zwleka z badaniami hormonalnymi, bo nie wie od czego zacząć — który lekarz, jakie badania, jak się przygotować. Ten artykuł porządkuje ten temat krok po kroku.",
    content: [
      {
        heading: "Krok 1 — zidentyfikuj objawy i czas ich trwania",
        paragraphs: [
          "Zanim pójdziesz na badania, warto przez chwilę zastanowić się nad objawami: co dokładnie Ci dolega, jak długo, czy nasila się czy jest stałe, czy towarzyszą mu inne zmiany (waga, sen, nastrój, libido). Lekarz zapyta o to podczas wizyty — im lepiej to opiszesz, tym sprawniejszy będzie wywiad i bardziej celna diagnostyka.",
          'Nie musisz mieć gotowej diagnozy ani teorii. Wystarczy rzetelny opis: "Od roku czuję się permanentnie zmęczony, nawet po dobrej nocy. Libido praktycznie zanikło. Przytyłem 6 kg bez zmiany diety." To wystarczy, żeby lekarz wiedział, od czego zacząć.'
        ]
      },
      {
        heading: "Krok 2 — podstawowy panel hormonalny",
        paragraphs: [
          "Przy podejrzeniu niedoboru testosteronu standardowy panel wyjściowy obejmuje: testosteron całkowity, SHBG (do wyliczenia testosteronu wolnego), LH i FSH (informują o przyczynie niedoboru), estradiol, prolaktyna, TSH (tarczyca), morfologia, glukoza na czczo.",
          "Krew pobierasz rano (7:00–11:00), na czczo lub po lekkim śniadaniu. Unikaj intensywnego wysiłku dzień wcześniej i alkoholu przez 24–48h. To wszystko — żadnych specjalnych przygotowań."
        ]
      },
      {
        heading: "Krok 3 — konsultacja z wynikami",
        paragraphs: [
          "Mając wyniki, umów się na konsultację lekarską. Nie interpretuj wyników samodzielnie przez internet — normy laboratoryjne są szerokie, a interpretacja wymaga uwzględnienia kontekstu klinicznego: wieku, objawów, stylu życia i innych parametrów.",
          "Konsultacja zdalna jest wygodna i w pełni wystarczająca — wyniki możesz przesłać z wyprzedzeniem, żeby lekarz mógł się z nimi zapoznać przed rozmową. Pierwsza wizyta trwa 60 minut."
        ]
      }
    ]
  },
  {
    slug: "andropauza-mit-czy-rzeczywistosc",
    title: "Andropauza — mit czy rzeczywistość? Co naprawdę dzieje się z testosteronem po 40-tce?",
    metaDescription: "Czy andropauza naprawdę istnieje? Porównanie z menopauzą, co wiadomo o spadku testosteronu z wiekiem i kiedy jest to problem wymagający leczenia.",
    date: "2022-02-10",
    readingTime: 6,
    excerpt: 'Termin "andropauza" bywa używany potocznie jako męski odpowiednik menopauzy. Ale czy to właściwe porównanie? Rzeczywistość jest bardziej złożona — i zdecydowanie mniej dramatyczna.',
    content: [
      {
        heading: "Andropauza a menopauza — kluczowe różnice",
        paragraphs: [
          "Menopauza u kobiet to gwałtowne, nieodwracalne zatrzymanie produkcji estrogenów — następuje w stosunkowo krótkim czasie i dotyczy wszystkich kobiet. Andropauza (lub precyzyjniej: ADAM — Androgen Deficiency in the Aging Male) to powolny, stopniowy spadek testosteronu rozłożony na dekady — i nie dotyczący wszystkich mężczyzn w jednakowym stopniu.",
          'U zdrowego mężczyzny stężenie testosteronu spada o ok. 1–2% rocznie po 35. roku życia. Dla porównania, u kobiety poziom estrogenów w ciągu roku menopauzy spada o kilkadziesiąt procent. To zupełnie inne skale — dlatego termin "andropauza" bywa krytykowany jako mylący.'
        ]
      },
      {
        heading: "Kiedy naturalny spadek staje się problemem?",
        paragraphs: [
          "Sam fakt obniżenia testosteronu z wiekiem nie jest chorobą i nie wymaga leczenia. Leczenie jest rozważane dopiero, gdy poziom testosteronu spada poniżej określonego progu i jednocześnie pojawiają się objawy kliniczne istotnie wpływające na jakość życia.",
          "Na tempo i nasilenie spadku wpływają czynniki modyfikowalne: otyłość, brak aktywności fizycznej, przewlekły stres, niedobór snu, palenie tytoniu, nadużywanie alkoholu. Mężczyźni prowadzący zdrowy tryb życia często zachowują wyższy poziom testosteronu znacznie dłużej."
        ]
      },
      {
        heading: "Co oznacza to w praktyce?",
        paragraphs: [
          'Pojawienie się objawów takich jak przewlekłe zmęczenie, obniżone libido czy pogorszenie nastroju po 40-tce nie jest "naturalną kolej rzeczy", z którą należy się po prostu pogodzić. Może mieć uchwytną hormonalną przyczynę — i może być leczone.',
          "Jednocześnie nie każdy mężczyzna po 40-tce z niskim testosteronem wymaga TRT — i nie każde objawy są efektem niedoboru testosteronu. Właśnie dlatego właściwa diagnostyka i ocena lekarska są niezbędne przed podjęciem jakichkolwiek decyzji terapeutycznych."
        ]
      }
    ]
  }
];
const BlogSection = () => {
  const recent = blogPosts.slice(0, 3);
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-5xl", children: [
    /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground mb-2", children: "Artykuły i porady" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-lg", children: "Wiedza o zdrowiu hormonalnym mężczyzn — testosteron, diagnostyka, TRT." })
      ] }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/blog",
          className: "hidden md:inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline shrink-0",
          children: [
            "Wszystkie artykuły",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: recent.map((post, i) => /* @__PURE__ */ jsx(ScrollReveal, { delay: i * 100, children: /* @__PURE__ */ jsxs("article", { className: "rounded-xl border border-border bg-card p-6 flex flex-col h-full hover:border-primary/30 hover:shadow-md transition-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3", children: [
        /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
        post.readingTime,
        " min czytania"
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg text-foreground mb-3 leading-snug flex-1", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, className: "hover:text-primary transition-colors", children: post.title }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3", children: post.excerpt }),
      /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/blog/${post.slug}`,
          className: "inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline mt-auto",
          children: [
            "Czytaj dalej",
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ]
        }
      )
    ] }) }, post.slug)) }),
    /* @__PURE__ */ jsx(ScrollReveal, { delay: 300, children: /* @__PURE__ */ jsx("div", { className: "mt-8 text-center md:hidden", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/blog",
        className: "inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline",
        children: [
          "Wszystkie artykuły",
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
        ]
      }
    ) }) })
  ] }) });
};
const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
const FaqSection = () => {
  const { t } = useLanguage();
  const faqs = [
    { q: t.faq.q1, a: t.faq.a1 },
    { q: t.faq.q2, a: t.faq.a2 },
    { q: t.faq.q3, a: t.faq.a3 },
    { q: t.faq.q4, a: t.faq.a4 },
    { q: t.faq.q5, a: t.faq.a5 }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-section-alt", id: "faq", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
    /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-14", children: t.faq.title }) }),
    /* @__PURE__ */ jsx(Accordion, { type: "single", collapsible: true, className: "space-y-3", children: faqs.map((faq, i) => /* @__PURE__ */ jsx(ScrollReveal, { delay: i * 100, children: /* @__PURE__ */ jsxs(AccordionItem, { value: `faq-${i}`, className: "bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-sm", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-left font-sans font-medium text-foreground hover:no-underline py-5", children: faq.q }),
      /* @__PURE__ */ jsx(AccordionContent, { className: "text-muted-foreground leading-relaxed pb-5", children: faq.a })
    ] }) }, i)) })
  ] }) });
};
const EMAIL = "treblinskamarta@zdrowiehormonalne.pl";
const ContactSection = () => {
  const { t, locale } = useLanguage();
  const phoneDisplay = locale === "pl" ? "572 565 887" : "+48 572 565 887";
  const [copied, setCopied] = useState(false);
  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-background", id: "kontakt", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-4", children: t.contact.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center mb-14 max-w-xl mx-auto", children: t.contact.subtitle })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(ScrollReveal, { delay: 100, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", className: "flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 shrink-0 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.contact.phone }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: phoneDisplay })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(ScrollReveal, { delay: 200, children: /* @__PURE__ */ jsxs("a", { href: `mailto:${EMAIL}`, className: "flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 shrink-0 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.contact.email }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground text-xs sm:text-sm md:text-base break-all select-all", children: EMAIL })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCopy,
              className: "shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
              title: "Copy email",
              children: copied ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-500" }) : /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(ScrollReveal, { delay: 300, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5 rounded-xl bg-card border border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 shrink-0 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid", children: /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.contact.consultForm }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: t.contact.consultFormValue }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: t.contact.remoteNote })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(ScrollReveal, { delay: 400, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5 rounded-xl bg-card border border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 shrink-0 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid", children: /* @__PURE__ */ jsx(Clock, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.contact.schedule }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: t.contact.scheduleValue })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(ScrollReveal, { delay: 200, children: /* @__PURE__ */ jsxs("div", { className: "bg-hero rounded-2xl p-8 md:p-10 flex flex-col justify-center text-center h-full", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-hero-foreground mb-4", children: t.contact.firstConsultation }),
        /* @__PURE__ */ jsx("p", { className: "text-hero-foreground/70 mb-4 leading-relaxed", children: t.contact.firstConsultationDesc }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6 space-y-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-hero-foreground/50 text-sm", children: t.contact.priceNote }),
          /* @__PURE__ */ jsx("p", { className: "text-hero-foreground/50 text-sm", children: t.contact.priceFollowUp })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", className: "mx-auto", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-2" }),
          t.contact.callNow
        ] }) })
      ] }) })
    ] })
  ] }) });
};
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const AdamQuizModal = ({ open, onOpenChange }) => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const questions = [
    t.adam.q1,
    t.adam.q2,
    t.adam.q3,
    t.adam.q4,
    t.adam.q5,
    t.adam.q6,
    t.adam.q7,
    t.adam.q8,
    t.adam.q9,
    t.adam.q10
  ];
  const isFinished = answers.length === questions.length;
  const isPositive = (ans) => {
    if (ans[0] || ans[6]) return true;
    const otherYes = ans.filter((a, i) => i !== 0 && i !== 6 && a).length;
    return otherYes >= 3;
  };
  const handleAnswer = (yes) => {
    const newAnswers = [...answers, yes];
    setAnswers(newAnswers);
    if (newAnswers.length < questions.length) {
      setCurrent(current + 1);
    }
  };
  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setCurrent(0);
      setAnswers([]);
    }, 300);
  };
  const positive = isFinished ? isPositive(answers) : false;
  const progress = answers.length / questions.length * 100;
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { className: "font-serif text-xl text-center", children: t.adam.title }) }),
    !isFinished ? /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-1", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-2", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            t.adam.questionLabel,
            " ",
            current + 1,
            " / ",
            questions.length
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            Math.round(progress),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full bg-border rounded-full h-1.5", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "bg-primary h-1.5 rounded-full transition-all duration-300",
            style: { width: `${progress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-foreground font-medium leading-relaxed min-h-[5rem] flex items-center justify-center px-2 text-base", children: questions[current] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            className: "flex-1 h-12 text-base",
            onClick: () => handleAnswer(false),
            children: t.adam.no
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "flex-1 h-12 text-base",
            onClick: () => handleAnswer(true),
            children: t.adam.yes
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-5 text-center pt-1", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `w-16 h-16 mx-auto rounded-full flex items-center justify-center ${positive ? "bg-amber-50 text-amber-500" : "bg-teal-light text-teal-mid"}`,
          children: positive ? /* @__PURE__ */ jsx(AlertCircle, { className: "w-8 h-8" }) : /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg mb-2", children: positive ? t.adam.positiveTitle : t.adam.negativeTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: positive ? t.adam.positiveText : t.adam.negativeText })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        positive && /* @__PURE__ */ jsx(Button, { className: "w-full", asChild: true, onClick: handleClose, children: /* @__PURE__ */ jsx("a", { href: "#kontakt", children: t.adam.ctaConsult }) }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", onClick: handleClose, children: t.adam.close })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: t.adam.disclaimer })
    ] })
  ] }) });
};
const AdamQuizBanner = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("section", { className: "py-10 bg-teal-light/50 border-y border-teal-mid/10", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 max-w-3xl", children: /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-12 h-12 rounded-full bg-teal-mid/15 flex items-center justify-center text-teal-mid", children: /* @__PURE__ */ jsx(ClipboardList, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground leading-snug", children: t.adam.bannerTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: t.adam.bannerDesc })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "flex-shrink-0", onClick: () => setOpen(true), children: t.adam.bannerCta })
    ] }) }) }) }),
    /* @__PURE__ */ jsx(AdamQuizModal, { open, onOpenChange: setOpen })
  ] });
};
const SiteFooter = () => {
  const { t, locale } = useLanguage();
  const privacyPath = locale === "pl" ? "/polityka-prywatnosci" : `/${locale === "en" ? "en" : "de"}/polityka-prywatnosci`;
  const termsPath = locale === "pl" ? "/regulamin" : `/${locale}/regulamin`;
  return /* @__PURE__ */ jsx("footer", { className: "bg-hero", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 py-12 max-w-4xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl mb-4 text-hero-foreground", children: t.footer.entityInfo }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm text-hero-foreground/70", children: [
          /* @__PURE__ */ jsx("p", { children: t.footer.practice }),
          /* @__PURE__ */ jsx("p", { children: t.footer.address }),
          /* @__PURE__ */ jsx("p", { children: t.footer.doctorName }),
          /* @__PURE__ */ jsx("p", { children: t.footer.remote }),
          /* @__PURE__ */ jsx("p", { children: "NIP: 7591759015" }),
          /* @__PURE__ */ jsx("p", { children: "REGON: 527117814" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 mt-5", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-hero-foreground/70", children: [
            "Praktyka jest zarejestrowana jako podmiot leczniczy pod numerem ",
            /* @__PURE__ */ jsx("span", { className: "font-bold text-hero-foreground", children: "000000270413" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 self-start", children: [
            /* @__PURE__ */ jsx("span", { className: "font-black text-gray-900 text-lg tracking-tight", children: "RPWDL" }),
            /* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-gray-200" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-gray-600 leading-tight max-w-[130px]", children: [
              "Rejestr Podmiotów Wykonujących",
              /* @__PURE__ */ jsx("br", {}),
              "Działalność Leczniczą"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl mb-4 text-hero-foreground", children: t.footer.legalInfo }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("a", { href: privacyPath, className: "block text-hero-foreground/70 hover:text-hero-foreground transition-colors", children: t.footer.privacy }),
          /* @__PURE__ */ jsx("a", { href: termsPath, className: "block text-hero-foreground/70 hover:text-hero-foreground transition-colors", children: t.footer.terms })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-hero-foreground/15 mt-10 pt-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-xs text-hero-foreground/60 text-center leading-relaxed max-w-2xl mx-auto", children: t.footer.disclaimer }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-hero-foreground/50 text-center mt-4", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        t.footer.copyright
      ] })
    ] })
  ] }) });
};
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);
  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };
  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
  };
  if (!visible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 inset-x-0 z-50 p-4", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-3xl", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl shadow-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground flex-1", children: [
      t.cookie.text,
      " ",
      /* @__PURE__ */ jsx("a", { href: "/polityka-prywatnosci", className: "text-primary underline underline-offset-2", children: t.cookie.privacyLink }),
      "."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-shrink-0", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: reject, children: t.cookie.reject }),
      /* @__PURE__ */ jsx(Button, { size: "sm", onClick: accept, children: t.cookie.accept })
    ] })
  ] }) }) });
};
const FloatingCTA = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-lg border-t border-border px-4 py-3 flex gap-3 animate-in slide-in-from-bottom-4 duration-300", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "#kontakt",
          className: "flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm h-11 px-4 shadow-lg",
          onClick: (e) => {
            var _a;
            e.preventDefault();
            (_a = document.getElementById("kontakt")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
          },
          children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
            t.hero.cta
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "tel:+48572565887",
          className: "inline-flex items-center justify-center rounded-lg bg-primary/10 text-primary font-medium text-sm h-11 w-11 shrink-0",
          children: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: "#kontakt",
        onClick: (e) => {
          var _a;
          e.preventDefault();
          (_a = document.getElementById("kontakt")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
        },
        className: "hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium text-sm h-12 px-5 shadow-lg hover:bg-primary/90 transition-colors animate-in slide-in-from-bottom-4 duration-300",
        children: [
          /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
          t.nav.call
        ]
      }
    )
  ] });
};
const SUPABASE_URL = "https://hzpscrzwewcleaomcrwm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cHNjcnp3ZXdjbGVhb21jcndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MjUxODAsImV4cCI6MjA5MTUwMTE4MH0.uVVJey7t_83amP3zRTZ_KnJ6yh76lbLidGLD-NjA9og";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const FeedbackButton = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("loading");
    const { error } = await supabase.from("feedback").insert({
      message: message.trim(),
      reporter_email: email.trim() || null
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setMessage("");
    setEmail("");
    window.setTimeout(() => {
      setOpen(false);
      setStatus("idle");
    }, 1800);
  };
  const handleClose = () => {
    setOpen(false);
    setStatus("idle");
    setMessage("");
    setEmail("");
  };
  const fb = t.feedback;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setOpen(true),
        className: "hidden md:flex fixed right-0 top-1/2 z-40 items-center gap-1.5 rounded-l-md border border-r-0 border-border/50 bg-muted/80 px-2 py-3 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-muted hover:text-foreground",
        style: { writingMode: "vertical-rl", textOrientation: "mixed" },
        "aria-label": fb.button,
        children: [
          /* @__PURE__ */ jsx(MessageSquarePlus, { className: "h-3.5 w-3.5 rotate-90" }),
          fb.button
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(true),
        className: "md:hidden fixed bottom-[4.5rem] right-3 z-40 flex h-9 w-9 items-center justify-center rounded-full border border-border/50 bg-muted/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-muted hover:text-foreground",
        "aria-label": fb.button,
        children: /* @__PURE__ */ jsx(MessageSquarePlus, { className: "h-4 w-4" })
      }
    ),
    open && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 p-4 backdrop-blur-sm animate-in fade-in duration-200 md:items-center",
        onClick: handleClose,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-xl animate-in slide-in-from-bottom-4 duration-300",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h2", { className: "text-base font-semibold text-foreground", children: fb.title }),
                  /* @__PURE__ */ jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: fb.subtitle })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleClose,
                    className: "shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              status === "success" ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(Send, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: fb.successTitle }),
                /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: fb.successDesc })
              ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: "mb-1 block text-sm font-medium text-foreground", children: fb.messageLabel }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: message,
                      onChange: (e) => setMessage(e.target.value),
                      placeholder: fb.messagePlaceholder,
                      rows: 3,
                      required: true,
                      className: "w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("label", { className: "mb-1 block text-sm font-medium text-foreground", children: [
                    fb.emailLabel,
                    /* @__PURE__ */ jsx("span", { className: "ml-1 font-normal text-muted-foreground", children: fb.emailOptional })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "email",
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: fb.emailPlaceholder,
                      className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: fb.emailHint })
                ] }),
                status === "error" && /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive", children: fb.error }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "submit",
                    disabled: status === "loading" || !message.trim(),
                    className: "inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50",
                    children: [
                      status === "loading" ? /* @__PURE__ */ jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsx(Send, { className: "h-3.5 w-3.5" }),
                      fb.submit
                    ]
                  }
                )
              ] })
            ]
          }
        )
      }
    )
  ] });
};
const Index = () => {
  const location = useLocation();
  useEffect(() => {
    var _a;
    const id = (_a = location.state) == null ? void 0 : _a.scrollTo;
    if (!id) return;
    const timeout = setTimeout(() => {
      var _a2;
      (_a2 = document.getElementById(id)) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timeout);
  }, [location.state]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx("div", { id: "objawy", children: /* @__PURE__ */ jsx(SymptomsSection, {}) }),
      /* @__PURE__ */ jsx(AdamQuizBanner, {}),
      /* @__PURE__ */ jsx("div", { id: "uslugi", children: /* @__PURE__ */ jsx(ServicesSection, {}) }),
      /* @__PURE__ */ jsx("div", { id: "proces", children: /* @__PURE__ */ jsx(ProcessSection, {}) }),
      /* @__PURE__ */ jsx(TrtInfoSection, {}),
      /* @__PURE__ */ jsx(DoctorSection, {}),
      /* @__PURE__ */ jsx(ReviewsSection, {}),
      /* @__PURE__ */ jsx(BlogSection, {}),
      /* @__PURE__ */ jsx(FaqSection, {}),
      /* @__PURE__ */ jsx(ContactSection, {})
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {}),
    /* @__PURE__ */ jsx(FloatingCTA, {}),
    /* @__PURE__ */ jsx(FeedbackButton, {}),
    /* @__PURE__ */ jsx(CookieBanner, {})
  ] });
};
const formatDate$1 = (iso) => new Date(iso).toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" });
const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Blog — zdrowiehormonalne.pl | Artykuły o testosteronie i zdrowiu hormonalnym";
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "bg-hero text-hero-foreground py-16 md:py-24", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "inline-block text-sm uppercase tracking-[0.2em] font-semibold mb-4 px-4 py-2 rounded-full bg-hero-foreground/10 border border-hero-foreground/20", children: "Wiedza i porady" }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl md:text-5xl text-hero-foreground mb-4", children: "Blog" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-hero-foreground/80 max-w-xl mx-auto", children: "Artykuły o zdrowiu hormonalnym mężczyzn — testosteron, diagnostyka, TRT i nie tylko." })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-8", children: blogPosts.map((post) => /* @__PURE__ */ jsxs(
          "article",
          {
            className: "rounded-xl border border-border bg-card p-6 md:p-8 hover:border-primary/30 hover:shadow-md transition-all",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }),
                  formatDate$1(post.date)
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
                  post.readingTime,
                  " min czytania"
                ] })
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl md:text-2xl text-foreground mb-3 leading-snug", children: /* @__PURE__ */ jsx(Link, { to: `/blog/${post.slug}`, className: "hover:text-primary transition-colors", children: post.title }) }),
              /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: post.excerpt }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: `/blog/${post.slug}`,
                  className: "inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline",
                  children: [
                    "Czytaj dalej",
                    /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                  ]
                }
              )
            ]
          },
          post.slug
        )) }),
        /* @__PURE__ */ jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground transition-colors", children: "← Wróć na stronę główną" }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
};
const formatDate = (iso) => new Date(iso).toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric" });
const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      document.title = `${post.title} — zdrowiehormonalne.pl`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", post.metaDescription);
    }
  }, [post]);
  if (!post) return /* @__PURE__ */ jsx(Navigate, { to: "/blog", replace: true });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx("section", { className: "bg-hero text-hero-foreground py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
        /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-xs text-hero-foreground/60 mb-6", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-hero-foreground/90 transition-colors", children: "Strona główna" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-hero-foreground/90 transition-colors", children: "Blog" }),
          /* @__PURE__ */ jsx("span", { children: "/" }),
          /* @__PURE__ */ jsx("span", { className: "text-hero-foreground/80 truncate max-w-[200px]", children: post.title })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl md:text-4xl text-hero-foreground leading-tight mb-4", children: post.title }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-hero-foreground/60", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
            formatDate(post.date)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
            post.readingTime,
            " min czytania"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
        /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary/30 pl-4", children: post.excerpt }),
        /* @__PURE__ */ jsx("article", { className: "prose prose-neutral max-w-none", children: post.content.map((section, i) => /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          section.heading && /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl text-foreground mt-10 mb-4", children: section.heading }),
          section.paragraphs.map((p, j) => /* @__PURE__ */ jsx("p", { className: "text-foreground/80 leading-relaxed mb-4", children: p }, j))
        ] }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 p-8 rounded-2xl bg-hero text-hero-foreground text-center", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl mb-3", children: "Chcesz omówić swój przypadek?" }),
          /* @__PURE__ */ jsx("p", { className: "text-hero-foreground/70 mb-6 max-w-md mx-auto", children: "Skontaktuj się z lek. Martą Treblińską — konsultacja zdalna, z dowolnego miejsca." }),
          /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-2" }),
            "Zadzwoń teraz"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors", children: [
            /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Wszystkie artykuły"
          ] }),
          /* @__PURE__ */ jsx("a", { href: "/#kontakt", className: "text-sm text-primary hover:underline", children: "Umów konsultację →" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
};
const PrivacyPolicy = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsx("main", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl prose prose-slate", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl md:text-4xl text-foreground mb-8", children: "Polityka prywatności" }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground", children: "1. Administrator danych osobowych" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: 'Administratorem danych osobowych jest Indywidualna Praktyka Lekarska Marta Treblińska, ul. Duboisa 1/21, Ostrów Mazowiecki (dalej: „Administrator").' }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground", children: "2. Cel i podstawa przetwarzania" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Dane osobowe przetwarzane są w celu: umówienia i realizacji konsultacji lekarskiej (art. 6 ust. 1 lit. b RODO), wypełnienia obowiązków prawnych Administratora (art. 6 ust. 1 lit. c RODO), w tym prowadzenia dokumentacji medycznej." }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground", children: "3. Okres przechowywania danych" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Dane osobowe przechowywane są przez okres wymagany przepisami prawa, w szczególności ustawy o prawach pacjenta i Rzeczniku Praw Pacjenta (dokumentacja medyczna — 20 lat od ostatniego wpisu)." }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground", children: "4. Prawa osoby, której dane dotyczą" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Przysługuje Ci prawo do: dostępu do danych, ich sprostowania, usunięcia (w zakresie dozwolonym prawem), ograniczenia przetwarzania, przenoszenia danych oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych." }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground", children: "5. Pliki cookies" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Strona wykorzystuje pliki cookies niezbędne do prawidłowego funkcjonowania serwisu. Pliki cookies nie służą do identyfikacji użytkowników. Użytkownik może zmienić ustawienia dotyczące cookies w swojej przeglądarce internetowej." }),
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground", children: "6. Kontakt" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "W sprawach związanych z ochroną danych osobowych można kontaktować się z Administratorem pod adresem e-mail: treblinskamarta@zdrowiehormonalne.pl lub korespondencyjnie na adres podmiotu." })
    ] }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
};
const Regulamin = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsx("main", { className: "py-16 md:py-24 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-3xl", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl md:text-4xl text-foreground mb-8", children: "Regulamin" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 text-muted-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "1. Postanowienia ogólne" }),
          /* @__PURE__ */ jsx("p", { children: 'Niniejszy regulamin określa zasady korzystania ze strony internetowej prowadzonej przez Indywidualną Praktykę Lekarską lek. med. Marta Treblińska (dalej: „Usługodawca").' })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "2. Zakres usług" }),
          /* @__PURE__ */ jsx("p", { children: "Usługodawca świadczy konsultacje lekarskie w zakresie diagnostyki i leczenia zaburzeń hormonalnych u mężczyzn. Konsultacje odbywają się w formie zdalnej (teleporada) zgodnie z obowiązującymi przepisami dotyczącymi telemedycyny." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "3. Warunki korzystania z usług" }),
          /* @__PURE__ */ jsx("p", { children: "Umówienie konsultacji odbywa się poprzez kontakt telefoniczny lub mailowy. Termin konsultacji ustalany jest indywidualnie. Konsultacja lekarska nie zastępuje wizyty w nagłych przypadkach medycznych — w stanach zagrożenia życia należy kontaktować się z pogotowiem ratunkowym (tel. 112 lub 999)." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "4. Odpowiedzialność" }),
          /* @__PURE__ */ jsx("p", { children: "Treści zamieszczone na stronie mają charakter wyłącznie informacyjny i nie stanowią porady medycznej. Decyzja o wdrożeniu leczenia podejmowana jest przez lekarza po przeprowadzeniu konsultacji i analizie wyników badań." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "5. Ochrona danych osobowych" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Zasady przetwarzania danych osobowych określa",
            " ",
            /* @__PURE__ */ jsx("a", { href: "/polityka-prywatnosci", className: "text-primary underline underline-offset-2", children: "Polityka prywatności" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "6. Postanowienia końcowe" }),
          /* @__PURE__ */ jsx("p", { children: "Usługodawca zastrzega sobie prawo do zmiany regulaminu. Aktualny regulamin jest dostępny na niniejszej stronie. W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-foreground mb-3", children: "7. Kontakt" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "W sprawach związanych z regulaminem można kontaktować się pod adresem e-mail:",
            " ",
            /* @__PURE__ */ jsx("a", { href: "mailto:treblinskamarta@zdrowiehormonalne.pl", className: "text-primary underline underline-offset-2", children: "treblinskamarta@zdrowiehormonalne.pl" }),
            " ",
            "lub telefonicznie: ",
            /* @__PURE__ */ jsx("a", { href: "tel:+48572565887", className: "text-primary underline underline-offset-2", children: "+48 572 565 887" }),
            "."
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(SiteFooter, {})
  ] });
};
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-4 text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "mb-4 text-xl text-muted-foreground", children: "Oops! Page not found" }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "text-primary underline hover:text-primary/90", children: "Return to Home" })
  ] }) });
};
function render(url) {
  const queryClient = new QueryClient();
  const html = renderToString(
    /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(LanguageProvider, { ssrUrl: url, children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/de", element: /* @__PURE__ */ jsx(Index, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blog", element: /* @__PURE__ */ jsx(Blog, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/blog/:slug", element: /* @__PURE__ */ jsx(BlogPost, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/polityka-prywatnosci", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/polityka-prywatnosci", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/de/polityka-prywatnosci", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/regulamin", element: /* @__PURE__ */ jsx(Regulamin, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/en/regulamin", element: /* @__PURE__ */ jsx(Regulamin, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/de/regulamin", element: /* @__PURE__ */ jsx(Regulamin, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
    ] }) }) }) }) })
  );
  return html;
}
export {
  blogPosts,
  render
};
