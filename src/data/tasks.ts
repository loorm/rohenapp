import type { EcoTask } from "../types";

export const tasks: EcoTask[] = [
  {
    id: "water-short-shower",
    title: "Pese täna 5 minutit lühemalt",
    description: "Lühike dušš säästab vett ja energiat, ilma et sinu päev kaotaks värskust.",
    category: "Vesi",
    points: 85,
    co2ReductionKg: 0.8,
    difficulty: "Lihtne",
    estimatedTime: "5 min",
    status: "pending"
  },
  {
    id: "bike-commute",
    title: "Mine tööle või kooli rattaga",
    description: "Asenda üks autosõit aktiivse liikumisega ja alusta päeva kergema jalajäljega.",
    category: "Transport",
    points: 150,
    co2ReductionKg: 2.6,
    difficulty: "Väljakutse",
    estimatedTime: "30 min",
    status: "pending"
  },
  {
    id: "public-transport",
    title: "Kasuta täna ühistransporti",
    description: "Üks ühistranspordiga tehtud sõit vähendab heidet ja jätab linnaruumi rahulikumaks.",
    category: "Transport",
    points: 110,
    co2ReductionKg: 1.9,
    difficulty: "Keskmine",
    estimatedTime: "Päeva jooksul",
    status: "pending"
  },
  {
    id: "no-plastic-bottle",
    title: "Ära osta täna plastikpudeliga jooki",
    description: "Võta korduskasutatav pudel kaasa ja väldi ühekordset pakendit.",
    category: "Tarbimine",
    points: 75,
    co2ReductionKg: 0.4,
    difficulty: "Lihtne",
    estimatedTime: "1 min",
    status: "pending"
  },
  {
    id: "plant-meal",
    title: "Söö täna üks taimne eine",
    description: "Vali maitsev taimne eine ja vähenda toiduga seotud jalajälge.",
    category: "Toit",
    points: 120,
    co2ReductionKg: 1.7,
    difficulty: "Keskmine",
    estimatedTime: "1 eine",
    status: "pending"
  },
  {
    id: "lights-off",
    title: "Lülita kasutamata tuled välja",
    description: "Tee kodus kiire ring ja jäta põlema ainult need tuled, mida päriselt vajad.",
    category: "Elekter",
    points: 60,
    co2ReductionKg: 0.3,
    difficulty: "Lihtne",
    estimatedTime: "2 min",
    status: "pending"
  },
  {
    id: "own-bag",
    title: "Võta poodi oma kott kaasa",
    description: "Üks korduskasutatav kott tähendab vähem kilekotte ja puhtamat harjumust.",
    category: "Tarbimine",
    points: 70,
    co2ReductionKg: 0.2,
    difficulty: "Lihtne",
    estimatedTime: "1 min",
    status: "pending"
  },
  {
    id: "clean-litter",
    title: "Korista kodu ümbert 5 prügitükki",
    description: "Väike nähtav tegu teeb ümbruse puhtamaks ja hoiab prügi loodusest eemal.",
    category: "Prügi ja taaskasutus",
    points: 95,
    co2ReductionKg: 0.5,
    difficulty: "Keskmine",
    estimatedTime: "10 min",
    status: "pending"
  },
  {
    id: "skip-dryer",
    title: "Ära kasuta täna kuivatit",
    description: "Kuivata riided õhu käes ja säästa elektrit ilma lisapingutuseta.",
    category: "Elekter",
    points: 125,
    co2ReductionKg: 1.4,
    difficulty: "Keskmine",
    estimatedTime: "Päeva jooksul",
    status: "pending"
  },
  {
    id: "repair-reuse",
    title: "Paranda või taaskasuta midagi uue ostmise asemel",
    description: "Anna olemasolevale asjale uus elu ja jäta üks tarbetu ost tegemata.",
    category: "Tarbimine",
    points: 160,
    co2ReductionKg: 2.2,
    difficulty: "Väljakutse",
    estimatedTime: "20 min",
    status: "pending"
  },
  {
    id: "sort-waste",
    title: "Sorteeri täna kõik pakendid eraldi",
    description: "Pane pakendid õigesse kohta ja muuda taaskasutus oma päeva tavaliseks osaks.",
    category: "Prügi ja taaskasutus",
    points: 80,
    co2ReductionKg: 0.6,
    difficulty: "Lihtne",
    estimatedTime: "5 min",
    status: "pending"
  },
  {
    id: "nature-care",
    title: "Kasta või hoolda üht taime",
    description: "Too rohelus oma päeva keskmesse ja märka, kuidas väikesed harjumused kasvavad.",
    category: "Loodus",
    points: 55,
    co2ReductionKg: 0.1,
    difficulty: "Lihtne",
    estimatedTime: "3 min",
    status: "pending"
  }
];
