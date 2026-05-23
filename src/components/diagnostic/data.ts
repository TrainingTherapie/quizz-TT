export const colorsGradient = ["#10B981", "#34D399", "#A7F3D0", "#FDE68A", "#FBBF24", "#F59E0B", "#F97316", "#EA580C", "#D8232A", "#991B1B"];

export const ageOptions = [
  { id: 'u25', label: 'Moins de 25 ans' },
  { id: '25-35', label: '25-35 ans' },
  { id: '35-45', label: '35-45 ans' },
  { id: 'o45', label: 'Plus de 45 ans' }
];

import zoneDos from '@/assets/zones/zone-dos.png';
import zoneHanche from '@/assets/zones/zone-hanche.png';
import zoneAchille from '@/assets/zones/zone-achille.png';
import zoneCervicales from '@/assets/zones/zone-cervicales.png';
import zoneCheville from '@/assets/zones/zone-cheville.png';
import zoneCoude from '@/assets/zones/zone-coude.png';
import zoneEpaule from '@/assets/zones/zone-epaule.png';
import zoneGenou from '@/assets/zones/zone-genou.png';
import zoneTibia from '@/assets/zones/zone-tibia.png';

import anatomyDos from '@/assets/zones-anatomy/dos.webp';
import anatomyEpaule from '@/assets/zones-anatomy/epaule.webp';
import anatomyAchille from '@/assets/zones-anatomy/achille.webp';
import anatomyHanche from '@/assets/zones-anatomy/hanche.webp';
import anatomyCervicales from '@/assets/zones-anatomy/cervicales.webp';
import anatomyCoude from '@/assets/zones-anatomy/coude.webp';
import anatomyCheville from '@/assets/zones-anatomy/cheville.webp';
import anatomyTibia from '@/assets/zones-anatomy/tibia.webp';
import anatomyGenou from '@/assets/zones-anatomy/genou.webp';
import anatomyGenouExt from '@/assets/zones-anatomy/genou-ext.webp';
import anatomyGenouRotulien from '@/assets/zones-anatomy/genou-rotulien.webp';

