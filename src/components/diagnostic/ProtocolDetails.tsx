import periostiteStudy1 from '@/assets/periostite-study-1.png';
import periostiteStudy2 from '@/assets/periostite-study-2.png';
import achilleStudy1 from '@/assets/achille-study-1.png';
import achilleStudy2 from '@/assets/achille-study-2.png';
import achilleStudy3 from '@/assets/achille-study-3.png';
import hancheStudy1 from '@/assets/hanche-study-1.webp';
import hancheStudy2 from '@/assets/hanche-study-2.webp';
import hancheStudy3 from '@/assets/hanche-study-3.webp';
import ankleStudy1 from '@/assets/ankle-study-1.webp';
import ankleStudy2 from '@/assets/ankle-study-2.webp';
import ankleStudy3 from '@/assets/ankle-study-3.webp';
import cervicalesStudy1 from '@/assets/cervicales-study-1.webp';
import cervicalesStudy2 from '@/assets/cervicales-study-2.webp';
import cervicalesStudy3 from '@/assets/cervicales-study-3.webp';
import dosStudy1 from '@/assets/dos-study-1.webp';
import dosStudy2 from '@/assets/dos-study-2.webp';
import dosStudy3 from '@/assets/dos-study-3.webp';
import dosRecoveryStudy1 from '@/assets/dos-recovery-study-1.webp';
import dosRecoveryStudy2 from '@/assets/dos-recovery-study-2.webp';
import dosRecoveryStudy3 from '@/assets/dos-recovery-study-3.webp';
import epauleStudy1 from '@/assets/epaule-study-1.webp';
import epauleStudy2 from '@/assets/epaule-study-2.webp';
import epauleStudy3 from '@/assets/epaule-study-3.webp';
import essuieGlaceStudy1 from '@/assets/essuie-glace-study-1.webp';
import essuieGlaceStudy2 from '@/assets/essuie-glace-study-2.webp';
import essuieGlaceStudy3 from '@/assets/essuie-glace-study-3.webp';
import essuieGlaceStudy4 from '@/assets/essuie-glace-study-4.webp';
import patellaireStudy1 from '@/assets/patellaire-study-1.webp';
import patellaireStudy2 from '@/assets/patellaire-study-2.webp';
import patellaireStudy3 from '@/assets/patellaire-study-3.webp';
import patellaireStudy4 from '@/assets/patellaire-study-4.webp';
import tennisElbowStudy1 from '@/assets/tennis-elbow-study-1.webp';
import tennisElbowStudy2 from '@/assets/tennis-elbow-study-2.webp';
import tennisElbowStudy3 from '@/assets/tennis-elbow-study-3.webp';
import mobilityStudy1 from '@/assets/mobility-study-1.webp';
import mobilityStudy2 from '@/assets/mobility-study-2.webp';
import mobilityStudy3 from '@/assets/mobility-study-3.webp';
import genouRecoveryStudy1 from '@/assets/genou-recovery-study-1.webp';
import genouRecoveryStudy2 from '@/assets/genou-recovery-study-2.webp';
import genouRecoveryStudy3 from '@/assets/genou-recovery-study-3.webp';

type ProtocolContent = {
  title: string;
  intro: string;
  paragraphs: { text: string; bold?: string }[];
  images: { src: string; alt: string }[];
  bulletsHeader: string;
  bullets: string[];
  outro: { text: string; bold?: string };
  cta: string;
};

