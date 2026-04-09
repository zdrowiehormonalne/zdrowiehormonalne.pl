import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createContext, useState, useCallback, useEffect, useContext, useRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLocation, Routes, Route } from "react-router-dom";
import { Phone, X, Menu, Mail, BatteryLow, HeartPulse, Brain, TrendingDown, FlaskConical, Stethoscope, BarChart3, FileSearch, ClipboardCheck, ShieldCheck, GraduationCap, Award, BookOpen, ArrowLeft, ArrowRight, ExternalLink, Star, ChevronDown, Video, Clock } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
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
      call: "Zadzwoń"
    },
    hero: {
      badge: "Konsultacje lekarskie · Diagnostyka · Terapia",
      title: "Terapia zastępcza testosteronem (TRT)",
      description: "Profesjonalna opieka lekarska w zakresie terapii zastępczej testosteronem — od diagnostyki, przez kwalifikację, po prowadzenie leczenia. Konsultacje zdalnie, z dowolnego miejsca.",
      cta: "Umów konsultację lekarską",
      doctorName: "lek. Marta Treblińska"
    },
    symptoms: {
      title: "Kiedy warto rozważyć konsultację lekarską?",
      subtitle: "Konsultacja może być wskazana w przypadku występowania poniższych objawów. Mogą one mieć różne przyczyny i wymagają odpowiedniej diagnostyki.",
      fatigue: "Przewlekłe zmęczenie",
      libido: "Obniżone libido",
      concentration: "Pogorszenie koncentracji",
      muscle: "Spadek siły mięśniowej",
      hormones: "Nieprawidłowe wyniki badań hormonalnych"
    },
    services: {
      title: "Zakres konsultacji",
      diagnostics: "Diagnostyka zaburzeń hormonalnych",
      diagnosticsDesc: "Kompleksowa ocena stanu hormonalnego u mężczyzn",
      hormoneLevel: "Ocena poziomu hormonów",
      hormoneLevelDesc: "Analiza testosteronu i innych parametrów hormonalnych",
      interpretation: "Interpretacja wyników",
      interpretationDesc: "Szczegółowe omówienie wyników badań laboratoryjnych",
      qualification: "Kwalifikacja do leczenia",
      qualificationDesc: "Ocena wskazań do ewentualnej terapii",
      therapy: "Prowadzenie terapii",
      therapyDesc: "Leczenie zgodne z aktualną wiedzą medyczną",
      monitoring: "Monitorowanie leczenia",
      monitoringDesc: "Regularna kontrola parametrów i bezpieczeństwa"
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
      disclaimer: "Leczenie wdrażane jest wyłącznie w przypadku istnienia wskazań medycznych."
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
      ebm: "Podejście oparte na medycynie opartej na dowodach (evidence-based medicine)",
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
      schedule: "Terminy",
      scheduleValue: "Indywidualnie dostosowane do pacjenta",
      firstConsultation: "Pierwsza konsultacja",
      firstConsultationDesc: "Skontaktuj się telefonicznie lub mailowo, aby umówić wizytę. Podczas rejestracji otrzymasz informacje o badaniach, które warto wykonać przed konsultacją.",
      callNow: "Zadzwoń teraz"
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
      call: "Call"
    },
    hero: {
      badge: "Medical consultations · Diagnostics · Therapy",
      title: "Testosterone Replacement Therapy (TRT)",
      description: "Professional medical care in testosterone replacement therapy — from diagnostics, through qualification, to treatment management. Remote consultations, from anywhere.",
      cta: "Book a consultation",
      doctorName: "Marta Treblińska, MD"
    },
    symptoms: {
      title: "When should you consider a medical consultation?",
      subtitle: "A consultation may be advisable if you experience the following symptoms. They can have various causes and require proper diagnostics.",
      fatigue: "Chronic fatigue",
      libido: "Decreased libido",
      concentration: "Poor concentration",
      muscle: "Loss of muscle strength",
      hormones: "Abnormal hormonal test results"
    },
    services: {
      title: "Scope of consultation",
      diagnostics: "Hormonal disorder diagnostics",
      diagnosticsDesc: "Comprehensive assessment of hormonal status in men",
      hormoneLevel: "Hormone level assessment",
      hormoneLevelDesc: "Analysis of testosterone and other hormonal parameters",
      interpretation: "Results interpretation",
      interpretationDesc: "Detailed discussion of laboratory test results",
      qualification: "Treatment qualification",
      qualificationDesc: "Assessment of indications for potential therapy",
      therapy: "Therapy management",
      therapyDesc: "Treatment in accordance with current medical knowledge",
      monitoring: "Treatment monitoring",
      monitoringDesc: "Regular monitoring of parameters and safety"
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
      disclaimer: "Treatment is implemented only when medical indications exist."
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
      ebm: "Evidence-based medicine approach",
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
      schedule: "Appointments",
      scheduleValue: "Individually tailored to the patient",
      firstConsultation: "First consultation",
      firstConsultationDesc: "Contact us by phone or email to schedule a visit. During registration, you will receive information about tests worth doing before the consultation.",
      callNow: "Call now"
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
      call: "Anrufen"
    },
    hero: {
      badge: "Ärztliche Beratung · Diagnostik · Therapie",
      title: "Testosteronersatztherapie (TRT)",
      description: "Professionelle ärztliche Betreuung im Bereich der Testosteronersatztherapie — von der Diagnostik über die Qualifikation bis zur Behandlungsführung. Fernkonsultationen, von überall aus.",
      cta: "Beratung vereinbaren",
      doctorName: "Dr. med. Marta Treblińska"
    },
    symptoms: {
      title: "Wann sollten Sie eine ärztliche Beratung in Betracht ziehen?",
      subtitle: "Eine Beratung kann bei folgenden Symptomen angezeigt sein. Diese können verschiedene Ursachen haben und erfordern eine entsprechende Diagnostik.",
      fatigue: "Chronische Müdigkeit",
      libido: "Verminderte Libido",
      concentration: "Konzentrationsstörungen",
      muscle: "Abnahme der Muskelkraft",
      hormones: "Auffällige Hormonwerte"
    },
    services: {
      title: "Leistungsspektrum",
      diagnostics: "Diagnostik hormoneller Störungen",
      diagnosticsDesc: "Umfassende Bewertung des Hormonstatus bei Männern",
      hormoneLevel: "Hormonspiegelbestimmung",
      hormoneLevelDesc: "Analyse von Testosteron und anderen Hormonparametern",
      interpretation: "Befundinterpretation",
      interpretationDesc: "Ausführliche Besprechung der Laborergebnisse",
      qualification: "Therapiequalifikation",
      qualificationDesc: "Beurteilung der Indikationen für eine mögliche Therapie",
      therapy: "Therapieführung",
      therapyDesc: "Behandlung gemäß aktuellem medizinischen Wissensstand",
      monitoring: "Therapieüberwachung",
      monitoringDesc: "Regelmäßige Kontrolle der Parameter und Sicherheit"
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
      disclaimer: "Eine Behandlung wird nur bei Vorliegen medizinischer Indikationen eingeleitet."
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
      ebm: "Evidenzbasierter medizinischer Ansatz",
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
      subtitle: "Eine ärztliche Beratung ist der erste Schritt zur Diagnostik und möglichen Behandlung hormoneller Störungen.",
      phone: "Telefon",
      email: "E-Mail",
      consultForm: "Beratungsform",
      consultFormValue: "Fernberatung — bequem, von überall",
      schedule: "Termine",
      scheduleValue: "Individuell auf den Patienten abgestimmt",
      firstConsultation: "Erstberatung",
      firstConsultationDesc: "Kontaktieren Sie uns telefonisch oder per E-Mail, um einen Termin zu vereinbaren. Bei der Anmeldung erhalten Sie Informationen über empfohlene Voruntersuchungen.",
      callNow: "Jetzt anrufen"
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  }, []);
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
        /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 mr-1.5" }),
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
      /* @__PURE__ */ jsx(Button, { size: "sm", className: "w-full mt-2", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", children: [
        /* @__PURE__ */ jsx(Phone, { className: "w-3.5 h-3.5 mr-1.5" }),
        t.nav.call
      ] }) })
    ] })
  ] });
};
const HeroSection = () => {
  const { t, locale } = useLanguage();
  const phoneDisplay = locale === "pl" ? "572 565 887" : "+48 572 565 887";
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
        /* @__PURE__ */ jsxs("a", { href: "mailto:treblinskamarta@zdrowiehormonalne.pl", className: "flex items-center gap-2 hover:text-hero-foreground/90 transition-colors", children: [
          /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
          "treblinskamarta@zdrowiehormonalne.pl"
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
    { icon: BatteryLow, label: t.symptoms.fatigue },
    { icon: HeartPulse, label: t.symptoms.libido },
    { icon: Brain, label: t.symptoms.concentration },
    { icon: TrendingDown, label: t.symptoms.muscle },
    { icon: FlaskConical, label: t.symptoms.hormones }
  ];
  return /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-6 max-w-4xl", children: [
    /* @__PURE__ */ jsxs(ScrollReveal, { children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-4", children: t.symptoms.title }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center mb-14 max-w-2xl mx-auto", children: t.symptoms.subtitle })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: symptoms.map((s, i) => /* @__PURE__ */ jsx(ScrollReveal, { delay: i * 100, children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 h-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(s.icon, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium leading-snug", children: s.label })
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
    /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl md:text-4xl text-foreground text-center mb-14", children: t.services.title }) }),
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
    /* @__PURE__ */ jsx(ScrollReveal, { delay: 600, children: /* @__PURE__ */ jsx("p", { className: "mt-12 text-center text-sm text-muted-foreground italic border-t border-border pt-8", children: t.process.disclaimer }) })
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
    { webp: "/images/cert-trt-master.webp", jpg: "/images/cert-trt-master.jpg", alt: "TRT Master Practitioner Certificate" }
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
              /* @__PURE__ */ jsx("span", { children: t.doctor.experience })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.ebm })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx(Award, { className: "w-5 h-5 text-teal-mid flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsx("span", { children: t.doctor.alfa })
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
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
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
        onClick: scrollPrev,
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
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
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
        onClick: scrollNext,
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
  const plugin = useRef(Autoplay({ delay: 4e3, stopOnInteraction: false, stopOnMouseEnter: true }));
  const title = locale === "en" ? "Patient Reviews" : locale === "de" ? "Patientenbewertungen" : "Opinie pacjentów";
  const allReviews = locale === "en" ? "See all reviews" : locale === "de" ? "Alle Bewertungen" : "Zobacz wszystkie opinie";
  const verified = locale === "en" ? "Verified visit" : locale === "de" ? "Verifizierter Besuch" : "Weryfikacja wizyty";
  return /* @__PURE__ */ jsx("section", { className: "py-16 md:py-24 bg-secondary/30", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 max-w-6xl", children: [
    /* @__PURE__ */ jsx(ScrollReveal, { children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl md:text-4xl font-bold text-foreground mb-3 font-display", children: title }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center gap-2 mb-2", children: /* @__PURE__ */ jsx(Stars, {}) }),
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
          /* @__PURE__ */ jsx(CarouselPrevious, { className: "-left-4 md:-left-6 bg-card border-border" }),
          /* @__PURE__ */ jsx(CarouselNext, { className: "-right-4 md:-right-6 bg-card border-border" })
        ]
      }
    ) })
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
const ContactSection = () => {
  const { t, locale } = useLanguage();
  const phoneDisplay = locale === "pl" ? "572 565 887" : "+48 572 565 887";
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
        /* @__PURE__ */ jsx(ScrollReveal, { delay: 200, children: /* @__PURE__ */ jsxs("a", { href: "mailto:treblinskamarta@zdrowiehormonalne.pl", className: "flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 shrink-0 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.contact.email }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground break-all text-sm sm:text-base", children: "treblinskamarta@zdrowiehormonalne.pl" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(ScrollReveal, { delay: 300, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-5 rounded-xl bg-card border border-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 shrink-0 rounded-lg bg-teal-light flex items-center justify-center text-teal-mid", children: /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: t.contact.consultForm }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: t.contact.consultFormValue })
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
        /* @__PURE__ */ jsx("p", { className: "text-hero-foreground/70 mb-8 leading-relaxed", children: t.contact.firstConsultationDesc }),
        /* @__PURE__ */ jsx(Button, { variant: "hero", size: "lg", className: "mx-auto", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "tel:+48572565887", children: [
          /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 mr-2" }),
          t.contact.callNow
        ] }) })
      ] }) })
    ] })
  ] }) });
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
const Index = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SiteNav, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(HeroSection, {}),
      /* @__PURE__ */ jsx("div", { id: "objawy", children: /* @__PURE__ */ jsx(SymptomsSection, {}) }),
      /* @__PURE__ */ jsx("div", { id: "uslugi", children: /* @__PURE__ */ jsx(ServicesSection, {}) }),
      /* @__PURE__ */ jsx("div", { id: "proces", children: /* @__PURE__ */ jsx(ProcessSection, {}) }),
      /* @__PURE__ */ jsx(TrtInfoSection, {}),
      /* @__PURE__ */ jsx(DoctorSection, {}),
      /* @__PURE__ */ jsx(ReviewsSection, {}),
      /* @__PURE__ */ jsx(FaqSection, {}),
      /* @__PURE__ */ jsx(ContactSection, {})
    ] }),
    /* @__PURE__ */ jsx(SiteFooter, {}),
    /* @__PURE__ */ jsx(CookieBanner, {})
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
  render
};
