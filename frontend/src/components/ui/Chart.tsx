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
import { useState } from 'react';
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
  year: string;
  cashback: number;
  saved: number;
  contributed: number;
  earnings: number;
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

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const selectedStackColor = '#6D7580';

  const resolveStackColor = (index: number, defaultColor: string) => {
    if (hoveredIndex !== null) {
      return hoveredIndex === index ? selectedStackColor : defaultColor;
    }

    return isSelected(index) ? selectedStackColor : defaultColor;
  };

  const data = {
    labels: dataPoints.map((d) => d.year),
    datasets: [
      {
        label: 'Cagnotté',
        data: dataPoints.map((d) => d.cashback),
        backgroundColor: dataPoints.map((_, index) =>
          resolveStackColor(index, '#66A9AB'),
        ),
        hoverBackgroundColor: '#6D7580',
      },
      {
        label: 'Économisé',
        data: dataPoints.map((d) => d.saved),
        backgroundColor: dataPoints.map((_, index) =>
          resolveStackColor(index, '#D3A0D9'),
        ),
        hoverBackgroundColor: '#6D7580',
      },
      {
        label: 'Contribué',
        data: dataPoints.map((d) => d.contributed),
        backgroundColor: dataPoints.map((_, index) =>
          resolveStackColor(index, '#F5BBA0'),
        ),
        hoverBackgroundColor: '#6D7580',
      },
      {
        label: 'Gains',
        data: dataPoints.map((d) => d.earnings),
        backgroundColor: dataPoints.map((_, index) =>
          resolveStackColor(index, '#cce2e3'),
        ),
        hoverBackgroundColor: '#6D7580',
        borderRadius: { topLeft: 8, topRight: 8 },
        borderColor: '#000000',
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
    onHover: (_event: ChartEvent, elements: ActiveElement[]) => {
      const firstElement = elements[0];
      setHoveredIndex(firstElement ? firstElement.index : null);
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
            weight: 'bold' as const,
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
          tooltipItem.datasetIndex === 0,
        callbacks: {
          title: () => '',
          label: (context: TooltipItem<'bar'>) => {
            const point = dataPoints[context.dataIndex];
            const total =
              (point?.cashback ?? 0) +
              (point?.saved ?? 0) +
              (point?.contributed ?? 0) +
              (point?.earnings ?? 0);
            return `${Math.round(total).toLocaleString('fr-FR')} €`;
          },
        },
        displayColors: false,
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
    <div style={{ width: '100%', height: '340px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}