const PROTOCOLS: Record<string, ProtocolContent> = {
  'PROTOCOLE PÉRIOSTITE': {
    title: 'Protocole Périostite',
    intro: "Voici exactement ce qu'il te faut pour t'en sortir avec ta périostite.",
    paragraphs: [
      {
        text: "D'après tes réponses, tu fais clairement partie des gens qui bénéficient le plus d'un protocole structuré comme le nôtre. Et c'est logique : la périostite, ce n'est pas un problème qui disparaît avec du repos… ",
        bold: "C'est un problème de gestion de charge.",
      },
      {
        text: 'La science est très claire : pour ce type de douleur, il faut réintroduire progressivement des contraintes mécaniques adaptées. Ni trop, ni pas assez.',
      },
    ],
    images: [
      { src: periostiteStudy1, alt: "Étude scientifique sur l'entraînement des abducteurs de la hanche" },
      { src: periostiteStudy2, alt: "Étude scientifique sur l'entraînement neuromusculaire" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Une reprise progressive des contraintes liées à la course et des impacts',
      'Des exercices ciblés pour renforcer tibia, mollets et pied (mais pas que)',
      'Une gestion intelligente des volumes pour éviter la rechute',
    ],
    outro: { text: 'Et grâce à ce programme, tu ne vas plus "subir" ta douleur. ', bold: 'Tu vas reprendre le contrôle.' },
    cta: "Si ton objectif est de courir sans douleur et sans rechute, c'est le programme qu'il te faut.",
  },
  "TENDINOPATHIE D'ACHILLE": {
    title: "Tendinopathie d'Achille",
    intro: "Voici la solution la plus adaptée pour ton tendon d'Achille.",
    paragraphs: [
      {
        text: "Ton profil correspond parfaitement à ce programme. Et c'est essentiel, parce qu'une tendinopathie ne se soigne pas avec du repos… ",
        bold: 'mais avec les bonnes contraintes, bien dosées.',
      },
      { text: 'Les études montrent clairement que le renforcement progressif est le traitement le plus efficace pour les tendons.' },
    ],
    images: [
      { src: achilleStudy1, alt: "Étude : quel traitement est le plus efficace pour la tendinopathie d'Achille" },
      { src: achilleStudy2, alt: 'Classement des traitements pour le score VISA-A à 12 mois' },
      { src: achilleStudy3, alt: "Étude : effet des composantes de l'exercice de résistance sur les tendinopathies" },
    ],
    bulletsHeader: 'Dans ce programme, tu retrouves :',
    bullets: [
      'Des exercices spécifiques pour stimuler ton tendon sans aggraver ta tendinite',
      'Une progression précise pour reconstruire sa tolérance à la charge',
      'Un cadre clair pour reprendre le sport en sécurité',
    ],
    outro: { text: 'Tu ne fais plus les choses "au hasard". ', bold: 'Tu suis une vraie logique.' },
    cta: "Si tu veux retrouver un tendon solide et reprendre le sport sans douleur, c'est le programme qu'il te faut.",
  },
  'HANCHE RECOVERY': {
    title: 'Hanche Recovery',
    intro: "Voici exactement ce qu'il te faut pour ta hanche.",
    paragraphs: [
      {
        text: "D'après tes réponses, ton profil correspond parfaitement à notre programme HANCHE RECOVERY. Et c'est logique : la hanche est une zone clé, souvent mal prise en charge, avec des exercices trop généraux ou mal adaptés.",
      },
      {
        text: 'La science est claire : pour diminuer la douleur et retrouver une hanche fonctionnelle, il faut travailler à la fois la ',
        bold: 'mobilité, la force et le contrôle.',
      },
    ],
    images: [
      { src: hancheStudy1, alt: 'Résumé : objectifs centraux de la rééducation pour le FAIS' },
      { src: hancheStudy2, alt: 'Étude : approches thérapeutiques pour le syndrome fémoro-acétabulaire' },
      { src: hancheStudy3, alt: 'Conclusion : la prise en charge non opératoire reste le traitement de première intention' },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices ciblés pour renforcer les muscles clés de la hanche',
      "Une progression pour récupérer de l'amplitude sans douleur",
      'Un travail précis pour améliorer le contrôle dans tes mouvements',
    ],
    outro: {
      text: 'Avec ce programme, tu ne fais plus juste des exercices pour "bouger" au hasard… ',
      bold: 'tu reconstruis une hanche solide et fonctionnelle.',
    },
    cta: "Si tu veux retrouver une hanche mobile, stable et sans douleur, c'est le programme qu'il te faut.",
  },
  'PROTOCOLE DOS SANS DOULEUR': {
    title: 'Dos Sans Douleur',
    intro: "Voici exactement ce qu'il te faut pour ton dos.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre protocole DOS SANS DOULEUR. Et c'est essentiel, parce que dans la majorité des cas, le mal de dos ne se règle pas avec du repos… ", bold: 'mais avec du mouvement adapté.' },
      { text: 'La science est très claire : rester actif et renforcer progressivement est la clé pour sortir durablement de la douleur.' },
    ],
    images: [
      { src: dosStudy1, alt: "Étude : effet de l'entraînement à domicile chez les patients souffrant de lombalgies non spécifiques" },
      { src: dosStudy2, alt: "Méta-analyse : effet de l'exercice à domicile sur la douleur et la limitation fonctionnelle" },
      { src: dosStudy3, alt: "Conclusion : l'entraînement par exercices est plus efficace que les traitements manuels" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices simples et progressifs pour relancer ton dos',
      'Une approche rassurante pour bouger sans appréhension',
      'Une progression adaptée pour reprendre confiance dans tes mouvements',
    ],
    outro: { text: 'Avec ce programme, tu ne vas plus éviter les mouvements qui te font mal… ', bold: 'tu vas réapprendre à les maîtriser.' },
    cta: "Si tu veux reprendre tes activités sans douleur ni blocage, c'est le programme qu'il te faut.",
  },
  'DOS RECOVERY': {
    title: 'Dos Recovery',
    intro: "Voici exactement ce qu'il te faut pour reconstruire ton dos.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre programme DOS RECOVERY. Et c'est logique : à ce stade, l'objectif n'est plus seulement de soulager… ", bold: 'mais de renforcer durablement.' },
      { text: 'La science le montre : un dos plus fort, c\'est un dos plus résistant aux contraintes et aux douleurs.' },
    ],
    images: [
      { src: dosRecoveryStudy1, alt: "Étude : recommandations européennes basées sur les preuves pour le mal de dos et les cervicalgies" },
      { src: dosRecoveryStudy2, alt: "Conclusion : l'entraînement par exercices est plus efficace que les traitements manuels" },
      { src: dosRecoveryStudy3, alt: "Cochrane : la thérapie par exercices pour les lombalgies chroniques" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Un renforcement progressif et structuré de tout le tronc',
      "Une montée en charge contrôlée pour améliorer ta tolérance à l'effort",
      "Une reprise progressive d'exercices plus exigeants",
    ],
    outro: { text: 'Avec ce programme, tu ne fais pas que "gérer" tes douleurs au dos… ', bold: 'tu construis un dos capable d\'encaisser, durablement.' },
    cta: "Si tu veux un dos solide, sur le long terme, et prêt à reprendre le sport, c'est le programme qu'il te faut.",
  },
  'ÉPAULE RECOVERY': {
    title: 'Épaule Recovery',
    intro: "Voici exactement ce qu'il te faut pour ton épaule.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre programme ÉPAULE RECOVERY. Et c'est essentiel, parce que l'épaule a besoin de mouvement et de contrôle… ", bold: "pas d'immobilisation prolongée." },
      { text: "Les études sont très claires : les exercices sont le traitement principal des douleurs d'épaule." },
    ],
    images: [
      { src: epauleStudy1, alt: "Étude : exercices supervisés vs exercices à domicile pour les ruptures partielles de la coiffe des rotateurs" },
      { src: epauleStudy2, alt: "Résultats : amélioration significative dans les deux groupes après traitement par exercices" },
      { src: epauleStudy3, alt: "Revue : l'exercice est un composant central de la prise en charge non opératoire des tendinopathies de la coiffe" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices ciblés pour renforcer les muscles stabilisateurs',
      'Une progression adaptée pour récupérer de la mobilité sans aggraver la douleur',
      'Un travail précis pour améliorer le contrôle de ton épaule',
    ],
    outro: { text: 'Avec ce programme, tu ne fais pas que calmer la douleur… ', bold: 'tu reconstruis une épaule fonctionnelle.' },
    cta: "Si tu veux retrouver une épaule forte et utilisable à 100% lors de ta pratique sportive (mais aussi au quotidien), c'est le programme qu'il te faut.",
  },
  'GENOU RECOVERY': {
    title: 'Genou Recovery',
    intro: "Voici exactement ce qu'il te faut pour ton genou.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre programme GENOU RECOVERY. Et c'est logique : un genou douloureux est souvent un genou qui manque de capacité à encaisser les contraintes." },
      { text: 'La science est très claire : le renforcement progressif est la base pour traiter durablement les douleurs du genou.' },
    ],
    images: [
      { src: genouRecoveryStudy1, alt: "Étude : effets du renforcement fonctionnel sur la douleur, la fonction et la biomécanique des membres inférieurs chez les patients atteints du syndrome fémoro-patellaire" },
      { src: genouRecoveryStudy2, alt: "IRM avant/pendant intervention : régression progressive de la tendinopathie patellaire avec exercices de renforcement progressifs" },
      { src: genouRecoveryStudy3, alt: "Résultats : bénéfice cliniquement pertinent des exercices de mise en charge progressive du tendon par rapport aux exercices excentriques douloureux" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices ciblés pour renforcer quadriceps, ischios et fessiers (mais pas que)',
      'Une progression structurée pour améliorer la stabilité du genou',
      'Une reprise progressive des contraintes du quotidien et du sport',
    ],
    outro: { text: 'Avec ce programme, tu ne fais plus attention à éviter la douleur… ', bold: 'tu rends ton genou plus fort.' },
    cta: "Si tu veux retrouver un genou solide et fiable dans toutes tes activités, c'est le programme qu'il te faut.",
  },
  'PROTOCOLE ESSUIE-GLACE': {
    title: "Protocole Essuie-Glace",
    intro: "Voici exactement ce qu'il te faut pour ton syndrome de l'essuie-glace.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre protocole ultra-spécifique pour le syndrome de l'essuie-glace. Et c'est essentiel, parce que ce type de douleur nécessite une approche précise, ", bold: 'pas des exercices au hasard.' },
      { text: 'La science le montre : il faut agir sur les contraintes mécaniques et améliorer la capacité des tissus à les encaisser.' },
    ],
    images: [
      { src: essuieGlaceStudy1, alt: "Étude : effets des stratégies de traitement conservateur du syndrome de la bandelette ilio-tibiale chez les coureurs" },
      { src: essuieGlaceStudy2, alt: "Évolution de la douleur selon les différentes stratégies de traitement" },
      { src: essuieGlaceStudy3, alt: "Conclusion : les exercices de renforcement des abducteurs de hanche sont efficaces pour réduire la douleur et améliorer la fonction" },
      { src: essuieGlaceStudy4, alt: "Comparaison de la flexibilité de la bandelette ilio-tibiale et de l'échelle visuelle analogique" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Un renforcement ciblé pour améliorer le contrôle hanche/genou',
      'Une correction progressive des facteurs qui provoquent la douleur',
      'Une reprise encadrée des contraintes liées à la course au pied ou au vélo',
    ],
    outro: { text: 'Avec ce programme, tu ne fais pas que soulager la douleur… ', bold: 'tu traites le problème à la source.' },
    cta: "Si tu veux reprendre la course sans douleur et sans rechute, c'est le programme qu'il te faut.",
  },
  'TENDINOPATHIE PATELLAIRE': {
    title: 'Tendinopathie Patellaire',
    intro: "Voici exactement ce qu'il te faut pour ton tendon rotulien.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre programme de remise en charge progressive. Et c'est logique : ", bold: 'un tendon a besoin d\'être chargé pour se reconstruire.' },
      { text: 'Les études sont très claires : les exercices isométriques, puis lourds et lents, avec un retour progressif vers la pliométrie, c\'est ça qui te soigne vraiment.' },
    ],
    images: [
      { src: patellaireStudy1, alt: "Étude : stress relaxation et nutrition ciblée pour traiter la tendinopathie patellaire" },
      { src: patellaireStudy2, alt: "IRM : régression progressive de la tendinopathie patellaire suite à l'intervention" },
      { src: patellaireStudy3, alt: "Étude : efficacité de la mise en charge progressive du tendon chez les patients atteints de tendinopathie patellaire" },
      { src: patellaireStudy4, alt: "Résultats : la mise en charge progressive du tendon est plus efficace que les exercices excentriques douloureux" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices spécifiques pour charger ton tendon de manière progressive',
      'Une progression structurée pour améliorer sa tolérance à la contrainte',
      'Une reprise des sauts et des changements de direction bien encadrée, avec des efforts de plus en plus explosifs',
    ],
    outro: { text: 'Avec ce programme, tu ne contournes plus la douleur… ', bold: 'tu rends ton tendon plus fort, et tu en finis avec des mois de galères.' },
    cta: "Si tu veux retrouver un genou capable d'encaisser les contraintes sans douleur, c'est le programme qu'il te faut.",
  },
  'PROTOCOLE ANKLE THERAPIE': {
    title: 'Ankle Therapie',
    intro: "Voici exactement ce qu'il te faut après ton entorse de cheville.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre programme de rehab complet pour ta cheville. Et c'est essentiel, parce qu'une entorse mal rééduquée… ", bold: "c'est une entorse qui revient." },
      { text: 'La science est claire : mobilité, renforcement et (vraie) proprioception sont indispensables pour éviter les récidives.' },
    ],
    images: [
      { src: ankleStudy1, alt: "Étude : la rééducation par exercices réduit les récidives après entorse de cheville" },
      { src: ankleStudy2, alt: "Conclusion : la rééducation réduit de 40% le risque de récidive d'entorse" },
      { src: ankleStudy3, alt: "Étude : entorse de cheville aiguë chez les athlètes élites" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Un travail progressif pour récupérer ta mobilité',
      'Des exercices ciblés pour renforcer ta cheville',
      'Un travail de proprioception pour améliorer ta stabilité et le contrôle de ta cheville',
    ],
    outro: { text: 'Avec ce programme, tu ne fais pas que récupérer plus rapidement… ', bold: 'tu sécurises ta cheville sur le long terme.' },
    cta: "Si tu veux éviter les récidives et retrouver confiance dans tes appuis, c'est le programme qu'il te faut.",
  },
  'PROTOCOLE TENNIS ELBOW': {
    title: 'Protocole Tennis Elbow',
    intro: "Voici exactement ce qu'il te faut pour ton coude.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à une tendinopathie des épicondyliens. Et comme pour tous les tendons, la clé, ce n'est pas le repos… ", bold: "c'est le bon dosage de contraintes." },
      { text: 'Les études montrent clairement que le renforcement progressif est le traitement le plus efficace pour cette douleur.' },
    ],
    images: [
      { src: tennisElbowStudy1, alt: "Revue systématique et méta-analyse : les effets bénéfiques de l'exercice excentrique dans la prise en charge de la tendinopathie latérale du coude" },
      { src: tennisElbowStudy2, alt: "Résultats : régression plus rapide de la douleur et meilleure progression de la force musculaire avec l'exercice excentrique" },
      { src: tennisElbowStudy3, alt: "Forest plots : effets de l'exercice excentrique vs autres exercices sur la douleur, la force et la fonction" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices spécifiques pour charger progressivement les tendons',
      'Une progression adaptée pour diminuer la douleur',
      "Un travail ciblé pour retrouver de la force dans l'avant-bras",
      "Et du testing pour être sûr que ta douleur provient bien de ton avant-bras… et pas d'autre chose",
    ],
    outro: { text: 'Avec ce programme, tu ne fais pas que soulager la douleur… ', bold: 'tu traites la cause du problème.' },
    cta: "Si tu veux utiliser ton bras sans douleur au quotidien ou au sport, c'est le programme qu'il te faut.",
  },
  'PROTOCOLE CERVICALES': {
    title: 'Cou Sans Douleur',
    intro: "Voici exactement ce qu'il te faut pour ton cou.",
    paragraphs: [
      { text: "D'après tes réponses, ton profil correspond parfaitement à notre programme COU SANS DOULEUR. Et c'est logique : les douleurs cervicales sont souvent liées à un manque de mouvement, de force et de stabilité." },
      { text: 'La science est claire : bouger et renforcer ton cou (mais pas que) est essentiel pour diminuer durablement les douleurs.' },
    ],
    images: [
      { src: cervicalesStudy1, alt: "Étude : effets des différents types d'exercices sur la douleur cervicale chronique" },
      { src: cervicalesStudy2, alt: "Étude : effets de l'exercice sur la fonction neuromusculaire en cas de douleur cervicale chronique" },
      { src: cervicalesStudy3, alt: "Méta-analyse : l'exercice favorise la diminution des douleurs cervicales" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Des exercices pour améliorer ta mobilité cervicale',
      'Un travail ciblé pour renforcer les muscles profonds',
      'Une progression pour diminuer les tensions et les douleurs',
      'Et un testing qui te permet de personnaliser le programme',
    ],
    outro: { text: 'Avec ce programme, tu ne subis plus tes douleurs au quotidien… ', bold: 'tu reprends le contrôle de ton cou.' },
    cta: "Si tu veux retrouver un cou mobile et sans douleur, c'est le programme qu'il te faut.",
  },
  'PROTOCOLE MOBILITY SPECIALIST': {
    title: 'Mobility Specialist',
    intro: "Voici exactement ce qu'il te faut pour améliorer ta mobilité.",
    paragraphs: [
      { text: "D'après tes réponses, tu fais partie des profils qui ont besoin de développer leur amplitude articulaire et leur contrôle du mouvement. Et c'est un levier énorme de progression dans tous les sports (et même pour ta longévité)." },
      { text: 'La science le montre : une bonne mobilité permet de mieux bouger, mieux performer et même limiter le risque de blessure (car tu es plus fort, donc plus tolérant).' },
    ],
    images: [
      { src: mobilityStudy1, alt: "Étude : effets de 8 semaines de stretching ou de renforcement sur la force, l'épaisseur musculaire et l'amplitude" },
      { src: mobilityStudy2, alt: "Tableau : amélioration de la force, de l'épaisseur musculaire et de l'amplitude après 8 semaines" },
      { src: mobilityStudy3, alt: "Étude : effets des étirements postérieurs sur la mobilité, la douleur et la fonction de l'épaule" },
    ],
    bulletsHeader: "Et c'est exactement ce que tu retrouves ici :",
    bullets: [
      'Un travail structuré de mobilité active',
      'Des exercices pour gagner en amplitude utile',
      'Une progression pour améliorer la qualité de tes mouvements',
    ],
    outro: { text: 'Avec ce programme, tu ne fais pas que t\'assouplir… ', bold: 'tu développes un vrai contrôle de ton corps.' },
    cta: "Si tu veux mieux bouger, performer plus longtemps et prévenir les potentielles douleurs, c'est le programme qu'il te faut.",
  },
  'CONSULTATION INDIVIDUELLE': {
    title: 'Consultation Bilan',
    intro: "D'après tes réponses, ta situation semble plus spécifique qu'un simple programme standard.",
    paragraphs: [
      { text: "Et c'est totalement normal : certaines douleurs nécessitent une analyse plus précise pour identifier ce qui entretient réellement le problème." },
      { text: "Dans beaucoup de cas, elle peut être influencée par plusieurs facteurs : manque de mobilité, déficit de force, surcharge, technique de mouvement, reprise trop rapide, historique de blessure, gestion de l'entraînement, mode de vie, etc." },
      { text: "C'est justement pour ça qu'", bold: 'un regard extérieur spécialisé peut faire toute la différence.' },
    ],
    images: [],
    bulletsHeader: 'Lors de cette consultation bilan, un diplômé de kinésithérapie analysera précisément ta situation afin de :',
    bullets: [
      "Comprendre l'origine probable de tes douleurs",
      'Identifier les facteurs qui entretiennent le problème',
      'Évaluer tes mouvements, tes capacités et tes contraintes',
      'Te proposer le protocole le plus adapté à TON cas',
      'Construire une stratégie claire et progressive pour la suite',
    ],
    outro: { text: 'L\'objectif n\'est pas simplement de "mettre du repos" ou de masquer les symptômes… ', bold: 'mais de comprendre pourquoi ton corps réagit comme ça et comment régler durablement le problème.' },
    cta: "Si tu veux une analyse claire et un plan adapté à TA situation, cette consultation est faite pour toi.",
  },
};

export default function ProtocolDetails({ prog }: { prog: string }) {
  const content = PROTOCOLS[prog];
  if (!content) return null;

  return (
    <div className="mt-8 bg-card border border-border p-6 cut-list space-y-5">
      <p className="text-foreground font-semibold">{content.intro}</p>
      {content.paragraphs.map((p, i) => (
        <p key={i} className="text-muted-foreground text-sm leading-relaxed">
          {p.text}
          {p.bold && <span className="font-bold text-foreground">{p.bold}</span>}
        </p>
      ))}
      <div className="space-y-3">
        {content.images.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="w-full border border-border" />
        ))}
      </div>
      <p className="text-foreground font-semibold">{content.bulletsHeader}</p>
      <ul className="space-y-2">
        {content.bullets.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted-foreground">
            <span className="flex-shrink-0 w-5 h-5 mt-0.5 bg-primary/10 text-primary flex items-center justify-center cut-hexagon">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {content.outro.text}
        {content.outro.bold && <span className="font-bold text-foreground">{content.outro.bold}</span>}
      </p>
      <div className="p-4 border-l-4 border-primary bg-secondary">
        <p className="text-foreground font-futura font-bold uppercase text-lg leading-tight">{content.cta}</p>
      </div>
    </div>
  );
}
