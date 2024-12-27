"use client";
import { Pie } from "@/components/Pie/Pie";
import { Graph } from "@/components/Graph/Graph";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";
import { HTMLControl } from "@/components/Docs/Control/components/HTMLControl/HTMLControl";
import { Control } from "@/components/Docs/Control/Control";
import { ComponentProps, useState } from "react";
import { Legend } from "@/components/Legend/Legend";
import { Segment } from "../../utils/graph/graphUtils";
import { RollTheDice } from "@/components/RollTheDice/RollTheDice";

export default function Page() {
  const [pie, setPie] = useState<ComponentProps<typeof PieGraph>>({
    loading: false,
    donut: false,
    labels: true,
  });
  const setPiePartial = (partial: Partial<ComponentProps<typeof PieGraph>>) => setPie((prev) => ({ ...prev, ...partial }));

  const [data, setData] = useState<Segment[]>(MOCK_DATA);

  const randomizeData = () => {
    const randomizedData = MOCK_DATA.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100) 
    }));
    setData(randomizedData);
  };

  return (
    <div>
      <div className="flex items-center justify-end py-4 pr-8">
				<RollTheDice onClick={randomizeData} />
      </div>
      <div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
        <div className={"row-span-2 h-full border-[1px] border-dotted border-foreground"}>
          <Control name={"loading"} type={"boolean"}>
            <BooleanControl
              value={pie.loading}
              onChange={(loading) => setPiePartial({ loading })}
              description={"Renders loading skeleton placeholder"}
            />
          </Control>
          <Control name={"donut"} type={"boolean"}>
            <BooleanControl
              value={pie.donut}
              onChange={(donut) => setPiePartial({ donut })}
              description={"Renders a donut chart instead of a pie chart"}
            />
          </Control>
          <Control name={"labels"} type={"boolean"} default={"true"}>
            <BooleanControl
              value={Boolean(pie.labels)}
              onChange={(labels) => setPiePartial({ labels })}
              description={"Renders labels on the pie chart"}
            />
          </Control>
        </div>
        <div className={"border-[1px] h-full border-dotted border-foreground"}>
          <Graph data={data}>
            <Legend position={"top"} alignment={"center"} />
            <PieGraph {...pie}></PieGraph>
          </Graph>
        </div>
        <div className={"border-[1px] border-dotted border-foreground"}>EXAMPLES</div>
      </div>
    </div>
  );
}

const MOCK_DATA: Segment[] = [
  {
    name: "python",
    value: 283,
  },
  {
    name: "elixir",
    value: 333,
  },
  {
    name: "stylus",
    value: 257,
  },
  {
    name: "css",
    value: 30,
  },
  {
    name: "haskell",
    value: 192,
  },
];