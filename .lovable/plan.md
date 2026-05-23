## Ajouter le tag dans l'API

### Mapping final

| Programme | Tag |
|---|---|
| DOS RECOVERY / PROTOCOLE DOS SANS DOULEUR | `prospect_quizz_dos` |
| ÉPAULE RECOVERY | `prospect_quizz_epaule` |
| HANCHE RECOVERY | `prospect_quizz_hanche` |
| PROTOCOLE PÉRIOSTITE | `prospect_quizz_periostite` |
| TENDINOPATHIE D'ACHILLE | `prospect_quizz_achille` |
| PROTOCOLE ESSUIE-GLACE | `prospect_quizz_essuie_glace` |
| TENDINOPATHIE PATELLAIRE | `prospect_quizz_patellaire` |
| SYNDROME FEMORO-PATELLAIRE | `prospect_quizz_sfp` |
| GENOU RECOVERY | tag basé sur la sous-zone sélectionnée : `_essuie_glace` (knee_ext), `_patellaire` (knee_pat), `_sfp` (knee_rot/autre) |
| PROTOCOLE ANKLE THERAPIE | `prospect_quizz_cheville` |
| PROTOCOLE TENNIS ELBOW | `prospect_quizz_coude` |
| PROTOCOLE CERVICALES | `prospect_quizz_cervicales` |
| PROTOCOLE MOBILITY SPECIALIST | `prospect_quizz_mobility` |
| CONSULTATION INDIVIDUELLE | `prospect_quizz_consultation` |

### Implémentation

1. **`src/components/diagnostic/algorithm.ts`** : ajouter une fonction `getProgramTag(prog, answers)` qui retourne le tag selon le mapping ci-dessus (avec la logique sous-zone pour GENOU RECOVERY).
2. **`src/components/diagnostic/DiagnosticApp.tsx`** : appeler `getProgramTag` et inclure `tag` dans le payload `{prenom, email, zone, programme, tag}`.
3. **`api/submit-diagnostic.ts`** : ajouter `tag` aux champs extraits et forwardés vers n8n.
