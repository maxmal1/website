interface Item{ title: string; content: string; startYear: number; startMonth: string; endYear: number; endMonth: string; }

const monthFractions = {
    "January": 0 / 12,
    "February": 1 / 12,
    "March": 2 / 12,
    "April": 3 / 12,
    "May": 4 / 12,
    "June": 5 / 12,
    "July": 6 / 12,
    "August": 7 / 12,
    "September": 8 / 12,
    "October": 9 / 12,
    "November": 10 / 12,
    "December": 11 / 12,
  };


  const remapYearsWithFractions = (items) => {
    return items.map((item) => {
      item.startYear_calc = item.startYear + monthFractions[item.startMonth];
      item.endYear_calc = item.endYear + monthFractions[item.endMonth];
      return { ...item};
    });
  };
const education : Item[] =[];
const work : Item[] =[];

export function TimelineSection({ education, work}) {
  if (education.length === 0 && work.length === 0) {
    return <div>No data available</div>;
  }

  const allItems = remapYearsWithFractions([...education, ...work]);
  const startYear = Math.floor(Math.min(...allItems.map(item => item.startYear_calc)));
  const endYear = Math.max(...allItems.map(item => item.endYear_calc));
  const totalYears = endYear - startYear + 1;

  const calculatePosition = (year) => {
    return ((year - startYear) / totalYears) * 100;
  };

  const renderColumn = (items, isLeft) => {
    return items.map((item, index) => {
      const topPosition = calculatePosition(item.endYear_calc);
      const height = calculatePosition(item.endYear_calc) - calculatePosition(item.startYear_calc);

      const leftPosition = isLeft ? '-1.5%' : '51.5%';
      
      return (
        <div
          key={index}
          className="absolute w-[calc(25%-0rem)] bg-white rounded-lg shadow-md p-4"
          style={{
            top: `${100 - topPosition}%`,
            height: `${height}%`,
            left: leftPosition,
            transform: isLeft ? 'translateX(100%)' : 'translateX(0%)',
          }}
        >
          <h2 className="text-sm text-black font-semibold mb-1">{item.title}</h2>
          <p className="text-sm text-black mb-2">{item.startYear} {item.startMonth} - {item.endYear} {item.endMonth}</p>
          <p className="text-sm text-black">{item.content}</p>
        </div>
      );
    });
  };

  return (
    <div className="w-full max-w-5xl mt-16 relative" style={{ height: '800px' }}>
      <div className="absolute inset-0">
        {renderColumn(education, true)}
        {renderColumn(work, false)}
      </div>

      {/* Timeline */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300 transform -translate-x-1/2">
        {Array.from({ length: totalYears}, (_, i) => startYear + i).map((year) => (
          <TimelineTick
            key={year}
            year={year}
            top={`${100 - calculatePosition(year)}%`}
          />
        ))}
      </div>
    </div>
  );
}

export function TimelineTick({ year, top }) {
    return (
      <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top }}>
        <div className="w-7 h-1 bg-gray-500 rounded-lg"></div>
        <div className="mt-1 text-xs text-gray-600">{year}</div>
      </div>
    );
  }