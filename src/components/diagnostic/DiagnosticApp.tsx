import { useState, useCallback, useEffect } from 'react';
import {
  colorsGradient, ageOptions, zones, painWhyOptions, sports, trainingLevels,
  subzoneConfig, painDurations, mobWhyOptions, mobTriedOptions, mobBlocksOptions,
  mobDurations, kineDetails, mobZones, stepsPain, stepsMob,
  type Answers, type StepId, defaultAnswers
} from './data';
import { processAlgorithm, getProgramTag } from './algorithm';
import ProtocolDetails from './ProtocolDetails';
import { PROGRAM_MAP } from './programAssets';
import { getZoneReassuranceText } from './zoneReassurance';
import reassuranceImg from '@/assets/reassurance-zone.webp';
import moodboardImg from '@/assets/moodboard-athletes.webp';
import teamReassuranceImg from '@/assets/team-reassurance.webp';
import mobilityHeroImg from '@/assets/mobility-hero.webp';
import mobilityHeroMaleImg from '@/assets/mobility-hero-male.webp';

function ListCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`cut-list relative group w-full text-left transition-all`}>
      <div className={`absolute inset-0 transition-colors ${selected ? 'bg-primary' : 'bg-card group-hover:bg-secondary'}`} />
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${selected ? 'bg-primary-foreground' : 'bg-border'}`} />
      <div className={`relative z-10 p-4 flex flex-col justify-center min-h-[60px] ${selected ? 'text-primary-foreground' : 'text-foreground'}`}>
        <span className="block font-futura font-bold text-xl uppercase tracking-tight leading-none">{label}</span>
      </div>
    </button>
  );
}

function ZoneCard({ label, icon, image, selected, onClick }: { label: string; icon: string; image?: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="cut-card relative group w-full text-left transition-all min-h-[110px]">
      <div className={`absolute inset-0 transition-colors ${selected ? 'bg-primary' : 'bg-card group-hover:bg-secondary'}`} />
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${selected ? 'bg-primary-foreground' : 'bg-border'}`} />
      <div className={`relative z-10 p-3 flex flex-col items-center text-center transition-colors ${selected ? 'text-primary-foreground' : 'text-foreground'}`}>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1.5 transition-colors ${selected ? 'bg-primary-foreground/20' : 'bg-secondary'}`}>
          {image ? (
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className={`w-11 h-11 object-contain transition-[filter] ${selected ? 'invert brightness-0' : ''}`}
              style={selected ? { filter: 'invert(1) brightness(2)' } : undefined}
            />
          ) : (
            <svg className={`w-4 h-4 transition-colors ${selected ? 'text-primary-foreground' : 'text-muted-foreground'}`} fill="none" stroke="currentColor" strokeWidth="2">
              <path d={icon} />
            </svg>
          )}
        </div>
        <span className="font-futura font-bold text-sm leading-tight uppercase tracking-tight">{label}</span>
      </div>
    </button>
  );
}

function MultiSelectCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="cut-list relative group w-full text-left transition-all border-2 border-transparent">
      <div className={`absolute inset-0 transition-colors ${selected ? 'bg-primary' : 'bg-card group-hover:bg-secondary'}`} />
      <div className={`relative z-10 p-3.5 flex items-center transition-colors ${selected ? 'text-primary-foreground' : 'text-foreground'}`}>
        <div className="flex-1 px-2 font-futura font-bold text-lg uppercase leading-none tracking-tight">{label}</div>
        <div className={`w-6 h-6 border-2 rounded-full transition-colors ${selected ? 'border-primary-foreground bg-primary-foreground' : 'border-border bg-card'}`} />
      </div>
    </button>
  );
}

function BarSelector({ value, onSelect, confirmLabel, onConfirm }: { value: number; onSelect: (v: number) => void; confirmLabel: string; onConfirm: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-end mb-6 border-b-2 border-border pb-2 w-full">
        <span className="text-7xl font-futura font-bold leading-none" style={{ color: value > 0 ? colorsGradient[value - 1] : '#D1D5DB' }}>
          {value > 0 ? value : '-'}
        </span>
        <span className="text-3xl font-futura font-bold text-muted-foreground mb-1 ml-1">/10</span>
      </div>
      <div className="flex items-end justify-between w-full h-32 gap-1 mb-10">
        {Array.from({ length: 10 }, (_, i) => (
          <button key={i} onClick={() => onSelect(i + 1)} className="flex-1 transition-all relative group" style={{ height: `${20 + (i + 1) * 8}%` }}>
            <div className="absolute inset-0" style={{
              clipPath: 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)',
              backgroundColor: i < value ? colorsGradient[i] : '#E5E7EB'
            }} />
          </button>
        ))}
      </div>
      <button onClick={onConfirm} disabled={value === 0} className={`w-full py-5 font-futura font-bold text-2xl uppercase cut-btn transition-all ${value > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground opacity-40 cursor-not-allowed'}`}>
        {confirmLabel}
      </button>
    </div>
  );
}

