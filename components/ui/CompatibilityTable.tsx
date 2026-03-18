'use client';

const ROWS = [
  {
    model: 'W205 C43 AMG (2019–2021)',
    engine: 'M276 3.0L Biturbo',
    ecu: 'MED17.7.3',
    cgw: 'FCW205',
    cpc: 'CPC_NG',
    status: 'BETA' as const,
  },
  {
    model: 'W205 C43 AMG (2016–2018)',
    engine: 'M276 3.0L Biturbo',
    ecu: 'MED17.7.3',
    cgw: '—',
    cpc: '—',
    status: 'COMING SOON' as const,
  },
  {
    model: 'W205 C63 AMG',
    engine: 'M177 4.0L Biturbo',
    ecu: 'MED17.7.5',
    cgw: '—',
    cpc: '—',
    status: 'PLANNED' as const,
  },
];

const statusStyles: Record<string, string> = {
  BETA: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  'COMING SOON': 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  PLANNED: 'bg-stern-silver/20 text-stern-silver border-stern-silver/40',
};

export function CompatibilityTable() {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-stern-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-sm tracking-[0.3em] uppercase text-stern-silver/80 mb-12">
          Supported vehicles
        </h2>
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 text-xs tracking-wider uppercase text-stern-silver/80 font-medium">
                  Model
                </th>
                <th className="py-4 px-4 text-xs tracking-wider uppercase text-stern-silver/80 font-medium">
                  Engine
                </th>
                <th className="py-4 px-4 text-xs tracking-wider uppercase text-stern-silver/80 font-medium">
                  ECU
                </th>
                <th className="py-4 px-4 text-xs tracking-wider uppercase text-stern-silver/80 font-medium">
                  CGW
                </th>
                <th className="py-4 px-4 text-xs tracking-wider uppercase text-stern-silver/80 font-medium">
                  CPC
                </th>
                <th className="py-4 px-4 text-xs tracking-wider uppercase text-stern-silver/80 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.model}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
                >
                  <td className="py-4 px-4 text-stern-offwhite font-mono text-sm">
                    {row.model}
                  </td>
                  <td className="py-4 px-4 text-stern-silver/90 font-mono text-sm">
                    {row.engine}
                  </td>
                  <td className="py-4 px-4 text-stern-silver/90 font-mono text-sm">
                    {row.ecu}
                  </td>
                  <td className="py-4 px-4 text-stern-silver/90 font-mono text-sm">
                    {row.cgw}
                  </td>
                  <td className="py-4 px-4 text-stern-silver/90 font-mono text-sm">
                    {row.cpc}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium tracking-wider border rounded-full ${statusStyles[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