export const zones: { id: string; label: string; qLabel: string; icon: string; image: string; anatomyImage?: string }[] = [
  { id: 'dos', label: 'Dos/Lombaires', qLabel: 'au dos', icon: 'M4 6h16M4 12h16M4 18h16', image: zoneDos, anatomyImage: anatomyDos },
  { id: 'epaule', label: 'Épaule', qLabel: "à l'épaule", icon: 'M13 10V3L4 14h7v7l9-11h-7z', image: zoneEpaule, anatomyImage: anatomyEpaule },
  { id: 'achille', label: "Tendon d'Achille", qLabel: "au tendon d'Achille", icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', image: zoneAchille, anatomyImage: anatomyAchille },
  { id: 'genou', label: 'Genou', qLabel: 'au genou', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', image: zoneGenou, anatomyImage: anatomyGenou },
  { id: 'hanche', label: 'Hanche', qLabel: 'à la hanche', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', image: zoneHanche, anatomyImage: anatomyHanche },
  { id: 'tibia', label: 'Tibia/Mollet', qLabel: 'au tibia', icon: 'M12 1v22M17 5H7', image: zoneTibia, anatomyImage: anatomyTibia },
  { id: 'cervicales', label: 'Cervicales', qLabel: 'aux cervicales', icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z', image: zoneCervicales, anatomyImage: anatomyCervicales },
  { id: 'coude', label: 'Coude', qLabel: 'au coude', icon: 'M15 14l-2 2-3-3 2-2 3 3z', image: zoneCoude, anatomyImage: anatomyCoude },
  { id: 'cheville', label: 'Cheville/Pied', qLabel: 'à la cheville', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', image: zoneCheville, anatomyImage: anatomyCheville }
];

export const painWhyOptions = [
  "M'entraîner sans douleur/sans craintes",
  "Reprendre le sport pleinement",
  "Améliorer ma qualité de vie",
  "Éviter que les blessures reviennent",
  "Retrouver une vie quotidienne normale",
  "Performer / atteindre mes objectifs",
  "Me sentir moins stressé / plus heureux",
  "Améliorer ma santé articulaire"
];

export const sports = [
  { id: 'runner', label: 'Course à pied/Trail' },
  { id: 'force', label: 'Force/Musculation/Crossfit' },
  { id: 'hybrid', label: 'Hybride (course/muscu)' },
  { id: 'sport_co', label: 'Sport Co' },
  { id: 'combat', label: 'Sport de combat' },
  { id: 'swim', label: 'Natation' },
  { id: 'bike', label: 'Cyclisme/Vélo' },
  { id: 'triathlon', label: 'Triathlon' },
  { id: 'none', label: 'Sédentaire' },
  { id: 'racket', label: 'Tennis / Padel / Badminton' }
];

export const trainingLevels = [
  { id: 'normal', label: "Je m'entraîne normalement malgré la douleur" },
  { id: 'reduced', label: "J'ai réduis mes entraînements, et n'ose pas me donner à fond" },
  { id: 'stopped', label: "J'ai arrêté complètement" },
  { id: 'stop_never', label: "Je n'ai jamais pu reprendre" }
];

export const subzoneConfig: Record<string, { id: string; label: string; anatomyImage?: string }[]> = {
  genou: [
    { id: 'knee_ext', label: 'Côté extérieur du genou', anatomyImage: anatomyGenouExt },
    { id: 'knee_pat', label: 'Sous la rotule', anatomyImage: anatomyGenouRotulien },
    { id: 'knee_rot', label: 'Autour/derrière', anatomyImage: anatomyGenou },
    { id: 'knee_unknown', label: 'Je ne sais pas trop', anatomyImage: anatomyGenou }
  ],
  cheville: [
    { id: 'foot_sole', label: 'Sous le pied' },
    { id: 'foot_top', label: 'Dessus du pied' },
    { id: 'foot_achilles', label: "Tendon d'Achille" },
    { id: 'foot_unknown', label: 'Je ne sais pas trop' },
    { id: 'foot_sprain', label: "C'est une entorse" }
  ],
  tibia: [
    { id: 'leg_achilles', label: "Tendon d'Achille" },
    { id: 'leg_calf', label: 'Derrière, en plein sur le mollet' },
    { id: 'leg_shin', label: 'Devant, au niveau du tibia' }
  ],
  coude: [
    { id: 'elbow_inner', label: 'Côté interne du coude' },
    { id: 'elbow_outer', label: 'Côté externe du coude' }
  ]
};

export const painDurations = [
  { id: 'u1m', label: 'Moins de 1 mois' },
  { id: '1-6m', label: '1 à 6 mois' },
  { id: 'o6m', label: 'Plus de 6 mois' },
  { id: 'years', label: 'Des années que je galère…' }
];

export const mobWhyOptions = [
  "Bouger mieux au quotidien",
  "Me sentir moins raide/moins limité",
  "Progresser dans ma pratique sportive",
  "Décupler ma liberté de mouvement",
  "Améliorer ma qualité de vie",
  "Prévenir les blessures",
  "Améliorer ma santé articulaire"
];

export const mobTriedOptions = [
  { id: 'beginner', label: 'Non, je débute tout juste.' },
  { id: 'occasional', label: 'Oui, quelques exercices par ci par là' },
  { id: 'hard', label: 'Oui je le travaille dur mais je progresse peu' }
];

export const mobBlocksOptions = [
  "Je n'ai pas de programme clair",
  "Je ne sais pas si les exercices que je fais sont vraiment efficaces",
  "Le manque de temps",
  "Je suis trop irrégulier",
  "Peur de mal faire",
  "Autre chose"
];

export const mobDurations = [
  { id: 'u3m', label: 'Moins de 3 mois' },
  { id: '3-6m', label: '3 à 6 mois' },
  { id: '6-12m', label: '6 à 12 mois' },
  { id: 'o1y', label: 'Plus de 1 an' }
];

export const kineDetails = [
  { id: 'active', label: 'Exercices ciblés' },
  { id: 'passive', label: 'Massages, électros, passifs' }
];

export const mobZones = [
  { id: 'corps', label: 'Ensemble du corps', icon: 'M4 6h16M4 12h16M4 18h16' },
  ...zones.filter(z => ['hanche', 'epaule', 'dos', 'genou', 'cheville'].includes(z.id)),
  { id: 'unknown', label: 'Je ne sais pas trop encore', icon: 'M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
];

export const stepsPain = [1, 2, 3, 4, 5, 'pain-why', 'pain-zone', 'pain-subzone', 'pain-reassurance-zone', 'pain-duration', 'pain-reassurance', 'pain-sport', 'pain-training', 'pain-kine', 'pain-kine-detail', 'pain-gym', 'pain-intensity', 'final-lead', 'result'] as const;
export const stepsMob = [1, 2, 3, 4, 5, 'mob-why', 'mob-reassurance', 'mob-zone', 'mob-duration', 'mob-tried', 'mob-blocks', 'final-lead', 'result'] as const;

export type StepId = (typeof stepsPain)[number] | (typeof stepsMob)[number];

export interface Answers {
  gender: string | null;
  age: string | null;
  goal: string | null;
  motivation: number;
  pain_why: string[];
  pain_zone: string | null;
  pain_subzone: string | null;
  pain_duration: string | null;
  pain_sport: string | null;
  pain_training: string | null;
  pain_gym: string | null;
  pain_intensity: number;
  kine: string | null;
  kine_detail: string | null;
  mob_why: string[];
  mob_zone: string | null;
  mob_duration: string | null;
  mob_tried: string | null;
  mob_blocks: string[];
  email: string;
  firstName: string;
}

export const defaultAnswers: Answers = {
  gender: null, age: null, goal: null, motivation: 0,
  pain_why: [], pain_zone: null, pain_subzone: null, pain_duration: null, pain_sport: null, pain_training: null, pain_gym: null, pain_intensity: 0, kine: null, kine_detail: null,
  mob_why: [], mob_zone: null, mob_duration: null, mob_tried: null, mob_blocks: [],
  email: '', firstName: ''
};
