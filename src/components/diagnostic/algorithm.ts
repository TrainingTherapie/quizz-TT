import { Answers, zones } from './data';

export function processAlgorithm(answers: Answers): { prog: string; msg: string; isConsultation: boolean } {
  const z = answers.pain_zone;
  const gym = answers.pain_gym === 'gym';
  const recoveryEligible = answers.pain_sport === 'force' || answers.pain_sport === 'hybrid';
  const sub = answers.pain_subzone;
  const pain = answers.pain_intensity;
  const dur = answers.pain_duration;
  const rehab = answers.kine;
  const rehab_detail = answers.kine_detail;
  const train = answers.pain_training;

  let prog = "PROTOCOLE PERSONNALISÉ";
  let msg = "Nous avons identifié votre protocole idéal :";

  const needsConsultation = (pain >= 8) || (dur === 'years') || (rehab === 'yes' && rehab_detail === 'active') || (train === 'stop_never') ||
    (z === 'epaule' && !gym) ||
    (z === 'hanche' && (!gym || !recoveryEligible)) ||
    (z === 'tibia' && sub !== 'leg_shin' && sub !== 'leg_achilles') ||
    (z === 'genou' && sub === 'knee_unknown') ||
    (z === 'cheville' && (sub === 'foot_sole' || sub === 'foot_unknown')) ||
    (z === 'coude' && sub === 'elbow_inner');

  if (needsConsultation) {
    prog = "CONSULTATION INDIVIDUELLE";
    if (z === 'tibia' && sub !== 'leg_shin') {
      msg = "Votre pathologie au niveau du mollet nécessite une analyse personnalisée en visio.";
    } else {
      msg = "Votre profil nécessite une analyse personnalisée avec l'un de nos experts.";
    }
  } else if (answers.goal === 'mobility') {
    prog = "PROTOCOLE MOBILITY SPECIALIST";
  } else {
    if (z === 'dos') prog = recoveryEligible ? "DOS RECOVERY" : "PROTOCOLE DOS SANS DOULEUR";
    else if (z === 'epaule') prog = "ÉPAULE RECOVERY";
    else if (z === 'hanche') prog = "HANCHE RECOVERY";
    else if (z === 'tibia' && sub === 'leg_shin') prog = "PROTOCOLE PÉRIOSTITE";
    else if (z === 'tibia' && sub === 'leg_achilles') prog = "TENDINOPATHIE D'ACHILLE";
    else if (z === 'genou') {
      if (recoveryEligible) prog = "GENOU RECOVERY";
      else if (sub === 'knee_ext') prog = "PROTOCOLE ESSUIE-GLACE";
      else if (sub === 'knee_pat') prog = "TENDINOPATHIE PATELLAIRE";
      else prog = "SYNDROME FEMORO-PATELLAIRE";
    } else if (z === 'cheville') {
      if (sub === 'foot_achilles') prog = "TENDINOPATHIE D'ACHILLE";
      else prog = "PROTOCOLE ANKLE THERAPIE";
    } else if (z === 'achille') {
      prog = "TENDINOPATHIE D'ACHILLE";
    } else if (z === 'coude' && sub === 'elbow_outer') {
      prog = "PROTOCOLE TENNIS ELBOW";
    } else {
      prog = "PROTOCOLE " + (zones.find(zone => zone.id === z)?.label.toUpperCase() || "PERSONNALISÉ");
    }
  }

  return { prog, msg, isConsultation: prog === "CONSULTATION INDIVIDUELLE" };
}

export function getProgramTag(prog: string, answers: Answers): string {
  switch (prog) {
    case 'DOS RECOVERY':
    case 'PROTOCOLE DOS SANS DOULEUR':
      return 'prospect_quizz_dos';
    case 'ÉPAULE RECOVERY':
      return 'prospect_quizz_epaule';
    case 'HANCHE RECOVERY':
      return 'prospect_quizz_hanche';
    case 'PROTOCOLE PÉRIOSTITE':
      return 'prospect_quizz_periostite';
    case "TENDINOPATHIE D'ACHILLE":
      return 'prospect_quizz_achille';
    case 'PROTOCOLE ESSUIE-GLACE':
      return 'prospect_quizz_essuie_glace';
    case 'TENDINOPATHIE PATELLAIRE':
      return 'prospect_quizz_patellaire';
    case 'SYNDROME FEMORO-PATELLAIRE':
      return 'prospect_quizz_sfp';
    case 'GENOU RECOVERY': {
      const sub = answers.pain_subzone;
      if (sub === 'knee_ext') return 'prospect_quizz_essuie_glace';
      if (sub === 'knee_pat') return 'prospect_quizz_patellaire';
      return 'prospect_quizz_sfp';
    }
    case 'PROTOCOLE ANKLE THERAPIE':
      return 'prospect_quizz_cheville';
    case 'PROTOCOLE TENNIS ELBOW':
      return 'prospect_quizz_coude';
    case 'PROTOCOLE CERVICALES':
      return 'prospect_quizz_cervicales';
    case 'PROTOCOLE MOBILITY SPECIALIST':
      return 'prospect_quizz_mobility';
    case 'CONSULTATION INDIVIDUELLE':
      return 'prospect_quizz_consultation';
    default: {
      const zone = answers.goal === 'pain' ? answers.pain_zone : answers.mob_zone;
      return `prospect_quizz_${zone || 'autre'}`;
    }
  }
}
