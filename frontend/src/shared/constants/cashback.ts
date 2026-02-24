import Alimentation from '@/assets/icons/alimentation.svg';
import Maison from '@/assets/icons/maison.svg';
import Vacances from '@/assets/icons/vacances.svg';
import Mode from '@/assets/icons/mode.svg';
import Loisirs from '@/assets/icons/loisirs.svg';

//partners

import Auchan from '@/assets/icons/partners/auchan.svg';
import Carrefour from '@/assets/icons/partners/carrefour.svg';
import Intermarche from '@/assets/icons/partners/intermarche.svg';
import Leroy from '@/assets/icons/partners/leroy-merlin.svg';
import Ikea from '@/assets/icons/partners/ikea.svg';
import Castorama from '@/assets/icons/partners/castorama.svg';
import AirBnb from '@/assets/icons/partners/airbnb.svg';
import Flexibus from '@/assets/icons/partners/flexibus.svg';
import Lastminute from '@/assets/icons/partners/lastminute.svg';
import TroisSuisses from '@/assets/icons/partners/3suisses.svg';
import Decathlon from '@/assets/icons/partners/decathlon.svg';
import Adidas from '@/assets/icons/partners/adidas.svg';
import Darty from '@/assets/icons/partners/darty.svg';
import Cdiscount from '@/assets/icons/partners/cdiscount.svg';
import Fnac from '@/assets/icons/partners/fnac.svg';

export type CashbackPartner = {
  id: string;
  name: string;
  percentage: number;
  icon: string;
};

export type CashbackCategory = {
  id: string;
  name: string;
  icon: string;
  partners: CashbackPartner[];
};

export const DAILY_EXPENSES: CashbackCategory[] = [
  {
    id: 'food',
    name: 'Alimentation',
    icon: Alimentation,
    partners: [
      {
        id: 'auchan',
        name: 'Auchan',
        percentage: 3.2,
        icon: Auchan,
      },
      {
        id: 'carrefour',
        name: 'Carrefour',
        percentage: 3.84,
        icon: Carrefour,
      },
      {
        id: 'intermache',
        name: 'Intermarché',
        percentage: 3.2,
        icon: Intermarche,
      },
    ],
  },
  {
    id: 'home',
    name: 'Maison',
    icon: Maison,
    partners: [
      {
        id: 'leroy',
        name: 'Leroy Merlin',
        percentage: 3.2,
        icon: Leroy,
      },
      {
        id: 'ikea',
        name: 'IKEA',
        percentage: 3.2,
        icon: Ikea,
      },
      {
        id: 'castorama',
        name: 'Castorama',
        percentage: 3.2,
        icon: Castorama,
      },
    ],
  },
  {
    id: 'vacation',
    name: 'Vacances',
    icon: Vacances,
    partners: [
      {
        id: 'airbnb',
        name: 'AirBnb',
        percentage: 3.2,
        icon: AirBnb,
      },
      {
        id: 'flexibus',
        name: 'Flexibus',
        percentage: 3.2,
        icon: Flexibus,
      },
      {
        id: 'lastminute',
        name: 'LastMinute',
        percentage: 3.2,
        icon: Lastminute,
      },
    ],
  },
  {
    id: 'mode',
    name: 'Mode',
    icon: Mode,
    partners: [
      {
        id: '3suisses',
        name: '3Suisses',
        percentage: 3.2,
        icon: TroisSuisses,
      },
      {
        id: 'decathlon',
        name: 'Decathlon',
        percentage: 3.2,
        icon: Decathlon,
      },
      {
        id: 'adidas',
        name: 'Adidas',
        percentage: 3.2,
        icon: Adidas,
      },
    ],
  },
  {
    id: 'leisure',
    name: 'Loisirs',
    icon: Loisirs,
    partners: [
      {
        id: 'darty',
        name: 'Darty',
        percentage: 3.2,
        icon: Darty,
      },
      {
        id: 'cdiscount',
        name: 'Cdiscount',
        percentage: 3.2,
        icon: Cdiscount,
      },
      {
        id: 'fnac',
        name: 'Fnac',
        percentage: 3.2,
        icon: Fnac,
      },
    ],
  },
];
