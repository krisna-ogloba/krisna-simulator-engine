import Habitation from '@assets/icons/habitation.svg';
import Credit from '@assets/icons/credit.svg';
import Internet from '@assets/icons/box-internet.svg';

export type FixedChargeItem = {
  id: string;
  name: string;
  icon: string;
};

export const FIXED_CHARGES: FixedChargeItem[] = [
  {
    id: 'home-insurance',
    name: 'ASSURANCE HABITATION',
    icon: Habitation,
  },
  {
    id: 'credit-insurance',
    name: 'ASSURANCE CRÉDIT',
    icon: Credit,
  },
  { id: 'internet', name: 'BOX INTERNET', icon: Internet },
];
