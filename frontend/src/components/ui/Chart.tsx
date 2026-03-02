import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type TooltipItem,
  type ActiveElement,
  type ChartEvent,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export type RetirementChartPoint = {
  name: string;
  cagnotte: number;
  economie: number;
  contribution: number;
  gains: number;
};

type BarChartProps = {
  dataPoints: RetirementChartPoint[];
  selectedIndex?: number;
  onBarClick?: (index: number) => void;
};

export default function BarChart({
  dataPoints,
  selectedIndex,
  onBarClick,
}: BarChartProps) {
  const isSelected = (index: number) =>
    selectedIndex === undefined || selectedIndex === index;

  const data = {
    labels: dataPoints.map((d) => d.name),
    datasets: [
      {
        label: 'Cagnotté',
        data: dataPoints.map((d) => d.cagnotte),
        backgroundColor: dataPoints.map((_, index) =>
          !isSelected(index) ? '#66A9AB' : '#6D7580',
        ),
        borderRadius: 0,
      },
      {
        label: 'Économisé',
        data: dataPoints.map((d) => d.economie),
        backgroundColor: dataPoints.map((_, index) =>
          !isSelected(index) ? '#D3A0D9' : '#6D7580',
        ),
        borderRadius: 0,
      },
      {
        label: 'Contribué',
        data: dataPoints.map((d) => d.contribution),
        backgroundColor: dataPoints.map((_, index) =>
          !isSelected(index) ? '#F5BBA0' : '#6D7580',
        ),
        borderRadius: 0,
      },
      {
        label: 'Gains',
        data: dataPoints.map((d) => d.gains),
        backgroundColor: dataPoints.map((_, index) =>
          !isSelected(index) ? '#cce2e3' : '#6D7580',
        ),
        borderRadius: { topLeft: 8, topRight: 8 },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      const firstElement = elements[0];
      if (!firstElement) return;
      onBarClick?.(firstElement.index);
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        filter: (tooltipItem: TooltipItem<'bar'>) =>
          tooltipItem.dataset.label === 'Gains',
        callbacks: {
          title: () => '',
          label: (context: TooltipItem<'bar'>) => {
            const value = Number(context.parsed.y ?? 0);
            return `Gains: ${value.toLocaleString()} €`;
          },
        },
        displayColors: true,
        backgroundColor: 'white',
        titleColor: '#006D77',
        bodyColor: '#006D77',
        borderColor: '#E5E7EB',
        borderWidth: 2,
        padding: 4,
        bodyFont: {
          size: 13,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
