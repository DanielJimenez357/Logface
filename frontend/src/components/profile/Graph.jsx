import { PieChart, pieClasses } from '@mui/x-charts/PieChart';

function Graph() {
  return (
  <>
      <div className="h-5/10 flex flex-col justify-center ">
        
<PieChart className=""
      series={[
        {
          data: [
            { id: 0, value: 65, label: 'H. trabajadas mes', color: "white" },
            { id: 1, value: 12, label: 'm. retraso mes', color:  "gray" },
            { id: 2, value: 5, label: 'H. extra mes', color: "red" },
          ],
        },
      ]}
      width={200}
      height={200}
    />
          </div>
    </>
  )}

export default Graph
