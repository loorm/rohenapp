# Rohenäpp

Rohenäpp on Expo + React Native + TypeScript mobiilirakendus, mis aitab kasutajal mänguliselt ökoharjumusi kasvatada. Rakendus kasutab praegu mock-andmeid ja AsyncStorage-põhist lokaalset püsivust.

## Käivitamine

```bash
npm install
npm run start
```

Seejärel ava rakendus Expo Go abil või käivita:

```bash
npm run ios
npm run android
npm run web
```

## Sisu

- Kaunis avaleht metsapildi, päevase ülesande, punktide, preemia edenemise ja mõju kokkuvõttega.
- Ülesannete vaade praktiliste kategooriatega.
- Edetabel sample-kasutajate ja esiletõstetud praeguse kasutajaga.
- Mai 2026 kalender tehtud ja vahele jäetud päevadega.
- Demo preemiarahakott ja lukustatud/avatud preemiad.
- Minu mõju vaade statistikakaartide ja lihtsa visuaalse ülevaatega.

## Kohalik loogika

- Päevast ülesannet saab märkida tehtuks.
- Tehtuks märkimine lisab punkte, CO₂ mõju ja kalendrikirje.
- Päevast ülesannet saab vahetada.
- Seis salvestatakse seadmes AsyncStorage kaudu.
