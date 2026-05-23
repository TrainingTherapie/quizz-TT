export const ZONE_REASSURANCE: Record<string, string> = {
  dos: "Ton dos peut vraiment aller mieux. La science est claire : dans la grande majorité des cas, le mal de dos se résout avec du mouvement et du renforcement adapté — pas du repos.",
  epaule: "Une épaule douloureuse, ça se soigne vraiment. La science est claire : les exercices ciblés sont le traitement le plus efficace.",
  achille: "Ton tendon peut récupérer. La science est claire : un tendon d'Achille douloureux ne se soigne pas avec du repos, mais avec du renforcement, bien dosé.",
  genou: "Ton genou peut aller mieux pour de bon. La science est claire : la plupart des douleurs au genou répondent très bien à un programme de renforcement progressif et ciblé.",
  hanche: "Ta hanche peut récupérer. La hanche est souvent mal prise en charge — mais avec les bons exercices, les résultats sont là.",
  periostite: "Ta périostite peut disparaître pour de bon. Ce n'est pas une fatalité du coureur. Avec une gestion intelligente de la charge et les bons exercices, ça se règle durablement.",
  cervicales: "Ton cou peut retrouver sa liberté. Les douleurs cervicales répondent très bien au mouvement et au renforcement ciblé.",
  coude: "Ton coude peut guérir. La science est claire : le renforcement progressif est le traitement le plus efficace pour cette douleur — pas du repos.",
  cheville: "Ta cheville peut récupérer complètement. Une entorse bien rééduquée, c'est une cheville plus forte, plus stable et plus réactive — sans gênes qui reviennent.",
  mollet: "Ton mollet peut guérir. La science est claire : le renforcement progressif et bien dosé est le traitement le plus efficace pour cette douleur — pas du repos.",
  pied: "Ta douleur au pied peut guérir. La science est claire : le renforcement progressif et bien dosé est le traitement le plus efficace pour cette douleur — pas du repos.",
};

export function getZoneReassuranceKey(zone: string | null, subzone: string | null): string | null {
  if (!zone) return null;
  if (zone === 'tibia') {
    if (subzone === 'leg_shin') return 'periostite';
    if (subzone === 'leg_calf') return 'mollet';
    if (subzone === 'leg_achilles') return 'achille';
    return 'periostite';
  }
  if (zone === 'cheville') {
    if (subzone === 'foot_achilles') return 'achille';
    if (subzone === 'foot_sprain') return 'cheville';
    return 'pied';
  }
  if (ZONE_REASSURANCE[zone]) return zone;
  return null;
}

export function getZoneReassuranceText(zone: string | null, subzone: string | null): string | null {
  const key = getZoneReassuranceKey(zone, subzone);
  return key ? ZONE_REASSURANCE[key] : null;
}