type SubmissionPayload = {
  prenom: string;
  email: string;
  zone: string;
  programme: string;
  tag: string;
  date: string;
  timestamp: number;
};

const PENDING_SUBMISSION_KEY = 'tt_pending_submission';

async function submitPayload(payload: SubmissionPayload): Promise<boolean> {
  try {
    const res = await fetch('/api/submit-diagnostic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export default function DiagnosticApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ ...defaultAnswers });
  const [result, setResult] = useState<{ prog: string; msg: string; isConsultation: boolean } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const pending = localStorage.getItem(PENDING_SUBMISSION_KEY);
    if (!pending) return;
    let payload: SubmissionPayload;
    try {
      payload = JSON.parse(pending);
    } catch {
      localStorage.removeItem(PENDING_SUBMISSION_KEY);
      return;
    }
    submitPayload(payload).then((ok) => {
      if (ok) localStorage.removeItem(PENDING_SUBMISSION_KEY);
    });
  }, []);

  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');

  const getSteps = useCallback(() => {
    return answers.goal === 'pain' ? [...stepsPain] : [...stepsMob];
  }, [answers.goal]);

  const getCurrentStepId = useCallback((): StepId => {
    const steps = getSteps();
    return steps[currentStep - 1] as StepId;
  }, [currentStep, getSteps]);

  const totalSteps = getSteps().length - 1;
  const stepId = getCurrentStepId();

  const scrollAllowedSteps: StepId[] = ['pain-why', 'pain-sport', 'pain-reassurance', 'mob-why', 'mob-blocks', 'final-lead', 'result'];
  const allowScroll = scrollAllowedSteps.includes(stepId);

  const update = (key: keyof Answers, val: string | number | string[]) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const nextStep = () => {
    const steps = getSteps();
    if (currentStep < steps.length) setCurrentStep(c => c + 1);
  };

  const prevStep = () => {
    if (currentStep <= 1) return;
    const steps = getSteps();
    const painDurIdx = steps.indexOf('pain-duration' as never) + 1;
    const painReassZoneIdx = steps.indexOf('pain-reassurance-zone' as never) + 1;
    const painGymIdx = steps.indexOf('pain-gym' as never) + 1;
    const painZoneIdx = steps.indexOf('pain-zone' as never) + 1;
    const painKineIdx = steps.indexOf('pain-kine' as never) + 1;

    if (currentStep === painReassZoneIdx && answers.pain_zone && !subzoneConfig[answers.pain_zone]) {
      setCurrentStep(painZoneIdx);
    } else if (currentStep === painDurIdx && answers.pain_zone && !subzoneConfig[answers.pain_zone]) {
      // depuis duration, revenir à reassurance-zone
      setCurrentStep(painReassZoneIdx);
    } else if (currentStep === painGymIdx && answers.kine === 'no') {
      setCurrentStep(painKineIdx);
    } else {
      setCurrentStep(c => c - 1);
    }
  };

  const handleSelect = (key: keyof Answers, val: string) => {
    update(key, val);

    if (key === 'goal') {
      // branches are handled by stepId
    }

    if (key === 'pain_zone') {
      const steps = getSteps();
      if (subzoneConfig[val]) {
        setCurrentStep(steps.indexOf('pain-subzone' as never) + 1);
      } else {
        setCurrentStep(steps.indexOf('pain-reassurance-zone' as never) + 1);
      }
      return;
    }

    if (key === 'kine' && val === 'no') {
      const steps = getSteps();
      setCurrentStep(steps.indexOf('pain-gym' as never) + 1);
      return;
    }

    setTimeout(() => nextStep(), 300);
  };

  const toggleMulti = (key: 'pain_why' | 'mob_why' | 'mob_blocks', val: string) => {
    setAnswers(prev => {
      const arr = prev[key];
      return { ...prev, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };

  const handleSubmit = async () => {
    const firstName = answers.firstName.trim();
    const email = answers.email.trim();
    let hasError = false;
    if (!firstName) {
      setFirstNameError('Entre ton prénom.');
      hasError = true;
    } else {
      setFirstNameError('');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Entre une adresse email valide.');
      hasError = true;
    } else {
      setEmailError('');
    }
    if (hasError) return;
    setSubmitting(true);

    const r = processAlgorithm(answers);
    setResult(r);

    const payload: SubmissionPayload = {
      prenom: firstName,
      email,
      zone: answers.goal === 'pain' ? answers.pain_zone : answers.mob_zone,
      programme: r.prog,
      tag: getProgramTag(r.prog, answers),
      date: new Date().toLocaleDateString('fr-FR'),
      timestamp: Math.floor(Date.now() / 1000),
    };

    const ok = await submitPayload(payload);
    if (ok) {
      localStorage.removeItem(PENDING_SUBMISSION_KEY);
    } else {
      localStorage.setItem(PENDING_SUBMISSION_KEY, JSON.stringify(payload));
    }

    setSubmitting(false);
    nextStep();
  };

  const getReassuranceContent = (): { title: string; paragraphs: string[] } => {
    const dur = answers.pain_duration;
    if (dur === 'u1m') return {
      title: 'Super nouvelle !',
      paragraphs: [
        "Ta douleur est récente, c'est maintenant qu'on peut agir le plus vite.",
        "Le piège ? Se reposer en espérant que ça passe, puis reprendre trop tôt et laisser le problème s'installer.",
        "Si tu commences rapidement avec un plan clair et des exercices adaptés à tes besoins, ça sera bientôt de l'histoire ancienne."
      ]
    };
    if (dur === '1-6m') return {
      title: '',
      paragraphs: [
        "Tu as sûrement déjà essayé des choses - repos, étirements, renfo, peut-être un kiné, adapter tes entraînements. Et pourtant c'est toujours là. Le problème, c'est pas le manque d'efforts - c'est que tu as sûrement fait du bricolage.",
        "Pas besoin de plus d'exercices. Ce qu'il te faut, c'est plan structuré, adapté à tes besoins, qui t'emmène de la douleur à la reprise, étape par étape."
      ]
    };
    return {
      title: '',
      paragraphs: [
        "Kiné, ostéo, repos, renfo, peut-être des infiltrations… et ça revient toujours. On sait, ça peut paraître impossible à résoudre.",
        "Mais si rien n'a marché, c'est pas que ton corps est foutu — c'est que le vrai problème n'a jamais été traité à la racine. Tu n'as pas tout essayé. Tu n'as juste pas encore essayé la bonne approche."
      ]
    };
  };

  const getMobReassurance = () => {
    const sexe = answers.gender === 'homme' ? 'homme' : 'femme';
    const age = ageOptions.find(o => o.id === answers.age)?.label.toLowerCase();
    return `Pour un ${sexe} de ${age}, il te faut un programme pour débloquer ta mobilité, qui cible tes limitations spécifiques et t'aidera à te sentir mieux.`;
  };

  const getSummary = () => {
    const isMob = answers.goal === 'mobility';
    const zoneLabel = isMob
      ? [...mobZones].find(z => z.id === answers.mob_zone)?.label
      : zones.find(z => z.id === answers.pain_zone)?.label;
    const durLabel = isMob
      ? mobDurations.find(d => d.id === answers.mob_duration)?.label
      : painDurations.find(d => d.id === answers.pain_duration)?.label;
    return [
      { label: 'But', val: isMob ? 'Mobilité' : 'Douleur' },
      { label: 'Zone', val: zoneLabel || 'Non spécifiée' },
      { label: 'Depuis', val: durLabel || 'Non spécifiée' },
      { label: 'Motivation', val: `${answers.motivation}/10` }
    ];
  };

  const renderStep = () => {
    switch (stepId) {
      case 1:
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Diagnostic Expert</h2>
              <div className="text-muted-foreground text-sm leading-relaxed space-y-3 mb-6">
                <p>Bienvenue sur notre outil de diagnostic !</p>
                <p>On est trop content de pouvoir t'aider à atteindre tes objectifs 🚀</p>
                <p>Réponds simplement à nos questions pour qu'on te propose le plan le plus adapté à ta problématique du moment.</p>
                <p>Cela te prendra moins de 2 min :)</p>
              </div>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight mb-4 text-balance">Pour commencer, dis-nous si tu es :</h1>
            </div>
            <div className="flex flex-col gap-3">
              <ListCard label="Un Homme" selected={answers.gender === 'homme'} onClick={() => handleSelect('gender', 'homme')} />
              <ListCard label="Une Femme" selected={answers.gender === 'femme'} onClick={() => handleSelect('gender', 'femme')} />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-6 flex flex-col items-center">
              <div className="relative w-full mb-10">
                <img src={moodboardImg} alt="Plus de 5000 sportifs accompagnés par Training Thérapie" className="w-full h-auto object-cover block cut-card" />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-card border border-border shadow-2xl rounded-full pl-3 pr-4 py-2 flex items-center gap-2.5 z-20 whitespace-nowrap">
                  <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                  </svg>
                  <span className="font-futura font-bold text-lg text-foreground leading-none">5.0</span>
                  <div className="flex gap-0.5">
                    {[0,1,2,3,4].map(i => (
                      <svg key={i} className="w-3.5 h-3.5 text-[#FBBF24]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118L10 14.347l-3.366 2.676c-.785.57-1.84-.196-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.65 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"/></svg>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold ml-1">Google</span>
                </div>
              </div>
              <h1 className="text-4xl font-futura font-bold text-foreground text-center uppercase leading-none tracking-tight mb-4">Plus de <span className="text-primary">5 000</span> personnes</h1>
              <p className="text-muted-foreground text-center text-lg leading-tight px-4 font-medium mb-8">ont atteint leur objectif avec Training Thérapie.</p>
            </div>
            <div className="mt-auto">
              <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn">Continuer</button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Profil</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Quel âge as-tu ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {ageOptions.map(o => (
                <ListCard key={o.id} label={o.label} selected={answers.age === o.id} onClick={() => handleSelect('age', o.id)} />
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Objectif</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Quel est ton<br/>objectif n°1 ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              <ListCard label="Me libérer de mes douleurs" selected={answers.goal === 'pain'} onClick={() => handleSelect('goal', 'pain')} />
              <ListCard label="Améliorer ma mobilité" selected={answers.goal === 'mobility'} onClick={() => handleSelect('goal', 'mobility')} />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Engagement</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">À quel point es-tu motivé pour atteindre cet objectif ?</h1>
            </div>
            <BarSelector value={answers.motivation} onSelect={v => update('motivation', v)} confirmLabel="Valider" onConfirm={nextStep} />
          </div>
        );

      // PAIN BRANCH
      case 'pain-why':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-6 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Motivation</h2>
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Pourquoi se libérer de tes douleurs ?</h1>
              <p className="text-muted-foreground text-[10px] mt-2 font-medium italic uppercase tracking-wider">Plusieurs choix possibles</p>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {painWhyOptions.map(r => (
                <MultiSelectCard key={r} label={r} selected={answers.pain_why.includes(r)} onClick={() => toggleMulti('pain_why', r)} />
              ))}
            </div>
            <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn mt-auto">Continuer</button>
          </div>
        );

      case 'pain-zone':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Localisation</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Où as-tu mal ?</h1>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {zones.map(z => (
                <ZoneCard key={z.id} label={z.label} icon={z.icon} image={(z as any).image} selected={answers.pain_zone === z.id} onClick={() => handleSelect('pain_zone', z.id)} />
              ))}
            </div>
          </div>
        );

      case 'pain-subzone':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Précision</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Peux-tu préciser ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {(answers.pain_zone && subzoneConfig[answers.pain_zone] || []).map(sz => (
                <ListCard key={sz.id} label={sz.label} selected={answers.pain_subzone === sz.id} onClick={() => handleSelect('pain_subzone', sz.id)} />
              ))}
            </div>
          </div>
        );

      case 'pain-duration': {
        const zone = zones.find(z => z.id === answers.pain_zone);
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Historique</h2>
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Depuis combien de temps as-tu mal {zone?.qLabel} ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {painDurations.map(d => (
                <ListCard key={d.id} label={d.label} selected={answers.pain_duration === d.id} onClick={() => handleSelect('pain_duration', d.id)} />
              ))}
            </div>
          </div>
        );
      }

      case 'pain-reassurance-zone': {
        const text = getZoneReassuranceText(answers.pain_zone, answers.pain_subzone);
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="relative w-full overflow-hidden cut-card mb-6" style={{ aspectRatio: '4 / 5' }}>
              <img src={reassuranceImg} alt="Bonne nouvelle" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                  <span className="font-futura font-bold uppercase tracking-widest text-xs text-[#10B981]">Bonne nouvelle</span>
                </div>
                <p className="text-primary-foreground text-lg leading-snug font-medium">{text}</p>
              </div>
            </div>
            <div className="mt-auto">
              <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn">Continuer</button>
            </div>
          </div>
        );
      }

      case 'pain-reassurance': {
        const rc = getReassuranceContent();
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-6 flex flex-col items-center">
              <div className="w-full aspect-[16/10] bg-muted cut-card mb-6 overflow-hidden flex items-center justify-center relative">
                <img src={teamReassuranceImg} className="w-full h-full object-cover" alt="L'équipe Training Thérapie" />
              </div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-base mb-4 text-center">+ 5000 sportifs se sont libérés de leur douleur grâce à Training Thérapie.</h2>
              <div className="text-center px-4 space-y-4">
                {rc.title && <h3 className="text-xl font-futura font-bold text-foreground uppercase">{rc.title}</h3>}
                {rc.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-border">
              <p className="text-center text-muted-foreground font-futura font-bold uppercase text-sm mb-4 tracking-widest">Encore 30'' pour être sûr de te proposer le protocole idéal. On continue ?</p>
              <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn shadow-xl shadow-primary/20">Oui, on continue !</button>
            </div>
          </div>
        );
      }

      case 'pain-sport':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Profil</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Quelle est ta pratique sportive ?</h1>
            </div>
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[50vh] pr-1">
              {sports.map(s => (
                <ListCard key={s.id} label={s.label} selected={answers.pain_sport === s.id} onClick={() => handleSelect('pain_sport', s.id)} />
              ))}
            </div>
          </div>
        );

      case 'pain-training':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Capacité</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Quel est ton niveau d'entraînement actuel ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {trainingLevels.map(l => (
                <ListCard key={l.id} label={l.label} selected={answers.pain_training === l.id} onClick={() => handleSelect('pain_training', l.id)} />
              ))}
            </div>
          </div>
        );

      case 'pain-kine':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Expérience</h2>
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">As-tu déjà vu un kinésithérapeute pour cette douleur ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              <ListCard label="Oui" selected={answers.kine === 'yes'} onClick={() => handleSelect('kine', 'yes')} />
              <ListCard label="Non" selected={answers.kine === 'no'} onClick={() => handleSelect('kine', 'no')} />
            </div>
          </div>
        );

      case 'pain-kine-detail':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Précision</h2>
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Qu'as-tu déjà fait chez le kiné ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {kineDetails.map(k => (
                <ListCard key={k.id} label={k.label} selected={answers.kine_detail === k.id} onClick={() => handleSelect('kine_detail', k.id)} />
              ))}
            </div>
          </div>
        );

      case 'pain-gym':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Équipement</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">As-tu accès à une salle de sport ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              <ListCard label="Oui" selected={answers.pain_gym === 'gym'} onClick={() => handleSelect('pain_gym', 'gym')} />
              <ListCard label="Non" selected={answers.pain_gym === 'home'} onClick={() => handleSelect('pain_gym', 'home')} />
            </div>
          </div>
        );

      case 'pain-intensity':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-6 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Intensité</h2>
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Peux-tu noter ton niveau de douleur ?</h1>
            </div>
            <BarSelector value={answers.pain_intensity} onSelect={v => update('pain_intensity', v)} confirmLabel="Continuer" onConfirm={nextStep} />
          </div>
        );

      // MOBILITY BRANCH
      case 'mob-why':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-6 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Motivation</h2>
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Pourquoi c'est important d'améliorer ta mobilité ?</h1>
              <p className="text-muted-foreground text-[10px] mt-2 font-medium italic uppercase tracking-wider">Coche toutes les réponses qui te concernent</p>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {mobWhyOptions.map(r => (
                <MultiSelectCard key={r} label={r} selected={answers.mob_why.includes(r)} onClick={() => toggleMulti('mob_why', r)} />
              ))}
            </div>
            <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn mt-auto">Continuer</button>
          </div>
        );

      case 'mob-reassurance':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="relative w-full aspect-[9/14] bg-muted cut-card overflow-hidden mb-6">
              <img src={answers.gender === 'homme' ? mobilityHeroMaleImg : mobilityHeroImg} className="absolute inset-0 w-full h-full object-cover" alt="Mobilité" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-3">Voici la solution idéale pour toi !</h2>
                <p className="text-sm text-white leading-relaxed font-medium drop-shadow">{getMobReassurance()}</p>
              </div>
            </div>
            <div className="mt-auto pt-4">
              <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn shadow-xl shadow-primary/20">Continuer</button>
            </div>
          </div>
        );

      case 'mob-zone':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Localisation</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Quelle zone travailler en priorité ?</h1>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mobZones.map(z => (
                <div key={z.id} className={z.id === 'unknown' ? 'col-span-2' : ''}>
                  <ZoneCard label={z.label} icon={z.icon} image={(z as any).image} selected={answers.mob_zone === z.id} onClick={() => handleSelect('mob_zone', z.id)} />
                </div>
              ))}
            </div>
          </div>
        );

      case 'mob-duration':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Historique</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">Depuis combien de temps ressens-tu des limitations ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {mobDurations.map(d => (
                <ListCard key={d.id} label={d.label} selected={answers.mob_duration === d.id} onClick={() => handleSelect('mob_duration', d.id)} />
              ))}
            </div>
          </div>
        );

      case 'mob-tried':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-8 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Expérience</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance">As-tu déjà essayé de travailler ta mobilité ?</h1>
            </div>
            <div className="flex flex-col gap-3">
              {mobTriedOptions.map(t => (
                <ListCard key={t.id} label={t.label} selected={answers.mob_tried === t.id} onClick={() => handleSelect('mob_tried', t.id)} />
              ))}
            </div>
          </div>
        );

      case 'mob-blocks':
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            <div className="mb-6 text-center">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-2">Freins</h2>
              <h1 className="text-4xl font-futura font-bold text-foreground uppercase leading-none tracking-tight">Qu'est-ce qui te bloque le plus ?</h1>
              <p className="text-muted-foreground text-[10px] mt-2 font-medium italic uppercase tracking-wider">Plusieurs choix possibles</p>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {mobBlocksOptions.map(b => (
                <MultiSelectCard key={b} label={b} selected={answers.mob_blocks.includes(b)} onClick={() => toggleMulti('mob_blocks', b)} />
              ))}
            </div>
            <button onClick={nextStep} className="w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn mt-auto">Continuer</button>
          </div>
        );

      case 'final-lead': {
        const subzoneAnatomy = answers.pain_zone && answers.pain_subzone
          ? subzoneConfig[answers.pain_zone]?.find(s => s.id === answers.pain_subzone)?.anatomyImage
          : undefined;
        // Si la sous-zone redirige vers une autre zone (ex: tibia + leg_achilles → tendon d'Achille),
        // on utilise l'anatomie de cette zone cible pour rester cohérent avec le programme proposé.
        const remapZoneId =
          answers.pain_zone === 'tibia' && answers.pain_subzone === 'leg_achilles' ? 'achille' :
          answers.pain_zone === 'cheville' && answers.pain_subzone === 'foot_achilles' ? 'achille' :
          answers.pain_zone;
        const anatomy = answers.goal === 'pain'
          ? (subzoneAnatomy ?? zones.find(z => z.id === remapZoneId)?.anatomyImage)
          : (answers.goal === 'mobility' ? zones.find(z => z.id === answers.mob_zone)?.anatomyImage : undefined);
        return (
          <div className="animate-slide-up flex flex-col flex-1">
            {anatomy && (
              <div className="aspect-square w-full bg-secondary cut-card overflow-hidden mb-4">
                <img src={anatomy} alt="Visuel anatomique de la zone douloureuse" className="w-full h-full object-contain" />
              </div>
            )}
            <div className="bg-card p-5 shadow-sm border border-border cut-success mb-6">
              <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-4">Résumé de ton profil</h2>
              <div className="space-y-2.5">
                {getSummary().map(d => (
                  <div key={d.label} className="flex justify-between items-center py-2 border-b border-secondary last:border-0">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{d.label}</span>
                    <span className="font-futura font-bold text-lg text-foreground uppercase">{d.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mb-6">
              <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none mb-2 tracking-tight">Ton diagnostic est prêt.</h1>
              <p className="text-muted-foreground text-sm font-medium leading-tight">Laisse ton email pour le recevoir.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ton prénom"
                value={answers.firstName}
                maxLength={50}
                onChange={e => { update('firstName', e.target.value); setFirstNameError(''); }}
                className={`w-full p-5 border-2 font-futura font-bold text-xl uppercase focus:border-primary outline-none transition-all cut-list bg-card text-foreground ${firstNameError ? 'border-destructive' : 'border-border'}`}
              />
              {firstNameError && <p className="text-destructive text-sm font-medium">{firstNameError}</p>}
              <input
                type="email"
                placeholder="ton-email@exemple.com"
                value={answers.email}
                onChange={e => { update('email', e.target.value); setEmailError(''); }}
                className={`w-full p-5 border-2 font-futura font-bold text-xl uppercase focus:border-primary outline-none transition-all cut-list bg-card text-foreground ${emailError ? 'border-destructive' : 'border-border'}`}
              />
              {emailError && <p className="text-destructive text-sm font-medium">{emailError}</p>}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={`w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn shadow-xl shadow-primary/20 ${submitting ? 'opacity-60 cursor-wait' : ''}`}
              >
                {submitting ? 'Envoi...' : 'Voir mon plan'}
              </button>
            </div>
          </div>
        );
      }

      case 'result':
        if (!result) return null;
        {
          const asset = PROGRAM_MAP[result.prog];
          return (
            <div className="animate-slide-up flex flex-col flex-1">
              <div className="text-center mb-2">
                <h2 className="text-primary font-bold tracking-widest uppercase text-[10px] mb-3">
                  {result.isConsultation ? 'Ta recommandation' : 'Ton protocole'}
                </h2>
                <h1 className="text-3xl font-futura font-bold text-foreground uppercase leading-none tracking-tight text-balance mb-3">
                  {result.isConsultation
                    ? 'Ta situation nécessite une analyse personnalisée'
                    : 'Nous avons identifié le protocole idéal pour toi'}
                </h1>
                {asset?.zoneLabel && (
                  <p className="text-muted-foreground text-base font-medium leading-snug">
                    Voici la solution la plus adaptée pour <span className="text-foreground font-bold">{asset.zoneLabel}</span>.
                  </p>
                )}
              </div>

              {asset?.mockup && (
                <div className="mt-4 mb-2">
                  <img
                    src={asset.mockup}
                    alt={`Mockup du programme ${result.prog}`}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              )}

              {asset?.displayName && (
                <h3 className="text-center font-futura font-bold uppercase text-3xl md:text-4xl tracking-tight text-foreground mt-2 mb-4">
                  {asset.displayName}
                </h3>
              )}

              <ProtocolDetails prog={result.prog} />

              <a
                href={asset?.programUrl ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-5 font-futura font-bold text-primary-foreground text-2xl uppercase bg-primary cut-btn shadow-xl shadow-primary/20 text-center"
              >
                {asset?.ctaLabel ?? 'Accéder au programme'}
              </a>
            </div>
          );
        }

      default:
        return null;
    }
  };

  return (
    <div className="bg-muted min-h-screen flex justify-center selection:bg-primary/10 font-sans">
      <div className="w-full max-w-md bg-background flex flex-col relative shadow-2xl overflow-hidden sm:border-x sm:border-border h-screen sm:h-auto sm:min-h-screen">
        <div className="absolute top-[-10%] right-[-30%] w-[150%] h-[50%] bg-muted opacity-30 origin-bottom-right transform -skew-y-12 pointer-events-none" />

        {/* Header */}
        <header className="flex items-center justify-between p-6 pt-8 relative z-20">
          <button
            onClick={prevStep}
            className="w-10 h-10 flex items-center justify-center text-foreground bg-card shadow-sm border border-border transition-all z-30 cut-back"
            style={{ opacity: currentStep === 1 ? 0 : 1 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <img src="/logo-training-therapie.svg" alt="Training Thérapie" className="h-12 w-auto object-contain" />
          <div className="w-10" />
        </header>

        {/* Progress */}
        <div className="relative z-10 flex w-full gap-1 px-6 mb-8 h-1.5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex-1 overflow-hidden bg-muted cut-progress">
              <div className={`h-full bg-primary transition-all duration-500 transform ${i < currentStep - 1 ? 'translate-x-0' : '-translate-x-full'}`} />
            </div>
          ))}
        </div>

        {/* Content */}
        <main className={`flex-1 px-6 pb-10 ${allowScroll ? 'overflow-y-auto' : 'overflow-y-hidden'} overflow-x-hidden relative z-10 flex flex-col`} key={stepId}>
          {renderStep()}
        </main>
      </div>
    </div>
  );
}
