import Wallet from '@assets/icons/wallet.svg';

export type SavingsItem = {
  id: string;
  name: string;
  icon: string;
};

export const SAVINGS_ITEMS: SavingsItem[] = [
  { id: 'initial', name: 'MON PREMIER VERSEMENT', icon: Wallet },
  {
    id: 'monthly',
    name: 'MES VERSEMENTS MENSUELS',
    icon: Wallet,
  },
];
