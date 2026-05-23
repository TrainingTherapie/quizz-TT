import achilleMockup from '@/assets/mockups/achille.webp';
import periostiteMockup from '@/assets/mockups/periostite.webp';
import sfpMockup from '@/assets/mockups/sfp.webp';
import ankleMockup from '@/assets/mockups/ankle.webp';
import cervicalesMockup from '@/assets/mockups/cervicales.webp';
import dosMockup from '@/assets/mockups/dos.webp';
import dosRecoveryMockup from '@/assets/mockups/dos-recovery.webp';
import epauleMockup from '@/assets/mockups/epaule.webp';
import essuieGlaceMockup from '@/assets/mockups/essuie-glace.webp';
import hancheMockup from '@/assets/mockups/hanche.webp';
import patellaireMockup from '@/assets/mockups/patellaire.webp';
import tennisElbowMockup from '@/assets/mockups/tennis-elbow.webp';
import genouRecoveryMockup from '@/assets/mockups/genou-recovery.webp';
import consultationMockup from '@/assets/mockups/consultation.webp';
import mobilityMockup from '@/assets/mockups/mobility.webp';

export type ProgramAsset = {
  mockup?: string;
  zoneLabel?: string;
  programUrl?: string;
  displayName?: string;
  ctaLabel?: string;
};

const UTM = '?utm_source=google&utm_medium=organic&utm_campaign=quizz&utm_content=quizz';

export const PROGRAM_MAP: Record<string, ProgramAsset> = {
  "TENDINOPATHIE D'ACHILLE": {
    mockup: achilleMockup,
    zoneLabel: "ton tendon d'Achille",
    programUrl: `https://by.training-therapie.fr/tendinopathie-achille${UTM}`,
    displayName: "Tendinopathie d'Achille",
  },
  "PROTOCOLE PÉRIOSTITE": {
    mockup: periostiteMockup,
    zoneLabel: "ta périostite",
    programUrl: `https://by.training-therapie.fr/periostite${UTM}`,
    displayName: 'Protocole Périostite',
  },
  "SYNDROME FEMORO-PATELLAIRE": {
    mockup: sfpMockup,
    zoneLabel: "ton genou",
    programUrl: `https://by.training-therapie.fr/syndrome-femoro-patellaire${UTM}`,
    displayName: 'Syndrome Fémoro-Patellaire',
  },
  "PROTOCOLE ANKLE THERAPIE": {
    mockup: ankleMockup,
    zoneLabel: "ta cheville",
    programUrl: `https://by.training-therapie.fr/ankle-therapie${UTM}`,
    displayName: 'Ankle Therapie',
  },
  "PROTOCOLE CERVICALES": {
    mockup: cervicalesMockup,
    zoneLabel: "ton cou",
    programUrl: `https://by.training-therapie.fr/cou-sans-douleur${UTM}`,
    displayName: 'Cou Sans Douleur',
  },
  "PROTOCOLE DOS SANS DOULEUR": {
    mockup: dosMockup,
    zoneLabel: "ton dos",
    programUrl: `https://by.training-therapie.fr/dos-sans-douleur${UTM}`,
    displayName: 'Dos Sans Douleur',
  },
  "DOS RECOVERY": {
    mockup: dosRecoveryMockup,
    zoneLabel: "ton dos",
    programUrl: `https://by.training-therapie.fr/back-strength${UTM}`,
    displayName: 'Dos Recovery',
  },
  "ÉPAULE RECOVERY": {
    mockup: epauleMockup,
    zoneLabel: "ton épaule",
    programUrl: `https://by.training-therapie.fr/shoulder-strength${UTM}`,
    displayName: 'Épaule Recovery',
  },
  "PROTOCOLE ESSUIE-GLACE": {
    mockup: essuieGlaceMockup,
    zoneLabel: "ton genou",
    programUrl: `https://by.training-therapie.fr/syndrome-essuie-glace${UTM}`,
    displayName: 'Protocole Essuie-Glace',
  },
  "HANCHE RECOVERY": {
    mockup: hancheMockup,
    zoneLabel: "ta hanche",
    programUrl: `https://by.training-therapie.fr/hip-strength${UTM}`,
    displayName: 'Hanche Recovery',
  },
  "TENDINOPATHIE PATELLAIRE": {
    mockup: patellaireMockup,
    zoneLabel: "ton tendon rotulien",
    programUrl: `https://by.training-therapie.fr/tendinopathie-patellaire${UTM}`,
    displayName: 'Tendinopathie Patellaire',
  },
  "GENOU RECOVERY": {
    mockup: genouRecoveryMockup,
    zoneLabel: "ton genou",
    programUrl: `https://by.training-therapie.fr/knee-strength${UTM}`,
    displayName: 'Genou Recovery',
  },
  "PROTOCOLE TENNIS ELBOW": {
    mockup: tennisElbowMockup,
    zoneLabel: "ton coude",
    programUrl: `https://by.training-therapie.fr/tennis-elbow${UTM}`,
    displayName: 'Protocole Tennis Elbow',
  },
  "PROTOCOLE MOBILITY SPECIALIST": {
    mockup: mobilityMockup,
    zoneLabel: "ta mobilité",
    programUrl: `https://by.training-therapie.fr/protocole-mobility-specialist${UTM}`,
    displayName: 'Mobility Specialist',
  },
  "CONSULTATION INDIVIDUELLE": {
    mockup: consultationMockup,
    zoneLabel: "ta situation",
    programUrl: `https://by.training-therapie.fr/consultation-bilan${UTM}`,
    displayName: 'Consultation Bilan',
    ctaLabel: 'Prendre RDV',
  },
};
